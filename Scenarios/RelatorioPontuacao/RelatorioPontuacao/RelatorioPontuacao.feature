# language: pt

Funcionalidade: Relatório de Pontuação GCCS
  Como um usuário do sistema GCCS
  Eu quero consultar relatórios de pontuação de cartão de crédito
  Para verificar informações de pontuação de clientes

  @smoke @consulta @gccs @relatório-pontuação
  Cenário: Consulta bem-sucedida de relatório de pontuação - CPF válido
    Dado que estou na página inicial do login
    E clico em Minhas Aplicações
    E verifico se o popup foi aberto corretamente
    E preencho as credenciais de login
    E navego diretamente para a página de relatórios
    Quando clico no link de relatório de pontuação
    E marco o checkbox de pesquisa por CPF em relatório
    E clico no campo de filtro de CPF em relatório
    E preencho o CPF para relatório "144.932.537-89"
    E clico no campo de filtro de cartão em relatório
    E seleciono o cartão para relatório "4066082982988294"
    E seleciono a CIA para relatório "531"
    E seleciono a situação para relatório "PE"
    E clico no botão pesquisar de relatório
    Então devo ver o resultado do relatório de pontuação
    E deve conter o CPF no relatório "144.932.537-89"
    E deve conter o nome do cliente no relatório "ROSE AP O CONCEICAO"
    E deve conter o número do cartão no relatório "4066082982988294"
    E deve conter a classe do cartão no relatório "PLATINUM"
    E deve conter a administradora no relatório "PRJR"
