pragma solidity ^0.4.0;

interface ProjectAdapter{
    function createProject(string _documentLocation) public returns (uint);
    function addNotorizers(address _notorizer) public returns (uint);
    function removeNotorizers(address _notorizer) public returns (uint);

    function notorizeProject(uint _id, uint _hash, string _state) public payable;
    function getHash(uint _id) public view returns (uint);
    function getNumOfProject() public view returns (uint);
    function getNumOfNotorizer() public view returns (uint);

    // Note that _documentLocation is not published in this event for security reason.
    event ProjectCreated(uint indexed id, address indexed owner);
    event ProjectNotorized(uint indexed id, string state, address indexed notorizer, uint timestamp);
}
