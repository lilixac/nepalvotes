import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Layout from "./layout";
import Jumbotron from "react-bootstrap/Jumbotron";
import Card from "react-bootstrap/Card";

const ViewCandidates = ({ candidates }) => {
	return (
		<Layout>
			<Jumbotron>
				<h2>Candidates</h2>
			</Jumbotron>
			{candidates &&
				candidates.map((i) => (
					<Card key={i.candidateId} style={{'marginBottom':'20px'}}>
						<Card.Header><b>{i.candidateName}</b></Card.Header>
						<ListGroup>
							<ListGroup.Item>
								Candidate Id: {i.candidateId}
							</ListGroup.Item>
							<ListGroup.Item>
								Party Id: {i.partyId}{" "}
							</ListGroup.Item>
							<ListGroup.Item>
								Description: {i.description}
							</ListGroup.Item>
							<ListGroup.Item>
								Votes Obtained: {i.candidateVoteCount}
							</ListGroup.Item>
						</ListGroup>
					</Card>
				))}
		</Layout>
	);
};

export default ViewCandidates;
