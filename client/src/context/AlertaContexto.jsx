
import { CircleAlert, CircleX, ThumbsUp } from "lucide-react";
import { createContext, useCallback, useContext, useState } from "react";
import { createPortal } from "react-dom"

const AlertaContexto = createContext();

export function AlertaProvider({ children }) {
    const [ alerta, setAlerta ] = useState(null);

    const exibirAlerta = useCallback((mensagem, tipo = "info", duracao = 4000) => {
        setAlerta({mensagem, tipo, visivel: false});

        setTimeout(() => {
            setAlerta({ mensagem, tipo, visivel: true });
        }, 10);

        setTimeout(() => {
            setAlerta(prev => prev ? { ...prev, visivel: false } : null);
        }, duracao);
        
        setTimeout(() => setAlerta(null), duracao + 800);
    }, []);

    return (
        <AlertaContexto.Provider value={{ exibirAlerta }}>
            {children}
            {alerta && 
                createPortal(
                    <div className={`absolute top-0 rounded-sm p-2 left-1/2 -translate-x-1/2 border-2 transition-all duration-800 ease-in-out delay-500
                            ${alerta.visivel ? "translate-y-0" : "-translate-y-full"}
                            ${alerta.tipo === "sucesso" ? "bg-green-100/80 text-green-500 border-green-200/80" : ""}
                            ${alerta.tipo === "erro" ? "bg-red-300/80 text-red-700 border-red-400" : ""}
                            ${alerta.tipo === "info" ? "bg-gray-300/80 text-gray-500 border-gray-400" : ""}
                        `}
                        style={{ transformOrigin: "top center" }}
                        >
                        <div className={"flex items-center"}>
                            <h1>Sucesso!</h1>
                            {alerta.tipo === "sucesso" ? <ThumbsUp className="ml-2 text-green-500"/> : null}
                            {alerta.tipo === "erro" ? <CircleX className="ml-2 text-red-600"/> : null}
                            {alerta.tipo === "info" ? <CircleAlert className="ml-2 text-gray-500"/> : null}
                        </div>
                        <p className="text-[16px]">{alerta.mensagem}</p>
                    </div>
                , document.body)
            }
        </AlertaContexto.Provider>
    );
}

export function useAlerta() {
    return useContext(AlertaContexto);
}