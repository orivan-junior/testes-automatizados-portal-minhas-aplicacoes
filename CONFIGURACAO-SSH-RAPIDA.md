# 🚀 Configuração SSH Rápida para GitHub

## ⚡ Se o HTTPS falhar, configure SSH rapidamente:

### 1. **Gerar chave SSH no servidor Jenkins:**
```bash
ssh-keygen -t rsa -b 4096 -C "jenkins@company.com"
# Pressione Enter para aceitar o local padrão
# Deixe passphrase vazia (pressione Enter)
```

### 2. **Copiar chave pública:**
```bash
cat ~/.ssh/id_rsa.pub
```

### 3. **Adicionar no GitHub:**
- Vá para GitHub → Settings → SSH and GPG keys
- Clique "New SSH key"
- Cole a chave pública
- Salve

### 4. **Configurar credenciais SSH no Jenkins:**
- Gerenciar Jenkins → Gerenciar credenciais
- Add Credentials
- Kind: `SSH Username with private key`
- ID: `github-ssh-key`
- Username: `git`
- Private Key: Cole o conteúdo de `~/.ssh/id_rsa`

### 5. **Testar:**
```bash
ssh -T git@github.com
```

## 🎯 Resultado:
O pipeline tentará HTTPS primeiro, se falhar, usará SSH automaticamente!
