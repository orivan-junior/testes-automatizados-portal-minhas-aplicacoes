// Generated from: Scenarios\ManutencaoEventosCartaoCredito\ManutencaoEventosCartaoCredito\ManutencaoEventosCartaoCredito.feature
import { test } from "playwright-bdd";

test.describe('Manutenção de Eventos de Cartão de Crédito GCCS', () => {

  test('Consulta bem-sucedida de eventos - CPF válido', { tag: ['@smoke', '@consulta', '@gccs', '@manutenção-eventos'] }, async ({ Given, When, Then, And, page }) => { 
    await Given('que estou na página inicial do login', null, { page }); 
    await And('clico em Minhas Aplicações', null, { page }); 
    await And('verifico se o popup foi aberto corretamente', null, { page }); 
    await And('preencho as credenciais de login', null, { page }); 
    await And('navego diretamente para a página de manutenção de eventos de cartão de crédito', null, { page }); 
    await When('marco o checkbox de pesquisa por CPF em eventos', null, { page }); 
    await And('clico no campo de filtro de CPF em eventos', null, { page }); 
    await And('preencho o CPF para eventos "144.932.537-89"', null, { page }); 
    await And('clico no botão pesquisar de eventos', null, { page }); 
    await Then('devo ver o resultado da consulta de eventos', null, { page }); 
    await And('deve conter o número do cartão "7899723"', null, { page }); 
    await And('deve conter o nome do cliente de eventos "ROSE AP O CONCEICAO"', null, { page }); 
    await And('deve conter o evento do cartão "8 - CARTAO CANCELADO POR OUTROS MOTIVOS"', null, { page }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('Scenarios\\ManutencaoEventosCartaoCredito\\ManutencaoEventosCartaoCredito\\ManutencaoEventosCartaoCredito.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":9,"tags":["@smoke","@consulta","@gccs","@manutenção-eventos"],"steps":[{"pwStepLine":7,"gherkinStepLine":10,"keywordType":"Context","textWithKeyword":"Dado que estou na página inicial do login","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":11,"keywordType":"Context","textWithKeyword":"E clico em Minhas Aplicações","stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":12,"keywordType":"Context","textWithKeyword":"E verifico se o popup foi aberto corretamente","stepMatchArguments":[]},{"pwStepLine":10,"gherkinStepLine":13,"keywordType":"Context","textWithKeyword":"E preencho as credenciais de login","stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":14,"keywordType":"Context","textWithKeyword":"E navego diretamente para a página de manutenção de eventos de cartão de crédito","stepMatchArguments":[]},{"pwStepLine":12,"gherkinStepLine":15,"keywordType":"Action","textWithKeyword":"Quando marco o checkbox de pesquisa por CPF em eventos","stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":16,"keywordType":"Action","textWithKeyword":"E clico no campo de filtro de CPF em eventos","stepMatchArguments":[]},{"pwStepLine":14,"gherkinStepLine":17,"keywordType":"Action","textWithKeyword":"E preencho o CPF para eventos \"144.932.537-89\"","stepMatchArguments":[{"group":{"start":28,"value":"\"144.932.537-89\"","children":[{"start":29,"value":"144.932.537-89","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":15,"gherkinStepLine":18,"keywordType":"Action","textWithKeyword":"E clico no botão pesquisar de eventos","stepMatchArguments":[]},{"pwStepLine":16,"gherkinStepLine":19,"keywordType":"Outcome","textWithKeyword":"Então devo ver o resultado da consulta de eventos","stepMatchArguments":[]},{"pwStepLine":17,"gherkinStepLine":20,"keywordType":"Outcome","textWithKeyword":"E deve conter o número do cartão \"7899723\"","stepMatchArguments":[{"group":{"start":31,"value":"\"7899723\"","children":[{"start":32,"value":"7899723","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":18,"gherkinStepLine":21,"keywordType":"Outcome","textWithKeyword":"E deve conter o nome do cliente de eventos \"ROSE AP O CONCEICAO\"","stepMatchArguments":[{"group":{"start":41,"value":"\"ROSE AP O CONCEICAO\"","children":[{"start":42,"value":"ROSE AP O CONCEICAO","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":19,"gherkinStepLine":22,"keywordType":"Outcome","textWithKeyword":"E deve conter o evento do cartão \"8 - CARTAO CANCELADO POR OUTROS MOTIVOS\"","stepMatchArguments":[{"group":{"start":31,"value":"\"8 - CARTAO CANCELADO POR OUTROS MOTIVOS\"","children":[{"start":32,"value":"8 - CARTAO CANCELADO POR OUTROS MOTIVOS","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
]; // bdd-data-end