import Menu from "../interfaces/menu";

export default class MenuModificarDependente implements Menu {
    mostrar(): void {
        console.clear()
        console.log(`==============================================`)
        console.log(`|       ATUALIZAÇÃO DE DADOS PESSOAIS       |`)
        console.log(`|             MEMBRO DEPENDENTE             |`)
        console.log(`==============================================`)
        console.log(`| Opções de atualização:                    |`)
        console.log(`| 1 - Alterar nome completo                 |`)
        console.log(`| 2 - Alterar apelido                       |`)
        console.log(`| 3 - Corrigir data de nascimento           |`)
        console.log(`| 4 - Atualizar documentação                |`)
        console.log(`| 5 - Gerenciar telefones                   |`)
        console.log(`| 0 - Voltar ao menu anterior               |`)
        console.log(`==============================================`)
    }
}


