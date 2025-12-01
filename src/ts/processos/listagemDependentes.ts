import Processo from "../abstracoes/processo";
import Cliente from "../modelos/cliente";
import Impressor from "../interfaces/impressor";
import ImpressorDocumentos from "../impressores/impressorDocumentos";
import ImpressorTelefones from "../impressores/impressorTelefones";
import ImpressorEndereco from "../impressores/impressorEndereco";
import Armazem from "../dominio/armazem";

export default class ListagemDependentes extends Processo {
    private titular: Cliente
    private idTitular: number;
    private impressor!: Impressor;

    constructor(titular: Cliente, idTitular?: number) {
        super()
        this.titular = titular
        this.idTitular = idTitular || 0;
    }

    processar(): void {
        console.clear()
        console.log('✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨')
        console.log('✨          SISTEMA DE GESTÃO DE CLIENTES                 ✨')
        console.log('✨         LISTAGEM COMPLETA DE DEPENDENTES              ✨')
        console.log('✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨')

        const armazem = Armazem.InstanciaUnica;

        // Atualizar titular se ID válido
        if (this.idTitular > 0 && this.idTitular <= armazem.Clientes.length) {
            this.titular = armazem.Clientes[this.idTitular - 1];
        }

        console.log(`👤 Titular responsável: ${this.titular.nome}`);
        console.log('✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨')

        const dependentes = this.titular.Dependentes || []

        if (dependentes.length === 0) {
            console.log('❌ Nenhum dependente cadastrado para este titular!')
            return
        }

        console.log(`✨ Total de dependentes: ${dependentes.length}\n`);

        for (let i = 0; i < dependentes.length; i++) {
            const dependente = this.titular.Dependentes[i];
            const idDependente = i + 1;

            console.log(`✨ DADOS COMPLETOS DO DEPENDENTE #${idDependente} ✨`);
            console.log(`🆔 ID do dependente: ${idDependente}`);
            console.log(`👤 Nome completo: ${dependente.nome}`);
            console.log(`👥 Apelido/Nome social: ${dependente.apelido}`);
            console.log(`🎂 Data de nascimento: ${this.formatarData(dependente.DataNascimento)}`);
            console.log(`📆 Data de cadastro: ${this.formatarData(dependente.DataCadastro || new Date())}`);
            console.log(`🔗 Vínculo familiar: Dependente de ${this.titular.nome}`);

            // ENDEREÇO DO DEPENDENTE
            console.log(`\n📍 ENDEREÇO DO DEPENDENTE:`);
            if (dependente.Endereco) {
                this.impressor = new ImpressorEndereco(dependente.Endereco);
                console.log(this.impressor.imprimir());
            } else {
                if (this.titular.Endereco) {
                    console.log('📍 Utiliza o mesmo endereço do titular:');
                    this.impressor = new ImpressorEndereco(this.titular.Endereco);
                    console.log(this.impressor.imprimir());
                } else {
                    console.log('⚠️ Nenhum endereço cadastrado (nem próprio nem do titular)\n');
                }
            }

            // DOCUMENTOS OFICIAIS - SEMPRE MOSTRA TABELA COMPLETA
            console.log(`📄 DOCUMENTAÇÃO OFICIAL COMPLETA DO DEPENDENTE:`);
            this.impressor = new ImpressorDocumentos(dependente.Documentos || []);
            console.log(this.impressor.imprimir());

            // TELEFONES
            if (dependente.Telefones && dependente.Telefones.length > 0) {
                console.log(`📱 TELEFONES DO DEPENDENTE:`);
                this.impressor = new ImpressorTelefones(dependente.Telefones);
                console.log(this.impressor.imprimir());
            } else {
                console.log('📱 TELEFONES: Nenhum telefone cadastrado para este dependente.\n');
            }

            // RESUMO DO DEPENDENTE
            console.log(`📊 RESUMO:`);
            console.log(`   • Total de telefones: ${dependente.Telefones ? dependente.Telefones.length : 0}`);
            console.log(`   • Total de documentos: ${dependente.Documentos ? dependente.Documentos.length : 0}`);
            console.log(`   • Status de endereço: ${dependente.Endereco ? 'Próprio' : 'Compartilhado com titular'}`);

            console.log('\n✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨\n');
        }

        // RESUMO FAMILIAR
        console.log(`👨‍👩‍👧‍👦 RESUMO FAMILIAR:`);
        console.log(`   • Titular: ${this.titular.nome}`);
        console.log(`   • Total de dependentes: ${dependentes.length}`);
        console.log(`   • Total de pessoas na família: ${dependentes.length + 1}`);
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




