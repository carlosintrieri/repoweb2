import Impressor from "../interfaces/impressor";
import Cliente from "../modelos/cliente";
import ImpressorDocumentos from "./impressorDocumentos";

export default class ImpressorClienteSimples implements Impressor {
    private cliente: Cliente;
    private id: number;

    constructor(cliente: Cliente, id?: number) {
        this.cliente = cliente;
        this.id = id || 0;
    }

    public imprimir(): string {
        let resultado = ``;

        if (this.id) {
            resultado += `🆔 ID: ${this.id}\n`;
        }

        resultado += `👤 Nome: ${this.cliente.nome}\n`;
        resultado += `👥 Apelido: ${this.cliente.apelido}\n`;
        resultado += `🎂 Data de nascimento: ${this.formatarData(this.cliente.DataNascimento)}\n`;

        return resultado;
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


