const { ethers } = require("hardhat");

async function main() {
  
  const [deployer] = await ethers.getSigners();

  const HelloWorld = await ethers.getContractFactory("HelloWorld");
  const contract = await HelloWorld.deploy("Hello, Hardhat!");

  await contract.deployed();

  console.log("HelloWorld contract deployed to:", contract.address);
  console.log("It was deployed by: ", deployer.address)
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
