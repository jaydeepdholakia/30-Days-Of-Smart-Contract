const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Inside HelloWorld.sol", function () {
  it("Update the Msg", async function () {
    const HelloWorld = await ethers.getContractFactory("HelloWorld");
    const contract = await HelloWorld.deploy("Hello blockchain world!");

    expect(await contract.getMsg()).to.equal("Hello blockchain world!");

    const changeMsg = await contract.setHelloWorld("This is updated msg");

    // waiting for transaction to be mined
    await changeMsg.wait();

    expect(await contract.getMsg()).to.equal("This is updated msg");
  });
});
