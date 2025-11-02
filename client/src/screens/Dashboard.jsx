import { GraficoBarras } from "../components/graficos/GraficoBarras";
import { GraficoLinhas } from "../components/graficos/GraficoLinhas";
import { GraficoPizza} from "../components/graficos/GraficoPizza";
import { CardMetrica } from "../components/CardMetrica";

import { useTela } from "../context/TelaContexto";

import { useFetch } from "../hooks/helpers/useFetch";

export default function Dashboard() {
    const { desktop } = useTela();
    const { dados, carregando, erro} = useFetch("/mock/metricas.json");

    if (carregando) return <div>Carregando...</div>;
    if (erro) return <div>Erro {erro}</div>;
    if (!dados || dados.length === 0) return null;

    const estiloCards = "h-30 w-30 2xl:h-45 2xl:w-45";

    return (
        <section>
            <div className="lg:grid grid-cols-3 grid-rows-2 gap-8 flex flex-col xl:h-[85vh]">
                <CardMetrica 
                    titulo="Novos Leads" 
                    valor={dados.metricas.novosLeads} 
                    taxaCrescimento={15} 
                    className={estiloCards}
                />

                <CardMetrica 
                    titulo="Leads Perdidos" 
                    valor={dados.metricas.leadsPerdidos} 
                    taxaCrescimento={-5} 
                    className={estiloCards}
                />

                <GraficoBarras 
                    className="col-span-1 lg:h-auto h-55"
                    titulo="Etapas de Leads"
                    data={dados.metricas.barra}
                    layout={desktop ? "vertical" : "horizontal"}
                    eixoYKey={desktop ? "nome" : "leads"}
                    eixoXkey={desktop ? "leads" : "nome"}
                    larguraEixoY={desktop ? 100 : 45}
                    barras={[
                        {id: "barra-leads", dataKey: "leads", stackId: "a", fill: "#1b4e9b"}
                    ]}
                />

                <GraficoLinhas 
                    className="col-span-2 lg:h-auto h-55" 
                    titulo="Novos Leads" 
                    data={dados.metricas.linha} eixoXKey="nome" 
                    larguraEixoY={36}
                    linhas={[
                        {id: "linha-leads", dataKey: "novosLeads", nomeLinha: "Novos Leads", fill: "#1b4e9b"}
                    ]}
                />

                <GraficoPizza 
                    className="lg:h-auto h-75"
                    titulo="Origem dos Leads" 
                    data={dados.metricas.pizza}
                    dataKey="leads" 
                    nameKey="origem"
                />
            </div>
        </section>
    );
}