import hre from "hardhat";

async function main() {
  const Registry = await hre.ethers.getContractFactory("StartupRegistry");
  const contract = await Registry.deploy();
  await contract.waitForDeployment();

  console.log("StartupRegistry deployed to:", await contract.getAddress());
}

main();
