const colors = require('colors'); 
const express = require('express'); 
const app = express(); 
const port = 5050; 

app.set('view engine', 'ejs');
app.use(express.static('public'));  

app.get('/', (req, res) => {
    res.render('index')
  });

app.listen(port, () => {
console.log(colors.rainbow(`Example app listening at http://localhost:${port}`))
});






