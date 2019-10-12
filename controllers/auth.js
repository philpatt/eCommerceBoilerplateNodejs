
var express = require('express');
var router = express.Router();
var db = require('../models');

// Sign up
router.get('/signup', function (req, res) {
    res.render('auth/signup');
});

router.post('/signup', function (req, res) {
    // find or create a user, providing the name and password as default values
    db.user.findOrCreate({
        where: { email: req.body.email },
        defaults: {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            password: req.body.password,
            permission: req.body.persmissions
        }
    }).spread(function (user, created) {
        if (created) {
            // if created, success and redirect home
            console.log('User created!');
            res.redirect('/');
        } else {
            // if not created, the email already exists
            console.log('Email already exists');
            res.redirect('/auth/signup');
        }
    }).catch(function (error) {
        // if an error occurs, let's see what the error is
        console.log('An error occurred: ', error.message);
        res.redirect('/auth/signup');
    });
});

// Login page
router.get('/login', function (req, res) {
    res.render('auth/login');
});

module.exports = router;