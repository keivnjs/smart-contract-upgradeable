const { ethers, upgrades } = require('hardhat');

describe('KJSToken', function () {
  it('deploys', async function () {
    const KJSToken = await ethers.getContractFactory('KJSToken');
    await upgrades.deployProxy(KJSToken, { kind: 'uups' });
  });
});
