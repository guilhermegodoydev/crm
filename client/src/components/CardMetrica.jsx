import { Card } from "./Card";

export function CardMetrica({ titulo, valor, taxaCrescimento, className}) {

    const positivo = taxaCrescimento >= 0;
    const crescimento = (positivo ? '+': '') + taxaCrescimento + '% em comparação ao último mês';

    return (
        <Card className="flex flex-col items-center justify-center">
            <h2>{titulo}</h2>
            <div className={`${className} border-3 flex items-center justify-center rounded-full mt-4 bg-gray-100 ${positivo ? "border-green-500" : "border-red-500"}`}>
                <p className="text-4xl font-bold">{valor}</p>
            </div>
            <p>{crescimento}</p>
        </Card>
    );
}