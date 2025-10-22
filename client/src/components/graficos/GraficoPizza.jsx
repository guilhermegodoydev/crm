import { ResponsiveContainer, Legend, Pie, PieChart, Tooltip, Cell } from "recharts";

export function GraficoPizza({ 
    titulo, 
    className, 
    data, 
    dataKey, 
    nameKey 
}) {
    return (
        <div className={`container-grafico ${className}`}>
            <h2>{titulo}</h2>
            <ResponsiveContainer>
                <PieChart>
                    <Pie 
                        data={data} 
                        dataKey={dataKey} 
                        nameKey={nameKey} 
                        cx="50%" 
                        cy="50%" 
                        outerRadius={80}
                    >
                        {data.map((e, index) => (
                            <Cell key={e.id} fill={`hsl(${index * 200}, 70%, 50%)`}/>
                        ))}
                    </Pie>
                    <Tooltip/>
                    <Legend textAnchor="end"/>
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}