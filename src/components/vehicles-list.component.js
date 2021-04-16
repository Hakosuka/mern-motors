import React, { Component } from 'react';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import axios from 'axios';
import VehicleRow from './vehicle-row.component';
import VehicleListFilter from './vehicles-filter.component';

//TODO: Implement search filters
//TODO: Figure out why the description doesn't get automatically updated in the table, but other attributes do.

export default class VehiclesList extends Component {
	//TODO: Implement a way for the user to pick an attribute to sort by
	//TODO: Implement a filter for results
	render(){
		const selectedMake = this.props.selectedMake;
		const isFilterApplied = this.props.isFilterApplied;
		console.log("Filter applied? " + isFilterApplied); 
		console.log("Selected make: " + selectedMake);
		
		const vehicleRows = [];
		console.log("Accessing vehicle list");
		
		this.props.vehicles.map((element) => {
			if(isFilterApplied && element.vehicle_make != selectedMake){
				console.log("This " + element.vehicle_make + " " + element.vehicle_model + " isn't made by the selected manufacturer");
				return;
			} else {
				vehicleRows.push(
					<VehicleRow vehicle={element} key={element._id}/>
				);
			}
		});
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
						{ vehicleRows }
					</tbody>
				</table>
			</div>
		)
	}
}