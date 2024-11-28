
const express = require('express');
const router = express.Router();
const pagesController = require('../controllers/pagesController');

module.exports = router;

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/todolist', pagesController.getTodo);
router.post('/todolist', pagesController.addTodo);
router.post('/todolist/delete', pagesController.deleteTodo);