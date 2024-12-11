const express = require('express');
const router = express.Router();

const { renderTodo, deleteTodo } = require('../controllers/pagesController.js');


// Renders the to-do list
router.get('/todolist', renderTodo);

//deleting a to-do
router.post('/todolist/delete', deleteTodo);

module.exports = router;
