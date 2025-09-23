import { ChartNoAxesCombined, UsersRound, ArrowLeft, Menu } from 'lucide-react';
import { useState } from 'react';

const estiloElementos = "flex gap-4 cursor-pointer border-b border-white text-white p-2 hover:bg-blue-700 hover:font-bold";

export default function MenuLateral() {
    const [visivel, setVisivel] = useState(false);

    return (
        <div>
            <button aria-label='Clique para Abrir o Menu' onClick={() => setVisivel(!visivel)}><Menu className="m-2"/></button>
            <nav className={`z-1 bg-blue-500 w-1/4 h-screen absolute top-0 p-2 transition-all ease-out transform ${ visivel ? "translate-x-0 shadow-black shadow-xl" : "-translate-x-full"}`}>
                <ul>
                    <li onClick={() => setVisivel(!visivel)}>
                        <ArrowLeft className="text-white" />
                    </li>
                    <li className={estiloElementos}>
                        <ChartNoAxesCombined />
                        DashBoard
                    </li>
                    <li className={estiloElementos}>    
                        <UsersRound />
                        Clientes
                    </li>
                </ul>
            </nav>
        </div>
    )   
}