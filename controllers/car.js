// create a reference to the model
let CarModel = require('../models/car');

// Gets all cars from the Database and renders the page to list them all.
module.exports.carList = async function(req, res, next) {  

    try {
        let carsList = await CarModel.find({});

        res.render('cars/list', {
            title: 'Cars List', 
            CarsList: carsList,
            userName: req.user ? req.user.username : ''
        })  
    } catch (error) {
        console.log(error);
        next(error);
    }
}


// Gets a car by id and renders the details page.
module.exports.details = async (req, res, next) => {

    try {
        let id = req.params.id;

        let carToShow = await CarModel.findById(id);

        res.render('cars/details', {
            title: 'Car Details', 
            car: carToShow
        })
    } catch (error) {
        console.log(error);
        next(error);
    }
}

// Renders the Add form using the add_edit.ejs template
module.exports.displayAddPage = (req, res, next) => {
    
    // ADD YOUR CODE HERE        
    res.render('../views/cars/add_edit.ejs', {title: 'Add a new Car', car: {}});

}

// Processes the data submitted from the Add form to create a new car
module.exports.processAddPage = (req, res, next) => {

    // ADD YOUR CODE HERE
    //Create a new Car object based on the form data    
    let newcar ={
        make: req.body.make,
        model: req.body.model,
        year: req.body.year
    };
    //Add new car to the database using the create method of the car model
    Car.create(newCar, function(err, car) {
        if (err) {
          console.log(err);
          res.redirect('/cars/list');
        } else {
          res.redirect('/cars/list');
        }
      });

}

// Gets a car by id and renders the Edit form using the add_edit.ejs template
module.exports.displayEditPage = (req, res, next) => {
    
     // ADD YOUR CODE HERE
        let id = reqq.params.id;
        //find car by Id using the findById method
        Car.findById(id, function(err, car) {
            if (err) {
              console.log(err);
              res.redirect('/cars/list');
            } else {
              res.render('cars/add_edit', { title: 'Edit Car', car: car });
            }
          });

}

// Processes the data submitted from the Edit form to update a car
module.exports.processEditPage = (req, res, next) => {
    
    // ADD YOUR CODE HERE
    let id = req.params.id;

    //create an object with updated car data
    let updatedCar = {
        _id: id,
        make: req.body.make,
        model: req.body.model,
        year: req.body.year
    }    
      // Update the car in the database using the update method 
  Car.updateOne({ _id: id }, updatedCar, function(err) {
    if (err) {
      console.log(err);
      res.redirect('/cars/list');
    } else {
      res.redirect('/cars/list');
    }
  });
}

// Deletes a car based on its id.
module.exports.performDelete = (req, res, next) => {
    
    // ADD YOUR CODE HERE
    let id = req.params.id;
    
      // Remove the car from the database using the remove method
  Car.remove({ _id: id }, function(err) {
    if (err) {
      console.log(err);
    }
    res.redirect('/cars/list');
  });

}