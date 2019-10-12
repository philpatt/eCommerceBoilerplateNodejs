var express = require('express');
var app = express();

//set view engine
app.set('view engine', 'ejs')

// Home Page
app.get('/', function(req, res){
    res.render('index.ejs')
});

// About Page
app.get('/about', function(req, res){
    res.send('Here is the about section');
})

app.listen(8000);