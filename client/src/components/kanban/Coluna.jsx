import { useDroppable } from "@dnd-kit/core";

export function Coluna({ id, children }) {
    const { setNodeRef } = useDroppable({ id: String(id) });

    return (
    <div 
        ref={setNodeRef}
        id={String(id)}
        className="bg-gray-50 rounded-md min-w-1/6 max-w-1/6"
    >
        {children}
    </div>
    );
}