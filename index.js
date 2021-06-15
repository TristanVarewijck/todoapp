const colors = require('colors'); 
const express = require('express'); 
const app = express(); 
const port = 5050; 
const Book = require('./models/Book')

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/bookApp', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connection is OPEN!")
})



app.set('view engine', 'ejs');
app.use(express.static('public'));   

app.get('/', async (req, res) => {
  res.redirect('/books');
});

app.get('/books', async (req, res) => {
    let allBooks = await Book.find({});
    res.render('index', {
      allBooks,
    });
  });

app.get('/books/:id' , async (req, res) => {
  const { id } = req.params; 
  const bookDetail = await Book.findById(id); 
  res.render('detail', {
    bookDetail
  });
});

app.listen(port, () => {
console.log(colors.rainbow(`Example app listening at http://localhost:${port}`))
});






