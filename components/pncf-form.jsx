"use client";

import { SubmitButton } from "../app/login/submit-button";
import completeProfile, {
  submitEnquadramentoForm,
} from "../app/user-dashboard/actions";
export default function FormPNCF({ authID, isToggled, onClose, msg }) {
  /* se chegou até aqui, é porque a conta está cadastrada E logada, MAS os dados básicos
   do perfil ainda não foram preenchidos */
  if (!isToggled) return null;
  return (
    <div className="fixed inset-x-0 inset-y-0  bg-gray-50 bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
      <div className="w-full h-full flex items-center justify-center ">
        <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white  shadow-2xl p-8 sm:p-16 sm:w-[80%] h-full overflow-y-auto">
          <div className="px-4 py-5 sm:px-6">
            <h1 className="text-2xl font-semibold">
              Programa Nacional de Crédito Fundiário
            </h1>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <div className="space-y-10 divide-y divide-gray-900/10">
              <div className="grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-3">
                <div className="px-4 sm:px-0">
                  <h2 className="text-base font-semibold leading-7 text-gray-900">
                    Formulário de Enquadramento
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Seu próximo passo é preencher o formulário de enquadramento
                    a seguir para o Programa Nacional de Crédio Fundiário.
                  </p>
                </div>

                <form
                  className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2"
                  action="#"
                  method="POST"
                >
                  <div className="px-4 py-6 sm:p-8">
                    <p className="text-xl font-semibold leading-7 text-gray-900 mb-12">
                      Informações Pessoais
                    </p>
                    <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                      <div className="sm:col-span-3">
                        <label
                          htmlFor="first-name"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Nome
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            name="first-name"
                            id="first-name"
                            autoComplete="given-name"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-3">
                        <label
                          htmlFor="last-name"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Sobrenome
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            name="last-name"
                            id="last-name"
                            autoComplete="family-name"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      {/* AQUI COMEÇA DADOS DE RESIDENCIA */}

                      <div className="sm:col-span-2">
                        <label
                          htmlFor="state"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Qual seu estado de residência?
                        </label>
                        <div className="mt-2">
                          <select
                            id="state"
                            name="state"
                            autoComplete="estado"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                          >
                            <option value="AC">Acre</option>
                            <option value="AL">Alagoas</option>
                            <option value="AP">Amapá</option>
                            <option value="AM">Amazonas</option>
                            <option value="BA">Bahia</option>
                            <option value="CE">Ceará</option>
                            <option value="DF">Distrito Federal</option>
                            <option value="ES">Espírito Santo</option>
                            <option value="GO">Goiás</option>
                            <option value="MA">Maranhão</option>
                            <option value="MT">Mato Grosso</option>
                            <option value="MS">Mato Grosso do Sul</option>
                            <option value="MG">Minas Gerais</option>
                            <option value="PA">Pará</option>
                            <option value="PB">Paraíba</option>
                            <option value="PR">Paraná</option>
                            <option value="PE">Pernambuco</option>
                            <option value="PI">Piauí</option>
                            <option value="RJ">Rio de Janeiro</option>
                            <option value="RN">Rio Grande do Norte</option>
                            <option value="RS">Rio Grande do Sul</option>
                            <option value="RO">Rondônia</option>
                            <option value="RR">Roraima</option>
                            <option value="SC">Santa Catarina</option>
                            <option value="SP">São Paulo</option>
                            <option value="SE">Sergipe</option>
                            <option value="TO">Tocantins</option>
                            <option value="EX">Estrangeiro</option>
                          </select>
                        </div>
                      </div>
                      <div className="sm:col-span-2">
                        <label
                          htmlFor="city"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Cidade de residência
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            name="city"
                            id="city"
                            autoComplete="address-level1"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                      <div className="sm:col-span-2">
                        <label
                          htmlFor="postal-code"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          CEP de residência
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            name="postal-code"
                            id="postal-code"
                            autoComplete="postal-code"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                      <div className="col-span-full">
                        <label
                          htmlFor="street-address"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Logradouro
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            name="street-address"
                            id="street-address"
                            autoComplete="street-address"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <p className="text-xl font-semibold leading-7 text-gray-900 mt-12 mb-6">
                        Questionário
                      </p>

                      <div className="sm:col-span-full">
                        <label
                          htmlFor="1"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          1. Você faz parte de algum grupo?
                        </label>
                        <div className="mt-2">
                          <select
                            id="1"
                            name="1"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                          >
                            <option value="1-nenhumGrupo">
                              Não faço parte de nenhum grupo ainda.
                            </option>
                            <option value="1-visitanteAgrotins">
                              Visitante AGROTINS - 2024
                            </option>
                            <option value="1-grupoTerraPorto">
                              G01 - PNCF - Grupo da Terra-Porto/Terezinha
                            </option>
                            <option value="1-grupoAltoSerra">
                              G02 - PNCF - Alto da Serra - Ap. Rio Negro
                            </option>
                            <option value="1-Ananas">
                              G04 - Ananás-01-Bico
                            </option>
                            <option value="1-Sandolandia">
                              G05 - Sandolândia 01
                            </option>
                          </select>
                        </div>
                      </div>
                      <div className="col-span-full">
                        <label
                          htmlFor="state"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          2. Em qual estado pretende comprar sua propriedade?
                        </label>
                        <div className="mt-2">
                          <select
                            id="2"
                            name="2"
                            autoComplete="estado da propriedade"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                          >
                            <option value="AC">Não está definido ainda</option>
                            <option value="AC">Acre</option>
                            <option value="AL">Alagoas</option>
                            <option value="AP">Amapá</option>
                            <option value="AM">Amazonas</option>
                            <option value="BA">Bahia</option>
                            <option value="CE">Ceará</option>
                            <option value="DF">Distrito Federal</option>
                            <option value="ES">Espírito Santo</option>
                            <option value="GO">Goiás</option>
                            <option value="MA">Maranhão</option>
                            <option value="MT">Mato Grosso</option>
                            <option value="MS">Mato Grosso do Sul</option>
                            <option value="MG">Minas Gerais</option>
                            <option value="PA">Pará</option>
                            <option value="PB">Paraíba</option>
                            <option value="PR">Paraná</option>
                            <option value="PE">Pernambuco</option>
                            <option value="PI">Piauí</option>
                            <option value="RJ">Rio de Janeiro</option>
                            <option value="RN">Rio Grande do Norte</option>
                            <option value="RS">Rio Grande do Sul</option>
                            <option value="RO">Rondônia</option>
                            <option value="RR">Roraima</option>
                            <option value="SC">Santa Catarina</option>
                            <option value="SP">São Paulo</option>
                            <option value="SE">Sergipe</option>
                            <option value="TO">Tocantins</option>
                          </select>
                        </div>
                      </div>

                      <div className="sm:col-span-full">
                        <legend className="text-sm font-semibold leading-6 text-gray-900">
                          3. Você tem entre 18 a 70 anos?
                        </legend>
                        <div className="mt-6 space-y-6">
                          <div className="flex items-center gap-x-3">
                            <input
                              name="3"
                              id="3-sim"
                              type="radio"
                              value={"Sim"}
                              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                            <label
                              htmlFor="3-sim"
                              className="block text-sm font-normal leading-6 text-gray-900"
                            >
                              Sim
                            </label>
                          </div>
                          <div className="flex items-center gap-x-3">
                            <input
                              name="3"
                              id="3-nao"
                              type="radio"
                              value={"Nao"}
                              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                            <label
                              htmlFor="3-nao"
                              className="block text-sm font-normal leading-6 text-gray-900"
                            >
                              Não
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="sm:col-span-full">
                        <legend className="text-sm font-semibold leading-6 text-gray-900">
                          4. Podem participar do PNCF: Trabalhadores rurais
                          não-proprietários, preferencialmente assalariados,
                          parceiros, posseiros e arrendatários. Ou agricultores
                          proprietários de imóveis cuja área não alcance a
                          dimensão da propriedade familiar. (320 hectares, ou
                          66,1 alqueires para grande parte do Tocantins)
                        </legend>
                        <legend className="text-sm font-semibold leading-6 text-gray-900 mt-3">
                          Você se enquadra em uma dessa condições?
                        </legend>
                        <div className="mt-6 space-y-6">
                          <div className="flex items-center gap-x-3">
                            <input
                              type="radio"
                              name="4"
                              id="4-sim"
                              value={"Sim"}
                              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                            <label
                              htmlFor="4-sim"
                              className="block text-sm font-normal leading-6 text-gray-900"
                            >
                              Sim
                            </label>
                          </div>
                          <div className="flex items-center gap-x-3">
                            <input
                              type="radio"
                              name="4"
                              id="4-nao"
                              value={"Nao"}
                              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                            <label
                              htmlFor="4-nao"
                              className="block text-sm font-normal leading-6 text-gray-900"
                            >
                              Não
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="sm:col-span-full">
                        <legend className="text-sm font-semibold leading-6 text-gray-900">
                          5. O PNCF é dividido em 4 linhas, considerando renda
                          anual e patrimônio, marque em qual das linhas voce se
                          enquadra.
                        </legend>
                        <div className="mt-6 space-y-6">
                          <div className="flex items-center gap-x-3">
                            <input
                              type="radio"
                              name="5"
                              id="5-social"
                              value={"PNCF - Social"}
                              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                            <label
                              htmlFor="linha-social"
                              className="block text-sm font-normal leading-6 text-gray-900"
                            >
                              PNCF - Social (Renda Anual de até R$ 27.775,99 e
                              Patrimônio de até R$ 70 mil).
                            </label>
                          </div>
                          <div className="flex items-center gap-x-3">
                            <input
                              type="radio"
                              name="5"
                              id="5-mais"
                              value={"PNCF - Mais"}
                              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                            <label
                              htmlFor="5-mais"
                              className="block text-sm font-normal leading-6 text-gray-900"
                            >
                              PNCF - Mais (Renda Anual de até R$ 55.551,98 e
                              Patrimônio de até R$ 140 mil).
                            </label>
                          </div>
                          <div className="flex items-center gap-x-3">
                            <input
                              type="radio"
                              name="5"
                              id="5-jovemterra"
                              value={"PNCF - Jovem Terra da Juventude"}
                              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                            <label
                              htmlFor="5-jovemterra"
                              className="block text-sm font-normal leading-6 text-gray-900"
                            >
                              PNCF - Jovem Terra da Juventude (Renda Anual de
                              até R$ 55.551,98 e Patrimônio de até R$ 140 mil).
                            </label>
                          </div>
                          <div className="flex items-center gap-x-3">
                            <input
                              type="radio"
                              name="5"
                              id="5-empreendedor"
                              value={"PNCF - Empreendedor"}
                              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                            <label
                              htmlFor="5-empreendedor"
                              className="block text-sm font-normal leading-6 text-gray-900"
                            >
                              PNCF - Empreendedor (Renda Anual de até R$
                              299.890,63 e Patrimônio de até R$ 500 mil).
                            </label>
                          </div>
                          <div className="flex items-center gap-x-3">
                            <input
                              type="radio"
                              name="5"
                              id="5-acima"
                              value={"renda anual acima de R$ 299,890,63"}
                              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                            <label
                              htmlFor="5-acima"
                              className="block text-sm font-normal leading-6 text-gray-900"
                            >
                              Tenho renda anual acima de R$ 299,890,63 - Não me
                              enquadro em nenhuma das opções.
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="sm:col-span-full">
                        <legend className="text-sm font-semibold leading-6 text-gray-900">
                          6. Você é funcionário público?
                        </legend>
                        <div className="mt-6 space-y-6">
                          <div className="flex items-center gap-x-3">
                            <input
                              name="6"
                              id="6-sim"
                              type="radio"
                              value={"Sim"}
                              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                            <label
                              htmlFor="6-sim"
                              className="block text-sm font-normal leading-6 text-gray-900"
                            >
                              Sim
                            </label>
                          </div>
                          <div className="flex items-center gap-x-3">
                            <input
                              name="6"
                              id="6-nao"
                              type="radio"
                              value={"Nao"}
                              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                            <label
                              htmlFor="6-nao"
                              className="block text-sm font-normal leading-6 text-gray-900"
                            >
                              Não
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="sm:col-span-full">
                        <legend className="text-sm font-semibold leading-6 text-gray-900">
                          7. Você já foi assentado da reforma agrária, ou
                          participou de algum programa que tenha recursos do
                          Fundo de Terras da Reforma Agrária?
                        </legend>
                        <div className="mt-6 space-y-6">
                          <div className="flex items-center gap-x-3">
                            <input
                              name="7"
                              type="radio"
                              id="7-sim"
                              value={"Sim"}
                              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                            <label
                              htmlFor="7-sim"
                              className="block text-sm font-normal leading-6 text-gray-900"
                            >
                              Sim
                            </label>
                          </div>
                          <div className="flex items-center gap-x-3">
                            <input
                              name="7"
                              id="7-nao"
                              type="radio"
                              value={"Nao"}
                              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                            <label
                              htmlFor="7-nao"
                              className="block text-sm font-normal leading-6 text-gray-900"
                            >
                              Não
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <fieldset className="mt-10">
                      <legend className="text-sm font-semibold leading-6 text-gray-900">
                        8. Marque quais dos documentos listados abaixo você
                        possui ou já possuiu nos últimos 15 anos que seja
                        possÍvel localizar e contabilizar pelo menos 5 anos
                        (pode marcar mais de 1)
                      </legend>
                      <div className="mt-6 space-y-6">
                        <div className="relative flex gap-x-3">
                          <div className="flex h-6 items-center">
                            <input
                              id="8-doc1"
                              name="8-doc1"
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                          </div>
                          <div className="text-sm leading-6">
                            <label
                              htmlFor="8-doc1"
                              className="font-normal text-gray-900"
                            >
                              Comprovante de matrícula ou ficha de insc. em
                              escola rural, ata ou boletim escolar do
                              trabalhador ou dos filhos.
                            </label>
                          </div>
                        </div>
                        <div className="relative flex gap-x-3">
                          <div className="flex h-6 items-center">
                            <input
                              id="8-doc2"
                              name="8-doc2"
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                          </div>
                          <div className="text-sm leading-6">
                            <label
                              htmlFor="8-doc2"
                              className="font-normal text-gray-900"
                            >
                              Ficha de associado em cooperativa.
                            </label>
                          </div>
                        </div>
                        <div className="relative flex gap-x-3">
                          <div className="flex h-6 items-center">
                            <input
                              id="8-doc3"
                              name="8-doc3"
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                          </div>
                          <div className="text-sm leading-6">
                            <label
                              htmlFor="8-doc3"
                              className="font-normal text-gray-900"
                            >
                              Comprovante de participação como beneficiário em
                              programas governamentais para areas, rurais do
                              estado ou do município.
                            </label>
                          </div>
                        </div>
                        <div className="relative flex gap-x-3">
                          <div className="flex h-6 items-center">
                            <input
                              id="8-doc4"
                              name="8-doc4"
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                          </div>
                          <div className="text-sm leading-6">
                            <label
                              htmlFor="8-doc4"
                              className="font-normal text-gray-900"
                            >
                              Comprovante de recebimento de assistencia ou de
                              acompanhamento de empresa de assistência técnica e
                              extensão rural.
                            </label>
                          </div>
                        </div>
                        <div className="relative flex gap-x-3">
                          <div className="flex h-6 items-center">
                            <input
                              id="8-doc5"
                              name="8-doc5"
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                          </div>
                          <div className="text-sm leading-6">
                            <label
                              htmlFor="8-doc5"
                              className="font-normal text-gray-900"
                            >
                              Escritura pública de imóvel rural
                            </label>
                          </div>
                        </div>
                        <div className="relative flex gap-x-3">
                          <div className="flex h-6 items-center">
                            <input
                              id="8-doc6"
                              name="8-doc6"
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                          </div>
                          <div className="text-sm leading-6">
                            <label
                              htmlFor="8-doc6"
                              className="font-normal text-gray-900"
                            >
                              Recibo de pagamento de contribuição federativa ou
                              confederativa.
                            </label>
                          </div>
                        </div>
                        <div className="relative flex gap-x-3">
                          <div className="flex h-6 items-center">
                            <input
                              id="8-doc7"
                              name="8-doc7"
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                          </div>
                          <div className="text-sm leading-6">
                            <label
                              htmlFor="8-doc7"
                              className="font-normal text-gray-900"
                            >
                              Registro de processos administrativos ou
                              judiciais, inclusive inqueritos, como testemunha,
                              autor ou réu.
                            </label>
                          </div>
                        </div>
                        <div className="relative flex gap-x-3">
                          <div className="flex h-6 items-center">
                            <input
                              id="8-doc8"
                              name="8-doc8"
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                          </div>
                          <div className="text-sm leading-6">
                            <label
                              htmlFor="8-doc8"
                              className="font-normal text-gray-900"
                            >
                              Ficha de registro em livros de casas de saúde,
                              hospitais, postos de saúde, ou do programa dos
                              agentes comunitários de saúde.
                            </label>
                          </div>
                        </div>
                        <div className="relative flex gap-x-3">
                          <div className="flex h-6 items-center">
                            <input
                              id="8-doc9"
                              name="8-doc9"
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                          </div>
                          <div className="text-sm leading-6">
                            <label
                              htmlFor="8-doc9"
                              className="font-normal text-gray-900"
                            >
                              Carteira de Vacinação (com endereço rural).
                            </label>
                          </div>
                        </div>
                        <div className="relative flex gap-x-3">
                          <div className="flex h-6 items-center">
                            <input
                              id="8-doc10"
                              name="8-doc10"
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                          </div>
                          <div className="text-sm leading-6">
                            <label
                              htmlFor="8-doc10"
                              className="font-normal text-gray-900"
                            >
                              Título de propriedade de imóvel rural.
                            </label>
                          </div>
                        </div>
                        <div className="relative flex gap-x-3">
                          <div className="flex h-6 items-center">
                            <input
                              id="8-doc11"
                              name="8-doc11"
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                          </div>
                          <div className="text-sm leading-6">
                            <label
                              htmlFor="8-doc11"
                              className="font-normal text-gray-900"
                            >
                              Recibo ou nota fiscal de compra de implementos ou
                              de insumos agrícolas.
                            </label>
                          </div>
                        </div>
                        <div className="relative flex gap-x-3">
                          <div className="flex h-6 items-center">
                            <input
                              id="8-doc12"
                              name="8-doc12"
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                          </div>
                          <div className="text-sm leading-6">
                            <label
                              htmlFor="8-doc12"
                              className="font-normal text-gray-900"
                            >
                              Publicação na impresa ou informativos de
                              circulação pública.
                            </label>
                          </div>
                        </div>
                        <div className="relative flex gap-x-3">
                          <div className="flex h-6 items-center">
                            <input
                              id="8-doc13"
                              name="8-doc13"
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                          </div>
                          <div className="text-sm leading-6">
                            <label
                              htmlFor="8-doc13"
                              className="font-normal text-gray-900"
                            >
                              Registro em documentos de associações de
                              produtores rurais, comunitárias, recreativas,
                              desportivas ou religiosas.
                            </label>
                          </div>
                        </div>
                        <div className="relative flex gap-x-3">
                          <div className="flex h-6 items-center">
                            <input
                              id="8-doc14"
                              name="8-doc14"
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                          </div>
                          <div className="text-sm leading-6">
                            <label
                              htmlFor="8-doc14"
                              className="font-normal text-gray-900"
                            >
                              Carteira de trabalho (quanto possuir vínculo CLT)
                            </label>
                          </div>
                        </div>
                        <div className="relative flex gap-x-3">
                          <div className="flex h-6 items-center">
                            <input
                              id="8-doc15"
                              name="8-doc15"
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                          </div>
                          <div className="text-sm leading-6">
                            <label
                              htmlFor="8-doc15"
                              className="font-normal text-gray-900"
                            >
                              Título de Aforamento
                            </label>
                          </div>
                        </div>
                        <div className="relative flex gap-x-3">
                          <div className="flex h-6 items-center">
                            <input
                              id="8-doc16"
                              name="8-doc16"
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                          </div>
                          <div className="text-sm leading-6">
                            <label
                              htmlFor="8-doc16"
                              className="font-normal text-gray-900"
                            >
                              Declaração de aptidão ao Pronaf (DAP) ou Cadastro
                              de agricultura familiar (CAF) - Atualizadas ou
                              antigas (expiradas).
                            </label>
                          </div>
                        </div>
                        <div className="relative flex gap-x-3">
                          <div className="flex h-6 items-center">
                            <input
                              id="8-doc17"
                              name="8-doc17"
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                          </div>
                          <div className="text-sm leading-6">
                            <label
                              htmlFor="8-doc17"
                              className="font-normal text-gray-900"
                            >
                              Contratos firmados e registrados de
                              arrendamento,parcerias,meação ou posseiros.
                            </label>
                          </div>
                        </div>
                        <div className="relative flex gap-x-3">
                          <div className="flex h-6 items-center">
                            <input
                              id="8-doc18"
                              name="8-doc18"
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                          </div>
                          <div className="text-sm leading-6">
                            <label
                              htmlFor="8-doc18"
                              className="font-normal text-gray-900"
                            >
                              Não possuo e não possuí nos últimos 15 anos nenhum
                              dos documentos listados acima.
                            </label>
                          </div>
                        </div>
                      </div>
                    </fieldset>
                  </div>
                  <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
                    <button
                      type="button"
                      className="text-sm font-semibold leading-6 px-3 py-1.5 text-gray-900 hover:bg-red-600 rounded-md hover:text-white"
                      onClick={onClose}
                    >
                      Cancelar
                    </button>
                    <SubmitButton
                      formAction={submitEnquadramentoForm}
                      className="flex  justify-center rounded-md bg-orange-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
                      pendingText="Salvando..."
                    >
                      Salvar
                    </SubmitButton>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
