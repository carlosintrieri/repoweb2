import Impressor from "../interfaces/impressor";
import Telefone from "../modelos/telefone";

export default class ImpressorTelefone implements Impressor {
    private telefone: Telefone

    constructor(telefone: Telefone) {
        this.telefone = telefone
    }

    imprimir(): string {
        let visualizacao = `| ----- Informações de Telefone: -----\n`
            + `| Código de área: ${this.telefone.Ddd}\n`
            + `| Número para contato: ${this.telefone.Numero}\n`
            + `| Região: ${this.determinarRegiao(this.telefone.Ddd)}`

        return visualizacao
    }

    // Método melhorado para determinar a região com base no DDD
    private determinarRegiao(ddd: string): string {
        const numDDD = parseInt(ddd, 10);

        // Norte: 91-99
        if (numDDD >= 91 && numDDD <= 99) {
            return "Norte (PA, AM, RO, AC, RR, AP, TO)";
        }

        // Nordeste: 71-89
        if (numDDD >= 71 && numDDD <= 89) {
            return "Nordeste (BA, SE, AL, PE, PB, RN, CE, PI, MA)";
        }

        // Centro-Oeste: 61-69
        if (numDDD >= 61 && numDDD <= 69) {
            return "Centro-Oeste (DF, GO, MT, MS)";
        }

        // Sudeste: 11-39
        if (numDDD >= 11 && numDDD <= 39) {
            return "Sudeste (SP, RJ, ES, MG)";
        }

        // Sul: 41-54
        if (numDDD >= 41 && numDDD <= 54) {
            return "Sul (PR, SC, RS)";
        }

        // Mais detalhado para DDD específicos
        switch (ddd) {
            case "11":
                return "São Paulo - Capital (SP)";
            case "21":
                return "Rio de Janeiro - Capital (RJ)";
            case "31":
                return "Belo Horizonte (MG)";
            case "41":
                return "Curitiba (PR)";
            case "47":
                return "Santa Catarina - Joinville/Blumenau (SC)";
            case "48":
                return "Florianópolis (SC)";
            case "51":
                return "Porto Alegre (RS)";
            case "61":
                return "Brasília (DF)";
            case "71":
                return "Salvador (BA)";
            case "81":
                return "Recife (PE)";
            case "85":
                return "Fortaleza (CE)";
            case "91":
                return "Belém (PA)";
            case "92":
                return "Manaus (AM)";
            default:
                return "Região não identificada";
        }
    }
}



