const { ethers } = require('hardhat');

async function main(){
  const [deployer] = await ethers.getSigners();
  console.log('Deployer:', deployer.address);
  const Registry = await ethers.getContractFactory('DatasetRegistry');
  const registry = await Registry.deploy(deployer.address);
  await registry.waitForDeployment();
  const addr = await registry.getAddress();
  console.log('DatasetRegistry:', addr);
}

main().catch((e)=>{console.error(e);process.exitCode=1;});
