'use strict';
/*
  Import modules/files you may need to correctly run the script.
  Make sure to save your DB's uri in the config file, then import it with a require statement!
 */
var fs = require('fs'),
  mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  Listing = require('./ListingSchema.js'),
  config = require('./config');

var listingData = undefined;

/* Connect to your database */
mongoose.connect("mongodb://admin:password@ds127044.mlab.com:27044/assignment3")

/*
  Instantiate a mongoose model for each listing object in the JSON file,
  and then save it to your Mongo database
 */

fs.readFile('listings.json', 'utf8', function(error, response){
  if (error) {
    throw error;
  }

  listingData = JSON.parse(response).entries;
  listingData.forEach(function(entry) {
    var newDataListings = new Listing(entry);

    newDataListings.save(function(error) {
      if (error) {
        throw error;
      }

      console.log(entry.toString + ' was succesfully created!');
    });
  });
});
/*
  Once you've written + run the script, check out your MongoLab database to ensure that
  it saved everything correctly.
 */
