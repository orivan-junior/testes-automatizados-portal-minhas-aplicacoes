// Generated from: Scenarios\ConsultaCampanha\ConsultaCampanha\ConsultaCampanha.feature
import { test } from "playwright-bdd";

test.describe('Consulta de Campanha GCCS', () => {

  test('Consulta bem-sucedida de campanha - Código 8', { tag: ['@smoke', '@consulta', '@gccs', '@consulta-campanha'] }, async ({ Given, When, Then, And, page }) => { 
    await Given('que estou na página inicial do login', null, { page }); 
    await And('clico em Minhas Aplicações', null, { page }); 
    await And('verifico se o popup foi aberto corretamente', null, { page }); 
    await And('preencho as credenciais de login', null, { page }); 
    await And('navego diretamente para a página de consulta de campanha', null, { page }); 
    await When('clico no frame Centro', null, { page }); 
    await And('marco o checkbox de pesquisa de campanha', null, { page }); 
    await And('seleciono o código da campanha "8"', null, { page }); 
    await And('clico no botão pesquisar da campanha', null, { page }); 
    await Then('devo ver o resultado da consulta de campanha', null, { page }); 
    await And('deve conter o código da campanha "8"', null, { page }); 
    await And('deve conter o nome da campanha "TESTE 3"', null, { page }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('Scenarios\\ConsultaCampanha\\ConsultaCampanha\\ConsultaCampanha.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":9,"tags":["@smoke","@consulta","@gccs","@consulta-campanha"],"steps":[{"pwStepLine":7,"gherkinStepLine":10,"keywordType":"Context","textWithKeyword":"Dado que estou na página inicial do login","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":11,"keywordType":"Context","textWithKeyword":"E clico em Minhas Aplicações","stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":12,"keywordType":"Context","textWithKeyword":"E verifico se o popup foi aberto corretamente","stepMatchArguments":[]},{"pwStepLine":10,"gherkinStepLine":13,"keywordType":"Context","textWithKeyword":"E preencho as credenciais de login","stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":14,"keywordType":"Context","textWithKeyword":"E navego diretamente para a página de consulta de campanha","stepMatchArguments":[]},{"pwStepLine":12,"gherkinStepLine":15,"keywordType":"Action","textWithKeyword":"Quando clico no frame Centro","stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":16,"keywordType":"Action","textWithKeyword":"E marco o checkbox de pesquisa de campanha","stepMatchArguments":[]},{"pwStepLine":14,"gherkinStepLine":17,"keywordType":"Action","textWithKeyword":"E seleciono o código da campanha \"8\"","stepMatchArguments":[{"group":{"start":31,"value":"\"8\"","children":[{"start":32,"value":"8","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":15,"gherkinStepLine":18,"keywordType":"Action","textWithKeyword":"E clico no botão pesquisar da campanha","stepMatchArguments":[]},{"pwStepLine":16,"gherkinStepLine":19,"keywordType":"Outcome","textWithKeyword":"Então devo ver o resultado da consulta de campanha","stepMatchArguments":[]},{"pwStepLine":17,"gherkinStepLine":20,"keywordType":"Outcome","textWithKeyword":"E deve conter o código da campanha \"8\"","stepMatchArguments":[{"group":{"start":33,"value":"\"8\"","children":[{"start":34,"value":"8","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":18,"gherkinStepLine":21,"keywordType":"Outcome","textWithKeyword":"E deve conter o nome da campanha \"TESTE 3\"","stepMatchArguments":[{"group":{"start":31,"value":"\"TESTE 3\"","children":[{"start":32,"value":"TESTE 3","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
]; // bdd-data-end