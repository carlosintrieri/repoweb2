export enum TipoDocumento {
    CPF = 'Cadastro de Pessoas Física',
    RG = 'Registro Geral',
    Passaporte = 'Passaporte'
}

// Função auxiliar para identificar tipo de documento a partir de string
export function identificarTipoDocumento(tipo: string): TipoDocumento | undefined {
    if (tipo.includes('CPF') || tipo.includes('Cadastro de Pessoa')) {
        return TipoDocumento.CPF;
    }
    if (tipo.includes('RG') || tipo.includes('Registro Geral')) {
        return TipoDocumento.RG;
    }
    if (tipo.includes('Passaporte')) {
        return TipoDocumento.Passaporte;
    }
    return undefined;
}

// Função auxiliar para verificar se é um tipo de documento válido
export function isTipoDocumentoValido(tipo: any): boolean {
    return Object.values(TipoDocumento).includes(tipo);
}