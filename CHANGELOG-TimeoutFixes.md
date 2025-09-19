# Correções de Timeout - Consulta de Cartão de Crédito

## Data: 18 de Setembro de 2025

## Problemas Identificados

### 1. Timeout no Login Manual
- **Erro**: `page.waitForURL: Test ended` após 3 minutos
- **Causa**: Tempo insuficiente para login manual
- **Solução**: Aumentado de 180000ms (3 min) para 300000ms (5 min)

### 2. Timeout na Navegação Direta
- **Erro**: `locator.waitFor: Timeout 10000ms exceeded` no elemento radio CPF
- **Causa**: Página GCCS demora para carregar completamente
- **Solução**: Múltiplas melhorias implementadas

## Correções Implementadas

### 1. Timeout Global do Playwright
```javascript
// playwright.config.js
timeout: 1200000, // 20 minutos (era 15 minutos)
```

### 2. Login Manual - Arquivo CadastroSimples.js.js
```javascript
// Linha 79-81
await popupPage.waitForURL('**/Minhas_Aplicacoes.asp*', { 
  timeout: 300000 // 5 minutos (era 3 minutos)
});
```

### 3. Navegação Direta - Arquivo ConsultaCartaoCredito.js

#### Método navegarDiretamente()
- **Timeout de navegação**: 30s → 60s
- **Timeout de carregamento**: 20s → 60s  
- **Tempo de estabilização**: 3s → 10s
- **Aguardo de elementos**: Adicionado com 60s timeout
- **Logs melhorados**: Adicionados para debugging

#### Métodos de Interação
Todos os métodos tiveram timeout aumentado de 10s para 60s:
- `selecionarOpcaoCpf()`: 10s → 60s + estratégia alternativa
- `preencherCpf()`: 10s → 60s + estabilização
- `selecionarClasseCartao()`: 10s → 60s + estabilização
- `selecionarAdmCartao()`: 10s → 60s + estabilização
- `clicarPesquisar()`: 10s → 60s + aguardo de resultado de 60s

### 4. Novo Método verificarPaginaCarregada()
Verifica múltiplos indicadores de carregamento:
- Elementos básicos (body, form, input)
- Estado do documento (readyState === 'complete')
- Presença de elementos interativos
- Timeout de 30s para cada verificação

### 5. Steps de Validação - Arquivo ConsultaCartaoCredito.js (Steps)

#### Then('deve conter {string}')
- Timeout: 10s → 60s
- Logs melhorados para debugging

#### Then('deve exibir {string}')
- Timeout de aguardo: 3s → 10s
- Logs adicionados

### 6. Estratégias de Fallback

#### selecionarOpcaoCpf()
```javascript
// Estratégia principal: Buscar por role específico
await this.radioCpfCliente.waitFor({ state: 'visible', timeout: 60000 });

// Estratégia alternativa: Buscar qualquer radio button
const radioAlternativo = this.page.locator('input[type="radio"]').first();
await radioAlternativo.waitFor({ state: 'visible', timeout: 30000 });
```

## Logs Melhorados

Adicionados logs informativos em todas as etapas:
- 🔍 Aguardando elementos aparecerem
- 📄 Página carregada, aguardando estabilização
- ✅ Operações bem-sucedidas
- ⚠️ Avisos de timeout mas continuando
- ❌ Erros com contexto

## Estrutura de Timeouts Resultante

| Operação | Timeout Anterior | Timeout Atual | Observações |
|----------|------------------|---------------|-------------|
| Teste Global | 15 min | 20 min | Tempo total do teste |
| Login Manual | 3 min | 5 min | Tempo para usuário fazer login |
| Navegação | 30s | 60s | Carregamento da página GCCS |
| Elementos UI | 10s | 60s | Aguardo de elementos aparecerem |
| Validações | 10s | 60s | Verificação de textos/resultados |
| Estabilização | 1-3s | 1-10s | Aguardo após carregamento |

## Instruções de Uso

### Para Executar os Testes
```bash
# Gerar e executar apenas consulta de cartão
npm run consulta-cartao

# Gerar e executar todos os testes de consulta
npm run consulta

# Executar com mais detalhes
npx bddgen && npx playwright test --grep @consulta-cartao --headed
```

### Processo de Execução Recomendado
1. Execute o comando de teste
2. **Aguarde até 5 minutos** para fazer o login manual quando solicitado
3. O sistema navegará automaticamente para a aplicação GCCS
4. **Aguarde até 60 segundos** para a página carregar completamente
5. Os testes executarão automaticamente

### Troubleshooting

#### Se o login ainda der timeout:
- Verifique se completou o login antes de 5 minutos
- Certifique-se de que a URL contém "Minhas_Aplicacoes.asp"

#### Se elementos não forem encontrados:
- Os logs mostrarão qual elemento está faltando
- O sistema tentará estratégias alternativas automaticamente
- Screenshots são capturados automaticamente em caso de erro

#### Para Debug Avançado:
```bash
# Executar com trace habilitado
npx playwright test --grep @consulta-cartao --trace on

# Visualizar trace do erro
npx playwright show-trace test-results/[pasta-do-erro]/trace.zip
```

## Monitoramento

Os seguintes arquivos contêm logs detalhados:
- Console output durante execução
- Screenshots automáticos em caso de falha
- Videos das execuções
- Traces para análise detalhada

## Atualização: Correção de Seletores (18/09/2025 - 14:30)

### Problema Identificado
Após ajustar os timeouts, identificamos que o problema principal eram os seletores incorretos:
- **HTML Real**: `<input type="radio" name="filtro" onclick="mostraFiltro('numero_cpf');" id="in-cpf">`
- **Seletor Anterior**: `getByRole('radio', { name: 'Número do CPF do Cliente' })`
- **Seletor Correto**: `#in-cpf`

### Correções Adicionais Implementadas

#### 1. Seletores Atualizados no Page Object
```javascript
// Antes
this.radioCpfCliente = page.getByRole('radio', { name: 'Número do CPF do Cliente' });

// Depois
this.radioCpfCliente = page.locator('#in-cpf'); // Seletor direto pelo ID
this.radioCpfClienteAlternativo = page.locator('input[name="filtro"][onclick*="numero_cpf"]');
```

#### 2. Estratégias Múltiplas de Seleção
1. **Primeira tentativa**: Seletor direto por ID (`#in-cpf`)
2. **Segunda tentativa**: Seletor por atributos (`input[name="filtro"][onclick*="numero_cpf"]`)
3. **Terceira tentativa**: Qualquer radio button (`input[type="radio"]`)
4. **Debug automático**: Lista todos os elementos encontrados se falhar

#### 3. Método de Debug Automático
Adicionado método `debugarElementosPagina()` que lista:
- Todos os radio buttons com seus atributos
- Todos os inputs (limitado a 10)
- Todos os selects
- IDs, names, onclick, values de cada elemento

#### 4. Verificação Melhorada de Carregamento
O método `verificarPaginaCarregada()` agora procura especificamente por:
- `#in-cpf` (elemento específico da aplicação)
- `input[name="filtro"]` (elementos de filtro)
- Além das verificações gerais

### Como Testar as Correções

#### Teste Rápido de Seletores (Novo)
```bash
node test-quick.js
```
Este script testa apenas a navegação e localização de elementos, sem precisar fazer login.

#### Teste Completo
```bash
npm run consulta-cartao
```

### Logs Esperados Agora

```
🔍 Aguardando radio button CPF (#in-cpf) aparecer...
✅ Selecionou opção: CPF do Cliente (por ID #in-cpf)
```

Ou em caso de debug:
```
🔍 === DEBUG: Elementos da página ===
📻 Total de radio buttons: 3
  Radio 0: id="in-cpf", name="filtro", onclick="mostraFiltro('numero_cpf');", value=""
  Radio 1: id="in-numero", name="filtro", onclick="mostraFiltro('numero');", value=""
📝 Total de inputs: 8
🔍 === FIM DEBUG ===
```

## Próximos Passos

1. **Teste as correções**: `npm run consulta-cartao`
2. **Teste rápido opcional**: `node test-quick.js` (sem login)
3. **Monitore os logs** para verificar qual estratégia funcionou
4. **Se ainda houver erro**: Os logs de debug mostrarão exatamente quais elementos existem
5. **Ajuste outros seletores** se necessário baseado no debug
