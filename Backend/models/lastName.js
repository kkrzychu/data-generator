const mongoose = require('mongoose');

const LastNameSchema = new mongoose.Schema({
    lastName: String
});


module.exports =  mongoose.model('LastName', LastNameSchema) ;