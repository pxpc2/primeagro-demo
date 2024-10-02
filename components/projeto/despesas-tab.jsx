import { useEffect, useState } from "react";

export default function DespesasTab({ data, isAdmin, receitasData }) {
  console.log(receitasData);
  const [totalReceitas, setTotalReceitas] = useState(Array(12).fill(0));

  // Calcula os totais de Receitas para cada ano
  // ultimos dois anos copia ao 2033
  useEffect(() => {
    const newTotalReceitas = Array(12).fill(0);
    for (let i = 0; i < 10; i++) {
      const totalMatrizes =
        receitasData?.dadosReceita?.valorMatrizesDescartadas?.[i] || 0;
      const totalNovilhos =
        receitasData?.dadosReceita?.valorNovilhosVendidos?.[i] || 0;
      const totalNovilhas =
        receitasData?.dadosReceita?.valorNovilhasVendidas?.[i] || 0;
      const totalQueijo = receitasData?.dadosReceita?.valorQueijo?.[i] || 0;
      const totalLeite =
        receitasData?.dadosReceita?.valorLeiteParaVenda?.[i] || 0;

      newTotalReceitas[i] =
        totalMatrizes +
        totalNovilhos +
        totalNovilhas +
        totalQueijo +
        totalLeite;

      if (i === 9) {
        newTotalReceitas[i + 1] = newTotalReceitas[i];
        newTotalReceitas[i + 2] = newTotalReceitas[i];
      }
    }

    setTotalReceitas(newTotalReceitas);
  }, []);

  return (
    <div>
      <h1>Total Receitas por Ano</h1>
      {totalReceitas.map((total, index) => (
        <p key={index}>
          Total Receita for Year {2024 + index}: {total}
        </p>
      ))}
    </div>
  );
}
