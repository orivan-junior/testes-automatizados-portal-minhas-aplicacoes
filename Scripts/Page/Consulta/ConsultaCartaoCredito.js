import { expect } from '@playwright/test';

/**
 * Page Object para Consulta de Cartão de Crédito GCCS
 * Adaptado para navegação direta após login manual
 */
class ConsultaCartaoCreditoPage {
  constructor(page) {
    this.page = page;
    
    // Seletores baseados no frame "Centro" conforme código de referência
    this.frameContent = page.locator('frame[name="Centro"]').contentFrame();
    
    // Seletores dentro do frame
    this.radioCpfCliente = this.frameContent.getByRole('radio', { name: 'Número do CPF do Cliente' });
    this.inputCpf = this.frameContent.locator('#num_cpf');
    this.selectClasseCartao = this.frameContent.locator('#classe_cartao_credito');
    this.selectAdmCartao = this.frameContent.locator('#adm_cartao_credito');
    this.btnPesquisar = this.frameContent.getByRole('img', { name: 'Pesquisar' });
    
    // Seletores para resultados no frame
    this.proposta = this.frameContent.locator('#proposta');
    this.resultadoGeral = this.frameContent.locator('body'); // Para casos onde resultado não está no #proposta
    
    // Configurar handler de diálogos
    this.page.once('dialog', dialog => {
      console.log(`Dialog message: ${dialog.message()}`);
      dialog.dismiss().catch(() => {});
    });
  }

  /**
   * Navegar diretamente para a página de consulta de cartão de crédito
   * Simplificado conforme código de referência
   */
  async navegarDiretamente() {
    try {
      const url = 'https://www.dsv.bradseg.com.br/admin_frames.asp?URL=https://wsphttp.dsv.bradseg.com.br/GCCS-ConsultaCartaoCredito/iniciarConsultaProposta.do';
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
      
      console.log('✅ Navegou diretamente para a página de consulta de cartão de crédito');
    } catch (error) {
      console.error('❌ Erro ao navegar para consulta de cartão:', error.message);
      throw error;
    }
  }

  async selecionarOpcaoCpf() {
    await this.radioCpfCliente.check();
    console.log('✅ Selecionou opção: CPF do Cliente');
  }

  async preencherCpf(cpf) {
    await this.inputCpf.click();
    await this.inputCpf.fill(cpf);
    await this.inputCpf.press('Enter');
    console.log(`✅ Preencheu CPF: ${cpf}`);
  }

  async selecionarClasseCartao(classe) {
    await this.selectClasseCartao.selectOption(classe);
    console.log(`✅ Selecionou classe do cartão: ${classe}`);
  }

  async selecionarAdmCartao(adm) {
    await this.selectAdmCartao.selectOption(adm);
    console.log(`✅ Selecionou administradora: ${adm}`);
  }

  async clicarPesquisar() {
    await this.btnPesquisar.click();
    console.log('✅ Clicou no botão pesquisar');
  }

  // Métodos de validação simplificados baseados no código de referência
  async validarTextoNaProposta(texto) {
    try {
      // Primeiro tentar no elemento #proposta (para resultados com dados)
      await expect(this.proposta).toContainText(texto, { timeout: 5000 });
      console.log(`✅ Validou texto na proposta: ${texto}`);
    } catch (error) {
      // Se não encontrou no #proposta, procurar na página toda (para "Nada foi encontrado")
      try {
        await expect(this.resultadoGeral).toContainText(texto, { timeout: 5000 });
        console.log(`✅ Validou texto na página: ${texto}`);
      } catch (error2) {
        console.log(`❌ Texto não encontrado nem na proposta nem na página: ${texto}`);
        throw error2;
      }
    }
  }

  // Método específico para validar mensagens de "nada encontrado"
  async validarNadaEncontrado(texto) {
    await expect(this.resultadoGeral).toContainText(texto);
    console.log(`✅ Validou mensagem de nada encontrado: ${texto}`);
  }
}

export { ConsultaCartaoCreditoPage };
