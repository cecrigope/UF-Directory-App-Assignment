/* Dependencies */
var mongoose = require('mongoose'),
  Listing = require('../models/listings.server.model.js');

/*
  In this file, you should use Mongoose queries in order to retrieve/add/remove/update listings.
  On an error you should send a 400 status code, as well as the error message.
  On success (aka no error), you should send the listing(s) as JSON in the response.

  HINT: if you are struggling with implementing these functions, refer back to this tutorial
  from assignment 3 https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications
 */

/* Create a listing */
exports.create = function(req, response) {

  /* Instantiate a Listing */
  var listing = new Listing(req.body);

  /* save the coordinates (located in req.results if there is an address property) */
  if (req.results) {
    listing.coordinates = {
      latitude: req.results.lat,
      longitude: req.results.lng
    };
  }

  /* Then save the listing */
  listing.save(function(err) {
    if (err) {
      console.log(err);
      response.status(400).send(err);
    } else {
      response.json(listing);
    }
  });
};

/* Show the current listing */
exports.read = function(req, response) {
  /* send back the listing as json from the request */
  response.json(req.listing);
};

/* Update a listing */
exports.update = function(req, response) {
  var listing = req.listing;

  /* Replace the article's properties with the new properties found in req.body */
  /* save the coordinates (located in req.results if there is an address property) */
  /* Save the article */

  if (req.listing) {
    listing.code = req.body.code;
    listing.name = req.body.name;
    listing.address = req.body.address;
  }

  if (req.results) {
    listing.coordinates = {
      latitude: req.results.lat,
      longitude: req.results.lng
    };
  }

  listing.save(function(err) {
    if (err) {
      console.log(err);
      response.status(400).send(err);
    } else {
      response.json(req.listing);
    }
  });
};

/* Delete a listing */
exports.delete = function(req, response) {
  var listing = req.listing;

  /* Remove the article */
  Listing.remove(function(err) {
    if (err) {
      console.log(err);
      response.status(400).send(err);
    } else {
      response.end();
    }
  });
};

/* Retrieve all the directory listings, sorted alphabetically by listing code */
exports.list = function(req, response) {
  /* Your code here */
  Listing.find().sort('code').exec(function(err, listings) {
    if (err) {
      console.log(err);
      response.status(400).send(err);
    } else {
      response.json(listings);
    }
  });
};

/*
  Middleware: find a listing by its ID, then pass it to the next request handler.

  HINT: Find the listing using a mongoose query,
        bind it to the request object as the property 'listing',
        then finally call next
 */
exports.listingByID = function(req, response, next, id) {
  Listing.findById(id).exec(function(err, listing) {
    if (err) {
      response.status(400).send(err);
    } else {
      req.listing = listing;
      next();
    }
  });
};
