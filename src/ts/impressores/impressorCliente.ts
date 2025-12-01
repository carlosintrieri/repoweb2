import Impressor from "../interfaces/impressor";
import Cliente from "../modelos/cliente";
import ImpressorDocumentos from "./impressorDocumentos";

export default class ImpressaorCliente implements Impressor {
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
        resultado += `📆 Data de cadastro: ${this.formatarData(this.cliente.DataCadastro)}\n`;

        // Adicionar endereço se disponível
        if (this.cliente.Endereco) {
            resultado += `\n📍 Endereço:\n`;
            resultado += `   ${this.cliente.Endereco.Rua}, ${this.cliente.Endereco.Bairro}\n`;
            resultado += `   ${this.cliente.Endereco.Cidade}/${this.cliente.Endereco.Estado}\n`;
            resultado += `   ${this.cliente.Endereco.Pais} - CEP: ${this.cliente.Endereco.CodigoPostal}\n`;
        }

        // Adicionar documentos explicitamente usando ImpressorDocumentos
        if (this.cliente.Documentos && this.cliente.Documentos.length > 0) {
            resultado += `\n`;
            const impressorDocs = new ImpressorDocumentos(this.cliente.Documentos);
            resultado += impressorDocs.imprimir();
        } else {
            resultado += "\n⚠️ Nenhum documento cadastrado.\n";
        }

        // Adicionar telefones
        if (this.cliente.Telefones && this.cliente.Telefones.length > 0) {
            resultado += `\n📱 Telefones para contato:\n`;
            this.cliente.Telefones.forEach((telefone, index) => {
                resultado += `   ${index + 1}. (${telefone.Ddd}) ${telefone.Numero}\n`;
            });
        } else {
            resultado += "\n⚠️ Nenhum telefone cadastrado.\n";
        }

        // Adicionar dependentes se disponível
        if (this.cliente.Dependentes && this.cliente.Dependentes.length > 0) {
            resultado += `\n👨‍👩‍👧‍👦 Total de dependentes: ${this.cliente.Dependentes.length}\n`;
        }

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


