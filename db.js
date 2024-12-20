const mysql = require('mysql2');


const db = mysql.createConnection({
    host: 'localhost',    
    user: 'nalconnaughton',         
    password: 'Nal1234', 
    database: 'todolistapp', 
});

// Connects to the MySQL database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.message);
        return;
    }
    console.log('Connected to the MySQL database.');
});

// Creates the tables if dont exist
const initializeDatabase = () => {
    const adminUserRole = 'admin';
    const userRole = 'user';

    db.query(`
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(255) UNIQUE NOT NULL,
            email VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL,
            role ENUM('admin', 'user') DEFAULT '${userRole}'
        )
    `, (err) => {
        if (err) {
            console.error('Error with creating the users table:', err.message);
        } else {
            console.log('Users table is now created.');
        }
    });

    db.query(`
        CREATE TABLE IF NOT EXISTS todo (
            id INT AUTO_INCREMENT PRIMARY KEY,
            todo VARCHAR(255) NOT NULL,
            user_id INT NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )
    `, (err) => {
        if (err) {
            console.error('Error with creating the todo table:', err.message);
        } else {
            console.log('Todo table is now created.');
        }
    });
};

// Initialize the database
initializeDatabase();

// Closes the database connection when finished
process.on('SIGINT', () => {
    db.end((err) => {
        if (err) {
            console.error('Error with closing MySQL database connection:', err.message);
        } else {
            console.log('Database connection has been closed.');
        }
        process.exit();
    });
});
