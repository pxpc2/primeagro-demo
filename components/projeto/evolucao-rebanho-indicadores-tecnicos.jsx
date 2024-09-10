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

export default function IndicadoresTecnicos({
  data,
  anoInicial,
  formsDisabled,
  onChange,
}) {
  const DESCRICOES = INDICADORES_TECNICOS_DESCRICOES;
  const anos = Array.from({ length: 11 }, (_, i) => anoInicial + i);

  const initializedData = DESCRICOES.map((descricao) => {
    const existingItem = data.find((item) => item.descricao === descricao);
    return (
      existingItem || {
        descricao,
        ...anos.reduce((acc, ano, index) => {
          acc[`ano${index + 1}`] = "";
          return acc;
        }, {}),
      }
    );
  });

  const handleInputChange = (descricao, ano, value) => {
    const updatedData = initializedData.map((item) => {
      if (item.descricao === descricao) {
        return { ...item, [`ano${ano}`]: value };
      }
      return item;
    });
    onChange([...updatedData]);
  };

  return (
    <div className="w-full border-gray-200 shadow sm:rounded-lg p-4">
      <h1 className="text-lg font-bold">Indicadores Técnicos</h1>
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
          {initializedData.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{item.descricao}</TableCell>
              {anos.map((ano, i) => (
                <TableCell key={i}>
                  <Input
                    type="text"
                    value={item[`ano${i + 1}`] || ""}
                    onChange={(e) =>
                      handleInputChange(item.descricao, i + 1, e.target.value)
                    }
                    className="w-full text-center text-white"
                    disabled={formsDisabled}
                  />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
