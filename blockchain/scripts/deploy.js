async function main() {
  const UserManagement = await ethers.getContractFactory("UserManagement");
  const userManagement = await UserManagement.deploy();
  // await userManagement.deployed(); // Uncomment the line above if you want to wait for the deployment to finish
  console.log(
    `UserManagement deployed to: ${
      userManagement.target || userManagement.address
    }`
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
});
