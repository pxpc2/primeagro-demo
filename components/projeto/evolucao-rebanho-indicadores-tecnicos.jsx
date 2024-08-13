import { INDICADORES_TECNICOS_DESCRICOES } from "@/utils/constants";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "../ui/input";

export default function IndicadoresTecnicos({ data, anoInicial }) {
  const DESCRICOES = INDICADORES_TECNICOS_DESCRICOES;
  const anos = Array.from({ length: 11 }, (_, i) => anoInicial + i);

  const handleInputChange = (descricao, ano, value) => {
    if (onChange) {
      onChange(descricao, ano, value);
    }
  };
  const indicadoresTecnicos = Array.isArray(
    data.aba_evolucao_rebanho_indicadores_tecnicos
  )
    ? data.aba_evolucao_rebanho_indicadores_tecnicos
    : [];

  const findDataForDescricao = (descricao) => {
    return indicadoresTecnicos.find((item) => item.descricao === descricao);
  };

  return (
    <div className="mt-8">
      <h1 className="text-xl font-bold">Indicadores Técnicos</h1>
      <Table className="mt-4 w-full">
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/4">Descrição</TableHead>
            {anos.map((ano) => (
              <TableHead key={ano}>{ano}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {DESCRICOES.map((descricao, index) => {
            const dataItem = findDataForDescricao(descricao);
            return (
              <TableRow key={index}>
                <TableCell className="font-medium">{descricao}</TableCell>
                {anos.map((ano, i) => (
                  <TableCell key={i}>
                    <Input
                      type="text"
                      value={
                        dataItem ? `${dataItem[`ano${i + 1}`] || ""}%` : ""
                      }
                      onChange={(e) =>
                        handleInputChange(
                          descricao,
                          `ano${i + 1}`,
                          e.target.value.replace("%", "")
                        )
                      }
                      className="w-full text-center"
                    />
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
