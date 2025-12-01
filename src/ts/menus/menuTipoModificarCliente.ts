import Menu from "../interfaces/menu";

export default class MenuTipoModificarCliente implements Menu {
    mostrar(): void {
        console.clear()
        console.log(`==============================================`)
        console.log(`|       SISTEMA DE GESTÃO DE CLIENTES       |`)
        console.log(`|           MÓDULO DE ATUALIZAÇÃO           |`)
        console.log(`==============================================`)
        console.log(`| Selecione o tipo de perfil:               |`)
        console.log(`| 1 - Titular (responsável principal)       |`)
        console.log(`| 2 - Dependente (membro vinculado)         |`)
        console.log(`| 0 - Retornar ao menu principal            |`)
        console.log(`==============================================`)
    }
}



