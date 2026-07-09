const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, '../../database.sqlite');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) console.error('Erro ao abrir banco:', err.message);
  else console.log('Conectado ao SQLite.');
});

// Criação das tabelas
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
  db.run(`
    CREATE TABLE IF NOT EXISTS ativos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      ticker TEXT UNIQUE NOT NULL,
      setor TEXT,
      ultima_cotacao REAL,
      updated_at DATETIME
    )
  `);
  db.run(`
    CREATE TABLE IF NOT EXISTS operacoes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      data_compra DATE NOT NULL,
      quantidade INTEGER NOT NULL,
      ticker TEXT NOT NULL,
      preco_compra REAL NOT NULL,
      corretora TEXT NOT NULL,
      data_venda DATE,
      preco_venda REAL,
      preco_alvo REAL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `);
});

module.exports = db;