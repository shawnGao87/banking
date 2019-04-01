import React, { Component, Fragment } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import History from "./History";
export default class ActionForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			action: "Withdraw",
			amount: "",
			show: false,
			successShow: false,
			UserId: sessionStorage.getItem("UserId"),
			AllActions: []
		};
	}

	componentDidMount() {
		fetch("/api/Action/All/" + this.state.UserId, {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(res => res.json())
			.then(data => {
				const { res } = data;
				const arrLen = res.length;
				this.setState({ Balance: res[arrLen - 1].balance, AllActions: res });
			});
	}
	labelStyle = {
		color: "white"
	};

	handleSubmit = e => {
		if (this.state.action && this.state.amount > 0) {
			e.preventDefault();

			const Action = {
				ActionTaken: this.state.action,
				Amount: this.state.amount,
				UserId: this.state.UserId
			};

			fetch("/api/Action/ATM", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(Action)
			})
				.then(res => res.json())
				.then(data => {
					const { res } = data;
					this.setState({
						Balance: res.balance,
						AllActions: [...this.state.AllActions, res],
						successShow: true
					});
					setTimeout(() => {
						this.setState({ successShow: false });
					}, 3000);
				});
		} else {
			e.preventDefault();
			this.setState({
				show: true,
				errMessage:
					"There was some issue with " +
					this.state.action +
					"ing. Please try again!"
			});
			setTimeout(() => {
				this.setState({ show: false });
			}, 3000);
		}
	};

	handleChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	};
	render() {
		return (
			<Fragment>
				<h3 style={{ color: "white" }}>
					Your Balance Is: $
					{this.state.Balance
						? Intl.NumberFormat({
								style: "currency",
								currency: "USD"
						  }).format(this.state.Balance)
						: "Lodaing"}
				</h3>
				<Form onSubmit={this.handleSubmit}>
					<Form.Group controlId="action">
						<Form.Label style={this.labelStyle}>
							What would you like to do today?
						</Form.Label>
						<Form.Control
							name="action"
							as="select"
							onChange={this.handleChange}
							value={this.state.action}
						>
							<option>Withdraw</option>
							<option>Deposit</option>
						</Form.Control>
					</Form.Group>

					<Form.Group controlId="amount">
						<Form.Label style={this.labelStyle}>Amount</Form.Label>
						<Form.Control
							onChange={this.handleChange}
							name="amount"
							value={this.state.amount}
						/>
					</Form.Group>

					<Button variant="primary" type="submit">
						Submit
					</Button>
				</Form>
				<Alert variant="danger" show={this.state.show}>
					<Alert.Heading>Error Logging In</Alert.Heading>
					<Alert.Heading>{this.state.errMessage}</Alert.Heading>
				</Alert>

				<Alert variant="success" show={this.state.successShow}>
					<Alert.Heading>success</Alert.Heading>
				</Alert>

				<History data={this.state.AllActions} />
			</Fragment>
		);
	}
}
