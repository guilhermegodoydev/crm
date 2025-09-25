import {ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from "recharts";

const dados = [
    { nome: "Janeiro", novosClientes: 400, regular: 200, premium: 200 },
    { nome: "Fevereiro", novosClientes: 600, regular: 500, premium: 100 },
    { nome: "Março", novosClientes: 800, regular: 300, premium: 500 },
    { nome: "Abril", novosClientes: 700, regular: 400, premium: 300 },
    { nome: "Maio", novosClientes: 500, regular: 200, premium: 300 },
    { nome: "Junho", novosClientes: 400, regular: 100, premium: 300 },
    { nome: "Julho", novosClientes: 600, regular: 400, premium: 200 },
    { nome: "Agosto", novosClientes: 700, regular: 300, premium: 400 },
    { nome: "Setembro", novosClientes: 800, regular: 500, premium: 300 },
    { nome: "Outubro", novosClientes: 900, regular: 600, premium: 300 },
    { nome: "Novembro", novosClientes: 1000, regular: 700, premium: 300 },
    { nome: "Dezembro", novosClientes: 1100, regular: 800, premium: 300 },
];

export default function GraficoClientes() {
    return (
        <div style={{height: 300}}>
            <h1>Gráfico de Novos Clientes</h1>
            <ResponsiveContainer>
                <LineChart data={dados}>
                    <CartesianGrid strokeDasharray="4 4"/>
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