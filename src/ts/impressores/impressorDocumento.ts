import Impressor from "../interfaces/impressor";
import Documento from "../modelos/documento";
import { TipoDocumento } from "../enumeracoes/TipoDocumento";

export default class ImpressorDocumento implements Impressor {
    private documento: Documento

    constructor(documento: Documento) {
        this.documento = documento
    }

    imprimir(): string {
        try {

            let tipoFormatado: string
            const tipoStr = String(this.documento.Tipo);

            if (tipoStr.includes("CPF")) {
                tipoFormatado = "CPF (Cadastro de Pessoa Física)";
            }
            else if (tipoStr.includes("RG")) {
                tipoFormatado = "RG (Registro Geral)";
            }
            else if (tipoStr.includes("Passaporte")) {
                tipoFormatado = "Passaporte (Documento Internacional)";
            }
            else {
                tipoFormatado = tipoStr;
            }

            // Formatação da data
            const dataFormatada = this.formatarData(this.documento.DataExpedicao);
            let numeroFormatado = this.documento.Numero;

            // Formatação especial para CPF
            if (tipoStr.includes("CPF") && numeroFormatado.length === 11) {
                if (/^\d+$/.test(numeroFormatado)) {
                    numeroFormatado = `${numeroFormatado.substring(0, 3)}.${numeroFormatado.substring(3, 6)}.${numeroFormatado.substring(6, 9)}-${numeroFormatado.substring(9)}`;
                }
            }

            // Montagem do texto de impressão
            let impressao = `| Documento:\n`
                + `| Tipo: ${tipoFormatado}\n`
                + `| Número: ${numeroFormatado}\n`
                + `| Data expedição: ${dataFormatada}`;

            return impressao;
        } catch (error) {
            return "| Documento com formato inválido";
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


