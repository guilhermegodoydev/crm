import { useDroppable } from "@dnd-kit/core";

export default function ColunaEtapa({ id, children }) {
    const { setNodeRef } = useDroppable({ id: String(id) });

    return (
    <div 
        ref={setNodeRef}
        id={String(id)}
        className="bg-gray-100 p-2 rounded min-h-[300px]"
    >
        {children}
    </div>
    );
}