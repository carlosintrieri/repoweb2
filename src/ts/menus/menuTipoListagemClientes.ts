import Menu from "../interfaces/menu";

export default class MenuTipoListagemClientes implements Menu {
    mostrar(): void {
        console.log(`==============================================`)
        console.log(`|       SISTEMA DE GESTÃO DE CLIENTES       |`)
        console.log(`|            CONSULTA DE CADASTROS          |`)
        console.log(`==============================================`)
        console.log(`| Selecione o tipo de consulta:             |`)
        console.log(`| 1 - Listar todos os titulares             |`)
        console.log(`| 2 - Listar dependentes de um titular      |`)
        console.log(`| 0 - Voltar ao menu anterior               |`)
        console.log(`==============================================`)
    }
}



