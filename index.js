var express = require('express');
var app = express();
var ejsLayouts = require('express-ejs-layouts');

//set view engine
app.set('view engine', 'ejs')
app.use(ejsLayouts)

// Home Page
app.get('/', function(req, res){
    res.render('home.ejs')
});

// About Page
app.get('/about', function(req, res){
    res.render('about/about.ejs')
})

app.listen(8000);