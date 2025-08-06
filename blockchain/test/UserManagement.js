const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("UserManagement Contract", function () {
  let UserManagement, userManagement, admin, user1;

  beforeEach(async function () {
    [admin, user1] = await ethers.getSigners();
    UserManagement = await ethers.getContractFactory("UserManagement");
    userManagement = await UserManagement.deploy();
    //await userManagement.deployed();
  });

  it("Should register a user as Admin", async function () {
    await userManagement.connect(admin).registerUser(user1.address, 1); // Role 1 = User
    const role = await userManagement.getUserRole(user1.address);
    expect(role).to.equal(1);
  });

  it("Should revert if non-admin tries to register", async function () {
    await expect(
      userManagement.connect(user1).registerUser(user1.address, 1)
    ).to.be.revertedWith("Not authorized");
  });
});
