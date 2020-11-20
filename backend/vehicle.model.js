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
        type: Number
    },
    vehicle_price: {
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