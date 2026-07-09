import { useEffect, useState } from 'react';
import api from '../../services/api';

export default function Relatorios() {
  const [operacoes, setOperacoes] = useState([]);
  const [stats, setStats] = useState({ lucroTotal: 0, taxaAcerto: 0, ticketMedio: 0, totalOps: 0 });

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      const res = await api.get('/operacoes');
      const ops = res.data;
      setOperacoes(ops);
      // Calcular estatísticas
      const fechadas = ops.filter(op => op.data_venda && op.preco_venda);
      const lucros = fechadas.map(op => (op.preco_venda - op.preco_compra) * op.quantidade);
      const totalLucro = lucros.reduce((a,b) => a + b, 0);
      const positivos = lucros.filter(l => l > 0).length;
      const taxa = fechadas.length ? (positivos / fechadas.length) * 100 : 0;
      const ticketMedio = fechadas.length ? totalLucro / fechadas.length : 0;
      setStats({ lucroTotal: totalLucro, taxaAcerto: taxa, ticketMedio: ticketMedio, totalOps: ops.length });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Relatórios</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h3 className="text-sm text-gray-500 dark:text-gray-400">Lucro Total</h3>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">R$ {stats.lucroTotal.toFixed(2)}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h3 className="text-sm text-gray-500 dark:text-gray-400">Taxa de Acerto</h3>
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.taxaAcerto.toFixed(1)}%</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h3 className="text-sm text-gray-500 dark:text-gray-400">Ticket Médio</h3>
          <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">R$ {stats.ticketMedio.toFixed(2)}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h3 className="text-sm text-gray-500 dark:text-gray-400">Operações</h3>
          <p className="text-2xl font-bold text-gray-800 dark:text-white">{stats.totalOps}</p>
        </div>
      </div>
      {/* Tabela de desempenho mensal (simplificada) */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Desempenho Mensal — 2026</h3>
        <table className="min-w-full">
          <thead><tr><th>Mês</th><th>Operações</th></tr></thead>
          <tbody>
            {['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'].map(mes => (
              <tr key={mes}><td>{mes}</td><td>Sem operações</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}