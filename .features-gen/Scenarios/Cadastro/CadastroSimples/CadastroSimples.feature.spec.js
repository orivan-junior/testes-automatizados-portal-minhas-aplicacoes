// Generated from: Scenarios\Cadastro\CadastroSimples\CadastroSimples.feature
import { test } from "playwright-bdd";

test.describe('Cadastro de Práticas Esportivas', () => {

  test('Cadastrar nova prática esportiva', { tag: ['@praticas-esportivas', '@cadastro', '@cadastro-pratica-esportiva'] }, async ({ Given, When, Then, And, page }) => { 
    await Given('que estou na página inicial do login', null, { page }); 
    await And('clico em Minhas Aplicações', null, { page }); 
    await And('verifico se o popup foi aberto corretamente', null, { page }); 
    await And('preencho as credenciais de login', null, { page }); 
    await And('clico no menu "VIDA - Subscrição de Riscos"', null, { page }); 
    await And('clico no submenu "Cadastros"', null, { page }); 
    await When('clico em "Práticas Esportivas" no formulário de cadastro', null, { page }); 
    await And('foco no campo nome', null, { page }); 
    await And('preencho o campo nome com "[NOMEGERADO]"', null, { page }); 
    await And('clico no botão Incluir', null, { page }); 
    await Then('verifico se a inclusão foi realizada com sucesso', null, { page }); 
    await And('clico no botão Pesquisar', null, { page }); 
    await And('preencho o campo nome para pesquisa com "[NOMEGERADO]"', null, { page }); 
    await And('clico no botão Pesquisar novamente', null, { page }); 
    await And('clico no resultado da pesquisa "[NOMEGERADO]"', null, { page }); 
    await And('marco o checkbox de seleção', null, { page }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('Scenarios\\Cadastro\\CadastroSimples\\CadastroSimples.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":9,"tags":["@praticas-esportivas","@cadastro","@cadastro-pratica-esportiva"],"steps":[{"pwStepLine":7,"gherkinStepLine":11,"keywordType":"Context","textWithKeyword":"Dado que estou na página inicial do login","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":12,"keywordType":"Context","textWithKeyword":"E clico em Minhas Aplicações","stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":13,"keywordType":"Context","textWithKeyword":"E verifico se o popup foi aberto corretamente","stepMatchArguments":[]},{"pwStepLine":10,"gherkinStepLine":14,"keywordType":"Context","textWithKeyword":"E preencho as credenciais de login","stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":15,"keywordType":"Context","textWithKeyword":"E clico no menu \"VIDA - Subscrição de Riscos\"","stepMatchArguments":[{"group":{"start":14,"value":"\"VIDA - Subscrição de Riscos\"","children":[{"start":15,"value":"VIDA - Subscrição de Riscos","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":12,"gherkinStepLine":16,"keywordType":"Context","textWithKeyword":"E clico no submenu \"Cadastros\"","stepMatchArguments":[{"group":{"start":17,"value":"\"Cadastros\"","children":[{"start":18,"value":"Cadastros","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":13,"gherkinStepLine":20,"keywordType":"Action","textWithKeyword":"Quando clico em \"Práticas Esportivas\" no formulário de cadastro","stepMatchArguments":[{"group":{"start":9,"value":"\"Práticas Esportivas\"","children":[{"start":10,"value":"Práticas Esportivas","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":14,"gherkinStepLine":21,"keywordType":"Action","textWithKeyword":"E foco no campo nome","stepMatchArguments":[]},{"pwStepLine":15,"gherkinStepLine":22,"keywordType":"Action","textWithKeyword":"E preencho o campo nome com \"[NOMEGERADO]\"","stepMatchArguments":[{"group":{"start":26,"value":"\"[NOMEGERADO]\"","children":[{"start":27,"value":"[NOMEGERADO]","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":16,"gherkinStepLine":23,"keywordType":"Action","textWithKeyword":"E clico no botão Incluir","stepMatchArguments":[]},{"pwStepLine":17,"gherkinStepLine":24,"keywordType":"Outcome","textWithKeyword":"Então verifico se a inclusão foi realizada com sucesso","stepMatchArguments":[]},{"pwStepLine":18,"gherkinStepLine":25,"keywordType":"Outcome","textWithKeyword":"E clico no botão Pesquisar","stepMatchArguments":[]},{"pwStepLine":19,"gherkinStepLine":26,"keywordType":"Outcome","textWithKeyword":"E preencho o campo nome para pesquisa com \"[NOMEGERADO]\"","stepMatchArguments":[{"group":{"start":40,"value":"\"[NOMEGERADO]\"","children":[{"start":41,"value":"[NOMEGERADO]","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":20,"gherkinStepLine":27,"keywordType":"Outcome","textWithKeyword":"E clico no botão Pesquisar novamente","stepMatchArguments":[]},{"pwStepLine":21,"gherkinStepLine":28,"keywordType":"Outcome","textWithKeyword":"E clico no resultado da pesquisa \"[NOMEGERADO]\"","stepMatchArguments":[{"group":{"start":31,"value":"\"[NOMEGERADO]\"","children":[{"start":32,"value":"[NOMEGERADO]","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":22,"gherkinStepLine":29,"keywordType":"Outcome","textWithKeyword":"E marco o checkbox de seleção","stepMatchArguments":[]}]},
]; // bdd-data-end