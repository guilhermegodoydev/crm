import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const dados = [
    { nome: 'Lead Capturado', quantidade: 4000 },
    { nome: 'Contato', quantidade: 3000 },
    { nome: 'Proposta', quantidade: 2000 },
    { nome: 'Negociação', quantidade: 2780 },
    { nome: 'Fechamento ganho', quantidade: 1890 },
    { nome: 'Perdido', quantidade: 2390 },
];

export default function Funil({ className }) {
    return (
        <div className={`w-full h-96 ${className}`}>
            <ResponsiveContainer>
                <BarChart data={dados}>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="nome"/>
                    <YAxis dataKey="quantidade"/>
                    <Bar dataKey="quantidade" />
                    <Tooltip/>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}