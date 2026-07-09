const { atualizarCotacao, getCotacao } = require('../utils/cotacao');
const Ativo = require('../models/Ativo');

exports.atualizarTodos = async (req, res) => {
  // Pega todos os tickers únicos das operações do usuário
  const { user_id } = req; // vem do middleware? melhor criar rota separada
  // Para simplicidade, atualizamos apenas um ticker via parâmetro
  // Ou podemos buscar todos os tickers do usuário
  // Implementação simples: receber ticker via query
  const { ticker } = req.query;
  if (!ticker) {
    return res.status(400).json({ error: 'Forneça o ticker.' });
  }
  try {
    const dados = await atualizarCotacao(ticker);
    res.json(dados);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.listarAtivos = (req, res) => {
  Ativo.getAll((err, ativos) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(ativos);
  });
};