import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
	render() {
		return(
			<Router>
				<Route path="/" exact component={VehiclesList} />
				<Route path="/edit/:id" component={EditVehicle} />
				<Route path="/create" component={AddVehicle} />
				<div className="container">
					<h2>MERN Motors</h2>
				</div>
			</Router>
		);
	}
}
export default App;