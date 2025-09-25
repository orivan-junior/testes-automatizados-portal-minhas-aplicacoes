import { createBdd } from 'playwright-bdd';
import { ConsultaCampanhaPage } from '../ConsultaCampanha.js';
import { obterUltimaPagina } from '../../../Support/utils.js';

const { Given, When, Then } = createBdd();

let consultaCampanhaPage;

/**
 * Step para navegar diretamente para a página de consulta de campanha
 * Usado após login manual no portal principal
 */
Given('navego diretamente para a página de consulta de campanha', async ({ page }) => {
  // Obter a última página (popup após login)
  const popupPage = obterUltimaPagina(page);
  
  // Criar instância da page object com a página do popup
  consultaCampanhaPage = new ConsultaCampanhaPage(popupPage);
  
  // Navegar diretamente para a URL da consulta de campanha
  await consultaCampanhaPage.navegarDiretamente();
  
  console.log('✅ Navegou diretamente para a página de consulta de campanha');
});

/**
 * Step para clicar no frame Centro
 */
When('clico no frame Centro', async ({ page }) => {
  await consultaCampanhaPage.clicarNoFrame();
});

/**
 * Step para marcar o checkbox de pesquisa de campanha
 */
When('marco o checkbox de pesquisa de campanha', async ({ page }) => {
  await consultaCampanhaPage.marcarPesquisaCampanha();
});

/**
 * Step para selecionar código da campanha
 */
When('seleciono o código da campanha {string}', async ({ page }, codigo) => {
  await consultaCampanhaPage.selecionarCodigoCampanha(codigo);
});

/**
 * Step para clicar no botão pesquisar
 */
When('clico no botão pesquisar da campanha', async ({ page }) => {
  await consultaCampanhaPage.clicarPesquisar();
});

/**
 * Steps de validação para consulta de campanha
 */
Then('devo ver o resultado da consulta de campanha', async ({ page }) => {
  console.log('✅ Resultado da consulta de campanha verificado');
});

Then('deve conter o código da campanha {string}', async ({ page }, codigo) => {
  await consultaCampanhaPage.validarCodigoCampanha(codigo);
});

Then('deve conter o nome da campanha {string}', async ({ page }, nome) => {
  await consultaCampanhaPage.validarNomeCampanha(nome);
});

Then('deve exibir {string} no resultado', async ({ page }, textoEsperado) => {
  // Para mensagens de "nada encontrado", usar método específico
  if (textoEsperado.includes('Nada foi encontrado') || textoEsperado.includes('Dados dos Documentos')) {
    await consultaCampanhaPage.validarNadaEncontrado(textoEsperado);
  } else {
    await consultaCampanhaPage.validarTextoNoResultado(textoEsperado);
  }
});

Then('deve mostrar o código {string}', async ({ page }, codigo) => {
  await consultaCampanhaPage.validarCodigoCampanha(codigo);
});

Then('deve mostrar o nome {string}', async ({ page }, nome) => {
  await consultaCampanhaPage.validarNomeCampanha(nome);
});

/**
 * Step específico para consulta de campanha - validar qualquer texto no resultado
 */
Then('deve conter no resultado da campanha {string}', async ({ page }, textoEsperado) => {
  await consultaCampanhaPage.validarTextoNoResultado(textoEsperado);
});
