import { GraficoBarras, GraficoLinhas, GraficoPizza} from "../components/graficos";
import { CardMetrica } from "../components/CardMetrica";
import { useTela } from "../context/TelaContexto";
import { useAPI } from "../hooks/useAPI";

export default function Dashboard() {
    const { desktop } = useTela();
    const { dados, carregando, erro} = useAPI("/mock/metricas.json");

    if (carregando) return <div>Carregando...</div>;
    if (erro) return <div>Erro {erro}</div>;
    if (!dados || dados.length === 0) return null;

    return (
        <section>
            <div className="lg:grid grid-cols-3 grid-rows-2 gap-8 flex flex-col">
                <CardMetrica titulo="Novos Leads" valor="1,250" taxaCrescimento={15} className="h-30 w-30"/>
                <CardMetrica titulo="Leads Perdidos" valor="200" taxaCrescimento={-5} className="h-30 w-30"/>

                <GraficoBarras 
                    className="col-span-1 lg:h-auto h-55"
                    titulo="Etapas de Leads"
                    data={dados.metricas.barra}
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
                    data={dados.metricas.linha} eixoXKey="nome" 
                    larguraEixoY={36}
                    linhas={[
                        {id: "linha-leads", dataKey: "novosLeads", nomeLinha: "Novos Leads"}
                    ]}
                />

                <GraficoPizza 
                    className="lg:h-auto h-55"
                    titulo="Origem dos Leads" 
                    data={dados.metricas.pizza}
                    dataKey="leads" 
                    nameKey="origem"
                />
            </div>
        </section>
    );
}