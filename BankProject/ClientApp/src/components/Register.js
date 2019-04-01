import React, { Component, Fragment } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

export default class Register extends Component {
	constructor(props) {
		super(props);
		this.state = {
			show: false,
			FirstName: "",
			LastName: "",
			Email: "",
			Password: "",
			errShow: false,
			errMessage: ""
		};
	}
	handleSubmit = e => {
		const { FirstName, LastName, Email, Password } = this.state;
		const data = {
			FirstName: FirstName,
			LastName: LastName,
			Email: Email,
			Password: Password
		};
		fetch("/api/User/Register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(data)
		})
			.then(res => res.json())
			.then(json => {
				console.log(json.res);
				if (json.res == "success") {
					this.setState({ show: true });
					setTimeout(() => {
						window.location.href = "/";
					}, 3000);
				} else {
					this.setState({ errShow: true, errMessage: json.res });
					setTimeout(() => {
						this.setState({ show: false });
					}, 3000);
				}
			});

		e.preventDefault();
	};
	handleChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	render() {
		return (
			<Fragment>
				<Container>
					<Col xs={8} style={{ margin: "auto" }}>
						<h1 style={this.labelStyle}>Register</h1>
						<Form onSubmit={this.handleSubmit} style={{ color: "white" }}>
							<Form.Group controlId="registerForm">
								<Form.Label style={this.labelStyle}>First Name</Form.Label>
								<Form.Control
									type="text"
									placeholder="First Name"
									name="FirstName"
									value={this.state.FirstName}
									onChange={this.handleChange}
								/>
								<Form.Label style={this.labelStyle}>Last Name</Form.Label>
								<Form.Control
									type="text"
									placeholder="Last Name"
									name="LastName"
									value={this.state.LastName}
									onChange={this.handleChange}
								/>
								<Form.Label style={this.labelStyle}>Email address</Form.Label>
								<Form.Control
									type="email"
									placeholder="Enter email"
									value={this.state.Email}
									name="Email"
									onChange={this.handleChange}
								/>
							</Form.Group>

							<Form.Group controlId="formBasicPassword">
								<Form.Label style={this.labelStyle}>Password</Form.Label>
								<Form.Control
									type="password"
									placeholder="Password"
									name="Password"
									value={this.state.Password}
									onChange={this.handleChange}
								/>
							</Form.Group>

							<Button variant="primary" type="submit">
								Register
							</Button>
						</Form>
						<Alert variant="sucess" show={this.state.show}>
							<Alert.Heading>Successfully registered.</Alert.Heading>
							<Alert.Heading>
								You'll be redirect to log in page in 3 seconds...
							</Alert.Heading>
						</Alert>

						<Alert variant="danger" show={this.state.errShow}>
							<Alert.Heading>Error Logging In</Alert.Heading>
							<Alert.Heading>{this.state.errMessage}</Alert.Heading>
						</Alert>
					</Col>
				</Container>
			</Fragment>
		);
	}
}
