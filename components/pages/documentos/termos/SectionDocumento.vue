<template>
  <section class="documento">
    <div class="conteudo">
      <div class="cabecalho">
        <h1>Termos de Uso</h1>
        <p class="atualizacao">Última atualização: {{ ATUALIZADO_EM }}</p>
      </div>

      <p>Estes Termos regulam o uso do site da {{ NEGOCIO.razaoSocial }}, aqui chamada de {{ NEGOCIO.nome }}. Ao navegar por este site você declara que leu e concorda com as condições abaixo. Se não concordar, pedimos que não utilize o site.</p>

      <h2>1. O que este site é</h2>
      <p>Este site é um canal institucional. Ele apresenta os serviços contábeis da {{ NEGOCIO.nome }} e oferece formas de entrar em contato com a equipe. Não é uma plataforma de contratação automática, não processa pagamentos e não dá acesso a nenhum sistema de gestão.</p>

      <h2>2. As informações publicadas aqui não são consultoria</h2>
      <p>Os textos deste site, incluindo perguntas frequentes e explicações sobre tributação, têm finalidade informativa e refletem a legislação vigente na data da publicação. Regras fiscais mudam com frequência e a aplicação correta depende da situação concreta de cada empresa.</p>
      <p>Nenhum conteúdo deste site substitui uma análise individual. Decisões tributárias, contábeis ou trabalhistas devem ser tomadas somente após avaliação do caso por um profissional habilitado. A {{ NEGOCIO.nome }} não responde por prejuízos decorrentes de decisões tomadas apenas com base no que está publicado aqui.</p>

      <h2>3. Valores e condições anunciados</h2>
      <p>Os planos e valores exibidos são referências de partida e não constituem proposta vinculante. O preço final depende do volume de documentos, do número de funcionários, da quantidade de canais de venda e do regime tributário da empresa. A contratação só se formaliza por contrato de prestação de serviços assinado pelas partes.</p>

      <h2>4. Contato pelos canais do site</h2>
      <p>Ao clicar nos botões de contato você é direcionado ao WhatsApp ou ao seu aplicativo de e-mail. As mensagens enviadas são tratadas conforme a nossa <NuxtLink to="/documentos/politicas">Política de Privacidade</NuxtLink>.</p>
      <p>Pedimos que não envie por esses canais senhas, certificados digitais ou documentos sigilosos antes de a relação estar formalizada. Canais seguros de envio são combinados no início do contrato.</p>

      <h2>5. Uso permitido</h2>
      <p>Você pode acessar, ler e compartilhar o conteúdo deste site para fins pessoais e informativos. É vedado:</p>
      <ul>
        <li>reproduzir textos, layout ou identidade visual para uso comercial sem autorização escrita;</li>
        <li>utilizar meios automatizados que comprometam a estabilidade ou a disponibilidade do site;</li>
        <li>tentar obter acesso não autorizado a servidores, dados ou áreas restritas;</li>
        <li>apresentar-se como representante da {{ NEGOCIO.nome }} sem autorização.</li>
      </ul>

      <h2>6. Propriedade intelectual</h2>
      <p>A marca, o logotipo, os textos, o layout e os demais elementos deste site pertencem à {{ NEGOCIO.nome }} ou foram licenciados para uso dela, e são protegidos pela legislação de propriedade intelectual. O acesso ao site não transfere nenhum desses direitos.</p>

      <h2>7. Disponibilidade</h2>
      <p>Trabalhamos para manter o site no ar, mas ele pode ficar indisponível por manutenção, falha técnica ou motivo alheio ao nosso controle. A {{ NEGOCIO.nome }} não garante funcionamento ininterrupto nem responde por indisponibilidade temporária.</p>

      <h2>8. Links para terceiros</h2>
      <p>Este site direciona a plataformas de terceiros, como WhatsApp, Instagram e LinkedIn. Não temos controle sobre esses ambientes e não respondemos pelo conteúdo, pela disponibilidade ou pelas práticas de privacidade deles.</p>

      <h2>9. Responsabilidade profissional</h2>
      <p>A responsabilidade técnica pelos serviços contábeis prestados pela {{ NEGOCIO.nome }} é exercida por contador registrado no Conselho Regional de Contabilidade, nos termos da legislação do Conselho Federal de Contabilidade. Os limites e as obrigações de cada serviço são definidos no contrato firmado com o cliente, que prevalece sobre estes Termos em caso de divergência.</p>

      <h2>10. Alterações destes Termos</h2>
      <p>Podemos alterar estes Termos a qualquer momento, para acompanhar mudanças nos serviços ou na legislação. A versão vigente é sempre a publicada nesta página, com a data indicada no topo.</p>

      <h2>11. Lei aplicável e foro</h2>
      <p>Estes Termos são regidos pela legislação brasileira. Fica eleito o foro da comarca de {{ NEGOCIO.endereco.cidade }}, {{ NEGOCIO.endereco.estado }}, para dirimir qualquer controvérsia, com renúncia a qualquer outro por mais privilegiado que seja.</p>

      <h2>12. Contato</h2>
      <ul>
        <li>Razão social: {{ NEGOCIO.razaoSocial }}</li>
        <li>Endereço: {{ enderecoCompleto() }}</li>
        <li>E-mail: {{ NEGOCIO.email }}</li>
        <li>Telefone: {{ NEGOCIO.telefone }}</li>
      </ul>
    </div>

    <ElementosOnda direcao="descendo" cor-frente="var(--cor-azul-escuro)" cor-atras="var(--cor-azul-medio)" cor-linha="var(--cor-azul-medio)" />
  </section>
</template>

<script setup>
import { NEGOCIO, enderecoCompleto } from '~/helpers/negocio'

// PROVISORIO: modelo redigido para uma contabilidade, mas precisa de revisao
// juridica e da data real de publicacao antes de ir ao ar.
const ATUALIZADO_EM = 'setembro de 2026'
</script>

<style lang="sass" scoped>
section.documento
  position: relative
  display: flex
  align-items: flex-start
  justify-content: center
  width: 100%
  padding: 160px 40px 200px 40px
  background-color: var(--cor-branco)

  .conteudo
    width: 100%
    max-width: 860px

.cabecalho
  padding: 0 0 30px 0
  border-bottom: 1px solid var(--cor-cinza-claro)

  h1
    font-family: var(--bold)
    font-size: var(--f9)
    color: var(--cor-azul-escuro)
    line-height: 1.2

  .atualizacao
    margin: 14px 0 0 0
    font-family: var(--light)
    font-size: var(--f1)
    color: var(--cor-cinza)

.conteudo
  h2
    margin: 44px 0 16px 0
    font-family: var(--bold)
    font-size: var(--f5)
    color: var(--cor-azul-escuro)
    line-height: 1.4

  h3
    margin: 28px 0 12px 0
    font-family: var(--bold)
    font-size: var(--f3)
    color: var(--cor-azul-escuro)
    line-height: 1.4

  p
    margin: 0 0 16px 0
    font-family: var(--light)
    font-size: var(--f2)
    color: var(--cor-cinza)
    line-height: 1.8

    strong
      font-family: var(--bold)
      color: var(--cor-azul-escuro)

  ul,
  ol
    margin: 0 0 16px 0
    padding: 0 0 0 22px

    li
      margin: 0 0 10px 0
      font-family: var(--light)
      font-size: var(--f2)
      color: var(--cor-cinza)
      line-height: 1.8

      strong
        font-family: var(--bold)
        color: var(--cor-azul-escuro)

  a
    color: var(--cor-azul)
    text-decoration: underline

.cabecalho + p
  margin: 34px 0 16px 0

@media screen and (max-width: 1000px)
  section.documento
    padding: 110px 20px 130px 20px

  .cabecalho
    padding: 0 0 22px 0

  .conteudo h2
    margin: 34px 0 14px 0
</style>
