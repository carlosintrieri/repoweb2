import Processo from "../abstracoes/processo";
import Cliente from "../modelos/cliente";
import CadastrarTelefonesCliente from "./cadastrarTelefonesCliente";
import CadastrarDocumento from "./cadastrarDocumento";
import CadastroEnderecoTitular from "./cadastroEnderecoTitular";

export default class CadastrarClienteDependente extends Processo {
    private titular: Cliente;

    constructor(titular: Cliente) {
        super();


        // Verificar se o titular é válido
        if (!titular) {
            throw new Error("Titular inválido fornecido ao construtor de CadastrarClienteDependente");
        }

        this.titular = titular;


        // Garantir que o titular tem array de dependentes
        if (!this.titular.Dependentes) {
            this.titular.Dependentes = [];
        }
    }

    processar(): void {

        try {
            console.clear();
            console.log('==============================================');
            console.log('|       SISTEMA DE GESTÃO DE CLIENTES       |');
            console.log('|         CADASTRO DE DEPENDENTE            |');
            console.log('==============================================');
            console.log(`Titular: ${this.titular.Nome}`);
            console.log('==============================================');

            // Verificar novamente se o titular é válido
            if (!this.titular) {
                console.log('Erro crítico: Titular não informado.');
                return;
            }

            // Cadastro de dados básicos
            console.log("\nDados pessoais do dependente:");
            let nome = this.entrada.receberTexto('Nome completo do dependente:');
            let apelido = this.entrada.receberTexto('Apelido do dependente:');
            let dataNascimento = this.entrada.receberData('Data de nascimento:');



            // Criar objeto do dependente
            let dependente = new Cliente(nome, apelido, dataNascimento);


            // Garantir que os arrays necessários existam
            if (!dependente.Documentos) {

                dependente.Documentos = [];
            }

            if (!dependente.Telefones) {
                dependente.Telefones = [];
            }

            // Endereço - pergunta se quer usar o mesmo do titular
            console.log('\nEndereço do dependente:');
            console.log('1 - Utilizar o mesmo endereço do titular');
            console.log('2 - Cadastrar novo endereço');
            let opcaoEndereco = this.entrada.receberNumero('Escolha uma opção:');

            if (opcaoEndereco === 1 && this.titular.Endereco) {

                dependente.Endereco = this.titular.Endereco;
                console.log('Endereço do titular copiado para o dependente.');
            } else {
                console.log('\nCadastrando novo endereço para o dependente:');
                this.processo = new CadastroEnderecoTitular(dependente);
                this.processo.processar();
            }

            // Cadastro de documentos
            console.log('\nDocumentos do dependente:');
            this.processo = new CadastrarDocumento(dependente);
            this.processo.processar();


            // Cadastro de telefones
            console.log('\nTelefones do dependente:');
            this.processo = new CadastrarTelefonesCliente(dependente);
            this.processo.processar();


            // Adicionar o dependente ao titular
            this.titular.Dependentes.push(dependente);


            // Mostrar ID do dependente cadastrado
            let idDependente = this.titular.Dependentes.length;

            console.log(`\n==============================================`);
            console.log(`|      CADASTRO DE DEPENDENTE CONCLUÍDO      |`);
            console.log(`==============================================`);
            console.log(`ID do dependente: ${idDependente}`);
            console.log(`Nome: ${nome}`);
            console.log(`Apelido: ${apelido}`);
            console.log(`Data de nascimento: ${this.formatarData(dataNascimento)}`);
            console.log(`Vínculo: Dependente de ${this.titular.Nome}`);
            console.log(`Total de documentos: ${dependente.Documentos.length}`);
            console.log(`Total de telefones: ${dependente.Telefones.length}`);
            console.log(`==============================================\n`);

            // Pequena pausa para o usuário ler a mensagem
            console.log('Pressione ENTER para continuar...');
            this.entrada.receberTexto('');

        } catch (error) {
            console.log("\n==== ERRO CRÍTICO NO CADASTRO DE DEPENDENTE ====");
            console.log(error);
            console.log("Por favor entre em contato com o suporte.");
            console.log("================================================\n");
        }
    }

    private formatarData(data: Date): string {
        if (!data) return "Data não disponível";

        try {
            const dia = String(data.getDate()).padStart(2, '0');
            const mes = String(data.getMonth() + 1).padStart(2, '0');
            const ano = data.getFullYear();

            return `${dia}/${mes}/${ano}`;
        } catch (erro) {
            return "Data inválida";
        }
    }
}


