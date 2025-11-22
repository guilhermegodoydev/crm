import { CabecalhoOrdenavel } from "./CabecalhoOrdenavel.jsx";
import { ordenar } from "../../utils/ordenar.js";
import { useMemo, useState } from "react";

export function Tabela({dadosTabela, colunas}) {
    const [ordenado, setOrdenado] = useState({campo: "nome", ativo: true});

    const alterarOrdenacao = (campo) => {
        setOrdenado(prev => ({
            campo,
            ativo: prev.campo === campo ? !prev.ativo : true
        }));
    };

    const tipoOrdenacao = ordenado.ativo ? "asc" : "desc";

    const dados = useMemo(() => 
        ordenar(dadosTabela, ordenado.campo, tipoOrdenacao),
    [dadosTabela, ordenado]); 

    return (
        <table className="w-full rounded-md">
            <thead className="text-white bg-[#1b4e9b] sticky top-0">
                <tr>
                    {colunas.map((c, index) => (
                        c.ordenavel ? (
                            <CabecalhoOrdenavel
                                key={`cabecalho-item-${c.chave}`}
                                titulo={c.label}
                                ordenado = {ordenado.campo === c.chave ? ordenado.ativo : false}
                                tipo={c.tipo}
                                direcao = {ordenado.campo === c.chave ? (ordenado.ativo ? "asc" : "desc"): null}
                                onClick={() => alterarOrdenacao(c.chave)}
                                ariaLabel={`Clique para ordenar por ${c.label}`}
                                className={index == 0 ? "rounded-tl-md" : (index+1 == colunas.length ? "rounded-tr-md" : "")}
                            >
                            </CabecalhoOrdenavel> 
                            
                        ) : (
                            <th key={`cabecalho-item-${c.chave}`} className={index == 0 ? "rounded-tl-md" : (index+1 == colunas.length ? "rounded-tr-md" : "")}>{c.label}</th>
                        )
                    ))}
                </tr>
            </thead>
            <tbody>
                {dados && dados.length > 0 ? dados.map((item, index) => (
                    <tr 
                        key={`linha-${item.id}`}
                        className={`rounded-md ${index % 2 === 0 ? "bg-gray-100" : "bg-gray-300"}`}
                    >
                        {colunas.map((c, index) => (
                            <td 
                                key={`coluna-${item.id}-${c.chave}`} 
                                className={`px-2 py-1 ${typeof item[c.chave] === "number" ? "text-center" : ""} ${index == 0 ? "rounded-bl-md" : (index+1 == colunas.length ? "rounded-br-md" : "")} ${c.className}`}
                                >
                                    {typeof c.children === 'function'
                                        ? c.children(item)
                                        : (c.children ? c.children : item[c.chave])
                                    }
                            </td>
                        ))}
                    </tr>
                )) : (
                    <tr className="bg-gray-300">
                        <td colSpan={colunas.length} className="text-center px-2 py-1 rounded-b-md">
                            Nenhum dado Encontrado
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}