import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Layout from "./layout";
import Jumbotron from "react-bootstrap/Jumbotron";

const AddCandidates = ({ _addCandidate }) => {
	const [name, setName] = useState("");
	const [party, setParty] = useState(0);
	const [uri, setUri] = useState("");

	const submitHandler = async (e) => {
		e.preventDefault();
		_addCandidate(name, party, uri);
	};

	return (
		<Layout>
			<Jumbotron>
				<h2>Add Candidate</h2>
			</Jumbotron>
			<Form
				style={{ width: "50%", marginLeft: "3%" }}
				onSubmit={submitHandler}
			>
				<Form.Group controlId="formBasic">
					<Form.Label>Candidate Name</Form.Label>
					<Form.Control
						onChange={(e) => setName(e.target.value)}
						type="text"
						placeholder="Enter name"
					/>
				</Form.Group>

				<Form.Group controlId="formBasic">
					<Form.Label>Party ID</Form.Label>
					<Form.Control
						onChange={(e) => setParty(e.target.value)}
						type="text"
						placeholder="Party Id"
					/>
				</Form.Group>

				<Form.Group controlId="formBasic">
					<Form.Label>Description</Form.Label>
					<Form.Control
						onChange={(e) => setUri(e.target.value)}
						as="textarea"
						rows={3}
						placeholder="Description"
					/>
				</Form.Group>

				<Button variant="dark" type="submit">
					Add
				</Button>
			</Form>
		</Layout>
	);
};

export default AddCandidates;
