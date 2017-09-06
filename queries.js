/* Fill out these functions using Mongoose queries*/
var mongoose = require('mongoose'),
  Listing = require('./ListingSchema.js'),
  Schema = mongoose.Schema,
  config = require('./config');

mongoose.connect("mongodb://admin:password@ds127044.mlab.com:27044/assignment3")

var findLibraryWest = function() {
  /*
    Find the document that contains data corresponding to Library West,
    then log it to the console.
   */

  Listing.findOne({
    name: 'Library West'
  }, function(error, response) {
    if (error) {
      throw error;
    }
    console.log(response);
  });
};

var removeCable = function() {
  /*
    Find the document with the code 'CABL'. This cooresponds with courses that can only be viewed
    on cable TV. Since we live in the 21st century and most courses are now web based, go ahead
    and remove this listing from your database and log the document to the console.
   */

  Listing.findOneAndRemove({
    code: 'CABL'
  }, function(error) {
    if (error) {
      throw error;
    }
    console.log("CABLE REMOVED");
  });
};

var updatePhelpsMemorial = function() {
  /*
    Phelps Memorial Hospital Center's address is incorrect. Find the listing, update it, and then
    log the updated document to the console.
   */

  Listing.findOneAndUpdate({
    name: 'Phelps Laboratory'
  }, {
    address: 'Phelps Laboratory, Gainesville, FL 32603'
  }, function(error, response) {
    if (error) {
      throw error;
    }

    console.log(response);
  });
};

var retrieveAllListings = function() {
  /*
    Retrieve all listings in the database, and log them to the console.
   */

  Listing.find({}, function(error, response) {
    if (error) {
      throw error;
    }
    console.log(response);
  });
};

findLibraryWest();
removeCable();
updatePhelpsMemorial();
retrieveAllListings();
