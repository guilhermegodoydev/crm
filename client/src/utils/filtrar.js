export default function(dados, filtros) {
    let dadosFiltrados = dados.filter(item => {
        return Object.entries(filtros).every(([campo, valor]) => {
            if (!valor) return true;
            return String(item[campo]).toLowerCase() === String(valor).toLowerCase();
        });
    });

    return dadosFiltrados;
}