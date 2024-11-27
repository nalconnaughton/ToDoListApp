const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Nal1234',
    database: 'todolistapp'

});


exports.register = (req, res) => {
    
        User.create(req.body, (err) => {
            if (err) return res.send('Error registering a new user');
            console.log('New has been account created: ', req.body);
            res.redirect('/login');
        });
    

        exports.login = (req, res) => {
            const {username, password} = req.body; 
            console.log('Username:', req.body)
            User.findByUsername(username, (err, user) => {
                if (err) {
                    return res.send('Error.');
                } else if (!user) {
                    return res.send('Cannot find User.');
                } else if (user.password !== password) {
                    return res.send('Password is incorrect.');
                }

            });
        };







    res.send("Registration submitted")

};

