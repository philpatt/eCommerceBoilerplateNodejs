
var express = require('express');
var router = express.Router();
var db = require('../models');
var passport = require('../config/ppConfig');

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
            passport.authenticate('local', {
                successRedirect: '/profile',
                successFlash: 'Account created and logged in'
            })(req, res);
        } else {
            // if not created, the email already exists
            // add error handling
            req.flash('error', 'Email already exists');
            res.redirect('/auth/signup');
        }
    }).catch(function (error) {
        // if an error occurs, let's see what the error is
        // add error messaging
        req.flash('error', error.message);
        res.redirect('/auth/signup');
    });
});

// Login
router.get('/login', function (req, res) {
    res.render('auth/login');
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/profile',
    failureRedirect: '/auth/login',
    failureFlash: 'Invalid username and/or password',
    successFlash: 'You have logged in'
}));

// Logout
router.get('/logout', function (req, res) {
    req.logout();
    req.flash('success', 'You have logged out');
    res.redirect('/');
});

module.exports = router;