import { ChartNoAxesCombined, Layers, UsersRound, Files, Menu} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const estiloElementos = "cursor-pointer text-white p-2 hover:bg-blue-700 hover:font-bold";

export function MenuLateral() {
    const [aberto, setAberto] = useState(false);
    const [desktop, setDesktop] = useState(window.innerWidth >= 1024);

    useEffect(() => {
        const handleResize = () => {
            setDesktop(window.innerWidth >= 1024);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <>
            {!desktop && <Menu onClick={() => setAberto(!aberto)}/>}
            {(desktop || aberto) &&
                <aside className={`bg-blue-500 h-screen p-2 lg:relative absolute top-0 w/34`}>
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
                                <li className={estiloElementos}>
                                    <Link to="/relatorios" aria-label="Clique para ir à página de etapas">
                                        <Files />
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                </aside>
            }
        </>
    )   
}