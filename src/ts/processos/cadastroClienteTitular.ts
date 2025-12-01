import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";
import Cliente from "../modelos/cliente";
import CadastrarDocumento from "./cadastrarDocumento";
import CadastroEnderecoTitular from "./cadastroEnderecoTitular";
import CadastrarTelefonesCliente from "./cadastrarTelefonesCliente";

export default class CadastroClienteTitular extends Processo {
    processar(): void {
        console.clear()
        console.log('✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨')
        console.log('✨        BEM-VINDO AO ATLANTIS WATER PARK                ✨')
        console.log('✨      SISTEMA EXCLUSIVO DE CADASTRO VIP                 ✨')
        console.log('✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨')

        console.log('\n🎉 Que ótimo que você decidiu se juntar a nós! Vamos iniciar seu cadastro VIP para que você possa aproveitar todas as nossas atrações incríveis e benefícios exclusivos.')

        let nome = this.entrada.receberTexto('👤 Nome completo (como no documento oficial):')
        let apelido = this.entrada.receberTexto('👥 Como gostaria de ser chamado(a) (apelido ou nome social):')
        let dataNascimento = this.entrada.receberData('🎂 Data de nascimento')

        let cliente = new Cliente(nome, apelido, dataNascimento)

        console.log('\n📍 Agora, vamos registrar seu endereço para entregas e correspondências:')
        this.processo = new CadastroEnderecoTitular(cliente)
        this.processo.processar()

        console.log('\n📄 Precisamos registrar seus documentos para garantir sua segurança:')
        this.processo = new CadastrarDocumento(cliente)
        this.processo.processar()

        console.log('\n📱 Por último, vamos cadastrar seus contatos:')
        this.processo = new CadastrarTelefonesCliente(cliente)
        this.processo.processar()

        let armazem = Armazem.InstanciaUnica
        armazem.Clientes.push(cliente)

        // Mostrar ID do cliente cadastrado de forma destacada
        let idTitular = armazem.Clientes.length


        console.log('✨CADASTRO CONCLUÍDO COM SUCESSO!✨')

        console.log(`🔑 Seu código de cliente exclusivo: ${idTitular}`)
        console.log(`👤 Nome: ${nome}`)
        console.log(`👥 Apelido: ${apelido}`)
        console.log(`📆 Data de cadastro: ${cliente.DataCadastro.toLocaleDateString()}`)


        console.log('\n🎯 Pressione ENTER para retornar ao menu principal...')
        this.entrada.receberTexto('')
    }
}


