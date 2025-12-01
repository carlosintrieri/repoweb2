# Requisitos do Sistema


# Dependências

Antes de executar o projeto, certifique-se de ter instalado:

Node.js (versão 16 ou superior)
npm ou yarn como gerenciador de pacotes
TypeScript (instalado globalmente)
ts-node (instalado globalmente)

Instalação das Dependências
bash# Instalar TypeScript e ts-node globalmente
npm install -g typescript ts-node

# Instalar dependências do projeto
npm install prompt-sync
npm install @types/prompt-sync --save-dev
npm install @types/node --save-dev


# Configuração do TypeScript
Crie um arquivo tsconfig.json na raiz do projeto com a seguinte configuração:
json{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "removeComments": false,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "noImplicitThis": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "moduleResolution": "node",
    "baseUrl": "./",
    "paths": {
      "*": ["node_modules/*"]
    }
  },
  "include": [
    "src/**/*"
  ],
  "exclude": [
    "node_modules",
    "dist",
    "**/*.test.ts"
  ],
  "ts-node": {
    "esm": false,
    "experimentalSpecifierResolution": "node"
  }
}

## Estrutura do Projeto




# Como Executar

Navegue até o diretório do projeto:

bash   cd src/ts

Execute a aplicação:

bash   ts-node app.ts



1. Cadastrar Novo Visitante
Opções disponíveis:

Titular: Cliente principal responsável pela conta
Dependente: Cliente vinculado a um titular existente

# Dados coletados para Titulares:

Nome completo
Apelido/Nome social
Data de nascimento
Endereço completo
Documentos (CPF, RG, Passaporte)
Telefones para contato

# Dados coletados para Dependentes:

Nome completo
Apelido/Nome social
Data de nascimento
Endereço (pode usar o do titular)
Documentos (CPF, RG, Passaporte)
Telefones para contato

2. Atualizar Dados de Visitante
Para Titulares:

Alterar nome completo
Alterar apelido
Corrigir data de nascimento
Atualizar endereço
Gerenciar documentos
Gerenciar telefones

Para Dependentes:

Alterar nome completo
Alterar apelido
Corrigir data de nascimento
Atualizar documentação
Gerenciar telefones

3. Consultar Cadastros
Opções de consulta:

Listar todos os titulares: Exibe todos os clientes principais com informações completas
Listar dependentes de um titular: Permite selecionar um titular e visualizar todos os seus dependentes

Informações exibidas:

Dados pessoais completos
Endereço formatado
Documentação oficial em formato de tabela
Telefones de contato com informações regionais
Resumo familiar (para dependentes)

4. Remover Cadastro de Visitante
Regras de remoção:

Titulares: Só podem ser removidos se não possuírem dependentes
Dependentes: Podem ser removidos individualmente
Confirmação obrigatória com palavra-chave "CONFIRMAR"


# Solução de Problemas

# Erro de Módulo não Encontrado

bashnpm install prompt-sync

npm install @types/prompt-sync --save-dev

# Erro de TypeScript

bashnpm install -g typescript

tsc --version  # Verificar instalação

Erro de ts-node

bashnpm install -g ts-node

ts-node --version  # Verificar instalação

npx ts-node src/ts/app/app.ts