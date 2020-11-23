import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

//TODO: Implement search filters
//This formats the Vehicle data for the table which will show the Vehicles.
const Vehicle = props => (
	<tr>
		<td className={props.vehicle.vehicle_sold ? 'vehicle_sold' : ''}>{props.vehicle.vehicle_make}</td>
		<td className={props.vehicle.vehicle_sold ? 'vehicle_sold' : ''}>{props.vehicle.vehicle_model}</td>
		<td className={props.vehicle.vehicle_sold ? 'vehicle_sold' : ''}>{props.vehicle.vehicle_year}</td>
		<td className={props.vehicle.vehicle_sold ? 'vehicle_sold' : ''}>{props.vehicle.vehicle_price}</td>
		<td className={props.vehicle.vehicle_sold ? 'vehicle_sold' : ''}>{props.vehicle.vehicle_description}</td>
		<td className={props.vehicle.vehicle_sold ? 'vehicle_sold' : ''}>{props.vehicle.vehicle_fuel}</td>
		<td>
			<Link to={"/edit/"+props.vehicle._id}>Edit</Link>
		</td>
	</tr>
)
export default class VehiclesList extends Component {
	constructor(props){
		super(props);
		this.state = {vehicles: []};
	}
	componentDidMount(){
		axios.get('http://localhost:4008/vehicles')
			.then(response => {
				this.setState({ vehicles: response.data});
			}).catch(function(error){
				console.log(error);
			})
	}
	/**
	 * This accesses the retrieved Vehicle objects and renders them in a list.
	 * @returns the list of Vehicles
	 */
	vehicleList() {
		return this.state.vehicles.map(function(currentVehicle, listIndex){
			return <Vehicle vehicle={currentVehicle} key={listIndex}/>;
		})
	}
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