const colors = require('colors'); 
const express = require('express'); 
const app = express(); 
const port = 5050; 
let methodOverride = require('method-override')
const Book = require('./models/Book')
// const File = require("./models/upload");
const bodyParser = require('body-parser')
const multer = require('multer'); 
require('dotenv').config();



// storage
// SET STORAGE
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now()); 
  }
})

 
let upload = multer({ storage: storage }).single('file'); 


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URI, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('useFindAndModify', false);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connection is OPEN!")
})


app.use(methodOverride('_method'))
app.set('view engine', 'ejs');
app.use(express.static('public')); 
  

// get all and 1 book(s)
app.get('/books', async (req, res) => {
   // filter 
    let allBooks = await Book.find().sort({createdAt: -1}); 

    if(req.query.search){
      allBooks = await Book.find({title: req.query.search});
    }
    res.render('index', {
      allBooks,
    });
  });

// create new 
app.get('/books/new-book', (req, res) => {
  res.render('create'); 
})

app.post('/books', upload, async (req, res) => { 
   const newBook = new Book();
    newBook.title =  req.body.title; 
    newBook.auteur = req.body.auteur; 
    newBook.pages = req.body.pages; 
    newBook.price = req.body.price; 
    newBook.description = req.body.description;
    if (typeof req.file === "undefined") {
    newBook.image = "no-image.png";
   } else{
    newBook.image = `${req.file.filename}`;
   }

   newBook.save(function(err) {
    if (err) {
      res.send(err);
    }
    return res.redirect("/books");
  });
});

app.get('/books/:id' , async (req, res) => {
  let { id } = req.params; 
  let bookDetail = await Book.findById(id); 
  res.render('detail',
   {bookDetail})
});

app.patch('/books/:id', upload, async (req, res) => {
  let { id } = req.params;
  let addFile = {
    image: req.file.filename
  }
  await Book.findByIdAndUpdate(id, addFile);

  res.redirect(`/books/${id}`);  
})

// delete 
app.delete('/books/:id', async (req, res) => {
  let { id } = req.params; 
  await Book.findByIdAndDelete(id);
  res.redirect('/books')
}); 

// update
app.get('/books/:id/update', async (req, res) => {
  let { id } = req.params;
  let bookDetail = await Book.findById(id);
  res.render('update', {bookDetail})
});

app.put('/books/:id/update', upload, async (req, res) => {
  let { id } = req.params;
  let updateBook = {
    title: req.body.title, 
    auteur: req.body.auteur, 
    pages: req.body.pages, 
    price: req.body.price, 
    description: req.body.description, 
  }
  await Book.findByIdAndUpdate(id, updateBook);
  res.redirect(`/books/${id}`); 
})

// Search BOOKS 
app.get('/bookspot/', async (req, res) => {
  // SEARCH BAR
  let apiCall = "https://www.googleapis.com/books/v1/volumes"
  let bookName = req.query.bookName; 
  let fullString;

  if(req.query.bookName){
  fullString = apiCall + "?q=" + bookName + "&callback=handleResponse"; 
  } else{
  console.log('doenst work man!')
  }
  
  res.render('findBooks', {fullString, bookName, apiCall}); 
})

app.listen(port, () => {
console.log(colors.rainbow(`Example app listening at http://localhost:${port}`))
});






