import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";
import ListagemTitulares from "./listagemTitulares";
import MenuModificarDependente from "../menus/menuModificarDependente";
import CadastrarDocumento from "./cadastrarDocumento";
import CadastrarTelefonesCliente from "./cadastrarTelefonesCliente";

export default class ModificarDependentes extends Processo {
    private armazem: Armazem

    constructor() {
        super()
        this.armazem = Armazem.InstanciaUnica
        this.menu = new MenuModificarDependente()
    }

    processar(): void {
        console.clear()
        console.log('************************************************')
        console.log('*          SISTEMA DE GESTÃO DE CLIENTES       *')
        console.log('*         ATUALIZAÇÃO DE DADOS DEPENDENTE      *')
        console.log('************************************************')

        // Verificação básica
        if (this.armazem.Clientes.length === 0) {
            console.log('❌ Não há clientes cadastrados no sistema.')
            return
        }

        // Listar titulares
        console.log('✨ Selecione o titular responsável pelo dependente:')
        this.processo = new ListagemTitulares()
        this.processo.processar()

        // Seleção do titular
        let idTitular = this.entrada.receberNumero('🔢 Digite o ID do titular (0 para cancelar):')
        if (idTitular <= 0 || idTitular > this.armazem.Clientes.length) {
            console.log('⚠️ Operação cancelada ou ID inválido.')
            return
        }

        // Índices para acesso direto
        const indexTitular = idTitular - 1;
        const titular = this.armazem.Clientes[indexTitular];

        // Verificar disponibilidade de dependentes
        const dependentes = titular.Dependentes;
        if (!dependentes || dependentes.length === 0) {
            console.log(`❌ Este titular não possui dependentes cadastrados.`)
            return
        }

        // Mostrar lista detalhada de dependentes
        console.log(`\n✨ Dependentes de ${titular.nome}:`);
        for (let i = 0; i < dependentes.length; i++) {
            console.log(`   ${i + 1} - ${dependentes[i].nome} (${dependentes[i].apelido})`);
        }

        // Seleção do dependente
        let idDependente = this.entrada.receberNumero('\n🔢 Selecione o dependente para atualizar (0 para cancelar):')
        if (idDependente <= 0 || idDependente > dependentes.length) {
            console.log('⚠️ Operação cancelada ou ID inválido.')
            return
        }

        // Índice para acesso direto ao dependente
        const indexDependente = idDependente - 1;
        const dependente = titular.Dependentes[indexDependente];

        // Mostrar menu e processar opções
        let continuar = true
        while (continuar) {
            this.menu.mostrar()
            let opcao = this.entrada.receberNumero('🔢 Escolha uma opção:')

            switch (opcao) {
                case 1: // Alterar nome
                    {
                        let nomeAntigo = dependente.nome
                        let novoNome = this.entrada.receberTexto('✏️ Digite o novo nome completo:')

                        // Atualizar diretamente o campo
                        dependente.nome = novoNome

                        console.log(`\n✅ Nome alterado com sucesso!`)
                        console.log(`📝 DE: ${nomeAntigo}`)
                        console.log(`📝 PARA: ${dependente.nome}`)
                    }
                    break;

                case 2: // Alterar apelido
                    {
                        let apelidoAntigo = dependente.apelido
                        let novoApelido = this.entrada.receberTexto('✏️ Digite o novo apelido ou nome social:')

                        // Atualizar diretamente o campo
                        dependente.apelido = novoApelido

                        console.log(`\n✅ Apelido alterado com sucesso!`)
                        console.log(`📝 DE: ${apelidoAntigo}`)
                        console.log(`📝 PARA: ${dependente.apelido}`)
                    }
                    break;

                case 3: // Alterar data de nascimento
                    {
                        let novaData = this.entrada.receberData('📅 Digite a data de nascimento correta:')
                        dependente.DataNascimento = novaData
                        console.log(`✅ Data de nascimento atualizada com sucesso!`)
                    }
                    break;

                case 4: // Documentos
                    console.log('\n📄 Gerenciamento de documentação:')
                    this.processo = new CadastrarDocumento(dependente)
                    this.processo.processar()
                    break;

                case 5: // Telefones
                    console.log('\n📱 Gerenciamento de telefones para contato:')
                    this.processo = new CadastrarTelefonesCliente(dependente)
                    this.processo.processar()
                    break;

                case 0: // Voltar
                    continuar = false
                    console.log('⬅️ Voltando ao menu anterior...')
                    break;

                default:
                    console.log('❌ Opção inválida!')
            }

            if (continuar) {
                let resposta = this.entrada.receberTexto('🔄 Deseja fazer mais alterações? (S/N)').toUpperCase()
                if (resposta !== 'S') {
                    continuar = false
                    console.log('✅ Operação concluída com sucesso.')
                }
            }
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


