import Processo from "../abstracoes/processo";
import Endereco from "../modelos/endereco";

export default class CadastroEnderecoCliente extends Processo {
    private clienteData: any;

    constructor(clienteData: any) {
        super();
        this.clienteData = clienteData;
    }

    processar(): void {
        console.clear();
        console.log('✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨');
        console.log('✨          SISTEMA DE GESTÃO DE CLIENTES                               ✨');
        console.log('✨               DADOS DE ENDEREÇO                                      ✨');
        console.log('✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨');

        console.log('\n🏡 Vamos registrar seu endereço completo:');

        let rua = this.entrada.receberTexto('🛣️ Qual o nome da sua rua, avenida ou logradouro:');
        // Validação simples
        if (!rua || rua.trim() === '') {
            rua = 'Não informado';
            console.log('⚠️ Nota: O endereço completo é essencial para correspondências e entregas de benefícios exclusivos.');
        }

        let numero = this.entrada.receberTexto('🏠 Qual o número da residência:');
        // Complemento é opcional
        let complemento = this.entrada.receberTexto('🏢 Complemento como apartamento, bloco ou andar (opcional):');

        let bairro = this.entrada.receberTexto('🏙️ Em qual bairro ou região você mora:');
        if (!bairro || bairro.trim() === '') {
            bairro = 'Centro'; // Valor padrão se não informado
        }

        let cidade = this.entrada.receberTexto('🌆 Nome da sua cidade:');
        if (!cidade || cidade.trim() === '') {
            console.log('⚠️ A cidade é uma informação fundamental para o seu cadastro.');
            cidade = 'Não informada';
        }

        let estado = this.entrada.receberTexto('🗺️ Estado onde reside (use a sigla - ex: SP, RJ, MG):');
        // Normalize estados para maiúsculas
        estado = estado.toUpperCase();
        // Validação simples de UF brasileiro
        const ufs = ['AC', 'AL', 'AM', 'AP', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
            'MG', 'MS', 'MT', 'PA', 'PB', 'PE', 'PI', 'PR', 'RJ', 'RN',
            'RO', 'RR', 'RS', 'SC', 'SE', 'SP', 'TO'];
        if (!ufs.includes(estado)) {
            console.log('⚠️ UF não reconhecida no formato brasileiro.');
        }

        let pais = this.entrada.receberTexto('🌎 País onde reside:');
        if (!pais || pais.trim() === '') {
            pais = 'Brasil'; // Valor padrão se não informado
        }

        let codigoPostal = this.entrada.receberTexto('📮 CEP/Código Postal (apenas números):');
        // Remove não-dígitos e formata CEP
        codigoPostal = codigoPostal.replace(/\D/g, '');
        if (codigoPostal.length !== 8) {
            console.log('⚠️ O CEP deve conter 8 dígitos. O valor informado pode estar incorreto.');
        } else {
            // Formata CEP como 12345-678
            codigoPostal = `${codigoPostal.substring(0, 5)}-${codigoPostal.substring(5)}`;
        }

        try {
            // Cria o endereco usando o construtor padrão da classe
            const endereco = new Endereco(rua, bairro, cidade, estado, pais, codigoPostal);

            // Atribui o endereço ao cliente
            this.clienteData.Endereco = endereco;
        } catch (error) {
            // Se não conseguir usar o modelo Endereco, cria um objeto simples
            const enderecoObj = {
                rua: rua,
                numero: numero,
                complemento: complemento,
                bairro: bairro,
                cidade: cidade,
                estado: estado,
                pais: pais,
                codigoPostal: codigoPostal
            };

            // Atribui ao cliente, tentando diferentes propriedades possíveis
            if (this.clienteData) {
                if (typeof this.clienteData.Endereco !== 'undefined') {
                    this.clienteData.Endereco = enderecoObj;
                } else if (typeof this.clienteData.endereco !== 'undefined') {
                    this.clienteData.endereco = enderecoObj;
                } else {
                    // Se não existir nenhuma propriedade de endereço, cria uma
                    this.clienteData.Endereco = enderecoObj;
                }
            }
        }


        console.log('✨✅ ENDEREÇO SALVO COM SUCESSO!✨');
        console.log(`📍 ${rua}, ${numero} ${complemento ? complemento : ''}`);
        console.log(`   ${bairro} - ${cidade}/${estado}`);
        console.log(`   ${pais} - CEP: ${codigoPostal}`);

    }
}


