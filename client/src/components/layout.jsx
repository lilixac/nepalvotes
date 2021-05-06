import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const Layout = ({ children, isOwner }) => {
	return (
		<Container>
			<Row>
				<Col xs={2}>
					<div className="sidenav">
						<Link to="/">
							{" "}
							<h3> Nepal Votes </h3>{" "}
						</Link>
						{isOwner ? (
							<div>
								{" "}
								<Link to="/approveVoter">Approve Voters</Link>
								<Link to="/changeOwner">Change Owner</Link>
								<Link to="/addCandidate">
									Add Candidates
								</Link>{" "}
							</div>
						) : null}{" "}
						<Link to="/viewCandidates">View Candidates</Link>
						<Link to="/checkRegistration">Check Registration</Link>
						<Link to="/vote">Vote</Link>
					</div>
				</Col>
				<Col xs={10}>{children}</Col>
			</Row>
		</Container>
	);
};
export default Layout;
