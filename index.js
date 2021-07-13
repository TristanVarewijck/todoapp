const colors = require('colors'); 
const express = require('express'); 
const app = express();  
const bodyParser = require('body-parser')
require('dotenv').config();
const mongoose = require('mongoose');
require('./routes/app.routes')(app);

// SOCKET.IO
// USER: https://socket.io/

// BODYPARSER
// TO JSON FORMAT
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


// MONGOOSE 
// https://mongoosejs.com/docs/
mongoose.connect(process.env.DB_CONNECTION_STRING, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('useFindAndModify', false);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log(colors.yellow("Connection is OPEN!"));
}) 






