import Processo from "../abstracoes/processo";
import MenuPrincipal from "../menus/menuPrincipal";
import TipoCadastroCliente from "./tipoCadastroCliente";
import TipoListagemClientes from "./tipoListagemClientes";
import TipoModificarCliente from "./tipoModificarCliente";
import TipoRemoverCliente from "./tipoRemoverCliente";

export default class Principal extends Processo {
    constructor() {
        super()
        this.execucao = true
        this.menu = new MenuPrincipal()
    }

    processar(): void {
        this.menu.mostrar()
        this.opcao = this.entrada.receberNumero('Digite o número da opção desejada:')

        switch (this.opcao) {
            case 1: // Cadastrar
                console.log("\nIniciando cadastro de cliente...");
                try {
                    this.processo = new TipoCadastroCliente()
                    this.processo.processar()
                } catch (error) {
                    console.log("ERRO NO PROCESSO DE CADASTRO:", error)
                }
                break

            case 2: // Atualizar
                console.log("\nIniciando atualização de dados...");
                this.processo = new TipoModificarCliente()
                this.processo.processar()
                break

            case 3: // Consultar
                console.log("\nIniciando consulta de cadastros...");
                this.processo = new TipoListagemClientes()
                this.processo.processar()
                break

            case 4: // Remover
                console.log("\nIniciando remoção de cadastro...");
                this.processo = new TipoRemoverCliente()
                this.processo.processar()
                break

            case 0: // Sair
                this.execucao = false
                console.log('Sistema encerrado. Obrigado por utilizar o Atlantis Water Park!')
                break

            default:
                console.log('Opção inválida! Por favor, escolha uma opção entre 0 e 4.')
        }
    }
}


