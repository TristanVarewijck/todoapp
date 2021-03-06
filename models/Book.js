// BOOK MODEL 
const mongoose = require('mongoose');
const bookSchema = new mongoose.Schema({ 
    createdAt: {
        type: Date,
        default: Date.now,
    },
    title: {
        type: String, 
        // required: true, 
    },
    auteur: {
        type: Array, 
    }, 
    pages:{
        type: Number, 
        min: [0, 'This cant be a negative number! you got: ${VALUE}'],

    },
    price: {
        type: Number, 
        min: [0, 'This cant be a negative number! you got: ${VALUE}'],
    },
    description: {
        type: String, 
    }, 
    image: { type: String,}

});

  const Book = mongoose.model('Book', bookSchema);

  // EXPORTS
  module.exports = Book;

