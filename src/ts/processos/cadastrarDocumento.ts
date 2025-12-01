import Processo from "../abstracoes/processo";
import Cliente from "../modelos/cliente";
import CadastroIdentificacao from "./cadastroIdentificacao";
import CadastroPassaporte from "./cadastroPassaporte";
import CadastroRg from "./cadastroRg";
import ImpressorDocumentos from "../impressores/impressorDocumentos";
import Impressor from "../interfaces/impressor";

export default class CadastrarDocumento extends Processo {
    private cliente: Cliente
    private impressor!: Impressor

    constructor(cliente: Cliente) {
        super()
        this.cliente = cliente

        // Garantir que o array de documentos existe
        if (!this.cliente.Documentos) {
            this.cliente.Documentos = []
        }
    }

    processar(): void {
        console.clear()
        console.log('==============================================')
        console.log('|       SISTEMA DE GESTÃO DE CLIENTES       |')
        console.log('|         REGISTRO DE DOCUMENTAÇÃO          |')
        console.log('==============================================')
        console.log(`Cliente: ${this.cliente.Nome}`)
        console.log('==============================================')

        let execucao = true
        let documentosAdicionados = 0

        while (execucao) {
            // Mostrar documentos já cadastrados
            if (this.cliente.Documentos.length > 0) {
                console.log('\n=== DOCUMENTOS JÁ CADASTRADOS ===')
                // Criar nova instância do impressor a cada exibição
                this.impressor = new ImpressorDocumentos(this.cliente.Documentos)
                console.log(this.impressor.imprimir())
                console.log('===================================\n')
            }

            console.log('\nSelecione o tipo de documento para cadastro:')
            console.log('1 - CPF (Cadastro de Pessoa Física)')
            console.log('2 - RG (Registro Geral)')
            console.log('3 - Passaporte (Documento internacional)')
            console.log('0 - Finalizar cadastro de documentos')

            let opcao = this.entrada.receberNumero('Digite o número da opção desejada:')

            switch (opcao) {
                case 1:
                    if (this.verificarDocumentoExistente("CPF")) {
                        console.log('ATENÇÃO: Este cliente já possui um CPF cadastrado.')
                        let substituir = this.entrada.receberTexto('Deseja substituir o documento? (S/N)').toUpperCase() === 'S'
                        if (!substituir) break
                    }
                    this.processo = new CadastroIdentificacao(this.cliente)
                    this.processo.processar()
                    documentosAdicionados++
                    break;
                case 2:
                    if (this.verificarDocumentoExistente("RG")) {
                        console.log('ATENÇÃO: Este cliente já possui um RG cadastrado.')
                        let substituir = this.entrada.receberTexto('Deseja substituir o documento? (S/N)').toUpperCase() === 'S'
                        if (!substituir) break
                    }
                    this.processo = new CadastroRg(this.cliente)
                    this.processo.processar()
                    documentosAdicionados++
                    break;
                case 3:
                    if (this.verificarDocumentoExistente("Passaporte")) {
                        console.log('ATENÇÃO: Este cliente já possui um Passaporte cadastrado.')
                        let substituir = this.entrada.receberTexto('Deseja substituir o documento? (S/N)').toUpperCase() === 'S'
                        if (!substituir) break
                    }
                    this.processo = new CadastroPassaporte(this.cliente)
                    this.processo.processar()
                    documentosAdicionados++
                    break;
                case 0:
                    if (documentosAdicionados === 0) {
                        console.log('ATENÇÃO: Nenhum documento foi cadastrado nesta sessão.')
                        let confirmar = this.entrada.receberTexto('Tem certeza que deseja continuar? (S/N)').toUpperCase() === 'S'
                        if (!confirmar) continue
                    }
                    execucao = false
                    break;
                default:
                    console.log('Opção inválida! Por favor, selecione uma opção válida.');
            }
        }

        // Mostrar resumo final com todos os documentos
        console.log('\n==============================================')
        console.log('|       DOCUMENTAÇÃO CADASTRADA COM SUCESSO  |')
        console.log('==============================================')
        console.log(`Total de documentos: ${this.cliente.Documentos.length}`)

        // Exibir documento por tipo
        console.log("\n=== VERIFICAÇÃO ESPECÍFICA DE DOCUMENTOS ===");
        console.log("CPF: " + (this.verificarDocumentoExistente("CPF") ? "Cadastrado" : "Não cadastrado"));
        console.log("RG: " + (this.verificarDocumentoExistente("RG") ? "Cadastrado" : "Não cadastrado"));
        console.log("Passaporte: " + (this.verificarDocumentoExistente("Passaporte") ? "Cadastrado" : "Não cadastrado"));

        if (this.cliente.Documentos.length > 0) {
            console.log('\n=== LISTA COMPLETA DE DOCUMENTOS ===')
            // Criar nova instância do impressor para a exibição final
            this.impressor = new ImpressorDocumentos(this.cliente.Documentos)
            console.log(this.impressor.imprimir())
        }

        console.log('==============================================')
    }

    private verificarDocumentoExistente(tipo: string): boolean {
        // Verificar se o array de documentos existe e não está vazio
        if (!this.cliente.Documentos || this.cliente.Documentos.length === 0) {
            return false
        }

        // Verificar se existe algum documento do tipo especificado
        return this.cliente.Documentos.some(doc => {
            if (!doc || !doc.Tipo) return false;
            return doc.Tipo.toString().includes(tipo);
        })
    }
}



