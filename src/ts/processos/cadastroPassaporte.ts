import Processo from "../abstracoes/processo";
import { TipoDocumento } from "../enumeracoes/TipoDocumento";
import Cliente from "../modelos/cliente";
import Documento from "../modelos/documento";

export default class CadastroPassaporte extends Processo {
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

        console.log('✨CADASTRO DE PASSAPORTE (DOCUMENTO INTERNACIONAL)✨');


        // Validação do número do Passaporte
        let numero = ""
        let numeroValido = false

        while (!numeroValido) {
            numero = this.entrada.receberTexto('🌎 Número do Passaporte (como consta no documento):')

            if (!numero || numero.trim() === '') {
                console.log('⚠️ O número do Passaporte não pode estar em branco. Por favor, verifique seu documento.')
            } else {
                numeroValido = true
            }
        }

        // Data de expedição
        let dataExpedicao = this.entrada.receberData('📅 Data em que o Passaporte foi emitido')

        // Validação simples da data
        let hoje = new Date()
        if (dataExpedicao > hoje) {
            console.log('⚠️ A data de expedição não pode ser no futuro. Ajustando para a data atual.')
            dataExpedicao = new Date()
        }

        try {
            // Verificar se já existe um Passaporte e substituir se necessário
            const passaporteIndex = this.cliente.Documentos.findIndex(doc =>
                doc && doc.Tipo === TipoDocumento.Passaporte
            )

            // Cria e adiciona o documento
            let passaporte = new Documento(numero, TipoDocumento.Passaporte, dataExpedicao)

            if (passaporteIndex >= 0) {
                this.cliente.Documentos[passaporteIndex] = passaporte
                console.log(`✅ Passaporte atualizado com sucesso: ${numero}`)
            } else {
                this.cliente.Documentos.push(passaporte)
                console.log(`✅ Passaporte cadastrado com sucesso: ${numero}`)
            }
        } catch (error) {
            console.log('❌ Erro ao cadastrar Passaporte:', error)
        }
    }
}


