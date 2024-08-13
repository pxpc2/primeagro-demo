import IndicadoresTecnicos from "./evolucao-rebanho-indicadores-tecnicos";

export default function EvolucaoRebanhoTab({ data, formsDisabled, isAdmin }) {
  console.log(data);
  const anoInicial = 2024; // vai vir como dado do SimuladorPNCF
  return (
    <div>
      <IndicadoresTecnicos data={data || []} anoInicial={anoInicial} />
    </div>
  );
}
