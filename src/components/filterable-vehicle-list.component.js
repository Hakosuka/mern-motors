import React, { Component } from 'react';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import axios from 'axios';
import VehiclesList from './vehicles-list.component';
import VehicleRow from './vehicle-row.component';
import VehicleListFilter from './vehicles-filter.component';

export default class FilterableVehicleList extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            vehicles: [],
            selectedMake: '',
            isFilterApplied: false
        };

        this.handleSelectedMakeChange = this.handleSelectedMakeChange.bind(this);
        this.handleApplyFilterClick = this.handleApplyFilterClick.bind(this);
        this.handleSelectedMakeChange = this.handleSelectedMakeChange.bind(this);
    }

    handleSelectedMakeChange(selectedMake){
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

    render() {
        return(
            <div>
                <VehicleListFilter
                    vehicles={this.state.vehicles}
                    selectedMake={this.state.selectedMake}
                    isFilterApplied={this.state.isFilterApplied}
                    onSelectedMakeChange={this.handleSelectedMakeChange}
                    onIsFilterAppliedChange={this.handleApplyFilterClick}
                    />
                <VehiclesList
                    vehicles={this.state.vehicles}
                    selectedMake={this.state.selectedMake}
                    isFilterApplied={this.state.isFilterApplied}
                    />
            </div>
        );
    }
}