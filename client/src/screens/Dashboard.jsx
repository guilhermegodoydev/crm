import Card from "../components/Card";
import Funil from "../components/graficos/Funil";
import GraficoClientes from "../components/graficos/GraficoClientes";
import GraficoOrigemClientes from "../components/graficos/GraficoOrigemClientes";

export default function Dashboard() {
    return (
        <div className="grid grid-cols-3 grid-rows-2 gap-15">
            <Card titulo="Novos Clientes" valor="1,250" taxaCrescimento={15}/>
            <Card titulo="Clientes Perdidos" valor="200" taxaCrescimento={-5}/>
            <Funil className="col-span-1"/>
            <GraficoClientes className="col-span-2"/>
            <GraficoOrigemClientes/>
        </div>
    );
}