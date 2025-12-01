import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";
import Cliente from "../modelos/cliente";
import Impressor from "../interfaces/impressor";
import ImpressorDocumentos from "../impressores/impressorDocumentos";
import ImpressorTelefones from "../impressores/impressorTelefones";
import ImpressorEndereco from "../impressores/impressorEndereco";

export default class ListagemTitularDependente extends Processo {
    private armazem: Armazem
    private impressor!: Impressor

    constructor() {
        super()
        this.armazem = Armazem.InstanciaUnica
    }

    processar(): void {
        console.clear()
        console.log('✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨')
        console.log('✨          SISTEMA DE GESTÃO DE CLIENTES                 ✨')
        console.log('✨       CONSULTA DE TITULAR POR DEPENDENTE              ✨')
        console.log('✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨')

        // Verifica se existem titulares
        if (this.armazem.Clientes.length === 0) {
            console.log('❌ Não há clientes titulares cadastrados no sistema.')
            return
        }

        // Constrói lista de dependentes
        let todosDependentes: { dependente: Cliente, titular: Cliente, idTitular: number, idDependente: number }[] = []

        for (let i = 0; i < this.armazem.Clientes.length; i++) {
            let titular = this.armazem.Clientes[i]
            if (titular.Dependentes) {
                for (let j = 0; j < titular.Dependentes.length; j++) {
                    todosDependentes.push({
                        dependente: titular.Dependentes[j],
                        titular: titular,
                        idTitular: i + 1,
                        idDependente: j + 1
                    })
                }
            }
        }

        if (todosDependentes.length === 0) {
            console.log('❌ Não há dependentes cadastrados no sistema.')
            return
        }

        // Lista dependentes para seleção
        console.log('✨ Selecione um dependente para consultar informações completas:\n')
        for (let i = 0; i < todosDependentes.length; i++) {
            const dep = todosDependentes[i].dependente;
            const tit = todosDependentes[i].titular;
            console.log(`${i + 1} - ${dep.nome} (${dep.apelido}) - Filho(a) de ${tit.nome}`)
        }

        console.log('\n✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨')

        let id = this.entrada.receberNumero('🔢 Digite o ID do dependente (0 para cancelar): ')
        if (id === 0) {
            console.log('⚠️ Operação cancelada pelo usuário.')
            return
        }

        if (id < 1 || id > todosDependentes.length) {
            console.log('❌ ID inválido! Operação cancelada.')
            return
        }

        let selecao = todosDependentes[id - 1]

        // DADOS COMPLETOS DO DEPENDENTE
        console.log('✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨')
        console.log('✨            DADOS COMPLETOS DO DEPENDENTE               ✨')
        console.log('✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨')

        const dependente = selecao.dependente;

        console.log(`🆔 ID do dependente: ${selecao.idDependente}`);
        console.log(`👤 Nome completo: ${dependente.nome}`);
        console.log(`👥 Apelido/Nome social: ${dependente.apelido}`);
        console.log(`🎂 Data de nascimento: ${this.formatarData(dependente.DataNascimento)}`);
        console.log(`📆 Data de cadastro: ${this.formatarData(dependente.DataCadastro || new Date())}`);
        console.log(`🔗 Vínculo familiar: Dependente de ${selecao.titular.nome}`);
        console.log(`👨‍👩‍👧‍👦 ID do titular responsável: ${selecao.idTitular}`);

        // Endereço do dependente
        console.log(`\n📍 ENDEREÇO DO DEPENDENTE:`);
        if (dependente.Endereco) {
            this.impressor = new ImpressorEndereco(dependente.Endereco);
            console.log(this.impressor.imprimir());
        } else {
            console.log('📍 Utiliza o mesmo endereço do titular responsável');
            if (selecao.titular.Endereco) {
                this.impressor = new ImpressorEndereco(selecao.titular.Endereco);
                console.log(this.impressor.imprimir());
            } else {
                console.log('⚠️ Nenhum endereço cadastrado\n');
            }
        }

        // Telefones do dependente
        if (dependente.Telefones && dependente.Telefones.length > 0) {
            console.log(`📱 TELEFONES DO DEPENDENTE:`);
            this.impressor = new ImpressorTelefones(dependente.Telefones);
            console.log(this.impressor.imprimir());
        } else {
            console.log('📱 TELEFONES DO DEPENDENTE: Nenhum telefone cadastrado.\n');
        }

        // DOCUMENTOS DO DEPENDENTE - SEMPRE MOSTRA TABELA COMPLETA
        console.log(`📄 DOCUMENTAÇÃO OFICIAL COMPLETA DO DEPENDENTE:`);
        this.impressor = new ImpressorDocumentos(dependente.Documentos || []);
        console.log(this.impressor.imprimir());

        // DADOS COMPLETOS DO TITULAR
        console.log('✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨')
        console.log('✨           DADOS COMPLETOS DO TITULAR RESPONSÁVEL       ✨')
        console.log('✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨')

        const titular = selecao.titular;

        console.log(`🆔 ID do titular: ${selecao.idTitular}`);
        console.log(`👤 Nome completo: ${titular.nome}`);
        console.log(`👥 Apelido/Nome social: ${titular.apelido}`);
        console.log(`🎂 Data de nascimento: ${this.formatarData(titular.DataNascimento)}`);
        console.log(`📆 Data de cadastro: ${this.formatarData(titular.DataCadastro)}`);
        console.log(`👨‍👩‍👧‍👦 Total de dependentes: ${titular.Dependentes ? titular.Dependentes.length : 0}`);

        // Endereço do titular
        console.log(`\n📍 ENDEREÇO OFICIAL DA FAMÍLIA:`);
        if (titular.Endereco) {
            this.impressor = new ImpressorEndereco(titular.Endereco);
            console.log(this.impressor.imprimir());
        } else {
            console.log('📍 ENDEREÇO: Não cadastrado\n');
        }

        // Telefones do titular
        if (titular.Telefones && titular.Telefones.length > 0) {
            console.log(`📱 TELEFONES DE CONTATO DO TITULAR:`);
            this.impressor = new ImpressorTelefones(titular.Telefones);
            console.log(this.impressor.imprimir());
        } else {
            console.log('📱 TELEFONES DO TITULAR: Nenhum telefone cadastrado.\n');
        }

        // DOCUMENTOS DO TITULAR - SEMPRE MOSTRA TABELA COMPLETA
        console.log(`📄 DOCUMENTAÇÃO OFICIAL COMPLETA DO TITULAR:`);
        this.impressor = new ImpressorDocumentos(titular.Documentos || []);
        console.log(this.impressor.imprimir());

        // Resumo final
        console.log(`👨‍👩‍👧‍👦 RESUMO COMPLETO DA FAMÍLIA:`);
        console.log(`   • Titular: ${titular.nome} (ID: ${selecao.idTitular})`);
        console.log(`   • Dependente consultado: ${dependente.nome} (ID: ${selecao.idDependente})`);
        console.log(`   • Total de dependentes: ${titular.Dependentes ? titular.Dependentes.length : 0}`);
        console.log(`   • Total de pessoas na família: ${(titular.Dependentes ? titular.Dependentes.length : 0) + 1}`);

        console.log('✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨')
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


