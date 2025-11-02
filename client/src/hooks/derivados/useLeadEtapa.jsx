import { useCallback, useMemo } from "react";

import { useEtapa } from "../dominio/useEtapa";
import { useLead } from "../dominio/useLead";

export function useLeadEtapa() {
    const { etapas, carregando: caEtapas, erro: erEtapas } = useEtapa();
    const { leads, atualizar: atualizarLead, carregando: caLeads, erro: erLeads } = useLead(); 
    
    const carregando = caEtapas || caLeads;
    const erro = erEtapas || erLeads;

    const leadsPorEtapa = useMemo(() => {
        return etapas.map(e => ({
            ...e,
            leads: leads.filter(l => l.etapa == e.id)
        }));
    }, [etapas, leads]);

    const moverLeadParaEtapa = useCallback((leadId, etapaId) => {
        const lead = leads.find(l => l.id == leadId);
        if (!lead || lead.etapa == etapaId) return;

        atualizarLead(leadId, { etapa: etapaId});
    }, [leads, atualizarLead]);

    return { leadsPorEtapa, moverLeadParaEtapa, carregando, erro};
}