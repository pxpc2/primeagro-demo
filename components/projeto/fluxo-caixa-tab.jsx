import { useState } from "react";
import Heading from "./Header";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Input } from "../ui/input";
import { submitFluxoCaixa } from "@/app/projeto/actions";

export default function FluxoCaixaTab({
  fluxoCaixaData,
  isAdmin,
  preAnaliseData,
  dadosImovelData,
  identificacaoBeneficiarioData,
}) {
  const [loading, setLoading] = useState(false);
  const [formsDisabled, setFormsDisabled] = useState(true);

  const [valorSalarioMinimoMensal, setValorSalarioMinimoMensal] = useState(
    fluxoCaixaData?.[0]?.valor_salario_minimo || 0.0
  );
  const [municipioReferencia, setMunicipioReferencia] = useState(
    preAnaliseData?.[0]?.campo_3 || ""
  );
  const [nomeImovel, setNomeImovel] = useState(
    dadosImovelData?.[0]?.campo1 || ""
  );
  const [nomeCandidato, setNomeCandidato] = useState(
    identificacaoBeneficiarioData?.campo1 || ""
  );
  const [linhaFinanciamento, setLinhaFinanciamento] = useState(
    preAnaliseData?.[0]?.campo_8 || ""
  );

  const onEdit = () => {
    setFormsDisabled(false);
  };
  const onSave = async () => {
    try {
      setLoading(true);
      await submitFluxoCaixa({
        salario_minimo: valorSalarioMinimoMensal,
        tableData: [],
      });
      setFormsDisabled(true);
    } catch (e) {
      console.error(e);
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
        isEditing={!formsDisabled}
        isLoading={loading}
        onSave={onSave}
        onCancel={handleCancel}
        onEdit={onEdit}
        tabName={"Fluxos de Caixa"}
      />
      <div className="grid grid-cols-2 items-center justify-center gap-8">
        <DadosIniciaisTable
          municipioReferencia={municipioReferencia}
          nomeCandidato={nomeCandidato}
          nomeImovel={nomeImovel}
        />
        <div className="overflow-hidden mt-4 border-gray-800 border shadow sm:rounded-lg text-sm">
          <div className="bg-gray-800 p-4 flex flex-row justify-start gap-12">
            <h3 className="text-md font-bold leading-6 text-gray-200">
              Valor salário mínimo/mês:
            </h3>
            <Input
              type="number"
              value={valorSalarioMinimoMensal}
              onChange={(e) => setValorSalarioMinimoMensal(e.target.value)}
              disabled={formsDisabled}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function DadosIniciaisTable({
  municipioReferencia,
  nomeImovel,
  nomeCandidato,
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
          <TableHeader></TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-bold">Município</TableCell>
              <TableCell>{municipioReferencia}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-bold">Nome do Imóvel</TableCell>
              <TableCell>{nomeImovel}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-bold">Nome do Candidato</TableCell>
              <TableCell>{nomeCandidato}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
