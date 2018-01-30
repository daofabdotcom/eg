pragma solidity ^0.4.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/ProjectManager.sol";

contract TestProjectManager {

  ProjectManager manager;

  function beforeAll() {
    manager = new ProjectManager();
  }

  function testProjectCreation() public{
    manager = ProjectManager(DeployedAddresses.ProjectManager());

    Assert.equal(manager.createProject("SomeLocation"), 1, "Project Creation failed.");
  }

  // cannot change msg.sender.  so just plain simple unit test.  cannnot mock.  cannot stub.

}
