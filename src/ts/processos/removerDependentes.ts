import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";
import ListagemDependentes from "./listagemDependentes";
import ListagemTitulares from "./listagemTitulares";

export default class RemoverDependentes extends Processo {
    private armazem: Armazem
    constructor() {
        super()
        this.armazem = Armazem.InstanciaUnica
    }

    processar(): void {
        console.clear()
        console.log('==============================================')
        console.log('|       SISTEMA DE GESTÃO DE CLIENTES       |')
        console.log('|        REMOÇÃO DE MEMBRO DEPENDENTE       |')
        console.log('==============================================')
        console.log('ATENÇÃO: Esta operação não pode ser desfeita.')
        console.log('==============================================')

        // Verifica se existem titulares
        if (this.armazem.Clientes.length === 0) {
            console.log('Não há clientes titulares cadastrados no sistema.')
            return
        }

        console.log('Primeiro, selecione o titular responsável:')
        this.processo = new ListagemTitulares()
        this.processo.processar()

        let idTitular = this.entrada.receberNumero('Digite o ID do titular (0 para cancelar):')
        if (idTitular === 0) {
            console.log('Operação cancelada pelo usuário.')
            return
        }

        // Validação do ID do titular
        if (idTitular < 1 || idTitular > this.armazem.Clientes.length) {
            console.log('ID inválido! Operação cancelada.')
            return
        }

        // ÍNDICE CORRETO: É necessário subtrair 1 do ID para obter o índice correto no array
        let indexTitular = idTitular - 1;
        let titular = this.armazem.Clientes[indexTitular]

        // Verifica se existem dependentes
        if (!titular.Dependentes || titular.Dependentes.length === 0) {
            console.log(`\nO titular ${titular.nome} não possui dependentes cadastrados.`)
            return
        }

        console.log(`\nAgora, selecione o dependente de ${titular.nome} que deseja remover:`)
        this.processo = new ListagemDependentes(titular)
        this.processo.processar()

        let idDependente = this.entrada.receberNumero('Digite o ID do dependente para remover (0 para cancelar):')
        if (idDependente === 0) {
            console.log('Operação cancelada pelo usuário.')
            return
        }

        // Validação do ID do dependente
        if (idDependente < 1 || idDependente > titular.Dependentes.length) {
            console.log('ID inválido! Operação cancelada.')
            return
        }

        // ÍNDICE CORRETO: É necessário subtrair 1 do ID para obter o índice correto no array
        let indexDependente = idDependente - 1;
        let dependente = titular.Dependentes[indexDependente]

        // Confirmação final
        console.log('\n==============================================')
        console.log('|             CONFIRMAÇÃO DE REMOÇÃO         |')
        console.log('==============================================')
        console.log(`Dependente: ${dependente.nome}`)
        console.log(`Vínculo: Dependente de ${titular.nome}`)
        console.log('==============================================')

        let confirmacao = this.entrada.receberTexto(`Digite "CONFIRMAR" para remover o dependente:`).toUpperCase()

        if (confirmacao !== "CONFIRMAR") {
            console.log('Operação cancelada pelo usuário.')
            return
        }

        // Remove o dependente
        try {
            titular.Dependentes.splice(indexDependente, 1)

            console.log('\n==============================================')
            console.log('|       REMOÇÃO REALIZADA COM SUCESSO        |')
            console.log('==============================================')
            console.log(`Dependente removido do sistema.`)
            console.log(`Total de dependentes restantes: ${titular.Dependentes.length}`)
            console.log('==============================================')
        } catch (error) {
            console.log('\n==============================================')
            console.log('|          ERRO DURANTE A REMOÇÃO            |')
            console.log('==============================================')
            console.log('Ocorreu um erro ao tentar remover o dependente:')
            console.log(error)
            console.log('Por favor, tente novamente ou contate o suporte.')
            console.log('==============================================')
        }
    }
}


