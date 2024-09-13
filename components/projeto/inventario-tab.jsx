"use client";

import { useCallback, useEffect, useState } from "react";
import Heading from "./Header";
import { useForm } from "react-hook-form";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import {
  CirclePlusIcon,
  Loader2,
  MoreHorizontal,
  Pencil,
  PlusIcon,
  Trash,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import {
  Select,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { SelectContent } from "@radix-ui/react-select";
import {
  deleteAtividadesAgricolas,
  deleteBenfeitoria,
  deleteInfraestrutura,
  deleteMaquinaEquipamento,
  deleteOutrosBens,
  getInventario,
  submitInventario,
} from "@/app/projeto/actions";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import ReusableTable from "../reusable-table";
import InventarioIndividualComponent from "./inventario-individual";

export default function InventarioTab({ isAdmin }) {
  const [editingItem, setEditingItem] = useState(null);
  const [deletingItem, setDeletingItem] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formsDisabled, setFormsDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [currentTable, setCurrentTable] = useState(null);

  const [loadingData, setLoadingData] = useState(true);
  const [data, setData] = useState([]);
  const [initialColetivoValues, setInitialColetivoValues] = useState({});
  const [initialIndividualValues, setInitialIndividualValues] = useState({});
  const [coletivosTableData, setColetivosTableData] = useState([]);
  const [individuaisTableData, setIndividuaisTableData] = useState([]);
  const [maquinasEquipamentosTableData, setMaquinasEquipamentosTableData] =
    useState([]);
  const [outrosBensTableData, setOutrosBensTableData] = useState([]);
  const [infraestruturaTableData, setInfraestruturaTableData] = useState([]);
  const [atividadesAgricolasTableData, setAtividadesAgricolasTableData] =
    useState([]);

  const [initialInventarioIndividualData, setInitialInventarioIndividualData] =
    useState([]);

  const [inventarioIndividualData, setInventarioIndividualData] = useState([]);

  const refreshData = async () => {
    const dados = await getInventario();
    setData(dados);
    console.log(dados);
    setInitialColetivoValues({
      benfeitorias_coletivas_numero_familias_irao_adquirir:
        dados?.aba_inventario?.[0]
          ?.benfeitorias_coletivas_numero_familias_irao_adquirir || "",
      benfeitorias_coletivas_valor_por_familia:
        dados?.aba_inventario?.[0]?.benfeitorias_coletivas_valor_por_familia ||
        "",
    });
    setInitialIndividualValues({
      benfeitorias_individuais_numero_familias_irao_adquirir:
        dados?.aba_inventario?.[0]
          ?.benfeitorias_individuais_numero_familias_irao_adquirir || "",
      benfeitorias_individuais_valor_por_familia:
        dados?.aba_inventario?.[0]
          ?.benfeitorias_individuais_valor_por_familia || "",
    });
    setColetivosTableData(dados.benfeitoriasImovel || []);
    setIndividuaisTableData(dados.benfeitoriasIndividuais || []);
    setMaquinasEquipamentosTableData(dados.maquinasEquipamentosTableData || []);
    setOutrosBensTableData(dados.outrosBensTableData || []);
    setInfraestruturaTableData(dados.infraestruturaTableData || []);
    setAtividadesAgricolasTableData(dados.atividadesAgricolasTableData || []);
    setInventarioIndividualData(dados.inventarioIndividualData || []);
    setInitialInventarioIndividualData(dados.inventarioIndividualData || []);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoadingData(true);
      await refreshData();
      setLoadingData(false);
    };
    fetchData();
  }, []);

  const maquinaEquipamentoColumns = [
    { key: "descricao", label: "Descrição" },
    { key: "unidade_medida", label: "Unidade de Medida" },
    { key: "quantidade", label: "Quantidade" },
  ];

  const coletivoForm = useForm({
    defaultValues: initialColetivoValues,
  });

  const individualForm = useForm({
    defaultValues: initialIndividualValues,
  });

  const onEdit = () => setFormsDisabled(false);
  const onSave = () => {
    setLoading(true);
    const coletivaData = coletivoForm.getValues();
    const individualData = individualForm.getValues();

    const combinedData = {
      ...coletivaData,
      ...individualData,
    };

    console.log("submiting data");
    console.log(inventarioIndividualData);

    submitInventario({
      data: combinedData,
      coletivosData: coletivosTableData,
      individuaisData: individuaisTableData,
      maquinasEquipamentosData: maquinasEquipamentosTableData,
      outrosBensData: outrosBensTableData,
      infraestruturaData: infraestruturaTableData,
      atividadesAgricolasData: atividadesAgricolasTableData,
      inventarioIndividualData: inventarioIndividualData,
    }).then(async () => {
      await refreshData();
      setFormsDisabled(true);
      setLoading(false);
    });
  };

  useEffect(() => {
    if (!loadingData) {
      coletivoForm.reset(initialColetivoValues);
      individualForm.reset(initialIndividualValues);
    }
  }, [
    loadingData,
    initialColetivoValues,
    initialIndividualValues,
    coletivoForm,
    individualForm,
  ]);

  const handleEditItem = (item, tableType) => {
    setEditingItem(item);
    setCurrentTable(tableType);
    setIsDialogOpen(true);
  };

  const handleCancel = () => {
    coletivoForm.reset(initialColetivoValues);
    individualForm.reset(initialIndividualValues);

    console.log(initialInventarioIndividualData);
    setInventarioIndividualData(initialInventarioIndividualData || []);

    setColetivosTableData(initialColetivoValues.coletivosTableData || []);
    setIndividuaisTableData(initialIndividualValues.individuaisTableData || []);
    setMaquinasEquipamentosTableData(
      initialIndividualValues.maquinasEquipamentosTableData || []
    );
    setOutrosBensTableData(initialIndividualValues.outrosBensTableData || []);
    setInfraestruturaTableData(
      initialIndividualValues.infraestruturaTableData || []
    );
    setAtividadesAgricolasTableData(
      initialIndividualValues.atividadesAgricolasTableData || []
    );

    setFormsDisabled(true);
  };

  const handleAddNewItem = (newItem, tableType) => {
    if (tableType === "coletivas") {
      setColetivosTableData((prevData) => [...prevData, newItem]);
    } else if (tableType === "individuais") {
      setIndividuaisTableData((prevData) => [...prevData, newItem]);
    }
  };

  const handleDeleteItem = async (item, tableType) => {
    if (tableType === "coletivas") {
      const updatedData = await deleteBenfeitoria(
        coletivosTableData,
        item,
        tableType
      );
      setColetivosTableData(updatedData);
    } else if (tableType === "individuais") {
      const updatedData = await deleteBenfeitoria(
        individuaisTableData,
        item,
        tableType
      );
      setIndividuaisTableData(updatedData);
    }
  };

  const getValorTotal = useCallback((tableData) => {
    return tableData.reduce((total, item) => {
      const valor = parseFloat(item.valor.replace(/\./g, "").replace(",", "."));
      return total + (isNaN(valor) ? 0 : valor);
    }, 0);
  }, []);

  const [valorTotalColetiva, setValorTotalColetiva] = useState(
    getValorTotal(coletivosTableData)
  );
  const [valorTotalIndividual, setValorTotalIndividual] = useState(
    getValorTotal(individuaisTableData)
  );

  const getValorPorFamilia = useCallback((total, numFamilies) => {
    if (numFamilies > 0) {
      return (total / numFamilies).toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    }
    return "0,00";
  }, []);

  useEffect(() => {
    setValorTotalColetiva(getValorTotal(coletivosTableData));
    setValorTotalIndividual(getValorTotal(individuaisTableData));
  }, [coletivosTableData, individuaisTableData, getValorTotal]);

  useEffect(() => {
    const qtdFamiliasColetiva = parseInt(
      coletivoForm.getValues(
        "benfeitorias_coletivas_numero_familias_irao_adquirir"
      ),
      10
    );
    if (!isNaN(qtdFamiliasColetiva) && qtdFamiliasColetiva > 0) {
      const valorPorFamiliaColetiva = getValorPorFamilia(
        valorTotalColetiva,
        qtdFamiliasColetiva
      );
      coletivoForm.setValue(
        "benfeitorias_coletivas_valor_por_familia",
        valorPorFamiliaColetiva
      );
    }

    const qtdFamiliasIndividual = parseInt(
      individualForm.getValues(
        "benfeitorias_individuais_numero_familias_irao_adquirir"
      ),
      10
    );
    if (!isNaN(qtdFamiliasIndividual) && qtdFamiliasIndividual > 0) {
      const valorPorFamiliaIndividual = getValorPorFamilia(
        valorTotalIndividual,
        qtdFamiliasIndividual
      );
      individualForm.setValue(
        "benfeitorias_individuais_valor_por_familia",
        valorPorFamiliaIndividual
      );
    }
  }, [
    valorTotalColetiva,
    valorTotalIndividual,
    coletivoForm,
    individualForm,
    getValorPorFamilia,
  ]);

  const handleAddNewMaquina = (item) => {
    setMaquinasEquipamentosTableData((prev) => [...prev, item]);
    // é enviado ao servidor depois, no onSave()
  };

  const handleEditMaquina = (updatedItem) => {
    setMaquinasEquipamentosTableData((prev) =>
      prev.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
  };

  const handleDeleteMaquina = async (item) => {
    const result = await deleteMaquinaEquipamento({ id: item.id }); // deletamos na hora, não aguarda onSave()
    if (result) {
      setMaquinasEquipamentosTableData((prev) =>
        prev.filter((i) => i.id !== item.id)
      );
    }
  };

  const handleAddNewOutrosBens = async (item) => {
    setOutrosBensTableData((prev) => [...prev, item]);
  };

  const handleEditOutrosBens = (updatedItem) => {
    setOutrosBensTableData((prev) =>
      prev.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
  };

  const handleDeleteOutrosBens = async (item) => {
    const result = await deleteOutrosBens({ id: item.id });
    if (result) {
      setOutrosBensTableData((prev) => prev.filter((i) => i.id !== item.id));
    }
  };

  const handleAddNewInfraestrutura = async (item) => {
    setInfraestruturaTableData((prev) => [...prev, item]);
  };

  const handleEditInfraestrutura = (updatedItem) => {
    setInfraestruturaTableData((prev) =>
      prev.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
  };

  const handleDeleteInfraestrutura = async (item) => {
    const result = await deleteInfraestrutura({ id: item.id });
    if (result) {
      setInfraestruturaTableData((prev) =>
        prev.filter((i) => i.id !== item.id)
      );
    }
  };

  const handleAddNewAtividadeAgricola = async (item) => {
    setAtividadesAgricolasTableData((prev) => [...prev, item]);
  };

  const handleEditAtividadeAgricola = (updatedItem) => {
    setAtividadesAgricolasTableData((prev) =>
      prev.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
  };

  const handleDeleteAtividadeAgricola = async (item) => {
    const result = await deleteAtividadesAgricolas({ id: item.id });
    if (result) {
      setAtividadesAgricolasTableData((prev) =>
        prev.filter((i) => i.id !== item.id)
      );
    }
  };

  if (loadingData) {
    return (
      <div className="flex justify-center items-center h-full flex-col gap-4 ">
        <p className="text-gray-100 font-medium">Carregando inventário...</p>
        <Loader2 className="animate-spin  w-5 h-5 text-gray-100" />
      </div>
    );
  }

  return (
    <div className="p-4 bg-gray-900/80">
      <Heading
        tabName={"Dados do Imóvel"}
        onEdit={onEdit}
        onSave={onSave}
        isEditing={!formsDisabled}
        isLoading={loading}
        onCancel={handleCancel}
        isAdmin={isAdmin}
      />
      <div className="w-full mt-4 sm:px-4 sm:py-2 flex flex-col gap-8">
        <div className=" bg-gray-800 flex text-center items-center w-full justify-center py-2">
          <h1 className="text-white font-semibold">Dados do imóvel</h1>
        </div>
        <div className="p-4  flex flex-col gap-8">
          <p className="text-white font-semibold">
            Benfeitorias / equipamentos existentes coletivos:
          </p>
          <EquipamentosExistentesTable
            form={coletivoForm}
            formsDisabled={formsDisabled}
            data={coletivosTableData}
            onAddNewItem={(newItem) => handleAddNewItem(newItem, "coletivas")}
            onEditItem={(item) => handleEditItem(item, "coletivas")}
            setEditingItem={setEditingItem}
            editingItem={editingItem}
            setIsDialogOpen={setIsDialogOpen}
            isDialogOpen={isDialogOpen}
            setTableData={setColetivosTableData}
            deletingItem={deletingItem}
            setDeletingItem={setDeletingItem}
            onDeleteItem={(item) => handleDeleteItem(item, "coletivas")}
            tableType={"coletivas"}
          />
        </div>
        <Form {...coletivoForm}>
          <form
            onSubmit={coletivoForm.handleSubmit(onSave)}
            className="space-y-8"
          >
            <div className="flex w-full flex-row justify-end gap-10">
              <FormField
                control={coletivoForm.control}
                name="benfeitorias_coletivas_numero_familias_irao_adquirir"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Nº de famílias que irão adquirir as benfeitorias
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value}
                        disabled={formsDisabled}
                        onChange={(e) => {
                          const value = e.target.value;
                          field.onChange(value);
                          const qtdFamilias = parseInt(value, 10);
                          if (!isNaN(qtdFamilias) && qtdFamilias > 0) {
                            const valorPorFamilia = getValorPorFamilia(
                              valorTotalColetiva,
                              qtdFamilias
                            );
                            coletivoForm.setValue(
                              "benfeitorias_coletivas_valor_por_familia",
                              valorPorFamilia
                            );
                          } else {
                            coletivoForm.setValue(
                              "benfeitorias_coletivas_valor_por_familia",
                              ""
                            );
                          }
                        }}
                      />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={coletivoForm.control}
                name="benfeitorias_coletivas_valor_por_familia"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Valor das benfeitorias por família</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value} disabled />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
        <div className=" bg-gray-800 flex text-center items-center w-full justify-center py-2">
          <h1 className="text-white font-semibold">
            Benfeitorias pagas pelo beneficiário
          </h1>
        </div>
        <p className="text-white font-semibold">
          Benfeitorias / equipamentos existentes individuais:
        </p>
        <EquipamentosExistentesTable
          form={individualForm}
          formsDisabled={formsDisabled}
          data={individuaisTableData}
          onAddNewItem={(newItem) => handleAddNewItem(newItem, "individuais")}
          onEditItem={(item) => handleEditItem(item, "individuais")}
          setEditingItem={setEditingItem}
          editingItem={editingItem}
          setIsDialogOpen={setIsDialogOpen}
          isDialogOpen={isDialogOpen}
          setTableData={setIndividuaisTableData}
          deletingItem={deletingItem}
          setDeletingItem={setDeletingItem}
          onDeleteItem={(item) => handleDeleteItem(item, "individuais")}
          tableType={"individuais"}
        />
        <Form {...individualForm}>
          <form
            onSubmit={individualForm.handleSubmit(onSave)}
            className="space-y-8"
          >
            <div className="flex w-full flex-row justify-end gap-10">
              <FormField
                control={individualForm.control}
                name="benfeitorias_individuais_numero_familias_irao_adquirir"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Nº de famílias que irão adquirir as benfeitorias
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value}
                        disabled={formsDisabled}
                        onChange={(e) => {
                          const value = e.target.value;
                          field.onChange(value);
                          const qtdFamilias = parseInt(value, 10);
                          if (!isNaN(qtdFamilias) && qtdFamilias > 0) {
                            const valorPorFamilia = getValorPorFamilia(
                              valorTotalIndividual,
                              qtdFamilias
                            );
                            individualForm.setValue(
                              "benfeitorias_individuais_valor_por_familia",
                              valorPorFamilia
                            );
                          } else {
                            individualForm.setValue(
                              "benfeitorias_individuais_valor_por_familia",
                              ""
                            );
                          }
                        }}
                      />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={individualForm.control}
                name="benfeitorias_individuais_valor_por_familia"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Valor das benfeitorias por família</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value} disabled />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>

        <div className=" bg-gray-800 flex text-center items-center w-full justify-center py-2">
          <h1 className="text-white font-semibold">Inventário Individual</h1>
        </div>
        <div className="flex w-full">
          <InventarioIndividualComponent
            data={inventarioIndividualData}
            initialData={initialInventarioIndividualData}
            formsDisabled={formsDisabled}
            setData={setInventarioIndividualData}
          />
        </div>

        <div>
          <div className=" bg-gray-800 flex text-center items-center w-full justify-center py-2">
            <h1 className="text-white font-semibold">
              Máquinas e Equipamentos
            </h1>
          </div>
          <ReusableTable
            data={maquinasEquipamentosTableData}
            columns={maquinaEquipamentoColumns}
            formsDisabled={formsDisabled}
            onAddNewItem={handleAddNewMaquina}
            onEditItem={handleEditMaquina}
            onDeleteItem={handleDeleteMaquina}
            caption={"Lista de máquinas e equipamentos existentes"}
            hasSEQ={false}
          />
        </div>
        <div>
          <div className=" bg-gray-800 flex text-center items-center w-full justify-center py-2">
            <h1 className="text-white font-semibold">Outros bens</h1>
          </div>
          <ReusableTable
            data={outrosBensTableData}
            columns={maquinaEquipamentoColumns} // mesmas colunas
            formsDisabled={formsDisabled}
            onAddNewItem={handleAddNewOutrosBens}
            onEditItem={handleEditOutrosBens}
            onDeleteItem={handleDeleteOutrosBens}
            caption={"Lista de demais bens"}
            hasSEQ={false}
          />
        </div>
        <div>
          <div className=" bg-gray-800 flex text-center items-center w-full justify-center py-2">
            <h1 className="text-white font-semibold">Infraestrutura</h1>
          </div>
          <ReusableTable
            data={infraestruturaTableData}
            columns={maquinaEquipamentoColumns}
            formsDisabled={formsDisabled}
            onAddNewItem={handleAddNewInfraestrutura}
            onEditItem={handleEditInfraestrutura}
            onDeleteItem={handleDeleteInfraestrutura}
            caption={"Lista de infraestruturas"}
            hasSEQ={false}
          />
        </div>
        <div>
          <div className=" bg-gray-800 flex text-center items-center w-full justify-center py-2">
            <h1 className="text-white font-semibold">
              Atividades agrícolas já existentes no imóvel
            </h1>
          </div>
          <ReusableTable
            data={atividadesAgricolasTableData}
            columns={maquinaEquipamentoColumns}
            formsDisabled={formsDisabled}
            onAddNewItem={handleAddNewAtividadeAgricola}
            onEditItem={handleEditAtividadeAgricola}
            onDeleteItem={handleDeleteAtividadeAgricola}
            caption={"Lista de atividades agrícolas"}
            hasSEQ={false}
          />
        </div>
      </div>
    </div>
  );
}

function EquipamentosExistentesTable({
  formsDisabled,
  data,
  onAddNewItem,
  editingItem,
  setEditingItem,
  setTableData,
  onEditItem,
  onDeleteItem,
  setIsDialogOpen,
  tableType,
}) {
  const form = useForm();
  const handleDialogSubmit = form.handleSubmit((newData) => {
    const newItem = {
      ...editingItem,
      SEQ: editingItem ? editingItem.SEQ : data.length + 1,
      descricao: newData.descricao,
      declarado_pelo_proprietario:
        newData.declarado_pelo_proprietario === "sim" ? true : false,
      unidade_medida: newData.unidade,
      quantidade: newData.qtd,
      valor: newData.valor,
      estado_conservacao: newData.estado_conservacao,
      tableType,
    };
    if (editingItem) {
      const updatedData = data.map((item) =>
        item.SEQ === editingItem.SEQ ? newItem : item
      );
      setTableData(updatedData);
    } else {
      onAddNewItem(newItem);
    }
    setEditingItem(null);
    form.reset();
    setIsDialogOpen(false);
  });
  const formatBRL = (value) => {
    if (!value) return value;
    value = value.replace(/\D/g, "");
    value = (Number(value) / 100).toFixed(2).replace(".", ",");
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handleValorChange = (e) => {
    const inputValue = e.target.value;
    const formattedValue = formatBRL(inputValue);
    form.setValue("valor", formattedValue);
  };
  const handleQuantidadeChange = (e) => {
    const inputValue = e.target.value.replace(/\D/g, "");
    form.setValue("qtd", inputValue);
  };
  return (
    <Table className="border-collapse">
      <TableCaption>
        {tableType === "coletivas" ? (
          <p>Lista de benfeitorias/equipamentos coletivas</p>
        ) : (
          <p>Lista de benfeitorias/equipamentos individuais</p>
        )}
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="text-center">SEQ</TableHead>
          <TableHead className="text-center">Descrição</TableHead>
          <TableHead className="text-center">
            Declarado pelo proprietário?
          </TableHead>
          <TableHead className="text-center">Unidade</TableHead>
          <TableHead className="text-center">Quantidade</TableHead>
          <TableHead className="text-center">Valor total (R$)</TableHead>
          <TableHead className="text-center">Estado de conservação</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.length > 0 &&
          data.map((item) => (
            <TableRow key={item.SEQ}>
              <TableCell className="font-medium text-center">
                {item.SEQ}
              </TableCell>
              <TableCell className="text-center max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap">
                {item.descricao}
              </TableCell>
              <TableCell className="text-center">
                {item.declarado_pelo_proprietario ? "Sim" : "Não"}
              </TableCell>
              <TableCell className="text-center">
                {item.unidade_medida}
              </TableCell>
              <TableCell className="text-center">{item.quantidade}</TableCell>
              <TableCell className="text-center">{item.valor}</TableCell>
              <TableCell className="text-center">
                {item.estado_conservacao}
              </TableCell>
              {!formsDisabled ? (
                <TableCell>
                  <Dialog>
                    <DropdownMenu modal={false}>
                      <DropdownMenuTrigger>
                        <MoreHorizontal className="hover:cursor-pointer hover:bg-gray-200 hover:shadow-md rounded-md p-0.5" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel>Ações</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DialogTrigger asChild>
                          <DropdownMenuItem
                            className="hover:cursor-pointer"
                            onClick={() => onEditItem(item, tableType)}
                          >
                            <Pencil className="mr-2 h-4 w-4" />
                            Editar
                          </DropdownMenuItem>
                        </DialogTrigger>
                        <DropdownMenuItem
                          className="hover:cursor-pointer"
                          onClick={() => onDeleteItem(item, tableType)}
                        >
                          <Trash className="mr-2 h-4 w-4 text-red-500" />
                          Deletar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <AddBenfeitoriaColetivaDialog
                      form={form}
                      handleDialogSubmit={handleDialogSubmit}
                      handleQuantidadeChange={handleQuantidadeChange}
                      handleValorChange={handleValorChange}
                      editingItem={editingItem}
                    />
                  </Dialog>
                </TableCell>
              ) : (
                <></>
              )}
            </TableRow>
          ))}
      </TableBody>
      <TableFooter className="justify-center border-t flex ">
        <div className="mt-4">
          {formsDisabled ? (
            <></>
          ) : (
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm" variant="" className="gap-1">
                  Inserir novo
                  <PlusIcon className="h-3.5 w-3.5 mt-0.5" />
                </Button>
              </DialogTrigger>
              <AddBenfeitoriaColetivaDialog
                form={form}
                handleDialogSubmit={handleDialogSubmit}
                handleQuantidadeChange={handleQuantidadeChange}
                handleValorChange={handleValorChange}
              />
            </Dialog>
          )}
        </div>
      </TableFooter>
    </Table>
  );
}

function AddBenfeitoriaColetivaDialog({
  form,
  handleDialogSubmit,
  handleQuantidadeChange,
  handleValorChange,
  editingItem,
}) {
  useEffect(() => {
    if (editingItem) {
      form.setValue("descricao", editingItem.descricao);
      form.setValue(
        "declarado_pelo_proprietario",
        editingItem.declarado_pelo_proprietario ? "sim" : "nao"
      );
      form.setValue("unidade", editingItem.unidade_medida);
      form.setValue("qtd", editingItem.quantidade);
      form.setValue("valor", editingItem.valor);
      form.setValue("estado_conservacao", editingItem.estado_conservacao);
    } else {
      form.reset();
    }
  }, [editingItem, form]);
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle className="font-bold">
          {editingItem
            ? "Editar benfeitoria/equipamento"
            : "Nova benfeitoria/equipamento"}
        </DialogTitle>
        <DialogDescription className="pt-2">
          Insira os dados relativos ao equipamento existente
          coletivo/benfeitoria do imóvel.
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleDialogSubmit} className="flex flex-col gap-4 py-4">
        <div className="items-center gap-4">
          <Label htmlFor="descricao">Descrição</Label>
          <Textarea
            id="descricao"
            placeholder="Escreva a descrição do equipamento"
            {...form.register("descricao")}
          />
        </div>
        <div className="flex flex-col gap-4">
          <Label htmlFor="declarado_pelo_proprietario">
            Declarado pelo proprietário?
          </Label>
          <RadioGroup
            className="flex flex-row"
            value={form.watch("declarado_pelo_proprietario")}
            onValueChange={(value) =>
              form.setValue("declarado_pelo_proprietario", value)
            }
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="sim"
                id="sim"
                {...form.register("declarado_pelo_proprietario")}
              />
              <Label htmlFor="sim">Sim</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="nao"
                id="nao"
                {...form.register("declarado_pelo_proprietario")}
              />
              <Label htmlFor="nao">Não</Label>
            </div>
          </RadioGroup>
        </div>
        <div className="items-center gap-4">
          <Label htmlFor="unidade">Unidade</Label>
          <Input
            id="unidade"
            placeholder="ex: m2"
            {...form.register("unidade")}
          />
        </div>
        <div className="items-center gap-4">
          <Label htmlFor="qtd">Quantidade</Label>
          <Input
            id="qtd"
            type="number"
            {...form.register("qtd")}
            onChange={handleQuantidadeChange}
            value={form.watch("qtd")}
            placeholder="1"
          />
        </div>
        <div className="items-center gap-4">
          <Label htmlFor="valor">Valo total (R$)</Label>
          <Input
            id="valor"
            {...form.register("valor")}
            onChange={handleValorChange}
            value={form.watch("valor")}
            placeholder="0,00"
          />
        </div>
        <div className="items-center gap-4">
          <Label htmlFor="estado_conservacao">Estado de conservação</Label>
          <Select
            value={form.watch("estado_conservacao")}
            onValueChange={(value) =>
              form.setValue("estado_conservacao", value)
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem
                  value="bom"
                  {...form.register("estado_conservacao")}
                >
                  Bom
                </SelectItem>
                <SelectItem
                  value="ruim"
                  {...form.register("estado_conservacao")}
                >
                  Ruim
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <DialogFooter>
          <Button type="submit">
            {editingItem ? "Salvar mudanças" : "Adicionar"}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}

function onSubmit(values) {
  console.log("enviando formulário...");
}
