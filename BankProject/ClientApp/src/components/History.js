import React, { Component, Fragment } from "react";
import Table from "react-bootstrap/Table";
export default class History extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const actionArr = this.props.data;
		return (
			<Fragment>
				<h1 style={{ color: "white" }}>Account History</h1>
				<Table striped bordered hover variant="dark">
					<thead>
						<tr>
							<th>Action Taken</th>
							<th>Amount</th>
							<th>Balance After Action</th>
							<th>Time/Date</th>
						</tr>
					</thead>
					<tbody>
						{actionArr.map(i => {
							const { actionTaken, amount, balance, timeStamp } = i;
							return (
								<tr key={i}>
									<td key={`td_` + i}>{actionTaken}</td>
									<td key={`td_` + i}>
										{Intl.NumberFormat({
											style: "currency",
											currency: "USD"
										}).format(amount)}
									</td>
									<td key={`td_` + i}>
										{Intl.NumberFormat({
											style: "currency",
											currency: "USD"
										}).format(balance)}
									</td>
									<td key={`td_` + i}>{timeStamp}</td>
								</tr>
							);
						})}
					</tbody>
				</Table>
			</Fragment>
		);
	}
}
