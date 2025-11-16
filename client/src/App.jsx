import { Outlet, useMatches } from "react-router-dom";
import { MenuLateral } from "./components/layout/MenuLateral";
import { TelaProvider } from "./context/TelaContexto";
import { AlertaProvider } from "./context/AlertaContexto";

function App() {
    const matches = useMatches();

    const titulo = [...matches].at(-1)?.handle?.title || "";

    return (
        <AlertaProvider>
            <TelaProvider>
                <div className="flex">
                    <MenuLateral/>   
                    <main className="flex flex-col flex-1 p-4">
                        {titulo && 
                            <>
                                <h1>{titulo}</h1>
                                <hr className="border-1 border-gray-100 mb-3"/>
                            </>
                        }
                        <Outlet/>
                    </main>
                </div>
            </TelaProvider>
        </AlertaProvider>
    )
}

export default App;