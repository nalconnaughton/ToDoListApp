const db = require('../db');
const User = require('../models/userModel');

// Register unsuccessful
exports.register = (req, res) => {
    const { username, email, password } = req.body;

    User.create(username, email, password, (err) => {
        if (err) {
            console.error('Error registering a new user:', err);
            return res.status(500).send('Registration for new user has failed.');
        }
        res.redirect('/auth/login');
    });
};

//Wrong credentials inputted
exports.login = (req, res) => {
    const { email, password } = req.body;

    User.findByEmail(email, (err, results) => {
        if (err || results.length === 0 || results[0].password !== password) {
            return res.status(401).send('Invalid email or password.');
        }

        req.session.userId = results[0].id;
        res.redirect('/login');
    });
};

exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect('/login');
};


