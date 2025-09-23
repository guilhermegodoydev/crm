export default function FiltroGrafico({opcoes, label, onChange}) {
    return (
        <div className="flex gap-5">
            <label htmlFor="produtos">{label}</label>
            <select name="produtos" id="produtos" className="w-35 border rounded-sm bg-gray-100" onChange={onChange}> 
                {opcoes.map(opcao => (
                   <option key={opcao.id} value={opcao.id}>{opcao.nome}</option> 
                ))}
            </select>
        </div>
    );
}