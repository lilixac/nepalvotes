import React, { useState, useEffect } from "react";
import ElectionContract from "./contracts/Election.json";
import getWeb3 from "./getWeb3";
import { Spinner, ListGroup, Card, Alert } from "react-bootstrap";
import Layout from "./components/layout";
import AddCandidates from "./components/addcandidates";
import ApproveVoters from "./components/approveVoters";
import ChangeOwner from "./components/changeowner";
import ViewCandidates from "./components/viewCandidates";
import CheckRegistration from "./components/checkRegistration";
import Vote from "./components/vote";
import { Route, Switch } from "react-router-dom";
import "./App.css";

const App = () => {
  const [web3, setWeb3] = useState(null);
  const [isOwner, setOwner] = useState(null);
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
        if (owner === accounts[0]) {
          setOwner(true);
        }
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
    // const winnerId = await election.methods.checkResults().call();
    // const winner = await election.methods.candidates(winnerId).call();
    console.log(await election.methods.checkResults())
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
          <Alert variant="light" className="right-side">
            Logged in as: {account}
          </Alert>


          <Layout isOwner={isOwner}>
          <button onClick={checkWinner}> Check Winner </button>
            {winner ? (
              <Card style={{ marginBottom: "20px" }}>
                <Card.Header>CandidateName: {winner.candidateName}</Card.Header>

                <ListGroup>
                  <ListGroup.Item>
                    VoteCount: {winner.candidateVoteCount}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Candidate Id: {winner.candidateId}
                  </ListGroup.Item>
                  <ListGroup.Item>Party: {winner.partyId}</ListGroup.Item>
                  <ListGroup.Item>
                    Description: {winner.description}
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            ) : (
              <Card style={{ marginBottom: "20px" }}>
                <Card.Header onClick={checkWinner}> Get results! </Card.Header>
              </Card>
            )}
          </Layout>
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
        </div>
      )}
    </div>
  );
};

export default App;
