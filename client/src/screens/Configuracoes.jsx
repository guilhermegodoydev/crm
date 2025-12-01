import { useConfigsUsuario } from "../context/ConfigsUsuario";

export function Configuracoes() {
    const { config, atualizarConfig } = useConfigsUsuario();
    console.log(config);

    return(
        <>
            <section>
                <h2>Preferências de visualização</h2>

                <div>
                    <label htmlFor="tema">Tema Atual:</label>
                    <select 
                        value={config.tema} 
                        name="tema" 
                        id="tema" 
                        className="ml-1"
                        onChange={(e) => atualizarConfig({ tema: e.target.value })}
                    >
                        <option value="dark">Dark</option>
                        <option value="light">Light</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="formatoData">Formato de Datas</label>
                    <select 
                        value={config.formatoData}
                        name="formatoData" 
                        id="formatoData"
                        onChange={(e) => atualizarConfig({ formatoData: e.target.value})}
                    >
                        <option value="DD/MM/AAAA">DD/MM/AAAA</option>
                        <option value="MM/DD/AAAA">MM/DD/AAAA</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="qtItens">Número de itens por página(tabelas/listas)</label>
                    <select 
                        value={config.qtItensPag}
                        name="qtItens" 
                        id="qtItens"
                        onChange={(e) => atualizarConfig({ qtItensPag: e.target.value})}
                    >
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                    </select>
                </div>
            </section>
        </>
    );
}

//========================================================================================
//
//
//PERMITIR ALTERAÇÃO DO CMAPO DE STATUS DO CLIENTE
//ADICIONAR VALIDAÇÃO NO CAMPO DE TELEFONE PARA SEGUIR O FORMATO DE TELEFONE
//REMOVER CONTEXTO DE TELA E TROCAR POR USEMEDIAQUERY
//ADICIONAR EDIÇÃO DE ATIVIDADE DO HISTÓRICO DE ATIVIDADES
//
//========================================================================================