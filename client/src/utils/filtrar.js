export default function(dados, filtros) {
    let dadosFiltrados = dados.filter(item => {
        return Object.entries(filtros).every(([campo, valor]) => {
            if (!valor) return true;
            return item[campo]?.toString().toLowerCase().includes(valor.toString().toLowerCase());
        });
    });

    return dadosFiltrados;
}