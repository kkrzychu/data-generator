const express = require('express');
const app = express();
const { mongoose } = require('./mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const dataDB = require('./seed');


const FirstName = require('./models/firstName');
const LastName = require('./models/lastName');
const Email = require('./models/email');
const Country = require('./models/country');
const City = require('./models/city');
const Address = require('./models/address');

//Funkcja wypełniająca bazę danymi z folderu data  
//dataDB();


app.get('/', (req, res) => {
    // FirstName.find().then((name) => {
    //     res.send(name);
    // });
});

app.listen(3000, () => {
    console.log("Server has started at port 3000");
});