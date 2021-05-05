import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Jumbotron from "react-bootstrap/Jumbotron";

const ChangeOwner = ({ _changeOwner }) => {
	const [addr, setAddr] = useState("");

	const submitHandler = (e) => {
		e.preventDefault();
		_changeOwner(addr);
	};
	return (
		<Container>
			<Jumbotron>
				<h2>Change Owner</h2>
			</Jumbotron>
			<Form
				style={{ width: "45%", marginLeft: "3%" }}
				onSubmit={submitHandler}
			>
				<Form.Group controlId="formBasic">
					<Form.Label>Wallet Address</Form.Label>
					<Form.Control
						onChange={(e) => setAddr(e.target.value)}
						type="text"
						placeholder="Enter wallet address"
					/>
				</Form.Group>

				<Button variant="danger" type="submit">
					Submit
				</Button>
			</Form>
		</Container>
	);
};

export default ChangeOwner;
