const express = require('express');
const app = express();
const { mongoose } = require('./mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const dataDB = require('./seed');


//Funkcja wypełniająca bazę danymi z folderu data  
//dataDB();


app.listen(3000, function() {
    console.log("Server has started at port 3000");
});