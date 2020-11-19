import React, { Component } from 'react';
//import axios from 'axios';

export default class AddVehicle extends Component {
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
		//Set up Component state
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
	render(){
		return(
			<div style={{marginTop: 10}}>
				<h3>Add New Vehicle</h3>
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
					<div className="form-group">
						<input type="submit" value="Add vehicle" className="btn btn-primary"/>
					</div>
				</form>
			</div>
		)}
	
	onSubmit(e){
		e.preventDefault(); //prevents default HTML form submission behaviour as the back-end isn't implemented yet
		console.log(`Form submitted:`);
		console.log(`Vehicle name: ${this.state.vehicle_year} ${this.state.vehicle_make} ${this.state.vehicle_model}`);
		const hesGotABrandNewCar = {
			//TODO: assign properties from the entered form
		};
		//TODO: install Axios
		//axios.post('http://localhost:4000/vehicles/add', hesGotABrandNewCar)	.then(res => console.log(res.data));
			
		this.setState({	
			vehicle_make: "",
			vehicle_model: "",
			vehicle_year: 1970,
			vehicle_price: 0,
			vehicle_description: "",
			vehicle_fuel: "",
			vehicle_sold: false
		})
	}	
}