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

  function deletarCliente(id) {
    setClientes(clientes.filter(cliente => cliente.id !== id));
  }

  function adicionarCliente(novoCliente) {
    setClientes([...clientes, { id: clientes.length + 1, ...novoCliente }]);
  }

  return (
    <div>
      <ClienteForm adicionarCliente={adicionarCliente} />
      <ClienteList clientes={clientes} deletarCliente={deletarCliente} />
    </div>
  )
}