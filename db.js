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

    //updated db for better security
    db.query(`
        CREATE TABLE IF NOT EXISTS  users(
        user_id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        failed_login_attempts INT DEFAULT 0,
        is_locked BOOLEAN DEFAULT FALSE,
        role VARCHAR(50) DEFAULT 'user',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        role ENUM('admin', 'user') DEFAULT '${userRole}')`,
     (err) => {
        if (err) {
            console.error('Error with creating the users table:', err.message);
        } else {
            console.log('Users table is now created.');
        }
    });
//updated DB for better security
    db.query(`
        CREATE TABLE IF NOT EXISTS Todo(
           todo_id INT AUTO_INCREMENT PRIMARY KEY,
           user_id INT NOT NULL,
           todo_title TEXT NOT NULL,
           todo_description TEXT,
           created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
           updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
           FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
    )`, 
    (err) => {
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
