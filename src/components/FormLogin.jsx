import { useState } from "react";

export default function FormLogin() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  function enviar() {
    //Adicionar Envio de dados
    console.log(email, senha);
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        enviar();
      }}
      className="flex flex-col shadow-md rounded-md bg-white p-2"
    >
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        name="email"
        id="email"
        className="border rounded-md bg-gray-50 mb-4"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        autoComplete="username"
      />

      <label htmlFor="senha">Senha:</label>
      <input
        type="password"
        name="senha"
        id="senha"
        className="border rounded-md bg-gray-50 mb-4"
        onChange={(e) => setSenha(e.target.value)}
        value={senha}
        autoComplete="current-password"
      />

      <p>
        Não tem uma conta ainda? <a href="">Cadastre-se</a>
      </p>

      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded-md mt-4"
      >
        Entrar
      </button>
    </form>
  );
}
