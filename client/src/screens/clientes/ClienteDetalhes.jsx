import { useEffect, useState, useRef } from "react";
import { data, useNavigate, useParams } from "react-router-dom";
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

const tipoAtividades = [
    { key: "ligacao", label: "Ligação"},
    { key: "email", label: "Email"},
    { key: "reuniao", label: "Reunião"}
];

export function ClienteDetalhes() {
    const { id } = useParams();
    const { carregando, erro, buscar, atualizar, remover, salvarNota, removerNota, salvarAtividade, removerAtividade } = useCliente();
    const cliente = buscar(id);
    const { exibirAlerta } = useAlerta();

    const [ modal, setModal ] = useState({});
    const [ editando, setEditando ] = useState(false);
    const [ editandoNotas, setEditandoNotas ] = useState({editando: false, idNota: 0});
    const [ editandoDados, setEditandoDados ] = useState(false);
    const [ dadosCliente, setDadosCliente ] = useState(cliente);
    const navigate = useNavigate();

    if (carregando) return <p>Carregando...</p> ;
    if (!cliente) return <p>Cliente não encontrado</p>;
    if (erro) return <p>Erro ao buscar o cliente</p>;
    console.log("oi");
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

    const removerNotaLocal = (notaId) => {
        setModal({acao: null, aberto: false, mensagem: ""});
        setDadosCliente(prev => ({
            ...prev,
            notas: prev.notas.filter(n => n.id != notaId)
        }));
        removerNota(id, notaId);
    };

    const confirmarExcluirNota = (notaId) => {
        setModal({
            acao: () => removerNotaLocal(notaId), 
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
        setDadosCliente(prev => ({
            ...cliente,
            notas: prev.notas
        }));
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

    const confirmarCriarAtividade = (e) => {
        e.preventDefault();
        const formData = new FormData (e.target);
        
        const atividade = Object.fromEntries(formData);

        salvarAtividade(id, atividade);

        setModal({aberto: false, acao: null});
        setDadosCliente(prev => ({
            ...prev,
            atividades: [atividade, ...(prev.atividades || [])]
        }));

    };

    const criarAtividade = () => {
        const maxData = new Date().toISOString().split("T")[0];

        setModal({
            aberto: true,
            acao: null,
            titulo: "Criar nova atividade",
            children: 
            <form onSubmit={(e) => confirmarCriarAtividade(e)} className="space-y-3">
                <div className="mt-3">
                    <label htmlFor="data">Data:</label>
                    <input type="date" max={maxData} name="data" id="data" className="border rounded-md px-1 ml-5" required/>
                </div>

                <div>
                    <label htmlFor="tipo">Tipo:</label>
                    <select name="tipo" id="tipo" className="border rounded-md px-1 min-w-[38%] ml-5" required>
                        {tipoAtividades.map( opt => (
                            <option key={`opcao-${opt.key}`} value={opt.key}>{opt.label}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label htmlFor="descricao" className="block">Descrição:</label>
                    <textarea 
                        id="descricao" 
                        name="descricao" 
                        className="resize-none mb-2 border rounded-md px-2 block w-full" 
                        placeholder="Discussão sobre integrações..."
                        required
                    ></textarea>
                </div>

                <div className="flex gap-3">
                    <button className="bg-green-300 p-2 rounded-sm w-1/2" type="submit">Confirmar</button>
                    <button className="bg-red-300 p-2 rounded-sm w-1/2" type="button" onClick={() => setModal({acao: null, aberto: false})}>Cancelar</button>
                </div>
            </form>
        });
    };

    const criarNota = () => {
        if (editandoNotas.editando)
            return

        const novaNota = {
            id: crypto.randomUUID(),
            data: new Date().toISOString(),
            texto: ""
        };
        setEditandoNotas({
            editando: true,
            idNota: novaNota.id
        });
        setDadosCliente(prev => ({
            ...prev,
            notas: [novaNota, ...(prev.notas || [])]
        }));
    };

    const editarNota = (notaId, textoNota) => {
        setDadosCliente(prev => ({
            ...prev,
            notas: prev.notas.map(n => 
                n.id == notaId
                ?
                {...n , texto: textoNota}
                :
                n
            )
        }));
    };

    const cancelarEdicaoNotas = () => {
        setDadosCliente(prev => ({
            ...prev,
            notas: prev.notas.length > 0 ? [prev.notas.shift()] : []
        }));
        setEditandoNotas({editando: false, id: 0});
    };

    const salvarNovaNota = (e) => {
        e.preventDefault();
        const nota = dadosCliente.notas[0];
        setEditandoNotas({editando: false, id: 0});
        salvarNota(id, nota.texto);
    };

    return (
        <>
            <Modal 
                aberto={modal.aberto} 
                onFechar={() => setModal({aberto: false, acao: null})} 
                mensagem={modal.mensagem}
                titulo={modal.titulo}
            >
                {modal.children ? 
                    modal.children
                    :
                    <div className="flex gap-3">
                        <button className="bg-green-300 p-2 rounded-sm w-1/2" onClick={modal.acao}>Confirmar</button>
                        <button className="bg-red-300 p-2 rounded-sm w-1/2" onClick={() => setModal({acao: null, aberto: false})}>Cancelar</button>
                    </div>
                }
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

                    <form onSubmit={(e) => salvarDados(e)} className="grid grid-cols-2 grid-rows-auto gap-5 ">
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
                                                name={`cliente-${dado.chave}`} 
                                                value={dadosCliente[dado.chave]}
                                                onChange={(e) => editarDados(e.target.name, e.target.value)}
                                                className={`font-semibold ${editandoDados ? "border rounded-md px-1" : "appearance-none"}`}
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
                                            <label className="block text-gray-500" htmlFor={dado.chave}>{dado.label}</label>
                                            <input 
                                                className={`font-semibold ${editandoDados ? "border rounded-md px-1" : ""}`}
                                                id={dado.chave}
                                                name={dado.chave}
                                                value={dadosCliente[dado.chave]}
                                                disabled={!editandoDados}
                                                onChange={(e) => editarDados(e.target.name, e.target.value)}
                                                type={dado.tipo}
                                                autoComplete={dado.tipo == "email" ? "email" : null}
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
                        <Plus onClick={criarNota} className="cursor-pointer"/>
                    </div>
                    <form onSubmit={(e) => salvarNovaNota(e)}>
                        <ul className="space-y-5 mt-4">
                            {dadosCliente.notas.length > 0 ? dadosCliente.notas.map(n => (
                                <li key={n.id} className="flex items-center gap-5 bg-gray-100 px-2 py-1 text-gray-700">
                                    <input 
                                        id={n.id}
                                        name={`nota-${n.id}`}
                                        type="text" 
                                        placeholder={"Digite o lembrete"}
                                        value={n.texto}
                                        onChange={(e) => editarNota(n.id, e.target.value)}
                                        disabled={editandoNotas.editando && editandoNotas.idNota == n.id ? false : true}
                                        required
                                        className="rounded-sm w-full"
                                    />
                                    {!editandoNotas.editando && editandoNotas.idNota != n.id ?
                                        <Trash2 className="inline" onClick={() => confirmarExcluirNota(n.id)}/>
                                        :
                                        null
                                    }
                                </li>
                            ))
                                :
                                <p className="text-center">Esse usuário não tem anotações</p>
                            }
                        </ul>
                        {editandoNotas.editando &&
                            <div className="absolute flex right-6 bottom-5 gap-2">
                                <button type="submit" className="bg-green-300 p-1 rounded-sm w-[100px] focus:bg-green-400">
                                    Salvar
                                </button>
                                <button type="button" className="bg-red-300 p-1 rounded-sm w-[100px] focus: bg-red-400" onClick={cancelarEdicaoNotas}>
                                    Cancelar
                                </button>
                            </div>
                        }
                    </form>
                </Card>
            </div>

            <h2>Histórico de Atividades</h2>
            <Tabela dadosTabela={dadosCliente.atividades} colunas={colunas}/>
        </>
    );
}
