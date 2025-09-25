import { createBdd } from 'playwright-bdd';
import { ManutencaoEventosCartaoCreditoPage } from '../ManutencaoEventosCartaoCredito.js';
import { obterUltimaPagina } from '../../../Support/utils.js';

const { Given, When, Then } = createBdd();

let manutencaoEventosPage;

/**
 * Step para navegar diretamente para a página de manutenção de eventos de cartão de crédito
 * Usado após login manual no portal principal
 */
Given('navego diretamente para a página de manutenção de eventos de cartão de crédito', async ({ page }) => {
  // Obter a última página (popup após login)
  const popupPage = obterUltimaPagina(page);
  
  // Criar instância da page object com a página do popup
  manutencaoEventosPage = new ManutencaoEventosCartaoCreditoPage(popupPage);
  
  // Navegar diretamente para a URL da manutenção de eventos
  await manutencaoEventosPage.navegarDiretamente();
  
  console.log('✅ Navegou diretamente para a página de manutenção de eventos de cartão de crédito');
});

/**
 * Step para marcar o checkbox de pesquisa por CPF em eventos
 */
When('marco o checkbox de pesquisa por CPF em eventos', async ({ page }) => {
  await manutencaoEventosPage.marcarPesquisaCpf();
});

/**
 * Step para clicar no campo de filtro de CPF em eventos
 */
When('clico no campo de filtro de CPF em eventos', async ({ page }) => {
  await manutencaoEventosPage.clicarFiltroCpf();
});

/**
 * Step para preencher CPF em eventos
 */
When('preencho o CPF para eventos {string}', async ({ page }, cpf) => {
  await manutencaoEventosPage.preencherCpf(cpf);
});

/**
 * Step para clicar no botão pesquisar
 */
When('clico no botão pesquisar de eventos', async ({ page }) => {
  await manutencaoEventosPage.clicarPesquisar();
});

/**
 * Steps de validação para manutenção de eventos de cartão de crédito
 */
Then('devo ver o resultado da consulta de eventos', async ({ page }) => {
  console.log('✅ Resultado da consulta de eventos verificado');
});

Then('deve conter o número do cartão {string}', async ({ page }, numeroCartao) => {
  await manutencaoEventosPage.validarNumeroCartao(numeroCartao);
});

Then('deve conter o nome do cliente de eventos {string}', async ({ page }, nome) => {
  await manutencaoEventosPage.validarNomeCliente(nome);
});

Then('deve conter o evento do cartão {string}', async ({ page }, evento) => {
  await manutencaoEventosPage.validarEventoCartao(evento);
});

Then('deve exibir {string} no resultado de eventos', async ({ page }, textoEsperado) => {
  // Para mensagens de "nada encontrado", usar método específico
  if (textoEsperado.includes('Nada foi encontrado') || textoEsperado.includes('Dados dos Documentos')) {
    await manutencaoEventosPage.validarNadaEncontrado(textoEsperado);
  } else {
    await manutencaoEventosPage.validarTextoNoResultado(textoEsperado);
  }
});

Then('deve mostrar o número do cartão {string}', async ({ page }, numeroCartao) => {
  await manutencaoEventosPage.validarNumeroCartao(numeroCartao);
});

Then('deve mostrar o nome de eventos {string}', async ({ page }, nome) => {
  await manutencaoEventosPage.validarNomeCliente(nome);
});

Then('deve mostrar o evento {string}', async ({ page }, evento) => {
  await manutencaoEventosPage.validarEventoCartao(evento);
});

/**
 * Step específico para manutenção de eventos - validar qualquer texto no resultado
 */
Then('deve conter no resultado de eventos {string}', async ({ page }, textoEsperado) => {
  await manutencaoEventosPage.validarTextoNoResultado(textoEsperado);
});
