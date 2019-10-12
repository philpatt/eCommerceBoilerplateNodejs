require('dotenv').config();
var express = require('express');
var app = express();
var ejsLayouts = require('express-ejs-layouts');
var session = require('express-session');

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));
//set view engine
app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/public"));
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

// controller routes
app.use('/auth', require('./controllers/auth'));

var server = app.listen(process.env.PORT || 8000);

module.exports = server;