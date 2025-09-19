# 🔑 Guia: Configurando SSH para GitHub no Jenkins

## 📋 Visão Geral

Este guia mostra como configurar SSH como alternativa ao HTTPS para resolver problemas de conectividade de rede.

## 🎯 Quando Usar SSH

Use SSH quando:
- HTTPS falha devido a problemas de DNS/proxy
- Você tem problemas de conectividade de rede
- O servidor Jenkins está em ambiente restritivo

## 🔧 Passo 1: Gerar Chave SSH no Jenkins

### 1.1 Acessar o Servidor Jenkins

Execute estes comandos no servidor Jenkins:

```bash
# Gerar chave SSH
ssh-keygen -t rsa -b 4096 -C "jenkins@company.com"

# Aceitar o local padrão (/var/jenkins_home/.ssh/id_rsa)
# Deixar passphrase vazia (pressionar Enter)

# Verificar se a chave foi criada
ls -la ~/.ssh/
```

### 1.2 Copiar a Chave Pública

```bash
# Mostrar a chave pública
cat ~/.ssh/id_rsa.pub
```

**COPIE TODO O CONTEÚDO** da chave pública (começa com `ssh-rsa` e termina com o email).

## 🔑 Passo 2: Adicionar Chave SSH ao GitHub

### 2.1 No GitHub

1. Vá para **Settings** → **SSH and GPG keys**
2. Clique em **"New SSH key"**
3. Configure:
   - **Title**: `Jenkins CI/CD Server`
   - **Key**: Cole a chave pública copiada
4. Clique em **"Add SSH key"**

### 2.2 Testar a Conexão SSH

```bash
# Testar conexão SSH
ssh -T git@github.com

# Deve retornar algo como:
# Hi username! You've successfully authenticated, but GitHub does not provide shell access.
```

## 🔐 Passo 3: Configurar Credenciais SSH no Jenkins

### 3.1 Acessar o Gerenciador de Credenciais

1. No Jenkins, vá para **"Gerenciar Jenkins"**
2. Clique em **"Gerenciar credenciais"**
3. Selecione **"System"**
4. Clique em **"Global credentials (unrestricted)"**

### 3.2 Adicionar Nova Credencial SSH

1. Clique em **"Add Credentials"**
2. Configure os campos:
   - **Kind**: `SSH Username with private key`
   - **Scope**: `Global (Jenkins, nodes, items, all child items, etc)`
   - **ID**: `github-ssh-key`
   - **Description**: `Chave SSH do GitHub para Jenkins`
   - **Username**: `git`
   - **Private Key**: 
     - Selecione **"Enter directly"**
     - Cole o conteúdo da chave **PRIVADA** (`~/.ssh/id_rsa`)
3. Clique em **"Create"**

### 3.3 Obter a Chave Privada

```bash
# Mostrar a chave privada
cat ~/.ssh/id_rsa
```

**COPIE TODO O CONTEÚDO** da chave privada (inclui `-----BEGIN OPENSSH PRIVATE KEY-----` e `-----END OPENSSH PRIVATE KEY-----`).

## 🧪 Passo 4: Testar a Configuração

### 4.1 Executar o Pipeline

O pipeline atualizado tentará automaticamente:

1. **HTTPS primeiro** (com `github-credentials`)
2. **SSH como fallback** (com `github-ssh-key`)

### 4.2 Verificar os Logs

Procure por estas mensagens nos logs:

```
🔄 Tentando checkout via HTTPS...
✅ Checkout HTTPS bem-sucedido!
```

OU

```
❌ Checkout HTTPS falhou: [erro]
🔄 Tentando checkout via SSH...
✅ Checkout SSH bem-sucedido!
```

## 🔧 Passo 5: Configuração Adicional (Opcional)

### 5.1 Configurar SSH Agent (se necessário)

```bash
# Iniciar SSH agent
eval "$(ssh-agent -s)"

# Adicionar chave ao agent
ssh-add ~/.ssh/id_rsa
```

### 5.2 Configurar SSH Config

Criar arquivo `~/.ssh/config`:

```
Host github.com
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_rsa
    IdentitiesOnly yes
```

## 🚨 Troubleshooting

### Erro: "Permission denied (publickey)"

- Verifique se a chave pública está no GitHub
- Confirme se a chave privada está correta no Jenkins
- Teste a conexão SSH manualmente

### Erro: "Host key verification failed"

```bash
# Adicionar GitHub aos known hosts
ssh-keyscan github.com >> ~/.ssh/known_hosts
```

### Erro: "Could not resolve hostname"

- O problema é DNS, não SSH
- Use as configurações de DNS do pipeline atualizado

## 📋 Checklist de Verificação

- [ ] Chave SSH gerada no servidor Jenkins
- [ ] Chave pública adicionada ao GitHub
- [ ] Credenciais SSH configuradas no Jenkins
- [ ] Teste de conexão SSH funcionando
- [ ] Pipeline configurado com fallback SSH

## 🎯 Resultado Esperado

O pipeline deve conseguir fazer checkout usando SSH quando HTTPS falhar, resolvendo problemas de conectividade de rede.

---

✅ **Benefício**: SSH funciona mesmo quando há problemas de DNS/proxy, fornecendo uma alternativa robusta ao HTTPS.
