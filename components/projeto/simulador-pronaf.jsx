import { useState } from "react";
import Heading from "./Header";
import { INVESTIMENTO_CATEGORIAS } from "@/utils/constants";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { submitSimuladorPRONAF } from "@/app/projeto/actions";

export default function SimuladorPRONAF({
  data,
  isAdmin,
  preAnaliseData,
  sibData,
}) {
  const [loading, setLoading] = useState(false);
  const [formsDisabled, setFormsDisabled] = useState(true);

  console.log(data);

  const [municipio, setMunicipio] = useState(
    preAnaliseData?.[0]?.campo_3 || ""
  );
  const [nomeImovel, setNomeImovel] = useState(
    preAnaliseData?.[0]?.campo_4 || ""
  );
  const [areaAdquirida, setAreaAdquirida] = useState(
    preAnaliseData?.[0]?.campo_7 || ""
  );
  const [prazoCarencia, setPrazoCarencia] = useState(data?.[0]?.carencia || 0);
  const [prazoJuros, setPrazoJuros] = useState(data?.[0].juros || 0.0);
  const [prazoRebate, setPrazoRebate] = useState(data?.[0].rebate || 0.0);

  function parseCurrency(value) {
    if (typeof value === "string") {
      return parseFloat(
        value.replace(/\./g, "").replace(",", ".").replace("R$", "").trim()
      );
    }
    return parseFloat(value) || 0;
  }
  function getValorInvestimentosPRONAF() {
    const categorias = INVESTIMENTO_CATEGORIAS;
    const somasCategorias = categorias.reduce((acc, categoria) => {
      acc[categoria] = { SIB: 0, PRONAF_A: 0, Recursos_Proprios: 0, Total: 0 };
      return acc;
    }, {});
    sibData?.dadosInvestimentos?.dadosInvestimentos?.forEach((investimento) => {
      const { categoria, fonte_financiamento, valor_total } = investimento;

      const valor = parseCurrency(valor_total);

      if (fonte_financiamento === "SIB") {
        somasCategorias[categoria].SIB += valor;
      } else if (fonte_financiamento === "PRONAF-A") {
        somasCategorias[categoria].PRONAF_A += valor;
      } else if (fonte_financiamento === "Recursos Próprios") {
        somasCategorias[categoria].Recursos_Proprios += valor;
      }

      somasCategorias[categoria].Total += valor;
    });
    const totalInvested = categorias.reduce(
      (acc, categoria) => {
        acc.SIB += somasCategorias[categoria].SIB;
        acc.PRONAF_A += somasCategorias[categoria].PRONAF_A;
        acc.Recursos_Proprios += somasCategorias[categoria].Recursos_Proprios;
        acc.Total += somasCategorias[categoria].Total;
        return acc;
      },
      { SIB: 0, PRONAF_A: 0, Recursos_Proprios: 0, Total: 0 }
    );
    return totalInvested.PRONAF_A;
  }

  const [valorPRONAF, setValorPRONAF] = useState(getValorInvestimentosPRONAF());
  const [haveraPRONAF, setHaveraPRONAF] = useState(
    sibData?.haveraPRONAF ? "Sim" : "Não"
  );

  const onEdit = () => {
    setFormsDisabled(false);
  };
  const onSave = async () => {
    try {
      setLoading(true);
      const dadosIniciais = {
        prazoCarencia: prazoCarencia,
        prazoJuros: prazoJuros?.toFixed(2),
        prazoRebate: prazoRebate?.toFixed(2),
      };
      await submitSimuladorPRONAF({
        dadosIniciaisData: dadosIniciais,
        parcelasData: {},
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
    <div className="p-4 bg-gray-900/90">
      <Heading
        isAdmin={isAdmin}
        onEdit={onEdit}
        onSave={onSave}
        isEditing={!formsDisabled}
        isLoading={loading}
        onCancel={handleCancel}
        tabName={"Simulador PRONAF"}
      />
      <DadosIniciaisTable
        {...{
          formsDisabled,
          municipio,
          nomeImovel,
          areaAdquirida,
          prazoCarencia,
          setPrazoCarencia,
          prazoJuros,
          setPrazoJuros,
          prazoRebate,
          setPrazoRebate,
          valorPRONAF,
          haveraPRONAF,
        }}
      />
    </div>
  );
}

function DadosIniciaisTable({
  formsDisabled,
  nomeImovel,
  municipio,
  areaAdquirida,
  prazoCarencia,
  setPrazoCarencia,
  prazoJuros,
  setPrazoJuros,
  prazoRebate,
  setPrazoRebate,
  valorPRONAF,
  haveraPRONAF,
}) {
  return (
    <div className="overflow-hidden mt-4 border-gray-800 border shadow sm:rounded-lg text-sm">
      <div className="bg-gray-800 p-4">
        <h3 className="text-md font-bold leading-6 text-gray-200">
          DADOS INICIAIS
        </h3>
      </div>
      <div className="bg-gray-900 p-4 text-gray-200">
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="text-left">Item</TableHead>
              <TableHead className="text-left">Valor</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-bold">Município</TableCell>
              <TableCell>{municipio}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-bold">Nome do Imóvel</TableCell>
              <TableCell>{nomeImovel}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-bold">Área a ser adquirida</TableCell>
              <TableCell>{areaAdquirida}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-bold">Carência</TableCell>
              <TableCell>
                <Input
                  type="number"
                  value={prazoCarencia}
                  onChange={(e) => setPrazoCarencia(e.target.value)}
                  disabled={formsDisabled}
                  className="w-full"
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-bold">Juros (%)</TableCell>
              <TableCell>
                <Input
                  type="number"
                  value={(prazoJuros * 100).toFixed(0)}
                  onChange={(e) => setPrazoJuros(e.target.value / 100)}
                  disabled={formsDisabled}
                  className="w-full"
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-bold">Rebate (%)</TableCell>
              <TableCell>
                <Input
                  type="number"
                  value={(prazoRebate * 100).toFixed(0)}
                  onChange={(e) => setPrazoRebate(e.target.value / 100)}
                  disabled={formsDisabled}
                  className="w-full"
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-bold">
                Valor PRONAF Utilizado
              </TableCell>
              <TableCell>
                <Input
                  type="text"
                  value={valorPRONAF ? `R$ ${valorPRONAF.toFixed(2)}` : "-"}
                  disabled
                  className="w-full bg-gray-500 text-black font-bold"
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-bold">Haverá PRONAF?</TableCell>
              <TableCell>{haveraPRONAF}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
