import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const dadosClientes = [
  { mes: 'Jan', novos: 12 },
  { mes: 'Fev', novos: 18 },
  { mes: 'Mar', novos: 10 },
  { mes: 'Abr', novos: 22 },
  { mes: 'Mai', novos: 15 },
  { mes: 'Jun', novos: 20 },
  { mes: 'Jun', novos: 30 },
];

export default function GraficoClientes() {
    return (
        <div style={{height: 300}}>
            <h1>Novos Clientes por Mês</h1>
            <ResponsiveContainer>
                <LineChart data={dadosClientes}>
                    <CartesianGrid/>
                    <XAxis dataKey="mes"/>
                    <YAxis/>
                    <Tooltip/>
                    <Line type="monotone" dataKey="novos"/>
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}