import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export default function GraficoBarras({ operacoes }) {
  const data = operacoes.map(op => ({
    ticker: op.ticker,
    lucro: op.data_venda && op.preco_venda ? (op.preco_venda - op.preco_compra) * op.quantidade : 0
  }));
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow col-span-2">
      <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Lucro/Prejuízo por Operação</h3>
      <BarChart width={600} height={250} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="ticker" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="lucro" fill="#82ca9d" />
      </BarChart>
    </div>
  );
}