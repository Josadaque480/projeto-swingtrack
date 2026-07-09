const db = require('../config/database');

const Ativo = {
  upsert: (ticker, setor, ultima_cotacao, callback) => {
    const sql = `
      INSERT INTO ativos (ticker, setor, ultima_cotacao, updated_at)
      VALUES (?, ?, ?, CURRENT_TIMESTAMP)
      ON CONFLICT(ticker) DO UPDATE SET
        setor = excluded.setor,
        ultima_cotacao = excluded.ultima_cotacao,
        updated_at = CURRENT_TIMESTAMP
    `;
    db.run(sql, [ticker.toUpperCase(), setor || null, ultima_cotacao], callback);
  },
  findByTicker: (ticker, callback) => {
    db.get('SELECT * FROM ativos WHERE ticker = ?', [ticker.toUpperCase()], callback);
  },
  getAll: (callback) => {
    db.all('SELECT * FROM ativos ORDER BY ticker', callback);
  }
};

module.exports = Ativo;