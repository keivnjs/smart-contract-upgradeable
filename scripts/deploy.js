async function main() {
  const KevinToken = await ethers.getContractFactory('KevinToken');
  console.log('Deploying proxy, implementation');
  const KevinTokenProxy = await upgrades.deployProxy(KevinToken, {
    kind: 'uups',
  });
  await KevinTokenProxy.deployed();
  console.log('Proxy deployed to:', KevinTokenProxy.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
