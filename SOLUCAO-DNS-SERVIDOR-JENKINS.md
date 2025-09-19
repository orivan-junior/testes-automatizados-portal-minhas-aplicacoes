# 🔧 Solução: Configurar DNS no Servidor Jenkins

## 🚨 Problema Identificado

O Jenkins está falhando **antes** de executar o pipeline, durante o carregamento do Jenkinsfile. Isso acontece porque o servidor Jenkins não consegue resolver `github.com`.

## 🛠️ Solução: Configurar DNS no Servidor Jenkins

### **Passo 1: Acessar o Servidor Jenkins**

Execute estes comandos **diretamente no servidor Jenkins**:

```bash
# Verificar configuração atual de DNS
cat /etc/resolv.conf

# Configurar DNS público
echo "nameserver 8.8.8.8" >> /etc/resolv.conf
echo "nameserver 8.8.4.4" >> /etc/resolv.conf
echo "nameserver 1.1.1.1" >> /etc/resolv.conf

# Testar resolução DNS
nslookup github.com

# Se ainda não funcionar, adicionar entrada no hosts
echo "140.82.112.4 github.com" >> /etc/hosts
echo "140.82.112.3 api.github.com" >> /etc/hosts

# Testar conectividade
ping -c 3 github.com
curl -I https://github.com
```

### **Passo 2: Configurar DNS Permanente (Opcional)**

Para tornar a configuração permanente:

```bash
# Editar arquivo de configuração de rede
nano /etc/systemd/resolved.conf

# Adicionar ou descomentar:
DNS=8.8.8.8 8.8.4.4 1.1.1.1

# Reiniciar serviço DNS
systemctl restart systemd-resolved
```

### **Passo 3: Verificar Configuração**

```bash
# Verificar DNS
systemd-resolve --status

# Testar resolução
nslookup github.com
dig github.com
```

## 🔄 **Solução 2: Usar SSH no Jenkins (Alternativa)**

Se não conseguir configurar DNS, configure SSH:

### **1. Gerar chave SSH no servidor Jenkins:**
```bash
ssh-keygen -t rsa -b 4096 -C "jenkins@company.com"
# Pressione Enter para aceitar o local padrão
# Deixe passphrase vazia
```

### **2. Copiar chave pública:**
```bash
cat ~/.ssh/id_rsa.pub
```

### **3. Adicionar no GitHub:**
- GitHub → Settings → SSH and GPG keys → New SSH key
- Cole a chave pública

### **4. Configurar credenciais SSH no Jenkins:**
- Gerenciar Jenkins → Gerenciar credenciais
- Add Credentials
- Kind: `SSH Username with private key`
- ID: `github-ssh-key`
- Username: `git`
- Private Key: Cole o conteúdo de `~/.ssh/id_rsa`

### **5. Alterar configuração do job para usar SSH:**
- Na configuração do job, mude a URL para: `git@github.com:orivan-junior/testes-automatizados-portal-minhas-aplicacoes.git`
- Use a credencial `github-ssh-key`

## 🎯 **Resultado Esperado**

Após configurar DNS ou SSH, o Jenkins deve conseguir:
- ✅ Carregar o Jenkinsfile
- ✅ Executar o pipeline
- ✅ Fazer checkout do repositório

## 📞 **Se Nada Funcionar**

Se você não tem acesso ao servidor Jenkins para configurar DNS:
1. Entre em contato com o administrador de rede
2. Peça para configurar DNS público no servidor
3. Ou configure SSH como alternativa

---

✅ **Recomendação**: Configure DNS primeiro (Solução 1), é mais simples e resolve o problema na raiz.
