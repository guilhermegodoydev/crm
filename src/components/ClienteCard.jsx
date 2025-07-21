import { Pencil, Trash2 } from "lucide-react";

export default function ClienteCard({ cliente }) {
    return (
        <div className="relative shadow-md p-4 bg-white rounded-sm border-2 border-gray-200 mb-4">
            <h1>{cliente.nome}</h1>
            <p>{cliente.email}</p>
            <p>{cliente.telefone}</p>
            <p>{cliente.observacoes}</p>
            <p>{cliente.status}</p>
            <div className="absolute flex top-2 right-2 gap-4">
                <Pencil/>
                <Trash2/>
            </div>
        </div>
    )
}