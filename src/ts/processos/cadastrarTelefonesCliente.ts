import Processo from "../abstracoes/processo";
import MenuRegistroTelefone from "../menus/menuRegistroTelefone";
import Cliente from "../modelos/cliente";
import CadastroTelefone from "./cadastroTelefone";

export default class CadastrarTelefonesCliente extends Processo {
    private cliente: any;

    constructor(cliente: any) {
        super()
        this.cliente = cliente
        this.menu = new MenuRegistroTelefone()
    }

    processar(): void {
        this.menu.mostrar()
        console.log('✨CADASTRO DE TELEFONES PARA CONTATO✨');


        console.log(`\n📱 Seus telefones nos ajudam a manter contato com você!`);
        console.log(`📢 Através deles, você receberá:`);
        console.log(`   • Avisos sobre eventos exclusivos`);
        console.log(`   • Promoções especiais só para membros`);
        console.log(`   • Novidades sobre novas atrações`);
        console.log(`   • Informações importantes sobre sua visita`);

        let quantidadeTelefones = this.entrada.receberNumero('\n🔢 Quantos telefones deseja cadastrar? (Recomendamos pelo menos um)')

        if (quantidadeTelefones <= 0) {
            console.log('⚠️ É importante cadastrar pelo menos um telefone para casos de emergência e comunicados.');
            quantidadeTelefones = 1;
        }

        if (quantidadeTelefones > 5) {
            console.log('ℹ️ No momento, nosso sistema permite até 5 telefones por cliente.');
            quantidadeTelefones = 5;
        }

        for (let i = 0; i < quantidadeTelefones; i++) {
            console.log(`\n📞 Cadastrando telefone ${i + 1} de ${quantidadeTelefones}`);
            console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
            let processo = new CadastroTelefone(this.cliente);
            processo.processar();
        }

        console.log(`\n✅ Todos os ${quantidadeTelefones} telefones foram cadastrados com sucesso!`);
        console.log(`   Agora podemos manter você informado sobre todas as novidades.`);
    }
}


