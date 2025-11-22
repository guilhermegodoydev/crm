import { useCallback, useEffect } from "react";

import { useFetch } from "../helpers/useFetch";
import { useLocalStorage } from "../helpers/useLocalStorage";

export function useCliente() {
    const { dados: mock, carregando, erro } = useFetch("/mock/clientes.json");
    const [ clientes, setClientes ] = useLocalStorage("clientes", []);

    useEffect(() => {
        if (!carregando && !erro && clientes.length === 0 && mock)
            setClientes(mock);
    }, [mock, carregando, erro]);

    const criar = (cliente) => {
        setClientes(prev => [...prev, { id: crypto.randomUUID(), ...cliente}]);
    };

    const atualizar = (id, clienteParcial) => {
        setClientes(prev => prev.map(c => c.id == id ? {...c, ...clienteParcial} : c));
    };

    const remover = (clienteId) => {
        setClientes(prev => prev.filter(c => c.id != clienteId));
    };

    const buscar = (clienteId) => {
        return clientes.find(c => c.id == clienteId);
    };

    const salvarNota = (clienteId, texto) => {
        const novaNota = { id: Date.now(), texto}
        setClientes(prev => 
            prev.map(c => 
                c.id == clienteId 
                    ? { ...c, notas: [...(c.notas || []), novaNota]} 
                : c
            )
        );
    };

    const removerNota = (clienteId, notaId) => {
        setClientes(prev => 
            prev.map(cli => 
                cli.id == clienteId 
                ? {
                    ...cli, 
                    notas: Array.isArray(cli.notas) 
                    ? cli.notas.filter(n => n.id != notaId)
                    : [],
                } 
                : cli
            )
        );
    };

    const removerAtividade = (clienteId, atividadeId) => {
        setClientes(prev =>
            prev.map(cli => 
                cli.id == clienteId
                ? {
                    ...cli,
                    atividades: Array.isArray(cli.atividades) 
                    ? cli.atividades.filter(ati => ati.id != atividadeId) 
                    : [],
                }
                : cli
            )
        );
    };

    const salvarAtividade = (idCliente, novaAtividade) => {
        setClientes(prev => 
            prev.map(cli =>
                cli.id == idCliente
                ? {
                    ...cli,
                    atividades: [...(cli.atividades || []), novaAtividade]
                }
                :
                cli
            )
        );
    };

    return { clientes, carregando, erro, criar, atualizar, remover, buscar, salvarNota, removerNota, salvarAtividade, removerAtividade };
}