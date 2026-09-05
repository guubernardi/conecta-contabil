<template>
  <section class="documento">
    <div class="conteudo">
      <div class="cabecalho">
        <h1>Política de Privacidade</h1>
        <p class="atualizacao">Última atualização: {{ ATUALIZADO_EM }}</p>
      </div>

      <p>Esta Política descreve como a {{ NEGOCIO.razaoSocial }}, aqui chamada de {{ NEGOCIO.nome }}, coleta, usa, armazena e protege dados pessoais de visitantes deste site e de clientes dos seus serviços contábeis. Ela segue a Lei Geral de Proteção de Dados Pessoais (Lei 13.709/2018).</p>

      <h2>1. Quem é o controlador dos dados</h2>
      <p>A {{ NEGOCIO.nome }} é a controladora dos dados pessoais tratados neste site e na prestação dos seus serviços. Para qualquer assunto relacionado a privacidade, o contato é {{ NEGOCIO.email }}.</p>

      <h2>2. Quais dados coletamos</h2>
      <p>Coletamos apenas o que é necessário para atender você e para cumprir as obrigações legais da atividade contábil:</p>
      <ul>
        <li><strong>Dados de contato:</strong> nome, telefone e e-mail, informados por você ao iniciar uma conversa pelo WhatsApp ou por e-mail a partir deste site.</li>
        <li><strong>Dados de navegação:</strong> endereço IP, tipo de dispositivo, navegador e páginas visitadas, coletados de forma agregada para entender o uso do site.</li>
        <li><strong>Dados da empresa cliente:</strong> razão social, CNPJ, endereço, dados de sócios, notas fiscais, extratos, folha de pagamento e documentos fiscais entregues por você durante a prestação do serviço.</li>
        <li><strong>Dados de terceiros:</strong> informações de funcionários e prestadores da empresa cliente, quando necessárias para folha de pagamento e obrigações acessórias.</li>
      </ul>

      <h2>3. Por que tratamos esses dados</h2>
      <p>Cada tratamento tem uma base legal definida na LGPD:</p>
      <ul>
        <li>Responder a contatos e apresentar propostas, com base no seu consentimento e nos procedimentos preliminares de contrato.</li>
        <li>Executar o contrato de prestação de serviços contábeis, incluindo escrituração, apuração de tributos e departamento pessoal.</li>
        <li>Cumprir obrigações legais e regulatórias perante Receita Federal, Secretarias de Fazenda, prefeituras, Conselho Regional de Contabilidade e demais órgãos.</li>
        <li>Exercer regularmente direitos em processos administrativos ou judiciais.</li>
      </ul>

      <h2>4. Com quem compartilhamos</h2>
      <p>Não vendemos dados pessoais e não os cedemos para fins publicitários de terceiros. O compartilhamento ocorre apenas quando é indispensável:</p>
      <ul>
        <li>Com órgãos públicos e entidades reguladoras, no cumprimento de obrigações acessórias e fiscais.</li>
        <li>Com fornecedores de tecnologia que operam nossos sistemas de contabilidade, armazenamento e comunicação, sempre sob contrato e obrigação de confidencialidade.</li>
        <li>Com instituições financeiras, quando você autoriza a integração de extratos para conciliação.</li>
        <li>Por determinação legal, ordem judicial ou requisição de autoridade competente.</li>
      </ul>

      <h2>5. Por quanto tempo guardamos</h2>
      <p>Dados de contato de quem não se tornou cliente são mantidos por até 12 meses. Documentos contábeis, fiscais e trabalhistas são guardados pelos prazos legais de conservação, que podem chegar a 5 anos para matéria fiscal e a 30 anos para matéria previdenciária, contados na forma da legislação aplicável. Encerrado o prazo, os dados são eliminados ou anonimizados.</p>

      <h2>6. Como protegemos</h2>
      <p>Adotamos controles de acesso por perfil, autenticação individual, criptografia em trânsito, backup periódico e acordos de confidencialidade com toda a equipe. O acesso aos documentos de um cliente é restrito aos profissionais que atuam naquela conta.</p>
      <p>Nenhum sistema é totalmente imune a incidentes. Caso ocorra um incidente de segurança com risco relevante aos titulares, comunicaremos os afetados e a Autoridade Nacional de Proteção de Dados nos prazos previstos em lei.</p>

      <h2>7. Seus direitos</h2>
      <p>Como titular, você pode a qualquer momento solicitar:</p>
      <ul>
        <li>confirmação de que tratamos seus dados e acesso a eles;</li>
        <li>correção de dados incompletos, inexatos ou desatualizados;</li>
        <li>anonimização, bloqueio ou eliminação de dados desnecessários ou tratados em desconformidade com a lei;</li>
        <li>portabilidade a outro fornecedor, mediante requisição expressa;</li>
        <li>informação sobre com quem compartilhamos seus dados;</li>
        <li>revogação do consentimento, quando essa for a base legal do tratamento.</li>
      </ul>
      <p>Os pedidos devem ser enviados para {{ NEGOCIO.email }} e são respondidos em até 15 dias. Alguns direitos têm limites: não podemos eliminar documentos cuja guarda é exigida por lei enquanto o prazo legal estiver em curso.</p>

      <h2>8. Cookies</h2>
      <p>Este site usa apenas os cookies necessários para o seu funcionamento e para medição agregada de audiência. Você pode bloquear cookies nas configurações do seu navegador, sem prejuízo à leitura do conteúdo.</p>

      <h2>9. Links para outros sites</h2>
      <p>Ao clicar em um botão que leva ao WhatsApp, ao Instagram ou ao LinkedIn, você passa a navegar em plataforma de terceiro, com política de privacidade própria. Esta Política não se aplica a esses ambientes.</p>

      <h2>10. Alterações</h2>
      <p>Podemos atualizar esta Política sempre que houver mudança nos nossos serviços ou na legislação. A data no topo indica a versão vigente. Recomendamos a leitura periódica.</p>

      <h2>11. Lei aplicável e foro</h2>
      <p>Esta Política é regida pela lei brasileira. Fica eleito o foro da comarca de {{ NEGOCIO.endereco.cidade }}, {{ NEGOCIO.endereco.estado }}, para dirimir controvérsias, com renúncia a qualquer outro por mais privilegiado que seja.</p>

      <h2>12. Dados da empresa</h2>
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
