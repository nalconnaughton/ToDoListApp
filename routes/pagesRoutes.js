const express = require('express');
const { renderTodo, deleteTodo } = require('../controllers/pagesController.js');

const router = express.Router();

// Renders the to-do list
router.get('/todolist', renderTodo);

//deleting a to-do
router.post('/todolist/delete', deleteTodo);

module.exports = router;
