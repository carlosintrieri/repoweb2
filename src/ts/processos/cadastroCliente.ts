import Processo from "../abstracoes/processo";
import Cliente from "../modelos/cliente";
import CadastroIdentificacao from "./cadastroIdentificacao"; // CPF
import CadastroRg from "./cadastroRg"; // RG
import CadastroPassaporte from "./cadastroPassaporte"; // Passaporte

export default class CadastrarDocumento extends Processo {
    private cliente: Cliente
    constructor(cliente: Cliente) {
        super()
        this.cliente = cliente
    }

    processar(): void {
        console.clear();
        console.log('==============================================')
        console.log('|       SISTEMA DE GESTÃO DE CLIENTES       |')
        console.log('|         REGISTRO DE DOCUMENTAÇÃO          |')
        console.log('==============================================')

        if (!this.cliente) {
            console.log('ERRO: Cliente não especificado. Operação cancelada.');
            return;
        }

        let execucao = true
        let documentosAdicionados = 0

        while (execucao) {
            console.log('\nSelecione o tipo de documento para cadastro:')
            console.log('1 - CPF (Cadastro de Pessoa Física)')
            console.log('2 - RG (Registro Geral)')
            console.log('3 - Passaporte (Documento internacional)')
            console.log('0 - Finalizar cadastro de documentos')

            let opcao = this.entrada.receberNumero('Digite o número da opção desejada: ')

            switch (opcao) {
                case 1: // CPF
                    try {
                        const processoCpf = new CadastroIdentificacao(this.cliente);
                        processoCpf.processar();
                        documentosAdicionados++;
                    } catch (error) {
                        console.log('Erro ao cadastrar CPF:', error);
                    }
                    break;

                case 2: // RG
                    try {
                        const processoRg = new CadastroRg(this.cliente);
                        processoRg.processar();
                        documentosAdicionados++;
                    } catch (error) {
                        console.log('Erro ao cadastrar RG:', error);
                    }
                    break;

                case 3: // Passaporte
                    try {
                        const processoPassaporte = new CadastroPassaporte(this.cliente);
                        processoPassaporte.processar();
                        documentosAdicionados++;
                    } catch (error) {
                        console.log('Erro ao cadastrar Passaporte:', error);
                    }
                    break;

                case 0: // Finalizar
                    if (documentosAdicionados === 0) {
                        console.log('ATENÇÃO: Nenhum documento foi cadastrado.');
                        let confirmar = this.entrada.receberTexto('Tem certeza que deseja continuar sem documentos? (S/N)').toUpperCase() === 'S';
                        if (!confirmar) continue;
                    }
                    execucao = false;
                    break;

                default:
                    console.log('Opção inválida! Por favor, escolha uma opção entre 0 e 3.');
            }
        }

        console.log('\n==============================================')
        console.log('|       DOCUMENTAÇÃO CADASTRADA COM SUCESSO  |')
        console.log('==============================================')
        console.log(`Total de documentos adicionados: ${documentosAdicionados}`)
        console.log('==============================================')
    }
}



