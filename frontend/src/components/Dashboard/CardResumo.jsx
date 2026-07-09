export default function CardResumo({ titulo, valor, cor }) {
  return (
    <div className={`${cor} text-white p-4 rounded-lg shadow`}>
      <h3 className="text-sm font-medium opacity-80">{titulo}</h3>
      <p className="text-2xl font-bold">{valor}</p>
    </div>
  );
}