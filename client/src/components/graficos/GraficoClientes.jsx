import {ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from "recharts";

const dados = [
    { nome: "Jan", novosClientes: 400, regular: 200, premium: 200 },
    { nome: "Fev", novosClientes: 600, regular: 500, premium: 100 },
    { nome: "Mar", novosClientes: 800, regular: 300, premium: 500 },
    { nome: "Abr", novosClientes: 700, regular: 400, premium: 300 },
    { nome: "Mai", novosClientes: 500, regular: 200, premium: 300 },
    { nome: "Jun", novosClientes: 400, regular: 100, premium: 300 },
    { nome: "Jul", novosClientes: 600, regular: 400, premium: 200 },
    { nome: "Ago", novosClientes: 700, regular: 300, premium: 400 },
    { nome: "Set", novosClientes: 800, regular: 500, premium: 300 },
    { nome: "Out", novosClientes: 900, regular: 600, premium: 300 },
    { nome: "Nov", novosClientes: 1000, regular: 700, premium: 300 },
    { nome: "Dez", novosClientes: 1100, regular: 800, premium: 300 },
];

export default function GraficoClientes({ className }) {

    const taxaCrescimento = 15;
    const taxaPositiva = taxaCrescimento >= 0;
    const taxaFormatada = `${taxaPositiva ? '+' : ''} ${Math.abs(taxaCrescimento)}%`;

    return (
        <div className={`container-grafico ${className}`}>
            <h2>Gráfico de Novos Clientes</h2>
            <ResponsiveContainer>
                <LineChart data={dados}>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="nome"/>
                    <YAxis dataKey="novosClientes"/>
                    <Line dataKey="novosClientes" name="Novos Clientes" type="monotone" stroke="#0d00ffff"/>
                    <Line dataKey="regular" name="Novos Clientes Regulares" type="monotone" stroke="#ff7b00ff"/>
                    <Line dataKey="premium" name="Novos Clientes Premium" type="monotone" stroke="#059731ff"/>
                    <Tooltip/>
                    <Legend/>
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}