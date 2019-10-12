var express = require('express');
var app = express();
var ejsLayouts = require('express-ejs-layouts');

//set view engine
app.set('view engine', 'ejs')
app.use(ejsLayouts)

// Home Page
app.get('/', function(req, res){
    res.render('home')
});

// About Page
app.get('/about', function(req, res){
    res.render('about/about')
})

// Products Page
app.get('/products', function (req, res) {
    res.render('product/products')
})

// login/sign up Page
app.get('/products', function (req, res) {
    res.render('users/login')
})

app.listen(8000);