import React, { Component } from 'react';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import axios from 'axios';
import InputRange from 'react-input-range';
import VehiclesList from './vehicle-list.component';
import VehicleListFilter from './vehicle-list-filter.component';

export default class FilterableVehicleList extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            vehicles: [],
            selectedMake: '',
            selectedYears: {min: 1886, max: new Date().getFullYear()}
        };

        this.handleSelectedMakeChange = this.handleSelectedMakeChange.bind(this);
        this.handleSelectedYearsChange = this.handleSelectedYearsChange.bind(this);
    }

    handleSelectedMakeChange(selectedMake){
        console.log("Selected make filter updated to: " + selectedMake);
        this.setState({ selectedMake: selectedMake });
    }

    handleSelectedYearsChange(selectedYears){
        console.log("Selected years updated to: " + selectedYears.min + "-" + selectedYears.max);
        this.setState({selectedYears: { min: selectedYears.min, max: selectedYears.max}});
    }
	componentDidMount(){
		axios.get('http://localhost:4008/vehicles')
			.then(response => {
				this.setState({ vehicles: response.data });
			}).catch(function(error){
				console.log(error);
			})
	}

    render() {
        return(
            <div>
                <VehicleListFilter
                    vehicles={this.state.vehicles}
                    selectedMake={this.state.selectedMake}
                    onSelectedMakeChange={this.handleSelectedMakeChange}
                    selectedYears={this.state.selectedYears}
                    onSelectedYearsChange={this.handleSelectedYearsChange}
                    />
                <VehiclesList
                    vehicles={this.state.vehicles}
                    selectedMake={this.state.selectedMake}
                    selectedYears={this.state.selectedYears}
                    />
            </div>
        );
    }
}