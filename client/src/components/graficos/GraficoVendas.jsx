import { BarChart, Bar, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import FiltroGrafico from "../FiltroGrafico";
import { useState } from "react";

const produtos = [
    { 
        id: "Todos", 
        nome: "Todos"
    },
    { 
        id: 1, 
        nome: "Produto 1", 
        vendas: [
            { mes: "Jan", vendas: 100 },
            { mes: "Fev", vendas: 300 },
            { mes: "Mar", vendas: 500 },
            { mes: "Abr", vendas: 700 },
            { mes: "Mai", vendas: 900 },
            { mes: "Jun", vendas: 1100 },
            { mes: "Jul", vendas: 1300 }
        ],
        totalVendas: 4900
    },
    { 
        id: 4, 
        nome: "Produto 2", 
        vendas: [
            { mes: "Jan", vendas: 200 },
            { mes: "Fev", vendas: 400 },
            { mes: "Mar", vendas: 600 },
            { mes: "Abr", vendas: 800 },
            { mes: "Mai", vendas: 1000 },
            { mes: "Jun", vendas: 1200 },
            { mes: "Jul", vendas: 1400 }
        ],
        totalVendas: 5200
    },
    { 
        id: 3, 
        nome: "Produto 3", 
        vendas: [
            { mes: "Jan", vendas: 300 },
            { mes: "Fev", vendas: 600 },
            { mes: "Mar", vendas: 900 },
            { mes: "Abr", vendas: 1200 },
            { mes: "Mai", vendas: 1500 },
            { mes: "Jun", vendas: 1800 },
            { mes: "Jul", vendas: 2100 }
        ],
        totalVendas: 7800
    },
];

const vendasGerais = [
    { mes: "Jan", vendas: 2400 },
    { mes: "Fev", vendas: 1398 },
    { mes: "Mar", vendas: 9800 },
    { mes: "Abr", vendas: 3908 },
    { mes: "Mai", vendas: 4800 },
    { mes: "Jun", vendas: 3800 },
    { mes: "Jul", vendas: 4300 },
];

export default function GraficoVendas() {
    const [filtro, setFiltro] = useState("");

    const dadosGrafico = !filtro || filtro == "Todos" ? vendasGerais : produtos.find(p => p.id == filtro).vendas;

    return (
        <div style={{height: 300}}>
            <h1>Vendas do mês</h1>
            <FiltroGrafico opcoes={produtos} label={"Fitrar por produto:"} onChange={(e) => setFiltro(e.target.value)}/>
            <ResponsiveContainer>
                <BarChart data={dadosGrafico}>
                    <CartesianGrid/>
                    <XAxis dataKey="mes"/>
                    <YAxis/>
                    <Tooltip/>
                    <Bar dataKey="vendas"/>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}