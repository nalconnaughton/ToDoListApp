const db = require('../db');

const User = {
    findByEmail: (email, callback) => {
        //Vulnerable to sql injection
        //would log in as admin and bypass the authentication as anything after '--' will be ignored
        const query = 'SELECT * FROM members WHERE username = 'admin'--' AND password = 'password';
        db.query(query, callback);
    },

    create: (username, email, password, callback) => {
        // Vulnerable to SQL Injection as attacker can inject a payload
        const query = 'INSERT INTO users (username, email, password) VALUES ('${username}', '${email}', '${password}')`;
        db.query(query, callback);
    },
};

module.exports = User;
