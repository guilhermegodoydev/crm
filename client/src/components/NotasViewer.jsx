import { useState } from "react";
import { Plus, Pen, Trash2 } from "lucide-react";

import { Card } from "./Card";

export function NotasViewer({ notas, onSalvar, onExcluir }) {
    const [ editando, setEditando ] = useState({ 
        ativo: false,
        id: null,
        texto: "",
        nova: false
    });

    const iniciarCriacao = () => {
        if (editando.ativo) return;

        setEditando({
            ativo: true,
            id: crypto.randomUUID(),
            texto: "",
            nova: true
        });
    };

    const iniciarEdicao = (id, texto) => {
        if (editando.ativo) return;

        setEditando({
            ativo: true,
            id,
            texto,
            nova: false
        });
    };

    const cancelar = () => {
        setEditando({
            ativo: false,
            id: null,
            texto: "",
            nova: false
        });
    };

    const salvar = (e) => {
        e.preventDefault();

        const notaFinal = {
            id: editando.id,
            data: new Date().toISOString(),
            texto: editando.texto
        };

        onSalvar(notaFinal);
        cancelar();
    };

    const renderNotaEditando = () => (
        <li key={editando.id} className="flex items-center gap-5 bg-gray-100 px-2 py-1 text-gray-700">
            <input
                type="text"
                value={editando.texto}
                onChange={(e) => setEditando(prev => ({ ...prev, texto: e.target.value }))}
                required
                className="rounded-sm w-full"
                autoFocus
            />
        </li>
    );

    return (
        <Card className="relative w-[30%]">
            <div className="flex items-center justify-between">
                <h2>Notas e Lembretes</h2>
                <button
                    onClick={iniciarCriacao}
                    className="cursor-pointer"
                    aria-label="Criar nova Nota"
                    title="Clique para criar uma nova nota"
                >
                    <Plus/>
                </button>
            </div>

            <form onSubmit={salvar}>
                <ul className="space-y-5 mt-4 max-h-68 overflow-y-auto">
                    {editando.ativo && renderNotaEditando()}
                    
                    {notas.length > 0 ? 
                        notas.map(n => 
                            editando.ativo && n.id == editando.id ? 
                            null
                            :
                            (
                                <li key={n.id} className="flex items-center gap-5 bg-gray-100 px-2 py-1 text-gray-700">
                                    <input 
                                        id={n.id}
                                        name={`nota-${n.id}`}
                                        type="text" 
                                        placeholder={"Digite o nota"}
                                        value={editando.ativo && editando.id === n.id ? editando.texto : n.texto}
                                        disabled={!editando.ativo || editando.id !== n.id}
                                        className="rounded-sm w-full"
                                    />

                                    {!editando.ativo ?
                                        <>
                                            <Pen 
                                                role="button" 
                                                aria-label="Editar Nota" 
                                                title="Clique para editar a nota" 
                                                className="cursor-pointer" 
                                                onClick={() => iniciarEdicao(n.id, n.texto)}
                                            />
                                            <Trash2 
                                                role="button" 
                                                aria-label="Deletar Nota" 
                                                title="Clique para deletar a nota" 
                                                className="cursor-pointer" 
                                                onClick={() => onExcluir(n.id)}/>
                                        </>
                                        :
                                        null
                                    }
                                </li>
                            )
                        )
                        :
                        <p className="text-center">Esse usuário não tem anotações</p>
                    }
                </ul>

                {editando.ativo &&
                    <div className="flex justify-end mt-3 gap-2 w-full">
                        <button type="submit" className="bg-green-300 p-1 rounded-sm w-[100px] focus:bg-green-400">
                            Salvar
                        </button>
                        <button type="button" className="bg-red-300 p-1 rounded-sm w-[100px] focus:bg-red-400" onClick={cancelar}>
                            Cancelar
                        </button>
                    </div>
                }
            </form>
        </Card>
    );
}