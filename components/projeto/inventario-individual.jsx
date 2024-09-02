import { useState, useEffect } from "react";
import { Input } from "../ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

export default function InventarioIndividualComponent({
  data,
  formsDisabled,
  setData,
  initialData,
}) {
  const [initialState, setInitialState] = useState([]);

  useEffect(() => {
    setInitialState(initialData);
  }, [initialData]);

  const rows = [
    { key: "reprodutores", label: "REPRODUTORES" },
    { key: "matrizes", label: "MATRIZES" },
    { key: "bezerros", label: "BEZERROS" },
    { key: "bezerras", label: "BEZERRAS" },
    { key: "garrotes", label: "GARROTES" },
    { key: "garrotas", label: "GARROTAS" },
    { key: "novilhos", label: "NOVILHOS" },
    { key: "novilhas", label: "NOVILHAS" },
  ];

  const handleInputChange = (key, value) => {
    const updatedData = [{ ...data[0], [key]: value }];
    console.log("updated data: ");
    console.log(updatedData);
    setData(updatedData);
  };

  const totalCB = rows.reduce(
    (sum, row) => sum + (parseInt(data?.[0]?.[row.key], 10) || 0),
    0
  );

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold text-center border p-1 border-gray-300">
        BOVINOS
      </h2>
      <Table className="min-w-full border border-gray-300">
        <TableHeader className="">
          <TableRow className="bg-gray-200">
            <TableHead className="text-center py-2 border-r border-gray-300">
              DESCRIÇÃO
            </TableHead>
            <TableHead className="text-center py-2">CB.</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.key}>
              <TableCell className="text-left border-t border-gray-300 py-2 px-4 border-r">
                {row.label}
              </TableCell>
              <TableCell className="text-center border-t border-gray-300 py-2 px-4">
                <Input
                  type="number"
                  value={data?.[0]?.[row.key] || ""}
                  disabled={formsDisabled}
                  onChange={(e) => handleInputChange(row.key, e.target.value)}
                  className="text-center w-full bg-transparent border-none"
                />
              </TableCell>
            </TableRow>
          ))}
          <TableRow className="bg-gray-100 font-semibold hover:text-white text-black">
            <TableCell className="text-left border-t border-gray-300   py-2 px-4">
              TOTAL
            </TableCell>
            <TableCell className="text-center border-t border-gray-300 py-2 px-4">
              {totalCB}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
