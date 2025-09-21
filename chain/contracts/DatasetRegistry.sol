// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract DatasetRegistry is Ownable, ReentrancyGuard {
    struct Dataset {
        address uploader;
        string title;
        string description;
        string cid;
        uint256 priceWei; // price in wei
        uint256 uploadedAt;
        string accessLevel; // "Open" | "Standard" | "Premium"
    }

    // datasetId => Dataset
    mapping(uint256 => Dataset) public datasets;
    uint256 public datasetCount;

    // buyer => datasetId => hasAccess
    mapping(address => mapping(uint256 => bool)) public hasAccess;

    // escrow balances for sellers
    mapping(address => uint256) public escrow;

    event DatasetRegistered(uint256 indexed datasetId, address indexed uploader, string cid);
    event AccessPurchased(uint256 indexed datasetId, address indexed buyer, uint256 amount);
    event Withdraw(address indexed to, uint256 amount);

    constructor(address initialOwner) Ownable(initialOwner) {}

    function registerDataset(
        string calldata title,
        string calldata description,
        string calldata cid,
        uint256 priceWei,
        string calldata accessLevel
    ) external returns (uint256 datasetId) {
        require(bytes(cid).length > 0, "CID required");
        datasetId = ++datasetCount;
        datasets[datasetId] = Dataset({
            uploader: msg.sender,
            title: title,
            description: description,
            cid: cid,
            priceWei: priceWei,
            uploadedAt: block.timestamp,
            accessLevel: accessLevel
        });
        emit DatasetRegistered(datasetId, msg.sender, cid);
    }

    function purchaseAccess(uint256 datasetId) external payable nonReentrant {
        Dataset memory d = datasets[datasetId];
        require(d.uploader != address(0), "Not found");
        if (keccak256(bytes(d.accessLevel)) == keccak256(bytes("Open"))) {
            // Free
            hasAccess[msg.sender][datasetId] = true;
            emit AccessPurchased(datasetId, msg.sender, 0);
            return;
        }

        require(msg.value >= d.priceWei, "Insufficient payment");
        hasAccess[msg.sender][datasetId] = true;
        escrow[d.uploader] += msg.value;
        emit AccessPurchased(datasetId, msg.sender, msg.value);
    }

    function canAccess(address user, uint256 datasetId) external view returns (bool) {
        Dataset memory d = datasets[datasetId];
        if (d.uploader == address(0)) return false;
        if (keccak256(bytes(d.accessLevel)) == keccak256(bytes("Open"))) return true;
        return hasAccess[user][datasetId];
    }

    function getCid(uint256 datasetId) external view returns (string memory) {
        Dataset memory d = datasets[datasetId];
        require(d.uploader != address(0), "Not found");
        return d.cid;
    }

    function withdraw() external nonReentrant {
        uint256 amount = escrow[msg.sender];
        require(amount > 0, "Nothing to withdraw");
        escrow[msg.sender] = 0;
        (bool ok, ) = msg.sender.call{value: amount}("");
        require(ok, "Withdraw failed");
        emit Withdraw(msg.sender, amount);
    }
}


