import { useEffect, useState } from "react";
import Heading from "./Header";
import { ANO_INICIAL } from "@/utils/constants";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Input } from "../ui/input";

export default function SimuladorPNCF({
  data,
  isAdmin,
  dadosSIB,
  abaPreAnalise,
}) {
  const [loading, setLoading] = useState(false);
  const [formsDisabled, setFormsDisabled] = useState(true);

  const [taxaDeJurosAno, setTaxaDeJurosAno] = useState(0.0);
  const [bonusAdimplencia, setBonusAdimplencia] = useState(0.0);

  // Ajusta os valores de taxa juros e bonus ao abrir aba
  useEffect(() => {
    const tipoPNCF = abaPreAnalise?.[0]?.campo_8;
    if (tipoPNCF === "Social") {
      setTaxaDeJurosAno(0.005);
      setBonusAdimplencia(0.4);
    } else if (tipoPNCF === "Mais") {
      setTaxaDeJurosAno(0.025);
      setBonusAdimplencia(0.2);
    } else if (tipoPNCF === "Jovem Terra da Juventude") {
      setTaxaDeJurosAno(0.005);
      setBonusAdimplencia(0.4);
    } else if (tipoPNCF === "Empreendedor") {
      setTaxaDeJurosAno(0.04);
      setBonusAdimplencia(0.0);
    }
  }, []);

  const [linhaFinanciamento, setLinhaFinanciamento] = useState(
    abaPreAnalise?.[0]?.campo_8 || ""
  );
  const [valorImovelNegociado, setValorImovelNegociado] = useState(
    dadosSIB?.valorAvaliado?.valor_total_imovel || 0.0
  );
  const [custoMedicaoInterna, setCustoMedicaoInterna] = useState(
    dadosSIB?.valorImovelCustos?.custoMedicaoInterna || 0.0
  );
  const [valorITBI, setValorITBI] = useState(
    dadosSIB?.valorImovelCustos?.valorITBI || 0.0
  );
  const [despesasCartorarias, setDespesasCartorarias] = useState(
    dadosSIB?.valorImovelCustos?.despesasCartorarias || 0.0
  );
  const [elaboracaoProjeto, setElaboracaoProjeto] = useState(
    dadosSIB?.valorImovelCustos?.elaboracaoProjeto || 0.0
  );
  const [valorATER, setValorATER] = useState(
    dadosSIB?.valorImovelCustos?.valorATER || 0.0
  );

  const [valorInvestimentos, setValorInvestimentos] = useState(0.0);
  const [valorFinanciamento, setValorFinanciamento] = useState(0.0);
  useEffect(() => {
    const investimentos =
      dadosSIB?.dadosInvestimentos?.dadosInvestimentos || [];
    const totalSum = investimentos.reduce((sum, item) => {
      const valorTotal = parseFloat(
        item.valor_total.replace(/\./g, "").replace(",", ".")
      );
      return sum + valorTotal;
    }, 0);
    setValorInvestimentos(totalSum);
    const custos = dadosSIB?.valorImovelCustos || {};
    const totalDespesas =
      custos["custoMedicaoInterna"] +
      custos["valorITBI"] +
      custos["despesasCartorarias"] +
      custos["elaboracaoProjeto"] +
      custos["valorATER"];
    setValorFinanciamento(valorImovelNegociado + totalDespesas + totalSum);
  }, []);

  const [parcelas, setParcelas] = useState([]);
  useEffect(() => {
    const p = data?.[0]?.aba_simuladorPNCF_parcelas;
    const sortedParcelas = [...p].sort((a, b) => a.ano - b.ano);
    setParcelas(sortedParcelas);
  }, []);

  const onEdit = () => {
    setFormsDisabled(false);
  };
  const onSave = async () => {};

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
        tabName={"Simulador PNCF"}
      />
      <div className="p-4 mt-8 flex flex-row gap-8 items-center justify-center">
        <DadosFinanciamentoTable
          custoMedicaoInterna={custoMedicaoInterna}
          despesasCartorarias={despesasCartorarias}
          elaboracaoProjeto={elaboracaoProjeto}
          valorATER={valorATER}
          valorFinanciamento={valorFinanciamento}
          valorITBI={valorITBI}
          valorImovelNegociado={valorImovelNegociado}
          valorInvestimentos={valorInvestimentos}
        />
        <CondicoesFinanciamentoTable
          anoInicioFinanciamento={ANO_INICIAL}
          bonusAdimplencia={bonusAdimplencia}
          linhaFinanciamento={linhaFinanciamento}
          taxaDeJurosAno={taxaDeJurosAno}
        />
      </div>
      <div className="mt-8 bg-gray-950  ">
        <ParcelasTable
          parcelas={parcelas}
          setParcelas={setParcelas}
          formsDisabled={formsDisabled}
        />
      </div>
    </div>
  );
}

function ParcelasTable({ parcelas, setParcelas, formsDisabled }) {
  const handleInputChange = (index, field, value) => {
    console.log(`index: ${index}, field: ${field}, value: ${value}`);
    const ano = ANO_INICIAL + index;
  };
  return (
    <Table className="border-collapse text-xs">
      <TableHeader className="bg-gray-800">
        <TableRow>
          <TableHead className="text-center text-white">ANO</TableHead>
          <TableHead className="text-center text-white">
            SALDO INICIAL
          </TableHead>
          <TableHead className="text-center text-white">JUROS</TableHead>
          <TableHead className="text-center text-white">AMORTIZAÇÃO</TableHead>
          <TableHead className="text-center text-white">BÔNUS</TableHead>
          <TableHead className="text-center text-white">PARCELA</TableHead>
          <TableHead className="text-center text-white">
            SALDO DEVEDOR
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {parcelas.map((item, index) => (
          <TableRow key={item.id}>
            <TableCell className="text-center bg-gray-800">
              {item.ano}
            </TableCell>
            <TableCell className="text-center">
              <Input
                type="text"
                value={item.saldo_inicial || ""}
                disabled={formsDisabled}
                onChange={(e) =>
                  handleInputChange(index, "saldo_inicial", e.target.value)
                }
              />
            </TableCell>
            <TableCell className="text-center">
              <Input
                type="text"
                value={item.juros || ""}
                disabled={formsDisabled}
                onChange={(e) =>
                  handleInputChange(index, "juros", e.target.value)
                }
              />
            </TableCell>
            <TableCell className="text-center">
              <Input
                type="text"
                value={item.amortizacao || ""}
                disabled={formsDisabled}
                onChange={(e) =>
                  handleInputChange(index, "amortizacao", e.target.value)
                }
              />
            </TableCell>
            <TableCell className="text-center">
              <Input
                type="text"
                value={item.bonus || ""}
                disabled={formsDisabled}
                onChange={(e) =>
                  handleInputChange(index, "bonus", e.target.value)
                }
              />
            </TableCell>
            <TableCell className="text-center">
              <Input
                type="text"
                value={item.parcela || ""}
                disabled={formsDisabled}
                onChange={(e) =>
                  handleInputChange(index, "parcela", e.target.value)
                }
              />
            </TableCell>
            <TableCell className="text-center">
              <Input
                type="text"
                value={item.saldo_devedor || ""}
                disabled={formsDisabled}
                onChange={(e) =>
                  handleInputChange(index, "saldo_devedor", e.target.value)
                }
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function CondicoesFinanciamentoTable({
  linhaFinanciamento,
  taxaDeJurosAno,
  bonusAdimplencia,
  anoInicioFinanciamento,
}) {
  return (
    <div className="overflow-hidden bg-gray-950/80 shadow sm:rounded-sm text-sm mx-4">
      <div className="bg-gray-800 p-4">
        <h3 className="text-lg font-bold leading-6 text-white">
          CONDIÇÕES DO FINANCIAMENTO
        </h3>
      </div>
      <div className="p-4 text-gray-100">
        <div className="grid grid-cols-2 gap-4">
          <div className="p-2">
            <p className="font-semibold text-gray-100">
              Linha de Financiamento
            </p>
          </div>
          <div className="p-2">
            <p className="font-semibold text-center">
              {linhaFinanciamento || ""}
            </p>
          </div>

          <div className="p-2">
            <p className="font-semibold text-gray-100">Taxa de Juros ao Ano</p>
          </div>
          <div className="p-2">
            <p className="font-semibold text-center">
              {`${taxaDeJurosAno * 100}%` || ""}
            </p>
          </div>

          <div className="p-2">
            <p className="font-semibold text-gray-100">Bônus de Adimplência</p>
          </div>
          <div className="p-2">
            <p className="font-semibold text-center">
              {`${bonusAdimplencia * 100}%` || ""}
            </p>
          </div>

          <div className="p-2">
            <p className="font-semibold text-gray-100">
              Ano de Início do Financiamento
            </p>
          </div>
          <div className="p-2">
            <p className="font-semibold text-center">
              {anoInicioFinanciamento || ""}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function DadosFinanciamentoTable({
  valorImovelNegociado,
  custoMedicaoInterna,
  valorITBI,
  despesasCartorarias,
  elaboracaoProjeto,
  valorATER,
  valorInvestimentos,
  valorFinanciamento,
}) {
  return (
    <div className="overflow-hidden bg-gray-950/80 shadow sm:rounded-sm text-sm mx-4 mt-4">
      <div className="bg-gray-800 p-4">
        <h3 className="text-lg font-bold leading-6 text-white">
          DADOS DO FINANCIAMENTO
        </h3>
      </div>
      <div className="p-4 text-gray-100">
        <div className="grid grid-cols-2 gap-4">
          <div className="border border-gray-800">
            <div className="p-2">
              <p className="font-semibold text-gray-100">
                Valor do Imóvel Negociado
              </p>
            </div>
            <div className="p-2">
              <p className="font-semibold text-center">
                {valorImovelNegociado || ""}
              </p>
            </div>

            <div className="p-2">
              <p className="font-semibold text-gray-100">
                Custo de Medição Interna
              </p>
            </div>
            <div className="p-2">
              <p className="font-semibold text-center">
                {custoMedicaoInterna || ""}
              </p>
            </div>

            <div className="p-2">
              <p className="font-semibold text-gray-100">Valor do ITBI</p>
            </div>
            <div className="p-2">
              <p className="font-semibold text-center">{valorITBI || ""}</p>
            </div>

            <div className="p-2">
              <p className="font-semibold text-gray-100">
                Despesas Cartorárias
              </p>
            </div>
            <div className="p-2">
              <p className="font-semibold text-center">
                {despesasCartorarias || ""}
              </p>
            </div>
          </div>

          <div className="border border-gray-800">
            <div className="p-2">
              <p className="font-semibold text-gray-100">
                Elaboração do Projeto
              </p>
            </div>
            <div className="p-2">
              <p className="font-semibold text-center">
                {elaboracaoProjeto || ""}
              </p>
            </div>

            <div className="p-2">
              <p className="font-semibold text-gray-100">Valor da ATER</p>
            </div>
            <div className="p-2">
              <p className="font-semibold text-center">{valorATER || ""}</p>
            </div>

            <div className="p-2">
              <p className="font-semibold text-gray-100">
                Valor Total dos Investimentos
              </p>
            </div>
            <div className="p-2">
              <p className="font-semibold text-center">
                {valorInvestimentos || "@todo"}
              </p>
            </div>

            <div className="p-2">
              <p className="font-semibold text-gray-100">
                Valor Total do Financiamento
              </p>
            </div>
            <div className="p-2">
              <p className="font-semibold text-center">
                {valorFinanciamento || "@todo"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
