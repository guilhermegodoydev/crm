import { ChartNoAxesCombined, Layers, UsersRound, } from 'lucide-react';
import { Link } from 'react-router-dom';

const estiloElementos = "cursor-pointer text-white p-2 hover:bg-blue-700 hover:font-bold";

export default function MenuLateral() {
    return (
        <aside className={`bg-blue-500 w-min h-screen top-0 p-2`}>
            <nav>
                <ul>
                    <li className={estiloElementos}>
                        <Link to="/" aria-label="Clique para ir à página de dashboar">
                            <ChartNoAxesCombined />
                        </Link>
                    </li>
                    <li className={estiloElementos}>
                        <Link to="/clientes" aria-label="Clique para ir à página de clientes">
                            <UsersRound />
                        </Link>
                    </li>
                    <li className={estiloElementos}>
                        <Link to="/etapas" aria-label="Clique para ir à página de etapas">
                            <Layers/>
                        </Link>
                    </li>
                </ul>
            </nav>
        </aside>
    )   
}