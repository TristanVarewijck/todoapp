const Book = require('./models/Book')
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/bookApp', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connection is OPEN!")
})

// test data 

// async function addBook(){
//   await Book.create({title: "Tristan's Book", auteur: "Tristan Varewijck", pages: 375, price: 12.99, description: "I wrote this when i was drunk"});
// } 

// addBook()