import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Layout from "./layout";
import Jumbotron from "react-bootstrap/Jumbotron";
import ListGroup from "react-bootstrap/ListGroup";

const CheckRegistration = ({ _checkRegistration }) => {
	const [addr, setAddr] = useState("");
	const [voterInfo, setVoterInfo] = useState("");

	const submitHandler = async (e) => {
		e.preventDefault();
		setVoterInfo(await _checkRegistration(addr));
	};

	return (
		<Layout>
			<Jumbotron>
				<h2>Check Registration</h2>
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
						placeholder="Enter your wallet address"
					/>
				</Form.Group>

				<Button variant="dark" type="submit">
					Submit
				</Button>
				<hr />
				{voterInfo !== "" ? (
					<ListGroup>
						<ListGroup.Item>
							Authorized: {voterInfo.authorized.toString()}
						</ListGroup.Item>
						<ListGroup.Item>
							Voted: {voterInfo.voted.toString()}{" "}
						</ListGroup.Item>
					</ListGroup>
				) : null}
			</Form>
		</Layout>
	);
};

export default CheckRegistration;
