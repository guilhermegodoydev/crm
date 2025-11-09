import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { Plus, Trash2 } from "lucide-react";

import { Card } from "../../components/Card";
import { Tabela } from "../../components/tabela/Tabela";

import { useCliente } from "../../hooks/dominio/useCliente";
import { Modal } from "../../components/Modal";

const colunas = [
    { chave: "data", label: "Data", ordenavel: true, tipo: "numero" },
    { chave: "tipo", label: "Tipo", ordenavel: false, tipo: "texto" },
    { chave: "descricao", label: "Descrição", ordenavel: false, tipo: "texto" },
];

export function ClienteDetalhes() {
    const { id } = useParams();
    const { carregando, erro, buscar, salvarNota, removerNota } = useCliente();
    const cliente = buscar(id);

    const [ modalAberto, setModalAberto ] = useState();
    const [ notas, setNotas ] = useState([]);
    const [ editando, setEditando ] = useState(false);
    const idNotaDeletar = useRef(null);

    useEffect(() => {
        if (cliente) setNotas(cliente.notas);
    }, [cliente]);

    if (carregando) return <p>Carregando...</p> ;
    if (!cliente) return <p>Cliente não encontrado</p>;
    if (erro) return <p>Erro ao buscar o cliente</p>;

    const removerNotaLocal = () => {
        if (idNotaDeletar.current !== null) {
            removerNota(id, idNotaDeletar.current);
            setNotas(prev => prev.filter(n => n.id != idNotaDeletar.current));
            setModalAberto(false);
            idNotaDeletar.current = null;
        }
    };

    const confirmarExcluirNota = (notaId) => {
        idNotaDeletar.current = notaId;
        setModalAberto(true);
    };

    return (
        <>
            <Modal 
                aberto={modalAberto} 
                onFechar={() => setModalAberto(false)} 
                mensagem="Você realmente quer remover esta nota? A ação não pode ser revertida."
            >
                <div className="flex gap-3">
                    <button className="bg-green-300 p-2 rounded-sm w-1/2" onClick={removerNotaLocal}>Confirmar</button>
                    <button className="bg-red-300 p-2 rounded-sm w-1/2" onClick={() => setModalAberto(false)}>Cancelar</button>
                </div>
            </Modal>

            <div className="flex justify-between items-start">
                <div>
                    <h1>{cliente.nome}</h1>
                    <div className="flex gap-4 mt-3 mb-1">
                        <p className="text-blue-500 bg-blue-300 w-fit px-2 rounded-sm">VIP</p>
                        <p className="text-gray-700 bg-gray-200 w-fit px-2 rounded-sm">Pessoa Física</p>
                        <p className="text-yellow-600 bg-yellow-100 w-fit px-2 rounded-sm">Alta Probabilidade</p>
                    </div>
                    <p className="block text-gray-400">Último Contato: {cliente.ultimoContato} • Status: {cliente.status}</p>
                </div>
                <div className="flex gap-10">
                    <button className="bg-blue-400 rounded-sm text-white p-2">Editar</button>
                    <button className="bg-gray-200 rounded-sm p-2">Adicionar Atividade</button>
                    <button className="bg-red-400 rounded-sm p-2 text-white">Excluir</button>
                </div>
            </div>
            
            <div className="flex gap-10 my-7">
                <Card className="grid grid-cols-2 grid-rows-auto gap-5 w-[70%]">
                    <h2 className="col-span-2">Informações</h2>

                    <div>
                        <p className="text-gray-500">Nome</p>
                        <p className="font-semibold">{cliente.nome}</p>
                    </div>

                    <div>
                        <p className="text-gray-500">Email</p>
                        <p className="font-semibold">{cliente.email}</p>
                    </div>

                    <div>
                        <p className="text-gray-500">Telefone</p>
                        <p className="font-semibold">{cliente.telefone}</p>
                    </div>

                    <div>
                        <p className="text-gray-500">Tipo</p>
                        <p className="font-semibold">{cliente.tipo}</p>
                    </div>

                    <div>
                        <p className="text-gray-500">Categoria</p>
                        <p className="font-semibold">{cliente.categoria}</p>
                    </div>

                    <div className="col-span-2">
                        <h3>Resumo do Relacionamento</h3>
                        <p className="text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, nemo, mollitia porro quaerat rerum accusantium sapiente numquam commodi nesciunt molestias error! Quasi, aspernatur dicta. Vero provident soluta eum sint nam?</p>
                    </div>
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
            <Tabela dadosTabela={cliente.atividades} colunas={colunas}/>
        </>
    );
}
