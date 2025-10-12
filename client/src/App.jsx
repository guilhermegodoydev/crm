import { Outlet } from "react-router-dom";
import { MenuLateral } from "./components/layout";

function App() {
    return (
        <main className="flex">
            <MenuLateral/>   
            <div className="flex-1 p-4">
                <Outlet/>
            </div>
        </main>
    )
}

export default App;