import Menu from "../interfaces/menu";

export default class MenuTipoRemoverCliente implements Menu {
    mostrar(): void {
        console.clear()
        console.log(`==============================================`)
        console.log(`|       SISTEMA DE GESTÃO DE CLIENTES       |`)
        console.log(`|      MÓDULO DE REMOÇÃO DE CADASTROS       |`)
        console.log(`==============================================`)
        console.log(`| ATENÇÃO: Esta operação não pode ser       |`)
        console.log(`| desfeita após a confirmação.              |`)
        console.log(`==============================================`)
        console.log(`| Selecione o tipo de perfil:               |`)
        console.log(`| 1 - Titular (responsável principal)       |`)
        console.log(`| 2 - Dependente (membro vinculado)         |`)
        console.log(`| 0 - Cancelar operação e retornar          |`)
        console.log(`==============================================`)
    }
}








