CREATE DATABASE todolistapp;

USE todolistapp;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE todo (
    id INT AUTO_INCREMENT PRIMARY KEY,
    todo VARCHAR(255) NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

INSERT INTO users (username, password, email) Values
('admin1' , 'password1' , 'admin1@hotmail.com'),
('admin2' , 'password2' , 'admin2@hotmail.com'),
('admin3' , 'password3' , 'admin3@hotmail.com'),
('admin4' , 'password4' , 'admin4@hotmail.com');

SELECT * FROM users;