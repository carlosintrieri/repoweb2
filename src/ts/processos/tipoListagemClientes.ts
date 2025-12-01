import Processo from "../abstracoes/processo";
import MenuTipoListagemClientes from "../menus/menuTipoListagemClientes";
import ListagemTitulares from "./listagemTitulares";
import ListagemDependentesTitular from "./listagemDependentesTitular";
import Armazem from "../dominio/armazem";

export default class TipoListagemClientes extends Processo {
    constructor() {
        super()
        this.menu = new MenuTipoListagemClientes()
    }

    processar(): void {
        console.clear()
        console.log('==============================================')
        console.log('|       SISTEMA DE GESTÃO DE CLIENTES       |')
        console.log('|            CONSULTA DE CADASTROS          |')
        console.log('==============================================')

        // SOLUÇÃO DIRETA: Verificação do estado atual do Armazem
        const armazem = Armazem.InstanciaUnica

        console.log('\n=== ESTADO ATUAL DO ARMAZÉM ===')
        console.log(`Total de clientes titulares: ${armazem.Clientes.length}`)

        // Mostrar um resumo dos titulares e seus dependentes
        if (armazem.Clientes.length > 0) {
            console.log('\nResumo de clientes no sistema:')
            armazem.Clientes.forEach((cliente, index) => {
                console.log(`${index + 1}. ${cliente.Nome} - ${cliente.Dependentes ? cliente.Dependentes.length : 0} dependente(s)`)
            })
        }
        console.log('===============================\n')

        this.menu.mostrar()
        this.opcao = this.entrada.receberNumero('Qual a opção desejada?')

        switch (this.opcao) {
            case 1: // Listar todos os titulares
                console.log('\nVocê selecionou: Listar todos os titulares')

                // SOLUÇÃO DIRETA: Usar uma nova instância para garantir dados frescos
                const listagemTitulares = new ListagemTitulares()
                listagemTitulares.processar()
                break;

            case 2: // Listar dependentes de um titular
                console.log('\nVocê selecionou: Listar dependentes de um titular')

                // Verificar se existem titulares
                if (armazem.Clientes.length === 0) {
                    console.log('\nNão há titulares cadastrados no sistema.')
                    return
                }

                try {
                    // SOLUÇÃO DIRETA: Usar uma nova instância para garantir dados frescos
                    const listagemDependentes = new ListagemDependentesTitular()
                    listagemDependentes.processar()
                } catch (error) {
                    console.log("ERRO ao listar dependentes:", error)
                }
                break;

            case 0: // Voltar
                console.log('Voltando ao menu principal...')
                break;

            default:
                console.log('Opção inválida! Por favor, selecione uma opção válida.')
        }
    }
}


