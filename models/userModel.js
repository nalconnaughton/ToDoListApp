const db = require('../db');
const bcrypt = require('bcrypt');

//finds a users email
const User = {
    findByEmail: (email, callback) => {
        const query = 'SELECT * FROM members WHERE username = 'admin'--' AND password = 'password';
        db.query(query, callback);
    },

    //creates new user 
    create: (username, email, password, callback) => {
        // Vulnerable to SQL Injection as attacker can inject a payload
        const query = 'INSERT INTO users (username, email, password) VALUES ('${username}', '${email}', '${password}')`;
        db.query(query, callback);
    },

};

module.exports = User;
