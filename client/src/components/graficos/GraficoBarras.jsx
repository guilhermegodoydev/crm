import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default function GraficoBarras({ 
    className, 
    titulo, 
    data, 
    eixoYKey,
    layout,  
    barras = [{dataKey, stackId, fill}] 
}) {

    const vertical = layout === "vertical";

    return (
        <div className={`container-grafico ${className}`}>
            <h2>{titulo}</h2>
            <ResponsiveContainer>
                <BarChart data={data} layout={layout} margin={{bottom: 22}}>
                    <XAxis type={vertical ? "number" : "category"} />
                    <YAxis dataKey={eixoYKey} type={vertical ? "category" : "number"} width={95}/>
                    {barras.map((b, index) => (
                        <Bar 
                            key={b.id}
                            dataKey={b.dataKey} 
                            stackId={b.stackId} 
                            fill={b.fill ? b.fill : `hsl(${index * 200}, 70%, 50%)`}
                        />
                    ))}
                    <Tooltip/>
                    <Legend/>
                </BarChart>
            </ResponsiveContainer>          
        </div>
    );
}