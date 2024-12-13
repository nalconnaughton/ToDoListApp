const db = require('../db');
const bcrypt = require('bcrypt');

//finds a users email, Parameterized Queries used
const User = {
    findByEmail: (email, callback) => {
        db.query('SELECT * FROM users WHERE email = ?', [email], callback);
    },

    //creates new user + hash added
    create: (username, email, hashedPassword, callback) => {
        db.query(
            'INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword], callback);
    },

};

module.exports = User;
