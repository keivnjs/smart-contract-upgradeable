// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20BurnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";

contract KevinTokenV2 is Initializable, ERC20Upgradeable, ERC20BurnableUpgradeable, OwnableUpgradeable, UUPSUpgradeable, AccessControlUpgradeable {

    uint256 private _minimumSupply;

    function initialize() external initializer  {
        __ERC20_init("KevinTokenV2", "KJSV2");
        __ERC20Burnable_init();
        __Ownable_init();
        __UUPSUpgradeable_init();

        _minimumSupply = 100000 * (10 ** 18);

        _mint(msg.sender, 1000000 * 10 ** decimals());
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    function mint(address to, uint256 amount) public onlyRole(DEFAULT_ADMIN_ROLE) {
        _mint(to, amount);
    }

    function transfer(address to, uint256 amount) public override returns (bool) {
        return super.transfer(to, _partialBurn(amount));
    }

    function transferFrom(address from, address to, uint256 amount) public override returns (bool) {
        return super.transferFrom(from, to, _partialBurn(amount));
    }

    function _partialBurn(uint256 amount) internal onlyRole(DEFAULT_ADMIN_ROLE) returns (uint256) {
        uint256 burnAmount = _calculateBurnAmount(amount);

        if (burnAmount > 0) {
            _burn(msg.sender, burnAmount);
        }

        return amount - burnAmount;
    }

    function _calculateBurnAmount(uint256 amount) internal onlyRole(DEFAULT_ADMIN_ROLE) view returns (uint256) {
        uint256 burnAmount = 0;

        
        if (totalSupply() > _minimumSupply) {
            burnAmount = amount * (10) / (100);
            uint256 availableBurn = (totalSupply() - _minimumSupply);
            if (burnAmount > availableBurn) {
                burnAmount = availableBurn;
            }
        }

        return burnAmount;
    }

    function _authorizeUpgrade(address newImplementation)
        internal
        onlyOwner
        override
    {}
}