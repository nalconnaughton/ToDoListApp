const mysql = require('mysql2');
const db = require('../db');

exports.register = (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).send('Please dont leave any field empty');
    }

    // Inserts the users data into the MySQL database
    db.query(
        'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
        [username, email, password],
        (err, results) => {
            if (err) {
                console.error('Error', err);
                return res.status(500).send('Error with server, Could not register new user.');
            }
            console.log('New User has been registered', results);
            res.redirect('/views/login'); //Sends you to login page after registered
        }
    );
};

exports.login = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send('Please dont leave any field empty');
    }

    // will check and look if the user already exists in database
    db.query(
        'SELECT * FROM users WHERE email = ?',
        [email],
        (err, results) => {
            if (err) {
                console.error('Error with login', err);
                return res.status(500).send('error.');
            }

            if (results.length === 0) {
                return res.status(401).send('User does not exist.');
            }

            const user = results[0];
            if (user.password !== password) {
                return res.status(401).send('wrong credentials provided.');
            }

            // Stores the users info in session
            req.session.userId = user.id;
            console.log('User has logged in', user);
            res.redirect('/views/todolist..ejs'); // Redirect to the to-do list page
        }
    );
};

