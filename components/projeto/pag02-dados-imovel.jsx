"use client";

import { Button } from "../ui/button";
import Heading from "./Header";

const formatValue = (value) => {
  if (!value) return "";
  return String(value);
};

const formatCurrency = (value) => {
  if (!value) return "";
  const numValue = parseFloat(String(value).replace(",", "."));
  if (isNaN(numValue)) return "";
  return numValue.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};

const formatArea = (value) => {
  if (!value) return "";
  const numValue = parseFloat(String(value).replace(",", "."));
  if (isNaN(numValue)) return "";
  return numValue.toLocaleString("pt-BR", {
    minimumFractionDigits: 4,
    maximumFractionDigits: 4,
  });
};

export default function Pag02DadosImovel({
  dadosImovelData,
  preAnaliseData,
  tiposDeSoloData,
  isAdmin,
}) {
  // Parse dados do imóvel
  const parseDadosImovel = () => {
    if (!dadosImovelData || !dadosImovelData[0]) return {};
    const data = dadosImovelData[0];
    return {
      nomeImovel: formatValue(data.campo1),
      areaTotalImovel: formatArea(data.campo2),
      areaSerAdquirida: formatArea(data.campo3),
      municipio: formatValue(data.campo4),
      numeroMatricula: formatValue(data.campo6),
      numeroCCIR: formatValue(data.campo7),
      numeroCAR: formatValue(data.campo8),
      numeroITR: formatValue(data.campo9),
      numeroCertificacaoLote: formatValue(data.campo10),
      valorSolicitado: formatValue(data.campo11),
      valorAvaliado: formatValue(data.campo12),
      valorNegociado: formatValue(data.campo13),
      nomeProprietario1: formatValue(data.campo14),
      cpfProprietario1: formatValue(data.campo15),
      nomeProprietario2: formatValue(data.campo16),
      cpfProprietario2: formatValue(data.campo17),
      nomeProprietario3: formatValue(data.campo18),
      cpfProprietario3: formatValue(data.campo19),
      nomeProprietario4: formatValue(data.campo20),
      cpfProprietario4: formatValue(data.campo21),
      indicacoesAcesso: formatValue(data.campo22),
      distanciaMunicipioProximo: formatValue(data.campo23),
      kmEstradaPavimentada: formatValue(data.campo24),
      mesesTransitavelPavimentada: formatValue(data.campo25),
      kmEstradaTerraBoasCondicoes: formatValue(data.campo26),
      mesesTransitavelTerraBoasCondicoes: formatValue(data.campo27),
      kmEstradaTerraRegulares: formatValue(data.campo28),
      mesesTransitavelTerraRegulares: formatValue(data.campo29),
      kmEstradaTerraPessimas: formatValue(data.campo30),
      mesesTransitavelTerraPessimas: formatValue(data.campo31),
      kmTrilha: formatValue(data.campo32),
      mesesTransitavelTrilha: formatValue(data.campo33),
      kmFluvialLacustre: formatValue(data.campo34),
      mesesTransitavelFluvialLacustre: formatValue(data.campo35),
      eletrificacaoExistente: formatValue(data.campo36),
      abastecimentoAgua: formatValue(data.campo37),
      recursosHidricos: formatValue(data.campo38),
      matasCapoeiras: formatValue(data.campo39),
      outrosRecursosNaturais: formatValue(data.campo40),
      relevo: formatValue(data.campo41),
      clima: formatValue(data.campo42),
      pedregosidade: formatValue(data.campo43),
    };
  };

  const parseTiposDeSolo = () => {
    if (!tiposDeSoloData || !tiposDeSoloData[0]) return [];
    const data = tiposDeSoloData[0];
    if (!data.tabelaQualidades) return [];
    return data.tabelaQualidades.map((item) => ({
      area: formatArea(item.area),
      porcentagem: formatValue(item.porcentagem),
      classe: formatValue(item.classe),
      descricao: formatValue(item.descricao),
      usoAtual: formatValue(item.usoAtual),
    }));
  };

  const dadosImovel = parseDadosImovel();
  const tiposSolo = parseTiposDeSolo();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full h-full overflow-y-auto bg-white text-gray-900 p-8">
      <Heading
        tabName="Dados do Imóvel (PAG02)"
        onSave={handlePrint}
        saveButtonText="Imprimir Página 02"
        isAdmin={isAdmin}
      />

      <div className="print:p-4">
        {/* Cabeçalho */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-center mb-4 print:text-base">
            DADOS DO IMÓVEL
          </h2>
        </div>

        {/* Seção 1: Dados Principais */}
        <div className="mb-6">
          <table className="w-full text-xs border-collapse print:text-xs">
            <tbody>
              <tr>
                <td className="border border-gray-400 p-2 font-bold w-1/4 print:p-1">
                  Nº DA MATRICULA
                </td>
                <td className="border border-gray-400 p-2 print:p-1" colSpan={3}>
                  {dadosImovel.numeroMatricula}
                </td>
                <td className="border border-gray-400 p-2 font-bold w-1/6 print:p-1">
                  NOME DO IMÓVEL
                </td>
                <td className="border border-gray-400 p-2 print:p-1" colSpan={2}>
                  {dadosImovel.nomeImovel}
                </td>
              </tr>
              <tr>
                <td className="border border-gray-400 p-2 font-bold print:p-1">
                  Nº DO CCIR
                </td>
                <td className="border border-gray-400 p-2 print:p-1" colSpan={3}>
                  {dadosImovel.numeroCCIR}
                </td>
                <td className="border border-gray-400 p-2 font-bold print:p-1">
                  Nº DO CAR
                </td>
                <td className="border border-gray-400 p-2 print:p-1" colSpan={2}>
                  {dadosImovel.numeroCAR}
                </td>
              </tr>
              <tr>
                <td className="border border-gray-400 p-2 font-bold print:p-1">
                  Nº DO ITR
                </td>
                <td className="border border-gray-400 p-2 print:p-1" colSpan={3}>
                  {dadosImovel.numeroITR}
                </td>
                <td className="border border-gray-400 p-2 font-bold print:p-1">
                  Nº DA CERTIFICAÇÃO DO LOTE
                </td>
                <td className="border border-gray-400 p-2 print:p-1" colSpan={2}>
                  {dadosImovel.numeroCertificacaoLote}
                </td>
              </tr>
              <tr>
                <td className="border border-gray-400 p-2 font-bold print:p-1">
                  VALOR SOLICITADO
                </td>
                <td className="border border-gray-400 p-2 print:p-1">
                  {dadosImovel.valorSolicitado}
                </td>
                <td className="border border-gray-400 p-2 font-bold print:p-1">
                  VALOR AVALIADO
                </td>
                <td className="border border-gray-400 p-2 print:p-1">
                  {dadosImovel.valorAvaliado}
                </td>
                <td className="border border-gray-400 p-2 font-bold print:p-1">
                  VALOR NEGOCIADO
                </td>
                <td className="border border-gray-400 p-2 print:p-1" colSpan={2}>
                  {dadosImovel.valorNegociado}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Seção 2: Proprietários */}
        <div className="mb-6">
          <table className="w-full text-xs border-collapse print:text-xs">
            <tbody>
              <tr>
                <td className="border border-gray-400 p-2 font-bold w-1/4 print:p-1">
                  NOME DO PROPRIETÁRIO 1
                </td>
                <td className="border border-gray-400 p-2 print:p-1">
                  {dadosImovel.nomeProprietario1}
                </td>
                <td className="border border-gray-400 p-2 font-bold w-1/4 print:p-1">
                  CPF OU CNPJ DO PROPRIETÁRIO
                </td>
                <td className="border border-gray-400 p-2 print:p-1">
                  {dadosImovel.cpfProprietario1}
                </td>
              </tr>
              {dadosImovel.nomeProprietario2 && (
                <tr>
                  <td className="border border-gray-400 p-2 font-bold print:p-1">
                    NOME DO PROPRIETÁRIO 2
                  </td>
                  <td className="border border-gray-400 p-2 print:p-1">
                    {dadosImovel.nomeProprietario2}
                  </td>
                  <td className="border border-gray-400 p-2 font-bold print:p-1">
                    CPF OU CNPJ DO PROPRIETÁRIO
                  </td>
                  <td className="border border-gray-400 p-2 print:p-1">
                    {dadosImovel.cpfProprietario2}
                  </td>
                </tr>
              )}
              {dadosImovel.nomeProprietario3 && (
                <tr>
                  <td className="border border-gray-400 p-2 font-bold print:p-1">
                    NOME DO PROPRIETÁRIO 3
                  </td>
                  <td className="border border-gray-400 p-2 print:p-1">
                    {dadosImovel.nomeProprietario3}
                  </td>
                  <td className="border border-gray-400 p-2 font-bold print:p-1">
                    CPF OU CNPJ DO PROPRIETÁRIO
                  </td>
                  <td className="border border-gray-400 p-2 print:p-1">
                    {dadosImovel.cpfProprietario3}
                  </td>
                </tr>
              )}
              {dadosImovel.nomeProprietario4 && (
                <tr>
                  <td className="border border-gray-400 p-2 font-bold print:p-1">
                    NOME DO PROPRIETÁRIO 4
                  </td>
                  <td className="border border-gray-400 p-2 print:p-1">
                    {dadosImovel.nomeProprietario4}
                  </td>
                  <td className="border border-gray-400 p-2 font-bold print:p-1">
                    CPF OU CNPJ DO PROPRIETÁRIO
                  </td>
                  <td className="border border-gray-400 p-2 print:p-1">
                    {dadosImovel.cpfProprietario4}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Seção 3: Condições de Acesso */}
        <div className="mb-6">
          <h3 className="text-sm font-bold mb-2 print:text-xs">
            CONDIÇÕES DE ACESSO
          </h3>
          <h4 className="text-xs font-semibold mb-2 print:text-xs">
            INDICAÇÕES DE ACESSO AO IMÓVEL
          </h4>
          <div className="border border-gray-400 p-3 mb-3 print:p-2">
            <p className="text-xs whitespace-pre-wrap">
              {dadosImovel.indicacoesAcesso}
            </p>
          </div>

          <table className="w-full text-xs border-collapse print:text-xs">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-400 p-2 print:p-1" rowSpan={2}>
                  DISTÂNCIA AO MUNICÍPIO MAIS PRÓXIMO
                </th>
                <th className="border border-gray-400 p-2 print:p-1" rowSpan={2}>
                  CONDIÇÕES DE ACESSO
                </th>
                <th className="border border-gray-400 p-2 print:p-1" rowSpan={2}>
                  KM
                </th>
                <th className="border border-gray-400 p-2 print:p-1" rowSpan={2}>
                  TRANSITÁVEL (MESES)
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-400 p-2 print:p-1" rowSpan={6}>
                  {dadosImovel.distanciaMunicipioProximo} KM
                </td>
                <td className="border border-gray-400 p-2 print:p-1">
                  Estrada Pavimentada
                </td>
                <td className="border border-gray-400 p-2 text-center print:p-1">
                  {dadosImovel.kmEstradaPavimentada}
                </td>
                <td className="border border-gray-400 p-2 text-center print:p-1">
                  {dadosImovel.mesesTransitavelPavimentada}
                </td>
              </tr>
              <tr>
                <td className="border border-gray-400 p-2 print:p-1">
                  Estrada de terra em boas condições
                </td>
                <td className="border border-gray-400 p-2 text-center print:p-1">
                  {dadosImovel.kmEstradaTerraBoasCondicoes}
                </td>
                <td className="border border-gray-400 p-2 text-center print:p-1">
                  {dadosImovel.mesesTransitavelTerraBoasCondicoes}
                </td>
              </tr>
              <tr>
                <td className="border border-gray-400 p-2 print:p-1">
                  Estrada de terra em condições regulares
                </td>
                <td className="border border-gray-400 p-2 text-center print:p-1">
                  {dadosImovel.kmEstradaTerraRegulares}
                </td>
                <td className="border border-gray-400 p-2 text-center print:p-1">
                  {dadosImovel.mesesTransitavelTerraRegulares}
                </td>
              </tr>
              <tr>
                <td className="border border-gray-400 p-2 print:p-1">
                  Estrada de terra em péssimas condições
                </td>
                <td className="border border-gray-400 p-2 text-center print:p-1">
                  {dadosImovel.kmEstradaTerraPessimas}
                </td>
                <td className="border border-gray-400 p-2 text-center print:p-1">
                  {dadosImovel.mesesTransitavelTerraPessimas}
                </td>
              </tr>
              <tr>
                <td className="border border-gray-400 p-2 print:p-1">Trilha</td>
                <td className="border border-gray-400 p-2 text-center print:p-1">
                  {dadosImovel.kmTrilha}
                </td>
                <td className="border border-gray-400 p-2 text-center print:p-1">
                  {dadosImovel.mesesTransitavelTrilha}
                </td>
              </tr>
              <tr>
                <td className="border border-gray-400 p-2 print:p-1">
                  Fluvial / lacustre
                </td>
                <td className="border border-gray-400 p-2 text-center print:p-1">
                  {dadosImovel.kmFluvialLacustre}
                </td>
                <td className="border border-gray-400 p-2 text-center print:p-1">
                  {dadosImovel.mesesTransitavelFluvialLacustre}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Seção 4: Características do Imóvel */}
        <div className="mb-6">
          <h3 className="text-sm font-bold mb-3 print:text-xs print:mb-2">
            CARACTERISTICAS DO IMÓVEL
          </h3>

          <div className="mb-4">
            <h4 className="text-xs font-semibold mb-2">
              ELETRIFICAÇÃO EXISTENTE (TIPO, DISTRIBUIÇÃO ATÉ ONDE CHEGA)
            </h4>
            <div className="border border-gray-400 p-3 print:p-2">
              <p className="text-xs whitespace-pre-wrap">
                {dadosImovel.eletrificacaoExistente}
              </p>
            </div>
          </div>

          <div className="mb-4">
            <h4 className="text-xs font-semibold mb-2">
              ABASTECIMENTO DE ÁGUA EXISTENTE (PARA USO DOMESTICO)
            </h4>
            <div className="border border-gray-400 p-3 print:p-2">
              <p className="text-xs whitespace-pre-wrap">
                {dadosImovel.abastecimentoAgua}
              </p>
            </div>
          </div>

          <div className="mb-4">
            <h4 className="text-xs font-semibold mb-2">
              RECURSOS HÍDRICOS EXISTENTE (PERENES / NÃO PERENES)
            </h4>
            <div className="border border-gray-400 p-3 print:p-2">
              <p className="text-xs whitespace-pre-wrap">
                {dadosImovel.recursosHidricos}
              </p>
            </div>
          </div>

          <div className="mb-4">
            <h4 className="text-xs font-semibold mb-2">
              MATAS, CAPOEIRAS E ÁREAS DE EXTRATIVISMO VEGETAL
            </h4>
            <div className="border border-gray-400 p-3 print:p-2">
              <p className="text-xs whitespace-pre-wrap">
                {dadosImovel.matasCapoeiras}
              </p>
            </div>
          </div>

          <div className="mb-4">
            <h4 className="text-xs font-semibold mb-2">
              OUTROS RECURSOS NATURAIS
            </h4>
            <div className="border border-gray-400 p-3 print:p-2">
              <p className="text-xs whitespace-pre-wrap">
                {dadosImovel.outrosRecursosNaturais}
              </p>
            </div>
          </div>

          <div className="mb-4">
            <h4 className="text-xs font-semibold mb-2">RELEVO</h4>
            <div className="border border-gray-400 p-3 print:p-2">
              <p className="text-xs whitespace-pre-wrap">{dadosImovel.relevo}</p>
            </div>
          </div>

          <div className="mb-4">
            <h4 className="text-xs font-semibold mb-2">CLIMA</h4>
            <div className="border border-gray-400 p-3 print:p-2">
              <p className="text-xs whitespace-pre-wrap">{dadosImovel.clima}</p>
            </div>
          </div>

          <div className="mb-4">
            <h4 className="text-xs font-semibold mb-2">PEDREGOSIDADE</h4>
            <div className="border border-gray-400 p-3 print:p-2">
              <p className="text-xs whitespace-pre-wrap">
                {dadosImovel.pedregosidade}
              </p>
            </div>
          </div>
        </div>

        {/* Seção 5: Tipos de Solo */}
        <div className="mb-6">
          <h3 className="text-sm font-bold mb-3 print:text-xs print:mb-2">
            TIPOS DE SOLO
          </h3>
          <table className="w-full text-xs border-collapse print:text-xs">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-400 p-2 print:p-1">ÁREA</th>
                <th className="border border-gray-400 p-2 print:p-1">%</th>
                <th className="border border-gray-400 p-2 print:p-1">CLASSE</th>
                <th className="border border-gray-400 p-2 print:p-1">
                  DESCRIÇÃO DA CLASSE
                </th>
                <th className="border border-gray-400 p-2 print:p-1">USO ATUAL</th>
              </tr>
            </thead>
            <tbody>
              {tiposSolo.length > 0 ? (
                tiposSolo.map((tipo, index) => (
                  <tr key={index}>
                    <td className="border border-gray-400 p-2 text-center print:p-1">
                      {tipo.area}
                    </td>
                    <td className="border border-gray-400 p-2 text-center print:p-1">
                      {tipo.porcentagem}%
                    </td>
                    <td className="border border-gray-400 p-2 text-center print:p-1">
                      {tipo.classe}
                    </td>
                    <td className="border border-gray-400 p-2 print:p-1">
                      {tipo.descricao}
                    </td>
                    <td className="border border-gray-400 p-2 print:p-1">
                      {tipo.usoAtual}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="border border-gray-400 p-2 text-center">
                    Nenhum dado de tipo de solo cadastrado
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Seção 6: Benfeitorias - Placeholder */}
        <div className="mb-6">
          <h3 className="text-sm font-bold mb-3 print:text-xs print:mb-2">
            BENFEITORIAS EXISTENTES
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-xs font-semibold mb-2">
                BENFEITORIAS COLETIVAS
              </h4>
              <table className="w-full text-xs border-collapse print:text-xs">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-400 p-2 print:p-1">
                      DESCRIÇÃO
                    </th>
                    <th className="border border-gray-400 p-2 print:p-1">VALOR</th>
                    <th className="border border-gray-400 p-2 print:p-1">ESTADO</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-400 p-2 print:p-1">&nbsp;</td>
                    <td className="border border-gray-400 p-2 print:p-1">&nbsp;</td>
                    <td className="border border-gray-400 p-2 print:p-1">&nbsp;</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div>
              <h4 className="text-xs font-semibold mb-2">
                BENFEITORIAS INDIVIDUAIS
              </h4>
              <table className="w-full text-xs border-collapse print:text-xs">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-400 p-2 print:p-1">
                      DESCRIÇÃO
                    </th>
                    <th className="border border-gray-400 p-2 print:p-1">VALOR</th>
                    <th className="border border-gray-400 p-2 print:p-1">ESTADO</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-400 p-2 print:p-1">&nbsp;</td>
                    <td className="border border-gray-400 p-2 print:p-1">&nbsp;</td>
                    <td className="border border-gray-400 p-2 print:p-1">&nbsp;</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Botão Imprimir */}
      <div className="flex justify-center gap-4 mt-8 print:hidden">
        <Button
          onClick={handlePrint}
          className="bg-orange-500 hover:bg-orange-600 text-white"
        >
          Imprimir Página 02
        </Button>
      </div>
    </div>
  );
}
