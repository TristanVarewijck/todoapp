const colors = require('colors'); 
const express = require('express'); 
const app = express(); 
const port = 5050; 
let methodOverride = require('method-override')
const Book = require('./models/Book')

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/bookApp', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connection is OPEN!")
})


// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))
app.set('view engine', 'ejs');
app.use(express.static('public'));   

// app.get('/', async (req, res) => {
//   res.redirect('/books');
// });

app.get('/books', async (req, res) => {
    let allBooks = await Book.find({});
    res.render('index', {
      allBooks,
    });
  });

app.get('/books/:id' , async (req, res) => {
  let { id } = req.params; 
  let bookDetail = await Book.findById(id); 
  res.render('detail',
   {bookDetail})
});

app.delete('/books/:id', async (req, res) => {
  let { id } = req.params; 
  await Book.findByIdAndDelete(id);
  res.redirect('/books'); 
})



app.listen(port, () => {
console.log(colors.rainbow(`Example app listening at http://localhost:${port}`))
});






