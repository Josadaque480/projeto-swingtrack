import { useEffect, useState } from 'react';
import api from '../../services/api';

export default function Carteira() {
  const [operacoes, setOperacoes] = useState([]);
  const [carteira, setCarteira] = useState([]);

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      const res = await api.get('/operacoes');
      const ops = res.data;
      setOperacoes(ops);
      // Filtrar abertas (sem data_venda)
      const abertas = ops.filter(op => !op.data_venda);
      // Agrupar por ticker
      const map = {};
      abertas.forEach(op => {
        if (!map[op.ticker]) map[op.ticker] = { ticker: op.ticker, quantidade: 0, preco_medio: 0, total_investido: 0 };
        map[op.ticker].quantidade += op.quantidade;
        map[op.ticker].total_investido += op.quantidade * op.preco_compra;
        map[op.ticker].preco_medio = map[op.ticker].total_investido / map[op.ticker].quantidade;
      });
      // Buscar cotações atuais para cada ticker
      const carteiraArray = await Promise.all(Object.values(map).map(async (item) => {
        try {
          const cotacaoRes = await api.get(`/operacoes/cotacao/${item.ticker}`);
          const precoAtual = cotacaoRes.data.preco;
          return { ...item, preco_atual: precoAtual, lucro_aparente: (precoAtual - item.preco_medio) * item.quantidade };
        } catch {
          return { ...item, preco_atual: null, lucro_aparente: null };
        }
      }));
      setCarteira(carteiraArray);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Carteira</h2>
      {carteira.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300">Nenhuma posição em aberto.</p>
      ) : (
        <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-4 py-2 text-left">Ticker</th>
                <th className="px-4 py-2 text-left">Quantidade</th>
                <th className="px-4 py-2 text-left">Preço Médio</th>
                <th className="px-4 py-2 text-left">Preço Atual</th>
                <th className="px-4 py-2 text-left">Lucro Aparente</th>
                <th className="px-4 py-2 text-left">% da Carteira</th>
              </tr>
            </thead>
            <tbody>
              {carteira.map((item) => {
                const total = carteira.reduce((acc, i) => acc + i.total_investido, 0);
                const percent = total ? (item.total_investido / total) * 100 : 0;
                return (
                  <tr key={item.ticker}>
                    <td className="px-4 py-2 font-bold">{item.ticker}</td>
                    <td className="px-4 py-2">{item.quantidade}</td>
                    <td className="px-4 py-2">R$ {item.preco_medio.toFixed(2)}</td>
                    <td className="px-4 py-2">{item.preco_atual ? `R$ ${item.preco_atual.toFixed(2)}` : 'N/A'}</td>
                    <td className={`px-4 py-2 font-semibold ${item.lucro_aparente !== null ? (item.lucro_aparente >= 0 ? 'text-green-600' : 'text-red-600') : 'text-gray-500'}`}>
                      {item.lucro_aparente !== null ? `R$ ${item.lucro_aparente.toFixed(2)}` : 'N/A'}
                    </td>
                    <td className="px-4 py-2">{percent.toFixed(1)}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}