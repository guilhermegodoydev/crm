export default function CardEtapa({id, titulo, leads, taxaConversao, qualidade}) {
    const idEtapa = `progresso-etapa-${id}`;

    return (
        <div className="border-2 border-gray-200 shadow-lg rounded-md p-2 bg-gray-100">
            <h2>{titulo}</h2>
            <ul>
                <li>Leads na Etapa: {leads}</li>
                <li>
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
                </li>
                <li>Qualidade da Etapa: <span className={`font-semibold  bg-white/20 ${qualidade.toLowerCase() === "alta" ? "text-green-800" : (qualidade.toLowerCase() === "média" ? "text-yellow-800" : "text-red-800")}`}>{qualidade}</span></li>
            </ul>
            
            <button className="bg-blue-500 rounded-md w-full text-white cursor-pointer hover:bg-blue-600 mt-5">Ver Leads</button>
        </div>
    );
}