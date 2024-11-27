const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    // Add your authentication logic here
    res.send('Your Login has been successful.');
});

module.exports = router;