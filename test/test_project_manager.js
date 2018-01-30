// var utils = require("./utils.js");
var TestProjectManager = artifacts.require("ProjectManager");

contract('TestProjectManager', function(accounts) {
  var ownerAddress = accounts[0];
  var nonOwnerAddress = accounts[1];
  var firstNotorizerAddress = accounts[2];
  var fakeNotorizerAddress = accounts[3];

  var documentLocation = "SomeLocation";
  var testState = "TestState";
  var manager;
  var numOfProjects = 0;
  var numOfNotorizer = 0;
  var hash = 1;

  it('should create the project when an owner calls it', function() {
    return TestProjectManager.deployed()
      .then(instance => {
        manager = instance;
        return instance.createProject(documentLocation);
      })
      .then(result => {
        manager.getManager.call().then(result2 => {
          numOfProjects++;
          assert.equal(result2, ownerAddress, "Error in creating project.");
        });
      });
  });

  it('should not create the project when an invalid owner calls it', function() {
    return TestProjectManager.deployed()
      .then(instance => {
        manager = instance;
        return instance.createProject(documentLocation);
      })
      .then(result => {
        numOfProjects++;
        return manager.createProject(documentLocation, {from:nonOwnerAddress})
        .then(result2 => {
          manager.getNumOfProject.call().then(result3 => {
            assert.equal(result3, numOfProjects, "Error in reverting .... creating project.");
          });
        })
      });
  });

  it("should add notorizer if the sender is the owner", function() {
    return TestProjectManager.deployed()
      .then(instance => {
        manager = instance;
        return instance.createProject(documentLocation);
      })
      .then(result => {
        numOfProjects++;
        // Now I got the project.
        // I should add notorizer
        // check whether it is correct.
        manager.addNotorizers(firstNotorizerAddress).then(result2 => {
          numOfNotorizer++;
          manager.getNumOfNotorizer.call().then(result3 => {
            assert.equal(result3, numOfNotorizer, "Error in adding notorizer.");
          });
        });
      });
  });

  it("should not add notorizer if the sender is the owner", function() {
    return TestProjectManager.deployed()
      .then(instance => {
        manager = instance;
        return instance.createProject(documentLocation);
      })
      .then(result => {
        numOfProjects++;
        // Now I got the project.
        // I should add notorizer
        // check whether it is correct.
        manager.addNotorizers(firstNotorizerAddress, {from:nonOwnerAddress}).then(result2 => {
          manager.getNumOfNotorizer.call().then(result3 => {
            assert.equal(result3, numOfNotorizer, "Error in reverting ... adding notorizer.");
          });
        });
      });
  });

  // it("it should notorize the project", function() {
  //   return TestProjectManager.deployed()
  //     .then(instance => {
  //       manager = instance;
  //       return instance.createProject(documentLocation);
  //     })
  //     .then(result => {
  //       numOfProjects++;
  //       manager.addNotorizers(firstNotorizerAddress).then(result2 => {
  //         numOfNotorizer++;
  //         manager.notorizeProject(numOfProjects, hash, testState, {from:firstNotorizerAddress}).then(result3 => {
  //           manager.getHash(1).then(result3 => {
  //             assert.equal(result3.toNumber(), hash, "Error in notorizing project.");
  //           });
  //         });
  //       });
  //     });
  // });

  // it("should emit ProjectCreated when it is notorized", function() {
  //   return TestProjectManager.deployed()
  //     .then(instance => {
  //       manager = instance;
  //       return instance.createProject(documentLocation);
  //     })
  //     .then(result => {
  //       numOfProjects++;
  //       // assert.equal(result3.logs[0].event, "ProjectNotorized", "Wrong event name");
  //       assert.equal(result.logs[0].event, "ProjectCreated", "Wrong event name");
  //       assert.equal(result.logs[0].args.id.toNumber(), numOfProjects, "Wrong event id");
  //       console.log(result.logs[0].args.owner);
  //       assert.equal(result.logs[0].args.owner, ownerAddress, "Wrong event state");
  //     });
  // });

  // it("should emit ProjectNotorized when it is notorized", function() {
  //   return TestProjectManager.deployed()
  //     .then(instance => {
  //       manager = instance;
  //       return instance.createProject(documentLocation);
  //     })
  //     .then(result => {
  //       numOfProjects++;
  //         manager.addNotorizers(firstNotorizerAddress).then(result2 => {
  //         numOfNotorizer++;
  //         manager.notorizeProject(numOfProjects, hash, testState, {from:firstNotorizerAddress}).then(result3 => {
  //           assert.equal(result3.logs[0].event, "ProjectNotorized", "Wrong event name");
  //           assert.equal(result3.logs[0].args.id.toNumber(), numOfProjects, "Wrong event id");
  //           assert.equal(result3.logs[0].args.state, testState, "Wrong event state");
  //           assert.equal(result3.logs[0].args.notorizer, firstNotorizerAddress, "Wrong event state");
  //           // notorizer
  //           // state
  //           // id
  //         });
  //       });
  //     });
  // });
});
