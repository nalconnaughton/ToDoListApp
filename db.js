
const mysql = require('mysql2');

//connects to MySQL database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Nal1234',
    database: 'todolistapp'

});

db.connect( (error) => {
    if(error) {
        console.log(error)
    } else {
        console.log("MySQL is connected and running..")

    }

});


// connection pool exported
module.exports = db;
