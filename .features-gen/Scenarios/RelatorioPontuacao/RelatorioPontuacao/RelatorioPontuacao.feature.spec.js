// Generated from: Scenarios\RelatorioPontuacao\RelatorioPontuacao\RelatorioPontuacao.feature
import { test } from "playwright-bdd";

test.describe('Relatório de Pontuação GCCS', () => {

  test('Consulta bem-sucedida de relatório de pontuação - CPF válido', { tag: ['@smoke', '@consulta', '@gccs', '@relatório-pontuação'] }, async ({ Given, When, Then, And, page }) => { 
    await Given('que estou na página inicial do login', null, { page }); 
    await And('clico em Minhas Aplicações', null, { page }); 
    await And('verifico se o popup foi aberto corretamente', null, { page }); 
    await And('preencho as credenciais de login', null, { page }); 
    await And('navego diretamente para a página de relatórios', null, { page }); 
    await When('clico no link de relatório de pontuação', null, { page }); 
    await And('marco o checkbox de pesquisa por CPF em relatório', null, { page }); 
    await And('clico no campo de filtro de CPF em relatório', null, { page }); 
    await And('preencho o CPF para relatório "144.932.537-89"', null, { page }); 
    await And('clico no campo de filtro de cartão em relatório', null, { page }); 
    await And('seleciono o cartão para relatório "4066082982988294"', null, { page }); 
    await And('seleciono a CIA para relatório "531"', null, { page }); 
    await And('seleciono a situação para relatório "PE"', null, { page }); 
    await And('clico no botão pesquisar de relatório', null, { page }); 
    await Then('devo ver o resultado do relatório de pontuação', null, { page }); 
    await And('deve conter o CPF no relatório "144.932.537-89"', null, { page }); 
    await And('deve conter o nome do cliente no relatório "ROSE AP O CONCEICAO"', null, { page }); 
    await And('deve conter o número do cartão no relatório "4066082982988294"', null, { page }); 
    await And('deve conter a classe do cartão no relatório "PLATINUM"', null, { page }); 
    await And('deve conter a administradora no relatório "PRJR"', null, { page }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('Scenarios\\RelatorioPontuacao\\RelatorioPontuacao\\RelatorioPontuacao.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":9,"tags":["@smoke","@consulta","@gccs","@relatório-pontuação"],"steps":[{"pwStepLine":7,"gherkinStepLine":10,"keywordType":"Context","textWithKeyword":"Dado que estou na página inicial do login","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":11,"keywordType":"Context","textWithKeyword":"E clico em Minhas Aplicações","stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":12,"keywordType":"Context","textWithKeyword":"E verifico se o popup foi aberto corretamente","stepMatchArguments":[]},{"pwStepLine":10,"gherkinStepLine":13,"keywordType":"Context","textWithKeyword":"E preencho as credenciais de login","stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":14,"keywordType":"Context","textWithKeyword":"E navego diretamente para a página de relatórios","stepMatchArguments":[]},{"pwStepLine":12,"gherkinStepLine":15,"keywordType":"Action","textWithKeyword":"Quando clico no link de relatório de pontuação","stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":16,"keywordType":"Action","textWithKeyword":"E marco o checkbox de pesquisa por CPF em relatório","stepMatchArguments":[]},{"pwStepLine":14,"gherkinStepLine":17,"keywordType":"Action","textWithKeyword":"E clico no campo de filtro de CPF em relatório","stepMatchArguments":[]},{"pwStepLine":15,"gherkinStepLine":18,"keywordType":"Action","textWithKeyword":"E preencho o CPF para relatório \"144.932.537-89\"","stepMatchArguments":[{"group":{"start":30,"value":"\"144.932.537-89\"","children":[{"start":31,"value":"144.932.537-89","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":16,"gherkinStepLine":19,"keywordType":"Action","textWithKeyword":"E clico no campo de filtro de cartão em relatório","stepMatchArguments":[]},{"pwStepLine":17,"gherkinStepLine":20,"keywordType":"Action","textWithKeyword":"E seleciono o cartão para relatório \"4066082982988294\"","stepMatchArguments":[{"group":{"start":34,"value":"\"4066082982988294\"","children":[{"start":35,"value":"4066082982988294","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":18,"gherkinStepLine":21,"keywordType":"Action","textWithKeyword":"E seleciono a CIA para relatório \"531\"","stepMatchArguments":[{"group":{"start":31,"value":"\"531\"","children":[{"start":32,"value":"531","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":19,"gherkinStepLine":22,"keywordType":"Action","textWithKeyword":"E seleciono a situação para relatório \"PE\"","stepMatchArguments":[{"group":{"start":36,"value":"\"PE\"","children":[{"start":37,"value":"PE","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":20,"gherkinStepLine":23,"keywordType":"Action","textWithKeyword":"E clico no botão pesquisar de relatório","stepMatchArguments":[]},{"pwStepLine":21,"gherkinStepLine":24,"keywordType":"Outcome","textWithKeyword":"Então devo ver o resultado do relatório de pontuação","stepMatchArguments":[]},{"pwStepLine":22,"gherkinStepLine":25,"keywordType":"Outcome","textWithKeyword":"E deve conter o CPF no relatório \"144.932.537-89\"","stepMatchArguments":[{"group":{"start":31,"value":"\"144.932.537-89\"","children":[{"start":32,"value":"144.932.537-89","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":23,"gherkinStepLine":26,"keywordType":"Outcome","textWithKeyword":"E deve conter o nome do cliente no relatório \"ROSE AP O CONCEICAO\"","stepMatchArguments":[{"group":{"start":43,"value":"\"ROSE AP O CONCEICAO\"","children":[{"start":44,"value":"ROSE AP O CONCEICAO","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":24,"gherkinStepLine":27,"keywordType":"Outcome","textWithKeyword":"E deve conter o número do cartão no relatório \"4066082982988294\"","stepMatchArguments":[{"group":{"start":44,"value":"\"4066082982988294\"","children":[{"start":45,"value":"4066082982988294","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":25,"gherkinStepLine":28,"keywordType":"Outcome","textWithKeyword":"E deve conter a classe do cartão no relatório \"PLATINUM\"","stepMatchArguments":[{"group":{"start":44,"value":"\"PLATINUM\"","children":[{"start":45,"value":"PLATINUM","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":26,"gherkinStepLine":29,"keywordType":"Outcome","textWithKeyword":"E deve conter a administradora no relatório \"PRJR\"","stepMatchArguments":[{"group":{"start":42,"value":"\"PRJR\"","children":[{"start":43,"value":"PRJR","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
]; // bdd-data-end