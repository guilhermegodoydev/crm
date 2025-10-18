export function Filtro({id, nome, label, onChange, opcoes = []}) {
    return (
        <div>
            <label htmlFor={id}>{label}</label>
            <select className="bg-gray-100 rounded ml-2 shadow border border-gray-300"
                id={id}
                name={nome}
                onChange={onChange}
            >
                {opcoes.map(op => (
                    <option value={op.valor}>{op.texto}</option>
                ))}
            </select>
        </div>
    );
}