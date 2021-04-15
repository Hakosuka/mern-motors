import React from 'react';
import { Link } from 'react-router-dom';

/**
 * This renders each row in the list of vehicles.
 * @param {*} props 
 */
const VehicleRow = (props) => {
    const { vehicle } = props;
    return(
        <tr className={vehicle.vehicle_sold ? 'vehicle_sold' : ''}>
			<td>
				{vehicle.vehicle_make}
			</td>
			<td>
				{vehicle.vehicle_model}
			</td>
			<td>
				{vehicle.vehicle_year}
			</td>
			<td>
				{vehicle.vehicle_price}
			</td>
			<td>
				{vehicle.vehicle_description}
			</td>
			<td>
				{vehicle.vehicle_fuel}
			</td>
			<td>
				<Link to={"/edit/"+vehicle._id}>Edit</Link>
			</td>
		</tr>
    );
}

export default VehicleRow;