const db = require('../db');

const Todo = {
    findByUserId: (userId, callback) => {
        db.query('SELECT * FROM todo WHERE user_id = ?', [userId], callback);
    },

    create: (userId, todo, callback) => {
        db.query(
            'INSERT INTO todo (user_id, todo, status) VALUES (?, ?, "User pending")',
            [userId, todo], callback);
    },

    delete: (id, callback) => {
        db.query('DELETE FROM todo WHERE id = ?', [id], callback);
    },
};

module.exports = Todo;
