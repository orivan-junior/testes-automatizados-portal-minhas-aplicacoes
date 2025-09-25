import { expect } from '@playwright/test';

/**
 * Page Object para Consulta de Campanha GCCS
 * Adaptado para navegação direta após login manual
 */
class ConsultaCampanhaPage {
  constructor(page) {
    this.page = page;
    
    // Seletores baseados no frame "Centro" conforme código de referência
    this.frameContent = page.locator('frame[name="Centro"]').contentFrame();
    
    // Seletores dentro do frame para consulta de campanha
    this.checkboxPesquisaCampanha = this.frameContent.locator('#pesquisa_campanha');
    this.selectFiltroCodigoCampanha = this.frameContent.locator('#filtro_codigo_campanha');
    this.btnPesquisar = this.frameContent.getByRole('button', { name: 'Pesquisar' });
    
    // Seletores para resultados no frame
    this.searchResult = this.frameContent.locator('#Searchresult');
    this.resultadoGeral = this.frameContent.locator('html'); // Para casos onde resultado não está no #Searchresult
    
    // Configurar handler de diálogos
    this.page.once('dialog', dialog => {
      console.log(`Dialog message: ${dialog.message()}`);
      dialog.dismiss().catch(() => {});
    });
  }

  /**
   * Navegar diretamente para a página de consulta de campanha
   * Baseado na URL fornecida pelo usuário
   */
  async navegarDiretamente() {
    try {
      const url = 'https://www.dsv.bradseg.com.br/admin_frames.asp?URL=https://wsphttp.dsv.bradseg.com.br/GCCS-ConsultaCartaoCredito/iniciarConsultaCpfPreAprovadoCampanha.do';
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
      
      console.log('✅ Navegou diretamente para a página de consulta de campanha');
    } catch (error) {
      console.error('❌ Erro ao navegar para consulta de campanha:', error.message);
      throw error;
    }
  }

  /**
   * Clicar no frame Centro para garantir foco
   */
  async clicarNoFrame() {
    await this.frameContent.locator('html').click();
    console.log('✅ Clicou no frame Centro para garantir foco');
  }

  /**
   * Marcar o checkbox de pesquisa de campanha
   */
  async marcarPesquisaCampanha() {
    await this.checkboxPesquisaCampanha.check();
    console.log('✅ Marcou checkbox de pesquisa de campanha');
  }

  /**
   * Selecionar código da campanha no filtro
   * @param {string} codigo - Código da campanha (ex: '8')
   */
  async selecionarCodigoCampanha(codigo) {
    await this.selectFiltroCodigoCampanha.selectOption(codigo);
    console.log(`✅ Selecionou código da campanha: ${codigo}`);
  }

  /**
   * Clicar no botão pesquisar
   */
  async clicarPesquisar() {
    await this.btnPesquisar.click();
    console.log('✅ Clicou no botão pesquisar');
  }

  /**
   * Validar se o resultado contém o código da campanha
   * @param {string} codigo - Código da campanha esperado
   */
  async validarCodigoCampanha(codigo) {
    try {
      await expect(this.searchResult).toContainText(codigo, { timeout: 10000 });
      console.log(`✅ Validou código da campanha no resultado: ${codigo}`);
    } catch (error) {
      console.log(`❌ Código da campanha não encontrado no resultado: ${codigo}`);
      throw error;
    }
  }

  /**
   * Validar se o resultado contém o nome da campanha
   * @param {string} nome - Nome da campanha esperado
   */
  async validarNomeCampanha(nome) {
    try {
      await expect(this.searchResult).toContainText(nome, { timeout: 10000 });
      console.log(`✅ Validou nome da campanha no resultado: ${nome}`);
    } catch (error) {
      console.log(`❌ Nome da campanha não encontrado no resultado: ${nome}`);
      throw error;
    }
  }

  /**
   * Validar se o resultado contém texto específico
   * @param {string} texto - Texto esperado no resultado
   */
  async validarTextoNoResultado(texto) {
    try {
      // Primeiro tentar no elemento #Searchresult
      await expect(this.searchResult).toContainText(texto, { timeout: 10000 });
      console.log(`✅ Validou texto no resultado: ${texto}`);
    } catch (error) {
      // Se não encontrou no #Searchresult, procurar na página toda
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

export { ConsultaCampanhaPage };
