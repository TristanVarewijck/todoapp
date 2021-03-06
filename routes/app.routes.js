module.exports = function(app){
// VARIABLES
const colors = require('colors'); 
const express = require('express');  
const port = 8000; 
let methodOverride = require('method-override')
const multer = require('multer'); 
const axios = require('axios');
let apiData, items, username, oneBook, addBook = null;
const Book = require('../models/Book');

// MULTER
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now()); 
    }
  });

let upload = multer({ storage: storage }).single('file');

// EXPRESS SETTINGS
app.use(methodOverride('_method'))
app.set('view engine', 'ejs');
app.use(express.static('public'));

// ROUTES
app.get('/', (req, res) => {
    res.redirect('/books'); 
  });
  
  // Get all and 1 book(s)
app.get('/books', async (req, res) => { 
    const searchText = req.query.q;
    let allBooks = await Book.find().sort({createdAt: -1}); 
  
      if(req.query.q){
        allBooks = await Book.find({title: req.query.q});
      }
      if(req.query.q == ""){
        allBooks = await Book.find().sort({createdAt: -1});
      }
     
      res.render('index', {
        allBooks,
        searchText
      });
    });
  
  // create new book 
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
  
  // DETAIL
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
  
  // DELETE 
app.delete('/books/:id', async (req, res) => {
    let { id } = req.params; 
    await Book.findByIdAndDelete(id);
    res.redirect('/books')
  }); 
  
  // UPDATE
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
    username = req.query.q;
    await axios({
              method: 'GET',
              apiKey: process.env.API_KEY,  
              url: 'https://www.googleapis.com/books/v1/volumes?q=' + username,
              })
              // Handles the response and returns the data
              .then(function(response) {
                return response.data;
              })
              // saves the data to a variable for later use 
              .then(function(data) {
                apiData = data;   
              })
              // error if error 
              .catch(function(err){
                console.log(err)
              })
  
res.render('findBooks', {apiData, items, username});
  
  })
  
  // 1 book
app.get('/bookspot/:id', async (req, res) => {
    const { id } = req.params; 
    const username = req.query.q;
          await axios({
                  method: 'GET',
                  apiKey: process.env.API_KEY, 
                  url: 'https://www.googleapis.com/books/v1/volumes/' + id,  
                  })
                  // Handles the response and returns the data
                  .then(function(response) {
                    return response.data;
                  })
                  // saves the data to a variable for later use 
                  .then(function(data) {
                    oneBook = data;
                    console.log(colors.green(oneBook));
                  })
                  // error if error 
                  .catch(function(err){
                    console.log(err)
                  })
  
    res.render('findBooksDetail', {apiData, username, oneBook});
  }); 
  
app.post('/bookspot/:id', upload, async (req, res) => {
    const { id } = req.params;  
          await axios({
                  method: 'GET',
                  apiKey: process.env.API_KEY, 
                  url: 'https://www.googleapis.com/books/v1/volumes/' + id,  
                  })
                  // Handles the response and returns the data
                  .then( async function(response) {
                    return response.data;
                  })
                  // saves the data to a variable for later use 
                  .then( async function(data) {
                    oneBook = data;
                    // console.log(colors.green(oneBook));
                    addBook = {
                      title: oneBook.volumeInfo.title, 
                      auteur: oneBook.volumeInfo.authors, 
                      pages: oneBook.volumeInfo.pageCount, 
                      price: 12, 
                      description: oneBook.volumeInfo.description,
                      image: req.file,
                    }
  
                     await Book.create(addBook);
                  
                  })
                  // error if error 
                  .catch(function(err){
                    console.log(err)
                  })
  
    res.render('findBooksDetail', {apiData, username, oneBook});
  });
  
app.get('*', function(req, res){
    res.status(404).send('<h1>404 PAGE NOT FOUND! TRY AGAIN PLEASE!</h1> <br> <a class="back-button" href="/books">GOBACK</a>');
  });
  
app.listen(port, () => {
  console.log(colors.rainbow(`Example app listening at http://localhost:${port}`))
  });

}
