import { expect } from '@playwright/test';

/**
 * Page Object para Relatório de Pontuação GCCS
 * Adaptado para navegação direta após login manual
 */
class RelatorioPontuacaoPage {
  constructor(page) {
    this.page = page;
    
    // Seletores baseados no frame "Centro" conforme código de referência
    this.frameContent = page.locator('frame[name="Centro"]').contentFrame();
    
    // Seletores dentro do frame para relatório de pontuação
    this.linkRelatorioPontuacao = this.frameContent.getByRole('link', { name: 'Nessa opção, você pode' });
    this.checkboxPesquisaCpf = this.frameContent.locator('#pesquisa_cpf');
    this.inputFiltroCpf = this.frameContent.locator('#filtro_cpf_cpf');
    this.selectFiltroCartao = this.frameContent.locator('#filtro_cpf_cartao');
    this.selectFiltroCia = this.frameContent.locator('#filtro_cpf_cia');
    this.selectFiltroSituacao = this.frameContent.locator('#filtro_cpf_situacao');
    this.btnPesquisar = this.frameContent.getByRole('button', { name: 'Pesquisar' });
    
    // Seletores para resultados no frame
    this.theadResult = this.frameContent.locator('thead');
    this.resultadoGeral = this.frameContent.locator('html'); // Para casos onde resultado não está no thead
    
    // Configurar handler de diálogos
    this.page.once('dialog', dialog => {
      console.log(`Dialog message: ${dialog.message()}`);
      dialog.dismiss().catch(() => {});
    });
  }

  /**
   * Navegar diretamente para a página de relatórios
   * Baseado na URL fornecida pelo usuário
   */
  async navegarDiretamente() {
    try {
      const url = 'https://www.dsv.bradseg.com.br/admin_frames.asp?URL=https://wsphttp.dsv.bradseg.com.br/GCCS-ConsultaCartaoCredito/menuRelatorios.do';
      console.log(`🌐 Navegando diretamente para: ${url}`);
      
      // Tentar navegação com retry para problemas de rede
      let tentativas = 0;
      const maxTentativas = 3;
      
      while (tentativas < maxTentativas) {
        try {
          await this.page.goto(url, { timeout: 60000 });
          break; // Se chegou aqui, deu certo
        } catch (error) {
          tentativas++;
          if (error.message.includes('ERR_NETWORK_CHANGED') && tentativas < maxTentativas) {
            console.log(`⚠️ Erro de rede (tentativa ${tentativas}/${maxTentativas}), tentando novamente...`);
            await this.page.waitForTimeout(3000); // Aguardar 3 segundos antes de tentar novamente
          } else {
            throw error; // Se não é erro de rede ou esgotou tentativas, relançar erro
          }
        }
      }
      
      console.log('✅ Navegou diretamente para a página de relatórios');
    } catch (error) {
      console.error('❌ Erro ao navegar para página de relatórios:', error.message);
      throw error;
    }
  }

  /**
   * Clicar no link de relatório de pontuação
   */
  async clicarRelatorioPontuacao() {
    await this.linkRelatorioPontuacao.click();
    console.log('✅ Clicou no link de relatório de pontuação');
  }

  /**
   * Marcar o checkbox de pesquisa por CPF
   */
  async marcarPesquisaCpf() {
    await this.checkboxPesquisaCpf.check();
    console.log('✅ Marcou checkbox de pesquisa por CPF');
  }

  /**
   * Clicar no campo de filtro de CPF
   */
  async clicarFiltroCpf() {
    await this.inputFiltroCpf.click();
    console.log('✅ Clicou no campo de filtro de CPF');
  }

  /**
   * Preencher o CPF no filtro
   * @param {string} cpf - CPF (ex: '144.932.537-89')
   */
  async preencherCpf(cpf) {
    await this.inputFiltroCpf.fill(cpf);
    await this.inputFiltroCpf.press('Enter');
    console.log(`✅ Preencheu CPF: ${cpf}`);
  }

  /**
   * Clicar no campo de filtro de cartão para habilitar
   */
  async clicarFiltroCartao() {
    await this.selectFiltroCartao.click();
    console.log('✅ Clicou no campo de filtro de cartão para habilitar');
  }

  /**
   * Selecionar cartão no filtro
   * @param {string} cartao - Número do cartão (ex: '4066082982988294')
   */
  async selecionarCartao(cartao) {
    await this.selectFiltroCartao.selectOption(cartao);
    console.log(`✅ Selecionou cartão: ${cartao}`);
  }

  /**
   * Selecionar CIA no filtro
   * @param {string} cia - Código da CIA (ex: '531')
   */
  async selecionarCia(cia) {
    await this.selectFiltroCia.selectOption(cia);
    console.log(`✅ Selecionou CIA: ${cia}`);
  }

  /**
   * Selecionar situação no filtro
   * @param {string} situacao - Código da situação (ex: 'PE')
   */
  async selecionarSituacao(situacao) {
    await this.selectFiltroSituacao.selectOption(situacao);
    console.log(`✅ Selecionou situação: ${situacao}`);
  }

  /**
   * Clicar no botão pesquisar
   */
  async clicarPesquisar() {
    await this.btnPesquisar.click();
    console.log('✅ Clicou no botão pesquisar');
  }

  /**
   * Validar se o resultado contém o CPF
   * @param {string} cpf - CPF esperado
   */
  async validarCpf(cpf) {
    try {
      await expect(this.theadResult).toContainText(cpf, { timeout: 10000 });
      console.log(`✅ Validou CPF no resultado: ${cpf}`);
    } catch (error) {
      console.log(`❌ CPF não encontrado no resultado: ${cpf}`);
      throw error;
    }
  }

  /**
   * Validar se o resultado contém o nome do cliente
   * @param {string} nome - Nome do cliente esperado
   */
  async validarNomeCliente(nome) {
    try {
      await expect(this.theadResult).toContainText(nome, { timeout: 10000 });
      console.log(`✅ Validou nome do cliente no resultado: ${nome}`);
    } catch (error) {
      console.log(`❌ Nome do cliente não encontrado no resultado: ${nome}`);
      throw error;
    }
  }

  /**
   * Validar se o resultado contém o número do cartão
   * @param {string} numeroCartao - Número do cartão esperado
   */
  async validarNumeroCartao(numeroCartao) {
    try {
      await expect(this.theadResult).toContainText(numeroCartao, { timeout: 10000 });
      console.log(`✅ Validou número do cartão no resultado: ${numeroCartao}`);
    } catch (error) {
      console.log(`❌ Número do cartão não encontrado no resultado: ${numeroCartao}`);
      throw error;
    }
  }

  /**
   * Validar se o resultado contém a classe do cartão
   * @param {string} classe - Classe do cartão esperada (ex: 'PLATINUM')
   */
  async validarClasseCartao(classe) {
    try {
      await expect(this.theadResult).toContainText(classe, { timeout: 10000 });
      console.log(`✅ Validou classe do cartão no resultado: ${classe}`);
    } catch (error) {
      console.log(`❌ Classe do cartão não encontrada no resultado: ${classe}`);
      throw error;
    }
  }

  /**
   * Validar se o resultado contém a administradora
   * @param {string} administradora - Administradora esperada (ex: 'PRJR')
   */
  async validarAdministradora(administradora) {
    try {
      await expect(this.theadResult).toContainText(administradora, { timeout: 10000 });
      console.log(`✅ Validou administradora no resultado: ${administradora}`);
    } catch (error) {
      console.log(`❌ Administradora não encontrada no resultado: ${administradora}`);
      throw error;
    }
  }

  /**
   * Validar se o resultado contém texto específico
   * @param {string} texto - Texto esperado no resultado
   */
  async validarTextoNoResultado(texto) {
    try {
      // Primeiro tentar no elemento thead
      await expect(this.theadResult).toContainText(texto, { timeout: 10000 });
      console.log(`✅ Validou texto no resultado: ${texto}`);
    } catch (error) {
      // Se não encontrou no thead, procurar na página toda
      try {
        await expect(this.resultadoGeral).toContainText(texto, { timeout: 10000 });
        console.log(`✅ Validou texto na página: ${texto}`);
      } catch (error2) {
        console.log(`❌ Texto não encontrado nem no resultado nem na página: ${texto}`);
        throw error2;
      }
    }
  }

  /**
   * Método específico para validar mensagens de "nada encontrado"
   * @param {string} texto - Texto da mensagem de erro esperada
   */
  async validarNadaEncontrado(texto) {
    await expect(this.resultadoGeral).toContainText(texto);
    console.log(`✅ Validou mensagem de nada encontrado: ${texto}`);
  }
}

export { RelatorioPontuacaoPage };
