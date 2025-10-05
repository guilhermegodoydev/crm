import { useState, useMemo } from "react";
import { CabecalhoOrdenavel } from "../Tabela";
import { ordenar } from "../../utils";

export default function Tabela({dadosTabela, colunas = [{chave, label, ordenavel, tipo}]}) {
    const [ordenado, setOrdenado] = useState({campo: "nome", ativo: false});

    const alterarCampo = (campo) => {
        setOrdenado(prev => ({
            campo,
            ativo: prev.campo === campo ? !prev.ativo : true
        }));
    };

    const dados = useMemo(() => {
        let tipoOrdenacao = ordenado.ativo ? "asc" : "desc";
        return ordenar(dadosTabela, ordenado.campo, tipoOrdenacao);
    }, [ordenado, dadosTabela]);

    return (
        <table>
            <thead className="text-white bg-blue-500">
                <tr>
                    {colunas.map(c => (
                        c.ordenavel ? (
                            <CabecalhoOrdenavel
                                key={c.chave}
                                titulo={c.label}
                                ordenado = {ordenado.campo === c.chave ? ordenado.ativo : false}
                                tipo={c.tipo}
                                direcao = {ordenado.campo === c.chave ? (ordenado.ativo ? "asc" : "desc"): null}
                                onClick={() => alterarCampo(c.chave)}
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