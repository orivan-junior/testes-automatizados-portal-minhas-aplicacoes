# language: pt

Funcionalidade: Manutenção de Eventos de Cartão de Crédito GCCS
  Como um usuário do sistema GCCS
  Eu quero consultar eventos de cartão de crédito
  Para verificar informações de manutenção de eventos

  @smoke @consulta @gccs @manutenção-eventos
  Cenário: Consulta bem-sucedida de eventos - CPF válido
    Dado que estou na página inicial do login
    E clico em Minhas Aplicações
    E verifico se o popup foi aberto corretamente
    E preencho as credenciais de login
    E navego diretamente para a página de manutenção de eventos de cartão de crédito
    Quando marco o checkbox de pesquisa por CPF em eventos
    E clico no campo de filtro de CPF em eventos
    E preencho o CPF para eventos "144.932.537-89"
    E clico no botão pesquisar de eventos
    Então devo ver o resultado da consulta de eventos
    E deve conter o número do cartão "7899723"
    E deve conter o nome do cliente de eventos "ROSE AP O CONCEICAO"
    E deve conter o evento do cartão "8 - CARTAO CANCELADO POR OUTROS MOTIVOS"
