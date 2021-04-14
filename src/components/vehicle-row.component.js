import React from 'react';
import { Link } from 'react-router-dom';

/**
 * This renders each row in the list of vehicles.
 * @param {*} props 
 */
const VehicleRow = (props) => {
    return(
        <tr className={props.vehicle.vehicle_sold ? 'vehicle_sold' : ''}>
			<td>
				{props.vehicle.vehicle_make}
			</td>
			<td>
				{props.vehicle.vehicle_model}
			</td>
			<td>
				{props.vehicle.vehicle_year}
			</td>
			<td>
				{props.vehicle.vehicle_price}
			</td>
			<td>
				{props.vehicle.vehicle_description}
			</td>
			<td>
				{props.vehicle.vehicle_fuel}
			</td>
			<td>
				<Link to={"/edit/"+props.vehicle._id}>Edit</Link>
			</td>
		</tr>
    );
}

export default VehicleRow;