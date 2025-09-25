# language: pt

Funcionalidade: Consulta de Cartão de Crédito GCCS
  Como um usuário do sistema GCCS
  Eu quero consultar propostas de cartão de crédito
  Para verificar informações de documentos de venda

  @smoke @consulta @gccs @consulta-cartao
  Cenário: Consulta bem-sucedida com CPF válido - Cartão Ativado
    Dado que estou na página inicial do login
    E clico em Minhas Aplicações
    E verifico se o popup foi aberto corretamente
    E preencho as credenciais de login
    E navego diretamente para a página de consulta de cartão de crédito
    Quando eu seleciono a opção "Número do CPF do Cliente"
    E preencho o CPF "75561140159"
    E seleciono a classe do cartão "1"
    E seleciono a administradora "40003"
    E clico no botão pesquisar
    Então devo ver o resultado da proposta
    E deve conter "6 - CARTAO ATIVADO"
    E deve exibir o nome "TESTE HOMOLOGACAO"
    E deve mostrar o CPF pelo contexto do teste
    E deve mostrar a administradora "PRJR"
    E deve mostrar a classe "GOLD"

  @consulta @gccs @consulta-cartao
  Cenário: Consulta sem resultados - CPF inexistente
    Dado que estou na página inicial do login
    E clico em Minhas Aplicações
    E verifico se o popup foi aberto corretamente
    E preencho as credenciais de login
    E navego diretamente para a página de consulta de cartão de crédito
    Quando eu seleciono a opção "Número do CPF do Cliente"
    E preencho o CPF "123456"
    E seleciono a classe do cartão "1"
    E seleciono a administradora "40003"
    E clico no botão pesquisar
    Então devo ver o resultado da consulta
    E deve exibir "Dados dos Documentos de Venda Nada foi encontrado."
