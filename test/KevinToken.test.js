const { ethers, upgrades } = require('hardhat');
const { expect } = require('chai');

describe('ERC20Upgradeable', function () {
  let proxyContract;

  const tokenName = 'KevinToken';
  const tokenSymbol = 'KJS';

  describe('Deploy KevinToken', function () {
    it('should be deployed', async function () {
      const KevinToken = await ethers.getContractFactory('KevinToken');
      proxyContract = await upgrades.deployProxy(KevinToken, { kind: 'uups' });
    });

    it('check ERC20 Info', async function () {
      const name = await proxyContract.name();
      const symbol = await proxyContract.symbol();
      expect(name).to.equal(tokenName);
      expect(symbol).to.equal(tokenSymbol);
    });
  });

  describe('mint', function () {
    const initiatorBalance = '1000000000000000000000000'; // 1,000,000 token

    it('check balance initiator', async function () {
      const result = await proxyContract.balanceOf(
        '0x4C1a337F1d09b86FF71fd1d19B95E1756e96EfF9'
      );
      expect(result.toString()).to.equal(initiatorBalance);
    });
  });

  describe('transfer', function () {
    const amount = '10000000000000000000'; // 10 token
    const amountAfterBurned = '9000000000000000000'; // 0.9 token

    it('Should be transferred', async function () {
      const transferToken = await proxyContract.transfer(
        '0x51F0801467542386b85c22ee6A6dBBD28FA812D0',
        amount
      );

      await transferToken.wait();

      const result = await proxyContract.balanceOf(
        '0x51F0801467542386b85c22ee6A6dBBD28FA812D0'
      );

      // Decrease 10% by Burn Action
      expect(result.toString()).to.equal(amountAfterBurned);
    });
  });
});
