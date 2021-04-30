import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import CreateVehicle from "./components/create-vehicle.component";
import EditVehicle from "./components/edit-vehicle.component";
import FilterableVehicleList from "./components/filterable-vehicle-list.component";

//import logo from "./logo.png";
//import logo from "./logo.png";

class App extends Component {
	render() {
		//TODO: Stop Navbar hiding options in mobile orientation
		return(
			<Router>
				<div className="container">
					<nav className="navbar navbar-expand-lg 
					navbar-light bg-light">
						<Link to="/" className="navbar-brand">MERN Motors</Link>
						<div className="collapse navbar-collapse">
							<ul className="navbar-nav mr-auto">
								<li className="navbar-item">
									<Link to="/add" className="nav-link">
										Add vehicle
									</Link>
								</li>
							</ul>
						</div>
					</nav>
				<br/>
				<Route path="/" exact component={FilterableVehicleList} />
				<Route path="/edit/:id" component={EditVehicle} />
				<Route path="/add" component={CreateVehicle} />
				</div>
			</Router>
		);
	}
}
export default App;