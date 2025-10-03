import CabecalhoOrdenavel from "../components/CabecalhoOrdenavel.jsx";
import ordenar from "../utils/ordenar.js";
import filtrar from "../utils/filtrar.js";
import { useMemo, useState } from "react";
import Filtro from "../components/Filtro.jsx";

const clientes = [
  {
    id: 1,
    nome: "Amanda Costa",
    idade: 28,
    observacao: "Compra com frequência produtos em promoção.",
    tipoCliente: "regular",
    negociosFechados: 12,
    status: "ativo",
    origem: "Não especificado"
  },
  {
    id: 2,
    nome: "Bruno Lima",
    idade: 45,
    observacao: "Tem alto ticket médio e prefere lançamentos.",
    tipoCliente: "vip",
    negociosFechados: 27,
    status: "ativo",
    origem: "site"
  },
  {
    id: 3,
    nome: "Carla Mendes",
    idade: 34,
    observacao: "Costuma comprar sazonalmente, principalmente no final do ano.",
    tipoCliente: "regular",
    negociosFechados: 8,
    status: "ativo",
    origem: "site"
  },
  {
    id: 4,
    nome: "Daniel Rocha",
    idade: 51,
    observacao: "Fechou pacotes de serviços anuais nos últimos 3 anos.",
    tipoCliente: "vip",
    negociosFechados: 22,
    status: "inativo",
    origem: "redes sociais"
  },
  {
    id: 5,
    nome: "Elaine Souza",
    idade: 39,
    observacao: "Interessada em soluções sustentáveis e ecológicas.",
    tipoCliente: "regular",
    negociosFechados: 9,
    status: "lead",
    origem: "redes sociais"
  },
  {
    id: 6,
    nome: "Felipe Oliveira",
    idade: 26,
    observacao: "Ativo nas redes sociais e responde bem a campanhas de e-mail.",
    tipoCliente: "vip",
    negociosFechados: 18,
    status: "lead",
    origem: "redes sociais"
  },
  {
    id: 7,
    nome: "Gabriela Martins",
    idade: 31,
    observacao: "Costuma comprar por indicação de influenciadores.",
    tipoCliente: "regular",
    negociosFechados: 6,
    status: "lead",
    origem: "indicação"
  },
  {
    id: 8,
    nome: "Henrique Silva",
    idade: 58,
    observacao: "Valoriza atendimento personalizado e suporte rápido.",
    tipoCliente: "vip",
    negociosFechados: 30,
    status: "lead",
    origem: "site"
  },
  {
    id: 9,
    nome: "Isabela Torres",
    idade: 23,
    observacao: "Procura sempre opções com parcelamento.",
    tipoCliente: "regular",
    negociosFechados: 5,
    status: "inativo",
    origem: "redes sociais"
  },
  {
    id: 10,
    nome: "João Batista",
    idade: 47,
    observacao: "Aumentou a frequência de compras nos últimos 6 meses.",
    tipoCliente: "vip",
    negociosFechados: 24,
    status: "inativo",
    origem: "site"
  },
  {
    id: 11,
    nome: "Karina Lopes",
    idade: 36,
    observacao: "Participa de programas de fidelidade.",
    tipoCliente: "vip",
    negociosFechados: 21,
    status: "lead",
    origem: "evento"
  },
  {
    id: 12,
    nome: "Leandro Cunha",
    idade: 29,
    observacao: "Demonstra interesse por combos e kits promocionais.",
    tipoCliente: "regular",
    negociosFechados: 11,
    status: "ativo",
    origem: "indicação"
  },
  {
    id: 13,
    nome: "Mariana Teixeira",
    idade: 41,
    observacao: "Tem alto volume de compras corporativas.",
    tipoCliente: "vip",
    negociosFechados: 28,
    status: "ativo",
    origem: "evento"
  },
  {
    id: 14,
    nome: "Nicolas Ribeiro",
    idade: 33,
    observacao: "Fez upgrade de plano duas vezes no último ano.",
    tipoCliente: "vip",
    negociosFechados: 25,
    status: "inativo",
    origem: "evento"
  },
  {
    id: 15,
    nome: "Olívia Fernandes",
    idade: 37,
    observacao: "Prefere compras presenciais, mesmo com canal digital disponível.",
    tipoCliente: "regular",
    negociosFechados: 10,
    status: "lead",
    origem: "indicação"
  },
  {
    id: 16,
    nome: "Paulo Henrique",
    idade: 60,
    observacao: "Cliente antigo, valoriza estabilidade e confiança.",
    tipoCliente: "vip",
    negociosFechados: 29,
    status: "lead",
    origem: "site"
  },
  {
    id: 17,
    nome: "Quésia Barros",
    idade: 22,
    observacao: "Primeira compra recente, ainda em fase de onboarding.",
    tipoCliente: "regular",
    negociosFechados: 5,
    status: "inativo",
    origem: "campanha no X"
  },
  {
    id: 18,
    nome: "Ricardo Almeida",
    idade: 50,
    observacao: "Atende a várias unidades da empresa.",
    tipoCliente: "vip",
    negociosFechados: 26,
    status: "ativo",
    origem: "site"
  },
  {
    id: 19,
    nome: "Sara Nunes",
    idade: 40,
    observacao: "Reduziu consumo após mudança de gestor.",
    tipoCliente: "regular",
    negociosFechados: 7,
    status: "ativo",
    origem: "site"
  },
  {
    id: 20,
    nome: "Thiago Moreira",
    idade: 35,
    observacao: "Interesse em parcerias de longo prazo.",
    tipoCliente: "vip",
    negociosFechados: 20,
    status: "lead",
    origem: "site"
  }
];

export default function Clientes() {
  const [ordenado, setOrdenado] = useState({campo: "nome", ativo: false});
  const [filtrado, setFiltrado] = useState({tipoCliente: "", status: ""});

  const alterarCampo = (campo) => {
    setOrdenado((prev) => ({
      campo: campo,
      ativo: prev.campo === campo ? !prev.ativo : true
    }));
    if (ordenado.campo == campo) 
      setOrdenado({campo: campo, ativo: !ordenado.ativo});
    else 
      setOrdenado({campo: campo, ativo: true});
  };

  const dados = useMemo(() => {
    let tipoOrdenacao = ordenado.ativo ? "asc" : "desc";

    let resultado = ordenar([...clientes], ordenado.campo, tipoOrdenacao);

    resultado = filtrar(resultado, filtrado)

    return resultado;
  }, [ordenado, filtrado]);

  const filtros = [
    {
      label: "Tipo do Cliente:",
      id: "tCliente",
      nome: "tCliente",
      onChange: (e) => setFiltrado((prev) => ({...filtrado, tipoCliente: e.target.value})),
      opcoes: [
        {texto: "Não Filtrar", valor: ""},
        {texto: "Regular", valor: "regular"},
        {texto: "Vip", valor: "vip"}
      ]
    },
    {
      label: "Status:",
      id: "stCliente",
      nome: "stCliente",
      onChange: (e) => setFiltrado((prev) => ({...prev, status: e.target.value})),
      opcoes: [
        {texto: "Não Filtrar", valor: ""},
        {texto: "Ativo", valor: "ativo"},
        {texto: "Inativo", valor: "inativo"},
        {texto: "Lead", valor: "lead"}
      ]
    },
    {
      label: "Origem",
      id: "orCliente",
      nome: "orCliente",
      onChange: (e) => setFiltrado((prev) => ({...prev, origem: e.target.value})),
      opcoes : [
        {texto: "Não Filtrar", valor: ""},
        {texto: "Site", valor: "Site"},
        {texto: "Evento", valor: "Evento"},
        {texto: "Rede Social", valor: "Rede social"},
        {texto: "Indicação", valor: "Indicação"},
        {texto: "Não especificado" , valor: "Não especificado"}
      ]
    }
  ];

  return (
      <section>
        <div className="flex gap-10 mb-5">
          {filtros.map(f => (
            <Filtro
              id={f.id}
              nome={f.nome}
              label={f.label}
              onChange={f.onChange}
              opcoes={f.opcoes}
            />
          ))}
        </div>
          <table className="w-full shadow-md">
              <thead className="text-white bg-blue-500">
                  <tr>
                      <CabecalhoOrdenavel
                          titulo="Nome"
                          ordenado = {ordenado.campo === "nome" ? ordenado.ativo : false}
                          tipo={"texto"}
                          direcao = {ordenado.campo === "nome" ? (ordenado.ativo ? "asc" : "desc"): null}
                          onClick={() => alterarCampo("nome")}
                          ariaLabel = "Clique para ordenar os nomes em A-Z ou Z-A"
                      />
                      <CabecalhoOrdenavel
                          titulo="Idade"
                          ordenado = {ordenado.campo === "idade" ? ordenado.ativo : false}
                          tipo="numero"
                          direcao = {ordenado.campo === "idade" ? (ordenado.ativo ? "asc" : "desc"): null}
                          onClick={() => alterarCampo("idade")}
                          ariaLabel = "Clique para ordenar a idade"
                      />
                      <th>Observação</th>
                      <th>Tipo Cliente</th>
                      <CabecalhoOrdenavel
                          titulo="Negócios Fechados"
                          ordenado = {ordenado.campo === "negociosFechados" ? ordenado.ativo : false}
                          tipo="numero"
                          direcao = {ordenado.campo === "negociosFechados" ? (ordenado.ativo ? "asc" : "desc"): null}
                          onClick={() => alterarCampo("negociosFechados")}
                          ariaLabel="Clique para ordenar a quantidade de negócios fechados"
                      />
                      <th>Status</th>
                      <th>Origem</th>
                  </tr>
              </thead>
              <tbody>
                  {dados && dados.length > 0 ? dados.map((cli, index) => (
                      <tr key={cli.id} className={`border border-gray-300 ${index % 2 === 0 ? "bg-gray-100": "bg-gray-300"}`}>
                          <td className="pl-3">{cli.nome}</td>
                          <td className="text-center px-10">{cli.idade}</td>
                          <td>{cli.observacao}</td>
                          <td className="text-center">{cli.tipoCliente}</td>
                          <td className="text-center">{cli.negociosFechados}</td>
                          <td>{cli.status}</td>
                          <td>{cli.origem}</td>
                      </tr>
                  )) : <tr><td colSpan={7} className="text-center py-3 text-gray-500">Nenhum Clientes Encontrado</td></tr>}
              </tbody>
          </table>
      </section>
  )
}