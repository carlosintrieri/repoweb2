import Processo from "../abstracoes/processo";
import { TipoDocumento } from "../enumeracoes/TipoDocumento";
import Cliente from "../modelos/cliente";
import Documento from "../modelos/documento";

export default class CadastroRg extends Processo {
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

        console.log('✨CADASTRO DE RG (REGISTRO GERAL)✨');


        // Validação do número do RG
        let numero = ""
        let numeroValido = false

        while (!numeroValido) {
            numero = this.entrada.receberTexto('🪪 Número do RG (incluindo dígitos verificadores):')

            if (!numero || numero.trim() === '') {
                console.log('⚠️ O número do RG não pode estar em branco. Por favor, verifique seu documento.')
            } else {
                numeroValido = true
            }
        }

        // Data de expedição
        let dataExpedicao = this.entrada.receberData('📅 Data em que o RG foi emitido')

        // Validação simples da data
        let hoje = new Date()
        if (dataExpedicao > hoje) {
            console.log('⚠️ A data de expedição não pode ser no futuro. Ajustando para a data atual.')
            dataExpedicao = new Date()
        }

        try {
            // Verificar se já existe um RG e substituir se necessário
            const rgIndex = this.cliente.Documentos.findIndex(doc =>
                doc && doc.Tipo === TipoDocumento.RG
            )

            // Cria e adiciona o documento
            let rg = new Documento(numero, TipoDocumento.RG, dataExpedicao)

            if (rgIndex >= 0) {
                this.cliente.Documentos[rgIndex] = rg
                console.log(`✅ RG atualizado com sucesso: ${numero}`)
            } else {
                this.cliente.Documentos.push(rg)
                console.log(`✅ RG cadastrado com sucesso: ${numero}`)
            }
        } catch (error) {
            console.log('❌ Erro ao cadastrar RG:', error)
        }
    }
}



