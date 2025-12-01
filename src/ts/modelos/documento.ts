import { TipoDocumento } from "../enumeracoes/TipoDocumento"

export default class Documento {
    private numero: string
    private tipo: TipoDocumento
    private dataExpedicao: Date

    constructor(numero: string, tipo: TipoDocumento, dataExpedicao: Date) {
        this.numero = numero
        this.tipo = tipo
        this.dataExpedicao = dataExpedicao
    }

    public get Numero() {
        return this.numero
    }

    public get Tipo() {
        return this.tipo
    }

    public get DataExpedicao() {
        return this.dataExpedicao
    }

    // Métodos adicionais para facilitar a visualização e comparação

    public toString(): string {
        return `Documento tipo ${this.tipo}: ${this.numero} (emitido em ${this.formatarData(this.dataExpedicao)})`
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



