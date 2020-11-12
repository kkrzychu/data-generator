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
const { fill } = require('./data/addressData');
const { type } = require('os');

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
    fulllTab().then((o) => {
        res.send(o);
    })
})

//ZMIENNA ZAWIERA NOWE DANE W TABLICY DO LOSOWANIA
let tabOfDataToDraw;
let idNumber = 0;

app.post('/generator', (req, res) => {
    let objectPOST = req.body.obj;
    tabOfDataToDraw = objectPOST.tabOfData;

    randomData(objectPOST).then((ob) => {
        idNumber = 0;
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
    var num = ob.numberOfInputs;
    var x = new Array();
    var testValues = new Array();

    //PODZIAŁ NA KLUCZE I WARTOŚCI
    for (var z = 0; z < obj.length; z++) {
        var t = obj[z];
        keys.push(t[0]);
        values.push(t[1]);
        testValues.push(t[1]);
    }


    //FUNKCJA SPRAWDZA DANE - TABLICA, OBIEKT, ZWYKLA ZMIENNA
    //TWORZY GOTOWA LISTE OBIEKTOW
    for (let ww = 0; ww < num; ww++) {
        var y = await checkArray(testValues);
        var ooo = {};

        for (var k = 0; k < keys.length; k++) {
            ooo[keys[k]] = y[k];
        }
        arrayOfObjects.push(ooo);
    }

    var x = await fillTab(arrayOfObjects);

    return x;
}

//FUNKCJA SPRAWDZA PODANE WARTOSCI I ZWRACA NOWE 
async function checkArray(testValues,) {

    var newValues = new Array();
    for (var i = 0; i < testValues.length; i++) {

        if (testValues[i] === 'id') {
            newValues[i] = await id();
        }
        else if (testValues[i] === 'getRandomName') {
            newValues[i] = await getRandomName();
        }
        else if (testValues[i] === 'getRandomLastName') {
            newValues[i] = await getRandomLastName();
        }
        else if (testValues[i] === 'getRandomEmail') {
            newValues[i] = await getRandomEmail();
        }
        else if (testValues[i] === 'getRandomAddress') {
            newValues[i] = await getRandomAddress();
        }
        else if (testValues[i] === 'getRandomCity') {
            newValues[i] = await getRandomCity();
        }
        else if (testValues[i] === 'getRandomCountry') {
            newValues[i] = await getRandomCountry();
        }
        else if (testValues[i] === 'getRandomPhone') {
            newValues[i] = await getRandomPhone();
        }
        else if (testValues[i] === 'getRandomAge') {
            newValues[i] = await getRandomAge();
        }
        else if (testValues[i] === 'getRandomBoolean') {
            newValues[i] = await getRandomBoolean();
        }
        else if (testValues[i].toString().substring(0, 18) === "getRandomIntNumber" && !Array.isArray(testValues[i])) {
            let str = testValues[i].toString().substring(19, testValues[i].length - 1).split('-');
            newValues[i] = await getRandomIntNumber(str);
        }
        else if (testValues[i].toString().substring(0, 20) === "getRandomFloatNumber" && !Array.isArray(testValues[i])) {
            let str = testValues[i].toString().substring(21, testValues[i].length - 1).split('-');
            newValues[i] = await getRandomFloatNumber(str);
        }
        else if (testValues[i].toString().substring(0, 7) === "getRand" && !Array.isArray(testValues[i])) {
            let str = testValues[i].toString().substring(8, testValues[i].length - 1).split(',');
            newValues[i] = await getRand(str);
        }
        else if (testValues[i].toString().substring(0, 4) === "draw" && !Array.isArray(testValues[i])) {
            let str = testValues[i].toString().substring(5, testValues[i].length - 1).split(',');
            newValues[i] = await draw(str);
        }
        else if (Array.isArray(testValues[i])) {

            newValues[i] = await checkArray(testValues[i]);
        }
        else if (typeof testValues[i] === 'object') {
            var zzz = Object.entries(testValues[i]);
            var zzzKeys = new Array();
            var zzzValues = new Array();
            for (var x = 0; x < zzz.length; x++) {
                var s = zzz[x];
                zzzKeys.push(s[0]);
                zzzValues.push(s[1]);
            }

            var zzzNewValues = await checkArray(zzzValues);
            var zzzObj = {};

            for (let xx = 0; xx < zzzNewValues.length; xx++) {
                zzzObj[zzzKeys[xx]] = zzzNewValues[xx];
            }
            newValues[i] = zzzObj;
        }
        else {
            newValues[i] = testValues[i]
        }
    }

    return newValues;
}

//FUNKCJA WYPELNIA DANE W ZALEZNOSCI OD PODANYCH PROCENTOW
async function fillTab(arrayOfObjects) {

    var obj;
    var keys = new Array();
    var values = new Array();
    var fillKeys = new Array();

    if (typeof arrayOfObjects[0] === 'object' && !Array.isArray(arrayOfObjects[0])) {
        arrayOfObjects.forEach((it) => {

            obj = Object.entries(it);

            //PODZIAŁ NA KLUCZE I WARTOŚCI
            for (var z = 0; z < obj.length; z++) {
                var t = obj[z];
                values.push(t[1]);
            }
        })
        for (let i = 0; i < obj.length; i++) {
            var s = obj[i];
            keys.push(s[0]);
        }

        //PODZIAŁ KLUCZA NA WARTOŚĆ I PROCENTY
        for (var v = 0; v < keys.length; v++) {
            var splitTab = keys[v].split(',');
            if (splitTab.length == 2) {
                var fillValue = splitTab[1].substring(1, splitTab[1].length - 1);
                fillKeys.push(parseInt(fillValue, 10));
                keys[v] = splitTab[0];
            } else {
                fillKeys.push(100);
            }
        }

        let newEntries = new Array();
        let randTab = new Array();
        let newArray = new Array();


        for (let j = 0; j < keys.length; j++) {
            for (let i = j; i < values.length; i = i + keys.length) {
                newArray.push(values[i]);
            }
            if (typeof newArray[j] === 'object' && !Array.isArray(newArray[j])) {
                newArray = await fillTab(newArray);
            }
            if (Array.isArray(newArray[j])) {
                newArray = await fillTab(newArray);
            }
            var count = Math.round(((100 - fillKeys[j]) * arrayOfObjects.length) / 100);

            let tab = [];
            for (let i = 0; i < arrayOfObjects.length; i++) {
                tab[i] = i;
            }

            for (let i = 0; i < count; i++) {
                let x = Math.floor(Math.random() * tab.length);
                randTab[i] = tab[x];
                tab.splice(x, 1);

            }
            for (let k = 0; k < randTab.length; k++) {
                if (typeof newArray[randTab[k]] === 'string') { newArray[randTab[k]] = '' }
                if (Array.isArray(newArray[randTab[k]])) { newArray[randTab[k]] = [] };
                if (typeof newArray[randTab[k]] === 'object' && !Array.isArray(newArray[randTab[k]])) { newArray[randTab[k]] = {} }
                if (typeof newArray[randTab[k]] === 'number' && typeof newArray[randTab[k]] !== 'object') { newArray[randTab[k]] = null }

            }
            newEntries.push(newArray);
            randTab = [];
            newArray = [];

        }

        let arrOb = [];
        for (let i = 0; i < arrayOfObjects.length; i++) {
            let ob = {};
            for (let j = 0; j < keys.length; j++) {
                let tmp = newEntries[j];
                ob[keys[j]] = tmp[i];
            }
            arrOb.push(ob);
        }

        return arrOb;
    }
    if (Array.isArray(arrayOfObjects[0])) {

        let newTab = new Array();
        let newTab2 = new Array();
        let newTab3 = new Array();
        let newTab4 = new Array();
        for (let i = 0; i < arrayOfObjects[0].length; i++) {
            arrayOfObjects.forEach((it) => {
                newTab.push(it[i]);
            })

            if (typeof newTab[i] === 'object' && !Array.isArray(newTab[i])) {
                newTab = await fillTab(newTab);
            }
            if (Array.isArray(newTab[i])) {
                newTab = await fillTab(newTab);
            }
            newTab2.push(newTab);
            newTab = [];
        }


        for (let j = 0; j < arrayOfObjects.length; j++) {
            newTab2.forEach((tt) => {
                newTab3.push(tt[j]);
            })
            newTab4.push(newTab3);
            newTab3 = [];
        }
        return newTab4;
    }

}

//FUNKCJA POBIERA Z BAZY (IMIE,NAZWISKO,EMAIL,PANSTWO,MIASTO,ADRES)
//TWORZY OBIEKT I PRZESYLA DO UZYTKOWNIKA BY MOGL EDYTOWAC TABLICE Z KTOREJ BEDA LOSOWANE DANE
async function fulllTab() {
    let fName = await FirstName.find();
    let lName = await LastName.find();
    let em = await Email.find();
    let co = await Country.find();
    let ci = await City.find();
    let ad = await Address.find();
    let newFname = new Array();
    let lnam = new Array();
    let ema = new Array();
    let cou = new Array();
    let cit = new Array();
    let adr = new Array();
    let allTable = new Array();

    for (let i = 0; i < fName.length; i++) { newFname[i] = fName[i].firstName; }
    for (let i = 0; i < lName.length; i++) { lnam[i] = lName[i].lastName; }
    for (let i = 0; i < em.length; i++) { ema[i] = em[i].email; }
    for (let i = 0; i < co.length; i++) { cou[i] = co[i].country; }
    for (let i = 0; i < ci.length; i++) { cit[i] = ci[i].city; }
    for (let i = 0; i < ad.length; i++) { adr[i] = ad[i].address; }

    allTable.push({ type: 'firstName', tab: newFname });
    allTable.push({ type: 'lastName', tab: lnam });
    allTable.push({ type: 'email', tab: ema });
    allTable.push({ type: 'country', tab: cou });
    allTable.push({ type: 'city', tab: cit });
    allTable.push({ type: 'address', tab: adr });

    return allTable;
}

//LOSOWANIE Z PODANYCH PARAMETROW
async function getRand(randTab) {
    return randTab[Math.floor(Math.random() * randTab.length)];
}

//GENEROWANIE STRINGU Z LOSOWYCH ZNAKOW
async function draw(str) {

    const randString = () => {
        let s = "";
        for (let i = 0; i < rand; i++) {
            s = s + alphabet[Math.floor(Math.random() * alphabet.length)];
        }
        return s;
    }

    let alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "r", "s", "t", "u", "w", "y", "z"];
    let interval;
    let rand = 0;
    let data = str;
    let finish = "";

    for (let i = 0; i < data.length; i++) {
        if (data[i].toString().substring(0, 7) === 'randStr') {
            let x = data[i].toString().substring(8, data[i].length - 1);
            interval = x.split("-");
            if (interval.length === 1) {
                rand = Math.floor(Math.random() * (parseInt(interval[0]) + 1));
            } else {
                rand = Math.floor(Math.random() * (parseInt(interval[1]) - parseInt(interval[0]) + 1)) + parseInt(interval[0]);
            }
            data[i] = randString();
        }
        else if (data[i].toString().substring(0, 7) === 'randNum') {
            let y = data[i].toString().substring(8, data[i].length - 1);
            let z = y.split("-");
            data[i] = Math.floor(Math.random() * (parseInt(z[1]) - parseInt(z[0]) + 1) + parseInt(z[0]));
        }
        else {
            data[i] = data[i];
        }
    }

    for (let i = 0; i < data.length; i++) {
        finish += data[i];
    }
    return finish;
}

//NUMEROWANIE OBIEKTOW
async function id() {

    idNumber++;

    return idNumber;
}

//FUNKCJA ZWRACA INT Z PODANEGO PRZEDZIALU
async function getRandomIntNumber(str) {

    if (str.length === 2) {
        return Math.floor(Math.random() * (parseInt(str[1]) - parseInt(str[0]) + 1) + parseInt(str[0]));
    } else {
        return Math.floor(Math.random() * parseInt(str[0]));
    }

}

//FUNKCJA ZWRACA FLOAT Z PODANEGO PRZEDZIALU
async function getRandomFloatNumber(str) {

    let multipler = 100;
    if (str.length === 2) {
        let num = Math.random() * (parseFloat(str[1]) - parseFloat(str[0]) + 1) + parseFloat(str[0]);
        return Math.round(num * multipler) / multipler;
    } else {
        let num2 = Math.random() * parseFloat(str[0]);
        return Math.round(num2 * multipler) / multipler;
    }

}

//FUNKCJA ZWRACA IMIE Z TABLICY WYPELNIONEJ PRZEZ UZYTKOWNIKA
async function getRandomName() {
    // ARRAY OF NAMES
    var tabFirstName = new Array();

    if (Array.isArray(tabOfDataToDraw[0].desc)) {
        tabFirstName = tabOfDataToDraw[0].desc;
        return tabFirstName[Math.floor(Math.random() * tabFirstName.length)];
    } else {
        tabFirstName = tabOfDataToDraw[0].desc.split(",");
        return tabFirstName[Math.floor(Math.random() * tabFirstName.length)];
    }
}

//FUNKCJA ZWRACA NAZWISKO Z TABLICY WYPELNIONEJ PRZEZ UZYTKOWNIKA
async function getRandomLastName() {
    // ARRAY OF LAST NAMES
    var tabLastName = new Array();

    if (Array.isArray(tabOfDataToDraw[1].desc)) {
        tabLastName = tabOfDataToDraw[1].desc;
        return tabLastName[Math.floor(Math.random() * tabLastName.length)];
    } else {
        tabLastName = tabOfDataToDraw[1].desc.split(",");
        return tabLastName[Math.floor(Math.random() * tabLastName.length)];
    }
}

//FUNKCJA ZWRACA ADRES Z TABLICY WYPELNIONEJ PRZEZ UZYTKOWNIKA
async function getRandomAddress() {
    // ARRAY OF ADDRESS
    var tabOfAddress = new Array();

    if (Array.isArray(tabOfDataToDraw[3].desc)) {
        tabOfAddress = tabOfDataToDraw[3].desc;
        return tabOfAddress[Math.floor(Math.random() * tabOfAddress.length)];
    } else {
        tabOfAddress = tabOfDataToDraw[3].desc.split(",");
        return tabOfAddress[Math.floor(Math.random() * tabOfAddress.length)];
    }
}

//FUNKCJA ZWRACA NAZWE MIASTA Z TABLICY WYPELNIONEJ PRZEZ UZYTKOWNIKA
async function getRandomCity() {
    // ARRAY OF CITIES
    var tabOfCity = new Array();

    if (Array.isArray(tabOfDataToDraw[4].desc)) {
        tabOfCity = tabOfDataToDraw[4].desc;
        return tabOfCity[Math.floor(Math.random() * tabOfCity.length)];
    } else {
        tabOfCity = tabOfDataToDraw[4].desc.split(",");
        return tabOfCity[Math.floor(Math.random() * tabOfCity.length)];
    }
}

//FUNKCJA ZWRACA NAZWE PANSTWA Z TABLICY WYPELNIONEJ PRZEZ UZYTKOWNIKA
async function getRandomCountry() {
    // ARRAY OF COUNTRY
    var tabOfCountry = new Array();

    if (Array.isArray(tabOfDataToDraw[5].desc)) {
        tabOfCountry = tabOfDataToDraw[5].desc;
        return tabOfCountry[Math.floor(Math.random() * tabOfCountry.length)];
    } else {
        tabOfCountry = tabOfDataToDraw[5].desc.split(",");
        return tabOfCountry[Math.floor(Math.random() * tabOfCountry.length)];
    }
}

//FUNKCJA ZWRACA EMAIL Z TABLICY WYPELNIONEJ PRZEZ UZYTKOWNIKA
async function getRandomEmail() {
    // ARRAY OF EMAIL
    var tabOfEmail = new Array();

    if (Array.isArray(tabOfDataToDraw[2].desc)) {
        tabOfEmail = tabOfDataToDraw[3].desc;
        return tabOfEmail[Math.floor(Math.random() * tabOfEmail.length)];
    } else {
        tabOfEmail = tabOfDataToDraw[2].desc.split(",");
        return tabOfEmail[Math.floor(Math.random() * tabOfEmail.length)];
    }
}

//FUNKCJA ZWRACA LOSOWY NUMER TELEFONU 
async function getRandomPhone() {
    // GENERATE RANDOM PHONE NUMBER 
    min = 100000000;
    max = 999999999;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//FUNKCJA ZWRACA LOSOWY WIEK
async function getRandomAge() {
    // GENERATE RANDOM AGE
    min = 1;
    max = 100;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//FUNKCJA ZWRACA TRUE LUB FALSE
async function getRandomBoolean() {
    let boolTab = new Array();
    boolTab.push(true);
    boolTab.push(false);

    return boolTab[Math.floor(Math.random() * boolTab.length)];
}
