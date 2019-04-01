import React, { Component, Fragment } from "react";
import { Route } from "react-router";
import Login from "./components/Login";
import Register from "./components/Register";
import History from "./components/History";
import Dashboard from "./components/Dashboard";
import NavMenu from "./components/NavMenu";

export default class App extends Component {
	displayName = App.name;
	constructor(props) {
		super(props);
		if (!sessionStorage.getItem("Authenticated")) {
			sessionStorage.setItem("Authenticated", false);
		}
		this.state = {
			authenticated: sessionStorage.getItem("Authenticated"),
			UserId: sessionStorage.getItem("UserId")
		};
	}
	render() {
		if (this.state.authenticated === "false") {
			return (
				<Fragment>
					<NavMenu />
					<Route exact path="/" component={Login} />
					<Route path="/Register" component={Register} />
				</Fragment>
			);
		} else {
			return (
				<Fragment>
					<NavMenu />
					<Route path="/Dashboard" component={Dashboard} />
				</Fragment>
			);
		}
	}
}
