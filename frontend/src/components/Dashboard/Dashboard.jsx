import { useEffect, useState } from 'react';
import api from '../../services/api';
import CardResumo from './CardResumo';
import GraficoPizza from './GraficoPizza';
import GraficoLinha from './GraficoLinha';
import GraficoBarras from './GraficoBarras';

export default function Dashboard() {
  const [operacoes, setOperacoes] = useState([]);
  const [resumo, setResumo] = useState({ totalInvestido: 0, lucroRealizado: 0, lucroAparente: 0, totalOperacoes: 0 });

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      const res = await api.get('/operacoes');
      const ops = res.data;
      setOperacoes(ops);
      // Calcular resumo
      let investido = 0, lucro = 0, lucroAp = 0;
      ops.forEach(op => {
        investido += op.quantidade * op.preco_compra;
        if (op.data_venda && op.preco_venda) {
          lucro += (op.preco_venda - op.preco_compra) * op.quantidade;
        } else {
          // Para aparente, precisaríamos de cotação atual, vamos simular
        }
      });
      setResumo({ totalInvestido: investido, lucroRealizado: lucro, lucroAparente: 0, totalOperacoes: ops.length });
    } catch (error) {
      console.error('Erro ao carregar dados', error);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <CardResumo titulo="Total Investido" valor={`R$ ${resumo.totalInvestido.toFixed(2)}`} cor="bg-blue-500" />
        <CardResumo titulo="Lucro Realizado" valor={`R$ ${resumo.lucroRealizado.toFixed(2)}`} cor={resumo.lucroRealizado >= 0 ? 'bg-green-500' : 'bg-red-500'} />
        <CardResumo titulo="Lucro Aparente" valor={`R$ ${resumo.lucroAparente.toFixed(2)}`} cor="bg-yellow-500" />
        <CardResumo titulo="Operações" valor={resumo.totalOperacoes} cor="bg-purple-500" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GraficoPizza operacoes={operacoes} />
        <GraficoLinha operacoes={operacoes} />
        <GraficoBarras operacoes={operacoes} />
      </div>
    </div>
  );
}