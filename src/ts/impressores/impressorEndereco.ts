import Impressor from "../interfaces/impressor";
import Endereco from "../modelos/endereco";

export default class ImpressorEndereco implements Impressor {
    private endereco: Endereco

    constructor(endereco: Endereco) {
        this.endereco = endereco
    }

    imprimir(): string {
        if (!this.endereco) {
            return "📍 ENDEREÇO: Informação não disponível\n";
        }

        let impressao = "┌─────────────────────────────────────────────────────────────┐\n";
        impressao += "│                     📍 ENDEREÇO COMPLETO                     │\n";
        impressao += "├─────────────────────────────────────────────────────────────┤\n";

        // Rua/Logradouro
        const rua = this.endereco.Rua || "Não informado";
        impressao += `│ 🛣️  Logradouro: ${this.ajustarTexto(rua, 42)} │\n`;

        // Bairro
        const bairro = this.endereco.Bairro || "Não informado";
        impressao += `│ 🏘️  Bairro: ${this.ajustarTexto(bairro, 46)} │\n`;

        // Cidade
        const cidade = this.endereco.Cidade || "Não informado";
        impressao += `│ 🌆 Cidade: ${this.ajustarTexto(cidade, 47)} │\n`;

        // Estado
        const estado = this.endereco.Estado || "Não informado";
        impressao += `│ 🗺️  Estado: ${this.ajustarTexto(estado, 46)} │\n`;

        // País
        const pais = this.endereco.Pais || "Não informado";
        impressao += `│ 🌎 País: ${this.ajustarTexto(pais, 49)} │\n`;

        // Código Postal - CORRIGIDO: era .Pais, agora é .CodigoPostal
        const codigoPostal = this.endereco.CodigoPostal || "Não informado";
        impressao += `│ 📮 CEP: ${this.ajustarTexto(codigoPostal, 50)} │\n`;

        impressao += "└─────────────────────────────────────────────────────────────┘\n";

        return impressao;
    }

    private ajustarTexto(texto: string, tamanhoMaximo: number): string {
        // Garante que o texto não ultrapasse o tamanho da tabela
        if (texto.length > tamanhoMaximo) {
            return texto.substring(0, tamanhoMaximo - 3) + "...";
        }
        // Preenche com espaços para alinhar a tabela
        return texto.padEnd(tamanhoMaximo);
    }
}


