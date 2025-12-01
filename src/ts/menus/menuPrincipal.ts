import Menu from "../interfaces/menu";

export default class MenuPrincipal implements Menu {
    mostrar(): void {
        console.clear(); // Limpa a tela para melhor visualização
        console.log(`****************************************************`);
        console.log(`*        ATLANTIS WATER PARK - MENU PRINCIPAL      *`);
        console.log(`****************************************************`);
        console.log(`| Selecione uma das opções disponíveis:            |`);
        console.log(`|--------------------------------------------------|`);
        console.log(`| GERENCIAMENTO DE VISITANTES:                     |`);
        console.log(`|--------------------------------------------------|`);
        console.log(`| 1 - Cadastrar novo visitante                     |`);
        console.log(`| 2 - Atualizar dados de visitante                 |`);
        console.log(`| 3 - Consultar cadastros                          |`);
        console.log(`| 4 - Remover cadastro de visitante                |`);
        console.log(`|--------------------------------------------------|`);
        console.log(`| 0 - Encerrar sistema                             |`);
        console.log(`****************************************************`);
    }
}

