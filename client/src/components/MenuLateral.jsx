

import { ChartNoAxesCombined, UsersRound, } from 'lucide-react';
import { Link } from 'react-router-dom';

const estiloElementos = "cursor-pointer text-white p-2 hover:bg-blue-700 hover:font-bold";

export default function MenuLateral() {
    return (
        <nav className={`bg-blue-500 w-min h-screen top-0 p-2`}>
            <ul>
                <li className={estiloElementos}>
                    <Link to="/">
                        <ChartNoAxesCombined />
                    </Link>
                </li>
                <li className={estiloElementos}>
                    <Link to="/clientes">
                        <UsersRound />
                    </Link>
                </li>
            </ul>
        </nav>
    )   
}