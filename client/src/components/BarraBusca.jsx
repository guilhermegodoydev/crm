import { Search } from "lucide-react";

export function BarraBusca({ className = "", placeholder, onChange }) {
    return (
        <div className={`flex gap-3 p-1 rounded-md shadow-md border-1 border-gray-300 mb-5 ${className}`}>
            <Search/>
            <input 
            type="text" 
            name="buscar" 
            id="buscar" 
            placeholder={placeholder} 
            className="w-full"
            onChange={onChange}
            />
        </div>
    );
}