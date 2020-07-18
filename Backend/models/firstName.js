const mongoose = require('mongoose');

const FirstNameSchema = new mongoose.Schema({
    firstName: String
});


module.exports =  mongoose.model('FirstName', FirstNameSchema) ;