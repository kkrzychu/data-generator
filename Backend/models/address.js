const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({
    address: String
});


module.exports =  mongoose.model('Address', AddressSchema) ;