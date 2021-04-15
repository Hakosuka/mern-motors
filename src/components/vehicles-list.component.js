import React, { Component } from 'react';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import axios from 'axios';
import VehicleRow from './vehicle-row.component';
import VehicleListFilter from './vehicles-filter.component';

//TODO: Implement search filters
//TODO: Figure out why the description doesn't get automatically updated in the table, but other attributes do.

export default class VehiclesList extends Component {
	constructor(props){
		super(props);
		
		const vehicles = this.props.vehicles;

	}
	/**
	 * This accesses the retrieved Vehicle objects and renders them in a list.
	 * @returns the list of Vehicles
	 */
	vehicleList() {
		console.log("Accessing vehicle list");
		return this.props.vehicles.map(function(currentVehicle, listIndex){
			console.log(currentVehicle);
			//console.log(this.state.selected_make);
			return <VehicleRow vehicle={currentVehicle} key={listIndex}/>;
		})
	}
	
	//Set up onChange bindings
	onChangeVehicleMakeFilter(e){
		console.log(e.target.value);
		this.setState({
			selected_make: e.target.value
		});
	}
	//TODO: Implement a way for the user to pick an attribute to sort by
	//TODO: Implement a filter for results
	render(){
		return(
			<div>
				<h3>Vehicles List</h3>
				<table className="table table-striped">
					<thead>
						<tr>
							<th>Make</th>
							<th>Model</th>
							<th>Year</th>
							<th>Price</th>
							<th>Description</th>
							<th>Fuel</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{ this.vehicleList() }
					</tbody>
				</table>
			</div>
		)
	}
}