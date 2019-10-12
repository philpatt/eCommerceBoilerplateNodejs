
var express = require('express');
var router = express.Router();
var db = require('../models');

// Sign up
router.get('/signup', function (req, res) {
    res.render('auth/signup');
});

router.post('/signup', function (req, res) {
    // try sending back the form data
    res.send(req.body);
});

// Login page
router.get('/login', function (req, res) {
    res.render('auth/login');
});

module.exports = router;