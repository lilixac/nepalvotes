import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Jumbotron from "react-bootstrap/Jumbotron";

const ApproveVoters = ({ _approveVoter }) => {
	const [addr, setAddr] = useState("");

	const submitHandler = async (e) => {
		e.preventDefault();
		_approveVoter(addr);
	};

	return (
		<Container>
			<Jumbotron>
				<h2>Approve Voters</h2>
			</Jumbotron>
			<Form
				style={{ width: "45%", marginLeft: "3%" }}
				onSubmit={submitHandler}
			>
				<Form.Group controlId="formBasic">
					<Form.Label>Voter Wallet Address</Form.Label>
					<Form.Control
						onChange={(e) => setAddr(e.target.value)}
						type="text"
						placeholder="Enter wallet address to approve for voting."
					/>
				</Form.Group>

				<Button variant="dark" type="submit">
					Approve
				</Button>
			</Form>
		</Container>
	);
};

export default ApproveVoters;
