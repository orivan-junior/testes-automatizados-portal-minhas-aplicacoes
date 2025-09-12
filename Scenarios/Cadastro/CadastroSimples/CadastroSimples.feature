# language: pt
Funcionalidade: Cadastro de Práticas Esportivas
  Como um usuário do sistema DSV
  Eu quero cadastrar uma nova prática esportiva
  Para que ela esteja disponível no sistema

  @praticas-esportivas @cadastro
  @cadastro-pratica-esportiva
  Cenário: Cadastrar nova prática esportiva
  #contexto para acessar a rotina
    Dado que estou na página inicial do login
    E clico em Minhas Aplicações
    E verifico se o popup foi aberto corretamente
    E preencho as credenciais de login
    E clico no menu "VIDA - Subscrição de Riscos"
    E clico no submenu "Cadastros"
    
    
  #rotina de cadastro
    Quando clico em "Práticas Esportivas" no formulário de cadastro
    E foco no campo nome
    E preencho o campo nome com "[NOMEGERADO]"
    E clico no botão Incluir
    Então verifico se a inclusão foi realizada com sucesso
    E clico no botão Pesquisar
    E preencho o campo nome para pesquisa com "[NOMEGERADO]"
    E clico no botão Pesquisar novamente
    E clico no resultado da pesquisa "[NOMEGERADO]"
    E marco o checkbox de seleção