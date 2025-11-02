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

    const atualizar = (cliente) => {
        setClientes(prev => prev.map(c => c.id == cliente.id ? {...c, ...cliente} : c));
    };

    const remover = (clienteId) => {
        setClientes(prev => prev.filter(c => c.id != clienteId));
    };

    const buscar = (clienteId) => {
        return clientes.find(c => c.id == clienteId);
    };

    return { clientes, carregando, erro, criar, atualizar, remover, buscar };
}