
var mongoose = require('mongoose');
var FirstName = require('./models/firstName');
var LastName = require('./models/lastName');
var Email = require('./models/email');
var Country = require('./models/country');
var City = require('./models/city');
var Address = require('./models/address');

var FirstNameData = require('./data/firstNameData');
var LastNameData = require('./data/lastNameData');
var EmailData = require('./data/emailData');
var CountryData = require('./data/countryData');
var CityData = require('./data/cityData');
var AddressData = require('./data/addressData');




  function dataDB() {

    //Uzupełnienie bazy przykładowymi imionami
      FirstNameData.forEach(function(item) {
        FirstName.create(item, function(err, fname) {
            if(err) {
                console.log(err);
            } else {
                fname.save();
                console.log("Added first name");
            }
          });
      });
    //Uzupełnienie bazy przykładowymi nazwiskami
      LastNameData.forEach(function(item) {
        LastName.create(item, function(err, lname) {
            if(err) {
                console.log(err);
            } else {
                lname.save();
                console.log("Added last name");
            }
          });
      });
      //Uzupełnienie bazy przykładowymi email
      EmailData.forEach(function(item) {
        Email.create(item, function(err, email) {
            if(err) {
                console.log(err);
            } else {
                email.save();
                console.log("Added email");
            }
          });
      });
      //Uzupełnienie bazy przykładowymi państwami
      CountryData.forEach(function(item) {
        Country.create(item, function(err, country) {
            if(err) {
                console.log(err);
            } else {
                country.save();
                console.log("Added country");
            }
          });
      });
      //Uzupełnienie bazy przykładowymi miastami
      CityData.forEach(function(item) {
        City.create(item, function(err, city) {
            if(err) {
                console.log(err);
            } else {
                city.save();
                console.log("Added city");
            }
          });
      });
      //Uzupełnienie bazy przykładowymi adresami
      AddressData.forEach(function(item) {
        Address.create(item, function(err, address) {
            if(err) {
                console.log(err);
            } else {
                address.save();
                console.log("Added address");
            }
          });
      });
      
  }

  module.exports = dataDB;