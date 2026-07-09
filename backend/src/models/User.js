const db = require('../config/database');

const User = {
  create: (name, email, password, callback) => {
    const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    db.run(sql, [name, email, password], function(err) {
      callback(err, this?.lastID);
    });
  },
  findByEmail: (email, callback) => {
    db.get('SELECT * FROM users WHERE email = ?', [email], callback);
  },
  findById: (id, callback) => {
    db.get('SELECT id, name, email, created_at FROM users WHERE id = ?', [id], callback);
  }
};

module.exports = User;