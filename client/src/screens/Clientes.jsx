import { useMemo, useState, useRef} from "react";
import { Search } from "lucide-react";

import { Filtro } from "../components/Filtro";
import { Tabela } from "../components/tabela/Tabela";

import { filtrar } from "../utils/filtrar"
import { buscar } from "../utils/buscar";

import { useAPI } from "../hooks/useAPI";

const colunas = [
  { chave: "nome", label: "Nome", ordenavel: true, tipo: "texto" },
  { chave: "idade", label: "Idade", ordenavel: true, tipo: "numero" },
  { chave: "observacao", label: "Observação", ordenavel: false, tipo: "texto" },
  { chave: "tipo", label: "Tipo Cliente", ordenavel: false, tipo: "texto" },
  { chave: "negociosFechados", label: "Negócios Fechados", ordenavel: true, tipo: "numero" },
  { chave: "status", label: "Status", ordenavel: false, tipo: "texto" }
];

export default function Clientes() {
  const [busca, setBusca] = useState("");
  const [filtrado, setFiltrado] = useState({nome: ""});
  const tempoDigitacao = useRef(null);
  const { dados: clientes, carregando, erro } = useAPI("/mock/clientes.json");

  const dados = useMemo(() => {
    if (!clientes || clientes.length === 0) return [];

    if (!busca) 
      return filtrar([...clientes], filtrado);

    return buscar([...clientes], "nome", busca);
  },  [filtrado, busca, clientes]);

  if (carregando) return <p>Carregando clientes...</p>;
  if (erro) return <p>Erro ao carregar clientes: {erro.message}</p>;
  if (!clientes || clientes.length === 0) return <p>Nenhum cliente encontrado.</p>;

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