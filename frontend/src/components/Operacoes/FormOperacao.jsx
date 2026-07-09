import { useState } from 'react';
import api from '../../services/api';

export default function FormOperacao({ onSuccess, onCancel }) {
  const [form, setForm] = useState({
    data_compra: '',
    quantidade: '',
    ticker: '',
    preco_compra: '',
    corretora: '',
    data_venda: '',
    preco_venda: '',
    preco_alvo: ''
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/operacoes', form);
      onSuccess();
      onCancel();
    } catch (error) {
      alert('Erro ao cadastrar operação');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-4 grid grid-cols-1 md:grid-cols-3 gap-4">
      <input name="data_compra" type="date" placeholder="Data Compra" className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600" onChange={handleChange} required />
      <input name="quantidade" type="number" placeholder="Quantidade" className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600" onChange={handleChange} required />
      <input name="ticker" placeholder="Ticker (ex: BBDC4)" className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600" onChange={handleChange} required />
      <input name="preco_compra" type="number" step="0.01" placeholder="Preço Compra" className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600" onChange={handleChange} required />
      <input name="corretora" placeholder="Corretora" className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600" onChange={handleChange} required />
      <input name="data_venda" type="date" placeholder="Data Venda" className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600" onChange={handleChange} />
      <input name="preco_venda" type="number" step="0.01" placeholder="Preço Venda" className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600" onChange={handleChange} />
      <input name="preco_alvo" type="number" step="0.01" placeholder="Preço Alvo" className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600" onChange={handleChange} />
      <div className="col-span-1 md:col-span-3 flex gap-2">
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Salvar</button>
        <button type="button" onClick={onCancel} className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500">Cancelar</button>
      </div>
    </form>
  );
}