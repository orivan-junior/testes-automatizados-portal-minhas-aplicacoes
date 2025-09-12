# IntranetAutomatizado

Projeto de automação de testes para o sistema DSV (Desenvolvimento de Sistemas de Vida) da Bradesco Seguros.

## Estrutura do Projeto

```
IntranetAutomatizado/
├── Scenarios/                    # Cenários BDD (.feature)
│   └── Cadastro/
│       └── CadastroSimples/
│           └── CadastroSimples.feature
├── Scripts/                      # Scripts de automação
│   └── Page/
│       ├── Login/               # Páginas de login
│       └── TCAP/
│           └── CadastroSimples/
│               ├── Actions/
│               │   └── cadastroSimplesAction.js
│               └── Steps/
│                   └── CadastroSimples.js.js
├── playwright.config.js         # Configuração do Playwright
├── package.json                 # Dependências do projeto
└── readme.md                    # Este arquivo
```

## Cenários Disponíveis

### Cadastro de Práticas Esportivas
- **Arquivo**: `Scenarios/Cadastro/CadastroSimples/CadastroSimples.feature`
- **Tags**: `@cadastro @praticas-esportivas @dsv`
- **Descrição**: Cenário completo para cadastrar e pesquisar uma prática esportiva no sistema DSV

## Como Executar os Testes

### Pré-requisitos
1. Node.js instalado (versão 16 ou superior)
2. NPM ou Yarn

### Instalação
```bash
npm install
```

### Execução dos Testes

#### Executar todos os testes
```bash
npm run run_bdd_playwright
```

#### Executar apenas o cenário de cadastro
```bash
npx bddgen && npx playwright test --grep @cadastro
```

#### Executar apenas práticas esportivas
```bash
npx bddgen && npx playwright test --grep @praticas-esportivas
```


## Configurações

### Playwright
- **Navegador**: Chromium
- **Modo**: Headless desabilitado (visível)
- **Timeout**: 15 minutos
- **Captura**: Vídeo, screenshots e traces habilitados


## Estrutura dos Cenários

Os cenários seguem o padrão BDD (Behavior Driven Development) com:

- **Given**: Pré-condições e navegação
- **When**: Ações do usuário
- **Then**: Verificações e validações

### Exemplo de Cenário

```gherkin
#language: pt
Funcionalidade: SISTRAN » DSV - Cadastro de Práticas Esportivas
  
  @cadastro @praticas-esportivas @dsv
  Cenário: CT001 - Cadastrar e Pesquisar Prática Esportiva | Responsável: Orivan Junior
    Dado que estou na página 'https://www.dsv.bradseg.com.br/'
    E que clico no link 'Minhas Aplicações' no frame principal
    # ... mais steps
    E marco o checkbox 'selecionado' no frame Centro
```

## Padrões de Desenvolvimento

### Actions
- Classes que encapsulam as ações específicas de cada página
- Métodos reutilizáveis para interações com elementos
- Tratamento de popups e frames

### Steps
- Implementação dos steps BDD
- Uso das Actions para execução das ações
- Logs detalhados para debugging

### Frames e Popups
- Tratamento específico para frames nomeados
- Gerenciamento de múltiplas janelas/popups
- Navegação entre diferentes contextos

## Suporte

Para dúvidas ou problemas, entre em contato com a equipe de automação.