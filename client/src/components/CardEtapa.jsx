export default function CardEtapa({id, titulo, leads, taxaConversao, qualidade}) {
    const idEtapa = `progresso-etapa-${id}`;

    return (
        <div className="border-2 border-gray-200 shadow-lg rounded-md p-2 bg-gray-100">
            <h2>{titulo}</h2>
            <div>
                <p>Leads na Etapa: {leads}</p>
                <div>
                    <label className="block" htmlFor={idEtapa}>Taxa de Conversão:</label>
                    <div className="flex items-center justify-between">
                        <progress 
                            id={idEtapa} 
                            value={parseInt(taxaConversao.replace("%",""))} 
                            max="100"
                            className="w-8/10"
                        />
                        <span>{taxaConversao}</span>
                    </div>
                </div>
                <p>Qualidade da Etapa: <span className={`font-semibold  bg-white/20 ${qualidade.toLowerCase() === "alta" ? "text-green-800" : (qualidade.toLowerCase() === "média" ? "text-yellow-800" : "text-red-800")}`}>{qualidade}</span></p>
            </div>
        </div>
    );
}