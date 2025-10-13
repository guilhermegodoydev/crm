import { useDraggable } from "@dnd-kit/core";

export default function LeadArastavel({ lead, etapaId }) {
    const {attributes, listeners, setNodeRef, transform, transition} = useDraggable({
        id: lead.id,
        data: {
            leadId: lead.id,
            etapaId
        }
    });

    const style = {transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined, transition };

    return (
        <li 
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            style={style}
            className="border-b-2 border-gray-400 shadow-md cursor-grab active:cursor-grabbing transition-transform"
        >
            <img src="../assets/perfil.png" alt=""  style={{height: 32, width: 32}}/>
            <h3>{lead.nome}</h3>
            <p>Profissão: {lead.profissao}</p>
            <p>Origem: {lead.origem}</p>
        </li>
    );
}