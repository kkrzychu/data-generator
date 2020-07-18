const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/DataGenerator', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => {
    console.log("Pomyslnie polaczono z MongoDB");
}).catch((e) => {
    console.log("Błąd polaczenia z MongoDB");
    console.log(e);
});

module.exports = { mongoose };