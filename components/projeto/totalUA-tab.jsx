import { useState } from "react";
import Heading from "./Header";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Input } from "../ui/input";

export default function TotalTab({ data, isAdmin }) {
  const [loading, setLoading] = useState(false);
  const [formsDisabled, setFormsDisabled] = useState(true);

  const onEdit = () => {
    setFormsDisabled(false);
  };
  const onSave = async () => {};

  const handleCancel = () => {
    setFormsDisabled(true);
  };

  return (
    <div className="p-4 bg-gray-900/80">
      <Heading
        tabName={"Total (UA)"}
        onEdit={onEdit}
        onSave={onSave}
        isEditing={!formsDisabled}
        isLoading={loading}
        onCancel={handleCancel}
        isAdmin={isAdmin}
      />
      <div className="flex flex-col gap-8 mt-4">
        <div className="bg-blue-700 p-4">
          <h3 className="text-md font-bold leading-6 text-white">
            CALCULO DO SUPORTE FORRAGEIRO
          </h3>
        </div>
        <AnimalTable
          title="1- BOVINOS"
          ifValue="0,80"
          categories={[
            "REPRODUTOR",
            "MATRIZES",
            "BEZERROS(AS)",
            "GARROTES(AS)",
            "NOVILHO(AS)",
          ]}
          data={data?.bovinos}
          formsDisabled={formsDisabled}
        />
        <AnimalTable
          title="2- CAPRINOS"
          ifValue="1,56"
          categories={[
            "REPRODUTORES",
            "MATRIZES",
            "MACHOS JOVENS",
            "FÊMEAS JOVENS",
          ]}
          data={data?.caprinos}
          formsDisabled={formsDisabled}
        />
        <AnimalTable
          title="3- OVINOS"
          ifValue="1,56"
          categories={[
            "REPRODUTORES",
            "MATRIZES",
            "MACHOS JOVENS",
            "FÊMEAS JOVENS",
          ]}
          data={data?.ovinos}
          formsDisabled={formsDisabled}
        />
      </div>
    </div>
  );
}

function AnimalTable({ title, ifValue, categories, data, formsDisabled }) {
  const handleInputChange = (categoria, field, value) => {
    if (onChange) {
      onChange(categoria, field, value);
    }
  };

  const findDataForCategoria = (categoria) => {
    return data ? data[categoria.toLowerCase()] : {};
  };

  return (
    <Table className="mt-4 w-full">
      <TableHeader>
        <TableRow>
          <TableHead className="w-1/4 text-white">{title}</TableHead>
          <TableHead className="text-right" colSpan={4}>
            i.f.+prolif: {ifValue}
          </TableHead>
        </TableRow>
        <TableRow>
          <TableHead className="w-1/4 text-gray-200">CATEGORIAS</TableHead>
          <TableHead>Nº. MATRIZES NA ESTABILIZAÇÃO</TableHead>
          <TableHead>No. CAB.</TableHead>
          <TableHead>
            <Input
              type="text"
              value={data?.ua_cab_field || ""}
              onChange={(e) =>
                handleInputChange(
                  "ua_cab_field",
                  "ua_cab_field",
                  e.target.value
                )
              }
              disabled={formsDisabled}
              className="w-full text-center border border-gray-300"
            />
          </TableHead>
          <TableHead>TOTAL UA</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {categories.map((categoria, index) => {
          const dataItem = findDataForCategoria(categoria);
          return (
            <TableRow key={index}>
              <TableCell className=" text-gray-200">{categoria}</TableCell>
              <TableCell>
                <Input
                  type="text"
                  value={dataItem.matrizes || ""}
                  onChange={(e) =>
                    handleInputChange(categoria, "matrizes", e.target.value)
                  }
                  disabled={formsDisabled}
                  className="w-full text-center"
                />
              </TableCell>
              <TableCell>
                <Input
                  type="text"
                  value={dataItem.cab || ""}
                  onChange={(e) =>
                    handleInputChange(categoria, "cab", e.target.value)
                  }
                  disabled={formsDisabled}
                  className="w-full text-center"
                />
              </TableCell>
              <TableCell>
                <Input
                  type="text"
                  value={dataItem.ua_cab || ""}
                  onChange={(e) =>
                    handleInputChange(categoria, "ua_cab", e.target.value)
                  }
                  disabled={formsDisabled}
                  className="w-full text-center"
                />
              </TableCell>
              <TableCell>
                <Input
                  type="text"
                  value={dataItem.total_ua || ""}
                  onChange={(e) =>
                    handleInputChange(categoria, "total_ua", e.target.value)
                  }
                  disabled={formsDisabled}
                  className="w-full text-center"
                />
              </TableCell>
            </TableRow>
          );
        })}
        <TableRow>
          <TableCell className="font-bold" colSpan={2}>
            SUBTOTAL {title.toUpperCase()}
          </TableCell>
          <TableCell>
            <Input
              type="text"
              value={data?.subtotalNoCab || ""}
              disabled={true}
              className="bg-gray-200"
            />
          </TableCell>
          <TableCell></TableCell>
          <TableCell>
            <Input
              type="text"
              value={data?.subtotalTotalUA || ""}
              disabled={true}
              className="bg-gray-200"
            />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
