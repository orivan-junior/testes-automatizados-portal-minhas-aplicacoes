# Cadastro de Práticas Esportivas - TCAP

## 📋 Descrição
Este cenário automatiza o fluxo completo de cadastro de práticas esportivas no sistema DSV, seguindo a estratégia do projeto TCAP.

## 🏗️ Estrutura do Projeto

```
IntranetAutomatizado/
├── Scripts/Page/TCAP/CadastroSimples/
│   ├── Actions/
│   │   └── cadastroSimplesAction.js          # Classe com métodos de interação
│   └── Steps/
│       └── CadastroSimples.js.js             # Definições dos steps BDD
├── Scenarios/Cadastro/CadastroSimples/
│   └── CadastroSimples.feature               # Cenários em linguagem Gherkin
├── test-cadastro-praticas-esportivas.js      # Teste principal executável
└── Evidências de Teste/CadastroSimples/      # Screenshots e evidências
```

## 🚀 Como Executar

### Execução via BDD (Recomendado)
```bash
npm run praticas-esportivas
```

### Execução direta do teste
```bash
npm run test-praticas-esportivas
```

### Execução com geração de relatório
```bash
npm run tests-com-pdf
```

## 📝 Cenários Implementados

### 1. Cadastro de Nova Prática Esportiva
- **Tag:** `@praticas-esportivas @cadastro`
- **Descrição:** Cadastra uma nova prática esportiva com o nome "teste31"
- **Fluxo:**
  1. Navega para a página inicial do DSV
  2. Acessa "Minhas Aplicações"
  3. Clica em "VIDA - Subscrição de Riscos"
  4. Acessa o menu "Cadastros"
  5. Seleciona "Práticas Esportivas"
  6. Preenche o campo nome com "teste31"
  7. Clica em "Incluir"
  8. Pesquisa pela prática cadastrada
  9. Seleciona o resultado
  10. Marca o checkbox de seleção

### 2. Cadastro de Prática Esportiva Alternativa
- **Tag:** `@praticas-esportivas @cadastro @cenario-alternativo`
- **Descrição:** Cadastra uma prática esportiva com o nome "futebol"
- **Fluxo:** Similar ao cenário principal, mas com nome diferente

## 🔧 Funcionalidades Implementadas

### Actions (cadastroSimplesAction.js)
- `navigateToDSV()` - Navega para a página inicial
- `clickMinhasAplicacoes()` - Clica no link Minhas Aplicações
- `clickVidaSubscricao()` - Acessa VIDA - Subscrição de Riscos
- `clickCadastros()` - Acessa o menu Cadastros
- `clickPraticasEsportivas()` - Seleciona Práticas Esportivas
- `preencherNomePratica()` - Preenche o campo nome
- `clicarIncluir()` - Clica no botão Incluir
- `clicarPesquisar()` - Clica no botão Pesquisar
- `clicarNoResultado()` - Clica no resultado da pesquisa
- `marcarCheckbox()` - Marca o checkbox de seleção

### Steps BDD (CadastroSimples.js.js)
- Steps em português seguindo o padrão Given/When/Then
- Gerenciamento automático de múltiplas páginas
- Captura de screenshots automática
- Verificações de sucesso

## 📸 Evidências de Teste
O cenário captura automaticamente screenshots nos seguintes momentos:
- Após incluir a prática esportiva
- Após selecionar o resultado
- Em caso de erro durante a execução

## ⚙️ Configurações
- **Timeout:** 15 minutos por teste
- **Navegador:** Chromium
- **Modo:** Headless desabilitado (visual)
- **Vídeo:** Captura automática
- **Screenshots:** Apenas em falhas (configurável)

## 🐛 Tratamento de Erros
- Captura de screenshots em caso de erro
- Logs detalhados de cada etapa
- Timeouts configuráveis para carregamento
- Verificações de elementos antes das interações

## 📊 Relatórios
- Relatório HTML integrado
- Relatório Allure
- Relatório em PDF (quando configurado)
- Logs no console

## 🔄 Manutenção
Para adicionar novos cenários ou modificar existentes:
1. Atualize o arquivo `.feature` com novos cenários
2. Adicione novos métodos na classe `Actions` se necessário
3. Implemente novos steps no arquivo `Steps`
4. Execute os testes para validar as mudanças

## 📞 Suporte
Em caso de dúvidas ou problemas:
1. Verifique os logs no console
2. Consulte as evidências de teste geradas
3. Verifique a configuração do Playwright
4. Execute em modo debug se necessário
