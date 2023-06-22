// Do not expose your credentials in your code.
//let atlasDB = "mongodb+srv://deep307patel:cYWuFBSZBxP4Zm9e@Cluster0/carstore?retryWrites=true&w=majority";
let atlasDB = "mongodb+srv://deep307patel:deep3030@cluster0.vbz4gmh.mongodb.net/carstore?retryWrites=true&w=majority";

const Car = require('../models/car');
exports.processAddPage = function(req, res) {
    const carsToAdd = [
      { make: 'Toyota', model: 'Camry', year: 2022, color: 'Silver' },
      { make: 'Honda', model: 'Accord', year: 2021, color: 'Black' },
      { make: 'Ford', model: 'Mustang', year: 2023, color: 'Red' }
      
    ];
  
    carsToAdd.forEach(carData => {
      const newCar = new Car(carData);
  
      newCar.save(function(err) {
        if (err) {
          console.error(err);
        }
      });
    });
  
    res.redirect('/cars/list'); // Redirect to the Car List page
  };



// Database setup
let mongoose = require('mongoose'); 

module.exports = function(){

    mongoose.connect(atlasDB, { useNewUrlParser: true, useUnifiedTopology: true});
    let mongodb = mongoose.connection;

    mongodb.on('error', console.error.bind(console, 'Connection Error:'));
    mongodb.once('open', ()=>{
        console.log('===> Connected to MongoDB.');
    })

    return mongodb;
}