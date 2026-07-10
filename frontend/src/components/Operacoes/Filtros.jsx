export default function Filtros({ filtros, setFiltros }) {
  return (
    <div className="flex flex-wrap gap-4 mb-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
      <input
        placeholder="Ticker"
        className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
        value={filtros.ticker}
        onChange={e => setFiltros({ ...filtros, ticker: e.target.value })}
      />
      <input
        placeholder="Corretora"
        className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
        value={filtros.corretora}
        onChange={e => setFiltros({ ...filtros, corretora: e.target.value })}
      />
      <select
        className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
        value={filtros.status}
        onChange={e => setFiltros({ ...filtros, status: e.target.value })}
      >
        <option value="">Todos</option>
        <option value="aberta">Em aberto</option>
        <option value="fechada">Fechadas</option>
      </select>
    </div>
  );
}