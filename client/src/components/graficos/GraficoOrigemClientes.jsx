import { ResponsiveContainer, Legend, Pie, PieChart, Tooltip, Cell } from "recharts";

const dados = [
    { id: 1, origem: 'Indicação', clientes: 400 },
    { id: 2, origem: 'Redes Sociais', clientes: 300 },
    { id: 3, origem: 'Google Ads', clientes: 300 },
    { id: 4, origem: 'Outros', clientes: 200 },
];

export default function GraficoOrigemClientes() {
    return (
        <div className={`h-75 w-full`}>
            <ResponsiveContainer>
                <PieChart>
                    <Pie data={dados} dataKey="clientes" nameKey="origem" cx="50%" cy="50%" outerRadius={80}>
                        {dados.map((e, index) => (
                            <Cell key={e.id} fill={`hsl(${index * 200}, 70%, 50%)`}/>
                        ))}
                    </Pie>
                    <Tooltip/>
                    <Legend/>
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}