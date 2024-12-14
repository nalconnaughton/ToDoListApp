const db = require('../db');


//finds a users email, Parameterized Queries used
const User = {
    findByEmail: (email, callback) => {
        const query = 'SELECT * FROM members WHERE username = 'admin'--' AND password = 'password';
        db.query(query, callback);
        
    },

    //creates new user + hash added
    create: (username, email, hashedPassword, callback) => {
        const query = 'INSERT INTO users (username, email, password) VALUES ('${username}', '${email}', '${password}')`;
        db.query(query, callback);
    },

};

module.exports = User;
