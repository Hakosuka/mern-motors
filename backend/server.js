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
vehicleRoutes.route('/').get(function(req, res){
    Vehicle.find(function(err, allVehicles){
        if(err) {
            console.log(err);
        } else {
            res.json(allVehicles);
        }
    })
});

//Handles GET requests for a specific vehicle
vehicleRoutes.route('/:id').get(function(req, res){
    let vehicleId = req.params.id;
    Vehicle.findById(vehicleId, function(err, selectedVehicle){
        res.json(selectedVehicle);
    });
});

//POSTS updates to vehicles in the database
vehicleRoutes.route('/update/:id').post(function(req, res){
    Vehicle.findById(req.params.id, function(err, selectedVehicle){
        if(!selectedVehicle)
            res.status(404).send("No vehicle found for requested ID.");
        else
            selectedVehicle.vehicle_make = req.body.vehicle_make;
            selectedVehicle.vehicle_model = req.body.vehicle_model;
            selectedVehicle.vehicle_year = req.body.vehicle_year;
            selectedVehicle.vehicle_price = req.body.vehicle_price;
            selectedVehicle.vehicle_description = req.body.vehicle_description;
            selectedVehicle.vehicle_fuel = req.body.vehicle_fuel;

            selectedVehicle.save().then(selectedVehicle => {
                res.json("Vehicle updated!");
            }).catch(err => {
                res.status(400).send("Update failed.");
            });
    });
});

//POSTS new vehicles to the database
vehicleRoutes.route('/create').post(function(req, res){
    let newVehicle = new Vehicle(req.body);
    newVehicle.save().then(newVehicle => {
        res.status(200).json({'Vehicle': 'New vehicle added successfully.'});
    }).catch(err => {
        res.status(400).send('Creation of new vehicle failed.')
    });
});

app.use('/vehicles', vehicleRoutes);
app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});