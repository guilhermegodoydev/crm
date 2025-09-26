
export default function Card({ titulo, valor, taxaCrescimento}) {

    const positivo = taxaCrescimento >= 0;
    const crescimento = (positivo ? '+': '') + taxaCrescimento + '% em comparação ao último mês';

    return (
        <div className="flex flex-col items-center justify-center p-6 rounded shadow-md border border-gray-200">
            <h1 className="text-2xl font-semibold">{titulo}</h1>
            <div className={`border-3 flex items-center justify-center size-32 rounded-full mt-4 bg-gray-100 ${positivo ? "border-green-500" : "border-red-500"}`}>
                <p className="text-4xl font-bold">{valor}</p>
            </div>
            <p>{crescimento}</p>
        </div>
    );
}