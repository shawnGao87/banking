import React, { Component, Fragment } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

export default class Login extends Component {
	constructor(props) {
		super(props);

		if (sessionStorage.getItem("Authenticated")) {
			sessionStorage.setItem("Authenticated", false);
		}
		this.state = {
			email: "",
			password: "",
			show: false,
			errMessage: "",
			authenticated: sessionStorage.getItem("Authenticated")
		};
	}

	labelStyle = {
		color: "white"
	};

	handleSubmit = e => {
		const data = {
			Email: this.state.email,
			Password: this.state.password
		};
		fetch("/api/User/Login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(data)
		})
			.then(res => res.json())
			.then(json => {
				console.log(json.res);
				if (json.res.id) {
					sessionStorage.setItem("UserId", json.res.id);
					sessionStorage.setItem("Authenticated", true);
					sessionStorage.setItem("FirstName", json.res.firstName);
					sessionStorage.setItem("LastName", json.res.lastName);
					window.location.href = "/Dashboard";
				} else {
					this.setState({ show: true, errMessage: json.res });
					setTimeout(() => {
						this.setState({ show: false });
					}, 3000);
				}
			});

		e.preventDefault();
	};
	handleChange = e => {
		this.setState({ [e.target.type]: e.target.value });
	};

	render() {
		if (this.state.authenticated == "true") {
			window.location.href = "/Dashboard";
		} else {
			return (
				<Fragment>
					<Container>
						<Col xs={8} style={{ margin: "auto" }}>
							<h1 style={this.labelStyle}>Log In</h1>
							<Form onSubmit={this.handleSubmit}>
								<Form.Group controlId="formBasicEmail">
									<Form.Label style={this.labelStyle}>Email address</Form.Label>
									<Form.Control
										type="email"
										placeholder="Enter email"
										value={this.state.email}
										onChange={this.handleChange}
									/>
								</Form.Group>

								<Form.Group controlId="formBasicPassword">
									<Form.Label style={this.labelStyle}>Password</Form.Label>
									<Form.Control
										type="password"
										placeholder="Password"
										value={this.state.password}
										onChange={this.handleChange}
									/>
								</Form.Group>

								<Button variant="primary" type="submit">
									Login
								</Button>
							</Form>
							<Alert variant="danger" show={this.state.show}>
								<Alert.Heading>Error Logging In</Alert.Heading>
								<Alert.Heading>{this.state.errMessage}</Alert.Heading>
							</Alert>
						</Col>
					</Container>
				</Fragment>
			);
		}
	}
}
