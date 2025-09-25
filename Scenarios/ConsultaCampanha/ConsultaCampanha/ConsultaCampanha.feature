# language: pt

Funcionalidade: Consulta de Campanha GCCS
  Como um usuário do sistema GCCS
  Eu quero consultar campanhas de cartão de crédito
  Para verificar informações de campanhas pré-aprovadas

  @smoke @consulta @gccs @consulta-campanha
  Cenário: Consulta bem-sucedida de campanha - Código 8
    Dado que estou na página inicial do login
    E clico em Minhas Aplicações
    E verifico se o popup foi aberto corretamente
    E preencho as credenciais de login
    E navego diretamente para a página de consulta de campanha
    Quando clico no frame Centro
    E marco o checkbox de pesquisa de campanha
    E seleciono o código da campanha "8"
    E clico no botão pesquisar da campanha
    Então devo ver o resultado da consulta de campanha
    E deve conter o código da campanha "8"
    E deve conter o nome da campanha "TESTE 3"


