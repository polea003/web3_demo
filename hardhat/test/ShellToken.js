const { expect } = require("chai");
const { ethers } = require('hardhat')

describe("Shell Token Test", function () {

  describe("Deployment", async function () {
    it("Should deploy contract and mint 1000 tokens", async function () {
      let wallet0, wallet1, wallet2;
      [wallet0, wallet1, wallet2] = await ethers.getSigners()
      const ShellToken = await ethers.getContractFactory("ShellToken");
      const shellToken = await ShellToken.deploy( 1000 );
      expect(await shellToken.balanceOf(await wallet0.getAddress())).to.equal(1000); 
    });
  });
});
