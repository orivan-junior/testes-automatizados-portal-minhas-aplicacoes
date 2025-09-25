pipeline {
    agent any

    environment {
        CI = 'true'
        NEXUS_URL = 'http://nexus:8081'
        NEXUS_USER = 'jenkins'
        NEXUS_PASS = 'jenkins123'
        // Configurações de proxy para resolver problemas de SSL
        NODE_TLS_REJECT_UNAUTHORIZED = '0'
        npm_config_strict_ssl = 'false'
    }

    stages {
        stage('Configure Network') {
            steps {
                sh '''
                    echo "🔧 Configurando rede para acesso ao GitHub..."
                    echo "📋 Projeto: Portal Minhas Aplicações - Testes Automatizados"
                    echo "🎯 Foco: Testes de Consulta Cartão"
                    echo "🔗 Repositório: orivan-junior/testes-automatizados-portal-minhas-aplicacoes"
                    
                    # Limpar configurações anteriores (ignorar erros se não existirem)
                    unset HTTP_PROXY
                    unset HTTPS_PROXY
                    git config --global --unset http.proxy || true
                    git config --global --unset https.proxy || true
                    
                    # Configurar curl para ignorar problemas de SSL em ambiente corporativo
                    echo "insecure" > ~/.curlrc || true
                    
                    echo "✅ Configuração de rede concluída"
                    echo "⚠️ Tentando checkout direto - se falhar, tentaremos SSH"
                '''
            }
        }

        stage('Checkout') {
            steps {
                script {
                    try {
                        echo "🔄 Tentando checkout via HTTPS..."
                        git branch: 'main', 
                             url: 'https://github.com/orivan-junior/testes-automatizados-portal-minhas-aplicacoes.git',
                             credentialsId: 'github-credentials'
                        echo "✅ Checkout HTTPS bem-sucedido!"
                    } catch (Exception e) {
                        echo "❌ Checkout HTTPS falhou: ${e.getMessage()}"
                        echo "🔄 Tentando checkout via SSH..."
                        try {
                            git branch: 'main',
                                url: 'git@github.com:orivan-junior/testes-automatizados-portal-minhas-aplicacoes.git',
                                credentialsId: 'jenkins-ssh-key'
                            echo "✅ Checkout SSH bem-sucedido!"
                        } catch (Exception sshError) {
                            echo "❌ Checkout SSH também falhou: ${sshError.getMessage()}"
                            echo "🚨 Ambos os métodos de checkout falharam!"
                            throw sshError
                        }
                    }
                }
            }
        }

        stage('Install Node.js (Skip if exists)') {
            steps {
                sh '''
                    if ! command -v node &> /dev/null; then
                        echo "Instalando Node.js 18..."
                        # Usar flag -k para ignorar problemas de SSL
                        curl -k -fsSL https://deb.nodesource.com/setup_18.x | bash -
                        apt-get update && apt-get install -y nodejs
                    else
                        echo "Node.js já instalado: $(node --version)"
                    fi
                '''
            }
        }

        stage('Install Dependencies') {
            steps {
                sh '''
                    echo "📦 Instalando dependências..."
                    echo "🔍 Verificando versões..."
                    echo "Node.js: $(node --version)"
                    echo "npm: $(npm --version)"
                    
                    # Limpar cache npm para evitar problemas
                    echo "🧹 Limpando cache npm..."
                    npm cache clean --force || true
                    
                    # Tentar npm ci primeiro (mais rápido e seguro)
                    if npm ci --unsafe-perm; then
                        echo "✅ Dependências instaladas com npm ci"
                    else
                        echo "⚠️ npm ci falhou, tentando npm install..."
                        echo "🔄 Atualizando package-lock.json..."
                        
                        # Remover package-lock.json se existir para forçar regeneração
                        rm -f package-lock.json || true
                        
                        npm install --unsafe-perm
                        echo "✅ Dependências instaladas com npm install"
                    fi
                    
                    echo "📋 Verificando instalação..."
                    npm list --depth=0 || echo "⚠️ Algumas dependências podem ter problemas"
                '''
            }
        }

        stage('Install Playwright Browsers (Chrome only)') {
            steps {
                sh '''
                    if [ ! -d "$HOME/.cache/ms-playwright" ]; then
                        echo "Instalando apenas Chrome..."
                        npx playwright install chromium --with-deps
                    else
                        echo "Browsers já instalados, pulando instalação"
                    fi
                '''
            }
        }

        stage('Run Tests (Chrome only)') {
            steps {
                // Captura falhas nos testes para continuar o pipeline
                catchError(buildResult: 'UNSTABLE', stageResult: 'FAILURE') {
                    sh '''
                        echo "Gerando testes BDD e executando Playwright para Portal Minhas Aplicações"
                        echo "Executando testes de consulta cartão..."
                        
                        # Gera os testes a partir das features
                        npx bddgen || echo "bddgen falhou (continuando para captar relatórios)"
                        
                        # Executa apenas os testes com tag gccs
                        npm run gccs
                    '''
                }
            }
        }

        stage('Generate Allure Report') {
            steps {
                sh '''
                    echo "📊 Gerando relatório Allure..."
                    
                    # Verificar se existem resultados do Allure
                    if [ -d "allure-results" ] && [ "$(ls -A allure-results)" ]; then
                        echo "✅ Resultados do Allure encontrados"
                        
                        # Gerar relatório Allure
                        if command -v allure &> /dev/null; then
                            echo "📈 Gerando relatório com Allure CLI..."
                            allure generate allure-results --clean -o allure-report
                        else
                            echo "📦 Instalando Allure CLI..."
                            npm install -g allure-commandline
                            allure generate allure-results --clean -o allure-report
                        fi
                        
                        echo "✅ Relatório Allure gerado com sucesso"
                    else
                        echo "⚠️ Nenhum resultado do Allure encontrado"
                        echo "📁 Conteúdo do diretório allure-results:"
                        ls -la allure-results/ 2>/dev/null || echo "Diretório não existe"
                    fi
                '''
            }
        }

        stage('Upload Evidence to Nexus') {
            steps {
                script {
                    def timestamp = new Date().format('yyyy-MM-dd_HH-mm-ss')
                    def buildNumber = env.BUILD_NUMBER
                    
                    sh """
                        echo "📤 Fazendo upload das evidências para o Nexus..."
                        echo "📋 Projeto: Portal Minhas Aplicações - Testes Automatizados"
                        echo "🎯 Foco: Testes de Consulta Cartão"
                        
                        # Criar diretório temporário com nome único
                        EVIDENCE_DIR="/tmp/evidence-upload-${buildNumber}-${timestamp}"
                        mkdir -p "\$EVIDENCE_DIR"
                        
                        echo "📁 Diretório de evidências: \$EVIDENCE_DIR"
                        
                        # Copiar evidências (com verificação de existência)
                        if [ -d "test-results/screenshots" ]; then
                            echo "📸 Copiando screenshots..."
                            cp -r test-results/screenshots "\$EVIDENCE_DIR/"
                        else
                            echo "⚠️ Nenhuma screenshot encontrada"
                        fi
                        
                        if [ -d "test-results/videos" ]; then
                            echo "🎥 Copiando vídeos..."
                            cp -r test-results/videos "\$EVIDENCE_DIR/"
                        else
                            echo "⚠️ Nenhum vídeo encontrado"
                        fi
                        
                        if [ -d "allure-results" ]; then
                            echo "📊 Copiando resultados Allure..."
                            cp -r allure-results "\$EVIDENCE_DIR/"
                        else
                            echo "⚠️ Nenhum resultado Allure encontrado"
                        fi
                        
                        if [ -d "allure-report" ]; then
                            echo "📈 Copiando relatório Allure gerado..."
                            cp -r allure-report "\$EVIDENCE_DIR/"
                        else
                            echo "⚠️ Nenhum relatório Allure gerado encontrado"
                        fi
                        
                        if [ -d "playwright-report" ]; then
                            echo "📋 Copiando playwright-report..."
                            cp -r playwright-report "\$EVIDENCE_DIR/"
                        else
                            echo "⚠️ Nenhum playwright-report encontrado"
                        fi
                        
                        # Criar arquivo de informações do build
                        cat > "\$EVIDENCE_DIR/build-info.txt" << EOF
Build Number: ${buildNumber}
Timestamp: ${timestamp}
Branch: ${env.GIT_BRANCH}
Commit: ${env.GIT_COMMIT}
Jenkins URL: ${env.BUILD_URL}
Pipeline Status: ${currentBuild.result ?: 'SUCCESS'}
Test Results: Available in allure-results and playwright-report directories
Allure Report: Available in allure-report directory
EOF
                        
                        # Fazer upload para Nexus
                        cd "\$EVIDENCE_DIR"
                        echo "📁 Criando arquivo tar das evidências..."
                        echo "📂 Conteúdo do diretório atual:"
                        ls -la
                        
                        # Nome do arquivo tar
                        TAR_FILE="evidence-${buildNumber}-${timestamp}.tar.gz"
                        
                        # Criar tar excluindo arquivos temporários e o próprio tar
                        if tar -czf "\$TAR_FILE" --exclude="*.tar.gz" --exclude="*.tmp" .; then
                            echo "✅ Arquivo tar criado com sucesso: \$TAR_FILE"
                            
                            # Verificar se o arquivo foi criado e tem tamanho > 0
                            if [ -s "\$TAR_FILE" ]; then
                                echo "📋 Verificando arquivo criado:"
                                ls -la "\$TAR_FILE"
                                echo "📏 Tamanho do arquivo: \$(du -h "\$TAR_FILE" | cut -f1)"
                                
                                # Upload usando curl com tratamento de erro
                                echo "🔄 Tentando upload para Nexus..."
                                echo "📁 Arquivo: \$TAR_FILE"
                                echo "🌐 URL: ${env.NEXUS_URL}/repository/playwright-evidence/"
                                
                                # Usar flag -k para ignorar problemas de SSL
                                if curl -k -u ${env.NEXUS_USER}:${env.NEXUS_PASS} \
                                     --upload-file "\$TAR_FILE" \
                                     "${env.NEXUS_URL}/repository/playwright-evidence/\$TAR_FILE"; then
                                    echo "✅ Upload concluído com sucesso"
                                    echo "🔗 URL: ${env.NEXUS_URL}/repository/playwright-evidence/\$TAR_FILE"
                                else
                                    echo "❌ Upload falhou - continuando pipeline"
                                    echo "⚠️ Verifique se o repositório 'playwright-evidence' existe no Nexus"
                                    echo "📋 Evidências salvas localmente em: \$EVIDENCE_DIR"
                                fi
                            else
                                echo "❌ Arquivo tar criado mas está vazio"
                                echo "📋 Evidências salvas localmente em: \$EVIDENCE_DIR"
                            fi
                        else
                            echo "❌ Erro ao criar arquivo tar"
                            echo "📋 Evidências salvas localmente em: \$EVIDENCE_DIR"
                        fi
                        
                        # Limpar arquivo tar local após upload (ou falha)
                        rm -f "\$TAR_FILE" 2>/dev/null || true
                    """
                }
            }
        }

    }

    post {
        always {
            script {
                // Gerar relatório Allure
                allure([
                    includeProperties: false,
                    jdk: '',
                    properties: [],
                    reportBuildPolicy: 'ALWAYS',
                    results: [[path: 'allure-results']]
                ])
                
                // Arquivos de evidência
                archiveArtifacts artifacts: 'test-results/**/*', allowEmptyArchive: true
                archiveArtifacts artifacts: 'allure-results/**/*', allowEmptyArchive: true
                archiveArtifacts artifacts: 'allure-report/**/*', allowEmptyArchive: true
                archiveArtifacts artifacts: 'playwright-report/**/*', allowEmptyArchive: true
                
                // Limpar arquivos temporários
                sh '''
                    echo "🧹 Limpando arquivos temporários..."
                    rm -rf /tmp/evidence-upload-* 2>/dev/null || true
                    echo "✅ Limpeza concluída"
                '''
            }
        }
        
        failure {
            echo "❌ Pipeline falhou"
            script {
                // Em caso de falha, tentar salvar evidências mesmo assim
                sh """
                    echo "💾 Tentando salvar evidências mesmo com falha..."
                    EVIDENCE_DIR="/tmp/evidence-failure-${env.BUILD_NUMBER}"
                    mkdir -p "\$EVIDENCE_DIR"
                    
                    # Copiar logs de erro se existirem
                    [ -d "test-results" ] && cp -r test-results "\$EVIDENCE_DIR/" || true
                    [ -d "allure-results" ] && cp -r allure-results "\$EVIDENCE_DIR/" || true
                    [ -d "allure-report" ] && cp -r allure-report "\$EVIDENCE_DIR/" || true
                    [ -d "playwright-report" ] && cp -r playwright-report "\$EVIDENCE_DIR/" || true
                    
                    echo "📋 Evidências de falha salvas em: \$EVIDENCE_DIR"
                """
            }
        }
        
        success {
            echo "✅ Pipeline executado com sucesso"
        }
        
        unstable {
            echo "⚠️ Pipeline executado com instabilidade (testes falharam)"
        }
    }
}
