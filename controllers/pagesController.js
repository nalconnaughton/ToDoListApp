const db = require('../db');


// Rendering To-Do List Page
exports.renderTodo = (req, res) => {
  const userId = req.session.userId;
  if (!userId) {
    console.log('No user ID found.');
    return res.redirect('/auth/login');
  }

  // Get the user's to-do list
  Todo.findAll(userId, (err, todo) => {
    if (err) {
      console.log('Error getting a to-do', err.message);
      return res.status(500).send('Error with loading To-Do list.');
    }

    // Successful
    res.render('todolist', { todo });
  });
};



// Deleting a To-Do Item
exports.deleteTodo = (req, res) => {
  const { id } = req.body;

  console.log('Deleting To-Do with its ID:', id);

  Todo.delete(id, (err) => {
    if (err) {
      console.log('Error when deleting a to-do:', err.message);
      return res.status(500).send('Error with deleting the to-do');
    }

    res.redirect('/views/todolist');
  });
};
