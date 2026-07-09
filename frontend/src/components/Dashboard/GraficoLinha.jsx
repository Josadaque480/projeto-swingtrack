import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export default function GraficoLinha({ operacoes }) {
  // Prepara dados de evolução de patrimônio ao longo do tempo (simplificado)
  const data = operacoes.map(op => ({
    data: op.data_compra,
    valor: op.quantidade * op.preco_compra
  })).sort((a,b) => new Date(a.data) - new Date(b.data));
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Evolução do Patrimônio</h3>
      <LineChart width={300} height={250} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="data" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="valor" stroke="#8884d8" />
      </LineChart>
    </div>
  );
}