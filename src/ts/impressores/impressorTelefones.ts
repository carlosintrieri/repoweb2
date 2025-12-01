import Impressor from "../interfaces/impressor"
import Telefone from "../modelos/telefone"
import ImpressorTelefone from "./impressorTelefone"

export default class ImpressorTelefones implements Impressor {
    private telefones: Telefone[]
    private impressor!: Impressor

    constructor(telefones: Telefone[]) {
        this.telefones = telefones
    }

    imprimir(): string {
        let visualizacao = `| ===== Informações de Contato =====\n`

        if (this.telefones.length === 0) {
            visualizacao += "| Nenhum telefone registrado."
            return visualizacao
        }

        visualizacao += `| Total de telefones: ${this.telefones.length}\n`

        // Agrupar telefones por região para mostrar estatísticas
        const regioes = new Map<string, number>();

        for (let index = 0; index < this.telefones.length; index++) {
            // Criar nova instância do impressor para cada telefone
            this.impressor = new ImpressorTelefone(this.telefones[index])
            visualizacao = visualizacao + `\n${this.impressor.imprimir()}`

            // Contabilizar região
            const regiao = this.obterRegiaoResumida(this.telefones[index].Ddd);
            regioes.set(regiao, (regioes.get(regiao) || 0) + 1);

            if (index < this.telefones.length - 1) {
                visualizacao += `\n| --------------------`
            }
        }

        // Adicionar estatísticas de regiões se houver mais de um telefone
        if (this.telefones.length > 1) {
            visualizacao += `\n| --------------------\n`
            visualizacao += `| Estatísticas por região:\n`

            regioes.forEach((quantidade, regiao) => {
                visualizacao += `| ${regiao}: ${quantidade} telefone(s)\n`
            });
        }

        return visualizacao
    }

    // Método auxiliar para obter região resumida
    private obterRegiaoResumida(ddd: string): string {
        const numDDD = parseInt(ddd, 10);

        // Norte: 91-99
        if (numDDD >= 91 && numDDD <= 99) {
            return "Norte";
        }

        // Nordeste: 71-89
        if (numDDD >= 71 && numDDD <= 89) {
            return "Nordeste";
        }

        // Centro-Oeste: 61-69
        if (numDDD >= 61 && numDDD <= 69) {
            return "Centro-Oeste";
        }

        // Sudeste: 11-39
        if (numDDD >= 11 && numDDD <= 39) {
            return "Sudeste";
        }

        // Sul: 41-54
        if (numDDD >= 41 && numDDD <= 54) {
            return "Sul";
        }

        return "Região não identificada";
    }
}



