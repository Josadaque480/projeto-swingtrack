const Operacao = require('../models/Operacao');
const { getCotacao } = require('../utils/cotacao');

exports.create = (req, res) => {
  const { data_compra, quantidade, ticker, preco_compra, corretora, data_venda, preco_venda, preco_alvo } = req.body;
  if (!data_compra || !quantidade || !ticker || !preco_compra || !corretora) {
    return res.status(400).json({ error: 'Campos obrigatórios faltando.' });
  }
  const operacao = {
    user_id: req.userId,
    data_compra,
    quantidade: parseInt(quantidade),
    ticker: ticker.toUpperCase(),
    preco_compra: parseFloat(preco_compra),
    corretora,
    data_venda: data_venda || null,
    preco_venda: preco_venda ? parseFloat(preco_venda) : null,
    preco_alvo: preco_alvo ? parseFloat(preco_alvo) : null
  };
  Operacao.create(operacao, (err, id) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id, ...operacao });
  });
};

exports.list = (req, res) => {
  Operacao.findAllByUser(req.userId, (err, operacoes) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(operacoes);
  });
};

exports.getOne = (req, res) => {
  const { id } = req.params;
  Operacao.findById(id, req.userId, (err, operacao) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!operacao) return res.status(404).json({ error: 'Operação não encontrada.' });
    res.json(operacao);
  });
};

exports.update = (req, res) => {
  const { id } = req.params;
  const { data_compra, quantidade, ticker, preco_compra, corretora, data_venda, preco_venda, preco_alvo } = req.body;
  const operacao = {
    data_compra,
    quantidade: parseInt(quantidade),
    ticker: ticker.toUpperCase(),
    preco_compra: parseFloat(preco_compra),
    corretora,
    data_venda: data_venda || null,
    preco_venda: preco_venda ? parseFloat(preco_venda) : null,
    preco_alvo: preco_alvo ? parseFloat(preco_alvo) : null
  };
  Operacao.update(id, req.userId, operacao, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Operação atualizada.' });
  });
};

exports.delete = (req, res) => {
  const { id } = req.params;
  Operacao.delete(id, req.userId, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Operação removida.' });
  });
};

// Buscar cotação atual para um ticker (para atualizar preço atual)
exports.getCotacao = async (req, res) => {
  const { ticker } = req.params;
  try {
    const preco = await getCotacao(ticker);
    if (preco === null) {
      return res.status(404).json({ error: 'Cotação não encontrada.' });
    }
    res.json({ ticker: ticker.toUpperCase(), preco });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};