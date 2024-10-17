import { useEffect, useState } from "react";
import IndicadoresTecnicos from "./evolucao-rebanho-indicadores-tecnicos";
import Heading from "./Header";
import EvolucaoRebanhoBovinocultura from "./evolucao-rebanho-bovinocultura";
import { submitEvolucaoRebanho } from "@/app/projeto/actions";
import TabelaAtividades from "./agricultura-e-atividades";

export default function EvolucaoRebanhoTab({
  data,
  isAdmin,
  setVendaAnimaisData,
}) {
  const [loading, setLoading] = useState(false);
  const [formsDisabled, setFormsDisabled] = useState(true);

  console.log(data);

  const [indicadoresTecnicosData, setIndicadoresTecnicosData] = useState(
    data?.dadosEvolucaoRebanho[0]?.aba_evolucao_rebanho_indicadores_tecnicos ||
      []
  );
  const [bovinoculturaData, setBovinoculturaData] = useState(data || [{}]);
  const anoInicial = 2024; // vai vir como dado do SimuladorPNCF

  const [dadosAgriculturaSequeiro, setDadosAgriculturaSequeiro] = useState(
    data?.dadosAgriculturaSequeiro || []
  );
  const [dadosAgriculturaIrrigada, setDadosAgriculturaIrrigada] = useState(
    data?.dadosAgriculturaIrrigada || []
  );
  const [dadosOutrasAtividades, setDadosOutrasAtividades] = useState(
    data?.dadosOutrasAtividades || []
  );

  useEffect(() => {
    setVendaAnimaisData({
      matrizesDescartadasValues: bovinoculturaData?.matrizesDescartadasValues,
      novilhosVendidosValues: bovinoculturaData?.novilhosVendidosValues,
      novilhasVendidasValues: bovinoculturaData?.novilhasVendidasValues,
      queijoValues: bovinoculturaData?.queijoValues,
      leiteParaVendaValues: bovinoculturaData?.leiteParaVendaValues,
      equivalenciaUAValues: bovinoculturaData?.equivalenciaUAValues,
    });
  }, [
    bovinoculturaData?.equivalenciaUAValues,
    bovinoculturaData?.leiteParaVendaValues,
    bovinoculturaData?.matrizesDescartadasValues,
    bovinoculturaData?.novilhasVendidasValues,
    bovinoculturaData?.novilhosVendidosValues,
    bovinoculturaData?.queijoValues,
    data,
    setVendaAnimaisData,
  ]);

  const onEdit = () => {
    setFormsDisabled(false);
  };
  const onSave = async () => {
    try {
      setLoading(true);

      const updatedBovinoculturaData = {
        ...bovinoculturaData[0],
        animaisAdquirir_reprodutores: bovinoculturaData?.reprodutoresAdquirir,
        animaisAdquirir_matrizes: bovinoculturaData?.matrizesAdquirir,
        estabilizacao_plantel: bovinoculturaData?.estabilizacao_plantel,
        relacao_matrizes: bovinoculturaData?.relacao_matrizes,
        equivalenciaUA_bezerros: bovinoculturaData?.equivalenciaUA_bezerros,
        equivalenciaUA_novilhos: bovinoculturaData?.equivalenciaUA_novilhos,
        equivalenciaUA_matrizes: bovinoculturaData?.equivalenciaUA_matrizes,
        equivalenciaUA_touro: bovinoculturaData?.equivalenciaUA_touro,
        equivalenciaUA_garrotes: bovinoculturaData?.equivalenciaUA_garrotes,
        matrizesDescartadas_ano0: bovinoculturaData?.matrizesDescartadas_ano0,
        novilhaVendida_ano0: bovinoculturaData?.novilhaVendida_ano0,
        novilhoVendido_ano0: bovinoculturaData?.novilhoVendido_ano0,
        queijo_ano0: bovinoculturaData?.queijoValues?.[0],
        queijo_ano1: bovinoculturaData?.queijoValues?.[1],
        queijo_ano2: bovinoculturaData?.queijoValues?.[2],
        queijo_ano3: bovinoculturaData?.queijoValues?.[3],
        queijo_ano4: bovinoculturaData?.queijoValues?.[4],
        queijo_ano5: bovinoculturaData?.queijoValues?.[5],
        queijo_ano6: bovinoculturaData?.queijoValues?.[6],
        queijo_ano7: bovinoculturaData?.queijoValues?.[7],
        queijo_ano8: bovinoculturaData?.queijoValues?.[8],
        queijo_ano9: bovinoculturaData?.queijoValues?.[9],
        queijo_ano10: bovinoculturaData?.queijoValues?.[10],
      };

      const finalBovinoculturaData = [updatedBovinoculturaData];

      const updatedIndicadoresTecnicosData = indicadoresTecnicosData?.map(
        (item) => {
          const updatedItem = { ...item };
          Object.keys(updatedItem).forEach((key) => {
            if (key.startsWith("ano")) {
              updatedItem[key] = parseInt(updatedItem[key] || 0, 10);
            }
          });

          return updatedItem;
        }
      );

      await submitEvolucaoRebanho({
        indicadoresData: updatedIndicadoresTecnicosData,
        bovinoculturaData: finalBovinoculturaData,
      });

      setFormsDisabled(true);
    } catch (error) {
      console.error("Erro ao salvar os dados:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormsDisabled(true);
  };

  return (
    <div className="p-4 bg-gray-900/80">
      <Heading
        tabName={"Evolução do rebanho"}
        onEdit={onEdit}
        onSave={onSave}
        isEditing={!formsDisabled}
        isLoading={loading}
        onCancel={handleCancel}
        isAdmin={isAdmin}
      />
      <div className="flex flex-col gap-8 items-center">
        <div className="mt-4 flex flex-col gap-8">
          <IndicadoresTecnicos
            data={indicadoresTecnicosData || []}
            anoInicial={anoInicial}
            formsDisabled={formsDisabled}
            onChange={setIndicadoresTecnicosData}
          />
        </div>
        <div>
          <EvolucaoRebanhoBovinocultura
            data={bovinoculturaData || []}
            formsDisabled={formsDisabled}
            anoInicial={anoInicial}
            onChange={setBovinoculturaData}
          />
        </div>
        <div className="pt-4 border-b-2 border-gray-600 w-[60%]"></div>
        <h1 className="text-lg text-center font-bold p-3 mt-4 bg-gray-800 rounded-sm w-full">
          ATIVIDADES AGRÍCOLAS
        </h1>
        <TabelaAtividades
          data={dadosAgriculturaSequeiro}
          setData={setDadosAgriculturaSequeiro}
          atividade="sequeiro"
          anoInicial={anoInicial}
        />
        <TabelaAtividades
          data={dadosAgriculturaIrrigada}
          setData={setDadosAgriculturaIrrigada}
          atividade="irrigada"
          anoInicial={anoInicial}
        />
        <TabelaAtividades
          data={dadosOutrasAtividades}
          setData={setDadosOutrasAtividades}
          atividade="outras"
          anoInicial={anoInicial}
        />
      </div>
    </div>
  );
}
