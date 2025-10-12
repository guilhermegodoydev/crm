import CardEtapa from "../components/CardEtapa";

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

export default function Etapas() {
    return (
        <section>
            <div className="grid grid-cols-5 gap-8">
              {etapas.map(etapa => (
                <CardEtapa 
                  id={etapa.id}
                  titulo={etapa.nome}
                  leads={etapa.leads}
                  taxaConversao={etapa.taxaConversao}
                  qualidade={etapa.qualidade}
                />
              ))}
            </div>
        </section>
    );
}