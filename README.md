# Nepal Votes
---
### _A blockchain based election system for Nepal._

Nepal Votes is a blockchain based election software that can be used to replace existing traditional election system in Nepal. Since it is on the blockchain, it's going to be much more secure and fraud proof than existing election systems. Currently it mimicks election for a constituency only, however it can be extended using a Election Factory contract.

## Features

- Set the name, starting and ending time for election.
- Add candidates for election (name, partyId, metadata) *(only owner)*
- Approve voters for the election *(only owner)*
- These 2 can be done only before the election, can't be done during or after.
- Approved voters can vote during the election time.
- Voters can see all the candidates and their info.
- Option to check whether a voter is registered.
- Get winner once the election is over. 

## Checks

- Tested working using local ganache blockchain, and remix web IDE. However, only limited number of accounts were used to test the smart contract, so I'm not sure how scalable it is. 

- Currently, Election Contract is deployed via `migrations/2_deploy_contract.js` file. The params in this function are:
    ```js
    deployer.deploy(Election, "NepalVotes", 1620351900, 1620352500);
    ```
    `name of the contract`, `name of the election`, `starting timestamp` and `ending timestamp`. 
    This is not done via frontend, and we need to check the timestamp manually and set it before deploying.

- Election factory contract can be used be create different instances of election. However, I have not tested it.