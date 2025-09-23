export default function FiltroGrafico({produtos, label}) {
    return (
        <div className="flex gap-5">
            <p>{label}</p>
            <select name="produtos" id="produtos" className="w-35"> 
                {produtos.map(produto => (
                   <option key={produto.id} value={produto.id}>{produto.nome}</option> 
                ))}
            </select>
        </div>
    );
}