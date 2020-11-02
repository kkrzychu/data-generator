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



app.post('/generator', (req, res) => {
    let objectPOST = req.body.obj;

    //console.log(objectPOST);

    // newRandomData(objectPOST).then((ob) => {
    randomData(objectPOST).then((ob) => {
        //console.log(ob);
        //res.download('./data/random.json', 'random.json');
        res.send(ob);
    });

})

app.listen(3000, () => {
    console.log("Server has started at port 3000");
});

let randomlyFilledValues = {};

// keyString = key1.key2.key3
function getNestedValue(object, keyString) {
    let currentObject = object;
    for (let key of keyString.split(".").filter(x => !!x)) {
        if (currentObject[key] === undefined) return undefined;
        currentObject = currentObject[key];
    }
    return currentObject;
}

// keyString = key1.key2.key3
function setNestedValue(object, keyString, value) {
    let currentObject = object;
    const splitKey = keyString.split(".").filter(x => !!x);
    console.log(splitKey);
    for (let i = 0; i < splitKey.length; i++) {
        if (currentObject[splitKey[i]] === undefined) {
            currentObject[splitKey[i]] = {};
        }
        if (i === splitKey.length - 1) {
            console.log(splitKey[i], "SPLITKEY")
            currentObject[splitKey[i]] = value;
        }
        currentObject = currentObject[splitKey[i]];
    }

}

async function newRandomData(ob) {
    const input = JSON.parse(ob.tabOfInputs);
    const numOfInputs = ob.numberOfInputs;
    const output = [];
    for (let i = 0; i < numOfInputs; i++) {
        output.push(await fillRandomData(JSON.parse(JSON.stringify(input[0])), "", numOfInputs))
    }
    randomlyFilledValues = {};
    return output;
}
// "adres.ulice"
async function fillRandomData(obj, currentKey = "", numOfInputs = 1) {
    for (let key of Object.keys(obj)) {
        let fillPercent = getNestedValue(randomlyFilledValues, currentKey + "." + key) || 0;
        const keyPercent = getPercentFromKey(key);
        if (fillPercent < keyPercent || keyPercent === undefined) {
            const isObject = typeof obj[key] === "object" && !Array.isArray(obj[key]);
            if (isObject) {
                const objectClone = JSON.parse(JSON.stringify(obj[key]));
                obj[key] = await fillRandomData(objectClone, currentKey + "." + key, numOfInputs);
            } else {
                obj[key] = await getValueFunction(obj[key]);
            }
            if (!isObject) {
                setNestedValue(randomlyFilledValues, currentKey + "." + key, (fillPercent + (1 / +numOfInputs) * 100));
            }
        } else {
            obj[key] = "";
        }
    }
    return obj;
}

function getPercentFromKey(key) {
    if (key.indexOf(",") === -1) return undefined;
    const initial = key.split(",")[1];
    return +initial.substring(1, initial.length - 2);
}

async function getValueFunction(initialValue) {
    if (initialValue === 'getRandomName') {
        return await getRandomName();
    }
    else if (initialValue === 'getRandomLastName') {
        return await getRandomLastName();
    }
    else if (initialValue === 'getRandomEmail') {
        return await getRandomEmail();
    }
    else if (initialValue === 'getRandomAddress') {
        return await getRandomAddress();
    }
    else if (initialValue === 'getRandomCity') {
        return await getRandomCity();
    }
    else if (initialValue === 'getRandomCountry') {
        return await getRandomCountry();
    }
    else if (initialValue === 'getRandomPhone') {
        return await getRandomPhone();
    }
    else if (initialValue === 'getRandomAge') {
        return await getRandomAge();
    }
    else if (initialValue.toString().substring(0, 7) === "getRand") {
        var str = initialValue.toString().substring(8, initialValue.length - 1).split(',');

        return await getRand(str);
    } else if (Array.isArray(initialValue)) {
        // TO NIE DZIALA
        console.log(initialValue);
        return initialValue.map(async element => { return await getValueFunction(element) });
    }
    return initialValue;
}

let idNumber = 0;

async function randomData(ob) {


    var arrayOfObjects = new Array();
    var tab = JSON.parse(ob.tabOfInputs);
    var obj = Object.entries(tab[0]);
    var keys = new Array();
    var values = new Array();
    var newValues = new Array();
    var subTab = new Array();
    var subObject = new Array();
    var fillKeys = new Array();
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


    // //PODZIAŁ KLUCZA NA WARTOŚĆ I PROCENTY
    // for(var v=0;v<keys.length;v++) {
    //     var splitTab = keys[v].split(',');
    //     if(splitTab.length == 2) {
    //         var fillValue = splitTab[1].substring(1,splitTab[1].length - 1);
    //         fillKeys.push(parseInt(fillValue, 10));
    //         keys[v] = splitTab[0];
    //     }else {
    //         fillKeys.push(100);
    //     } 
    // }


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

    //console.log(arrayOfObjects);
    //var x = await checkTab(num, keys, values, newValues, arrayOfObjects);

    //for( let i=0;i<num;i++) {
    //var x = await checkProcent(arrayOfObjects[0], arrayOfObjects);
    var x = await fillTab(arrayOfObjects);
    // console.log(x);
    //}
    idNumber = 0;
    // //PODZIAŁ KLUCZA NA WARTOŚĆ I PROCENTY
    // for(var v=0;v<keys.length;v++) {
    //     var splitTab = keys[v].split(',');
    //     if(splitTab.length == 2) {
    //         var fillValue = splitTab[1].substring(1,splitTab[1].length - 1);
    //         fillKeys.push(parseInt(fillValue, 10));
    //         keys[v] = splitTab[0];
    //     }else {
    //         fillKeys.push(100);
    //     } 
    // }


    //console.log(x);

    // var newEntries = new Array();
    // var newEntriesValue = new Array();
    // var randTab = new Array(); [12,32,42,23,23]

    // //GENEROWANIE LOSOWEJ TABLICY POTRZEBNEJ DO PRZELICZANIA PROCENTOWEGO
    // const randArray = () => {
    //     var r = Math.floor(Math.random()*newEntries.length);
    //     for(var s=0;s<newEntries.length;s++) {
    //         if(r == randTab[s]) {
    //             return randArray();
    //         } 
    //     }
    //     randTab.push(r);
    // }

    // //WYPELNIANIE TABLICY OBIEKTOW PO PRZELICZENIU PROCENTOWYM
    // for(let j=0;j<keys.length;j++) {
    //     arrayOfObjects.forEach((item) => {
    //         newEntries.push(item[keys[j]]);  

    //     })

    //     var count = Math.round(((100 - fillKeys[j])*num)/100);

    //     for(let i =0;i<count;i++) {
    //         randArray();
    //     }

    //     for(let i =0;i<randTab.length;i++) {
    //         newEntries[randTab[i]] = '';
    //     }

    //     let xd=0;
    //     arrayOfObjects.forEach((newItem) => {
    //         newItem[keys[j]] = newEntries[xd];
    //         xd++;
    //     })

    //     randTab = [];
    //     newEntries = [];
    // }

    return x;

}

async function checkArray(testValues,) {

    var newValues = new Array();
    for (var i = 0; i < testValues.length; i++) {


        if (testValues[i] === 'id()') {
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
        else if (testValues[i].toString().substring(0, 15) === "getRandomNumber" && !Array.isArray(testValues[i])) {
            let str = testValues[i].toString().substring(16, testValues[i].length - 1).split('-');
            newValues[i] = await getRandomNumber(str);
        }
        else if (testValues[i].toString().substring(0, 7) === "getRand" && !Array.isArray(testValues[i])) {
            let str = testValues[i].toString().substring(8, testValues[i].length - 1).split(',');
            newValues[i] = await getRand(str);
        }
        else if (testValues[i].toString().substring(0, 4) === "draw" && !Array.isArray(testValues[i])) {
            let str = testValues[i].toString().substring(5, testValues[i].length - 1).split(',');
            // console.log(str);
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
    // console.log(newValues);


    return newValues;
}


//FUNKCJA WYPEŁNIAJACA DANE PROCENTOWO
async function checkProcent(objArray, arrayObj) {

    var ob;
    var keys = new Array();
    var values = new Array();
    var proc = new Array();
    var tab = new Array();

    for (let j = 0; j < 1; j++) {
        ob = Object.entries(objArray);
        // console.log(ob);

        //PODZIAŁ NA KLUCZE I WARTOŚCI
        for (var z = 0; z < ob.length; z++) {
            var t = ob[z];
            keys.push(t[0]);
            values.push(t[1]);
        }
        // console.log(values);

        for (let i = 0; i < values.length; i++) {
            if (Array.isArray(values[i])) { }
            else if (typeof values[i] === 'object') {
                await checkProcent(values[i], tab);
            } else {
                tab.push(values)
                console.log(values);
            }

        }
    }




    //PODZIAŁ KLUCZA NA WARTOŚĆ I PROCENTY
    for (var v = 0; v < keys.length; v++) {
        var splitTab = keys[v].split(',');
        if (splitTab.length == 2) {
            var fillValue = splitTab[1].substring(1, splitTab[1].length - 1);
            proc.push(parseInt(fillValue, 10));
            keys[v] = splitTab[0];
        } else {
            proc.push(100);
        }
    }
    var obje = {
        key: keys,
        procents: proc,
        val: values
    }
    // var s = fillTab(proc, keys, values, fullArray, iterator);

    // tab.push(obje);
    // console.log(tab);
    return obje;
}

async function fillTab(arrayOfObjects) {

    var obj;
    var keys = new Array();
    var values = new Array();
    var fillKeys = new Array();
    var allValues = new Array();


    if (typeof arrayOfObjects[0] === 'object' && !Array.isArray(arrayOfObjects[0])) {
        arrayOfObjects.forEach((it) => {

            obj = Object.entries(it);

            //PODZIAŁ NA KLUCZE I WARTOŚCI
            for (var z = 0; z < obj.length; z++) {
                var t = obj[z];
                values.push(t[1]);
            }
            //allValues.push(values);
            //values = [];

        })
        // console.log(values);
        for (let i = 0; i < obj.length; i++) {
            var s = obj[i];
            keys.push(s[0]);
        }
        // console.log(keys);

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

        // console.log(fillKeys);
        let newEntries = new Array();
        var newEntriesValue = new Array();
        let randTab = new Array();
        let newArray = new Array();

        // //GENEROWANIE LOSOWEJ TABLICY POTRZEBNEJ DO PRZELICZANIA PROCENTOWEGO
        // const randArray = () => {
        //     var r = Math.floor(Math.random() * newArray.length);
        //     for (var s = 0; s < newArray.length; s++) {
        //         if (r == randTab[s]) {
        //             return randArray();
        //         }
        //     }
        //     randTab.push(r);
        // }



        // console.log(tab);
        // var o = {};
        // var k = 0;
        // for(let s=0;s<arrayOfObjects.length;s++) {
        //     for(let j=0;j<keys.length;j++,k++) {
        //         o[keys[j]] = values[k]
        //     }
        //     newArray.push(o);
        // }

        // console.log(keys.length);
        // console.log(values.length);
        for (let j = 0; j < keys.length; j++) {
            for (let i = j; i < values.length; i = i + keys.length) {
                newArray.push(values[i]);
            }
            // console.log(newArray);
            if (typeof newArray[j] === 'object' && !Array.isArray(newArray[j])) {
                newArray = await fillTab(newArray);
            }
            if (Array.isArray(newArray[j])) {
                // console.log(newArray[j]);
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
            // console.log(randTab);
            for (let k = 0; k < randTab.length; k++) {
                // console.log(newArray[randTab[k]]);
                if (typeof newArray[randTab[k]] === 'string') { newArray[randTab[k]] = '' }
                if (Array.isArray(newArray[randTab[k]])) { newArray[randTab[k]] = [] };
                if (typeof newArray[randTab[k]] === 'object' && !Array.isArray(newArray[randTab[k]])) { newArray[randTab[k]] = {} }
                if (typeof newArray[randTab[k]] === 'number' && typeof newArray[randTab[k]] !== 'object') { newArray[randTab[k]] = null }
                // newArray[randTab[k]] = "";

            }
            // console.log(newArray);
            newEntries.push(newArray);
            randTab = [];
            newArray = [];

        }

        // console.log(newEntries);
        let arrOb = [];
        for (let i = 0; i < arrayOfObjects.length; i++) {
            let ob = {};
            for (let j = 0; j < keys.length; j++) {
                let tmp = newEntries[j];
                ob[keys[j]] = tmp[i];
            }
            // console.log(ob);
            arrOb.push(ob);
        }
        // console.log(arrOb);

        return arrOb;
    }
    if (Array.isArray(arrayOfObjects[0])) {

        let newTab = new Array();
        let newTab2 = new Array();
        let newTab3 = new Array();
        let newTab4 = new Array();
        // console.log(arrayOfObjects[0].length);
        for (let i = 0; i < arrayOfObjects[0].length; i++) {
            arrayOfObjects.forEach((it) => {
                // console.log(it[i]);
                newTab.push(it[i]);
            })

            if (typeof newTab[i] === 'object' && !Array.isArray(newTab[i])) {
                newTab = await fillTab(newTab);
            }
            if (Array.isArray(newTab[i])) {
                // console.log(newArray[j]);
                newTab = await fillTab(newTab);
            }
            newTab2.push(newTab);
            newTab = [];
        }


        for (let j = 0; j < arrayOfObjects.length; j++) {
            //for(let i=j;i<newTab2.length;i++) {
            newTab2.forEach((tt) => {
                newTab3.push(tt[j]);
            })
            newTab4.push(newTab3);
            newTab3 = [];
            //}
        }
        // console.log(newTab4);
        return newTab4;
    }

    // //WYPELNIANIE TABLICY OBIEKTOW PO PRZELICZENIU PROCENTOWYM
    // for (let j = 0; j < keys.length; j++) {
    //     allValues.forEach((item) => {
    //         newEntries.push(item[j]);

    //     })

    //     var count = Math.round(((100 - fillKeys[j]) * arrayOfObjects.length) / 100);

    //     for (let i = 0; i < count; i++) {
    //         randArray();
    //     }

    //     for (let i = 0; i < randTab.length; i++) {
    //         newEntries[randTab[i]] = '';
    //     }

    //     let xd = 0;
    //     var o = {};
    //     // arrayOfObjects.forEach((newItem) => {
    //     //     newItem[keys[j]] = newEntries[xd];
    //     //     xd++;
    //     // })
    //     for(let i=0;i<newEntries.length;i++) {
    //         o[keys[j]] = newEntries[i];
    //         newArray[i] = o;
    //     }
    //     // console.log(arrayOfObjects);
    //     randTab = [];
    //     newEntries = [];
    // }
    // console.log(newArray);
}

//LOSOWANIE Z PODANYCH PARAMETROW
async function getRand(randTab) {
    return randTab[Math.floor(Math.random() * randTab.length)];
}

async function draw(str) {

    const randString = () => {
        let s = "";
        for (let i = 0; i < rand; i++) {
            s = s + alphabet[Math.floor(Math.random() * alphabet.length)];
        }
        // console.log(s);
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
            // console.log(interval);
            if (interval.length === 1) {
                rand = Math.floor(Math.random() * (parseInt(interval[0]) + 1));
            } else {
                rand = Math.floor(Math.random() * (parseInt(interval[1]) - parseInt(interval[0]) + 1)) + parseInt(interval[0]);
            }
            data[i] = randString();
        }
        else if(data[i].toString().substring(0,7) === 'randNum') {
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
    console.log(finish);
    return finish;
}

async function id() {

    idNumber++;

    return idNumber;
}

async function getRandomNumber(str) {

    if(str.length === 2) {
        return Math.floor(Math.random() * (parseInt(str[1]) - parseInt(str[0]) + 1) + parseInt(str[0]));
    }else {
        return Math.floor(Math.random() *  parseInt(str[0]));
    }
    
}

async function getRandomName() {
    // ARRAY OF NAMES
    var tabName = await FirstName.find();
    var tabFirstName = new Array();

    for (var i = 0; i < tabName.length; i++) {
        tabFirstName[i] = tabName[i].firstName;
    }

    return tabFirstName[Math.floor(Math.random() * tabFirstName.length)];
}

async function getRandomLastName() {
    // ARRAY OF LAST NAMES
    var tabLName = await LastName.find();
    var tabLastName = new Array();
    for (var i = 0; i < tabLName.length; i++) {
        tabLastName[i] = tabLName[i].lastName;
    }
    // GENERATE RANDOM LAST NAMES 

    return tabLastName[Math.floor(Math.random() * tabLastName.length)];
}

async function getRandomAddress() {
    // ARRAY OF ADDRESS
    var tabAddress = await Address.find();
    var tabOfAddress = new Array();
    for (var i = 0; i < tabAddress.length; i++) {
        tabOfAddress[i] = tabAddress[i].address;
    }
    // GENERATE RANDOM ADDRESS 

    return tabOfAddress[Math.floor(Math.random() * tabOfAddress.length)];
}

async function getRandomCity() {
    // ARRAY OF CITIES
    var tabCity = await City.find();
    var tabOfCity = new Array();
    for (var i = 0; i < tabCity.length; i++) {
        tabOfCity[i] = tabCity[i].city;
    }
    // GENERATE RANDOM CITY 

    return tabOfCity[Math.floor(Math.random() * tabOfCity.length)];
}

async function getRandomCountry() {
    // ARRAY OF COUNTRY
    var tabCountry = await Country.find();
    var tabOfCountry = new Array();
    for (var i = 0; i < tabCountry.length; i++) {
        tabOfCountry[i] = tabCountry[i].country;
    }
    // GENERATE RANDOM COUNTRY 

    return tabOfCountry[Math.floor(Math.random() * tabOfCountry.length)];
}

async function getRandomEmail() {
    // ARRAY OF EMAIL
    var tabEmail = await Email.find();
    var tabOfEmail = new Array();
    for (var i = 0; i < tabEmail.length; i++) {
        tabOfEmail[i] = tabEmail[i].email;
    }
    // GENERATE RANDOM EMAIL 

    return tabOfEmail[Math.floor(Math.random() * tabOfEmail.length)];
}

async function getRandomPhone() {
    // GENERATE RANDOM PHONE NUMBER 

    min = 100000000;
    max = 999999999;
    return Math.floor(Math.random() * (max - min + 1)) + min;

}

async function getRandomAge() {
    // GENERATE RANDOM AGE

    min = 1;
    max = 100;
    return Math.floor(Math.random() * (max - min + 1)) + min;

}



// const storeData = (arrayJSON, path) => {
//     try {
//         fs.writeFileSync(path, arrayJSON)
//     } catch (err) {
//         console.error(err)
//     }
// }