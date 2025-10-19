import { CabecalhoOrdenavel } from "./CabecalhoOrdenavel.jsx";
import { ordenar } from "../../utils/ordenar";
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
        <table className="w-full">
            <thead className="text-white bg-blue-500 sticky top-0">
                <tr>
                    {colunas.map(c => (
                        c.ordenavel ? (
                            <CabecalhoOrdenavel
                                key={c.chave}
                                titulo={c.label}
                                ordenado = {ordenado.campo === c.chave ? ordenado.ativo : false}
                                tipo={c.tipo}
                                direcao = {ordenado.campo === c.chave ? (ordenado.ativo ? "asc" : "desc"): null}
                                onClick={() => alterarOrdenacao(c.chave)}
                                ariaLabel={`Clique para ordenar por ${c.label}`}
                            /> 
                        ) : (
                            <th key={c.chave}>{c.label}</th>
                        )
                    ))}
                </tr>
            </thead>
            <tbody>
                {dados && dados.length > 0 ? dados.map((item, index) => (
                    <tr 
                        key={`linha-${item.id}`}
                        className={`border border-gray-300 ${index % 2 === 0 ? "bg-gray-100" : "bg-gray-300"}`}
                    >
                        {colunas.map((c) => (
                            <td key={`linha-${item.id}-coluna-${c.chave}`} className="px-4 py-2">{item[c.chave]}</td>
                        ))}
                    </tr>
                )) : (
                    <tr>
                        <td colSpan={colunas.length} className="text-center p-4">
                            Nenhum dado Encontrado
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}