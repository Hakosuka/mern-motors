const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const vehicleRoutes = express.Router();
const PORT = 4008;

let Vehicle = require('./vehicle.model');

app.use(cors());
app.use(bodyParser.json());

//Connect to the vehicle database
mongoose.connect('mongodb://127.0.0.1:27017/mern-motors', {useNewUrlParser: true});
const connection = mongoose.connection;

connection.once('open', function(){
    console.log("MongoDB connection established successfully.");
})

//Handles GET requests for the entire vehicle list.
vehicleRoutes.route('/').get(function(request, response){
    Vehicle.find(function(err, allVehicles){
        if(err) {
            console.log(err);
        } else {
            response.json(allVehicles);
        }
    })
});

//Handles GET requests for a specific vehicle
vehicleRoutes.route('/:id').get(function(request, response){
    let vehicleId = request.params.id;
    Vehicle.findById(vehicleId, function(err, selectedVehicle){
        response.json(selectedVehicle);
    });
});

//POSTS updates to vehicles in the database
vehicleRoutes.route('/edit/:id').post(function(request, response){
    Vehicle.findById(request.params.id, function(err, selectedVehicle){
        if(!selectedVehicle)
            response.status(404).send("No vehicle found for requested ID.");
        else
            selectedVehicle.vehicle_make = request.body.vehicle_make;
            selectedVehicle.vehicle_model = request.body.vehicle_model;
            selectedVehicle.vehicle_year = request.body.vehicle_year;
            selectedVehicle.vehicle_price = request.body.vehicle_price;
            selectedVehicle.vehicle_description = request.body.vehicle_description;
            selectedVehicle.vehicle_fuel = request.body.vehicle_fuel;

            selectedVehicle.save().then(selectedVehicle => {
                response.json("Vehicle updated!");
            }).catch(err => {
                response.status(400).send("Update failed.");
            });
    });
});

//POSTS new vehicles to the database
vehicleRoutes.route('/add').post(function(request, response){
    let newVehicle = new Vehicle(request.body);
    newVehicle.save().then(newVehicle => {
        response.status(200).json({'Vehicle': 'New vehicle added successfully.'});
    }).catch(err => {
        response.status(400).send('Creation of new vehicle failed.')
    });
});

app.use('/vehicles', vehicleRoutes);
app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});