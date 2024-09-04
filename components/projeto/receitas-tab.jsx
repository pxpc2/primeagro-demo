import { useForm } from "react-hook-form";
import Heading from "./Header";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Input } from "../ui/input";
import { ANO_INICIAL } from "@/utils/constants";

export default function ReceitasTab({ data, isAdmin }) {
  console.log(data);
  const form = useForm();
  const [formsDisabled, setFormsDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const onEdit = () => {
    setFormsDisabled(false);
  };
  const handleCancel = () => {
    setFormsDisabled(true);
  };
  const onSave = async () => {
    console.log("enviando receitas");
  };

  const anos = Array.from({ length: 5 }, (_, index) => ANO_INICIAL + index);

  const receitas = [];

  return (
    <div className="p-4 bg-gray-900/80">
      <Heading
        tabName={"Receitas"}
        onEdit={onEdit}
        onSave={onSave}
        isEditing={!formsDisabled}
        isLoading={loading}
        onCancel={handleCancel}
        isAdmin={isAdmin}
      />
      <div className="w-full mt-4 sm:px-4 sm:py-2 flex flex-col gap-8">
        <div className="h-screen">
          <Table className="min-w-full border border-gray-300">
            <TableHeader>
              <TableRow className="">
                <TableHead className="text-left py-2 border-r border-gray-300">
                  DESCRIÇÃO
                </TableHead>
                <TableHead className="text-center py-2 border-r border-gray-300">
                  UNID
                </TableHead>
                <TableHead className="text-center py-2 border-r border-gray-300">
                  VALOR UNIT
                </TableHead>
                {anos.map((ano) => (
                  <TableHead
                    key={ano}
                    className="text-center py-2 border-r border-gray-300"
                  >
                    {ano}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {receitas.map((receita) => (
                <TableRow key={receita.key}>
                  <TableCell className="text-left border-t border-gray-300 py-2 px-4">
                    {receita.label}
                  </TableCell>
                  <TableCell className="text-center border-t border-gray-300 py-2 px-4">
                    {receita.unidade}
                  </TableCell>
                  <TableCell className="text-center border-t border-gray-300 py-2 px-4">
                    <Input
                      type="text"
                      disabled={formsDisabled}
                      className="text-center w-full bg-transparent border-none"
                    />
                  </TableCell>
                  {anos.map((year) => (
                    <TableCell
                      key={year}
                      className="text-center border-t border-gray-300 py-2 px-4"
                    >
                      <Input
                        type="text"
                        disabled={formsDisabled}
                        className="text-center w-full bg-transparent border-none"
                      />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
