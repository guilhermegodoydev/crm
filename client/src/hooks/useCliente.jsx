import { useEffect } from "react";
import { useFetch } from "./useFetch";
import { useLocalStorage } from "./useLocalStorage";

export function useCliente() {
    const { mock: dados, carregando, erro } = useFetch("/mock/clientes.json");
    const [ valor, setValor ] = useLocalStorage("clientes", []);

    useEffect(() => {
        if (!carregando && !erro && valor.length === 0)
            setValor(mock);
    }, [mock, valor]);

    const criar  = (cliente) => {
        setValor(prev => [...prev, { id: crypto.randomUUID(), ...cliente}]);
    };

    const alterar = (cliente) => {
        setValor(prev => prev.map(c => c.id === cliente.id ? {...c, ...cliente} : c));
    };

    const remover = (clienteId) => {
        setValor(prev => prev.filter(c => c.id !== clienteId));
    };

    return { clientes: valor, carregando, erro, criar, alterar, remover };
}