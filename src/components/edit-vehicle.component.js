import React, { Component } from 'react';
import axios from 'axios';

export default class EditVehicle extends Component {
	constructor(props){
		super(props);
		//Set up bindings
		this.onChangeVehicleMake = this.onChangeVehicleMake.bind(this);
		this.onChangeVehicleModel = this.onChangeVehicleModel.bind(this);
		this.onChangeVehicleYear = this.onChangeVehicleYear.bind(this);
		this.onChangeVehiclePrice = this.onChangeVehiclePrice.bind(this);
		this.onChangeVehicleDescription = this.onChangeVehicleDescription.bind(this);
		this.onChangeVehicleFuel = this.onChangeVehicleFuel.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		//Set default state
		this.state = {
			vehicle_make: "",
			vehicle_model: "",
			vehicle_year: 1970, 
			vehicle_price: 0,
			vehicle_description: "",
			vehicle_fuel: "",
			vehicle_sold: false
		}
	}
	componentDidMount(){
		//Fetch the Vehicle that the user wants to edit
		axios.get('http://localhost:4008/vehicles/'+this.props.match.params.id)
			.then(response => {
				this.setState({
					vehicle_make: response.data.vehicle_make,
					vehicle_model: response.data.vehicle_model,
					vehicle_year: response.data.vehicle_year, 
					vehicle_price: response.data.vehicle_price,
					vehicle_description: response.data.vehicle_description,
					vehicle_fuel: response.data.vehicle_fuel,
					vehicle_sold: response.data.vehicle_sold
				})
			})
			.catch(function(err) {
				console.log("Error when loading Vehicle: " + err);
			})
	}
	//Set up onChange bindings
	onChangeVehicleMake(e){
		this.setState({
			vehicle_make: e.target.value
		});
	}
	onChangeVehicleModel(e){
		this.setState({
			vehicle_model: e.target.value
		});
	}
	onChangeVehicleYear(e){
		this.setState({
			vehicle_year: e.target.value
		});
	}
	onChangeVehiclePrice(e){
		this.setState({
			vehicle_price: e.target.value
		});
	}
	onChangeVehicleDescription(e){
		this.setState({
			vehicle_description: e.target.value
		});
	}
	onChangeVehicleFuel(e){
		this.setState({
			vehicle_fuel: e.target.value
		});
	}
	onChangeVehicleSold(e){
		this.setState({
			vehicle_sold: !this.state.vehicle_sold
		});
	}
	render(){
		//TODO: Enable the user to edit the selected vehicle
		return(
			<div>
				<h3 align="center">Edit Vehicle</h3>
				<form onSubmit={this.onSubmit}>
					<div className="form-group">
						<label>Manufacturer: </label>
						<input type="text"
							className="form-control"
							value={this.state.vehicle_make}
							onChange={this.onChangeVehicleMake}/>
					</div>
					<div className="form-group">
						<label>Model: </label>
						<input type="text"
							className="form-control"
							value={this.state.vehicle_model}
							onChange={this.onChangeVehicleModel}/>
					</div>
					<div className="form-group">
						<label>Year: </label>
						<input type="number"
							className="form-control"
							value={this.state.vehicle_year}
							onChange={this.onChangeVehicleYear}/>
					</div>
					<div className="form-group">
						<label>Price: </label>
						<input type="number"
							className="form-control"
							value={this.state.vehicle_price}
							onChange={this.onChangeVehiclePrice}/>
					</div>
					<div className="form-group">
						<label>Description: </label>
						<input type="text"
							className="form-control"
							value={this.state.vehicle_description}
							onChange={this.onChangeVehicleDescription}/>
					</div>
					<div className="form-group">
						<div className="form-check form-check-inline">
							<input className="form-check-input"
								type="radio"
								name="fuelOptions"
								id="fuelPetrol"
								value="Petrol"
								checked={this.state.vehicle_fuel==='Petrol'}
								onChange={this.onChangeVehicleFuel}
								/>
							<label className="form-check-label">Petrol</label>
						</div>
						<div className="form-check form-check-inline">
							<input className="form-check-input"
								type="radio"
								name="fuelOptions"
								id="fuelDiesel"
								value="Diesel"
								checked={this.state.vehicle_fuel==='Diesel'}
								onChange={this.onChangeVehicleFuel}
								/>
							<label className="form-check-label">Diesel</label>
						</div>
						<div className="form-check form-check-inline">
							<input className="form-check-input"
								type="radio"
								name="fuelOptions"
								id="fuelPetrolHybrid"
								value="Petrol hybrid"
								checked={this.state.vehicle_fuel==='Petrol hybrid'}
								onChange={this.onChangeVehicleFuel}
								/>
							<label className="form-check-label">Petrol hybrid</label>
						</div>
						<div className="form-check form-check-inline">
							<input className="form-check-input"
								type="radio"
								name="fuelOptions"
								id="fuelDieselHybrid"
								value="Diesel hybrid"
								checked={this.state.vehicle_fuel==='Diesel hybrid'}
								onChange={this.onChangeVehicleFuel}
								/>
							<label className="form-check-label">Diesel hybrid</label>
						</div>
						<div className="form-check form-check-inline">
							<input className="form-check-input"
								type="radio"
								name="fuelOptions"
								id="fuelElectric"
								value="Electric"
								checked={this.state.vehicle_fuel==='Electric'}
								onChange={this.onChangeVehicleFuel}
								/>
							<label className="form-check-label">Electric</label>
						</div>
					</div>
					<div className="form-check">
						<input className="form-check-input"
							id="soldCheckbox"
							type="checkbox"
							name="soldCheckbox"
							onChange={this.onChangeVehicleSold}
							checked={this.state.vehicle_sold}
							value={this.state.vehicle_sold}
							/>
						<label className="form-check-label" htmlFor="soldCheckbox">
							Sold
						</label>
					</div>
					<div className="form-group">
						<input type="submit" value="Update vehicle" className="btn btn-primary"/>
					</div>
				</form>
			</div>
		)
	}
	onSubmit(e){
		e.preventDefault();
		const updatedVehicle = {
			vehicle_make: this.state.vehicle_make,
			vehicle_model: this.state.vehicle_model,
			vehicle_year: this.state.vehicle_year,
			vehicle_price: this.state.vehicle_price,
			vehicle_description: this.state.vehicle_description,
			vehicle_fuel: this.state.vehicle_fuel,
			vehicle_sold: this.state.vehicle_sold
		};
		console.log(updatedVehicle);
		axios.post('http://localhost:4008/vehicles/edit/'+this.props.match.params.id, updatedVehicle)
			.then(response => console.log(response.data));
			
		this.props.history.push('/'); //returns the user to the index
	}
}