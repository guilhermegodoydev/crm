import { useState } from "react";
import CardEtapa from "../components/CardEtapa";
import ColunaEtapa from "../components/ColunaEtapa";
import { 
  DndContext, 
  useSensor, 
  useSensors, 
  PointerSensor, 
  closestCorners
} from "@dnd-kit/core";
import LeadArastavel from "../components/LeadArastavel";

const etapas = [
  {
    id: 1,
    nome: "Contato Inicial",
    leads: 200,
    taxaConversao: "75%",
    qualidade: "Alta"
  },
  {
    id: 2,
    nome: "Proposta Enviada",
    leads: 150,
    taxaConversao: "60%",
    qualidade: "Média"
  },
  {
    id: 3,
    nome: "Negociação",
    leads: 90,
    taxaConversao: "50%",
    qualidade: "Média"
  },
  {
    id: 4,
    nome: "Fechado",
    leads: 60,
    taxaConversao: "100%",
    qualidade: "Alta"
  },
  {
    id: 5,
    nome: "Perdido",
    leads: 30,
    taxaConversao: "0%",
    qualidade: "Baixa"
  }
];

const leads = [
  {
    id: 1,
    nome: "Amanda Costa",
    profissao: "Gerente de Vendas",
    origem: "Instagram",
    etapa: 1
  },
  {
    id: 2,
    nome: "Bruno Lima",
    profissao: "Diretor Comercial",
    origem: "Indicação",
    etapa: 5
  },
  {
    id: 3,
    nome: "Carla Mendes",
    profissao: "Coordenadora de RH",
    origem: "Site",
    etapa: 2
  },
  {
    id: 4,
    nome: "Daniel Rocha",
    profissao: "Analista Financeiro",
    origem: "Facebook",
    etapa: 3
  },
  {
    id: 5,
    nome: "Elaine Souza",
    profissao: "CEO",
    origem: "LinkedIn",
    etapa: 4
  }
];

export default function Etapas() {
  const sensors = useSensors(useSensor(PointerSensor));
  const [leadsEtapas, setLeadsEtapas] = useState({
    1 : [1,2],
    2 : [3,4],
    3 : [5],
    4 : [],
    5 : []
  });

  const handleDragEnd = (e) => {
    const {active, over} = e;
    if (!over) return;

    const origem = String(active.data.current.etapaId);
    const destino = String(over.id);

    if (origem === destino) return;

    const leadId = active.data.current.leadId;

    setLeadsEtapas((prev) => {
      const novaOrigem = prev[origem].filter((id) => id !== leadId);
      const novoDestino = [...prev[destino], leadId];

      return {
        ...prev,
        [origem]: novaOrigem,
        [destino]: novoDestino,
      };
    });
  };

  return (
      <DndContext sensors={sensors} collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
        <section className="grid grid-cols-5 gap-8">
          {etapas.map(etapa => (
            <ColunaEtapa key={etapa.id} id={etapa.id}>
              <CardEtapa 
                id={etapa.id}
                titulo={etapa.nome}
                leads={etapa.leads}
                taxaConversao={etapa.taxaConversao}
                qualidade={etapa.qualidade}
              />

              <ul>
                {leadsEtapas[etapa.id]?.map((leadId => {
                  const lead = leads.find((l) => l.id === leadId);
                  return (
                    <LeadArastavel
                      key={lead.id}
                      lead={lead}
                      etapaId={etapa.id}
                    />
                  );
                }))}
              </ul>
            </ColunaEtapa>
          ))}
        </section>
      </DndContext>
  );
}