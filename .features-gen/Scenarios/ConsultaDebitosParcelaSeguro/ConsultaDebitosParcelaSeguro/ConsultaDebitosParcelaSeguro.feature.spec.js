// Generated from: Scenarios\ConsultaDebitosParcelaSeguro\ConsultaDebitosParcelaSeguro\ConsultaDebitosParcelaSeguro.feature
import { test } from "playwright-bdd";

test.describe('Consulta de Débitos de Parcela Seguro Cartão GCCS', () => {

  test('Consulta bem-sucedida de débitos - Código 1', { tag: ['@smoke', '@consulta', '@gccs', '@consulta-débitos'] }, async ({ Given, When, Then, And, page }) => { 
    await Given('que estou na página inicial do login', null, { page }); 
    await And('clico em Minhas Aplicações', null, { page }); 
    await And('verifico se o popup foi aberto corretamente', null, { page }); 
    await And('preencho as credenciais de login', null, { page }); 
    await And('navego diretamente para a página de consulta de débitos de parcela seguro', null, { page }); 
    await When('marco o checkbox de pesquisa por código do cartão', null, { page }); 
    await And('clico no campo de filtro de código do cartão', null, { page }); 
    await And('preencho o código do cartão "1"', null, { page }); 
    await And('clico no botão pesquisar de débitos', null, { page }); 
    await Then('devo ver o resultado da consulta de débitos', null, { page }); 
    await And('deve conter o CPF "144.932.537-89"', null, { page }); 
    await And('deve conter o nome do cliente "ROSE AP O CONCEICAO"', null, { page }); 
    await And('deve conter a administradora "40003 - PRJR"', null, { page }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('Scenarios\\ConsultaDebitosParcelaSeguro\\ConsultaDebitosParcelaSeguro\\ConsultaDebitosParcelaSeguro.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":9,"tags":["@smoke","@consulta","@gccs","@consulta-débitos"],"steps":[{"pwStepLine":7,"gherkinStepLine":10,"keywordType":"Context","textWithKeyword":"Dado que estou na página inicial do login","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":11,"keywordType":"Context","textWithKeyword":"E clico em Minhas Aplicações","stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":12,"keywordType":"Context","textWithKeyword":"E verifico se o popup foi aberto corretamente","stepMatchArguments":[]},{"pwStepLine":10,"gherkinStepLine":13,"keywordType":"Context","textWithKeyword":"E preencho as credenciais de login","stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":14,"keywordType":"Context","textWithKeyword":"E navego diretamente para a página de consulta de débitos de parcela seguro","stepMatchArguments":[]},{"pwStepLine":12,"gherkinStepLine":15,"keywordType":"Action","textWithKeyword":"Quando marco o checkbox de pesquisa por código do cartão","stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":16,"keywordType":"Action","textWithKeyword":"E clico no campo de filtro de código do cartão","stepMatchArguments":[]},{"pwStepLine":14,"gherkinStepLine":17,"keywordType":"Action","textWithKeyword":"E preencho o código do cartão \"1\"","stepMatchArguments":[{"group":{"start":28,"value":"\"1\"","children":[{"start":29,"value":"1","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":15,"gherkinStepLine":18,"keywordType":"Action","textWithKeyword":"E clico no botão pesquisar de débitos","stepMatchArguments":[]},{"pwStepLine":16,"gherkinStepLine":19,"keywordType":"Outcome","textWithKeyword":"Então devo ver o resultado da consulta de débitos","stepMatchArguments":[]},{"pwStepLine":17,"gherkinStepLine":20,"keywordType":"Outcome","textWithKeyword":"E deve conter o CPF \"144.932.537-89\"","stepMatchArguments":[{"group":{"start":18,"value":"\"144.932.537-89\"","children":[{"start":19,"value":"144.932.537-89","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":18,"gherkinStepLine":21,"keywordType":"Outcome","textWithKeyword":"E deve conter o nome do cliente \"ROSE AP O CONCEICAO\"","stepMatchArguments":[{"group":{"start":30,"value":"\"ROSE AP O CONCEICAO\"","children":[{"start":31,"value":"ROSE AP O CONCEICAO","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":19,"gherkinStepLine":22,"keywordType":"Outcome","textWithKeyword":"E deve conter a administradora \"40003 - PRJR\"","stepMatchArguments":[{"group":{"start":29,"value":"\"40003 - PRJR\"","children":[{"start":30,"value":"40003 - PRJR","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
]; // bdd-data-end