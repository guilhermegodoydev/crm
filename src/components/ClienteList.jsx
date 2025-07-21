import ClienteCard from "./ClienteCard";

export default function ClienteList({ clientes, onDelClienteClick }) {
  return (
    <div>
      <h1>Lista de Clientes</h1>
      {clientes.map((cliente) => {
        return <ClienteCard key={cliente.id} cliente={cliente} onDelClienteClick={onDelClienteClick} />;
      })}
    </div>
  );
}
