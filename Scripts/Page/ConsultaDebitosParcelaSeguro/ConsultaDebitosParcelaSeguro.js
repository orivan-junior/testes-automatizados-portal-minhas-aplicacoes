import { expect } from '@playwright/test';

/**
 * Page Object para Consulta de Débitos de Parcela Seguro Cartão GCCS
 * Adaptado para navegação direta após login manual
 */
class ConsultaDebitosParcelaSeguroPage {
  constructor(page) {
    this.page = page;
    
    // Seletores baseados no frame "Centro" conforme código de referência
    this.frameContent = page.locator('frame[name="Centro"]').contentFrame();
    
    // Seletores dentro do frame para consulta de débitos de parcela seguro
    this.checkboxPesquisaCodigoCartao = this.frameContent.locator('#pesquisa_codigo_cartao');
    this.inputFiltroCodigoCartao = this.frameContent.locator('#filtro_codigo_cartao');
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
   * Navegar diretamente para a página de consulta de débitos de parcela seguro
   * Baseado na URL fornecida pelo usuário
   */
  async navegarDiretamente() {
    try {
      const url = 'https://www.dsv.bradseg.com.br/admin_frames.asp?URL=https://wsphttp.dsv.bradseg.com.br/GCCS-ConsultaCartaoCredito/iniciarParcelaSeguroCliente.do';
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
      
      console.log('✅ Navegou diretamente para a página de consulta de débitos de parcela seguro');
    } catch (error) {
      console.error('❌ Erro ao navegar para consulta de débitos de parcela seguro:', error.message);
      throw error;
    }
  }

  /**
   * Marcar o checkbox de pesquisa por código do cartão
   */
  async marcarPesquisaCodigoCartao() {
    await this.checkboxPesquisaCodigoCartao.check();
    console.log('✅ Marcou checkbox de pesquisa por código do cartão');
  }

  /**
   * Clicar no campo de filtro de código do cartão
   */
  async clicarFiltroCodigoCartao() {
    await this.inputFiltroCodigoCartao.click();
    console.log('✅ Clicou no campo de filtro de código do cartão');
  }

  /**
   * Preencher o código do cartão no filtro
   * @param {string} codigo - Código do cartão (ex: '1')
   */
  async preencherCodigoCartao(codigo) {
    await this.inputFiltroCodigoCartao.fill(codigo);
    console.log(`✅ Preencheu código do cartão: ${codigo}`);
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
      await expect(this.searchResult).toContainText(cpf, { timeout: 10000 });
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
      await expect(this.searchResult).toContainText(nome, { timeout: 10000 });
      console.log(`✅ Validou nome do cliente no resultado: ${nome}`);
    } catch (error) {
      console.log(`❌ Nome do cliente não encontrado no resultado: ${nome}`);
      throw error;
    }
  }

  /**
   * Validar se o resultado contém a administradora
   * @param {string} administradora - Administradora esperada (ex: '40003 - PRJR')
   */
  async validarAdministradora(administradora) {
    try {
      await expect(this.searchResult).toContainText(administradora, { timeout: 10000 });
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

export { ConsultaDebitosParcelaSeguroPage };
