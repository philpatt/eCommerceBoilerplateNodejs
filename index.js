require('dotenv').config();
var express = require('express');
var app = express();
var ejsLayouts = require('express-ejs-layouts');
var session = require('express-session');
var passport = require('./config/ppConfig');
var flash = require('connect-flash');
var isLoggedIn = require('./middleware/isLoggedIn');

//set view engine
app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/public"));
app.use(ejsLayouts)


// initialize session
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));
// flash notifications
app.use(flash());

// initialize the passport configuration and session as middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) {
    // before every route, attach the flash messages and current user to res.locals
    res.locals.alerts = req.flash();
    res.locals.currentUser = req.user;
    // add nav links for all pages
    res.locals.navData = {
        links: [
            {
                url: '/',
                text: 'Home'
            },
            {
                url: '/about',
                text: 'About'

            },
            {
                url: '/products',
                text: 'Products'

            },
            {
                url: '#',
                text: 'Cart'

            },
        ],
        logo:{
            imgUrl: '/img/gear_logo.png',
            text: 'TGP',
            altText: 'logo_image'
        },
    },
    next();
});

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

// product
app.get('/profile', isLoggedIn, function(req, res){
    res.render('profile');
})
// checkout
// profile


var server = app.listen(process.env.PORT || 8000);

module.exports = server;