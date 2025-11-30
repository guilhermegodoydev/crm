export function HeaderDetalhesCliente({ clienteParcial, onEditar, onAddAtividade, onExcluir }) {
    const { nome, idade, status, ultimoContato } = clienteParcial;

    return (
        <div className="lg:flex justify-between items-start">
            <div>
                <h1>{nome} - {idade} anos</h1>
                <p className="block text-gray-400">Último Contato: {ultimoContato} • Status: {status}</p>
            </div>
            <div className="flex justify-between mt-3 lg:mt-0 lg:gap-10 gap-2">
                <button className="bg-blue-400 rounded-sm text-white p-2" onClick={onEditar}>
                    Editar
                </button>
                <button className="bg-gray-200 rounded-sm p-2" onClick={onAddAtividade}>
                    Adicionar Atividade
                </button>
                <button className="bg-red-400 rounded-sm p-2 text-white" onClick={onExcluir}>
                    Excluir
                </button>
            </div>
        </div>
    );
}