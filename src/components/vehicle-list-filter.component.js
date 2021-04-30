import React, { Component, useState } from 'react';
import Select from 'react-select';
import { Form, Button } from 'react-bootstrap';

export default class VehicleListFilter extends Component {
    constructor(props) {
        super(props);
        this.state = { selectedMake: '', isFilterApplied: false};
        this.handleSelectedMakeChange = this.handleSelectedMakeChange.bind(this);
    }
    /**
     * Filters the vehicle list based on the user's selection.
     * @param selectedMake The make selected by the user to filter the vehicle list.
     */
    handleSelectedMakeChange(selectedMake){
        this.setState(
            { selectedMake },
            () => console.log(`Option selected: `, this.state.selectedMake.value)
        );
        //Note that this is defined in FilterableVehicleList
        this.props.onSelectedMakeChange(selectedMake.value);
    }

    /**
	 * This uses the database to populate a dropdown menu with the makes of the vehicles in the DB.
	 * @returns the list of Vehicle makes
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
    render(){
        const { selectedMake } = this.state;
        return(
            <div>
                <Select 
                    value={selectedMake} 
                    defaultValue={this.vehicleMakesList()}
                    onChange={this.handleSelectedMakeChange}
                    options={this.vehicleMakesList()}
                />
                {/* 
                <Button variant="primary" type="submit" onClick={this.handleApplyFilterClick}>
                    { this.state.isFilterApplied ? 'Remove filter' : 'Apply filter'}</Button> 
                */}
            </div>
        )
    }
}