import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Jumbotron from "react-bootstrap/Jumbotron";

const Vote = ({ _vote }) => {
	const [candidateId, setCandidateId] = useState(0);

	const submitHandler = async (e) => {
		e.preventDefault();
		_vote(candidateId);
	};

	return (
		<Container>
			<Jumbotron>
				<h2>Vote</h2>
			</Jumbotron>
			<Form
				style={{ width: "45%", marginLeft: "3%" }}
				onSubmit={submitHandler}
			>
				<Form.Group controlId="formBasic">
					<Form.Label>Candidate Id</Form.Label>
					<Form.Control
						onChange={(e) => setCandidateId(e.target.value)}
						type="text"
						placeholder="Enter candidate id"
					/>
				</Form.Group>

				<Button variant="dark" type="submit">
					Submit
				</Button>
			</Form>
		</Container>
	);
};

export default Vote;
