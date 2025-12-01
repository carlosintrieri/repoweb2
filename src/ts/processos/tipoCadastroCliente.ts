import Processo from "../abstracoes/processo";
import MenuTipoCadastroCliente from "../menus/menuTipoCadastroCliente";
import CadastroClienteTitular from "./cadastroClienteTitular";
import CadastrarClienteDependente from "./cadastrarClienteDependente";
import ListagemTitulares from "./listagemTitulares";
import Armazem from "../dominio/armazem";
import Cliente from "../modelos/cliente";

export default class TipoCadastroCliente extends Processo {
    constructor() {
        super()
        this.menu = new MenuTipoCadastroCliente()

    }

    processar(): void {
        console.clear()
        console.log('==============================================')
        console.log('|       SISTEMA DE GESTÃO DE CLIENTES       |')
        console.log('|            CADASTRO DE CLIENTES           |')
        console.log('==============================================')


        try {
            this.menu.mostrar()
            this.opcao = this.entrada.receberNumero('Qual opção desejada?')



            switch (this.opcao) {
                case 1: // Cadastrar Titular
                    console.log('\nVocê selecionou: Cadastrar Cliente TITULAR')
                    this.processo = new CadastroClienteTitular()
                    this.processo.processar()
                    break

                case 2: // Cadastrar Dependente
                    console.log('\nVocê selecionou: Cadastrar Cliente DEPENDENTE')
                    this.cadastrarDependente()
                    break

                case 0: // Voltar
                    console.log('Voltando ao menu principal...')
                    break

                default:
                    console.log('Opção inválida! Por favor, escolha uma opção válida.')
            }
        } catch (error) {
            console.log("ERRO CRÍTICO em TipoCadastroCliente:", error)
        }
    }

    // Método separado para melhorar a organização e depuração
    private cadastrarDependente(): void {
        try {
            // Verificar se existem titulares
            const armazem = Armazem.InstanciaUnica


            if (armazem.Clientes.length === 0) {
                console.log('\nNão há titulares cadastrados. Cadastre um titular primeiro.')
                console.log('Retornando ao menu anterior...')
                return
            }

            // Listar titulares disponíveis
            console.log('\nSelecione o titular para vincular o dependente:')
            this.processo = new ListagemTitulares()
            this.processo.processar()

            // Selecionar titular por ID
            const idTitular = this.entrada.receberNumero('\nDigite o ID do titular (0 para cancelar):')


            if (idTitular === 0) {
                console.log('Operação cancelada pelo usuário.')
                return
            }

            if (idTitular <= 0 || idTitular > armazem.Clientes.length) {
                console.log('ID inválido! Operação cancelada.')
                return
            }

            // Obter titular
            const titular = armazem.Clientes[idTitular - 1]


            // Verificar se o titular está corretamente definido
            if (!titular) {
                console.log('ERRO: Titular não encontrado no armazém!')
                return
            }

            // Verificar se o array de dependentes está inicializado
            if (!titular.Dependentes) {
                titular.Dependentes = []
            }

            // Iniciar cadastro de dependente com try/catch para capturar erros
            try {
                console.log(`\nIniciando cadastro de dependente para o titular: ${titular.Nome}`)

                // Criar o processo de cadastro e processar
                const processoCadastroDependente = new CadastrarClienteDependente(titular)
                processoCadastroDependente.processar()


            } catch (error) {
                console.log('ERRO AO CADASTRAR DEPENDENTE:', error)
                console.log('Por favor, tente novamente ou contate o suporte.')
            }
        } catch (error) {
            console.log("ERRO CRÍTICO no cadastro de dependente:", error)
        }
    }
}


