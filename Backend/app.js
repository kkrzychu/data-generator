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

        res.download('./data/random.json', 'random.json');
    });

})

app.listen(3000, () => {
    console.log("Server has started at port 3000");
});


async function randomData(ob) {

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


    var arrayOfObjects = new Array();
    var tab = ob.tabOfInputs;
    var num = ob.numberOfInputs;


    for (var i = 0; i < num; i++) {
        var objectTab = {};
        tab.forEach((item) => {
            var a = item.inputField;
            if (item.selectOption == "Imię") {
                objectTab[a] = getRandomName();
            }
            if (item.selectOption == "Nazwisko") {
                objectTab[a] = getRandomLastName();
            }
            if (item.selectOption == "Email") {
                objectTab[a] = getRandomEmail();
            }
            if (item.selectOption == "Adres") {
                objectTab[a] = getRandomAddress();
            }
            if (item.selectOption == "Miasto") {
                objectTab[a] = getRandomCity();
            }
            if (item.selectOption == "Państwo") {
                objectTab[a] = getRandomCountry();
            }
            if (item.selectOption == "Id") {
                objectTab[a] = i + 1;
            }
            if (item.selectOption == "Nr telefonu") {
                objectTab[a] = getRandomPhone();
            }
            if (item.selectOption == "Wiek") {
                objectTab[a] = getRandomAge();
            }

        });

        arrayOfObjects.push(objectTab);
    }

    var arrayJSON = JSON.stringify(arrayOfObjects);
    //console.log(arrayJSON);
    var path = './data/random.json';
    storeData(arrayJSON, path);
}

const storeData = (arrayJSON, path) => {
    try {
        fs.writeFileSync(path, arrayJSON)
    } catch (err) {
        console.error(err)
    }
}

