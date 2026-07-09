import { useEffect, useState } from 'react';
import api from '../../services/api';
import FormOperacao from './FormOperacao';
import Filtros from './Filtros';

export default function ListaOperacoes() {
  const [operacoes, setOperacoes] = useState([]);
  const [filtros, setFiltros] = useState({ ticker: '', corretora: '', status: '' });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    carregarOperacoes();
  }, []);

  const carregarOperacoes = async () => {
    try {
      const res = await api.get('/operacoes');
      setOperacoes(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza?')) {
      await api.delete(`/operacoes/${id}`);
      carregarOperacoes();
    }
  };

  const operacoesFiltradas = operacoes.filter(op => {
    if (filtros.ticker && !op.ticker.includes(filtros.ticker.toUpperCase())) return false;
    if (filtros.corretora && !op.corretora.toLowerCase().includes(filtros.corretora.toLowerCase())) return false;
    if (filtros.status === 'aberta' && op.data_venda) return false;
    if (filtros.status === 'fechada' && !op.data_venda) return false;
    return true;
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Operações</h2>
        <button onClick={() => setShowForm(!showForm)} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          {showForm ? 'Fechar' : 'Nova Operação'}
        </button>
      </div>
      {showForm && <FormOperacao onSuccess={carregarOperacoes} onCancel={() => setShowForm(false)} />}
      <Filtros filtros={filtros} setFiltros={setFiltros} />
      <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-4 py-2 text-left">Data Compra</th>
              <th className="px-4 py-2 text-left">Qtd</th>
              <th className="px-4 py-2 text-left">Ticker</th>
              <th className="px-4 py-2 text-left">Preço Compra</th>
              <th className="px-4 py-2 text-left">Corretora</th>
              <th className="px-4 py-2 text-left">Data Venda</th>
              <th className="px-4 py-2 text-left">Preço Venda</th>
              <th className="px-4 py-2 text-left">Lucro/Prejuízo</th>
              <th className="px-4 py-2 text-left">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {operacoesFiltradas.map(op => {
              const lucro = op.data_venda && op.preco_venda ? (op.preco_venda - op.preco_compra) * op.quantidade : null;
              return (
                <tr key={op.id} className={!op.data_venda ? 'bg-yellow-50 dark:bg-yellow-900/20' : ''}>
                  <td className="px-4 py-2">{new Date(op.data_compra).toLocaleDateString()}</td>
                  <td className="px-4 py-2">{op.quantidade}</td>
                  <td className="px-4 py-2 font-bold">{op.ticker}</td>
                  <td className="px-4 py-2">R$ {op.preco_compra.toFixed(2)}</td>
                  <td className="px-4 py-2">{op.corretora}</td>
                  <td className="px-4 py-2">{op.data_venda ? new Date(op.data_venda).toLocaleDateString() : '-'}</td>
                  <td className="px-4 py-2">{op.preco_venda ? `R$ ${op.preco_venda.toFixed(2)}` : '-'}</td>
                  <td className={`px-4 py-2 font-semibold ${lucro !== null ? (lucro >= 0 ? 'text-green-600' : 'text-red-600') : 'text-gray-500'}`}>
                    {lucro !== null ? `R$ ${lucro.toFixed(2)}` : 'Em aberto'}
                  </td>
                  <td className="px-4 py-2">
                    <button onClick={() => handleDelete(op.id)} className="text-red-600 hover:text-red-800">🗑️</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}