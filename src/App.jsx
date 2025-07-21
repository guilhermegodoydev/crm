import ClienteForm from "./components/ClienteForm";
import ClienteList from "./components/ClienteList";

export default function App() {
  return (
    <div>
      <ClienteForm />
      <ClienteList clientes={[
        { id: 1, nome: "John Doe", email: "john@example.com", telefone: "1234-5678", observacoes: "Cliente VIP", status: "ativo" },
        { id: 2, nome: "Jane Smith", email: "jane@example.com", telefone: "8765-4321", observacoes: "Cliente regular", status: "inativo" }
      ]} />
    </div>
  )
}