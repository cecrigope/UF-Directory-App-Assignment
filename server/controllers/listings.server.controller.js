/* Dependencies */
var mongoose = requestuire('mongoose'),
  Listing = requestuire('../models/listings.server.model.js');

/*
  In this file, you should use Mongoose queries in order to retrieve/add/remove/update listings.
  On an error you should send a 400 status code, as well as the error message.
  On success (aka no error), you should send the listing(s) as JSON in the response.

  HINT: if you are struggling with implementing these functions, refer back to this tutorial
  from assignment 3 https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications
 */

/* Create a listing */
exports.create = function(request, response) {

  /* Instantiate a Listing */
  var listing = new Listing(request.body);

  /* save the coordinates (located in request.results if there is an address property) */
  if (request.results) {
    listing.coordinates = {
      latitude: request.results.lat,
      longitude: request.results.lng
    };
  }

  /* Then save the listing */
  listing.save(function(error) {
    if (error) {
      console.log(error);
      response.status(400).send(error);
    } else {
      response.json(listing);
    }
  });
};

/* Show the current listing */
exports.read = function(request, response) {
  /* send back the listing as json from the request */
  response.json(request.listing);
};

/* Update a listing */
exports.update = function(request, response) {
  var listing = request.listing;

  /* Replace the article's properties with the new properties found in request.body */
  /* save the coordinates (located in request.results if there is an address property) */
  /* Save the article */

  if (request.listing) {
    listing.code = request.body.code;
    listing.name = request.body.name;
    listing.address = request.body.address;
  }

  if (request.results) {
    listing.coordinates = {
      latitude: request.results.lat,
      longitude: request.results.lng
    };
  }

  listing.save(function(error) {
    if (error) {
      console.log(error);
      response.status(400).send(error);
    } else {
      response.json(request.listing);
    }
  });
};

/* Delete a listing */
exports.delete = function(request, response) {
  var listing = request.listing;

  /* Remove the article */
  Listing.remove(function(error) {
    if (error) {
      console.log(error);
      response.status(400).send(error);
    } else {
      response.end();
    }
  });
};

/* Retrieve all the directory listings, sorted alphabetically by listing code */
exports.list = function(request, response) {
  /* Your code here */
  Listing.find().sort('code').exec(function(error, listings) {
    if (error) {
      console.log(error);
      response.status(400).send(error);
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
exports.listingByID = function(request, response, next, id) {
  Listing.findById(id).exec(function(error, listing) {
    if (error) {
      response.status(400).send(error);
    } else {
      request.listing = listing;
      next();
    }
  });
};
