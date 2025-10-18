import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export function GraficoBarras({ 
    className = "", 
    titulo, 
    data, 
    eixoYKey,
    eixoXkey,
    layout,  
    larguraEixoY,
    barras = [{dataKey, stackId, fill}] 
}) {

    const vertical = layout === "vertical";

    return (
        <div className={`container-grafico ${className}`}>
            <h2>{titulo}</h2>
            <ResponsiveContainer>
                <BarChart 
                    data={data} 
                    layout={layout} 
                    margin={{ bottom: vertical ? 22 : 60}}
                >
                    <XAxis 
                        dataKey={eixoXkey} 
                        type={vertical ? "number" : "category"} 
                        angle={!vertical ? -45 : 0} 
                        textAnchor="end"
                    />

                    <YAxis 
                        dataKey={eixoYKey} 
                        type={vertical ? "category" : "number"} 
                        width={larguraEixoY}
                    />

                    {barras.map((b, index) => (
                        <Bar 
                            key={b.id}
                            dataKey={b.dataKey} 
                            stackId={b.stackId} 
                            fill={b.fill ? b.fill : `hsl(${index * 200}, 70%, 50%)`}
                        />
                    ))}
                    <Tooltip/>
                </BarChart>
            </ResponsiveContainer>          
        </div>
    );
}