//express librbary for server
const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

require('dotenv').config()


const app = express();


app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());
app.use(express.json());

//session keys to track activity of the user
app.use(session({
    secret: 'secret_key', 
    resave: false, 
    saveUninitialized: false,
 })

);

//connects to MySQL database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'nalconnaughton',
    password: 'Nal1234',
    database: 'todolistapp',
});

module.exports = db;

db.connect( (error) => {
    if(error) {
        console.log(error)
    } else {
        console.log("MySQL is connected and running..")

    }

});


//setting the routes
const authRoutes = require('./routes/authRoutes'); // will correct the path if its incorrect
const pagesRoutes = require('./routes/pagesRoutes'); // will correct the path if its incorrect

//routes used
app.use('/auth', authRoutes);
app.use('/pages', pagesRoutes);



app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.redirect('index.ejs')
});


app.get('/register', (req, res) => {
    res.render('register.ejs')
});


app.get('/login', (req, res) => {
    res.render('login')

});

app.get('/todolist', (req, res) => {
    res.render('todolist.ejs')
});




//app.set("views", "./views");



app.listen(3000, () => {
    console.log("Server has now started on Port 3000");

});
