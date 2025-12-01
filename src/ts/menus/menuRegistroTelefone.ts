import Menu from "../interfaces/menu";

export default class MenuRegistroTelefone implements Menu {
    mostrar(): void {
        console.clear()
        console.log(`==============================================`)
        console.log(`|          CADASTRO DE INFORMAÇÕES          |`)
        console.log(`|           MEIOS DE COMUNICAÇÃO            |`)
        console.log(`==============================================`)
        console.log(`| Informe os dados de telefone do cliente:  |`)
        console.log(`==============================================`)
    }
}


