import ClienteForm from "./components/ClienteForm";
import ClienteList from "./components/ClienteList";
import { useState } from "react";

export default function App() {
  const [clientes, setClientes] = useState([
    {
      id: 1,
      nome: "João da Silva",
      email: "joao@example.com",
      telefone: "1234-5678",
      observacoes: "Cliente VIP",
      status: "ativo"
    },
    {
      id: 2,
      nome: "Maria Oliveira",
      email: "maria@example.com",
      telefone: "8765-4321",
      observacoes: "Cliente regular",
      status: "inativo"
    }
  ]);

  function onDelClienteClick(id) {
    setClientes(clientes.filter(cliente => cliente.id !== id));
  }

  return (
    <div>
      <ClienteForm />
      <ClienteList clientes={clientes} onDelClienteClick={onDelClienteClick} />
    </div>
  )
}