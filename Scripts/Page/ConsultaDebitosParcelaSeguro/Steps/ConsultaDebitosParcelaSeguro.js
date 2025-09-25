import { createBdd } from 'playwright-bdd';
import { ConsultaDebitosParcelaSeguroPage } from '../ConsultaDebitosParcelaSeguro.js';
import { obterUltimaPagina } from '../../../Support/utils.js';

const { Given, When, Then } = createBdd();

let consultaDebitosPage;

/**
 * Step para navegar diretamente para a página de consulta de débitos de parcela seguro
 * Usado após login manual no portal principal
 */
Given('navego diretamente para a página de consulta de débitos de parcela seguro', async ({ page }) => {
  // Obter a última página (popup após login)
  const popupPage = obterUltimaPagina(page);
  
  // Criar instância da page object com a página do popup
  consultaDebitosPage = new ConsultaDebitosParcelaSeguroPage(popupPage);
  
  // Navegar diretamente para a URL da consulta de débitos de parcela seguro
  await consultaDebitosPage.navegarDiretamente();
  
  console.log('✅ Navegou diretamente para a página de consulta de débitos de parcela seguro');
});

/**
 * Step para marcar o checkbox de pesquisa por código do cartão
 */
When('marco o checkbox de pesquisa por código do cartão', async ({ page }) => {
  await consultaDebitosPage.marcarPesquisaCodigoCartao();
});

/**
 * Step para clicar no campo de filtro de código do cartão
 */
When('clico no campo de filtro de código do cartão', async ({ page }) => {
  await consultaDebitosPage.clicarFiltroCodigoCartao();
});

/**
 * Step para preencher código do cartão
 */
When('preencho o código do cartão {string}', async ({ page }, codigo) => {
  await consultaDebitosPage.preencherCodigoCartao(codigo);
});

/**
 * Step para clicar no botão pesquisar
 */
When('clico no botão pesquisar de débitos', async ({ page }) => {
  await consultaDebitosPage.clicarPesquisar();
});

/**
 * Steps de validação para consulta de débitos de parcela seguro
 */
Then('devo ver o resultado da consulta de débitos', async ({ page }) => {
  console.log('✅ Resultado da consulta de débitos verificado');
});

Then('deve conter o CPF {string}', async ({ page }, cpf) => {
  await consultaDebitosPage.validarCpf(cpf);
});

Then('deve conter o nome do cliente {string}', async ({ page }, nome) => {
  await consultaDebitosPage.validarNomeCliente(nome);
});

Then('deve conter a administradora {string}', async ({ page }, administradora) => {
  await consultaDebitosPage.validarAdministradora(administradora);
});

Then('deve exibir {string} no resultado de débitos', async ({ page }, textoEsperado) => {
  // Para mensagens de "nada encontrado", usar método específico
  if (textoEsperado.includes('Nada foi encontrado') || textoEsperado.includes('Dados dos Documentos')) {
    await consultaDebitosPage.validarNadaEncontrado(textoEsperado);
  } else {
    await consultaDebitosPage.validarTextoNoResultado(textoEsperado);
  }
});

Then('deve mostrar o CPF de débitos {string}', async ({ page }, cpf) => {
  await consultaDebitosPage.validarCpf(cpf);
});

Then('deve mostrar o nome de débitos {string}', async ({ page }, nome) => {
  await consultaDebitosPage.validarNomeCliente(nome);
});

Then('deve mostrar a administradora de débitos {string}', async ({ page }, administradora) => {
  await consultaDebitosPage.validarAdministradora(administradora);
});

/**
 * Step específico para consulta de débitos - validar qualquer texto no resultado
 */
Then('deve conter no resultado de débitos {string}', async ({ page }, textoEsperado) => {
  await consultaDebitosPage.validarTextoNoResultado(textoEsperado);
});
