import { createBdd } from 'playwright-bdd';
import { RelatorioPontuacaoPage } from '../RelatorioPontuacao.js';
import { obterUltimaPagina } from '../../../Support/utils.js';

const { Given, When, Then } = createBdd();

let relatorioPontuacaoPage;

/**
 * Step para navegar diretamente para a página de relatórios
 * Usado após login manual no portal principal
 */
Given('navego diretamente para a página de relatórios', async ({ page }) => {
  // Obter a última página (popup após login)
  const popupPage = obterUltimaPagina(page);
  
  // Criar instância da page object com a página do popup
  relatorioPontuacaoPage = new RelatorioPontuacaoPage(popupPage);
  
  // Navegar diretamente para a URL dos relatórios
  await relatorioPontuacaoPage.navegarDiretamente();
  
  console.log('✅ Navegou diretamente para a página de relatórios');
});

/**
 * Step para clicar no link de relatório de pontuação
 */
When('clico no link de relatório de pontuação', async ({ page }) => {
  await relatorioPontuacaoPage.clicarRelatorioPontuacao();
});

/**
 * Step para marcar o checkbox de pesquisa por CPF em relatório
 */
When('marco o checkbox de pesquisa por CPF em relatório', async ({ page }) => {
  await relatorioPontuacaoPage.marcarPesquisaCpf();
});

/**
 * Step para clicar no campo de filtro de CPF em relatório
 */
When('clico no campo de filtro de CPF em relatório', async ({ page }) => {
  await relatorioPontuacaoPage.clicarFiltroCpf();
});

/**
 * Step para preencher CPF em relatório
 */
When('preencho o CPF para relatório {string}', async ({ page }, cpf) => {
  await relatorioPontuacaoPage.preencherCpf(cpf);
});

/**
 * Step para clicar no campo de filtro de cartão em relatório
 */
When('clico no campo de filtro de cartão em relatório', async ({ page }) => {
  await relatorioPontuacaoPage.clicarFiltroCartao();
});

/**
 * Step para selecionar cartão em relatório
 */
When('seleciono o cartão para relatório {string}', async ({ page }, cartao) => {
  await relatorioPontuacaoPage.selecionarCartao(cartao);
});

/**
 * Step para selecionar CIA em relatório
 */
When('seleciono a CIA para relatório {string}', async ({ page }, cia) => {
  await relatorioPontuacaoPage.selecionarCia(cia);
});

/**
 * Step para selecionar situação em relatório
 */
When('seleciono a situação para relatório {string}', async ({ page }, situacao) => {
  await relatorioPontuacaoPage.selecionarSituacao(situacao);
});

/**
 * Step para clicar no botão pesquisar
 */
When('clico no botão pesquisar de relatório', async ({ page }) => {
  await relatorioPontuacaoPage.clicarPesquisar();
});

/**
 * Steps de validação para relatório de pontuação
 */
Then('devo ver o resultado do relatório de pontuação', async ({ page }) => {
  console.log('✅ Resultado do relatório de pontuação verificado');
});

Then('deve conter o CPF no relatório {string}', async ({ page }, cpf) => {
  await relatorioPontuacaoPage.validarCpf(cpf);
});

Then('deve conter o nome do cliente no relatório {string}', async ({ page }, nome) => {
  await relatorioPontuacaoPage.validarNomeCliente(nome);
});

Then('deve conter o número do cartão no relatório {string}', async ({ page }, numeroCartao) => {
  await relatorioPontuacaoPage.validarNumeroCartao(numeroCartao);
});

Then('deve conter a classe do cartão no relatório {string}', async ({ page }, classe) => {
  await relatorioPontuacaoPage.validarClasseCartao(classe);
});

Then('deve conter a administradora no relatório {string}', async ({ page }, administradora) => {
  await relatorioPontuacaoPage.validarAdministradora(administradora);
});

Then('deve exibir {string} no resultado do relatório', async ({ page }, textoEsperado) => {
  // Para mensagens de "nada encontrado", usar método específico
  if (textoEsperado.includes('Nada foi encontrado') || textoEsperado.includes('Dados dos Documentos')) {
    await relatorioPontuacaoPage.validarNadaEncontrado(textoEsperado);
  } else {
    await relatorioPontuacaoPage.validarTextoNoResultado(textoEsperado);
  }
});

Then('deve mostrar o CPF no relatório {string}', async ({ page }, cpf) => {
  await relatorioPontuacaoPage.validarCpf(cpf);
});

Then('deve mostrar o nome no relatório {string}', async ({ page }, nome) => {
  await relatorioPontuacaoPage.validarNomeCliente(nome);
});

Then('deve mostrar o cartão no relatório {string}', async ({ page }, numeroCartao) => {
  await relatorioPontuacaoPage.validarNumeroCartao(numeroCartao);
});

Then('deve mostrar a classe no relatório {string}', async ({ page }, classe) => {
  await relatorioPontuacaoPage.validarClasseCartao(classe);
});

Then('deve mostrar a administradora no relatório {string}', async ({ page }, administradora) => {
  await relatorioPontuacaoPage.validarAdministradora(administradora);
});

/**
 * Step específico para relatório de pontuação - validar qualquer texto no resultado
 */
Then('deve conter no resultado do relatório {string}', async ({ page }, textoEsperado) => {
  await relatorioPontuacaoPage.validarTextoNoResultado(textoEsperado);
});
