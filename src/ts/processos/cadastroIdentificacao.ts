import Processo from "../abstracoes/processo";
import { TipoDocumento } from "../enumeracoes/TipoDocumento";
import Cliente from "../modelos/cliente";
import Documento from "../modelos/documento";

export default class CadastroIdentificacao extends Processo {
    private cliente: Cliente

    constructor(cliente: Cliente) {
        super()
        this.cliente = cliente

        // Garantir que o array de documentos existe
        if (!this.cliente.Documentos) {
            this.cliente.Documentos = []
        }
    }

    processar(): void {

        console.log('✨CADASTRO DE CPF (IDENTIFICAÇÃO PESSOAL)✨');


        // Validação do número do CPF
        let numero = ""
        let numeroValido = false

        while (!numeroValido) {
            numero = this.entrada.receberTexto('📝 Número do CPF (apenas dígitos):')
            // Remove caracteres não numéricos
            numero = numero.replace(/\D/g, '')

            if (numero.length !== 11) {
                console.log('⚠️ O CPF deve conter exatamente 11 dígitos. Por favor, verifique.')
            } else {
                numeroValido = true

                // Verificação básica de CPF válido (apenas para ilustração)
                if (this.todosDigitosIguais(numero)) {
                    console.log('⚠️ CPF com dígitos repetidos pode não ser válido.')
                }
            }
        }

        // Formatação do CPF para exibição (ex: 123.456.789-00)
        let cpfFormatado = `${numero.substring(0, 3)}.${numero.substring(3, 6)}.${numero.substring(6, 9)}-${numero.substring(9)}`

        // Data de expedição
        let dataExpedicao = this.entrada.receberData('📅 Data em que o CPF foi emitido')

        // Validação simples da data
        let hoje = new Date()
        if (dataExpedicao > hoje) {
            console.log('⚠️ Data de emissão futura detectada. Ajustando para data atual.')
            dataExpedicao = new Date()
        }

        try {
            // Verificar se já existe um CPF e substituir se necessário
            const cpfIndex = this.cliente.Documentos.findIndex(doc =>
                doc && doc.Tipo === TipoDocumento.CPF
            )

            // Cria e adiciona o documento
            let cpf = new Documento(cpfFormatado, TipoDocumento.CPF, dataExpedicao)

            if (cpfIndex >= 0) {
                this.cliente.Documentos[cpfIndex] = cpf
                console.log(`✅ CPF atualizado com sucesso: ${cpfFormatado}`)
            } else {
                this.cliente.Documentos.push(cpf)
                console.log(`✅ CPF cadastrado com sucesso: ${cpfFormatado}`)
            }
        } catch (error) {
            console.log('❌ Erro ao cadastrar CPF:', error)
        }
    }

    // Método auxiliar para verificar CPFs com todos os dígitos iguais
    private todosDigitosIguais(numero: string): boolean {
        const primeiroDigito = numero.charAt(0)
        return numero.split('').every(d => d === primeiroDigito)
    }
}


