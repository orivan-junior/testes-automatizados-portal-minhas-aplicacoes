# 🔐 Guia: Configurando Credenciais do GitHub no Jenkins

## 📋 Visão Geral

Este guia mostra como configurar suas credenciais do GitHub no Jenkins de forma segura, sem expor senhas ou tokens no código.

## 🎯 Objetivo

Substituir a URL pública do repositório por uma configuração que use suas credenciais pessoais do GitHub para acessar repositórios privados.

## 🔧 Passo 1: Criar Credenciais no Jenkins

### 1.1 Acessar o Gerenciador de Credenciais

1. No Jenkins, vá para **"Gerenciar Jenkins"**
2. Clique em **"Gerenciar credenciais"**
3. Selecione **"System"**
4. Clique em **"Global credentials (unrestricted)"**

### 1.2 Adicionar Nova Credencial

1. Clique em **"Add Credentials"**
2. Configure os campos:
   - **Kind**: `Username with password`
   - **Scope**: `Global (Jenkins, nodes, items, all child items, etc)`
   - **Username**: Seu username do GitHub
   - **Password**: Seu Personal Access Token (PAT) do GitHub
   - **ID**: `github-credentials` (ou outro nome de sua escolha)
   - **Description**: `Credenciais do GitHub para acesso aos repositórios`

3. Clique em **"Create"**

## 🔑 Passo 2: Criar Personal Access Token (PAT) no GitHub

Se você ainda não tem um PAT:

1. No GitHub, vá para **Settings** → **Developer settings** → **Personal access tokens** → **Tokens (classic)**
2. Clique em **"Generate new token"**
3. Configure:
   - **Note**: `Jenkins CI/CD`
   - **Expiration**: Escolha um período adequado
   - **Scopes**: Marque pelo menos:
     - `repo` (acesso completo aos repositórios)
     - `read:org` (se necessário para organizações)

4. Clique em **"Generate token"**
5. **COPIE O TOKEN** (você só verá ele uma vez!)

## 📝 Passo 3: Atualizar o Jenkinsfile

Substitua a seção de checkout no seu `Jenkinsfile.chrome-only`:

### ❌ Código Atual (Inseguro)
```groovy
stage('Checkout') {
    steps {
        git branch: 'main', url: 'https://github.com/orivan-junior/testes-automatizados-portal-minhas-aplicacoes.git'
    }
}
```

### ✅ Código Atualizado (Seguro)
```groovy
stage('Checkout') {
    steps {
        script {
            // Usa as credenciais configuradas no Jenkins
            git branch: 'main', 
                 url: 'https://github.com/orivan-junior/testes-automatizados-portal-minhas-aplicacoes.git',
                 credentialsId: 'github-credentials'
        }
    }
}
```

## 🔒 Passo 4: Configuração Adicional de Segurança

### 4.1 Variáveis de Ambiente Sensíveis

Se você tiver outras credenciais (como as do Nexus), também pode movê-las para o Jenkins:

1. Vá para **"Gerenciar Jenkins"** → **"Configure System"**
2. Na seção **"Global properties"**, marque **"Environment variables"**
3. Adicione as variáveis:
   - `NEXUS_USER` = `jenkins`
   - `NEXUS_PASS` = `jenkins123`

### 4.2 Atualizar o Jenkinsfile para Usar Variáveis

```groovy
environment {
    CI = 'true'
    NEXUS_URL = 'http://nexus:8081'
    // Remover NEXUS_USER e NEXUS_PASS daqui
}
```

## 🧪 Passo 5: Testar a Configuração

1. Salve o Jenkinsfile atualizado
2. Execute o pipeline
3. Verifique se o checkout funciona corretamente
4. Confirme que não há erros de autenticação

## 📚 Exemplo Completo do Jenkinsfile Atualizado

```groovy
pipeline {
    agent any

    environment {
        CI = 'true'
        NEXUS_URL = 'http://nexus:8081'
        // NEXUS_USER e NEXUS_PASS agora vêm das variáveis globais do Jenkins
    }

    stages {
        stage('Checkout') {
            steps {
                script {
                    // Usa credenciais seguras do GitHub
                    git branch: 'main', 
                         url: 'https://github.com/orivan-junior/testes-automatizados-portal-minhas-aplicacoes.git',
                         credentialsId: 'github-credentials'
                }
            }
        }
        
        // ... resto dos stages permanecem iguais ...
    }
}
```

## ⚠️ Importante: Boas Práticas de Segurança

1. **Nunca** commite credenciais no código
2. **Sempre** use o sistema de credenciais do Jenkins
3. **Rotacione** seus tokens periodicamente
4. **Use escopo mínimo** necessário nos tokens
5. **Monitore** o uso das credenciais

## 🔍 Troubleshooting

### Erro: "Could not resolve hostname"
- Verifique se o Jenkins tem acesso à internet
- Confirme se não há proxy bloqueando

### Erro: "Authentication failed"
- Verifique se o username está correto
- Confirme se o PAT tem as permissões necessárias
- Teste o PAT manualmente no GitHub

### Erro: "Repository not found"
- Verifique se o repositório existe
- Confirme se o PAT tem acesso ao repositório
- Verifique se o repositório não é privado (se for, precisa do PAT)

## 📞 Suporte

Se encontrar problemas:
1. Verifique os logs do Jenkins
2. Teste as credenciais manualmente
3. Confirme as permissões do repositório
4. Verifique a conectividade de rede

---

✅ **Resultado**: Suas credenciais do GitHub estarão seguras no Jenkins e não serão expostas no código!
