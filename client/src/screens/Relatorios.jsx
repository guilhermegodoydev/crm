import { UserRoundCheck, UserRound, UserRoundPlus, UserRoundMinus, ChartNoAxesColumn} from "lucide-react";
import { useState } from "react";

const relatorios = [
    {id: 1, label: "Leads Perdidos", icone: <UserRoundMinus />},
    {id: 2, label: "Novos Leads", icone: <UserRoundPlus />},
    {id: 3, label: "Clientes", icone: <UserRound />},
    {id: 4, label: "Métricas", icone: <ChartNoAxesColumn />},
    {id: 5, label: "Novos Clientes", icone: <UserRoundCheck />}
];

const formatos = [
    {id: 1, label: "PDF", icone: "src/assets/icons/pdf.png"},
    {id: 2, label: "Word", icone: "src/assets/icons/doc.png"},
    {id: 3, label: "Excel", icone: "src/assets/icons/xls.png"}
];

export default function Relatorios() {
    const [relatorio, setRelatorio] = useState();
    const [formato, setFormato] = useState();

    return (
        <div>
            <section>
                <h2>Escolha o Relatório</h2>
                <div className="grid grid-cols-4 grid-rows-auto gap-5">
                    {relatorios.map(r => (
                        <button 
                            onClick={() => setRelatorio(r.id)} 
                            key={`container-botao-${r.id}`} 
                            className={`flex flex-col items-center p-2 rounded-md border-2 border-blue-300 ${relatorio == r.id ? "border-blue-500 bg-blue-50" : "hover:border-blue-500 hover:bg-blue-50"}`}
                        >
                            {r.icone}
                            <span>{r.label}</span>
                        </button>
                    ))}
                </div>

                <h2 className="mt-5">Escolha o Formato</h2>
                <div className="grid grid-cols-4 grid-rows-auto gap-5">
                    {formatos.map(f => (
                        <button 
                            onClick={() => setFormato(f.id)} 
                            key={`container-formato-${f.id}`} 
                            className={`flex flex-col items-center p-2 rounded-md border-2 border-blue-300 ${formato == f.id ? "border-blue-500 bg-blue-50" : "hover:border-blue-500 hover:bg-blue-50"}`}
                        >
                            <img src={f.icone} alt="" className="size-8"/>
                            <span>{f.label}</span>
                        </button>
                    ))}
                </div>
            </section>

            <section>

            </section>
        </div>
    );
}