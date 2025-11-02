import { useEtapa } from "../dominio/useEtapa";

export function useLeadEtapa() {
    const { etapas, carregando: caEtapas, erro: erEtapas } = useEtapa();
    const { leads, carregando: catLeads, erro: erLeads } = useLeads(); 

    const carregando = caEtapas || caLeads;
    const erro = erEtapas || erLeads;

    const listarLeadsPorEtapa = (etapaId) => {
        return leads.filter(l => l.etapa == etapaId);
    };

    return { listarLeadsPorEtapa, carregando, erro};
}