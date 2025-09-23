import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const origem = [
    { id: 1, nome: 'Google Ads', clientes: 120 },
    { id: 2, nome: 'Facebook Ads', clientes: 90 },
    { id: 3, nome: 'Instagram', clientes: 60 },
    { id: 4, nome: 'Indicação', clientes: 30 },
    { id: 5, nome: 'Outros', clientes: 20 },
]

export default function GraficoNovosClientes() {
    return (
        <div style={{height: 300}}>
            <ResponsiveContainer>
                <PieChart>
                    <Pie 
                        data={origem} 
                        dataKey="clientes"
                        nameKey="nome"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        label
                    >
                        {origem.map((o, index) => (
                            <Cell key={o.id} fill={`hsl(${(index * 360) / origem.length}, 70%, 50%)`}></Cell>
                        ))}
                    </Pie>
                    <Tooltip/>
                    <Legend/>
                </PieChart>
            </ResponsiveContainer>            
        </div>
    );
}