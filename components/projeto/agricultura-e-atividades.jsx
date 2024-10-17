export default function TabelaAtividades({
  data,
  setData,
  atividade,
  anoInicial,
}) {
  const initialState = data?.map((item) => ({
    ...item, // cada item uma entrada de algum ano
  }));

  // sempre 9 anos
  return (
    <div>
      <p>{atividade}</p>
    </div>
  );
}
