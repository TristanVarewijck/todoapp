const Book = require('./models/Book')
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/bookApp', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connection is OPEN!")
})

// test data 

// async function deleteBooks(){
//   await Book.deleteOne({_id: "60c87d10ddb838af6f042ad8"});
// } 

// deleteBooks()