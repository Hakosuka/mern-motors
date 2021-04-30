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
            selectedMake: ''//,
            //selectedYears: {min: 0, max: 0}
        };

        this.handleSelectedMakeChange = this.handleSelectedMakeChange.bind(this);
    }

    handleSelectedMakeChange(selectedMake){
        console.log("Selected make filter updated to: " + selectedMake);
        this.setState({ selectedMake: selectedMake });
    }

    handleApplyFilterClick(isFilterApplied) {
        this.setState({ isFilterApplied: isFilterApplied });
    }

	componentDidMount(){
		axios.get('http://localhost:4008/vehicles')
			.then(response => {
				this.setState({ vehicles: response.data});
			}).catch(function(error){
				console.log(error);
			})
	}

    /*getOldestCarYear(){
        vehicles = this.state.vehicles;

    }*/
    render() {
        return(
            <div>
                {/*<InputRange
                    maxValue={Date.now()}
                    minValue={}
                    value={this.state.selectedYears}
                    onChange={value => this.setState({selectedYears: value})}/>*/}
                <VehicleListFilter
                    vehicles={this.state.vehicles}
                    selectedMake={this.state.selectedMake}
                    onSelectedMakeChange={this.handleSelectedMakeChange}
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