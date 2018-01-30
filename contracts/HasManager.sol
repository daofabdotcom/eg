pragma solidity ^0.4.0;

contract HasManager {
    address manager;

    function getManager() public view returns (address) {
      return manager;
    }

    modifier onlyManager {
        require(msg.sender == manager);
        _;
    }
}
