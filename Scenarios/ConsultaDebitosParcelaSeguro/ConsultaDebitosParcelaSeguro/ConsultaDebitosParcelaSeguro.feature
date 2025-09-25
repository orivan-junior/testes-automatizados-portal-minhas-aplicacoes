# language: pt

Funcionalidade: Consulta de Débitos de Parcela Seguro Cartão GCCS
  Como um usuário do sistema GCCS
  Eu quero consultar débitos de parcela seguro de cartão de crédito
  Para verificar informações de débitos de clientes

  @smoke @consulta @gccs @consulta-débitos
  Cenário: Consulta bem-sucedida de débitos - Código 1
    Dado que estou na página inicial do login
    E clico em Minhas Aplicações
    E verifico se o popup foi aberto corretamente
    E preencho as credenciais de login
    E navego diretamente para a página de consulta de débitos de parcela seguro
    Quando marco o checkbox de pesquisa por código do cartão
    E clico no campo de filtro de código do cartão
    E preencho o código do cartão "1"
    E clico no botão pesquisar de débitos
    Então devo ver o resultado da consulta de débitos
    E deve conter o CPF "144.932.537-89"
    E deve conter o nome do cliente "ROSE AP O CONCEICAO"
    E deve conter a administradora "40003 - PRJR"
