import { Outlet, useMatches } from "react-router-dom";
import { MenuLateral } from "./components/layout";
import { TelaProvider } from "./context/TelaContexto";

function App() {
    const matches = useMatches();

    const titulo = [...matches].at(-1)?.handle?.title || "CRM";

    return (
        <TelaProvider>
            <div className="flex">
                <MenuLateral/>   
                <main className="flex flex-col flex-1 p-4">
                    <h1>{titulo}</h1>
                    <hr className="border-1 border-gray-100 mb-3"/>
                    <Outlet/>
                </main>
            </div>
        </TelaProvider>
    )
}

export default App;