"use server";

import { ADMIN_EMAIL } from "@/utils/constants";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { get } from "react-hook-form";

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

  formData.aba_dadosImovel = await getDadosImovel({
    dadosPreAnalise: formData.aba_preanalise[0],
  });

  formData.aba_investimentos = await getDadosInvestimentos({
    dadosPreAnalise: formData.aba_preanalise[0],
  });

  formData.aba_tiposDeSolo = [
    await getTiposDeSolo({ dadosPreAnalise: formData.aba_preanalise[0] }),
  ];
  const totalArea = parseFloat(
    formData.aba_dadosImovel[0]?.campo2?.replace(",", ".") || 0
  );
  formData.aba_tiposDeSolo[0].tabelaQualidades =
    formData.aba_tiposDeSolo[0]?.tabelaQualidades?.map((item) => ({
      ...item,
      area: calculateArea(totalArea, item.porcentagem),
    }));

  formData.aba_cronograma = await getCronogramaData({
    dadosSimuladorPNCF: undefined,
    dadosInvestimentos: formData.aba_investimentos,
  });

  formData.aba_sib = await getSIBData({
    dadosImovel: formData.aba_dadosImovel[0],
    dadosInvestimentos: formData.aba_investimentos,
  });

  formData.aba_evolucao_rebanho = await getEvolucaoRebanho();

  formData.aba_receitas = await getReceitasData({
    dadosEvolucaoRebanho: formData.aba_evolucao_rebanho,
  });

  formData.aba_orcamentos = await getOrcamentosData({
    dadosInvestimentos: formData.aba_investimentos.dadosInvestimentos,
  });

  return formData;
}

const calculateArea = (totalArea, porcentagem) => {
  porcentagem = String(porcentagem);
  return (
    (totalArea * parseFloat(porcentagem.replace(",", "."))) /
    100
  ).toFixed(4);
};

/* INICIO ORÇAMENTOS ------------------------------------------------------------------------------------------- */
async function getOrcamentosData({ dadosInvestimentos }) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  let { data: dados, error } = await supabase
    .from("aba_orcamentos")
    .select("*")
    .eq("authuser_id", user.id);

  if (error) {
    console.log(error);
    return undefined;
  }

  return { dadosOrcamento: dados, dadosInvestimentos: dadosInvestimentos };
}
/* FIM ORÇAMENTOS ------------------------------------------------------------------------------------------- */

/* INICIO RECEITAS ------------------------------------------------------------------------------------------- */
async function getReceitasData({ dadosEvolucaoRebanho }) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  let { data: dados, error } = await supabase
    .from("aba_receitas")
    .select("*")
    .eq("authuser_id", user.id);

  if (error) {
    console.log(error);
    return undefined;
  }

  return { dadosReceita: dados, dadosEvolucaoRebanho: dadosEvolucaoRebanho };
}
/* fim RECEITAS ------------------------------------------------------------------------------------------- */

/* INICIO EVOLUCAO REBANHO ------------------------------------------------------------------------------------------- */

export async function getEvolucaoRebanho() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  let { data: dados, error } = await supabase
    .from("aba_evolucao_rebanho")
    .select("*, aba_evolucao_rebanho_indicadores_tecnicos(*)")
    .eq("authuser_id", user.id);

  if (error) {
    console.log(error);
    return undefined;
  }

  return {
    dadosEvolucaoRebanho: dados,
    dadosInventario: await getInventarioIndividual(),
  };
}

/* FIM EVOLUCAO REBANHO ------------------------------------------------------------------------------------------- */

/* INICIO SIB -------------------------------------------------------------------------------------------- */

export async function getBenfeitoriasTotalValue() {
  const supabase = createClient();
  let { data: benfeitoriasImovel, error: err1 } = await supabase
    .from("aba_inventario_benfeitoriasImovel")
    .select("valor");
  if (err1) {
    console.log(err1);
    return undefined;
  }
  let { data: benfeitoriasIndividuais, error: err2 } = await supabase
    .from("aba_inventario_benfeitoriasIndividuais")
    .select("valor");
  if (err2) {
    console.log(err2);
    return undefined;
  }

  let valorTotal = 0.0;

  const parseCurrency = (value) => {
    return parseFloat(value.replace(".", "").replace(",", "."));
  };

  benfeitoriasImovel?.forEach((item) => {
    valorTotal += parseCurrency(item.valor);
  });
  benfeitoriasIndividuais?.forEach((item) => {
    valorTotal += parseCurrency(item.valor);
  });
  return valorTotal;
}

export async function getSIBData({ dadosImovel, dadosInvestimentos }) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let { data: sibData, error: sibError } = await supabase
    .from("aba_sib")
    .select(
      `
      *,
      aba_sib_dadosProjeto(*),
      aba_sib_valorAvaliado(*),
      aba_sib_custos(*)
    `
    )
    .eq("authuser_id", user.id)
    .single();

  if (sibError) {
    console.log(sibError);
    return undefined;
  }

  return {
    dadosProjeto: sibData?.aba_sib_dadosProjeto || [],
    valorAvaliado: sibData?.aba_sib_valorAvaliado || [],
    dadosImovel,
    dadosInvestimentos,
    valorTotalBenfeitorias: await getBenfeitoriasTotalValue(),
    valorImovelCustos: {
      custoMedicaoInterna: sibData?.aba_sib_custos?.custo_medicao_interna || 0,
      valorITBI: sibData?.aba_sib_custos?.valor_itbi || 0,
      despesasCartorarias: sibData?.aba_sib_custos?.despesas_cartorarias || 0,
      elaboracaoProjeto: sibData?.aba_sib_custos?.elaboracao_projeto || 0,
      valorATER: sibData?.aba_sib_custos?.valor_ater || 0,
    },
  };
}

export async function submitSIBDadosProjeto({ formData }) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const authUserID = user.id;

  let { data: sibRecord, error: sibError } = await supabase
    .from("aba_sib")
    .upsert({ authuser_id: authUserID }, { onConflict: ["authuser_id"] })
    .select()
    .single();

  if (sibError) {
    console.log(sibError);
    return redirect("/error?message=" + sibError.message);
  }

  const dados = {
    numero_beneficiarios: formData.numBeneficiarios,
    teto_nacional: formData.tetoNacional,
    valor_minimo_negociacao: formData.valorMinimoNegociacao,
    valor_maximo_negociacao: formData.valorMaximoNegociacao,
    sib_id: sibRecord.id,
    authuser_id: authUserID,
  };

  const { error } = await supabase
    .from("aba_sib_dadosProjeto")
    .upsert([{ ...dados }], {
      onConflict: ["sib_id"],
    });

  if (error) {
    return redirect("/error?message=" + error.message);
  }
}

export async function submitSIBValorAvaliado({ formData }) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const authUserID = user.id;

  let { data: sibRecord, error: sibError } = await supabase
    .from("aba_sib")
    .upsert({ authuser_id: authUserID }, { onConflict: ["authuser_id"] })
    .select()
    .single();

  if (sibError) {
    console.log(sibError);
    return redirect("/error?message=" + sibError.message);
  }

  const dados = {
    valor_terra_nua: formData.valorTerraNua,
    valor_benfeitorias: formData.valorBenfeitorias,
    valor_total_imovel: formData.valorTotalImovel,
    vti_ha: formData.vtiHa,
    sib_id: sibRecord.id,
    authuser_id: authUserID,
  };

  const { error } = await supabase
    .from("aba_sib_valorAvaliado")
    .upsert([{ ...dados }], {
      onConflict: ["sib_id"],
    });

  if (error) {
    return redirect("/error?message=" + error.message);
  }
}

export async function submitSIBCustos({ formData }) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const authUserID = user.id;

  let { data: sibRecord, error: sibError } = await supabase
    .from("aba_sib")
    .upsert({ authuser_id: authUserID }, { onConflict: ["authuser_id"] })
    .select()
    .single();

  if (sibError) {
    console.log(sibError);
    return redirect("/error?message=" + sibError.message);
  }

  const dados = {
    custo_medicao_interna: formData.custoMedicaoInterna,
    valor_itbi: formData.valorITBI,
    despesas_cartorarias: formData.despesasCartorarias,
    elaboracao_projeto: formData.elaboracaoProjeto,
    valor_ater: formData.valorATER,
    sib_id: sibRecord.id,
    authuser_id: authUserID,
  };

  const { error } = await supabase
    .from("aba_sib_custos")
    .upsert([{ ...dados }], {
      onConflict: ["sib_id"],
    });

  if (error) {
    return redirect("/error?message=" + error.message);
  }
}

/* FIM SIB -------------------------------------------------------------------------------------------- */

/* INICIO CRONOGRAMA -------------------------------------------------------------------------------------------- */

/**
 * Cada item do cronograma vai ser um item do investimentos, com  a descricao sendo
 * categoria + item - descricao
 */
export async function getCronogramaData({
  dadosSimuladorPNCF,
  dadosInvestimentos,
}) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  let { data: dados, err } = await supabase.from("aba_cronograma").select("*");
  if (err) {
    console.log(err);
    return undefined;
  }
  return [dados, dadosInvestimentos.dadosInvestimentos, dadosSimuladorPNCF];
}

export async function submitCronogramaData({ cronogramaData }) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const authUserID = user.id;

  const existingEntries = cronogramaData.filter((item) => item.id);
  const newEntries = cronogramaData.filter((item) => !item.id);

  if (existingEntries.length > 0) {
    const dataToUpsert = existingEntries.map((item) => ({
      id: item.id,
      seq: item.seq,
      investimento_id: item.investimento_id,
      ano1: item.ano1,
      ano2: item.ano2,
      ano3: item.ano3,
      ano4: item.ano4,
      ano5: item.ano5,
      authuser_id: authUserID,
      descricao: item.descricao,
    }));

    const { error: updateError } = await supabase
      .from("aba_cronograma")
      .upsert(dataToUpsert, { onConflict: ["id"] });

    if (updateError) {
      console.log(updateError);
      return redirect("/error?message=" + updateError.message);
    }
  }

  if (newEntries.length > 0) {
    const dataToInsert = newEntries.map((entry) => ({
      seq: entry.seq,
      investimento_id: entry.investimento_id,
      ano1: entry.ano1,
      ano2: entry.ano2,
      ano3: entry.ano3,
      ano4: entry.ano4,
      ano5: entry.ano5,
      authuser_id: authUserID,
      descricao: entry.descricao,
    }));

    const { error: insertError } = await supabase
      .from("aba_cronograma")
      .insert(dataToInsert);

    if (insertError) {
      console.log(insertError);
      return redirect("/error?message=" + insertError.message);
    }
  }
}
/* FIM CRONOGRAMA -------------------------------------------------------------------------------------------- */

/* INICIO TIPOS DE SOLO ------------------------------------------------------------------------------------------- */
export async function getSoloQualidades() {
  const supabase = createClient();
  let { data: dados, err } = await supabase
    .from("aba_tiposDeSolo_qualidades")
    .select("*");
  if (err) {
    console.log(err);
    return undefined;
  }
  return dados;
}

export async function getTiposDeSolo({ dadosPreAnalise }) {
  const supabase = createClient();
  const tabelaQualidades = await getSoloQualidades();
  let { data: tiposDeSolo, err } = await supabase
    .from("aba_tiposDeSolo")
    .select("*");
  if (err) {
    console.log(err);
    return undefined;
  }
  const dados = {
    tiposDeSolo,
    tabelaQualidades,
    areaTotal: dadosPreAnalise?.campo_5 || 0.0,
  };
  return dados;
}

export async function submitTiposDeSolo({ data }) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const authID = user.id;

  const tiposDeSolo = {
    relevo: data.relevo,
    clima: data.clima,
    pedregosidade: data.pedregosidade,
    authuser_id: authID,
  };

  const { error } = await supabase.from("aba_tiposDeSolo").upsert(tiposDeSolo, {
    onConflict: ["authuser_id"],
  });

  if (error) {
    console.log(error);
    return redirect("/error?message=" + error.message);
  }

  return await submitQualidades({
    data: data.tabelaQualidades,
    authUserID: authID,
  });
}

async function submitQualidades({ data, authUserID }) {
  const supabase = createClient();

  const existingEntries = data.filter((item) => item.id);
  const newEntries = data.filter((item) => !item.id);

  const mappedExistingEntries = existingEntries.map((item) => ({
    id: item.id,
    classe: item.classe,
    porcentagem: item.porcentagem,
    area: item.area,
    descricao_classe: item.descricaoClasse,
    uso_atual: item.usoAtual,
    uso_indicado: item.usoIndicado,
    authuser_id: authUserID,
  }));

  const mappedNewEntries = newEntries.map((item) => ({
    classe: item.classe,
    porcentagem: item.porcentagem,
    area: item.area,
    descricao_classe: item.descricaoClasse,
    uso_atual: item.usoAtual,
    uso_indicado: item.usoIndicado,
    authuser_id: authUserID,
  }));

  if (mappedExistingEntries.length > 0) {
    const { error: upsertError } = await supabase
      .from("aba_tiposDeSolo_qualidades")
      .upsert(mappedExistingEntries, {
        onConflict: ["id"],
      });

    if (upsertError) {
      console.log(upsertError);
      return redirect("/error?message=" + upsertError.message);
    }
  }

  if (mappedNewEntries.length > 0) {
    const { error: insertError } = await supabase
      .from("aba_tiposDeSolo_qualidades")
      .insert(mappedNewEntries);

    if (insertError) {
      console.log(insertError);
      return redirect("/error?message=" + insertError.message);
    }
  }
}

export async function deleteQualidadeSolo({ itemID }) {
  return await deleteFromDatabase({
    id: itemID,
    tableName: "aba_tiposDeSolo_qualidades",
  });
}
/* FIM TIPOS DE SOLO ------------------------------------------------------------------------------------------- */

/* INICIO INVESTIMENTOS ------------------------------------------------------------------------------------------- */
export async function getDadosInvestimentos({ dadosPreAnalise }) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  let { data: dadosInvestimentos, err } = await supabase
    .from("aba_investimentos")
    .select("*");
  if (err) {
    console.log(err);
    return undefined;
  }
  if (!dadosInvestimentos || dadosInvestimentos[0] === undefined) return {};
  const dados = { dadosPreAnalise, dadosInvestimentos }; // nome do imovel e local é preciso
  return dados;
}

export async function isAdminUser() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isAdmin = ADMIN_EMAIL.some((email) => {
    return user.email === email;
  });

  return isAdmin;
}

export async function submitInvestimentos({ data }) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const authID = user.id;

  const existingEntries = data.filter((item) => item.id);
  const newEntries = data.filter((item) => !item.id);

  const mappedExistingEntries = existingEntries.map((item) => ({
    ...item,
    authuser_id: authID,
  }));

  const mappedNewEntries = newEntries.map((item) => ({
    ...item,
    authuser_id: authID,
  }));

  if (mappedExistingEntries.length > 0) {
    const { error: upsertError } = await supabase
      .from("aba_investimentos")
      .upsert(mappedExistingEntries, {
        onConflict: ["id"],
      });

    if (upsertError) {
      console.log(upsertError);
      return redirect("/error?message=" + upsertError.message);
    }
  }

  if (mappedNewEntries.length > 0) {
    const { error: insertError } = await supabase
      .from("aba_investimentos")
      .insert(mappedNewEntries);

    if (insertError) {
      console.log(insertError);
      return redirect("/error?message=" + insertError.message);
    }
  }
}

export async function deleteInvestimento({ itemToDelete, data }) {
  const supabase = createClient();
  const { error } = await supabase
    .from("aba_investimentos")
    .delete()
    .eq("id", itemToDelete.id);
  const updatedData = data.filter((item) => item.seq !== itemToDelete.seq);
  if (error) {
    console.log(error);
    return undefined;
  }
  return updatedData;
}
/* FIM INVESTIMENTOS ------------------------------------------------------------------------------------------- */

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
    dadosImovel[0].campo1 = dadosPreAnalise?.campo_4 || "";
  }
  if (!dadosImovel[0].campo2) {
    dadosImovel[0].campo2 = dadosPreAnalise?.campo_5;
  }
  if (!dadosImovel[0].campo3) {
    dadosImovel[0].campo3 = dadosPreAnalise?.campo_7;
  }
  const str = dadosPreAnalise?.campo_3 || "";
  const [strPre, strPos] = str.split("-"); // ex: campos_gerais-mg
  if (!dadosImovel[0].campo4) {
    dadosImovel[0].campo4 = strPre.replace(/_/g, " ").toUpperCase();
  }
  if (!dadosImovel[0].campo5) {
    dadosImovel[0].campo5 = strPos?.toUpperCase() || "";
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
      campo1: `${dadosCliente.nome_completo}`,
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

  console.log("submitando");
  console.log(mappedData);

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

export async function getInventarioIndividual() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  let { data: dados, error } = await supabase
    .from("aba_inventario_inventarioIndividual")
    .select("*");

  if (error) {
    console.log(error);
    return undefined;
  }

  return dados;
}

export async function getInventario() {
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
  const maquinasEquipamentosTableData = await getMaquinasEquipamentosData();
  const outrosBensTableData = await getOutrosBensData();
  const infraestruturaTableData = await getInfraestruturaData();
  const atividadesAgricolasTableData = await getAtividadesAgricolas();

  const inventarioIndividualData = await getInventarioIndividual();

  return {
    aba_inventario,
    benfeitoriasImovel,
    benfeitoriasIndividuais,
    maquinasEquipamentosTableData,
    outrosBensTableData,
    infraestruturaTableData,
    atividadesAgricolasTableData,
    inventarioIndividualData,
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

export async function submitInventarioIndividual({ data }) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const authUserID = user.id;

  const inventarioIndividualData = {
    reprodutores: data[0].reprodutores,
    matrizes: data[0].matrizes,
    bezerros: data[0].bezerros,
    bezerras: data[0].bezerras,
    garrotes: data[0].garrotes,
    garrotas: data[0].garrotas,
    novilhos: data[0].novilhos,
    novilhas: data[0].novilhas,
    authuser_id: authUserID,
  };

  console.log("data inside submitInventarioIndividual2");
  console.log(inventarioIndividualData);

  const { error } = await supabase
    .from("aba_inventario_inventarioIndividual")
    .upsert(inventarioIndividualData, {
      onConflict: ["authuser_id"],
    });

  if (error) {
    console.log(error);
    throw new Error("Error submitting inventario individual data");
  }
}

export async function submitInventario({
  data,
  coletivosData,
  individuaisData,
  maquinasEquipamentosData,
  outrosBensData,
  infraestruturaData,
  atividadesAgricolasData,
  inventarioIndividualData,
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

  console.log("data inside submitInventario");
  console.log(data);

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

  await submitInventarioIndividual({ data: inventarioIndividualData });

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
