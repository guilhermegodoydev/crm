import Card from "../components/Card";
import GraficoBarras from "../components/graficos/GraficoBarras";
import GraficoLinhas from "../components/graficos/GraficoLinhas";
import GraficoPizza from "../components/graficos/GraficoPizza";

const dadosGraficoPizza = [
    { id: 1, origem: 'Indicação', clientes: 400 },
    { id: 2, origem: 'Redes Sociais', clientes: 300 },
    { id: 3, origem: 'Google Ads', clientes: 300 },
    { id: 4, origem: 'Outros', clientes: 200 },
];

const dadosGraficoLinha = [
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

const dadosGraficoBarra = [
    { id: 1, nome: 'Lead Capturado', regular: 4000, premium: 2400, },
    { id: 2, nome: 'Contato', regular: 3000, premium: 1398, },
    { id: 3, nome: 'Proposta', regular: 2000, premium: 9800, },
    { id: 4, nome: 'Negociação', regular: 2780, premium: 3908, },
    { id: 5, nome: 'Fechamento ganho', regular: 1890, premium: 4800, },
    { id: 6, nome: 'Perdido', regular: 2390, premium: 3800, },
];

export default function Dashboard() {
    return (
        <section className="h-full overflow-hidden">
            <h1>Dashboard</h1>
            <hr className="border-1 border-gray-100 mb-3"/>

            <div className="grid grid-cols-3 grid-rows-2 gap-8 h-[88%]">
                <Card titulo="Novos Clientes" valor="1,250" taxaCrescimento={15}/>
                <Card titulo="Clientes Perdidos" valor="200" taxaCrescimento={-5}/>

                <GraficoBarras 
                    className="col-span-1"
                    titulo="Etapas de Leads"
                    data={dadosGraficoBarra}
                    layout="vertical"
                    eixoYKey="nome"
                    barras={[
                        {id: "barra-clientes-regulares", dataKey: "regular", stackId: "a", fill: "#8c00ffff"},
                        {id: "barra-clientes-premium", dataKey: "premium", stackId: "a", fill: "#0044ffff"}
                    ]}
                />

                <GraficoLinhas 
                    className="col-span-2" 
                    titulo="Novos clientes" 
                    data={dadosGraficoLinha} eixoXKey="nome" 
                    linhas={[
                        {id: "linha-clientes", dataKey: "novosClientes", nomeLinha: "Novos Clientes"},
                        {id: "linha-clientes-regular", dataKey: "regular", nomeLinha: "Clientes Regulares"},
                        {id: "linha-clientes-premium", dataKey: "premium", nomeLinha: "Clientes Premium"}
                    ]}
                />

                <GraficoPizza 
                    titulo="Origem dos Clientes" 
                    data={dadosGraficoPizza} 
                    dataKey="clientes" 
                    nameKey="origem"
                />
            </div>
        </section>
    );
}