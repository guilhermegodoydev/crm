import { ArrowDown01, ArrowDownAZ, ArrowUp01, ArrowUpAZ } from "lucide-react";

export default function CabecalhoOrdenavel({titulo, tipo, ordenado, direcao, onClick, ariaLabel }) {
    let iconeAsc = null;
    let iconDesc = null;

    if (tipo === "texto") {
        iconeAsc = <ArrowUpAZ/>;
        iconDesc = <ArrowDownAZ/>;
    } else if (tipo === "numero") {
        iconeAsc = <ArrowUp01/>;
        iconDesc = <ArrowDown01/>;
    }
    else {
        throw new Error("Propriedade tipo inválida para o componente CabecalhoOrdenavel. Os tipos disponiveis são texto ou numero");
    }

    const icone = ordenado ? iconeAsc : iconDesc;

    return (
        <th>
            <button 
                className="flex justify-center gap-2 cursor-pointer w-fit m-auto" 
                onClick={onClick}
                aria-sort={ordenado ? (direcao === "asc" ? "ascending" : "descending") : undefined}
                aria-label={ariaLabel}
            >
                {titulo}
                {icone}
            </button>
        </th>
    );
}