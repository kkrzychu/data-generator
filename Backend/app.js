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
        console.log(ob);
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
    var subTab = new Array();
    var subObject = new Array();
    var fillKeys = new Array();
    var num = ob.numberOfInputs;
    var x = new Array();

    for (var z = 0; z < obj.length; z++) {
        var t = obj[z];
        keys.push(t[0]);
        values.push(t[1]);
    }
    //console.log(obj);
    for(var v=0;v<keys.length;v++){
        var splitTab = keys[v].split(',');
        if(splitTab.length == 2) {
            var fillValue = splitTab[1].substring(1,splitTab[1].length - 1);
            fillKeys.push(parseInt(fillValue, 10));
            keys[v] = splitTab[0];
        }else {
            fillKeys.push(100);
        }
        
    }
    

    for (var i = 0; i < values.length; i++) {
        var o = {}
        if (Array.isArray(values[i])) {

            values[i] = await checkSubTab(values[i]);
        }
        else if (typeof values[i] === 'object') {
            var zzz = Object.entries(values[i]); 
            var zzzKeys = new Array();
            var zzzValues = new Array();
            for(var x=0;x<zzz.length;x++) {
                var s = zzz[x];
                zzzKeys.push(s[0]);
                zzzValues.push(s[1]);
            }
            var zzzNewValues = await checkSubTab(zzzValues);
            var zzzObj = {};
            for(var xx=0;xx<zzzNewValues.length;xx++) {
                zzzObj[zzzKeys[xx]] = zzzNewValues[xx];
            }
            values[i] = zzzObj;
            
        } else {
            // console.log("str, int ,bol");
            //x = await checkTab(num, keys, values, newValues, arrayOfObjects);
        }
    }
    

    var x = await checkTab(num, keys, values, newValues, arrayOfObjects);
    //console.log(x);

    var newEntries = new Array();
    var newEntriesValue = new Array();
    var randTab = new Array();

    //GENEROWANIE LOSOWEJ TABLICY
    const randArray = () => {
        var r = Math.floor(Math.random()*newEntries.length);
        for(var s=0;s<newEntries.length;s++) {
            if(r == randTab[s]) {
                return randArray();
            } 
        }
        randTab.push(r);
    }

    
    for(let j=0;j<keys.length;j++) {
        x.forEach((item) => {
            newEntries.push(item[keys[j]]);  
            
        })
        
        var count = Math.round(((100 - fillKeys[j])*num)/100);
    
        for(let i =0;i<count;i++) {
            randArray();
        }
    
        for(let i =0;i<randTab.length;i++) {
            newEntries[randTab[i]] = '';
        }

        let xd=0;
        x.forEach((newItem) => {
            
            // console.log(newItem[keys[k]]);
            // console.log("-"+newEntries[k]);
            // console.log(xd);
            newItem[keys[j]] = newEntries[xd];
            // console.log(newItem[keys[xd]]);
            xd++;
        })
        // newEntriesValue = newEntries;
        // console.log(newEntries) ;
        // console.log(x[j]) ;
        randTab = [];
        newEntries = [];
    }
    // console.log(x);
    // console.log(newEntries);
    
    
    

    // for(let i=0;i<fillKeys.length;i++) {
    //     var count = Math.round(((100 - fillKeys[i])*num)/100);
    
    //     for(let i =0;i<count;i++) {
    //         randArray();
    //     }
    
    //     for(let i =0;i<randTab.length;i++) {
    //         newEntries[randTab[i]] = '';
    //     }
    //     console.log(randTab);
    // }
    

    var tt;

    // for (var a = 0; a < newEntries.length; a++) {
    //     tt = newEntries[a];
    //     tt.forEach((it) => {
    //         //console.log(it[1]);
    //     })
    //     //newEntriesValues.push(tt[1]);
    // }
    //console.log(x);
    return x;
    //getRandomName(num, fillKeys[0]);

}

async function checkSubTab(subTab) {
    //console.log(subTab);
    var newSubValues = new Array();


        for (var j = 0; j < subTab.length; j++) {
            if (subTab[j] === 'getRandomName') {
                newSubValues[j] = await getRandomName();
            }
            else if (subTab[j] === 'getRandomLastName') {
                newSubValues[j] = await getRandomLastName();
            }
            else if (subTab[j] === 'getRandomEmail') {
                newSubValues[j] = await getRandomEmail();
            }
            else if (subTab[j] === 'getRandomAddress') {
                newSubValues[j] = await getRandomAddress();
            }
            else if (subTab[j] === 'getRandomCity') {
                newSubValues[j] = await getRandomCity();
            }
            else if (subTab[j] === 'getRandomCountry') {
                newSubValues[j] = await getRandomCountry();
            }
            else if (subTab[j] === 'getRandomPhone') {
                newSubValues[j] = await getRandomPhone();
            }
            else if (subTab[j] === 'getRandomAge') {
                newSubValues[j] = await getRandomAge();
            }
            else {
                newSubValues[j] = subTab[j]
            }
        }

    
    //console.log(newSubValues);
    return newSubValues
}



async function checkTab(num, keys, values, newValues, arrayOfObjects) {



    for (var j = 0; j < num; j++) {
        for (var i = 0; i < values.length; i++) {
            
            if (values[i] === 'getRandomName') {
                newValues[i] = await getRandomName();
            }
            else if (values[i] === 'getRandomLastName') {
                newValues[i] = await getRandomLastName();
            }
            else if (values[i] === 'getRandomEmail') {
                newValues[i] = await getRandomEmail();
            }
            else if (values[i] === 'getRandomAddress') {
                newValues[i] = await getRandomAddress();
            }
            else if (values[i] === 'getRandomCity') {
                newValues[i] = await getRandomCity();
            }
            else if (values[i] === 'getRandomCountry') {
                newValues[i] = await getRandomCountry();
            }
            else if (values[i] === 'getRandomPhone') {
                newValues[i] = await getRandomPhone();
            }
            else if (values[i] === 'getRandomAge') {
                newValues[i] = await getRandomAge();
            }
            else if (values[i].toString().substring(0,7) == 'getRand') {
                var str = values[i].toString().substring(8,values[i].length - 1).split(',');
                
               newValues[i] = await getRand(str);
            }
            else {
                newValues[i] = values[i]
            }
        }
        //console.log(newValues);

        var ooo = {};

        for (var k = 0; k < keys.length; k++) {
            ooo[keys[k]] = newValues[k];
        }

        //console.log(ooo);
        arrayOfObjects.push(ooo);

    }

    return arrayOfObjects;
}

async function getRand(randTab) {
    return randTab[Math.floor(Math.random() * randTab.length)];
}

async function getRandomName(numOfRecords, procOfData) {
    // ARRAY OF NAMES
    var tabName = await FirstName.find();
    var tabFirstName = new Array();
    var randomTab = new Array();
    var count = Math.round(((100 - procOfData)*numOfRecords)/100);
    var r = new Array();
    var rr = new Array();

    for (var i = 0; i < tabName.length; i++) {
        tabFirstName[i] = tabName[i].firstName;
    }

    // for(var j = 0; j < numOfRecords; j++) {
    //     randomTab[j] = tabFirstName[Math.floor(Math.random() * tabFirstName.length)];
    // }

    // for(var k = 0; k < count;k++) {
    //     // var r = new Array();
    //     // r.push(Math.floor(Math.random() * randomTab.length));
    //     // if(r[k] == )
    //     randomTab[Math.floor(Math.random() * randomTab.length)] = null;
    //     //console.log(Math.floor(Math.random() * randomTab.length));
    // }
    

    return tabFirstName[Math.floor(Math.random() * tabFirstName.length)];
    // return randomTab[Math.floor(Math.random() * randomTab.length)];
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