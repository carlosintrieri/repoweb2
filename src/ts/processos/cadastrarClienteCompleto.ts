import Processo from "../abstracoes/processo";
import Cliente from "../modelos/cliente";
import CadastroIdentificacao from "./cadastroIdentificacao";
import CadastroRg from "./cadastroRg";
import CadastroPassaporte from "./cadastroPassaporte";

export default class CadastrarClienteCompleto extends Processo {
    private cliente: Cliente // CORRIGIDO: Usar Cliente em vez de any

    constructor(cliente: Cliente) {
        super()
        this.cliente = cliente
    }

    processar(): void {
        console.log('Cadastro de documentos:')

        // Garantir que o cliente tem um array de documentos
        if (!this.cliente.Documentos) {
            this.cliente.Documentos = []
        }

        let execucao = true
        while (execucao) {
            console.log(`\nQual documento deseja cadastrar?`)
            console.log(`1 - CPF`)
            console.log(`2 - RG`)
            console.log(`3 - Passaporte`)
            console.log(`0 - Finalizar cadastro de documentos`)

            let opcao = this.entrada.receberNumero('Escolha uma opção:')

            switch (opcao) {
                case 1:
                    this.processo = new CadastroIdentificacao(this.cliente)
                    this.processo.processar()
                    break;

                case 2:
                    this.processo = new CadastroRg(this.cliente)
                    this.processo.processar()
                    break;

                case 3:
                    this.processo = new CadastroPassaporte(this.cliente)
                    this.processo.processar()
                    break;

                case 0:
                    execucao = false
                    break;

                default:
                    console.log('Opção inválida!')
            }
        }

        console.log(`\nTotal de documentos cadastrados: ${this.cliente.Documentos.length}`)
    }
}

