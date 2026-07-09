const db = require('../config/database');

const Operacao = {
  create: (data, callback) => {
    const { user_id, data_compra, quantidade, ticker, preco_compra, corretora, data_venda, preco_venda, preco_alvo } = data;
    const sql = `
      INSERT INTO operacoes 
      (user_id, data_compra, quantidade, ticker, preco_compra, corretora, data_venda, preco_venda, preco_alvo)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    db.run(sql, [user_id, data_compra, quantidade, ticker.toUpperCase(), preco_compra, corretora, data_venda || null, preco_venda || null, preco_alvo || null], function(err) {
      callback(err, this?.lastID);
    });
  },
  findAllByUser: (user_id, callback) => {
    const sql = 'SELECT * FROM operacoes WHERE user_id = ? ORDER BY data_compra DESC';
    db.all(sql, [user_id], callback);
  },
  findById: (id, user_id, callback) => {
    db.get('SELECT * FROM operacoes WHERE id = ? AND user_id = ?', [id, user_id], callback);
  },
  update: (id, user_id, data, callback) => {
    const { data_compra, quantidade, ticker, preco_compra, corretora, data_venda, preco_venda, preco_alvo } = data;
    const sql = `
      UPDATE operacoes SET
        data_compra = ?, quantidade = ?, ticker = ?, preco_compra = ?, corretora = ?,
        data_venda = ?, preco_venda = ?, preco_alvo = ?
      WHERE id = ? AND user_id = ?
    `;
    db.run(sql, [data_compra, quantidade, ticker, preco_compra, corretora, data_venda || null, preco_venda || null, preco_alvo || null, id, user_id], callback);
  },
  delete: (id, user_id, callback) => {
    db.run('DELETE FROM operacoes WHERE id = ? AND user_id = ?', [id, user_id], callback);
  }
};

module.exports = Operacao;