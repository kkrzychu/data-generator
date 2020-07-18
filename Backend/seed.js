
const mongoose = require('mongoose');
const FirstName = require('./models/firstName');
const LastName = require('./models/lastName');
const Email = require('./models/email');
const Country = require('./models/country');
const City = require('./models/city');
const Address = require('./models/address');

const FirstNameData = require('./data/firstNameData');
const LastNameData = require('./data/lastNameData');
const EmailData = require('./data/emailData');
const CountryData = require('./data/countryData');
const CityData = require('./data/cityData');
const AddressData = require('./data/addressData');




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