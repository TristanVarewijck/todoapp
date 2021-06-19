const colors = require('colors'); 
const express = require('express'); 
const app = express(); 
const port = 5050; 
let methodOverride = require('method-override')
const Book = require('./models/Book')
// const File = require("./models/upload");
const bodyParser = require('body-parser')
const multer = require('multer'); 

// storage
// SET STORAGE
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now()); 
  }
})
 
var upload = multer({ storage: storage }).single('file'); 


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/bookApp', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('useFindAndModify', false);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connection is OPEN!")
})


// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))
app.set('view engine', 'ejs');
// app.use('/css', express.static(('node_modules/bootstrap/dist/css')))
app.use(express.static('public')); 
  

// app.get('/', async (req, res) => {
//   res.redirect('/books');
// });



// get all and 1 book(s)
app.get('/books', async (req, res) => {

    
  //   if ( button === oud ){
  //     let allBooks = await Book.find({}) 
  //   } 
  //  else {
  //     let allBooks = await Book.find({});
  //  }
   let allBooks = await Book.find().sort({createdAt: -1});
    res.render('index', {
      allBooks,
    });
  });

// create new 
app.get('/books/new-book', (req, res) => {
  res.render('create'); 
})

app.post('/books', upload, async (req, res) => {
  const newBook = {
    title: req.body.title, 
    auteur: req.body.auteur, 
    pages: req.body.price, 
    price: req.body.price, 
    description: req.body.description, 
    image: req.file.filename,
  }
  console.log(newBook); 
  await Book.create(newBook); 
  // res.redirect('/');
  res.redirect('/books')
});

// file upload 
// app.get("/books/new-book/upload", (req, res) => {
//   res.render('imgUpload');
// })

// //API Endpoint for uploading file
// app.post("/books/new-book/upload", upload.single("myFile"), (req, res) => {
//   let file = req.file; 
//   console.log(req.file);
//   res.render("imgUpload"); 
// });

app.get('/books/:id' , async (req, res) => {
  let { id } = req.params; 
  let bookDetail = await Book.findById(id); 
  res.render('detail',
   {bookDetail})
});

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

app.put('/books/:id/', upload, async (req, res) => {
  let { id } = req.params;
  let bookUpdate = {
    title: req.body.title, 
    auteur: req.body.auteur, 
    pages: req.body.price, 
    price: req.body.price, 
    description: req.body.description, 
    image: req.file.filename,
  }
  console.log(bookUpdate)
  await Book.findByIdAndUpdate(id, bookUpdate);
  res.redirect('/books'); 
})





app.listen(port, () => {
console.log(colors.rainbow(`Example app listening at http://localhost:${port}`))
});






