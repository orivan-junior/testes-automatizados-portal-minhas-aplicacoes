import { defineConfig } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';
import dotenv from 'dotenv';

// Carrega variáveis de ambiente do .env (se existir)
dotenv.config();

// Credenciais de HTTP Basic/Digest via variáveis de ambiente
const dsvUsername = process.env.DSV_USERNAME;
const dsvPassword = process.env.DSV_PASSWORD;
const httpCredentials = dsvUsername && dsvPassword
  ? { username: dsvUsername, password: dsvPassword }
  : undefined;

const testDir = defineBddConfig({
  features: 'Scenarios/**/**/*.feature', // Caminho para os arquivos .feature
  steps: '{Scripts,Support}/**/**/*.js', // Caminho para os arquivos .steps
});

export default defineConfig({
  testDir,
  timeout: 1200000, // Tempo limite de 20 minutos (aumentado para dar mais tempo)
  // Configurações globais para melhorar carregamento de recursos
  reporter: [
    ['list'],
    ['allure-playwright', { outputFolder: 'allure-results' }],
    ['html', { outputFolder: 'playwright-report', open: 'never' }]
    // ['./wordReporter.js'], // Relatório em Word
  ],
  use: {
    viewport: { width: 1280, height: 720 }, // Define viewport para  hd
    video: 'on', // Captura vídeo para todos os testes
    ignoreHTTPSErrors: true, // Ignora erros de HTTPS
    headless: process.env.CI === 'true' ? true : false, // Headless no CI, visível localmente
    // Autenticação HTTP (Basic/Digest) automática quando o servidor solicitar
    httpCredentials,
    // baseURL: 'https://wwwn.dsv.bradescoseguros.com.br/pnegocios2/wps/portal/portaldenegociosnovo/!ut/p/z1/hU7LCsIwEPwWDz2aXWuR6i0IFqUVRNC6F0lr-oA2KUlU_HsDXtXObZ4MEORASjzaWrhWK9F5fqHFNU3SLS7jcI_rTYgHfjpGSRbOoiyC81iAvI0_wNH3aSyyA6o7XXzecFXM4xrIyEoaadjdeLlxbrCrAAO0zj8vLXNS9JaVN8V0VbWlZEq6AL8NNNo6yP_1YOhznFLxevLJ5A0FAdjh/dz/d5/L2dBISEvZ0FBIS9nQSEh/',
    trace: 'on', // Captura traces para todos os testes
    screenshot: 'on', // Captura screenshots para todos os testes
    video: 'on', // Captura vídeos para todos os testes
    

  },
  projects: [
    {
      name: 'Sistran',
      use: {
        browserName: 'chromium',
        // Remove channel e executablePath para usar o Chromium do Playwright
        launchOptions: {
          args: [
            '--no-sandbox', // Desativa o sandbox (necessário para Jenkins)
            '--disable-setuid-sandbox', // Desativa setuid sandbox
            '--disable-dev-shm-usage', // Desativa /dev/shm usage
            '--disable-accelerated-2d-canvas', // Desativa aceleração 2D canvas
            '--no-first-run', // Pula a primeira execução
            '--no-zygote', // Desativa zygote
            '--disable-gpu', // Desativa GPU
            '--disable-web-security', // Desativa segurança web (se necessário)
            '--disable-features=VizDisplayCompositor', // Desativa compositor
          ],
        },
      },
    },
    // Outros navegadores podem ser adicionados aqui, se necessário
    // {
    //   name: 'Firefox',
    //   use: { browserName: 'firefox' },
    // },
    // {
    //   name: 'WebKit',
    //   use: { browserName: 'webkit' },
    // },
  ],
});