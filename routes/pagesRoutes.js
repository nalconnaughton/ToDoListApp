
const express = require('express');
const router = express.Router();

module.exports = router;

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/register', (req, res) => {
    res.render('register.ejs');
});

router.get('/login', (req, res) => {
    res.render('login.ejs');
});

router.get('/todolist', (req, res) => {
    res.render('todolist.ejs');
});

