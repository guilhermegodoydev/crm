import { useMemo, useState, useRef} from "react";
import { Link } from 'react-router-dom';
import { Pen } from "lucide-react";

import { Filtro } from "../../components/Filtro";
import { Tabela } from "../../components/tabela/TabelaBase";
import { BarraBusca } from "../../components/BarraBusca";

import { filtrar } from "../../utils/filtrar"
import { buscar } from "../../utils/buscar";

import { useTela } from "../../context/TelaContexto";

import { useCliente } from "../../hooks/dominio/useCliente";

const colunas = [
  { chave: "nome", label: "Nome", ordenavel: true, tipo: "texto", className: "font-semibold" },
  { chave: "idade", label: "Idade", ordenavel: true, tipo: "numero" },
  { chave: "observacao", label: "Observação", ordenavel: false, tipo: "texto" },
  { chave: "categoria", label: "Categoria", ordenavel: false, tipo: "texto"},
  { chave: "tipo", label: "Tipo", ordenavel: false, tipo: "texto" },
  { chave: "negociosFechados", label: "Negócios Fechados", ordenavel: true, tipo: "numero" },
  { chave: "status", label: "Status", ordenavel: false, tipo: "texto" },
  { chave: "acoes", label: "Ações", ordenavel: false, tipo: "texto", className: "text-center", 
    children: (item) => (
      <Link to={`${item.id}`} className="inline-flex p-1 rounded border-blue-700 hover:bg-white" title={`Editar ${item.nome}`}>
        <Pen className="text-gray-600 scale-85"/>
      </Link>
    )
  }
];

export default function ClientesIndex() {
  const [busca, setBusca] = useState("");
  const [filtrado, setFiltrado] = useState({nome: ""});
  const tempoDigitacao = useRef(null);
  const { clientes, carregando, erro } = useCliente();
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
        {texto: "Pessoa Física", valor: "PF"},
        {texto: "Empresarial", valor: "PJ"}
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
        <div className="space-y-5 bg-gray-50">
          {dados.length === 0 ? <p>Nenhum dado Encontrado</p> : dados.map((cliente) => (
            <div key={cliente.id} className="items-center shadow-md rounded-md p-2 bg-white border-1 border-gray-200">
              <div className="flex justify-between mb-3">
                <h3>{cliente["nome"]}</h3>
                <Link to={String(cliente.id)}>
                  <Pen className="inline"/>
                </Link>
              </div>
              <div className="flex gap-20">
                <div>
                  <p className="text-gray-500">
                    Status: 
                    <span className="font-semibold text-black">{cliente["status"]}</span>
                  </p>
                  <p className="text-gray-500">
                    Tipo: 
                    <span className="font-semibold text-black">{cliente["tipo"]}</span>
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">
                    Categoria: 
                    <span className="font-semibold text-black">{cliente["categoria"]}</span>
                  </p>
                  <p className="text-gray-500">
                    Negócios Fechados: 
                    <span className="font-semibold text-black">{cliente["negociosFechados"]}</span>  
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      }
    </section>
  );
}