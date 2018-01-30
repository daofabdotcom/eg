// var HasManager = artifacts.require("./HasManager.sol");
// var ProjectAdapter = artifacts.require("./ProjectAdapter.sol");
var ProjectManager = artifacts.require("./ProjectManager.sol");

module.exports = function(deployer) {
  // deployer.deploy(HasManager);
  // deployer.deploy(ProjectAdapter);
  deployer.deploy(ProjectManager);
};
