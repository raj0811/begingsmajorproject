//require library
const mongoose = require('mongoose');

//connect to db
mongoose.connect('mongodb://localhost/usersdb');

//accuire the connectiontion
const db = mongoose.connection;

//error
db.on('error', console.error.bind(console, 'error i connecting to db'));

//up and runnning
db.once('open', function() {
    console.log("successfully connected");
});