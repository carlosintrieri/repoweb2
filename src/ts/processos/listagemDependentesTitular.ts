import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";
import Cliente from "../modelos/cliente";
import ListagemTitulares from "./listagemTitulares";
import ListagemDependentes from "./listagemDependentes";

export default class ListagemDependentesTitular extends Processo {
    private armazem: Armazem

    constructor() {
        super()
        this.armazem = Armazem.InstanciaUnica
    }

    processar(): void {
        console.clear()
        console.log('==============================================')
        console.log('|       SISTEMA DE GESTÃO DE CLIENTES       |')
        console.log('|      LISTAGEM DE DEPENDENTES POR TITULAR  |')
        console.log('==============================================')

        try {
            // SOLUÇÃO DIRETA: Acessar diretamente o armazém para dados atualizados
            const clientes = this.armazem.Clientes

            // Verifica se existem titulares cadastrados
            if (clientes.length === 0) {
                console.log('Não há clientes titulares cadastrados no sistema.')
                return
            }

            // SOLUÇÃO DIRETA: Mostrar quais clientes estão atualmente no armazém
            console.log('\n=== TITULARES DISPONÍVEIS NO ARMAZÉM ===')
            clientes.forEach((cliente, index) => {
                console.log(`${index + 1} - ${cliente.Nome} (${cliente.Dependentes ? cliente.Dependentes.length : 0} dependentes)`)
            })
            console.log('=========================================\n')

            // Mostra lista de titulares para seleção
            console.log('Selecione um titular para visualizar seus dependentes:')
            this.processo = new ListagemTitulares()
            this.processo.processar()

            // Obtém o titular escolhido
            let id = this.entrada.receberNumero('Digite o ID do titular (0 para cancelar): ')

            if (id === 0) {
                console.log('Operação cancelada pelo usuário.')
                return
            }

            if (id < 1 || id > clientes.length) {
                console.log('ID inválido! Operação cancelada.')
                return
            }

            // SOLUÇÃO DIRETA: Acessar diretamente o armazém para o titular selecionado
            const titular = this.armazem.Clientes[id - 1]
            console.log(`\nTitular selecionado: ${titular.Nome} (ID: ${id})`)

            // Garantir que Dependentes existe
            if (!titular.Dependentes) {
                titular.Dependentes = []
            }

            // Verifica se o titular tem dependentes
            if (titular.Dependentes.length === 0) {
                console.log(`\nO titular ${titular.Nome} não possui dependentes cadastrados.`)
                return
            }

            // SOLUÇÃO DIRETA: Mostrar quais dependentes estão atualmente neste titular
            console.log('\n=== DEPENDENTES DISPONÍVEIS PARA ESTE TITULAR ===')
            titular.Dependentes.forEach((dependente, index) => {
                console.log(`${index + 1} - ${dependente.Nome}`)
            })
            console.log('=================================================\n')

            // Lista os dependentes do titular escolhido
            console.log(`\nDependentes cadastrados para ${titular.Nome}:`)
            // SOLUÇÃO DIRETA: Passar o ID do titular para que a listagem possa recarregar os dados
            this.processo = new ListagemDependentes(titular, id)
            this.processo.processar()

        } catch (error) {
            console.log("ERRO ao listar dependentes:", error)
        }
    }
}



