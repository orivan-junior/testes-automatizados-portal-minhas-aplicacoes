/**
 * Utilitários para automação com Playwright
 * APENAS funções que atendem aos CRITÉRIOS específicos:
 *
 * CRITÉRIO 1: REUTILIZAÇÃO MÚLTIPLA
 * - Função usada em 3+ arquivos diferentes
 * - Mesmo padrão repetido em múltiplos cenários
 *
 * CRITÉRIO 2: COMPLEXIDADE TÉCNICA
 * - Lógica complexa que justifica encapsulamento
 * - Tratamento de erros específico e reutilizável
 * - Interações com APIs ou sistemas externos
 *
 * CRITÉRIO 3: MANUTENÇÃO CENTRALIZADA
 * - Configurações que podem mudar globalmente
 * - Padrões de projeto consistentes
 * - Logs e monitoring padronizados
 *
 * NÃO CRIAR: Funções usadas apenas 1x ou cópia de funcionalidades nativas
 */

// Função para gerar dados únicos
export function gerarDadosUnicos(prefixo = 'teste') {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000);
  return `${prefixo}${timestamp}${random}`;
}

// Função para aguardar elemento estar pronto
export async function aguardarElementoPronto(page, selector, timeout = 15000) {
  try {
    await page.waitForSelector(selector, { state: 'visible', timeout });
    await page.waitForTimeout(1000); // Pequeno delay para estabilização
    return true;
  } catch (error) {
    console.warn(`⚠️ Elemento não encontrado: ${selector}`);
    return false;
  }
}

// Função para clicar com retry
export async function clicarComRetry(page, selector, maxTentativas = 3) {
  for (let tentativa = 1; tentativa <= maxTentativas; tentativa++) {
    try {
      await page.waitForSelector(selector, { state: 'visible', timeout: 10000 });
      await page.click(selector);
      return true;
    } catch (error) {
      console.warn(`⚠️ Tentativa ${tentativa} falhou para: ${selector}`);
      if (tentativa === maxTentativas) throw error;
      await page.waitForTimeout(2000);
    }
  }
}

// Função para preencher campo com foco
export async function preencherCampoComFoco(page, selector, valor) {
  try {
    await page.waitForSelector(selector, { state: 'visible', timeout: 10000 });
    await page.click(selector); // Foca no campo primeiro
    await page.fill(selector, valor);
    return true;
  } catch (error) {
    console.error(`❌ Erro ao preencher campo ${selector}:`, error.message);
    throw error;
  }
}

// Função para aguardar frame estar disponível
export async function aguardarFrame(page, frameName, timeout = 15000) {
  try {
    await page.locator(`frame[name="${frameName}"]`).waitFor({ 
      state: 'visible', 
      timeout 
    });
    return true;
  } catch (error) {
    console.error(`❌ Frame ${frameName} não encontrado:`, error.message);
    throw error;
  }
}

// Função para obter a última página (popup)
export function obterUltimaPagina(page) {
  const pages = page.context().pages();
  return pages[pages.length - 1];
}

// Função para aguardar carregamento da página
export async function aguardarCarregamentoPagina(page, timeout = 20000) {
  try {
    await page.waitForLoadState('domcontentloaded', { timeout });
    await page.waitForTimeout(2000); // Aguardar estabilização
    return true;
  } catch (error) {
    console.error('❌ Erro ao aguardar carregamento da página:', error.message);
    throw error;
  }
}

// Função para validar mensagem de sucesso
export async function validarMensagemSucesso(page, seletor, textoEsperado) {
  try {
    await page.locator(seletor).waitFor({ 
      state: 'visible', 
      timeout: 15000 
    });
    
    const mensagem = await page.locator(seletor).textContent();
    console.log('📝 Mensagem recebida:', mensagem);
    
    if (mensagem && mensagem.includes(textoEsperado)) {
      console.log('✅ Mensagem de sucesso validada!');
      return true;
    } else {
      throw new Error(`Mensagem esperada: "${textoEsperado}", Recebida: "${mensagem}"`);
    }
  } catch (error) {
    console.error('❌ Erro ao validar mensagem:', error.message);
    throw error;
  }
}

// Função para configurar handler de diálogos
export function configurarHandlerDialogos(page) {
  page.on('dialog', dialog => {
    console.log(`💬 Dialog detectado: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
}

// Função para aguardar login manual
export async function aguardarLoginManual(page, urlEsperada, timeout = 180000) {
  try {
    console.log('🔄 Aguardando login manual...');
    console.log('📝 Por favor, faça o login manualmente na página que abriu');
    console.log('⏳ Aguardando até que você complete o login...');
    
    await page.waitForURL(urlEsperada, { timeout });
    
    const currentUrl = page.url();
    console.log('✅ Login manual detectado! URL atual:', currentUrl);
    
    if (currentUrl.includes('about:blank')) {
      throw new Error('Página em branco após login - verifique se o login foi realizado corretamente');
    }
    
    await aguardarCarregamentoPagina(page);
    console.log('✅ Continuando com o teste automaticamente...');
    
  } catch (error) {
    console.error('❌ Erro ao aguardar login manual:', error.message);
    console.log('💡 Dica: Certifique-se de que o login foi realizado corretamente');
    throw error;
  }
}

// Função para executar ação com retry
export async function executarComRetry(acao, maxTentativas = 3, delay = 2000) {
  for (let tentativa = 1; tentativa <= maxTentativas; tentativa++) {
    try {
      return await acao();
    } catch (error) {
      console.warn(`⚠️ Tentativa ${tentativa} falhou:`, error.message);
      if (tentativa === maxTentativas) throw error;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}

// Função para validar se elemento existe
export async function elementoExiste(page, selector, timeout = 5000) {
  try {
    await page.waitForSelector(selector, { state: 'visible', timeout });
    return true;
  } catch {
    return false;
  }
}

// Função para aguardar elemento desaparecer
export async function aguardarElementoDesaparecer(page, selector, timeout = 10000) {
  try {
    await page.waitForSelector(selector, { state: 'hidden', timeout });
    return true;
  } catch (error) {
    console.warn(`⚠️ Elemento ${selector} não desapareceu no tempo esperado`);
    return false;
  }
}

// Função para fazer screenshot com timestamp
export async function screenshotComTimestamp(page, nome = 'screenshot') {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const nomeArquivo = `${nome}_${timestamp}.png`;
  await page.screenshot({ path: `test-results/${nomeArquivo}` });
  console.log(`📸 Screenshot salvo: ${nomeArquivo}`);
  return nomeArquivo;
}

// Função para validar URL
export function validarURL(url, padrao) {
  return url.includes(padrao);
}

// ============ EXEMPLOS DE FUNÇÕES QUE DEVEM SER CRIADAS ============

/*
EXEMPLO BASEADO NO SEU PROJETO:

1. FUNÇÃO PARA NAVEGAÇÃO ENTRE FRAMES (já existe - aguardarFrame)
   ✅ Usada em múltiplos cenários
   ✅ Complexidade técnica (frames aninhados)
   ✅ Padrão consistente no sistema DSV

2. FUNÇÃO PARA TRATAMENTO DE POPUPS (já existe - obterUltimaPagina)
   ✅ Necessária em todo fluxo de login
   ✅ Lógica complexa de detecção de popups
   ✅ Reutilizada em todos os cenários

3. FUNÇÃO PARA VALIDAÇÃO DE MENSAGENS (já existe - validarMensagemSucesso)
   ✅ Padrão consistente de validação
   ✅ Tratamento de erros específico
   ✅ Usada em múltiplas operações CRUD

OUTROS EXEMPLOS QUE DEVEM SER CRIADOS:

// 4. Função para navegação no menu DSV
export async function navegarMenuDSV(page, menu, submenu) {
  // Complexa navegação entre menus do DSV
  // Usada em todos os cenários que precisam navegar
}

// 5. Função para tratamento de tabelas de resultado
export async function buscarNaTabela(page, valor, coluna = 1) {
  // Lógica específica para buscar em tabelas do sistema
  // Padrão comum em cenários de pesquisa
}

// 6. Função para validação de campos obrigatórios
export async function validarCampoObrigatorio(page, seletor, nomeCampo) {
  // Validação específica de campos obrigatórios
  // Padrão usado em múltiplos formulários
}

// NÃO CRIAR:
// - Funções usadas apenas 1x
// - Wrappers simples de métodos nativos do Playwright
// - Lógica específica de um único cenário
// - Funções que podem ser inline sem perder clareza
*/

// Função para formatar data
export function formatarData(data = new Date()) {
  return data.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
}

// Função para log estruturado
export function logEstruturado(tipo, mensagem, dados = null) {
  const timestamp = formatarData();
  const log = {
    timestamp,
    tipo,
    mensagem,
    dados
  };

  console.log(`[${timestamp}] ${tipo.toUpperCase()}: ${mensagem}`);
  if (dados) {
    console.log('📊 Dados:', JSON.stringify(dados, null, 2));
  }

  return log;
}

// ============ CHECKLIST ANTES DE CRIAR UMA FUNÇÃO ============

/*
ANTES DE CRIAR uma nova função no utils.js, RESPONDA:

1. ✅ SERÁ USADA EM 3+ ARQUIVOS DIFERENTES?
   - Se SIM: Pode ser candidato a utils
   - Se NÃO: Mantenha no arquivo específico

2. ✅ TEM LÓGICA COMPLEXA QUE JUSTIFICA ENCAPSULAMENTO?
   - Retry automático com backoff
   - Tratamento específico de erros
   - Interações complexas com DOM
   - Validações customizadas

3. ✅ É UM PADRÃO CONSISTENTE NO SISTEMA?
   - Mesmo fluxo repetido em múltiplos cenários
   - Configurações compartilhadas
   - Regras de negócio comuns

4. ✅ VAI FACILITAR MANUTENÇÃO FUTURA?
   - Mudanças em um lugar afetam múltiplos testes
   - Centralização de configurações
   - Padrões documentados

EXEMPLO DO SEU PROJETO:

❌ NÃO CRIAR - Função usada apenas 1x:
// function clicarBotaoSalvar(page) {
//   await page.click('#salvar');
// }

❌ NÃO CRIAR - Wrapper simples sem valor agregado:
// function esperarElementoVisivel(page, selector) {
//   return page.waitForSelector(selector, { state: 'visible' });
// }

✅ CRIAR - Complexidade técnica + reutilização:
// function clicarComRetry(page, selector, maxTentativas = 3) {
   // Lógica complexa de retry com backoff
   // Tratamento específico de erros
   // Usada em múltiplos cenários
// }
*/
