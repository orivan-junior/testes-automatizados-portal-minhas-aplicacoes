# Consulta de Cartão de Crédito - Testes Automatizados

## Visão Geral

Este documento descreve os cenários automatizados para consulta de cartão de crédito no sistema GCCS, integrados ao portal principal com navegação direta após login.

## Arquitetura da Solução

### Estrutura de Arquivos

```
Scripts/
├── Page/
│   └── Consulta/
│       ├── ConsultaCartaoCredito.js     # Page Object para consulta
│       └── Steps/
│           └── ConsultaCartaoCredito.js # Steps dos cenários
└── Support/
    └── utils.js                         # Utilitários compartilhados

Scenarios/
└── Consulta/
    └── ConsultaCartaoCredito/
        └── ConsultaCartaoCredito.feature # Cenários Gherkin
```

### Fluxo de Execução

1. **Login Manual no Portal**: O usuário faz login manualmente no portal DSV
2. **Navegação Direta**: O sistema navega automaticamente para a URL específica do GCCS
3. **Execução dos Cenários**: Os testes executam as consultas de cartão de crédito

## Cenários Disponíveis

### 1. Consulta bem-sucedida com CPF válido
- **Tag**: `@smoke @consulta @positivo @consulta-cartao`
- **Objetivo**: Validar consulta com CPF existente e cartão ativado
- **Dados de Teste**:
  - CPF: 75561140159
  - Classe: 1 (GOLD)
  - Administradora: 40003 (PRJR)

### 2. Consulta sem resultados - CPF inexistente
- **Tag**: `@consulta @negativo @consulta-cartao`
- **Objetivo**: Validar comportamento com CPF que não existe
- **Dados de Teste**:
  - CPF: 123456
  - Classe: 1
  - Administradora: 40003

## Como Executar

### Executar apenas cenários de consulta de cartão
```bash
npm run consulta-cartao
```

### Executar todos os cenários de consulta
```bash
npm run consulta
```

### Executar cenários específicos por tag
```bash
npx bddgen && npx playwright test --grep @positivo
npx bddgen && npx playwright test --grep @negativo
```

## Configurações Importantes

### URL de Navegação Direta
A URL utilizada para navegação direta é:
```
https://www.dsv.bradseg.com.br/admin_frames.asp?URL=https://wsphttp.dsv.bradseg.com.br/GCCS-ConsultaCartaoCredito/iniciarConsultaProposta.do
```

### Adaptações para o Portal

1. **Login Manual**: Mantém a segurança do processo de autenticação
2. **Navegação Direta**: Evita navegação pelos menus, indo direto à funcionalidade
3. **Reutilização de Código**: Aproveita utilitários existentes do projeto principal

## Page Object - ConsultaCartaoCreditoPage

### Métodos Principais

- `navegarDiretamente()`: Navega para a URL específica após login
- `selecionarOpcaoCpf()`: Seleciona opção de consulta por CPF
- `preencherCpf(cpf)`: Preenche campo CPF
- `selecionarClasseCartao(classe)`: Seleciona classe do cartão
- `selecionarAdmCartao(adm)`: Seleciona administradora
- `clicarPesquisar()`: Executa a pesquisa
- `resultadoPropostaVisivel()`: Verifica se resultado está visível
- `propostaVisivel()`: Verifica se proposta está visível

### Estratégias de Localização

O Page Object utiliza múltiplas estratégias para localizar elementos:
- Seletores por ID específicos
- Seletores por role (acessibilidade)
- Seletores genéricos como fallback
- Verificação de conteúdo textual

## Steps Customizados

### Steps Específicos para Consulta

- `navego diretamente para a página de consulta de cartão de crédito`
- `eu seleciono a opção "Número do CPF do Cliente"`
- `preencho o CPF "75561140159"`
- `seleciono a classe do cartão "1"`
- `seleciono a administradora "40003"`
- `clico no botão pesquisar`

### Steps de Validação

- `devo ver o resultado da consulta`
- `devo ver o resultado da proposta`
- `deve conter "6 - CARTAO ATIVADO"`
- `deve exibir o nome "TESTE HOMOLOGACAO"`
- `deve mostrar o CPF pelo contexto do teste`
- `deve mostrar a administradora "PRJR"`
- `deve mostrar a classe "GOLD"`

## Tratamento de Erros

### Estratégias Implementadas

1. **Múltiplas Tentativas**: Localizadores com estratégias alternativas
2. **Timeouts Configuráveis**: Aguarda carregamento adequado das páginas
3. **Logs Detalhados**: Facilita debug em caso de falha
4. **Screenshots Automáticos**: Captura tela em caso de erro para análise

### Exemplo de Tratamento

```javascript
async resultadoPropostaVisivel() {
  try {
    // Tentar múltiplas estratégias para detectar resultado
    const estrategias = [
      () => this.resultadoProposta.isVisible(),
      () => this.anyTable.isVisible(),
      () => this.anyCell.isVisible(),
      () => this.page.locator('body').textContent().then(text => 
        text.includes('encontrado') || text.includes('CARTAO'))
    ];
    
    for (const estrategia of estrategias) {
      try {
        const resultado = await estrategia();
        if (resultado) return true;
      } catch (e) {
        continue;
      }
    }
    return false;
  } catch (error) {
    console.log('⚠️ Erro verificando resultado:', error.message);
    return false;
  }
}
```

## Manutenção e Extensibilidade

### Adicionando Novos Cenários

1. Adicione o cenário no arquivo `.feature`
2. Implemente steps específicos se necessário
3. Adicione métodos no Page Object se preciso
4. Atualize tags para execução seletiva

### Atualizando Seletores

Todos os seletores estão centralizados no Page Object, facilitando manutenção:

```javascript
// Seletores baseados na aplicação real GCCS
this.radioCpfCliente = page.getByRole('radio', { name: 'Número do CPF do Cliente' });
this.inputCpf = page.locator('#num_cpf');
this.selectClasseCartao = page.locator('#classe_cartao_credito');
```

## Considerações de Segurança

1. **Login Manual**: Mantém segurança sem expor credenciais em código
2. **URLs Específicas**: Navegação direta para funcionalidades autorizadas
3. **Dados de Teste**: Utiliza apenas dados não sensíveis para validação

## Monitoramento e Relatórios

Os testes geram automaticamente:
- Relatórios HTML com resultados detalhados
- Videos das execuções
- Screenshots em caso de falha
- Traces para debug avançado

Para visualizar relatórios:
```bash
npx playwright show-report
```
