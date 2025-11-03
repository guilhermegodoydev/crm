import { Card } from "./Card";
import { X } from "lucide-react";

export function Modal({ titulo, mensagem, className = "", children , aberto, onFechar }) {
    if (!aberto) return null;

    return (
        <Card className={`w-100 absolute left-[50%] top-[50%] translate-[-50%] bg-white ${className}`}>
            <div className="flex justify-between items-center">
                <h2>{titulo ?? 'Aviso'}</h2>
                <X onClick={onFechar} className="cursor-pointer" />
            </div>
            <hr className="border-gray-300" />
            <div className="py-5">
                {mensagem}
            </div>
            {children}
        </Card>
    );
}