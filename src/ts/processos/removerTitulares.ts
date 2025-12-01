import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";
import ListagemTitulares from "./listagemTitulares";

export default class RemoverTitulares extends Processo {
    private armazem: Armazem
    constructor() {
        super()
        this.armazem = Armazem.InstanciaUnica
    }

    processar(): void {
        console.clear()
        console.log('==============================================')
        console.log('|       SISTEMA DE GESTÃO DE CLIENTES       |')
        console.log('|         REMOÇÃO DE CLIENTE TITULAR        |')
        console.log('==============================================')
        console.log('ATENÇÃO: Esta operação não pode ser desfeita.')
        console.log('==============================================')

        // Verifica se existem titulares
        if (this.armazem.Clientes.length === 0) {
            console.log('Não há clientes titulares cadastrados no sistema.')
            return
        }

        console.log('Selecione o titular que deseja remover:')
        this.processo = new ListagemTitulares()
        this.processo.processar()

        let id = this.entrada.receberNumero('Digite o ID do titular para remover (0 para cancelar):')
        if (id === 0) {
            console.log('Operação cancelada pelo usuário.')
            return
        }

        // Validação do ID
        if (id < 1 || id > this.armazem.Clientes.length) {
            console.log('ID inválido! Operação cancelada.')
            return
        }

        // ÍNDICE CORRETO: É necessário subtrair 1 do ID para obter o índice correto no array
        let indexTitular = id - 1;
        let titular = this.armazem.Clientes[indexTitular]

        // Verifica se há dependentes
        if (titular.Dependentes && titular.Dependentes.length > 0) {
            console.log('\n==============================================')
            console.log('|                ERRO NA OPERAÇÃO            |')
            console.log('==============================================')
            console.log(`O titular ${titular.nome} possui ${titular.Dependentes.length} dependente(s) vinculado(s).`)
            console.log('Não é possível remover um titular com dependentes.')
            console.log('Remova todos os dependentes antes de excluir o titular.')
            console.log('==============================================')
            return
        }

        // Confirmação final
        console.log('\n==============================================')
        console.log('|             CONFIRMAÇÃO DE REMOÇÃO         |')
        console.log('==============================================')
        console.log(`Titular: ${titular.nome}`)
        console.log(`Cadastrado desde: ${titular.DataCadastro.toLocaleDateString()}`)
        console.log('==============================================')

        let confirmacao = this.entrada.receberTexto(`Digite "CONFIRMAR" para remover o titular:`).toUpperCase()

        if (confirmacao !== "CONFIRMAR") {
            console.log('Operação cancelada pelo usuário.')
            return
        }

        // Remove o titular
        try {
            this.armazem.Clientes.splice(indexTitular, 1)

            console.log('\n==============================================')
            console.log('|       REMOÇÃO REALIZADA COM SUCESSO        |')
            console.log('==============================================')
            console.log(`Cliente titular removido do sistema.`)
            console.log(`Total de clientes restantes: ${this.armazem.Clientes.length}`)
            console.log('==============================================')
        } catch (error) {
            console.log('\n==============================================')
            console.log('|          ERRO DURANTE A REMOÇÃO            |')
            console.log('==============================================')
            console.log('Ocorreu um erro ao tentar remover o cliente:')
            console.log(error)
            console.log('Por favor, tente novamente ou contate o suporte.')
            console.log('==============================================')
        }
    }
}

