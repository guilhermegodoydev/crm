import { useEffect, useState, useRef, Children } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Plus, Trash2 } from "lucide-react";

import { Card } from "../../components/Card";
import { Tabela } from "../../components/tabela/TabelaBase";

import { useCliente } from "../../hooks/dominio/useCliente";
import { Modal } from "../../components/Modal";
import { useAlerta } from "../../context/AlertaContexto";

const dadosCli = [
    { label: "Nome", chave: "nome", tipo: "text"},
    { label: "Email", chave: "email", tipo: "email"},
    { label: "Telefone", chave: "telefone", tipo: "tel"},
    { label: "Tipo", chave: "tipo", opcoes: [
        { valor: "PJ", label: "Pessoa Jurídica" },
        { valor: "PF", label: "Pessoa Física" }
    ]},
    { label: "Categoria", chave: "categoria", opcoes: [
        { valor: "vip", label: "Vip" },
        { valor: "regular", label: "Regular"}
    ]},
    { label: "Resumo do Relacionamento", chave: "resumoRelacionamento", tipo: "text"}
];

export function ClienteDetalhes() {
    const { id } = useParams();
    const { carregando, erro, buscar, atualizar, remover, salvarNota, removerNota, removerAtividade } = useCliente();
    const cliente = buscar(id);
    const { exibirAlerta } = useAlerta();

    const [ modal, setModal ] = useState({});
    const [ notas, setNotas ] = useState([]);
    const [ editando, setEditando ] = useState(false);
    const [ editandoDados, setEditandoDados ] = useState(false);
    const idNotaDeletar = useRef(null);
    const [ dadosCliente, setDadosCliente ] = useState(cliente);
    const navigate = useNavigate();

    useEffect(() => {
        if (cliente) {
            setNotas(cliente.notas);
        }   
    }, [cliente]);

    if (carregando) return <p>Carregando...</p> ;
    if (!cliente) return <p>Cliente não encontrado</p>;
    if (erro) return <p>Erro ao buscar o cliente</p>;

    const colunas = [
        { chave: "data", label: "Data", ordenavel: true, tipo: "numero" },
        { chave: "tipo", label: "Tipo", ordenavel: false, tipo: "texto" },
        { chave: "descricao", label: "Descrição", ordenavel: false, tipo: "texto" },
        { chave: "acoes", label: "Ações", ordenavel: false, className: "text-center",
            children: (atividade) => (
                <Trash2 
                    onClick={() => confirmarExcluirAtividade(atividade.id)}
                    title={`Editar ${atividade.nome}`}
                    className="inline-flex rounded" 
                />
            )
        }
    ];

    const removerNotaLocal = () => {
        if (idNotaDeletar.current !== null) {
            removerNota(id, idNotaDeletar.current);
            setNotas(prev => prev.filter(n => n.id != idNotaDeletar.current));
            setModal({acao: null, aberto: false, mensagem: ""});
            idNotaDeletar.current = null;
        }
    };

    const confirmarExcluirNota = (notaId) => {
        idNotaDeletar.current = notaId;

        setModal({
            acao: () => removerNotaLocal(), 
            aberto: true, 
            mensagem: "Tem certeza que deseja excluir essa nota? Essa ação não pode ser revertida."
        });
    };

    const confirmarExcluirUsuario = () => {
        setModal({acao : () => {
            remover(id);
            navigate("/clientes");
            exibirAlerta(`Cliente ${dadosCliente.nome} excluído com sucesso`,"sucesso");
        }, aberto: true, mensagem: `Tem certeza que deseja excluir ${dadosCliente.nome}`});
    };

    const editarDados = (chave, valor) => {
        setDadosCliente(prev => ({...prev, [chave]: valor}));
    };

    const salvarDados = (e) => {
        e.preventDefault();
        atualizar(id, dadosCliente);
        setEditandoDados(false);
    };

    const cancelarEdicaoDados = () => {
        setEditandoDados(false);
        setDadosCliente(cliente);
    };

    const confirmarExcluirAtividade = (idAtividade) => {
        setModal({
            acao: () => excluirAtividade(idAtividade),
            aberto: true,
            mensagem: "Tem certeza que deseja excluir esse registro?"
        });
    }
    const excluirAtividade = (idAtividade) => {
        setDadosCliente(prev => ({
            ...prev,
            atividades: prev.atividades.filter(a => a.id != idAtividade)
        }));
        removerAtividade(id, idAtividade);
        setModal({acao: null, aberto: false, mensagem: ""});
    };

    const criarAtividade = () => {
        setAtividas(prev => ({...prev, data: new Date(), tipo: "", descricao: ""}));
    };

    return (
        <>
            <Modal 
                aberto={modal.aberto} 
                onFechar={() => setModalAberto(false)} 
                mensagem={modal.mensagem}
            >
                <div className="flex gap-3">
                    <button className="bg-green-300 p-2 rounded-sm w-1/2" onClick={modal.acao}>Confirmar</button>
                    <button className="bg-red-300 p-2 rounded-sm w-1/2" onClick={() => setModal({acao: null, aberto: false})}>Cancelar</button>
                </div>
            </Modal>

            <div className="flex justify-between items-start">
                <div>
                    <h1>{editando ? dadosCliente.nome : cliente.nome}</h1>
                    <div className="flex gap-4 mt-3 mb-1">
                        <p className="text-blue-500 bg-blue-300 w-fit px-2 rounded-sm">VIP</p>
                        <p className="text-gray-700 bg-gray-200 w-fit px-2 rounded-sm">Pessoa Física</p>
                        <p className="text-yellow-600 bg-yellow-100 w-fit px-2 rounded-sm">Alta Probabilidade</p>
                    </div>
                    <p className="block text-gray-400">Último Contato: {dadosCliente.ultimoContato} • Status: {dadosCliente.status}</p>
                </div>
                <div className="flex gap-10">
                    <button className="bg-blue-400 rounded-sm text-white p-2" onClick={() => setEditandoDados(true)}>Editar</button>
                    <button className="bg-gray-200 rounded-sm p-2" onClick={criarAtividade}>Adicionar Atividade</button>
                    <button className="bg-red-400 rounded-sm p-2 text-white" onClick={confirmarExcluirUsuario}>Excluir</button>
                </div>
            </div>
            
            <div className="flex gap-10 my-7">
                <Card className="w-[70%]">
                    <h2 className="col-span-2">Informações</h2>

                    <form onSubmit={salvarDados} className="grid grid-cols-2 grid-rows-auto gap-5 ">
                        {dadosCli.map(dado => 
                            dado.chave != "resumoRelacionamento" ? 
                                <div key={dado.chave}>
                                    {dado.opcoes ?
                                        <>
                                            <label className="block text-gray-500" htmlFor={`cliente-${dado.label.toLowerCase()}`}>
                                                {dado.label}
                                            </label>
                                            <select 
                                                id={`cliente-${dado.chave}`} 
                                                name={dado.chave} 
                                                value={dadosCliente[dado.chave]}
                                                disabled={!editandoDados}
                                                onChange={(e) => editarDados(e.target.name, e.target.value)}
                                                className="font-semibold"
                                            >
                                                {dado.opcoes.map(o => (
                                                    <option key={o.valor} value={o.valor}>
                                                        {o.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </>
                                        :
                                        <>
                                            <p className="text-gray-500">{dado.label}</p>
                                            <input 
                                                className="font-semibold"
                                                name={dado.chave}
                                                value={dadosCliente[dado.chave]}
                                                disabled={!editandoDados}
                                                onChange={(e) => editarDados(e.target.name, e.target.value)}
                                                type={dado.tipo}
                                                required
                                            />
                                        </>
                                    }
                                </div>
                                :
                                <div key={dado.chave} className="col-span-2">
                                    <h3>Resumo do Relacionamento</h3>
                                    <textarea 
                                        name={dado.chave}
                                        value={dadosCliente[dado.chave]} 
                                        disabled={!editandoDados}
                                        onChange={(e) => editarDados(e.target.name, e.target.value)}
                                        className="text-gray-500 w-full max-content resize-none"
                                    />
                                </div>
                        )}

                        {editandoDados && 
                            <div className="space-x-2 col-span-2">
                                <button type="submit" className="bg-green-300 p-1 rounded-sm w-[100px] focus:bg-green-400">
                                    Salvar
                                </button>
                                <button 
                                    type="button" 
                                    onClick={cancelarEdicaoDados} 
                                    className="bg-red-300 p-1 rounded-sm w-[100px] focus:bg-red-400"
                                >
                                    Cancelar
                                </button>
                            </div>
                        }
                    </form>
                </Card>

                <Card className="relative w-[30%] max-h-105 overflow-y-auto">
                    <div className="flex items-center justify-between">
                        <h2>Notas e Lembrentes</h2>
                        <Plus/>
                    </div>
                    <ul className="space-y-5 mt-4">
                        {notas.map(n => (
                            <li key={n.id} className="flex items-center gap-5 bg-gray-100 px-2 py-1 text-gray-700">
                                <input 
                                    type="text" 
                                    placeholder={"Digite o lembrete"}
                                    value={n.texto}
                                    className=" rounded-sm w-full"
                                />
                                <Trash2 className="inline" onClick={() => confirmarExcluirNota(n.id)}/>
                            </li>
                        ))}
                    </ul>
                    {editando &&
                        <button     
                            className="bg-green-300 p-1 rounded-sm absolute right-6 bottom-5 w-[100px] focus:bg-green-400"
                        >
                            Salvar
                        </button>
                    }
                </Card>
            </div>

            <h2>Histórico de Atividades</h2>
            <Tabela dadosTabela={dadosCliente.atividades} colunas={colunas}/>
        </>
    );
}
