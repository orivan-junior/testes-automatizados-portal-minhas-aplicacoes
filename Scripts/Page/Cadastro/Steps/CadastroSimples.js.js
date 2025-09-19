import { test, expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';

const { Given, When, Then } = createBdd();

// ❌ ANTES: Funções duplicadas criadas desnecessariamente
// As funções abaixo JÁ EXISTEM no utils.js e não deveriam ser recriadas:
//
// - gerarNomeAleatorio() → usar gerarDadosUnicos() do utils.js
// - aguardarElementoPronto() → usar aguardarElementoPronto() do utils.js
// - clicarComRetry() → usar clicarComRetry() do utils.js

// ✅ DEPOIS: Importar e usar as funções do utils.js
import {
  gerarDadosUnicos,
  aguardarElementoPronto,
  clicarComRetry,
  aguardarFrame,
  obterUltimaPagina,
  aguardarCarregamentoPagina,
  validarMensagemSucesso,
  configurarHandlerDialogos,
  aguardarLoginManual
} from '../../../Support/utils.js';

// Variável global para armazenar o nome gerado (usada em múltiplos steps)
let nomeGerado = '';



Given('que estou na página inicial do login', async ({ page }) => {
  try {
    await page.goto('https://www.dsv.bradseg.com.br/', { 
      waitUntil: 'domcontentloaded',
      timeout: 30000 
    });
    console.log('✅ Navegou para a página inicial do DSV');
  } catch (error) {
    console.error('❌ Erro ao navegar para DSV:', error.message);
    throw error;
  }
});

Given('clico em Minhas Aplicações', async ({ page }) => {
  try {
    const page1Promise = page.waitForEvent('popup', { timeout: 15000 });
    await page.locator('frame[name="principal"]').contentFrame().getByRole('cell', { name: 'Minhas Aplicações' }).click();
    const page1 = await page1Promise;
    console.log('✅ Clicou em Minhas Aplicações');
  } catch (error) {
    console.error('❌ Erro ao clicar em Minhas Aplicações:', error.message);
    throw error;
  }
});

Given('verifico se o popup foi aberto corretamente', async ({ page }) => {
  const pages = page.context().pages();
  const popupPage = pages[pages.length - 1];
  
  try {
    await popupPage.waitForLoadState('domcontentloaded', { timeout: 15000 });
    console.log('✅ Popup aberto e carregado corretamente');
  } catch (error) {
    console.error('❌ Erro ao aguardar popup:', error.message);
    throw error;
  }
});

Given('preencho as credenciais de login', async ({ page }) => {
  try {
    console.log('🔄 Aguardando login manual...');
    console.log('📝 Por favor, faça o login manualmente na página que abriu');
    console.log('⏳ Aguardando até que você complete o login...');
    
    const pages = page.context().pages();
    const popupPage = pages[pages.length - 1];
    
    // Aguardar até que a URL contenha "Minhas_Aplicacoes.asp" (indicando login bem-sucedido)
    await popupPage.waitForURL('**/Minhas_Aplicacoes.asp*', { 
      timeout: 300000 // 5 minutos para você fazer o login
    });
    
    const currentUrl = popupPage.url();
    console.log('✅ Login manual detectado! URL atual:', currentUrl);
    
    if (currentUrl.includes('about:blank')) {
      throw new Error('Página em branco após login - verifique se o login foi realizado corretamente');
    }
    
    // Aguardar o carregamento completo da página
    await popupPage.waitForLoadState('domcontentloaded');
    await popupPage.waitForTimeout(2000); // Aguardar estabilização
    console.log('✅ Continuando com o teste automaticamente...');
    
  } catch (error) {
    console.error('❌ Erro ao aguardar login manual:', error.message);
    console.log('💡 Dica: Certifique-se de que o login foi realizado corretamente');
    throw error;
  }
});

Given('clico no menu {string}', async ({ page }, menu) => {
  try {
    const pages = page.context().pages();
    const page1 = pages[pages.length - 1];
    
    // Aguardar frame estar disponível
    await page1.locator('frame[name="Centro"]').waitFor({ state: 'visible', timeout: 15000 });
    
    await page1.locator('frame[name="Centro"]').contentFrame().getByRole('link', { name: menu, exact: true }).click();
    console.log('✅ Clicou no menu', menu);
  } catch (error) {
    console.error('❌ Erro ao clicar no menu', menu, ':', error.message);
    throw error;
  }
});

Given('navego para a página de cadastro de práticas esportivas {string}', async ({ page }, url) => {
  const pages = page.context().pages();
  const page1 = pages[pages.length - 1];
  
  console.log(`🌐 Navegando diretamente para: ${url}`);
  await page1.goto(url);
  
  // Aguardar carregamento da página
  await page1.waitForLoadState('domcontentloaded', { timeout: 20000 });
  await page1.waitForTimeout(3000);
  
  console.log('✅ Navegou para a página de cadastro de práticas esportivas');
});

Given('clico no submenu {string}', async ({ page }, submenu) => {
  try {
    const pages = page.context().pages();
    const page1 = pages[pages.length - 1];
    
    // Aguardar o frame estar disponível
    await page1.locator('frame[name="Centro"]').waitFor({ state: 'visible', timeout: 15000 });
    
    // Aguardar a página estar completamente carregada antes de clicar
    await page1.waitForLoadState('domcontentloaded', { timeout: 20000 });
    await page1.waitForTimeout(2000);
    
    // Clicar em Cadastros (que abre um popup)
    const page2Promise = page1.waitForEvent('popup', { timeout: 15000 });
    await page1.locator('frame[name="Centro"]').contentFrame().getByRole('link', { name: submenu, exact: true }).click();
    const page2 = await page2Promise;
    
    // Aguardar o popup carregar completamente
    await page2.waitForLoadState('domcontentloaded', { timeout: 20000 });
    await page2.waitForTimeout(3000);
    
    console.log('✅ Clicou no submenu', submenu);
  } catch (error) {
    console.error('❌ Erro ao clicar no submenu', submenu, ':', error.message);
    throw error;
  }
});

When('clico em {string} no formulário de cadastro', async ({ page }, formulario) => {
  try {
    const pages = page.context().pages();
    const page2 = pages[pages.length - 1];
    
    // Aguardar o frame estar disponível
    await page2.locator('frame[name="Centro"]').waitFor({ state: 'visible', timeout: 20000 });
    
    // Aguardar carregamento completo da página
    await page2.waitForLoadState('domcontentloaded', { timeout: 20000 });
    await page2.waitForTimeout(3000);
    
    // Aguardar um tempo adicional para garantir carregamento completo
    await page2.waitForTimeout(3000);
    
    // Clicar em Práticas Esportivas
    await page2.locator('frame[name="Centro"]').contentFrame().getByRole('link', { name: formulario, exact: true }).click();
    
    // Aguardar a nova página carregar completamente após o clique
    await page2.waitForLoadState('domcontentloaded', { timeout: 20000 });
    await page2.waitForTimeout(3000);
    
    console.log('✅ Clicou em', formulario, 'no formulário de cadastro');
  } catch (error) {
    console.error('❌ Erro ao clicar em', formulario, 'no formulário de cadastro:', error.message);
    throw error;
  }
});

When('foco no campo nome', async ({ page }) => {
  try {
    const pages = page.context().pages();
    const page2 = pages[pages.length - 1];
    
    // Aguardar a página estar completamente carregada
    await page2.waitForLoadState('domcontentloaded', { timeout: 15000 });
    await page2.waitForTimeout(3000);
    await page2.waitForTimeout(2000);
    
    // Aguardar o frame estar disponível
    await page2.locator('frame[name="Centro"]').waitFor({ state: 'visible', timeout: 15000 });
    
    // Aguardar o campo estar visível e clicável
    const campoNome = page2.locator('frame[name="Centro"]').contentFrame().locator('#nome');
    await campoNome.waitFor({ state: 'visible', timeout: 15000 });
    
    // Clicar no campo (seguindo sua preferência de focar antes de escrever)
    await campoNome.click();
    console.log('✅ Focou no campo nome');
  } catch (error) {
    console.error('❌ Erro ao focar no campo nome:', error.message);
    throw error;
  }
});

When('preencho o campo nome com {string}', async ({ page }, nome) => {
  try {
    const pages = page.context().pages();
    const page2 = pages[pages.length - 1];
    
    // Se o nome for [NOMEGERADO], gerar um nome aleatório
    if (nome === '[NOMEGERADO]') {
      nomeGerado = gerarDadosUnicos('pratica');
    } else {
      nomeGerado = nome;
    }
    
    // Aguardar o frame estar disponível
    await page2.locator('frame[name="Centro"]').waitFor({ state: 'visible', timeout: 10000 });
    
    // Aguardar o campo estar visível e interativo
    const campoNome = page2.locator('frame[name="Centro"]').contentFrame().locator('#nome');
    await campoNome.waitFor({ state: 'visible', timeout: 10000 });
    
    // Limpar o campo antes de preencher
    await campoNome.clear();
    
    // Preencher o campo
    await campoNome.fill(nomeGerado);
    console.log(`✅ Preencheu o campo nome com: ${nomeGerado}`);
  } catch (error) {
    console.error('❌ Erro ao preencher campo nome:', error.message);
    throw error;
  }
});

When('clico no botão Incluir', async ({ page }) => {
  try {
    const pages = page.context().pages();
    const page2 = pages[pages.length - 1];
    
    // Aguardar o frame estar disponível
    await page2.locator('frame[name="Centro"]').waitFor({ state: 'visible', timeout: 10000 });
    
    // Aguardar o botão estar visível e clicável
    const botaoIncluir = page2.locator('frame[name="Centro"]').contentFrame().getByLabel('Incluir');
    await botaoIncluir.waitFor({ state: 'visible', timeout: 10000 });
    
    // Clicar no botão
    await botaoIncluir.click();
    console.log('✅ Clicou no botão Incluir');
  } catch (error) {
    console.error('❌ Erro ao clicar no botão Incluir:', error.message);
    throw error;
  }
});

Then('verifico se a inclusão foi realizada com sucesso', async ({ page }) => {
  try {
    const pages = page.context().pages();
    const page2 = pages[pages.length - 1];
    
    // Aguardar a mensagem de sucesso aparecer
    await page2.locator('frame[name="Centro"]').contentFrame().locator('#msgSucessoId').waitFor({ 
      state: 'visible', 
      timeout: 15000 
    });
    
    // Verificar se contém o texto esperado
    const mensagem = await page2.locator('frame[name="Centro"]').contentFrame().locator('#msgSucessoId').textContent();
    console.log('📝 Mensagem de sucesso:', mensagem);
    
    if (mensagem && mensagem.includes('Inclusão realizada com sucesso')) {
      console.log('✅ Inclusão realizada com sucesso!');
    } else {
      throw new Error('Mensagem de sucesso não encontrada ou diferente do esperado');
    }
    
  } catch (error) {
    console.error('❌ Erro ao verificar sucesso da inclusão:', error.message);
    throw error;
  }
});

Then('clico no botão Pesquisar', async ({ page }) => {
  try {
    const pages = page.context().pages();
    const page2 = pages[pages.length - 1];
    
    // Usar o seletor correto baseado no HTML real
    const botaoPesquisar = page2.locator('frame[name="Centro"]').contentFrame().locator('button#filtrar[value="Pesquisar"]');
    
    // Aguardar o botão estar visível
    await botaoPesquisar.waitFor({ state: 'visible', timeout: 10000 });
    
    // Aguardar um delay antes de clicar (como solicitado)
    await page2.waitForTimeout(2000);
    
    // Clicar no botão
    await botaoPesquisar.click();
    console.log('✅ Clicou no botão Pesquisar');
    
  } catch (error) {
    console.error('❌ Erro ao clicar no botão Pesquisar:', error.message);
    
    // Fallback: tentar com seletor mais genérico
    try {
      const botaoFallback = page2.locator('frame[name="Centro"]').contentFrame().locator('button:has-text("Pesquisar")');
      await botaoFallback.waitFor({ state: 'visible', timeout: 5000 });
      await page2.waitForTimeout(2000);
      await botaoFallback.click();
      console.log('✅ Clicou no botão Pesquisar (fallback)');
    } catch (fallbackError) {
      console.error('❌ Erro no fallback também:', fallbackError.message);
      throw error;
    }
  }
});

Then('preencho o campo nome para pesquisa com {string}', async ({ page }, nome) => {
  try {
    const pages = page.context().pages();
    const page2 = pages[pages.length - 1];
    
    // Se o nome for [NOMEGERADO], usar o nome gerado anteriormente
    const nomeParaPesquisa = nome === '[NOMEGERADO]' ? nomeGerado : nome;
    
    // Aguardar campo estar disponível
    const campoPesquisa = page2.locator('frame[name="Centro"]').contentFrame().locator('#nome');
    await campoPesquisa.waitFor({ state: 'visible', timeout: 10000 });
    
    // Clicar no campo primeiro (seguindo sua preferência)
    await campoPesquisa.click();
    await campoPesquisa.fill(nomeParaPesquisa);
    console.log(`✅ Preencheu o campo nome para pesquisa com: ${nomeParaPesquisa}`);
  } catch (error) {
    console.error('❌ Erro ao preencher campo de pesquisa:', error.message);
    throw error;
  }
});

Then('clico no resultado da pesquisa {string}', async ({ page }, nome) => {
  try {
    const pages = page.context().pages();
    const page2 = pages[pages.length - 1];
    
    // Se o nome for [NOMEGERADO], usar o nome gerado anteriormente
    const nomeParaClicar = nome === '[NOMEGERADO]' ? nomeGerado : nome;
    
    // Aguardar o resultado aparecer na tabela
    const resultado = page2.locator('frame[name="Centro"]').contentFrame().getByText(nomeParaClicar.toUpperCase());
    await resultado.waitFor({ state: 'visible', timeout: 10000 });
    
    await resultado.click();
    console.log(`✅ Clicou no resultado da pesquisa: ${nomeParaClicar.toUpperCase()}`);
  } catch (error) {
    console.error('❌ Erro ao clicar no resultado da pesquisa:', error.message);
    throw error;
  }
});

Then('clico no botão Pesquisar novamente', async ({ page }) => {
  try {
    const pages = page.context().pages();
    const page2 = pages[pages.length - 1];
    
    // Usar o seletor correto baseado no HTML real
    const botaoPesquisar = page2.locator('frame[name="Centro"]').contentFrame().locator('button#filtrar[value="Pesquisar"]');
    
    // Aguardar o botão estar visível
    await botaoPesquisar.waitFor({ state: 'visible', timeout: 10000 });
    
    // Aguardar um delay antes de clicar (como solicitado)
    await page2.waitForTimeout(2000);
    
    // Clicar no botão
    await botaoPesquisar.click();
    console.log('✅ Clicou no botão Pesquisar novamente');
    
  } catch (error) {
    console.error('❌ Erro ao clicar no botão Pesquisar novamente:', error.message);
    
    // Fallback: tentar com seletor mais genérico
    try {
      const botaoFallback = page2.locator('frame[name="Centro"]').contentFrame().locator('button:has-text("Pesquisar")');
      await botaoFallback.waitFor({ state: 'visible', timeout: 5000 });
      await page2.waitForTimeout(2000);
      await botaoFallback.click();
      console.log('✅ Clicou no botão Pesquisar novamente (fallback)');
    } catch (fallbackError) {
      console.error('❌ Erro no fallback também:', fallbackError.message);
      throw error;
    }
  }
});

Then('marco o checkbox de seleção', async ({ page }) => {
  try {
    const pages = page.context().pages();
    const page2 = pages[pages.length - 1];
    
    // Configurar handler para diálogos (como confirmação de exclusão)
    page2.once('dialog', dialog => {
      console.log(`💬 Dialog message: ${dialog.message()}`);
      dialog.dismiss().catch(() => {});
    });
    
    // Aguardar checkbox estar disponível
    const checkbox = page2.locator('frame[name="Centro"]').contentFrame().locator('input[name="selecionado"]');
    await checkbox.waitFor({ state: 'visible', timeout: 10000 });
    
    // Clicar no checkbox primeiro (seguindo sua preferência)
    await checkbox.click();
    console.log('✅ Checkbox de seleção marcado');
  } catch (error) {
    console.error('❌ Erro ao marcar checkbox:', error.message);
    throw error;
  }
});


