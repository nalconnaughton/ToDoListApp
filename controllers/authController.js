const db = require('../db');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');



// Register unsuccessful
exports.register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Hashing the password
        const hashedPassword = await bcrypt.hash(password, 10);


    User.create(username, email, hashedPassword, (err) => {
        if (err) {
            console.error('Error with registering a new user:', err);
            return res.status(500).send('Registration for new user has failed.');
        }
        res.redirect('/auth/login');
    });
         } catch (error) {
                console.error('Error with hashing password:', err);
                return res.status(500).send('Error occurred  with registration.');
     }
};

//Wrong credentials inputted
exports.login = async (req, res) => {
    const { email, password } = req.body;

    User.findByEmail(email, async (err, results) => {
        if (err || results.length === 0 || results[0].password !== password) {
            return res.status(500).send('Invalid email or password entered.');
        }
        const user = results[0];

        // will compare given password with hashed password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
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


