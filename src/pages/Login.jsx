import { useForm } from "react-hook-form";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const enviar = (dados) => {
    console.log(dados);
  };

  return (
    <form onSubmit={handleSubmit(enviar)}>
      <label htmlFor="email">Email:</label>
      <input
        id="email"
        {...register("email", { required: "O email é obrigatório" })}
      />
      
      {errors.email && <p>{errors.email.message}</p>}

      <label htmlFor="senha">Senha:</label>
      <input
        type="password"
        id="senha"
        {...register("senha", { required: "A senha é obrigatória" })}
      />
      {errors.senha && <p>{errors.senha.message}</p>}

      <button type="submit">Enviar</button>
    </form>
  );
}