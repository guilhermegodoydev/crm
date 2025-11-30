import { useRouteError } from "react-router-dom";
import { Link } from "react-router-dom";

export function PaginaErro() {
    const erro = useRouteError();

    const status = erro?.status || erro?.statusCode || 500;
    const statusText = erro?.statusText || "Erro";
    const message = erro?.message || "Algo deu errado.";

    return (
        <main className="relative h-screen">
            <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
                <h1 className="text-8xl font-bold text-center">{status}</h1>
                <h2 className="text-xl mt-4">{statusText}</h2>
                <p>{message}</p>

                <Link to="/" className="">Voltar ao Início</Link>
            </div>
        </main>
    );
}