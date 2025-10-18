import { useEffect, useRef, useState } from "react";
import { ExRequisicao } from "../utils/api";

export function useAPI(url, opcoes = {}, parametros = {}) {
    const [ dados, setDados ] = useState();
    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState();
    const abortControllerRef = useRef(null);

    
    useEffect(() => {
        abortControllerRef.current = new AbortController();
        const signal = abortControllerRef.current.signal;

        setCarregando(true);
        setErro(undefined);

        ExRequisicao(url, { ...opcoes, signal }, parametros)
            .then(setDados)
            .catch(erro => {
                if (erro.name !== "AbortError")
                    setErro(erro.message);
            })
            .finally(() => setCarregando(false));

        return () => abortControllerRef.current.abort();
    }, [url, JSON.stringify(opcoes), JSON.stringify(parametros)]);

    return { dados, carregando, erro };
}