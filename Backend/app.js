const express = require('express');
const app = express();
const { mongoose } = require('./mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const dataDB = require('./seed');
const fs = require('fs');


const FirstName = require('./models/firstName');
const LastName = require('./models/lastName');
const Email = require('./models/email');
const Country = require('./models/country');
const City = require('./models/city');
const Address = require('./models/address');

app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token, x-refresh-token, _id");

    res.header(
        'Access-Control-Expose-Headers',
        'x-access-token, x-refresh-token'
    );

    next();
});

//Funkcja wypełniająca bazę danymi z folderu data  
//dataDB();



app.post('/generator', (req, res) => {
    let objectPOST = req.body.obj;

    //console.log(objectPOST);

    randomData(objectPOST).then((ob) => {
        //console.log(ob);
        //res.download('./data/random.json', 'random.json');
        res.send(ob);
    });

})

app.listen(3000, () => {
    console.log("Server has started at port 3000");
});


async function randomData(ob) {


    var arrayOfObjects = new Array();
    var tab = JSON.parse(ob.tabOfInputs);
    var obj = Object.entries(tab[0]);
    var keys = new Array();
    var values = new Array();
    var newValues = new Array();
    var num = ob.numberOfInputs;

    for (var z = 0; z < obj.length; z++) 
    {
        var t = obj[z];
        keys.push(t[0]);
        values.push(t[1]);
    }
    
    var x = await checkTab(num, keys, values, newValues, arrayOfObjects);
    
    return x;
    
}

const storeData = (arrayJSON, path) => {
    try {
        fs.writeFileSync(path, arrayJSON)
    } catch (err) {
        console.error(err)
    }
}

async function checkTab  (num, keys, values, newValues, arrayOfObjects)  {

    // ARRAY OF NAMES
    var tabName = await FirstName.find();
    var tabFirstName = new Array();
    for (var i = 0; i < tabName.length; i++) {
        tabFirstName[i] = tabName[i].firstName;
    }
    // GENERATE RANDOM NAMES 
    const getRandomName = () =>
        `${tabFirstName[Math.floor(Math.random() * tabFirstName.length)]}`;



    // ARRAY OF LAST NAMES
    var tabLName = await LastName.find();
    var tabLastName = new Array();
    for (var i = 0; i < tabLName.length; i++) {
        tabLastName[i] = tabLName[i].lastName;
    }
    // GENERATE RANDOM LAST NAMES 
    const getRandomLastName = () =>
        `${tabLastName[Math.floor(Math.random() * tabLastName.length)]}`;



    // ARRAY OF ADDRESS
    var tabAddress = await Address.find();
    var tabOfAddress = new Array();
    for (var i = 0; i < tabAddress.length; i++) {
        tabOfAddress[i] = tabAddress[i].address;
    }
    // GENERATE RANDOM ADDRESS 
    const getRandomAddress = () =>
        `${tabOfAddress[Math.floor(Math.random() * tabOfAddress.length)]}`;



    // ARRAY OF CITIES
    var tabCity = await City.find();
    var tabOfCity = new Array();
    for (var i = 0; i < tabCity.length; i++) {
        tabOfCity[i] = tabCity[i].city;
    }
    // GENERATE RANDOM CITY 
    const getRandomCity = () =>
        `${tabOfCity[Math.floor(Math.random() * tabOfCity.length)]}`;



    // ARRAY OF COUNTRY
    var tabCountry = await Country.find();
    var tabOfCountry = new Array();
    for (var i = 0; i < tabCountry.length; i++) {
        tabOfCountry[i] = tabCountry[i].country;
    }
    // GENERATE RANDOM COUNTRY 
    const getRandomCountry = () =>
        `${tabOfCountry[Math.floor(Math.random() * tabOfCountry.length)]}`;



    // ARRAY OF EMAIL
    var tabEmail = await Email.find();
    var tabOfEmail = new Array();
    for (var i = 0; i < tabEmail.length; i++) {
        tabOfEmail[i] = tabEmail[i].email;
    }
    // GENERATE RANDOM EMAIL 
    const getRandomEmail = () =>
        `${tabOfEmail[Math.floor(Math.random() * tabOfEmail.length)]}`;


    // GENERATE RANDOM PHONE NUMBER 
    const getRandomPhone = () => {
        min = 100000000;
        max = 999999999;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }


    // GENERATE RANDOM AGE
    const getRandomAge = () => {
        min = 1;
        max = 100;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }


    for (var j = 0; j < num; j++) {
        for (var i = 0; i < values.length; i++) {
            if (values[i] == 'getRandomName') {
                newValues[i] = getRandomName();
            }
            else if (values[i] == 'getRandomLastName') {
                newValues[i] = getRandomLastName();
            }
            else if (values[i] == 'getRandomEmail') {
                newValues[i] = getRandomEmail();
            }
            else if (values[i] == 'getRandomAddress') {
                newValues[i] = getRandomAddress();
            }
            else if (values[i] == 'getRandomCity') {
                newValues[i] = getRandomCity();
            }
            else if (values[i] == 'getRandomCountry') {
                newValues[i] = getRandomCountry();
            }
            else if (values[i] == 'getRandomPhone') {
                newValues[i] = getRandomPhone();
            }
            else if (values[i] == 'getRandomAge') {
                newValues[i] = getRandomAge();
            }
            else {
                newValues[i] = values[i]
            }
        }
        //console.log(newValues);

        var ooo =  {};

        for (var k = 0; k < keys.length; k++) {
            ooo[keys[k]] = newValues[k];
        }

       // console.log(ooo);
        arrayOfObjects.push(ooo);
        
    }
    return arrayOfObjects;
}
