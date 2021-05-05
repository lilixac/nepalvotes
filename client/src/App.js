import React, { useState, useEffect } from "react";
import ElectionContract from "./contracts/Election.json";
import getWeb3 from "./getWeb3";
import { Nav, Navbar, Spinner } from "react-bootstrap";
import AddCandidates from "./components/addcandidates";
import ApproveVoters from "./components/approveVoters";
import ChangeOwner from "./components/changeowner";
import ViewCandidates from "./components/viewCandidates";
import CheckRegistration from "./components/checkRegistration";
import Vote from "./components/vote";
import { Route, Switch, Link } from "react-router-dom";
import "./App.css";

const App = () => {
  const [web3, setWeb3] = useState(null);
  const [owner, setOwner] = useState(null);
  const [candidates, setCandidates] = useState(null);
  const [account, setAccount] = useState(null);
  const [election, setElection] = useState(null);
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const web3 = await getWeb3();
        setWeb3(web3);

        // Use web3 to get the user's accounts.
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);

        // Get the contract instance.
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = ElectionContract.networks[networkId];
        const instance = new web3.eth.Contract(
          ElectionContract.abi,
          deployedNetwork && deployedNetwork.address
        );
        const owner = await instance.methods.owner().call();
        setOwner(owner);
        setElection(instance);

        var obj = [];
        const nCandidates = await instance.methods.candidateCount().call();
        for (var i = 1; i <= nCandidates; i++) {
          const candidate = await instance.methods.candidates(i).call();
          obj.push(candidate);
        }
        setCandidates(obj);
      } catch (error) {
        alert(
          `Failed to load web3, accounts, or contract. Check console for details.`
        );
      }
    }
    fetchData();
  }, []);

  const changeOwner = async (_address) => {
    await election.methods.changeOwner(_address).send({ from: account });
  };

  const addCandidate = async (_candidateName, _partyId, _description) => {
    await election.methods
      .addCandidates(_candidateName, parseInt(_partyId), _description)
      .send({ from: account });
  };

  const approveVoter = async (_voter) => {
    await election.methods.approveVoters(_voter).send({ from: account });
  };

  const vote = async (_candidateId) => {
    await election.methods.vote(parseInt(_candidateId)).send({ from: account });
  };

  const checkWinner = async () => {
    console.log(await election.methods.checkResults().call())
    // console.log(winnerId)
    // const winner = await election.methods.candidates(winnerId).call();
    // setWinner(winner);
  };
  
  const checkRegistration = async (_addr) => {
    const voterInfo = await election.methods.voters(_addr).call();
    return voterInfo;
  };

  return (
    <div className="App">
      {!web3 ? (
        <Spinner animation="border" />
      ) : (
        <div>
        <button onClick={checkWinner}> button </button>
          <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="/">Nepal Votes</Navbar.Brand>
            <Navbar.Brand onClick={checkWinner}>Get Winner !</Navbar.Brand>
            <Nav className="mr-auto"></Nav>
            {account === owner ? (
              <Nav>
                <Link to="/approveVoter">Approve Voters</Link>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Link to="/addCandidate">Add Candidates</Link>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Link to="/changeOwner">Change Owner</Link>
              </Nav>
            ) : null}
            <Nav className="mr-auto"></Nav>
            <Nav className="whiten">
              <Link to="/viewCandidates">View Candidates</Link>
            </Nav>{" "}
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Nav className="whiten">
              <Link to="/checkRegistration">Check Registration</Link>
            </Nav>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Nav className="whiten">
              <Link to="/vote">Vote</Link>
            </Nav>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Nav className="whiten">{account}</Nav>
          </Navbar>
          <br />
          <Switch>
            <Route
              exact
              path="/approveVoter"
              render={() => <ApproveVoters _approveVoter={approveVoter} />}
            />
            <Route
              exact
              path="/checkRegistration"
              render={() => (
                <CheckRegistration _checkRegistration={checkRegistration} />
              )}
            />
            <Route
              exact
              path="/viewCandidates"
              render={() => <ViewCandidates candidates={candidates} />}
            />
            <Route
              exact
              path="/addCandidate"
              render={() => <AddCandidates _addCandidate={addCandidate} />}
            />
            <Route
              exact
              path="/changeOwner"
              render={() => <ChangeOwner _changeOwner={changeOwner} />}
            />
            <Route exact path="/vote" render={() => <Vote _vote={vote} />} />
          </Switch>

          {winner && winner.candidateName}
        </div>
      )}
    </div>
  );
};

export default App;
