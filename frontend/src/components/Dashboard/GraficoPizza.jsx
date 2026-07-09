import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

export default function GraficoPizza({ operacoes }) {
  // Agrupa por ticker
  const data = [];
  const map = {};
  operacoes.forEach(op => {
    if (!map[op.ticker]) map[op.ticker] = 0;
    map[op.ticker] += op.quantidade * op.preco_compra;
  });
  for (let ticker in map) {
    data.push({ name: ticker, value: map[ticker] });
  }
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Distribuição por Ativo</h3>
      <PieChart width={300} height={250}>
        <Pie data={data} cx="50%" cy="50%" outerRadius={80} fill="#8884d8" dataKey="value" label>
          {data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}