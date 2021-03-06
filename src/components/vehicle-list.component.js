import React, { Component } from 'react';
//import Select from 'react-select';
//import { Link } from 'react-router-dom';
//import axios from 'axios';
import VehicleRow from './vehicle-row.component';

//TODO: Implement search filters
//TODO: Figure out why the description doesn't get automatically updated in the table, but other attributes do.

export default class VehiclesList extends Component {
	//TODO: Implement a way for the user to pick an attribute to sort by
	render(){
		const selectedMake = this.props.selectedMake;
		console.log(this.props.selectedYears.min, this.props.selectedYears.max);
		const selectedMinYear = this.props.selectedYears.min;
		const selectedMaxYear = this.props.selectedYears.max;
		console.log("Selected filters: " + selectedMinYear + "-" + selectedMaxYear + " " + selectedMake);

		const vehicleRows = [];
		console.log("Preparing to populate vehicle list");
		
		this.props.vehicles.forEach((element) => {
			//Check if this vehicle matches the filter criteria
			if(selectedMake && element.vehicle_make !== selectedMake 
				|| this.props.selectedYears.min && element.vehicle_year < this.props.selectedYears.min 
				|| this.props.selectedYears.max && element.vehicle_year > this.props.selectedYears.max){
				//This car doesn't match the filter criteria, so skip this.
				console.log(`Skipping ${element}`);
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