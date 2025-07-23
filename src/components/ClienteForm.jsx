import { useState } from "react";

const estiloInput = "border border-gray-300 rounded-sm block w-full";

export default function ClienteForm({ adicionarCliente }) {
    const [novoCliente, setnovoCliente] = useState({
        nome: "",
        email: "",
        telefone: "",
        status: "ativo",
        observacoes: ""
    })

    function alterar(e) {
        const {id, value} = e.target;
        setnovoCliente({...novoCliente, [id]: value});
    }

    return (
        <form className="card flex flex-col space-y-2">
            
            <div>
                <label htmlFor="nome">Nome:</label>
                <input type="text" id="nome" className={estiloInput} onChange={alterar}/>
            </div>

            <div>
                <label htmlFor="email">E-mail:</label>
                <input type="email" id="email" className={estiloInput} onChange={alterar}/>
            </div>

            <div className="flex gap-4">
                <div className="flex-1">
                    <label htmlFor="telefone">Telefone:</label>
                    <input type="tel" id="telefone" className={estiloInput} onChange={alterar}/>
                </div>
                <div className="flex-1">
                    <label htmlFor="status">Status:</label>
                    <select id="status" className={estiloInput} onChange={alterar}>
                        <option value="ativo">Ativo</option>
                        <option value="inativo">Inativo</option>
                    </select>
                </div>
            </div>

            <div>
                <label htmlFor="observacoes">Observações:</label>
                <textarea id="observacoes" className={estiloInput} onChange={alterar}></textarea>
            </div>

            <button className="mt-4" onClick={(e) => {
                e.preventDefault();
                adicionarCliente(novoCliente)
            }}>Enviar</button>
        </form>
    )
}