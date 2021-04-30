import React, { Component, useState } from 'react';
import Select from 'react-select';
import "react-input-range/lib/css/index.css";
import InputRange from 'react-input-range';
import { Form, Button } from 'react-bootstrap';

export default class VehicleListFilter extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            selectedMake: '', 
            //Default to the year cars were invented and the current year
            selectedYears: {min: 1886, max: new Date().getFullYear()}
        };
        this.handleSelectedYearsChange = this.handleSelectedYearsChange.bind(this);
        this.handleSelectedMakeChange = this.handleSelectedMakeChange.bind(this);
    }
    handleSelectedYearsChange(selectedYears){
        this.setState(
            { selectedYears: { min: selectedYears.min, max: selectedYears.max } },
            () => console.log(`Selected years updated: ` + selectedYears)
        );
        this.props.onSelectedYearsChange(selectedYears);
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
            //Check if this vehicle is within the selected years range
            if(this.state.selectedYears.min <= vehicle.vehicle_year && vehicle.vehicle_year <= this.state.selectedYears.max){
                //Check if this vehicle's make is already listed
                if(vehicleMakes.indexOf(vehicle.vehicle_make) === -1)
                    //It's not in the list, so let's add it
                    vehicleMakes.push(vehicle.vehicle_make);
                else
                    console.log("This make is already listed.");
        }});
            
        return vehicleMakes.map(make => ({
            label: make,
            value: make
        }));
	}

    //TODO: Figure out why this is getting called every time I use the slider
    /**
     * Iterates through the vehicles in the DB to find the earliest year so that it can be 
     * used as the minimum value for the InputRange.
     * @returns minYearLimit: The year in which the oldest vehicle in the database was made.
     */
    getOldestCarYear(){
        let minYearLimit = new Date().getFullYear();
        this.props.vehicles.forEach(vehicle => {
            if(vehicle.vehicle_year < minYearLimit){
                minYearLimit = vehicle.vehicle_year;
            }
        })
        return minYearLimit;
    }
    render(){
        const { selectedMake } = this.state;
        let defaultMaxYear = new Date().getFullYear();
        let defaultMinYear = this.getOldestCarYear();
        return(
            <div>
                <InputRange
                    allowSameValues
                    maxValue={defaultMaxYear}
                    minValue={defaultMinYear}
                    value={this.state.selectedYears}
                    onChange={this.handleSelectedYearsChange}/>
                <Select 
                    value={selectedMake} 
                    defaultValue={this.vehicleMakesList()}
                    onChange={this.handleSelectedMakeChange}
                    options={this.vehicleMakesList()}
                />
            </div>
        )
    }
}