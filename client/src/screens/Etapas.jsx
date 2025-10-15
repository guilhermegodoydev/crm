import { useState } from "react";
import { X } from "lucide-react";
import ColunaEtapa from "../components/ColunaEtapa";
import LeadArastavel from "../components/LeadArastavel";
import { 
  DndContext, 
  useSensor, 
  useSensors, 
  PointerSensor, 
  closestCorners
} from "@dnd-kit/core";

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
    nome: "Amanda Costa Pereira da Silva",
    profissao: "Gerente de Vendas",
    telefone: "1398765-4321",
    origem: "Instagram",
    etapa: 1,
    ultContato: "2025-10-10",
    empresa: "Não aplicavel"
  },
  {
    id: 2,
    nome: "Bruno Lima",
    profissao: "Diretor Comercial",
    telefone: "1392345-6789",
    origem: "Indicação",
    etapa: 5,
    ultContato: "2025-10-05",
    empresa: "Não aplicavel"
  },
  {
    id: 3,
    nome: "Carla Mendes",
    profissao: "Coordenadora de RH",
    telefone: "1399988-7766",
    origem: "Site",
    etapa: 2,
    ultContato: "2025-09-28",
    empresa: "Não aplicavel"
  },
  {
    id: 4,
    nome: "Daniel Rocha",
    profissao: "Analista Financeiro",
    telefone: "1391122-3344",
    origem: "Facebook",
    etapa: 3,
    ultContato: "2025-09-15",
    empresa: "Não aplicavel"
  },
  {
    id: 5,
    nome: "Elaine Souza",
    profissao: "CEO",
    telefone: "1395566-7788",
    origem: "LinkedIn",
    etapa: 4,
    ultContato: "2025-09-01",
    empresa: "Não aplicavel"
  }
];

export default function Etapas() {
  const [lead, setLead] = useState(null);
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

  const estilosInfos = "text-gray-700 w-1/2";
  const estilosInfosValores = "text-gray-700 font-medium max-w-1/2";
  const estiloBotao = "bg-blue-400 w-full rounded-md text-white mt-3";

  return (
    <>
      <DndContext sensors={sensors} collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
        <section className="flex overflow-x-auto space-x-4">
          {etapas.map(etapa => (
            <ColunaEtapa key={etapa.id} id={etapa.id}>
              <h2 className="text-center text-white bg-blue-500 rounded-md mb-5">{etapa.nome}</h2>
              <ul>
                {leadsEtapas[etapa.id]?.map((leadId => {
                  const lead = leads.find((l) => l.id === leadId);
                  return (
                    <LeadArastavel
                      key={lead.id}
                      lead={lead}
                      etapaId={etapa.id}
                      onClick={() => setLead(lead)}
                    />
                  );
                }))}
              </ul>
            </ColunaEtapa>
          ))}
        </section>
      </DndContext>
      {lead && 
        <div className="absolute right-10 bottom-0 bg-white w-2/8 p-4 shadow-md rounded-t-xl">
          <div className="flex justify-between">
            <h3>Informações do Lead</h3>
            <button onClick={() => setLead(null)}>
              <X/>
            </button>
          </div>
          <hr className="border-gray-300"/>
          <ul>
            <li className="flex mb-1">
              <p className={estilosInfos}>Email</p>
              <span className={estilosInfosValores}>{lead.nome}</span>
            </li>

            <li className="flex mb-1">
              <p className={estilosInfos}>Telefone</p>
              <span className={estilosInfosValores}>{lead.telefone}</span>
            </li>

            <li className="flex mb-1">
              <p className={estilosInfos}>Origem</p>
              <span className={estilosInfosValores}>{lead.origem}</span>
            </li>

            <li className="flex mb-1">
              <p className={estilosInfos}>Último Contato</p>
              <span className={estilosInfosValores}>{lead.ultContato}</span>
            </li>

            <li className="flex mb-1">
              <p className={estilosInfos}>Empresa</p>
              <span className={estilosInfosValores}>{lead.empresa}</span>
            </li>
          </ul>

          <div>
            <button className={estiloBotao}>Editar</button>
            <button className={estiloBotao}>Deletar</button>
          </div>
        </div>
      }
    </>
  );
}