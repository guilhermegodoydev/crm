import { Bar, BarChart, LabelList, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const dados = [
    { nome: 'Lead Capturado', regular: 4000, premium: 2400, },
    { nome: 'Contato', regular: 3000, premium: 1398, },
    { nome: 'Proposta', regular: 2000, premium: 9800, },
    { nome: 'Negociação', regular: 2780, premium: 3908, },
    { nome: 'Fechamento ganho', regular: 1890, premium: 4800, },
    { nome: 'Perdido', regular: 2390, premium: 3800, },
];

export default function Funil({ className }) {
    return (
        <div className={`container-grafico ${className}`}>
            <h2>Funil de Vendas</h2>
            <ResponsiveContainer>
                <BarChart data={dados} layout="vertical">
                    <XAxis type="number"/>
                    <YAxis dataKey="nome" type="category" width={95}/>
                    <Bar dataKey="regular" stackId="a" fill="#4400ffff"/>
                    <Bar dataKey="premium" stackId="a" fill="#00aeffff"/>
                    <Tooltip/>
                    <Legend/>
                </BarChart>
            </ResponsiveContainer>          
        </div>
    );
}