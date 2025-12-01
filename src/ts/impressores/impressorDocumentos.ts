import Impressor from "../interfaces/impressor";
import Documento from "../modelos/documento";
import { TipoDocumento } from "../enumeracoes/TipoDocumento";

export default class ImpressorDocumentos implements Impressor {
    private documentos: Documento[];

    constructor(documentos: Documento[]) {
        this.documentos = documentos || [];
    }

    public imprimir(): string {
        let resultado = '';

        resultado += "📄 DOCUMENTOS OFICIAIS 📄\n";
        resultado += "┌─────────────┬─────────────────────────┬────────────────┐\n";
        resultado += "│  DOCUMENTO  │         NÚMERO          │  DATA EMISSÃO  │\n";
        resultado += "├─────────────┼─────────────────────────┼────────────────┤\n";

        // CPF
        const cpf = this.buscarPorTipo(TipoDocumento.CPF);
        resultado += "│     CPF     │ ";
        if (cpf?.Numero) {
            const numeroFormatado = this.formatarCPF(cpf.Numero);
            resultado += numeroFormatado.padEnd(23);
            resultado += " │ " + this.formatarData(cpf.DataExpedicao).padEnd(14) + " │\n";
        } else {
            resultado += "❌ Não cadastrado".padEnd(23);
            resultado += " │ " + "---".padEnd(14) + " │\n";
        }

        // RG
        const rg = this.buscarPorTipo(TipoDocumento.RG);
        resultado += "│     RG      │ ";
        if (rg?.Numero) {
            resultado += rg.Numero.padEnd(23);
            resultado += " │ " + this.formatarData(rg.DataExpedicao).padEnd(14) + " │\n";
        } else {
            resultado += "❌ Não cadastrado".padEnd(23);
            resultado += " │ " + "---".padEnd(14) + " │\n";
        }

        // PASSAPORTE
        const passaporte = this.buscarPorTipo(TipoDocumento.Passaporte);
        resultado += "│ PASSAPORTE  │ ";
        if (passaporte?.Numero) {
            resultado += passaporte.Numero.padEnd(23);
            resultado += " │ " + this.formatarData(passaporte.DataExpedicao).padEnd(14) + " │\n";
        } else {
            resultado += "❌ Não cadastrado".padEnd(23);
            resultado += " │ " + "---".padEnd(14) + " │\n";
        }

        resultado += "└─────────────┴─────────────────────────┴────────────────┘\n";

        const total = (cpf ? 1 : 0) + (rg ? 1 : 0) + (passaporte ? 1 : 0);
        resultado += `📊 Status: ${total}/3 documentos cadastrados\n`;

        if (total === 0) {
            resultado += "⚠️  ATENÇÃO: Nenhum documento oficial cadastrado!\n";
        } else if (total === 3) {
            resultado += "✅ Documentação completa!\n";
        } else {
            resultado += "ℹ️  Recomendamos cadastrar todos os documentos disponíveis.\n";
        }

        return resultado;
    }

    private buscarPorTipo(tipo: TipoDocumento): Documento | null {
        if (!this.documentos || this.documentos.length === 0) {
            return null;
        }

        return this.documentos.find(doc => doc?.Tipo === tipo) || null;
    }

    private formatarData(data: Date): string {
        if (!data) return "Não informado";

        try {
            const dia = String(data.getDate()).padStart(2, '0');
            const mes = String(data.getMonth() + 1).padStart(2, '0');
            const ano = data.getFullYear();
            return `${dia}/${mes}/${ano}`;
        } catch (erro) {
            return "Data inválida";
        }
    }

    private formatarCPF(numero: string): string {
        if (!numero) return "";

        const somenteNumeros = numero.replace(/\D/g, '');

        if (somenteNumeros.length === 11) {
            return `${somenteNumeros.substring(0, 3)}.${somenteNumeros.substring(3, 6)}.${somenteNumeros.substring(6, 9)}-${somenteNumeros.substring(9)}`;
        }

        return numero;
    }
}


