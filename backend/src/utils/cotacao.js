const yahooFinance = require('yahoo-finance2').default;
const Ativo = require('../models/Ativo');

// Para ativos B3, adicionar ".SA" ao ticker
async function buscarCotacao(ticker) {
  try {
    const symbol = ticker.toUpperCase().endsWith('.SA') ? ticker : `${ticker}.SA`;
    const quote = await yahooFinance.quote(symbol);
    return {
      ticker: ticker.toUpperCase(),
      preco: quote.regularMarketPrice,
      setor: quote.sector || null,
      nome: quote.longName || quote.shortName || ticker
    };
  } catch (error) {
    console.error(`Erro ao buscar cotação para ${ticker}:`, error.message);
    return null;
  }
}

async function atualizarCotacao(ticker) {
  const dados = await buscarCotacao(ticker);
  if (dados) {
    await new Promise((resolve, reject) => {
      Ativo.upsert(dados.ticker, dados.setor, dados.preco, (err) => {
        if (err) reject(err);
        else resolve(dados);
      });
    });
    return dados;
  }
  return null;
}

async function getCotacao(ticker) {
  // Primeiro tenta do cache
  return new Promise((resolve, reject) => {
    Ativo.findByTicker(ticker, (err, row) => {
      if (err) reject(err);
      else if (row && row.ultima_cotacao) {
        // Se tiver cache recente (menos de 1 hora), usa
        const cacheHora = new Date(row.updated_at);
        const agora = new Date();
        const diff = (agora - cacheHora) / (1000 * 60 * 60);
        if (diff < 1) {
          return resolve(row.ultima_cotacao);
        }
      }
      // Busca atualizada
      atualizarCotacao(ticker).then(dados => {
        resolve(dados ? dados.preco : null);
      }).catch(reject);
    });
  });
}

module.exports = { buscarCotacao, atualizarCotacao, getCotacao };