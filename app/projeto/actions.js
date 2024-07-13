"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

/**
 *
 * @todo deve buscar todos os dados obrigatórios que já tenha no banco (por ex: dados básicos)
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

  formData.aba_dadosImovel = {};

  return formData;
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

export async function submitDadosImovelForm({ formData }) {
  console.log(formData);
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

  return {
    aba_inventario,
    benfeitoriasImovel,
    benfeitoriasIndividuais,
    inventariosIndividuais,
  };
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

export async function getInventarioItems({ inventarioID }) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  let { data: inventariosIndividuais, error } = await supabase
    .from("aba_inventario_inventarioIndividualItem")
    .select("*")
    .eq("inventarioIndividual_id", inventarioID);

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

export async function submitInventario({
  data,
  coletivosData,
  individuaisData,
  inventariosIndividuais,
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
