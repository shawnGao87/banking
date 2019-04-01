import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar, Button } from "react-bootstrap";

export default class NavMenu extends Component {
	displayName = NavMenu.name;

	constructor(props) {
		super(props);
		this.state = {
			authenticated: sessionStorage.getItem("Authenticated")
		};
	}

	logout = e => {
		console.log(e);
		sessionStorage.clear();
		sessionStorage.setItem("Authenticated", false);
		window.location.href = "/";
	};
	render() {
		if (this.state.authenticated === "true") {
			return (
				<Fragment>
					<Navbar variant="dark" bg="dark">
						<Navbar.Brand>
							<Link to={"/Dashboard"}>BankProject</Link>
						</Navbar.Brand>
						<Nav className="mr-auto">
							<Nav.Link href="/Dashboard">Dashboard</Nav.Link>
							<Nav.Link>
								<Button onClick={this.logout}>Log Out</Button>
							</Nav.Link>
						</Nav>
					</Navbar>
				</Fragment>
			);
		} else {
			return (
				<Fragment>
					<Navbar variant="dark" bg="dark">
						<Navbar.Brand>
							<Link to={"/"}>BankProject</Link>
						</Navbar.Brand>
						<Nav className="mr-auto">
							<Nav.Link href="/">Login</Nav.Link>
							<Nav.Link href="/Register">Register</Nav.Link>
						</Nav>
					</Navbar>
				</Fragment>
			);
		}
	}
}
