// Generated from: Scenarios\Consulta\ConsultaCartaoCredito\ConsultaCartaoCredito.feature
import { test } from "playwright-bdd";

test.describe('Consulta de Cartão de Crédito GCCS', () => {

  test('Consulta bem-sucedida com CPF válido - Cartão Ativado', { tag: ['@smoke', '@consulta', '@positivo', '@consulta-cartao'] }, async ({ Given, When, Then, And, page }) => { 
    await Given('que estou na página inicial do login', null, { page }); 
    await And('clico em Minhas Aplicações', null, { page }); 
    await And('verifico se o popup foi aberto corretamente', null, { page }); 
    await And('preencho as credenciais de login', null, { page }); 
    await And('navego diretamente para a página de consulta de cartão de crédito', null, { page }); 
    await When('eu seleciono a opção "Número do CPF do Cliente"', null, { page }); 
    await And('preencho o CPF "75561140159"', null, { page }); 
    await And('seleciono a classe do cartão "1"', null, { page }); 
    await And('seleciono a administradora "40003"', null, { page }); 
    await And('clico no botão pesquisar', null, { page }); 
    await Then('devo ver o resultado da proposta', null, { page }); 
    await And('deve conter "6 - CARTAO ATIVADO"', null, { page }); 
    await And('deve exibir o nome "TESTE HOMOLOGACAO"', null, { page }); 
    await And('deve mostrar o CPF pelo contexto do teste', null, { page }); 
    await And('deve mostrar a administradora "PRJR"', null, { page }); 
    await And('deve mostrar a classe "GOLD"', null, { page }); 
  });

  test('Consulta sem resultados - CPF inexistente', { tag: ['@consulta', '@negativo', '@consulta-cartao'] }, async ({ Given, When, Then, And, page }) => { 
    await Given('que estou na página inicial do login', null, { page }); 
    await And('clico em Minhas Aplicações', null, { page }); 
    await And('verifico se o popup foi aberto corretamente', null, { page }); 
    await And('preencho as credenciais de login', null, { page }); 
    await And('navego diretamente para a página de consulta de cartão de crédito', null, { page }); 
    await When('eu seleciono a opção "Número do CPF do Cliente"', null, { page }); 
    await And('preencho o CPF "123456"', null, { page }); 
    await And('seleciono a classe do cartão "1"', null, { page }); 
    await And('seleciono a administradora "40003"', null, { page }); 
    await And('clico no botão pesquisar', null, { page }); 
    await Then('devo ver o resultado da consulta', null, { page }); 
    await And('deve exibir "Dados dos Documentos de Venda Nada foi encontrado."', null, { page }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('Scenarios\\Consulta\\ConsultaCartaoCredito\\ConsultaCartaoCredito.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":9,"tags":["@smoke","@consulta","@positivo","@consulta-cartao"],"steps":[{"pwStepLine":7,"gherkinStepLine":10,"keywordType":"Context","textWithKeyword":"Dado que estou na página inicial do login","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":11,"keywordType":"Context","textWithKeyword":"E clico em Minhas Aplicações","stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":12,"keywordType":"Context","textWithKeyword":"E verifico se o popup foi aberto corretamente","stepMatchArguments":[]},{"pwStepLine":10,"gherkinStepLine":13,"keywordType":"Context","textWithKeyword":"E preencho as credenciais de login","stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":14,"keywordType":"Context","textWithKeyword":"E navego diretamente para a página de consulta de cartão de crédito","stepMatchArguments":[]},{"pwStepLine":12,"gherkinStepLine":15,"keywordType":"Action","textWithKeyword":"Quando eu seleciono a opção \"Número do CPF do Cliente\"","stepMatchArguments":[{"group":{"start":21,"value":"\"Número do CPF do Cliente\"","children":[{"start":22,"value":"Número do CPF do Cliente","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":13,"gherkinStepLine":16,"keywordType":"Action","textWithKeyword":"E preencho o CPF \"75561140159\"","stepMatchArguments":[{"group":{"start":15,"value":"\"75561140159\"","children":[{"start":16,"value":"75561140159","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":14,"gherkinStepLine":17,"keywordType":"Action","textWithKeyword":"E seleciono a classe do cartão \"1\"","stepMatchArguments":[{"group":{"start":29,"value":"\"1\"","children":[{"start":30,"value":"1","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":15,"gherkinStepLine":18,"keywordType":"Action","textWithKeyword":"E seleciono a administradora \"40003\"","stepMatchArguments":[{"group":{"start":27,"value":"\"40003\"","children":[{"start":28,"value":"40003","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":16,"gherkinStepLine":19,"keywordType":"Action","textWithKeyword":"E clico no botão pesquisar","stepMatchArguments":[]},{"pwStepLine":17,"gherkinStepLine":20,"keywordType":"Outcome","textWithKeyword":"Então devo ver o resultado da proposta","stepMatchArguments":[]},{"pwStepLine":18,"gherkinStepLine":21,"keywordType":"Outcome","textWithKeyword":"E deve conter \"6 - CARTAO ATIVADO\"","stepMatchArguments":[{"group":{"start":12,"value":"\"6 - CARTAO ATIVADO\"","children":[{"start":13,"value":"6 - CARTAO ATIVADO","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":19,"gherkinStepLine":22,"keywordType":"Outcome","textWithKeyword":"E deve exibir o nome \"TESTE HOMOLOGACAO\"","stepMatchArguments":[{"group":{"start":19,"value":"\"TESTE HOMOLOGACAO\"","children":[{"start":20,"value":"TESTE HOMOLOGACAO","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":20,"gherkinStepLine":23,"keywordType":"Outcome","textWithKeyword":"E deve mostrar o CPF pelo contexto do teste","stepMatchArguments":[]},{"pwStepLine":21,"gherkinStepLine":24,"keywordType":"Outcome","textWithKeyword":"E deve mostrar a administradora \"PRJR\"","stepMatchArguments":[{"group":{"start":30,"value":"\"PRJR\"","children":[{"start":31,"value":"PRJR","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":22,"gherkinStepLine":25,"keywordType":"Outcome","textWithKeyword":"E deve mostrar a classe \"GOLD\"","stepMatchArguments":[{"group":{"start":22,"value":"\"GOLD\"","children":[{"start":23,"value":"GOLD","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":25,"pickleLine":28,"tags":["@consulta","@negativo","@consulta-cartao"],"steps":[{"pwStepLine":26,"gherkinStepLine":29,"keywordType":"Context","textWithKeyword":"Dado que estou na página inicial do login","stepMatchArguments":[]},{"pwStepLine":27,"gherkinStepLine":30,"keywordType":"Context","textWithKeyword":"E clico em Minhas Aplicações","stepMatchArguments":[]},{"pwStepLine":28,"gherkinStepLine":31,"keywordType":"Context","textWithKeyword":"E verifico se o popup foi aberto corretamente","stepMatchArguments":[]},{"pwStepLine":29,"gherkinStepLine":32,"keywordType":"Context","textWithKeyword":"E preencho as credenciais de login","stepMatchArguments":[]},{"pwStepLine":30,"gherkinStepLine":33,"keywordType":"Context","textWithKeyword":"E navego diretamente para a página de consulta de cartão de crédito","stepMatchArguments":[]},{"pwStepLine":31,"gherkinStepLine":34,"keywordType":"Action","textWithKeyword":"Quando eu seleciono a opção \"Número do CPF do Cliente\"","stepMatchArguments":[{"group":{"start":21,"value":"\"Número do CPF do Cliente\"","children":[{"start":22,"value":"Número do CPF do Cliente","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":32,"gherkinStepLine":35,"keywordType":"Action","textWithKeyword":"E preencho o CPF \"123456\"","stepMatchArguments":[{"group":{"start":15,"value":"\"123456\"","children":[{"start":16,"value":"123456","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":33,"gherkinStepLine":36,"keywordType":"Action","textWithKeyword":"E seleciono a classe do cartão \"1\"","stepMatchArguments":[{"group":{"start":29,"value":"\"1\"","children":[{"start":30,"value":"1","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":34,"gherkinStepLine":37,"keywordType":"Action","textWithKeyword":"E seleciono a administradora \"40003\"","stepMatchArguments":[{"group":{"start":27,"value":"\"40003\"","children":[{"start":28,"value":"40003","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":35,"gherkinStepLine":38,"keywordType":"Action","textWithKeyword":"E clico no botão pesquisar","stepMatchArguments":[]},{"pwStepLine":36,"gherkinStepLine":39,"keywordType":"Outcome","textWithKeyword":"Então devo ver o resultado da consulta","stepMatchArguments":[]},{"pwStepLine":37,"gherkinStepLine":40,"keywordType":"Outcome","textWithKeyword":"E deve exibir \"Dados dos Documentos de Venda Nada foi encontrado.\"","stepMatchArguments":[{"group":{"start":12,"value":"\"Dados dos Documentos de Venda Nada foi encontrado.\"","children":[{"start":13,"value":"Dados dos Documentos de Venda Nada foi encontrado.","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
]; // bdd-data-end