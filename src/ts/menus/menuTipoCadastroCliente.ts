import Menu from "../interfaces/menu";

export default class MenuTipoCadastroCliente implements Menu {
    mostrar(): void {
        console.log(`==============================================`)
        console.log(`| Qual tipo de cliente deseja cadastrar?    |`)
        console.log(`==============================================`)
        console.log(`| 1 - Titular (cliente principal)           |`)
        console.log(`| 2 - Dependente (vinculado a um titular)   |`)
        console.log(`| 0 - Voltar ao menu anterior               |`)
        console.log(`==============================================`)
    }
}


