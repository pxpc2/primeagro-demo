"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

/**
 *
 * @todo deve buscar todos os dados obrigatórios que já tenha no banco
 *
 * Buscar todos os dados do projeto do usuário em questão antes de abrir /projeto.
 * RLS configurado para retornar somente os seus dados, exceto se for usuário gerente/técnico.
 */
export async function getProjetoFormsData() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const formData = {};

  formData.aba_preanalise = await getPreAnalise();
  formData.aba_identificacao_beneficiario =
    await getIdentificacaoBeneficiario();
  formData.aba_inventario = await getInventario();

  formData.aba_dadosImovel = await getDadosImovel({
    dadosPreAnalise: formData.aba_preanalise[0],
  });

  formData.aba_investimentos = await getDadosInvestimentos();

  return formData;
}

export async function getDadosInvestimentos() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  let { data: dadosInvestimentos, err } = await supabase
    .from("aba_investimentosl")
    .select("*");
  if (err) {
    console.log(err);
    return undefined;
  }
  if (!dadosInvestimentos || dadosInvestimentos[0] === undefined) return {};
  return dadosInvestimentos[0];
}

export async function submitInvestimentos({ data }) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const authID = user.id;

  const { error } = await supabase
    .from("aba_investimentos")
    .upsert([{ ...data, authuser_id: authID }], {
      onConflict: ["authuser_id"],
    });

  if (error) {
    return redirect("/error?message=" + error.message);
  }
}

export async function deleteInvestimento({ id }) {
  return await deleteFromDatabase({ id: id, tableName: "aba_investimentos" });
}

async function getDadosImovel({ dadosPreAnalise }) {
  /*
  preciso pegar os dados de pre analise primeiro, preciso dos campos:

  LEGENDA campo_preanalise vira campo_dadosImovel

  campo4 vira campo1
  campo5 vira campo2
  campo7 vira campo3
  campo3 vira campo4 E campo 5 (campo4 = antes da / na string, campo5 = apos a /)
  (@TODO : tem mais campos e macros)
  */
  //console.log(dadosPreAnalise);
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  let { data: dadosImovel, err } = await supabase
    .from("aba_dados_imovel")
    .select("*");
  if (err) {
    console.log(err);
    return undefined;
  }
  // se usuário não tiver dados peenchidos ainda, vai estar undefined o objeto todo
  if (dadosImovel[0] === undefined) return {};

  if (!dadosImovel[0].campo1) {
    dadosImovel[0].campo1 = dadosPreAnalise.campo_4;
  }
  if (!dadosImovel[0].campo2) {
    dadosImovel[0].campo2 = dadosPreAnalise.campo_5;
  }
  if (!dadosImovel[0].campo3) {
    dadosImovel[0].campo3 = dadosPreAnalise.campo_7;
  }
  const [strPre, strPos] = dadosPreAnalise.campo_3.split("-"); // ex: campos_gerais-mg
  if (!dadosImovel[0].campo4) {
    dadosImovel[0].campo4 = strPre;
  }
  if (!dadosImovel[0].campo5) {
    dadosImovel[0].campo5 = strPos.toUpperCase();
  }

  return dadosImovel;
}

async function getIdentificacaoBeneficiario() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  let { data: aba_identificacao_beneficiario, err } = await supabase
    .from("aba_identificacao_beneficiario")
    .select("*");
  if (err) {
    console.log(err);
    return undefined;
  }
  if (aba_identificacao_beneficiario.length === 0) {
    let { data: cl, err } = await supabase
      .from("clientes")
      .select()
      .eq("authuser_id", user.id);
    const dadosCliente = cl[0];
    const dadosClienteParsed = {
      campo1: `${dadosCliente.primeiro_nome} ${dadosCliente.sobrenome}`,
      campo2: dadosCliente.cpf,
      campo3: dadosCliente.rg,
      campo4: dadosCliente.orgao_expedidor,
      campo6: dadosCliente.genero,
      campo7: dadosCliente.etnia,
      campo8: dadosCliente.estado_civil,
      campo9: dadosCliente.naturalidade,
      campo10: dadosCliente.endereco,
      campo11: dadosCliente.cep,
      campo13: dadosCliente.bairro,
      campo14: dadosCliente.uf,
      campo16: dadosCliente.telefone,
      campo17: dadosCliente.email,
    };
    return dadosClienteParsed;
  } else {
    return aba_identificacao_beneficiario;
  }
}

async function getPreAnalise() {
  const supabase = createClient();
  let { data: aba_preanalise, err } = await supabase
    .from("aba_preanalise")
    .select("*");
  return aba_preanalise;
}

async function getInventarioBenfeitoriasImovel() {
  const supabase = createClient();
  let { data: aba_inventario_benfeitoriasImovel, err } = await supabase
    .from("aba_inventario_benfeitoriasImovel")
    .select("*");
  if (err) {
    console.log(err);
    return undefined;
  }
  return aba_inventario_benfeitoriasImovel;
}

async function getInventarioBenfeitoriasIndividuais() {
  const supabase = createClient();
  let { data: aba_inventario_benfeitoriasIndividuais, err } = await supabase
    .from("aba_inventario_benfeitoriasIndividuais")
    .select("*");
  if (err) {
    console.log(err);
    return undefined;
  }
  return aba_inventario_benfeitoriasIndividuais;
}

export async function submitPreAnaliseForm({ formData }) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const authUserID = user.id;
  const mappedData = {};

  Object.entries(formData).forEach(([key, value]) => {
    const match = key.match(/^(\d+)-/);
    if (match && value !== undefined) {
      const newKey = `campo_${match[1]}`;
      mappedData[newKey] = value;
    } else if (value !== undefined) {
      mappedData[key] = value;
    }
  });
  const { error } = await supabase
    .from("aba_preanalise")
    .upsert([{ ...mappedData, authuser_id: authUserID }], {
      onConflict: ["authuser_id"],
    });
  if (error) {
    return redirect("/error?message=" + error.message);
  }
}

export async function submitIdentificacaoBeneficiarioForm({ formData }) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const authUserID = user.id;

  const { error } = await supabase
    .from("aba_identificacao_beneficiario")
    .upsert([{ ...formData, authuser_id: authUserID }], {
      onConflict: ["authuser_id"],
    });
  if (error) {
    return redirect("/error?message=" + error.message);
  }
}

/**
 * @TODO
 */
export async function submitDadosImovelForm({ formData }) {
  console.log(formData);
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const authUserID = user.id;
  const { error } = await supabase
    .from("aba_dados_imovel")
    .upsert([{ ...formData, authuser_id: authUserID }], {
      onConflict: ["authuser_id"],
    });
  if (error) {
    return redirect("/error?message=" + error.message);
  }
}

async function getInventario() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  let { data: aba_inventario, error } = await supabase
    .from("aba_inventario")
    .select("*");

  if (error) {
    console.log(error);
    return undefined;
  }

  const benfeitoriasImovel = await getInventarioBenfeitoriasImovel();
  const benfeitoriasIndividuais = await getInventarioBenfeitoriasIndividuais();
  const inventariosIndividuais = await getInventariosIndividuais();
  const inventariosIndividuaisItens = await getInventarioItems();
  const maquinasEquipamentosTableData = await getMaquinasEquipamentosData();
  const outrosBensTableData = await getOutrosBensData();
  const infraestruturaTableData = await getInfraestruturaData();
  const atividadesAgricolasTableData = await getAtividadesAgricolas();

  return {
    aba_inventario,
    benfeitoriasImovel,
    benfeitoriasIndividuais,
    inventariosIndividuais,
    inventariosIndividuaisItens,
    maquinasEquipamentosTableData,
    outrosBensTableData,
    infraestruturaTableData,
    atividadesAgricolasTableData,
  };
}

export async function getInfraestruturaData() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  let { data: dados, error } = await supabase
    .from("aba_inventario_infraestrutura")
    .select("*");

  if (error) {
    console.log(error);
    return undefined;
  }
  return dados;
}

export async function getAtividadesAgricolas() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  let { data: dados, error } = await supabase
    .from("aba_inventario_atividadesAgricolas")
    .select("*");

  if (error) {
    console.log(error);
    return undefined;
  }
  return dados;
}

export async function deleteInfraestrutura({ id, tableName }) {
  return await deleteFromDatabase({
    id: id,
    tableName: "aba_inventario_infraestrutura",
  });
}

export async function deleAtividadesAgricolas({ id, tableName }) {
  return await deleteFromDatabase({
    id: id,
    tableName: "aba_inventario_atividadesAgricolas",
  });
}

export async function getOutrosBensData() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  let { data: dados, error } = await supabase
    .from("aba_inventario_outrosBens")
    .select("*");

  if (error) {
    console.log(error);
    return undefined;
  }
  return dados;
}

export async function getMaquinasEquipamentosData() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  let { data: dados, error } = await supabase
    .from("aba_inventario_maquinas")
    .select("*");

  if (error) {
    console.log(error);
    return undefined;
  }
  return dados;
}

export async function submitFiltered({ data, tableName }) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const authUserID = user.id;
  const newEntries = data.filter((item) => !item.id);
  const existingEntries = data.filter((item) => item.id);
  if (existingEntries.length > 0) {
    const { error: updateError } = await supabase
      .from(tableName)
      .upsert(existingEntries, { onConflict: ["id"] });

    if (updateError) {
      console.log(updateError);
      return redirect("/error?message=" + updateError.message);
    }
  }
  if (newEntries.length > 0) {
    const newEntriesWithAuthUser = newEntries.map((entry) => ({
      ...entry,
      authuser_id: authUserID,
    }));

    const { error: insertError } = await supabase
      .from(tableName)
      .insert(newEntriesWithAuthUser);

    if (insertError) {
      console.log(insertError);
      return redirect("/error?message=" + insertError.message);
    }
  }
}

export async function deleteFromDatabase({ id, tableName }) {
  const supabase = createClient();
  const { error } = await supabase.from(tableName).delete().eq("id", id);
  if (error) {
    console.log(error);
    return undefined;
  }
  return id;
}

export async function deleteMaquinaEquipamento({ id }) {
  return await deleteFromDatabase({
    id: id,
    tableName: "aba_inventario_maquinas",
  });
}

export async function deleteOutrosBens({ id }) {
  return await deleteFromDatabase({
    id: id,
    tableName: "aba_inventario_outrosBens",
  });
}

export async function deleteAtividadesAgricolas({ id }) {
  return await deleteFromDatabase({
    id: id,
    tableName: "aba_inventario_atividadesAgricolas",
  });
}

export async function getInventariosIndividuais() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  let { data: inventariosIndividuais, error } = await supabase
    .from("aba_inventario_inventarioIndividual")
    .select("*");

  if (error) {
    console.log(error);
    return undefined;
  }
  return inventariosIndividuais;
}

export async function addNewInventarioIndividual({ data }) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const authUserID = user.id;
  const entries = {
    ...data,
    authuser_id: authUserID,
  };
  let { error } = await supabase
    .from("aba_inventario_inventarioIndividual")
    .insert(entries);
  if (error) {
    console.log(error);
    return redirect("/error?message=" + error.message);
  }
}

export async function deleteInventarioIndividual({ inventarioID }) {
  const supabase = createClient();
  const { error } = await supabase
    .from("aba_inventario_inventarioIndividual")
    .delete()
    .eq("id", inventarioID);
  if (error) {
    console.log(error);
    return undefined;
  }
  return inventarioID;
}

export async function deleteInventarioItem({ itemID }) {
  const supabase = createClient();
  const { error } = await supabase
    .from("aba_inventario_inventarioIndividualItem")
    .delete()
    .eq("id", itemID);
  if (error) {
    console.log(error);
    return undefined;
  }
  return true;
}

export async function getInventarioItems() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  let { data: inventariosIndividuais, error } = await supabase
    .from("aba_inventario_inventarioIndividualItem")
    .select("*");

  if (error) {
    console.log(error);
    return undefined;
  }
  return inventariosIndividuais;
}

export async function submitInventariosIndividuais({ data }) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const newInventariosIndividuais = data?.filter((item) => !item.id);
  for (const newItem of newInventariosIndividuais) {
    const newEntry = { ...newItem, authuser_id: user.id };
    const { error: insertError } = await supabase
      .from("aba_inventario_inventarioIndividual")
      .insert(newEntry);
    if (insertError) {
      console.log(insertError);
      return redirect("/error?message=" + insertError.message);
    }
  }
}

export async function submitInventariosIndividuaisItens({ data }) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const newItens = data?.filter((item) => !item.id);
  for (const newItem of newItens) {
    const entry = { ...newItem, authuser_id: user.id };
    const { error: error } = await supabase
      .from("aba_inventario_inventarioIndividualItem")
      .insert(entry);
    if (error) {
      console.log(error);
      return redirect("/error?message=" + error.message);
    }
  }
}

export async function submitInventario({
  data,
  coletivosData,
  individuaisData,
  inventariosIndividuais,
  inventariosIndividuaisItens,
  maquinasEquipamentosData,
  outrosBensData,
  infraestruturaData,
  atividadesAgricolasData,
}) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const authUserID = user.id;

  await submitBenfeitoria({ tableData: coletivosData, tableType: "coletivas" });
  await submitBenfeitoria({
    tableData: individuaisData,
    tableType: "individuais",
  });

  await submitInventariosIndividuais({
    data: inventariosIndividuais,
    authUserID: authUserID,
  });

  await submitInventariosIndividuaisItens({
    data: inventariosIndividuaisItens,
  });

  await submitFiltered({
    data: maquinasEquipamentosData,
    tableName: "aba_inventario_maquinas",
  });
  await submitFiltered({
    data: outrosBensData,
    tableName: "aba_inventario_outrosBens",
  });
  await submitFiltered({
    data: infraestruturaData,
    tableName: "aba_inventario_infraestrutura",
  });
  await submitFiltered({
    data: atividadesAgricolasData,
    tableName: "aba_inventario_atividadesAgricolas",
  });

  const dados = {
    benfeitorias_coletivas_valor_por_familia:
      data.benfeitorias_coletivas_valor_por_familia,
    benfeitorias_coletivas_numero_familias_irao_adquirir:
      data.benfeitorias_coletivas_numero_familias_irao_adquirir,

    benfeitorias_individuais_valor_por_familia:
      data.benfeitorias_individuais_valor_por_familia,
    benfeitorias_individuais_numero_familias_irao_adquirir:
      data.benfeitorias_individuais_numero_familias_irao_adquirir,
  };

  const { error } = await supabase.from("aba_inventario").upsert(
    [
      {
        benfeitorias_coletivas_valor_por_familia:
          data.benfeitorias_coletivas_valor_por_familia,
        benfeitorias_coletivas_numero_familias_irao_adquirir:
          data.benfeitorias_coletivas_numero_familias_irao_adquirir,
        benfeitorias_individuais_valor_por_familia:
          data.benfeitorias_individuais_valor_por_familia,
        benfeitorias_individuais_numero_familias_irao_adquirir:
          data.benfeitorias_individuais_numero_familias_irao_adquirir,
        authuser_id: authUserID,
      },
    ],
    {
      onConflict: ["authuser_id"],
    }
  );
  if (error) {
    return redirect("/error?message=" + error.message);
  }
  return dados;
}

export async function deleteBenfeitoria(tableData, itemToDelete, tableType) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const authUserID = user.id;

  const tableName = `aba_inventario_benfeitorias${
    tableType === "coletivas" ? "Imovel" : "Individuais"
  }`;

  const { error: deleteError } = await supabase
    .from(tableName)
    .delete()
    .eq("id", itemToDelete.id)
    .eq("authuser_id", authUserID);

  if (deleteError) {
    console.log(deleteError);
    return redirect("/error?message=" + deleteError.message);
  }

  const updatedData = tableData.filter((item) => item.SEQ !== itemToDelete.SEQ);
  updatedData.forEach((item, index) => {
    item.SEQ = index + 1;
  });

  const { error } = await supabase.from(tableName).upsert(
    updatedData.map((item) => ({
      ...item,
      authuser_id: authUserID,
    })),
    { onConflict: ["id"] }
  );

  if (error) {
    console.log(error);
    return redirect("/error?message=" + error.message);
  }

  return updatedData;
}

export async function submitBenfeitoria({ tableData, tableType }) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const authUserID = user.id;

  const tableName = `aba_inventario_benfeitorias${
    tableType === "coletivas" ? "Imovel" : "Individuais"
  }`;

  const cleanedData = tableData.map(({ tableType, ...item }) => item);

  // separar novos de antigos (com ou sem ID)
  const newEntries = cleanedData.filter((entry) => !entry.id);
  const existingEntries = cleanedData.filter((entry) => entry.id);

  const newEntriesWithAuthUser = newEntries.map((entry) => ({
    ...entry,
    authuser_id: authUserID,
  }));

  // update existentes
  if (existingEntries.length > 0) {
    let { error } = await supabase
      .from(tableName)
      .upsert(existingEntries, { onConflict: ["id"] });
    if (error) {
      console.log(error);
      return redirect("/error?message=" + error.message);
    }
  }

  // inserir novos
  if (newEntriesWithAuthUser.length > 0) {
    let { error } = await supabase
      .from(tableName)
      .insert(newEntriesWithAuthUser);
    if (error) {
      console.log(error);
      return redirect("/error?message=" + error.message);
    }
  }
}
