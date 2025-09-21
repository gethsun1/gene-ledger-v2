import { ethers } from 'hardhat';

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log('Deployer:', deployer.address);

  // Deploy DatasetRegistry
  const Registry = await ethers.getContractFactory('DatasetRegistry');
  const registry = await Registry.deploy(await deployer.getAddress());
  await registry.deployed();
  console.log('DatasetRegistry:', registry.address);

  // Deploy Governance pieces
  const Timelock = await ethers.getContractFactory('TimelockController');
  const minDelay = 3600; // 1 hour
  const proposers: string[] = [];
  const executors: string[] = [];
  const timelock = await Timelock.deploy(minDelay, proposers, executors, deployer.address);
  await timelock.deployed();
  console.log('TimelockController:', timelock.address);

  const Token = await ethers.getContractFactory('GovernanceToken');
  const token = await Token.deploy();
  await token.deployed();
  console.log('GovernanceToken:', token.address);

  // Mint some initial voting power to deployer
  await (await token.mint(deployer.address, ethers.utils.parseEther('1000000'))).wait();

  const Governor = await ethers.getContractFactory('GeneGovernor');
  const governor = await Governor.deploy(token.address, timelock.address);
  await governor.deployed();
  console.log('GeneGovernor:', governor.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});


