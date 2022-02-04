const { ethers, upgrades } = require('hardhat');
const { expect } = require('chai');

// describe('KJSToken', function () {
//   it('deploys', async function () {
//     const KJSToken = await ethers.getContractFactory('KJSToken');
//     await upgrades.deployProxy(KJSToken, { kind: 'uups' });
//   });

//   it('mint', async function () {

//   })
// });

describe('ERC20Upgradeable', function () {
  let proxyContract;

  const tokenName = 'KevinToken';

  let KevinToken;
  let owner;
  let addr1;
  let addr2;
  let addr3;

  before(async function () {
    [owner, addr1, addr2, addr3] = await ethers.getSigners();
    // KevinToken = await ethers.getContractFactory('KevinToken');
  });

  describe('Deploy KevinToken', function () {
    it('should be deployed', async function () {
      const KevinToken = await ethers.getContractFactory('KevinToken');
      proxyContract = await upgrades.deployProxy(KevinToken, { kind: 'uups' });
      // await proxyContract.deployed();
    });

    it('name', async function () {
      const name = await proxyContract.name();
      expect(name).to.equal(tokenName);
    });
  });

  describe('mint', function () {
    it('check balance initiator', async function () {
      // await proxyContract.transfer(
      //   '0xf174a8562d63cc9b14203440c3efacb1da45b34d',
      //   ethers.utils.parseEther('1.1')
      // );
      const result = await proxyContract.balanceOf(
        '0x4C1a337F1d09b86FF71fd1d19B95E1756e96EfF9'
      );
      expect(result.toString()).to.equal('1000000000000000000000000');
    });
  });
});
