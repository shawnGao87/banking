import React, { Component, Fragment } from "react";
import ActionForm from "./ActionForm";
export default class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			authenticated: sessionStorage.getItem("Authenticated"),
			FirstName: sessionStorage.getItem("FirstName"),
			LastName: sessionStorage.getItem("LastName"),
			UserId: sessionStorage.getItem("UserId")
		};
	}
	render() {
		if (this.state.authenticated === "true") {
			return (
				<Fragment>
					<h1>Dashboard</h1>
					<h3>Welcom back, {this.state.FirstName}</h3>
					<ActionForm />
				</Fragment>
			);
		} else {
			window.location.href = "/";
		}
	}
}
