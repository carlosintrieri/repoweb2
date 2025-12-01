import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";
import ImpressorDocumentos from "../impressores/impressorDocumentos";
import ImpressorTelefones from "../impressores/impressorTelefones";
import ImpressorEndereco from "../impressores/impressorEndereco";
import Impressor from "../interfaces/impressor";
import Cliente from "../modelos/cliente";

export default class ListagemTitulares extends Processo {
    private impressor!: Impressor

    constructor() {
        super()
    }

    processar(): void {
        console.clear()
        console.log('✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨')
        console.log('✨          SISTEMA DE GESTÃO DE CLIENTES                 ✨')
        console.log('✨         LISTAGEM DE CLIENTES TITULARES                 ✨')
        console.log('✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨')

        const armazem = Armazem.InstanciaUnica;
        const clientes = armazem.Clientes;

        if (clientes.length === 0) {
            console.log('❌ Não há clientes titulares cadastrados no sistema.');
            return;
        }

        console.log(`✨ Total de clientes cadastrados: ${clientes.length}\n`);

        for (let i = 0; i < clientes.length; i++) {
            const cliente = clientes[i];

            if (this.titular(cliente)) {
                const id = i + 1;

                console.log(`✨ DADOS COMPLETOS DO CLIENTE TITULAR #${id} ✨`);
                console.log(`🆔 ID: ${id}`);
                console.log(`👤 Nome: ${cliente.nome}`);
                console.log(`👥 Apelido: ${cliente.apelido}`);
                console.log(`🎂 Data de nascimento: ${this.formatarData(cliente.DataNascimento)}`);
                console.log(`📆 Data de cadastro: ${this.formatarData(cliente.DataCadastro)}`);

                // ENDEREÇO
                if (cliente.Endereco) {
                    console.log(`\n📍 ENDEREÇO COMPLETO:`);
                    this.impressor = new ImpressorEndereco(cliente.Endereco);
                    console.log(this.impressor.imprimir());
                } else {
                    console.log('\n📍 ENDEREÇO: Não cadastrado');
                }

                // DOCUMENTOS OFICIAIS - SEMPRE MOSTRA TABELA COMPLETA
                console.log(`\n📄 DOCUMENTAÇÃO OFICIAL COMPLETA:`);
                this.impressor = new ImpressorDocumentos(cliente.Documentos || []);
                console.log(this.impressor.imprimir());

                // TELEFONES
                if (cliente.Telefones && cliente.Telefones.length > 0) {
                    console.log(`📱 TELEFONES PARA CONTATO:`);
                    this.impressor = new ImpressorTelefones(cliente.Telefones);
                    console.log(this.impressor.imprimir());
                } else {
                    console.log("📱 TELEFONES: Nenhum telefone cadastrado\n");
                }

                // DEPENDENTES
                if (cliente.Dependentes && cliente.Dependentes.length > 0) {
                    console.log(`👨‍👩‍👧‍👦 DEPENDENTES (${cliente.Dependentes.length}):`);
                    cliente.Dependentes.forEach((dep, idx) => {
                        console.log(`   ${idx + 1}. ${dep.nome} (${dep.apelido})`);
                    });
                    console.log('');
                } else {
                    console.log("\n👤 DEPENDENTES: Este titular não possui dependentes cadastrados.\n");
                }

                console.log('✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨\n');
            }
        }
    }

    private titular(cliente: Cliente): boolean {
        return cliente.Titular == undefined;
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


