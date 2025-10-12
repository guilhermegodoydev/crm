import { Outlet, useMatches } from "react-router-dom";
import { MenuLateral } from "./components/layout";

function App() {
    const matches = useMatches();

    const titulo = [...matches].at(-1)?.handle?.title || "CRM";

    return (
        <main className="flex">
            <MenuLateral/>   
            <div className="flex flex-col flex-1 p-4">
                <h1>{titulo}</h1>
                <hr className="border-1 border-gray-100 mb-3"/>
                <Outlet/>
            </div>
        </main>
    )
}

export default App;