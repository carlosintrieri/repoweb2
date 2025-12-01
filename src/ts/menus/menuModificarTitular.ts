import Menu from "../interfaces/menu";

export default class MenuModificarTitular implements Menu {
    mostrar(): void {
        console.clear()
        console.log(`==============================================`)
        console.log(`|       ATUALIZAÇÃO DE DADOS PESSOAIS       |`)
        console.log(`|             TITULAR DA CONTA              |`)
        console.log(`==============================================`)
        console.log(`| Opções de atualização:                    |`)
        console.log(`| 1 - Alterar nome completo                 |`)
        console.log(`| 2 - Alterar apelido                       |`)
        console.log(`| 3 - Corrigir data de nascimento           |`)
        console.log(`| 4 - Atualizar endereço                    |`)
        console.log(`| 5 - Gerenciar documentos                  |`)
        console.log(`| 6 - Gerenciar telefones                   |`)
        console.log(`| 0 - Voltar ao menu anterior               |`)
        console.log(`==============================================`)
    }
}

