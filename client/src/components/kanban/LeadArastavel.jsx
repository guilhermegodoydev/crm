import { useDraggable } from "@dnd-kit/core";
import { GripVertical } from "lucide-react";

export function LeadArastavel({ lead, etapaId, onClick }) {
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
            onClick={onClick} 
            style={style} 
            className="flex mb-5 p-2 gap-2 bg-white rounded-md border-gray-400 shadow relative cursor-pointer"
        >
            <img src="src/assets/perfil.png" alt={`Foto do ${lead.nome.split(" ")[0]}`} className="h-10 w-10 rounded-full"/>
            <div className="w-full max-w-[61%]">
                <h3 className="max-w-[100%] truncate" title={lead.nome}>{lead.nome}</h3>
                <p className="text-sm">Origem: {lead.origem}</p>
            </div>
            <div>
                <button     
                    ref={setNodeRef} 
                    {...listeners} 
                    {...attributes} 
                    className="cursor-grab active:cursor-grabbing"
                >
                    <GripVertical className="size-5"/>
                </button>
            </div>
        </li>
    );
}