import {ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from "recharts";

export function GraficoLinhas({ 
    className, 
    titulo, 
    data, 
    eixoXKey, 
    larguraEixoY = "",
    linhas = [{id, dataKey, nomeLinha, fill}] 
}) {
    return (
        <div className={`container-grafico ${className}`}>
            <h2>{titulo}</h2>
            <ResponsiveContainer>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey={eixoXKey}/>
                    <YAxis width={larguraEixoY}/>
                    {linhas.map((l, index) => (
                        <Line 
                            key={l.id}
                            dataKey={l.dataKey} 
                            name={l.nomeLinha} 
                            type="monotone" 
                            stroke={l.fill ? l.fill : `hsl(${index * 200}, 70%, 50%)`}
                        />
                    ))}
                    <Tooltip/>
                    <Legend/>
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}