import React, { Component, useState } from 'react';
import Select from 'react-select';
import { Form, Button } from 'react-bootstrap';

export default class VehicleListFilter extends Component {
    constructor(props) {
        super(props);
        this.state = { selectedMake: '', isFilterApplied: false};
        this.handleApplyFilterClick = this.handleApplyFilterClick.bind(this);
        this.handleSelectedMakeChange = this.handleSelectedMakeChange.bind(this);
    }

    handleSelectedMakeChange =selectedMake => {
        this.setState(
            { selectedMake },
            () => console.log(`Option selected: `, this.state.selectedMake.value)
        );
    };

    handleApplyFilterClick() {
        this.setState({isFilterApplied: !this.state.isFilterApplied});
        console.log("Is filter active? " + this.state.isFilterApplied);
    }
    /**
	 * This uses the database to populate a dropdown menu with the makes of the vehicles in the DB.
	 * @returns the list of Vehicle makes
	 * TODO: Use the selected option to filter results from the DB
	 */
	vehicleMakesList(){
        const vehicleMakes = [];
        this.props.vehicles.forEach(vehicle => {
            //Check if this vehicle's make is already listed
            if(vehicleMakes.indexOf(vehicle.vehicle_make) === -1)
                //It's not in the list, so let's add it
                vehicleMakes.push(vehicle.vehicle_make);
        });
        return vehicleMakes.map(make => ({
            label: make,
            value: make
        }));
	}
    /**TODO: vehicleYearsList(){
        const vehicleYears = [];
        this.props.vehicles.forEach(vehicle => {
            //Check if this vehicle's make is already listed
            if(vehicleMakes.indexOf(vehicle.vehicle_year) === -1)
                //It's not in the list, so let's add it
                vehicleMakes.push(vehicle.vehicle_year);
        });
        return vehicleMakes.map(year => ({
            label: year,
            value: year
        }));
    }**/
    render(){
        const { selectedMake } = this.state;
        return(
            <div>
                <Select 
                    value={selectedMake} 
                    onChange={this.handleSelectedMakeChange}
                    options={this.vehicleMakesList()}
                />
                <Button variant="primary" type="submit" onClick={this.handleApplyFilterClick}>
                    { this.state.isFilterApplied ? 'Remove filter' : 'Apply filter'}</Button>
            </div>
        )
    }
}