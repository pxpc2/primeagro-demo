import { useEffect, useState } from "react";
import Heading from "./Header";
import { ANO_INICIAL, INVESTIMENTO_CATEGORIAS } from "@/utils/constants";
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
import { set } from "react-hook-form";

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
  const [anoImplantacao, setAnoImplantacao] = useState(
    data?.[0].ano_implantacao || ANO_INICIAL
  );

  const [parcelas, setParcelas] = useState([]);
  const [p3, setP3] = useState(0.0);

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
        anoImplantacao: anoImplantacao,
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

  function getSaldoInicial({ anoIndex, parcelas, amortizacao, encargos }) {
    if (anoIndex === 0) {
      console.log(p3 + p3 * 0.005);
      return p3 + p3 * 0.005;
    } else if (anoIndex < 3) {
      return parcelas[anoIndex - 1].saldo_final;
    } else if (anoIndex >= 3) {
      console.log(
        "index ",
        anoIndex,
        "maior ou igual a 3, com amortizacao, encargos: ",
        amortizacao,
        encargos
      );
      return parcelas[anoIndex - 1].saldo_final - amortizacao - encargos;
    }
  }

  useEffect(() => {
    const anoInicial = anoImplantacao;
    const newParcelas = [];

    if (haveraPRONAF === "Não") setP3(0.0);
    else {
      // pegar qtd beneficiarios em SIB
      if (sibData?.dadosProjeto?.numero_beneficiarios === 0) setP3(0.0);
      else {
        // vai ser valor total investimentos PRONAF
        setP3(valorPRONAF);
      }
    }

    for (let i = 0; i < 10; i++) {
      let ano = anoInicial + i;
      let amortizacao = i < 3 ? 0 : p3 / 7;

      let saldo_devedor = 0.0,
        encargos = 0.0;
      if (i >= 3) {
        if (i === 3) {
          saldo_devedor = p3 - amortizacao;
          encargos = saldo_devedor * 0.0033584;
        } else {
          saldo_devedor = newParcelas[i - 1].saldo_devedor - amortizacao;
          switch (i) {
            case 4:
              encargos = saldo_devedor * 0.0050503;
            case 5:
              encargos = saldo_devedor * 0.007594299620285;
            case 6:
              encargos = saldo_devedor * 0.0118430674562045;
            case 7:
              encargos = saldo_devedor * 0.0203533;
            case 8:
              encargos = saldo_devedor * 0.0459101;
            case 9:
              encargos = saldo_devedor * 0.051140722737734;
          }
        }
      }
      let saldo_inicial = getSaldoInicial({
        anoIndex: i,
        parcelas: newParcelas,
        amortizacao: amortizacao,
        encargos: encargos,
      });
      let juros = saldo_inicial * prazoJuros;
      let parcela = i < 3 ? 0.0 : amortizacao + encargos;

      let saldo_final =
        i < 3 ? saldo_inicial + juros - parcela : saldo_inicial + juros;

      let rebate = i < 3 ? 0.0 : amortizacao * prazoRebate;
      let parcela_com_rebate = i < 3 ? 0.0 : parcela - rebate;
      newParcelas.push({
        ano,
        saldo_inicial,
        juros,
        amortizacao,
        parcela,
        rebate,
        parcela_com_rebate,
        saldo_final,
        saldo_devedor,
        encargos,
      });
    }

    setParcelas(newParcelas);
  }, [p3, setP3]);

  console.log(sibData);

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
          anoImplantacao,
          setAnoImplantacao,
        }}
      />
      <PrestacoesTable
        parcelas={parcelas}
        setParcelas={setParcelas}
        formsDisabled={formsDisabled}
        prazoJuros={prazoJuros}
        prazoRebate={prazoRebate}
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
  anoImplantacao,
  setAnoImplantacao,
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
              <TableCell className="font-bold">Ano de implantação</TableCell>
              <TableCell>
                <Input
                  type="number"
                  value={anoImplantacao}
                  onChange={(e) => setAnoImplantacao(e.target.value)}
                  disabled={formsDisabled}
                  className="w-full"
                />
              </TableCell>
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

function PrestacoesTable({
  parcelas,
  setParcelas,
  formsDisabled,
  prazoJuros,
  prazoRebate,
}) {
  return (
    <div className="overflow-hidden mt-4 border-gray-800 border shadow sm:rounded-lg text-sm">
      <div className="bg-gray-800 p-4">
        <h3 className="text-md font-bold leading-6 text-gray-200">
          SIMULAÇÃO DE AMORTIZAÇÃO DAS PRESTAÇÕES
        </h3>
      </div>
      <div className="bg-gray-900 p-4 text-gray-200">
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Parcela</TableHead>
              <TableHead className="text-center">Saldo Inicial</TableHead>
              <TableHead className="text-center">Juros</TableHead>
              <TableHead className="text-center">Amortização</TableHead>
              <TableHead className="text-center">Parcela</TableHead>
              <TableHead className="text-center">Rebate</TableHead>
              <TableHead className="text-center">Parcela com Rebate</TableHead>
              <TableHead className="text-center">Saldo Final</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {parcelas.map((item, index) => (
              <TableRow key={item.ano}>
                <TableCell className="text-center bg-gray-800">
                  {item.ano}
                </TableCell>
                <TableCell className="text-center">
                  <Input
                    type="number"
                    value={item.saldo_inicial || ""}
                    disabled={true}
                  />
                </TableCell>
                <TableCell className="text-center">
                  <Input
                    type="number"
                    value={item.juros || ""}
                    disabled={true}
                  />
                </TableCell>
                <TableCell className="text-center">
                  <Input
                    type="number"
                    value={item.amortizacao || ""}
                    disabled={true}
                  />
                </TableCell>
                <TableCell className="text-center">
                  <Input
                    type="number"
                    value={item.parcela || ""}
                    disabled={true}
                  />
                </TableCell>
                <TableCell className="text-center">
                  <Input
                    type="number"
                    value={item.rebate || ""}
                    disabled={true}
                  />
                </TableCell>
                <TableCell className="text-center">
                  <Input
                    type="number"
                    value={item.parcela_com_rebate || ""}
                    disabled={true}
                  />
                </TableCell>
                <TableCell className="text-center">
                  <Input
                    type="number"
                    value={item.saldo_final || ""}
                    disabled={true}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
