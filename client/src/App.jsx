import { Outlet } from "react-router-dom";
import MenuLateral from "./components/MenuLateral";

function App() {
    return (
        <main className="flex">
            <MenuLateral/>   
            <div className="flex-1 p-6 overflow-x-hidden">
                <Outlet/>
            </div>
        </main>
    )
}

export default App;