import { defineConfig } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';

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
    ['html', { outputFolder: 'playwright-report', open: 'never' }]
    // ['./wordReporter.js'], // Relatório em Word
  ],
  use: {
    viewport: { width: 1280, height: 720 }, // Define viewport para  hd
    video: 'on', // Captura vídeo para todos os testes
    ignoreHTTPSErrors: true, // Ignora erros de HTTPS
    headless: false, // Executa no modo headless
    // baseURL: 'https://wwwn.dsv.bradescoseguros.com.br/pnegocios2/wps/portal/portaldenegociosnovo/!ut/p/z1/hU7LCsIwEPwWDz2aXWuR6i0IFqUVRNC6F0lr-oA2KUlU_HsDXtXObZ4MEORASjzaWrhWK9F5fqHFNU3SLS7jcI_rTYgHfjpGSRbOoiyC81iAvI0_wNH3aSyyA6o7XXzecFXM4xrIyEoaadjdeLlxbrCrAAO0zj8vLXNS9JaVN8V0VbWlZEq6AL8NNNo6yP_1YOhznFLxevLJ5A0FAdjh/dz/d5/L2dBISEvZ0FBIS9nQSEh/',
    trace: 'on', // Captura traces para todos os testes
    screenshot: 'only-on-failure', // Captura screenshots apenas em caso de falha
    //screenshot: 'on', // Captura screenshots para todos os testes
    //video: 'on-first-retry', // Captura vídeo apenas na primeira tentativa
    

  },
  projects: [
    {
      name: 'Sistran',
      use: {
        browserName: 'chromium',
        channel: 'chrome', // Usa o Chrome instalado no sistema
        launchOptions: {
          executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', // Caminho padrão do Chrome
          args: [
            '--no-sandbox', // Desativa o sandbox (se necessário)
            '--disable-setuid-sandbox', // Desativa setuid sandbox
            '--disable-dev-shm-usage', // Desativa /dev/shm usage
            '--disable-accelerated-2d-canvas', // Desativa aceleração 2D canvas
            '--no-first-run', // Pula a primeira execução
            '--no-zygote', // Desativa zygote
            '--disable-gpu', // Desativa GPU
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