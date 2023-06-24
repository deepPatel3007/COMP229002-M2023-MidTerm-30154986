const express = require('express');
const router = express.Router();
const passport = require('passport');
const carController = require('../controllers/car');

// Helper function for guard purposes
function requireAuth(req, res, next) {
  // Check if the user is logged in
  if (req.isAuthenticated()) {
    console.log('User is authenticated!');
    return next();
  }
  req.session.originalUrl = req.originalUrl;
  res.redirect('../views/auth/sign');
}

/* GET list of items */
router.get('/list', carController.carList);

// Route for Details
router.get('/details', carController.details);

// Routes for edit (protected routes)
router.get('/edit/:id', requireAuth, carController.displayEditPage);
router.post('/edit/:id', requireAuth, carController.processEditPage);

// Delete (protected routes)
router.get('/delete/:id', requireAuth, carController.performDelete);

/* GET Route for displaying the Add page - CREATE Operation (protected routes) */
router.get('/add', requireAuth, carController.displayAddPage);

/* POST Route for processing the Add page - CREATE Operation (protected routes) */
router.post('/add', requireAuth, carController.processAddPage);

module.exports = router;
