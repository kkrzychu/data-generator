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




app.get('/generator', (req, res) => {
    
    //res.download('D:/Projekty/Data_Generator/Backend/data/random.json', 'random.json');
});

app.post('/generator',  (req, res) => {
    let objectPOST = req.body.obj;
    
    
    
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
    for(var i=0;i<tabName.length;i++) {
        tabFirstName[i] = tabName[i].firstName;
    }
    // GENERATE RANDOM NAMES 
    const getRandomName = () => 
    `${tabFirstName[Math.floor(Math.random() * tabFirstName.length)]}`;



    // ARRAY OF LAST NAMES
    var tabLName = await LastName.find();
    var tabLastName = new Array();
    for(var i=0;i<tabLName.length;i++) {
        tabLastName[i] = tabLName[i].lastName;
    }
    // GENERATE RANDOM LAST NAMES 
    const getRandomLastName = () => 
    `${tabLastName[Math.floor(Math.random() * tabLastName.length)]}`;

    

    // ARRAY OF ADDRESS
    var tabAddress = await Address.find();
    var tabOfAddress = new Array();
    for(var i=0;i<tabAddress.length;i++) {
        tabOfAddress[i] = tabAddress[i].address;
    }
    // GENERATE RANDOM ADDRESS 
    const getRandomAddress = () => 
    `${tabOfAddress[Math.floor(Math.random() * tabOfAddress.length)]}`;



    // ARRAY OF CITIES
    var tabCity = await City.find();
    var tabOfCity = new Array();
    for(var i=0;i<tabCity.length;i++) {
        tabOfCity[i] = tabCity[i].city;
    }
    // GENERATE RANDOM CITY 
    const getRandomCity = () => 
    `${tabOfCity[Math.floor(Math.random() * tabOfCity.length)]}`;



    // ARRAY OF COUNTRY
    var tabCountry = await Country.find();
    var tabOfCountry = new Array();
    for(var i=0;i<tabCountry.length;i++) {
        tabOfCountry[i] = tabCountry[i].country;
    }
    // GENERATE RANDOM COUNTRY 
    const getRandomCountry = () => 
    `${tabOfCountry[Math.floor(Math.random() * tabOfCountry.length)]}`;



    // ARRAY OF EMAIL
    var tabEmail =  await Email.find();
    var tabOfEmail = new Array();
    for(var i=0;i<tabEmail.length;i++) {
        tabOfEmail[i] = tabEmail[i].email;
    }
    // GENERATE RANDOM EMAIL 
    const getRandomEmail = () => 
    `${tabOfEmail[Math.floor(Math.random() * tabOfEmail.length)]}`;
    
    var a = ob.nameOne;
    var b = ob.nameTwo;
    var c = ob.nameThree;
    var arrayOfObjects = new Array();
    var option;
    var optionTwo;
    var optionThree;

    

    for(var i=0;i<ob.number;i++) {
        if(ob.optOne == "Imię") {
            option = getRandomName();
        }
        if(ob.optOne == "Nazwisko") {
            option = getRandomLastName();
        }
        if(ob.optOne == "Email") {
            option = getRandomEmail();
        }
        if(ob.optOne == "Adres") {
            option = getRandomAddress();
        }
        if(ob.optOne == "Miasto") {
            option = getRandomCity();
        }
        if(ob.optOne == "Państwo") {
            option = getRandomCountry();
        }
        var object =  {};
        object[a] = option;
        object[b] = getRandomLastName();
        object[c] = getRandomAddress();
        arrayOfObjects.push(object);
    }

    var arrayJSON = JSON.stringify(arrayOfObjects);
    console.log(arrayJSON);
    var path = './data/random.json';
    storeData(arrayJSON, path);
    return arrayJSON;
}

const storeData = (arrayJSON, path) => {
    try {
        fs.writeFileSync(path, arrayJSON)
    } catch (err) {
        console.error(err)
    }
}

