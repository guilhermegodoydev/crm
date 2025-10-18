import { GraficoBarras, GraficoLinhas, GraficoPizza} from "../components/graficos";
import CardMetrica from "../components/CardMetrica";
import { useTela } from "../context/TelaContexto";

const dadosGraficoPizza = [
    { id: 1, origem: 'Indicação', leads: 400 },
    { id: 2, origem: 'Redes Sociais', leads: 300 },
    { id: 3, origem: 'Google Ads', leads: 300 },
    { id: 4, origem: 'Outros', leads: 200 },
];

const dadosGraficoLinha = [
    { nome: "Jan", novosLeads: 400},
    { nome: "Fev", novosLeads: 600},
    { nome: "Mar", novosLeads: 800},
    { nome: "Abr", novosLeads: 700},
    { nome: "Mai", novosLeads: 500},
    { nome: "Jun", novosLeads: 400},
    { nome: "Jul", novosLeads: 600},
    { nome: "Ago", novosLeads: 700},
    { nome: "Set", novosLeads: 800},
    { nome: "Out", novosLeads: 900},
    { nome: "Nov", novosLeads: 1000},
    { nome: "Dez", novosLeads: 1100},
];

const dadosGraficoBarra = [
    { id: 1, nome: 'Capturado', leads: 4000},
    { id: 2, nome: 'Contato', leads: 3000},
    { id: 3, nome: 'Proposta', leads: 2000},
    { id: 4, nome: 'Negociação', leads: 2780},
    { id: 5, nome: 'Fechamento', leads: 1890},
    { id: 6, nome: 'Perdido', leads: 2390},
];

export default function Dashboard() {
    const { desktop } = useTela();

    return (
        <section>
            <div className="lg:grid grid-cols-3 grid-rows-2 gap-8 flex flex-col">
                <CardMetrica titulo="Novos Leads" valor="1,250" taxaCrescimento={15} className="h-30 w-30"/>
                <CardMetrica titulo="Leads Perdidos" valor="200" taxaCrescimento={-5} className="h-30 w-30"/>

                <GraficoBarras 
                    className="col-span-1 lg:h-auto h-55"
                    titulo="Etapas de Leads"
                    data={dadosGraficoBarra}
                    layout={desktop ? "vertical" : "horizontal"}
                    eixoYKey={desktop ? "nome" : "leads"}
                    eixoXkey={desktop ? "leads" : "nome"}
                    larguraEixoY={desktop ? 100 : 45}
                    barras={[
                        {id: "barra-leads", dataKey: "leads", stackId: "a", fill: "#0044ffff"}
                    ]}
                />

                <GraficoLinhas 
                    className="col-span-2 lg:h-auto h-55" 
                    titulo="Novos Leads" 
                    data={dadosGraficoLinha} eixoXKey="nome" 
                    larguraEixoY={36}
                    linhas={[
                        {id: "linha-leads", dataKey: "novosLeads", nomeLinha: "Novos Leads"}
                    ]}
                />

                <GraficoPizza 
                    className="lg:h-auto h-55"
                    titulo="Origem dos Leads" 
                    data={dadosGraficoPizza} 
                    dataKey="leads" 
                    nameKey="origem"
                />
            </div>
        </section>
    );
}