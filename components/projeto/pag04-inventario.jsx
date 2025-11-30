"use client";

export default function Pag04Inventario({
  evolucaoRebanhoData,
  receitasData,
  despesasData,
  capacidadePagamentoData,
  identificacaoBeneficiarioData,
  isAdmin,
}) {
  // Parse evolução do rebanho data
  const parseRebanho = () => {
    if (!evolucaoRebanhoData?.dadosEvolucaoRebanho?.[0]) {
      return {
        bovino: { reprodutor: 0, matrizes: 0, bezerros: 0, garrotes: 0, novilhos: 0, total: 0 },
        caprino: { reprodutores: 0, matrizes: 0, machosJovens: 0, femeasJovens: 0, total: 0 },
        ovino: { reprodutores: 0, matrizes: 0, machosJovens: 0, femeasJovens: 0, total: 0 },
      };
    }

    const dados = evolucaoRebanhoData.dadosEvolucaoRebanho[0];
    
    // Rebanho bovino (ano 5 - 2029)
    const bovino = {
      reprodutor: dados.touro_ano5 || 0,
      matrizes: dados.matrizes_ano5 || 0,
      bezerros: (dados.bezerros_ano5 || 0) + (dados.bezerras_ano5 || 0),
      garrotes: (dados.garrotes_ano5 || 0) + (dados.garrotas_ano5 || 0),
      novilhos: (dados.novilhos_ano5 || 0) + (dados.novilhas_ano5 || 0),
      total: 0,
    };
    bovino.total = bovino.reprodutor + bovino.matrizes + bovino.bezerros + bovino.garrotes + bovino.novilhos;

    return { bovino, caprino: null, ovino: null };
  };

  // Parse agricultura sequeiro
  const parseAgriculturaSequeiro = () => {
    if (!evolucaoRebanhoData?.dadosAgriculturaSequeiro) return [];
    
    return evolucaoRebanhoData.dadosAgriculturaSequeiro.map(item => ({
      descricao: item.atividade || '',
      unidade: item.unidade || 'kg',
      ano1: item.ano1 || 0,
      ano2: item.ano2 || 0,
      ano3: item.ano3 || 0,
      ano4: item.ano4 || 0,
      ano5: item.ano5 || 0,
    }));
  };

  // Parse agricultura irrigada
  const parseAgriculturaIrrigada = () => {
    if (!evolucaoRebanhoData?.dadosAgriculturaIrrigada) return [];
    
    return evolucaoRebanhoData.dadosAgriculturaIrrigada.map(item => ({
      descricao: item.atividade || '',
      unidade: item.unidade || 'kg',
      ano1: item.ano1 || 0,
      ano2: item.ano2 || 0,
      ano3: item.ano3 || 0,
      ano4: item.ano4 || 0,
      ano5: item.ano5 || 0,
    }));
  };

  // Parse outras atividades
  const parseOutrasAtividades = () => {
    if (!evolucaoRebanhoData?.dadosOutrasAtividades) return [];
    
    return evolucaoRebanhoData.dadosOutrasAtividades.map(item => ({
      descricao: item.atividade || '',
      unidade: item.unidade || 'cab',
      ano1: item.ano1 || 0,
      ano2: item.ano2 || 0,
      ano3: item.ano3 || 0,
      ano4: item.ano4 || 0,
      ano5: item.ano5 || 0,
    }));
  };

  // Parse receitas estimadas
  const parseReceitas = () => {
    if (!receitasData) {
      return {
        bovinocultura: [0, 0, 0, 0, 0],
        ovinocultura: [0, 0, 0, 0, 0],
        caprinocultura: [0, 0, 0, 0, 0],
        agriculturaSequeiro: [0, 0, 0, 0, 0],
        agriculturaIrrigada: [0, 0, 0, 0, 0],
        outrasAtividades: [0, 0, 0, 0, 0],
        total: [0, 0, 0, 0, 0],
      };
    }

    const bovinocultura = receitasData.totalReceitaBovinocultura || [0, 0, 0, 0, 0];
    const agriculturaSequeiro = receitasData.totalReceitaAgriculturaSequeiro || [0, 0, 0, 0, 0];
    const outrasAtividades = receitasData.totalReceitaOutrasAtividades || [0, 0, 0, 0, 0];

    const total = bovinocultura.map((val, idx) => 
      val + agriculturaSequeiro[idx] + outrasAtividades[idx]
    );

    return {
      bovinocultura,
      ovinocultura: [0, 0, 0, 0, 0],
      caprinocultura: [0, 0, 0, 0, 0],
      agriculturaSequeiro,
      agriculturaIrrigada: [0, 0, 0, 0, 0],
      outrasAtividades,
      total,
    };
  };

  // Parse despesas estimadas
  const parseDespesas = () => {
    if (!despesasData) {
      return {
        bovinocultura: [0, 0, 0, 0, 0],
        ovinocultura: [0, 0, 0, 0, 0],
        caprinocultura: [0, 0, 0, 0, 0],
        agriculturaSequeiro: [0, 0, 0, 0, 0],
        agriculturaIrrigada: [0, 0, 0, 0, 0],
        outrasAtividades: [0, 0, 0, 0, 0],
        total: [0, 0, 0, 0, 0],
      };
    }

    const bovinocultura = despesasData.totalCustos || [0, 0, 0, 0, 0];
    const agriculturaSequeiro = despesasData.totalCustosAgriculturaSequeiro || [0, 0, 0, 0, 0];
    const outrasAtividades = despesasData.totalCustosOutrasAtividades || [0, 0, 0, 0, 0];

    const total = bovinocultura.map((val, idx) => 
      val + agriculturaSequeiro[idx] + outrasAtividades[idx]
    );

    return {
      bovinocultura,
      ovinocultura: [0, 0, 0, 0, 0],
      caprinocultura: [0, 0, 0, 0, 0],
      agriculturaSequeiro,
      agriculturaIrrigada: [0, 0, 0, 0, 0],
      outrasAtividades,
      total,
    };
  };

  // Parse capacidade de pagamento (apenas anos necessários)
  const parseCapacidadePagamento = () => {
    if (!capacidadePagamentoData) {
      return Array(26).fill({
        receitaBruta: 0,
        custosOperacionais: 0,
        encargos: 0,
        receitaLiquida: 0,
        despesasFinanceiras: 0,
        resultadoLiquido: 0,
        capacidadePagamento: 0,
      });
    }

    return Array(26).fill(null).map((_, idx) => ({
      receitaBruta: capacidadePagamentoData.receitaOperacionalBruta?.[idx] || 0,
      custosOperacionais: capacidadePagamentoData.custosOperacionais?.[idx] || 0,
      encargos: capacidadePagamentoData.encargosOperacao?.[idx] || 0,
      receitaLiquida: capacidadePagamentoData.receitaOperacionalLiquida?.[idx] || 0,
      despesasFinanceiras: capacidadePagamentoData.despesasFinanceiras?.[idx] || 0,
      resultadoLiquido: capacidadePagamentoData.resultadoLiquidoExercicio?.[idx] || 0,
      capacidadePagamento: capacidadePagamentoData.capacidadePagamento?.[idx] || 0,
    }));
  };

  const rebanho = parseRebanho();
  const agriculturaSequeiro = parseAgriculturaSequeiro();
  const agriculturaIrrigada = parseAgriculturaIrrigada();
  const outrasAtividades = parseOutrasAtividades();
  const receitas = parseReceitas();
  const despesas = parseDespesas();
  const capacidadePagamento = parseCapacidadePagamento();

  const formatCurrency = (value) => {
    if (!value && value !== 0) return '';
    return new Intl.NumberFormat('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const formatNumber = (value) => {
    if (!value && value !== 0) return '';
    return new Intl.NumberFormat('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const formatPercent = (value) => {
    if (!value && value !== 0) return '0,00%';
    return new Intl.NumberFormat('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value) + '%';
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto bg-gray-900 text-gray-100 print:bg-white print:text-black print:max-w-full">
      {/* Header - apenas para impressão */}
      <div className="hidden print:block mb-4 text-center">
        <h1 className="text-lg font-bold">PÁGINA 04 - INVENTÁRIO E PROJEÇÕES</h1>
      </div>

      {/* Seção 1: Composição do Rebanho para 2029 */}
      <div className="mb-6">
        <h2 className="text-sm font-bold bg-blue-100 p-2 mb-2">
          COMPOSIÇÃO DO REBANHO PARA 2029
        </h2>

        <div className="grid grid-cols-1 gap-4">
          {/* Rebanho Bovino */}
          <div>
            <h3 className="text-xs font-semibold mb-1">REBANHO BOVINO</h3>
            <table className="w-full border-collapse border border-gray-300 text-xs">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 p-1 text-left">DESCRIÇÃO</th>
                  <th className="border border-gray-300 p-1 text-center">UNIDADE</th>
                  <th className="border border-gray-300 p-1 text-center">QUANTIDADE</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-1">REPRODUTOR</td>
                  <td className="border border-gray-300 p-1 text-center">CAB</td>
                  <td className="border border-gray-300 p-1 text-center">{rebanho.bovino.reprodutor}</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-1">MATRIZES</td>
                  <td className="border border-gray-300 p-1 text-center">CAB</td>
                  <td className="border border-gray-300 p-1 text-center">{rebanho.bovino.matrizes}</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-1">BEZERROS (0 A 12 MESES) / BEZERRAS (0 A 12 MESES)</td>
                  <td className="border border-gray-300 p-1 text-center">CAB</td>
                  <td className="border border-gray-300 p-1 text-center">{rebanho.bovino.bezerros}</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-1">GARROTES (12 A 24 MESES) / GARROTAS (12 A 24 MESES)</td>
                  <td className="border border-gray-300 p-1 text-center">CAB</td>
                  <td className="border border-gray-300 p-1 text-center">{rebanho.bovino.garrotes}</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-1">NOVILHOS (24 A 36 MESES) / NOVILHAS (24 A 36 MESES)</td>
                  <td className="border border-gray-300 p-1 text-center">CAB</td>
                  <td className="border border-gray-300 p-1 text-center">{rebanho.bovino.novilhos}</td>
                </tr>
                <tr className="font-semibold bg-gray-50">
                  <td className="border border-gray-300 p-1">TOTAL</td>
                  <td className="border border-gray-300 p-1 text-center">CAB</td>
                  <td className="border border-gray-300 p-1 text-center">{rebanho.bovino.total}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Seção 2: Produção Agrícola Prevista para 2029 */}
      <div className="mb-6">
        <h2 className="text-sm font-bold bg-blue-100 p-2 mb-2">
          PRODUÇÃO AGRÍCOLA PREVISTA PARA 2029
        </h2>

        {/* Agricultura Sequeiro */}
        {agriculturaSequeiro.length > 0 && (
          <div className="mb-4">
            <h3 className="text-xs font-semibold mb-1">AGRICULTURA SEQUEIRO</h3>
            <table className="w-full border-collapse border border-gray-300 text-xs">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 p-1 text-left">DESCRIÇÃO</th>
                  <th className="border border-gray-300 p-1 text-center">UNIDADE</th>
                  <th className="border border-gray-300 p-1 text-center">2025</th>
                  <th className="border border-gray-300 p-1 text-center">2026</th>
                  <th className="border border-gray-300 p-1 text-center">2027</th>
                  <th className="border border-gray-300 p-1 text-center">2028</th>
                  <th className="border border-gray-300 p-1 text-center">2029</th>
                </tr>
              </thead>
              <tbody>
                {agriculturaSequeiro.map((item, idx) => (
                  <tr key={idx}>
                    <td className="border border-gray-300 p-1">{item.descricao}</td>
                    <td className="border border-gray-300 p-1 text-center">{item.unidade}</td>
                    <td className="border border-gray-300 p-1 text-right">{formatNumber(item.ano1)}</td>
                    <td className="border border-gray-300 p-1 text-right">{formatNumber(item.ano2)}</td>
                    <td className="border border-gray-300 p-1 text-right">{formatNumber(item.ano3)}</td>
                    <td className="border border-gray-300 p-1 text-right">{formatNumber(item.ano4)}</td>
                    <td className="border border-gray-300 p-1 text-right">{formatNumber(item.ano5)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Agricultura Irrigada */}
        {agriculturaIrrigada.length > 0 && (
          <div className="mb-4">
            <h3 className="text-xs font-semibold mb-1">AGRICULTURA IRRIGADA</h3>
            <table className="w-full border-collapse border border-gray-300 text-xs">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 p-1 text-left">DESCRIÇÃO</th>
                  <th className="border border-gray-300 p-1 text-center">UNIDADE</th>
                  <th className="border border-gray-300 p-1 text-center">2025</th>
                  <th className="border border-gray-300 p-1 text-center">2026</th>
                  <th className="border border-gray-300 p-1 text-center">2027</th>
                  <th className="border border-gray-300 p-1 text-center">2028</th>
                  <th className="border border-gray-300 p-1 text-center">2029</th>
                </tr>
              </thead>
              <tbody>
                {agriculturaIrrigada.map((item, idx) => (
                  <tr key={idx}>
                    <td className="border border-gray-300 p-1">{item.descricao}</td>
                    <td className="border border-gray-300 p-1 text-center">{item.unidade}</td>
                    <td className="border border-gray-300 p-1 text-right">{formatNumber(item.ano1)}</td>
                    <td className="border border-gray-300 p-1 text-right">{formatNumber(item.ano2)}</td>
                    <td className="border border-gray-300 p-1 text-right">{formatNumber(item.ano3)}</td>
                    <td className="border border-gray-300 p-1 text-right">{formatNumber(item.ano4)}</td>
                    <td className="border border-gray-300 p-1 text-right">{formatNumber(item.ano5)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Outras Atividades */}
        {outrasAtividades.length > 0 && (
          <div className="mb-4">
            <h3 className="text-xs font-semibold mb-1">OUTRAS ATIVIDADES</h3>
            <table className="w-full border-collapse border border-gray-300 text-xs">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 p-1 text-left">DESCRIÇÃO</th>
                  <th className="border border-gray-300 p-1 text-center">UNIDADE</th>
                  <th className="border border-gray-300 p-1 text-center">2025</th>
                  <th className="border border-gray-300 p-1 text-center">2026</th>
                  <th className="border border-gray-300 p-1 text-center">2027</th>
                  <th className="border border-gray-300 p-1 text-center">2028</th>
                  <th className="border border-gray-300 p-1 text-center">2029</th>
                </tr>
              </thead>
              <tbody>
                {outrasAtividades.map((item, idx) => (
                  <tr key={idx}>
                    <td className="border border-gray-300 p-1">{item.descricao}</td>
                    <td className="border border-gray-300 p-1 text-center">{item.unidade}</td>
                    <td className="border border-gray-300 p-1 text-right">{formatNumber(item.ano1)}</td>
                    <td className="border border-gray-300 p-1 text-right">{formatNumber(item.ano2)}</td>
                    <td className="border border-gray-300 p-1 text-right">{formatNumber(item.ano3)}</td>
                    <td className="border border-gray-300 p-1 text-right">{formatNumber(item.ano4)}</td>
                    <td className="border border-gray-300 p-1 text-right">{formatNumber(item.ano5)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Seção 3: Receitas Estimadas até 2029 */}
      <div className="mb-6">
        <h2 className="text-sm font-bold bg-blue-100 p-2 mb-2">
          RECEITAS ESTIMADAS ATÉ 2029
        </h2>
        <table className="w-full border-collapse border border-gray-300 text-xs">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-1 text-left">DESCRIÇÃO</th>
              <th className="border border-gray-300 p-1 text-center">2025</th>
              <th className="border border-gray-300 p-1 text-center">2026</th>
              <th className="border border-gray-300 p-1 text-center">2027</th>
              <th className="border border-gray-300 p-1 text-center">2028</th>
              <th className="border border-gray-300 p-1 text-center">2029</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 p-1">1) BOVINOCULTURA</td>
              <td className="border border-gray-300 p-1 text-right">{formatCurrency(receitas.bovinocultura[0])}</td>
              <td className="border border-gray-300 p-1 text-right">{formatCurrency(receitas.bovinocultura[1])}</td>
              <td className="border border-gray-300 p-1 text-right">{formatCurrency(receitas.bovinocultura[2])}</td>
              <td className="border border-gray-300 p-1 text-right">{formatCurrency(receitas.bovinocultura[3])}</td>
              <td className="border border-gray-300 p-1 text-right">{formatCurrency(receitas.bovinocultura[4])}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-1">4) AGRICULTURA SEQUEIRO</td>
              <td className="border border-gray-300 p-1 text-right">{formatCurrency(receitas.agriculturaSequeiro[0])}</td>
              <td className="border border-gray-300 p-1 text-right">{formatCurrency(receitas.agriculturaSequeiro[1])}</td>
              <td className="border border-gray-300 p-1 text-right">{formatCurrency(receitas.agriculturaSequeiro[2])}</td>
              <td className="border border-gray-300 p-1 text-right">{formatCurrency(receitas.agriculturaSequeiro[3])}</td>
              <td className="border border-gray-300 p-1 text-right">{formatCurrency(receitas.agriculturaSequeiro[4])}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-1">6) OUTRAS ATIVIDADES</td>
              <td className="border border-gray-300 p-1 text-right">{formatCurrency(receitas.outrasAtividades[0])}</td>
              <td className="border border-gray-300 p-1 text-right">{formatCurrency(receitas.outrasAtividades[1])}</td>
              <td className="border border-gray-300 p-1 text-right">{formatCurrency(receitas.outrasAtividades[2])}</td>
              <td className="border border-gray-300 p-1 text-right">{formatCurrency(receitas.outrasAtividades[3])}</td>
              <td className="border border-gray-300 p-1 text-right">{formatCurrency(receitas.outrasAtividades[4])}</td>
            </tr>
            <tr className="font-semibold bg-gray-50">
              <td className="border border-gray-300 p-1">RECEITA TOTAL</td>
              <td className="border border-gray-300 p-1 text-right">{formatCurrency(receitas.total[0])}</td>
              <td className="border border-gray-300 p-1 text-right">{formatCurrency(receitas.total[1])}</td>
              <td className="border border-gray-300 p-1 text-right">{formatCurrency(receitas.total[2])}</td>
              <td className="border border-gray-300 p-1 text-right">{formatCurrency(receitas.total[3])}</td>
              <td className="border border-gray-300 p-1 text-right">{formatCurrency(receitas.total[4])}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Seção 4: Despesas Estimadas até 2029 */}
      <div className="mb-6">
        <h2 className="text-sm font-bold bg-blue-100 p-2 mb-2">
          DESPESAS ESTIMADAS ATÉ 2029
        </h2>
        <table className="w-full border-collapse border border-gray-300 text-xs">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-1 text-left">DESCRIÇÃO</th>
              <th className="border border-gray-300 p-1 text-center">2025</th>
              <th className="border border-gray-300 p-1 text-center">2026</th>
              <th className="border border-gray-300 p-1 text-center">2027</th>
              <th className="border border-gray-300 p-1 text-center">2028</th>
              <th className="border border-gray-300 p-1 text-center">2029</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 p-1">1) BOVINOCULTURA</td>
              <td className="border border-gray-300 p-1 text-right">{formatCurrency(despesas.bovinocultura[0])}</td>
              <td className="border border-gray-300 p-1 text-right">{formatCurrency(despesas.bovinocultura[1])}</td>
              <td className="border border-gray-300 p-1 text-right">{formatCurrency(despesas.bovinocultura[2])}</td>
              <td className="border border-gray-300 p-1 text-right">{formatCurrency(despesas.bovinocultura[3])}</td>
              <td className="border border-gray-300 p-1 text-right">{formatCurrency(despesas.bovinocultura[4])}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-1">4) AGRICULTURA SEQUEIRO</td>
              <td className="border border-gray-300 p-1 text-right">{formatCurrency(despesas.agriculturaSequeiro[0])}</td>
              <td className="border border-gray-300 p-1 text-right">{formatCurrency(despesas.agriculturaSequeiro[1])}</td>
              <td className="border border-gray-300 p-1 text-right">{formatCurrency(despesas.agriculturaSequeiro[2])}</td>
              <td className="border border-gray-300 p-1 text-right">{formatCurrency(despesas.agriculturaSequeiro[3])}</td>
              <td className="border border-gray-300 p-1 text-right">{formatCurrency(despesas.agriculturaSequeiro[4])}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-1">6) OUTRAS ATIVIDADES</td>
              <td className="border border-gray-300 p-1 text-right">{formatCurrency(despesas.outrasAtividades[0])}</td>
              <td className="border border-gray-300 p-1 text-right">{formatCurrency(despesas.outrasAtividades[1])}</td>
              <td className="border border-gray-300 p-1 text-right">{formatCurrency(despesas.outrasAtividades[2])}</td>
              <td className="border border-gray-300 p-1 text-right">{formatCurrency(despesas.outrasAtividades[3])}</td>
              <td className="border border-gray-300 p-1 text-right">{formatCurrency(despesas.outrasAtividades[4])}</td>
            </tr>
            <tr className="font-semibold bg-gray-50">
              <td className="border border-gray-300 p-1">DESPESA TOTAL</td>
              <td className="border border-gray-300 p-1 text-right">{formatCurrency(despesas.total[0])}</td>
              <td className="border border-gray-300 p-1 text-right">{formatCurrency(despesas.total[1])}</td>
              <td className="border border-gray-300 p-1 text-right">{formatCurrency(despesas.total[2])}</td>
              <td className="border border-gray-300 p-1 text-right">{formatCurrency(despesas.total[3])}</td>
              <td className="border border-gray-300 p-1 text-right">{formatCurrency(despesas.total[4])}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Seção 5: Capacidade de Pagamento (Anos 2025-2029) */}
      <div className="mb-6">
        <h2 className="text-sm font-bold bg-blue-100 p-2 mb-2">
          CAPACIDADE DE PAGAMENTO (2025-2029)
        </h2>
        <table className="w-full border-collapse border border-gray-300 text-xs">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-1 text-left">DESCRIÇÃO</th>
              <th className="border border-gray-300 p-1 text-center">2025</th>
              <th className="border border-gray-300 p-1 text-center">2026</th>
              <th className="border border-gray-300 p-1 text-center">2027</th>
              <th className="border border-gray-300 p-1 text-center">2028</th>
              <th className="border border-gray-300 p-1 text-center">2029</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 p-1">(+) RECEITA OPERACIONAL BRUTA</td>
              <td className="border border-gray-300 p-1 text-right">{formatCurrency(capacidadePagamento[0]?.receitaBruta)}</td>
              <td className="border border-gray-300 p-1 text-right">{formatCurrency(capacidadePagamento[1]?.receitaBruta)}</td>
              <td className="border border-gray-300 p-1 text-right">{formatCurrency(capacidadePagamento[2]?.receitaBruta)}</td>
              <td className="border border-gray-300 p-1 text-right">{formatCurrency(capacidadePagamento[3]?.receitaBruta)}</td>
              <td className="border border-gray-300 p-1 text-right">{formatCurrency(capacidadePagamento[4]?.receitaBruta)}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-1">(-) CUSTOS OPERACIONAIS</td>
              <td className="border border-gray-300 p-1 text-right">{formatCurrency(capacidadePagamento[0]?.custosOperacionais)}</td>
              <td className="border border-gray-300 p-1 text-right">{formatCurrency(capacidadePagamento[1]?.custosOperacionais)}</td>
              <td className="border border-gray-300 p-1 text-right">{formatCurrency(capacidadePagamento[2]?.custosOperacionais)}</td>
              <td className="border border-gray-300 p-1 text-right">{formatCurrency(capacidadePagamento[3]?.custosOperacionais)}</td>
              <td className="border border-gray-300 p-1 text-right">{formatCurrency(capacidadePagamento[4]?.custosOperacionais)}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-1">(-) ENCARGOS DA OPERAÇÃO</td>
              <td className="border border-gray-300 p-1 text-right">{formatCurrency(capacidadePagamento[0]?.encargos)}</td>
              <td className="border border-gray-300 p-1 text-right">{formatCurrency(capacidadePagamento[1]?.encargos)}</td>
              <td className="border border-gray-300 p-1 text-right">{formatCurrency(capacidadePagamento[2]?.encargos)}</td>
              <td className="border border-gray-300 p-1 text-right">{formatCurrency(capacidadePagamento[3]?.encargos)}</td>
              <td className="border border-gray-300 p-1 text-right">{formatCurrency(capacidadePagamento[4]?.encargos)}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-1">(=) RECEITA OPERACIONAL LÍQUIDA</td>
              <td className="border border-gray-300 p-1 text-right">{formatCurrency(capacidadePagamento[0]?.receitaLiquida)}</td>
              <td className="border border-gray-300 p-1 text-right">{formatCurrency(capacidadePagamento[1]?.receitaLiquida)}</td>
              <td className="border border-gray-300 p-1 text-right">{formatCurrency(capacidadePagamento[2]?.receitaLiquida)}</td>
              <td className="border border-gray-300 p-1 text-right">{formatCurrency(capacidadePagamento[3]?.receitaLiquida)}</td>
              <td className="border border-gray-300 p-1 text-right">{formatCurrency(capacidadePagamento[4]?.receitaLiquida)}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-1">(-) DESPESAS FINANCEIRAS</td>
              <td className="border border-gray-300 p-1 text-right">{formatCurrency(capacidadePagamento[0]?.despesasFinanceiras)}</td>
              <td className="border border-gray-300 p-1 text-right">{formatCurrency(capacidadePagamento[1]?.despesasFinanceiras)}</td>
              <td className="border border-gray-300 p-1 text-right">{formatCurrency(capacidadePagamento[2]?.despesasFinanceiras)}</td>
              <td className="border border-gray-300 p-1 text-right">{formatCurrency(capacidadePagamento[3]?.despesasFinanceiras)}</td>
              <td className="border border-gray-300 p-1 text-right">{formatCurrency(capacidadePagamento[4]?.despesasFinanceiras)}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-1">(=) RESULTADO LÍQUIDO DO EXERCÍCIO</td>
              <td className="border border-gray-300 p-1 text-right">{formatCurrency(capacidadePagamento[0]?.resultadoLiquido)}</td>
              <td className="border border-gray-300 p-1 text-right">{formatCurrency(capacidadePagamento[1]?.resultadoLiquido)}</td>
              <td className="border border-gray-300 p-1 text-right">{formatCurrency(capacidadePagamento[2]?.resultadoLiquido)}</td>
              <td className="border border-gray-300 p-1 text-right">{formatCurrency(capacidadePagamento[3]?.resultadoLiquido)}</td>
              <td className="border border-gray-300 p-1 text-right">{formatCurrency(capacidadePagamento[4]?.resultadoLiquido)}</td>
            </tr>
            <tr className="font-semibold bg-yellow-50">
              <td className="border border-gray-300 p-1">CAPACIDADE DE PAGAMENTO</td>
              <td className="border border-gray-300 p-1 text-right">{formatPercent(capacidadePagamento[0]?.capacidadePagamento)}</td>
              <td className="border border-gray-300 p-1 text-right">{formatPercent(capacidadePagamento[1]?.capacidadePagamento)}</td>
              <td className="border border-gray-300 p-1 text-right">{formatPercent(capacidadePagamento[2]?.capacidadePagamento)}</td>
              <td className="border border-gray-300 p-1 text-right">{formatPercent(capacidadePagamento[3]?.capacidadePagamento)}</td>
              <td className="border border-gray-300 p-1 text-right">{formatPercent(capacidadePagamento[4]?.capacidadePagamento)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Seção 6: Declaração de Responsabilidade Técnica */}
      <div className="mb-6 print:break-before-page">
        <h2 className="text-sm font-bold bg-blue-100 p-2 mb-2">
          DECLARAÇÃO DE RESPONSABILIDADE TÉCNICA
        </h2>
        <div className="border border-gray-300 p-4">
          <p className="text-xs mb-4 text-justify">
            EU, <strong>DVERSON THARLES SOUSA REBOUÇAS</strong>, ENGENHEIRO(A) RESPONSÁVEL PELA ELABORAÇÃO DO PROJETO TÉCNICO DE FINANCIAMENTO, EM NOME DO SENHOR(A){' '}
            <strong>{identificacaoBeneficiarioData?.[0]?.campo1?.toUpperCase() || 'BENEFICIÁRIO'}</strong>, DECLARO QUE TODAS AS INFORMAÇÕES CONTIDAS NESTE SÃO VERDADEIRAS E ME RESPONSABILIZO PELA EXATIDÃO DESTAS. ACRESCENTO QUE O PROJETO SERÁ EXECUTADO COM O MÍNIMO DE ALTERAÇÕES POSSÍVEIS, NÃO DESCARACTERIZANDO ESTE E PRESTAREI TODAS AS INFORMAÇÕES SOLICITADAS PELOS ÓRGÃOS DE CONTROLE E SUPERVISÃO.
          </p>
          <div className="mt-16 text-center">
            <div className="border-t border-gray-400 w-64 mx-auto mb-2"></div>
            <p className="text-xs font-semibold">DVERSON THARLES SOUSA REBOUÇAS</p>
            <p className="text-xs">ENGENHEIRO(A) RESPONSÁVEL</p>
            <p className="text-xs">323855/D-TO - CREA</p>
            <p className="text-xs">DTS REBOUÇAS LTDA</p>
          </div>
        </div>
      </div>

      {/* Botão de impressão - oculto na impressão */}
      <div className="print:hidden mt-6 flex justify-center gap-4">
        <button
          onClick={() => window.print()}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Imprimir Página
        </button>
      </div>
    </div>
  );
}
