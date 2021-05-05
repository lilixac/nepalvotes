pragma solidity >=0.4.21 <0.7.0;

contract Election {
	address public owner; 
	string public electionName;
	uint public candidateCount = 0;
	uint public voteCount;
	uint public startTime;
	uint public endTime;

	constructor(string memory _name, uint _startTime, uint _endTime) public {
		owner = msg.sender;
		startTime = _startTime;
		endTime = _endTime;
		electionName = _name;
	}

	mapping (uint => Candidate) public candidates;
	mapping (address => Voter) public voters;

	struct Candidate {
		uint candidateId;
		string candidateName;
		uint partyId;
		uint candidateVoteCount;
		string description;
	}

	event NewCandidateAdded (
		uint candidateId,
		string candidateName,
		uint partyId,
		uint candidateVoteCount,
		string description
	);

	struct Voter {
		address voterId;
		bool authorized;
		uint vote;
		bool voted;		
	}

	modifier ownerOnly () {
		require(msg.sender == owner);
		_;
	}

	function changeOwner(address _newOwner) public ownerOnly {
		owner = _newOwner;
	}

	function addCandidates(
		string memory _candidateName, 
		uint _partyId, 
		string memory _description
		) public ownerOnly {

		require(bytes(_candidateName).length > 5);
		require(_partyId > 0);
		candidateCount++;
		candidates[candidateCount] = Candidate(candidateCount, _candidateName, _partyId, 0, _description);
		emit NewCandidateAdded(candidateCount, _candidateName, _partyId, 0, _description);
	}

	function approveVoters(address _voter) public ownerOnly {
		require(!voters[_voter].authorized);
		require (voters[_voter].authorized == false);
		voters[_voter].authorized = true;
	}

	function vote(uint _candidateId) public {
		require(startTime <= now, "Election has not started yet.");
		require(endTime > now, "Election is over.");

		Voter storage _voter = voters[msg.sender];

		require(!_voter.voted);
		require(_voter.authorized);

		_voter.vote = _candidateId;
		candidates[_candidateId].candidateVoteCount++;
		voteCount++;
		_voter.voted = true;
	}

	function checkResults() public view returns (uint winningCandidateId) {
		require(endTime < now, 'Election time is not over yet.');
		
		uint highestVoteCount = 0;
		for(uint i = 1; i <= candidateCount; i++) {
			if (candidates[i].candidateVoteCount > highestVoteCount) {
				highestVoteCount = candidates[i].candidateVoteCount;
				winningCandidateId = i;
			}
		}
		return winningCandidateId;
	}
}