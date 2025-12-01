import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";
import MenuModificarTitular from "../menus/menuModificarTitular";
import ListagemTitulares from "./listagemTitulares";
import CadastrarDocumento from "./cadastrarDocumento";
import CadastrarTelefonesCliente from "./cadastrarTelefonesCliente";
import CadastroEnderecoCliente from "./cadastroEnderecoCliente";

export default class ModificarTitulares extends Processo {
    private armazem: Armazem
    constructor() {
        super()
        this.armazem = Armazem.InstanciaUnica
        this.menu = new MenuModificarTitular()
    }

    processar(): void {
        console.clear()
        console.log('************************************************')
        console.log('*          SISTEMA DE GESTÃO DE CLIENTES       *')
        console.log('*          ATUALIZAÇÃO DE DADOS TITULAR        *')
        console.log('************************************************')

        // Verificação básica
        if (this.armazem.Clientes.length === 0) {
            console.log('❌ Não há clientes cadastrados no sistema.')
            return
        }

        // Listar titulares
        console.log('✨ Selecione um titular para atualizar os dados:')
        this.processo = new ListagemTitulares()
        this.processo.processar()

        // Seleção do titular
        let id = this.entrada.receberNumero('🔢 Digite o ID do titular (0 para cancelar):')
        if (id <= 0 || id > this.armazem.Clientes.length) {
            console.log('⚠️ Operação cancelada ou ID inválido.')
            return
        }

        // Índice para acesso direto
        const indexTitular = id - 1
        const cliente = this.armazem.Clientes[indexTitular]

        // Mostrar menu e processar opções
        let continuar = true
        while (continuar) {
            this.menu.mostrar()
            let opcao = this.entrada.receberNumero('🔢 Escolha uma opção:')

            switch (opcao) {
                case 1: // Alterar nome
                    {
                        // Guardar nome antigo para mostrar na confirmação
                        let nomeAntigo = cliente.nome
                        let novoNome = this.entrada.receberTexto('✏️ Digite o novo nome completo:')

                        // Atualizar diretamente o campo
                        cliente.nome = novoNome

                        console.log(`\n✅ Nome alterado com sucesso!`)
                        console.log(`📝 DE: ${nomeAntigo}`)
                        console.log(`📝 PARA: ${cliente.nome}`)
                    }
                    break;

                case 2: // Alterar apelido
                    {
                        // Guardar apelido antigo para mostrar na confirmação
                        let apelidoAntigo = cliente.apelido
                        let novoApelido = this.entrada.receberTexto('✏️ Digite o novo apelido ou nome social:')

                        // Atualizar diretamente o campo
                        cliente.apelido = novoApelido

                        console.log(`\n✅ Apelido alterado com sucesso!`)
                        console.log(`📝 DE: ${apelidoAntigo}`)
                        console.log(`📝 PARA: ${cliente.apelido}`)
                    }
                    break;

                case 3: // Alterar data de nascimento
                    {
                        let novaData = this.entrada.receberData('📅 Digite a data de nascimento correta:')
                        cliente.DataNascimento = novaData
                        console.log(`✅ Data de nascimento atualizada com sucesso!`)
                    }
                    break;

                case 4: // Atualizar endereço
                    console.log('\n📍 Atualização de informações de endereço:')
                    this.processo = new CadastroEnderecoCliente(cliente)
                    this.processo.processar()
                    break;

                case 5: // Gerenciar documentos
                    console.log('\n📄 Gerenciamento de documentação:')
                    this.processo = new CadastrarDocumento(cliente)
                    this.processo.processar()
                    break;

                case 6: // Gerenciar telefones
                    console.log('\n📱 Gerenciamento de telefones para contato:')
                    this.processo = new CadastrarTelefonesCliente(cliente)
                    this.processo.processar()
                    break;

                case 0: // Voltar
                    continuar = false
                    console.log('⬅️ Voltando ao menu anterior...')
                    break;

                default:
                    console.log('❌ Opção inválida! Por favor, selecione uma opção válida.')
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


