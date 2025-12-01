import Documento from "./documento"
import Endereco from "./endereco"
import Telefone from "./telefone"

export default class Cliente {
    // Campos públicos para permitir acesso direto
    public nome: string
    public apelido: string
    private dataNascimento: Date
    private dataCadastro: Date
    private telefones: Telefone[] = []
    private endereco!: Endereco
    private documentos: Documento[] = []
    private dependentes: Cliente[] = []
    private titular!: Cliente

    constructor(nome: string, apelido: string, dataNascimento: Date) {
        this.nome = nome
        this.apelido = apelido
        this.dataNascimento = dataNascimento
        this.dataCadastro = new Date()
        // Garantir arrays inicializados
        this.telefones = []
        this.documentos = []
        this.dependentes = []
    }

    public get Nome() { return this.nome }
    public get Apelido() { return this.apelido }
    public get DataNascimento() { return this.dataNascimento }
    public get DataCadastro() { return this.dataCadastro }
    public get Telefones() { return this.telefones }
    public get Endereco() { return this.endereco }
    public get Documentos() { return this.documentos }
    public get Dependentes() { return this.dependentes }
    public get Titular() { return this.titular }

    public set Nome(nome: string) { this.nome = nome }
    public set Apelido(apelido: string) { this.apelido = apelido }
    public set DataNascimento(data: Date) { this.dataNascimento = data }
    public set Endereco(endereco: Endereco) { this.endereco = endereco }
    public set Titular(titular: Cliente) { this.titular = titular }
    public set Documentos(docs: Documento[]) { this.documentos = docs }
    public set Telefones(tels: Telefone[]) { this.telefones = tels }
    public set Dependentes(deps: Cliente[]) { this.dependentes = deps }
}


