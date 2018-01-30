pragma solidity ^0.4.0;

//import "./HasManager.sol";
// import "./ProjectAdapter.sol";

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

contract ProjectManager is HasManager, ProjectAdapter {
    /*
     Project is a struct instead of a contract.  This is to keep overhead low and there is
     not enough functionalities in Project to make it a contract.  In any case, I use an
     interface to insulate client from it.
    */
    struct Project {
        uint id;
        uint hash;
        address owner;
        string documentLocation;
        string state; // state is a string but it should be Enum or some other type.
        uint timestamp;
    }

    mapping(uint => Project) projects;
    mapping(address => bool) myNotorizers;

    uint projectCounter = 1;
    uint numNotorizers = 0;

    // constructor -
    function ProjectManager() public {
        manager = msg.sender;
    }

    function createProject(string _documentLocation)
        public
        onlyManager
        returns (uint) {
        uint id = projectCounter;
        // storage is initialized to 0 by default.
        projects[id] = Project(id, 0, msg.sender, _documentLocation, "", 0);
        projectCounter++;
        ProjectCreated(id, msg.sender);
        return id;
    }

    function addNotorizers(address _notorizer)
        public
        onlyManager
        returns (uint) {
        myNotorizers[_notorizer] = true;
        numNotorizers++;
        return numNotorizers;
    }

    function removeNotorizers(address _notorizer)
        public
        onlyManager
        returns (uint){
        myNotorizers[_notorizer] = false;
        numNotorizers++;
        return numNotorizers;
    }

    function notorizeProject(uint _id, uint _hash, string _state)
        public
        payable {
        // Only approved accounts can notorize project.
        assert(myNotorizers[msg.sender]);
        assert(projects[_id].id != 0);
        projects[_id].hash = _hash;
        projects[_id].state = _state;
        uint t = now;
        projects[_id].timestamp = t;
        ProjectNotorized(_id, _state, msg.sender, t);
    }

    /*
      As per discussed in skype, anyone should be able to view to KISS.
    */
    function getHash(uint _id) public view returns (uint) {
      require(_id < projectCounter);
      assert(projects[_id].hash != 0);
      uint h = projects[_id].hash;
      return h;
    }

    function getNumOfProject() public view returns (uint) {
      return projectCounter-1;
    }

    function getNumOfNotorizer() public view returns (uint) {
      return numNotorizers;
    }
}
