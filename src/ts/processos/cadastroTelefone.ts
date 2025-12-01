import Processo from "../abstracoes/processo";
import Telefone from "../modelos/telefone";

export default class CadastroTelefone extends Processo {
    private cliente: any;

    constructor(cliente: any) {
        super()
        this.cliente = cliente
        // Garantir que o cliente tenha um array de telefones
        if (!this.cliente.Telefones && !this.cliente.telefones) {
            // Tenta criar no formato padrão
            this.cliente.Telefones = []
        }
    }

    processar(): void {
        console.log('\n************************************************');
        console.log('*          CADASTRO DE TELEFONE PARA CONTATO    *');
        console.log('************************************************');

        // Obter e validar DDD
        let ddd = ""
        let dddValido = false

        while (!dddValido) {
            ddd = this.entrada.receberTexto('📞 DDD da região (2 dígitos):');
            if (ddd.length != 2 || isNaN(Number(ddd))) {
                console.log('⚠️ O DDD deve conter exatamente 2 dígitos numéricos.');
            } else {
                dddValido = true;
            }
        }

        // Obter e validar número
        let numero = ""
        let numeroValido = false

        while (!numeroValido) {
            numero = this.entrada.receberTexto('📱 Número de telefone (apenas dígitos):');
            // Remove possíveis caracteres não numéricos
            numero = numero.replace(/\D/g, '')

            if (numero.length < 8 || numero.length > 9) {
                console.log('⚠️ O número deve conter 8 dígitos (fixo) ou 9 dígitos (celular).');
            } else {
                numeroValido = true;
            }
        }

        // Formata o número para exibição
        if (numero.length === 9) {
            numero = `${numero.substring(0, 5)}-${numero.substring(5)}`
        } else {
            numero = `${numero.substring(0, 4)}-${numero.substring(4)}`
        }

        try {
            // Tenta criar um novo telefone usando o modelo
            let telefone = new Telefone(ddd, numero)

            // Tenta adicionar o telefone ao cliente - tentando diferentes propriedades possíveis
            if (this.cliente.Telefones) {
                this.cliente.Telefones.push(telefone)
            } else if (this.cliente.telefones) {
                this.cliente.telefones.push(telefone)
            } else {
                // Se não encontrar nenhuma propriedade adequada, cria uma
                this.cliente.Telefones = [telefone]
            }
        } catch (error) {

            const telefoneObj = {
                ddd: ddd,
                numero: numero
            }

            if (this.cliente.Telefones) {
                this.cliente.Telefones.push(telefoneObj)
            } else if (this.cliente.telefones) {
                this.cliente.telefones.push(telefoneObj)
            } else {
                // Se não encontrar nenhuma propriedade adequada, cria uma
                this.cliente.Telefones = [telefoneObj]
            }
        }

        console.log(`\n✅ Telefone adicionado: (${ddd}) ${numero}`);
        console.log('Agora podemos entrar em contato para informações importantes!');
    }
}


