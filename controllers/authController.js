const db = require('../db');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



// Register unsuccessful
exports.register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Hashing the password
        const hashedPassword = await bcrypt.hash(password, 10);


    User.create(username, email, hashedPassword, (error) => {
        if (error) {
            console.error('Error with registering a new user:', error);
            return res.status(500).send('Registration for new user has failed.');
        }
        res.redirect('/auth/login');
    });
         } catch (error) {
                console.error('Error with hashing password:', error);
                return res.status(500).send('Error occurred  with registration.');
     }
};

//Wrong credentials inputted
exports.login = async (req, res) => {
    const { email, password } = req.body;

    User.findByEmail(email, async (error, results) => {
        if (error || results.length === 0 || results[0].password !== password) {
            return res.status(500).send('An invalid email or password entered.');
        }
        const user = results[0];

        // will compare given password with hashed password
        const isAuthenticated = await bcrypt.compare(password, user.password);

        if (!isAuthenticated) {
            return res.status(401).send('Invalid email or password has been entered');
        }

        //generates a jwt token
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN,
        });

        req.session.userId = results[0].id;
        res.redirect('/login');
    });
};

exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect('/login');
};


