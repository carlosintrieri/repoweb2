import Processo from "../abstracoes/processo";
import MenuRegistroTelefone from "../menus/menuRegistroTelefone";
import Cliente from "../modelos/cliente";
import CadastroTelefone from "./cadastroTelefone";

export default class CadastrarContatosCliente extends Processo {
    private cliente: Cliente
    constructor(cliente: Cliente) {
        super()
        this.cliente = cliente
        this.menu = new MenuRegistroTelefone()
    }

    processar(): void {
        this.menu.mostrar()
        let quantidadeContatos = this.entrada.receberNumero('Quantos contatos deseja cadastrar?')

        for (let i = 0; i < quantidadeContatos; i++) {
            let processo = new CadastroTelefone(this.cliente)
            processo.processar()
        }
    }
}


