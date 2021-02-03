const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Vehicle = new Schema({
    vehicle_make: {
        type: String
    },
    vehicle_model: {
        type: String
    },
    vehicle_year: {
        type: Number, 
        min: 1886, 
        max: Date.now(),
        default: 1970
    },
    vehicle_price: {
        min: 0,
        type: Number
    },
    vehicle_description: {
        type: String
    },
    vehicle_fuel: {
        type: String
    },
    vehicle_sold: {
        type: Boolean
    }
});

module.exports = mongoose.model('Vehicle', Vehicle);