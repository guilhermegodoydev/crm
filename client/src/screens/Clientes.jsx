import { useMemo, useState, useRef} from "react";
import Filtro from "../components/Filtro.jsx";
import { Tabela } from "../components/tabela";
import { filtrar, buscar } from "../utils";
import { Search } from "lucide-react";

const clientes = [
  {
    id: 1,
    nome: "Amanda Costa",
    idade: 28,
    observacao: "Compra com frequência produtos em promoção.",
    tipo: "Pessoa Física",
    categoria: "regular",
    negociosFechados: 12,
    status: "ativo"
  },
  {
    id: 2,
    nome: "Bruno Lima",
    idade: 45,
    observacao: "Tem alto ticket médio e prefere lançamentos.",
    tipo: "Pessoa Física",
    categoria: "vip",
    negociosFechados: 27,
    status: "ativo"
  },
  {
    id: 3,
    nome: "Carla Mendes",
    idade: 34,
    observacao: "Costuma comprar sazonalmente, principalmente no final do ano.",
    tipo: "Pessoa Física",
    categoria: "regular",
    negociosFechados: 8,
    status: "ativo"
  },
  {
    id: 4,
    nome: "Daniel Rocha",
    idade: 51,
    observacao: "Fechou pacotes de serviços anuais nos últimos 3 anos.",
    tipo: "Pessoa Física",
    categoria: "vip",
    negociosFechados: 22,
    status: "inativo"
  },
  {
    id: 5,
    nome: "Elaine Souza",
    idade: 39,
    observacao: "Interessada em soluções sustentáveis e ecológicas.",
    tipo: "Pessoa Física",
    categoria: "regular",
    negociosFechados: 9,
    status: "ativo"
  },
  {
    id: 6,
    nome: "Felipe Oliveira",
    idade: 26,
    observacao: "Ativo nas redes sociais e responde bem a campanhas de e-mail.",
    tipo: "Pessoa Física",
    categoria: "vip",
    negociosFechados: 18,
    status: "inativo"
  },
  {
    id: 7,
    nome: "Gabriela Martins",
    idade: 31,
    observacao: "Costuma comprar por indicação de influenciadores.",
    tipo: "Pessoa Física",
    categoria: "regular",
    negociosFechados: 6,
    status: "ativo"
  },
  {
    id: 8,
    nome: "Henrique Silva",
    idade: 58,
    observacao: "Valoriza atendimento personalizado e suporte rápido.",
    tipo: "Empresarial",
    categoria: "vip",
    negociosFechados: 30,
    status: "ativo"
  },
  {
    id: 9,
    nome: "Isabela Torres",
    idade: 23,
    observacao: "Procura sempre opções com parcelamento.",
    tipo: "Empresarial",
    categoria: "regular",
    negociosFechados: 5,
    status: "inativo"
  },
  {
    id: 10,
    nome: "João Batista",
    idade: 47,
    observacao: "Aumentou a frequência de compras nos últimos 6 meses.",
    tipo: "Empresarial",
    categoria: "vip",
    negociosFechados: 24,
    status: "inativo"
  },
  {
    id: 11,
    nome: "Karina Lopes",
    idade: 36,
    observacao: "Participa de programas de fidelidade.",
    tipo: "Pessoa Física",
    categoria: "vip",
    negociosFechados: 21,
    status: "inativo"
  },
  {
    id: 12,
    nome: "Leandro Cunha",
    idade: 29,
    observacao: "Demonstra interesse por combos e kits promocionais.",
    tipo: "Empresarial",
    categoria: "regular",
    negociosFechados: 11,
    status: "ativo"
  },
  {
    id: 13,
    nome: "Mariana Teixeira",
    idade: 41,
    observacao: "Tem alto volume de compras corporativas.",
    tipo: "Pessoa Física",
    categoria: "vip",
    negociosFechados: 28,
    status: "ativo"
  },
  {
    id: 14,
    nome: "Nicolas Ribeiro",
    idade: 33,
    observacao: "Fez upgrade de plano duas vezes no último ano.",
    tipo: "Pessoa Física",
    categoria: "vip",
    negociosFechados: 25,
    status: "inativo"
  },
  {
    id: 15,
    nome: "Olívia Fernandes",
    idade: 37,
    observacao: "Prefere compras presenciais, mesmo com canal digital disponível.",
    tipo: "Pessoa Física",
    categoria: "regular",
    negociosFechados: 10,
    status: "ativo"
  },
  {
    id: 16,
    nome: "Paulo Henrique",
    idade: 60,
    observacao: "Cliente antigo, valoriza estabilidade e confiança.",
    tipo: "Pessoa Física",
    categoria: "vip",
    negociosFechados: 29,
    status: "ativo"
  },
  {
    id: 17,
    nome: "Quésia Barros",
    idade: 22,
    observacao: "Primeira compra recente, ainda em fase de onboarding.",
    tipo: "Pessoa Física",
    categoria: "regular",
    negociosFechados: 5,
    status: "inativo"
  },
  {
    id: 18,
    nome: "Ricardo Almeida",
    idade: 50,
    observacao: "Atende a várias unidades da empresa.",
    tipo: "Pessoa Física",
    categoria: "vip",
    negociosFechados: 26,
    status: "ativo"
  },
  {
    id: 19,
    nome: "Sara Nunes",
    idade: 40,
    observacao: "Reduziu consumo após mudança de gestor.",
    tipo: "Empresarial",
    categoria: "regular",
    negociosFechados: 7,
    status: "ativo"
  },
  {
    id: 20,
    nome: "Thiago Moreira",
    idade: 35,
    observacao: "Interesse em parcerias de longo prazo.",
    tipo: "Pessoa Física",
    categoria: "vip",
    negociosFechados: 20,
    status: "ativo"
  }
];

const colunas = [
  { chave: "nome", label: "Nome", ordenavel: true, tipo: "texto" },
  { chave: "idade", label: "Idade", ordenavel: true, tipo: "numero" },
  { chave: "observacao", label: "Observação", ordenavel: false, tipo: "texto" },
  { chave: "tipo", label: "Tipo Cliente", ordenavel: false, tipo: "texto" },
  { chave: "negociosFechados", label: "Negócios Fechados", ordenavel: true, tipo: "numero" },
  { chave: "status", label: "Status", ordenavel: false, tipo: "texto" }
];

const contarQtCli = (categoria) => {
    if (!categoria)
      return clientes.length;
    else 
      return clientes.filter(cli => cli.categoria.toLowerCase() === categoria.toLowerCase()).length;
}

const cardsMetricas = [
  {
    titulo: "Clientes",
    valor: contarQtCli(),
    taxaCrescimento: 35
  },
  {
    titulo: "Regular",
    valor: contarQtCli("regular"),
    taxaCrescimento: 20
  },
  {
    titulo: "Vips",
    valor: contarQtCli("vip"),
    taxaCrescimento: -15
  }
];

export default function Clientes() {
  const [busca, setBusca] = useState("");
  const [filtrado, setFiltrado] = useState({nome: ""});
  const tempoDigitacao = useRef(null);

  const handleFiltroOnChange = (campo, valor) => {
    setFiltrado(prev => ({...prev, [campo]: valor}));
  };

  const handleBusca = (valor) => {
    if (tempoDigitacao.current) 
      clearTimeout(tempoDigitacao.current)

    tempoDigitacao.current = setTimeout(() => {
      setBusca(valor);
    }, 500);
  };

  const filtros = [
    {
      label: "Categoria:",
      nome: "categoriaCliente",
      onChange: (e) => handleFiltroOnChange("categoria", e.target.value),
      opcoes: [
        {texto: "Não Filtrar", valor: ""},
        {texto: "Regular", valor: "regular"},
        {texto: "Vip", valor: "vip"}
      ]
    },
    {
      label: "Status:",
      nome: "stCliente",
      onChange: (e) => handleFiltroOnChange("status", e.target.value),
      opcoes: [
        {texto: "Não Filtrar", valor: ""},
        {texto: "Ativo", valor: "ativo"},
        {texto: "Inativo", valor: "inativo"}
      ]
    },
    {
      label: "Tipo:",
      nome: "tipoCliente",
      onChange: (e) => handleFiltroOnChange("tipo", e.target.value),
      opcoes: [
        {texto: "Não Filtrar", valor: ""},
        {texto: "Pessoa Física", valor: "Pessoa Física"},
        {texto: "Empresarial", valor: "Empresarial"}
      ]
    }
  ];

  const dados = useMemo(() => {
    if (!busca) 
      return filtrar([...clientes], filtrado);

    return buscar([...clientes], "nome", busca);
  },  [filtrado, busca]);

  return (
    <section>
      <div className="flex gap-3 p-1 rounded-md shadow-md border-1 border-gray-300 mb-5">
        <Search/>
        <input 
          type="text" 
          name="buscar" 
          id="buscar" 
          placeholder="Nome cliente" 
          className="w-full"
          onChange={e => handleBusca(e.target.value)}
        />
      </div>


      <div className="flex gap-10 mb-3">
        {filtros.map(fil => (
          <Filtro
            id={`filtro-${fil.nome}`}
            nome={fil.nome}
            label={fil.label}
            onChange={fil.onChange}
            opcoes={fil.opcoes}
          />
        ))}
      </div>

      
      <div className="max-h-[72vh] overflow-y-auto rounded-md shadow-md">
        <Tabela dadosTabela={dados} colunas={colunas} />
      </div>
    </section>
  );
}