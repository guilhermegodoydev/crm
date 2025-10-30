import { useMemo, useState, useRef} from "react";

import { Filtro } from "../components/Filtro";
import { Tabela } from "../components/tabela/Tabela";
import { BarraBusca } from "../components/BarraBusca";

import { filtrar } from "../utils/filtrar"
import { buscar } from "../utils/buscar";

import { useAPI } from "../hooks/useAPI";

import { useTela } from "../context/TelaContexto";

const colunas = [
  { chave: "nome", label: "Nome", ordenavel: true, tipo: "texto" },
  { chave: "idade", label: "Idade", ordenavel: true, tipo: "numero" },
  { chave: "observacao", label: "Observação", ordenavel: false, tipo: "texto" },
  { chave: "categoria", label: "Categoria", ordenavel: false, tipo: "texto"},
  { chave: "tipo", label: "Tipo", ordenavel: false, tipo: "texto" },
  { chave: "negociosFechados", label: "Negócios Fechados", ordenavel: true, tipo: "numero" },
  { chave: "status", label: "Status", ordenavel: false, tipo: "texto" }
];

export default function Clientes() {
  const [busca, setBusca] = useState("");
  const [filtrado, setFiltrado] = useState({nome: ""});
  const tempoDigitacao = useRef(null);
  const { dados: clientes, carregando, erro } = useAPI("/mock/clientes.json");
  const { desktop } = useTela();
   
  const dados = useMemo(() => {
    if (!clientes || clientes.length === 0) return [];

    if (busca) {
      let resultadoBusca = buscar([...clientes], "nome", busca);

      if (resultadoBusca.length > 1) {
        return filtrar(resultadoBusca, filtrado)
      }

      return resultadoBusca;
    }
    else {
      return filtrar([...clientes], filtrado);
    }
  }, [filtrado, busca, clientes]);

  const handleFiltroOnChange = (campo, valor) => {
    setFiltrado(prev => ({...prev, [campo]: valor}));
  };

  const handleBusca = (valor) => {
    if (tempoDigitacao.current) 
      clearTimeout(tempoDigitacao.current)

    tempoDigitacao.current = setTimeout(() => {
      setBusca(valor);
    }, 800);
  };

  const filtros = [
    {
      id: 1,
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
      id: 2,
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
      id: 3,
      label: "Tipo:",
      nome: "tipoCliente",
      onChange: (e) => handleFiltroOnChange("tipo", e.target.value),
      opcoes: [
        {texto: "Não Filtrar", valor: ""},
        {texto: "Pessoa Física", valor: "Pessoa Física"},
        {texto: "Empresarial", valor: "Empresarial"}
      ]
    },
  ];

  if (carregando) return <p>Carregando clientes...</p>;
  if (erro) return <p>Erro ao carregar clientes: {erro.message}</p>;
  if (!clientes || clientes.length === 0) return <p>Nenhum cliente encontrado.</p>;
  
  return (
    <section>
      <BarraBusca placeholder="Digite o nome do cliente" onChange={(e) => handleBusca(e.target.value)}/>

      <div className="flex lg:gap-10 gap-5 mb-3 lg:flex-no-wrap flex-wrap">
        {filtros.map(fil => (
          <Filtro
            key={`filtro-${fil.id}`}
            id={`filtro-${fil.nome}`}
            nome={fil.nome}
            label={fil.label}
            onChange={fil.onChange}
            opcoes={fil.opcoes}
          />
        ))}
      </div>

      {desktop ? 
        <div className="max-h-[72vh] overflow-y-auto rounded-md shadow-md">
          <Tabela dadosTabela={dados} colunas={colunas} />
        </div>
        :
        <div className="space-y-5">
          {dados.length === 0 ? <p>Nenhum dado Encontrado</p> : dados.map((cliente) => (
            <div className="flex gap-5 items-center shadow rounded-md p-2">
              <img className="size-10" src="src/assets/perfil.png" alt="" />
              <div>
                <h3>{cliente["nome"]}</h3>
                <div className="flex gap-20">
                  <div>
                    <p>Status: {cliente["status"]}</p>
                    <p>Tipo: {cliente["tipo"]}</p>
                  </div>
                  <div>
                    <p>Categoria: {cliente["categoria"]}</p>
                    <p>Negócios Fechados: {cliente["negociosFechados"]}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      }
    </section>
  );
}