import GraficoClientes from "../components/graficos/GraficoClientes";
import GraficoOrigemClientes from "../components/graficos/GraficoOrigemClientes";

export default function Dashboard() {
    return (
        <main>
            <div className="grid grid-cols-3 grid-rows-auto">
                <GraficoClientes className="col-span-2"/>
                <GraficoOrigemClientes/>
            </div>
        </main>
    );
}