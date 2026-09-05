<template>
  <section class="perguntas" id="perguntas">
    <div class="conteudo">
      <div class="coluna">
        <div class="cabecalho revela" v-revelar>
          <div class="etiqueta">Perguntas frequentes</div>
          <h2>
            O que todo mundo pergunta
            <span>antes de trocar de contador</span>
          </h2>
        </div>

        <div class="fecho revela" v-revelar="120">
          <p>Ficou com outra dúvida?</p>
          <a :href="linkWhatsapp(MENSAGEM_DUVIDA)" target="_blank" rel="noopener">Pergunte direto no WhatsApp</a>
        </div>
      </div>

      <div class="lista">
        <div class="item revela" :class="{ aberto: abertaEm === i }" v-for="(pergunta, i) in PERGUNTAS" :key="pergunta.titulo" v-revelar="i * 70">
          <button :id="`pergunta-${i}`" :aria-expanded="abertaEm === i" :aria-controls="`resposta-${i}`" @click="alternar(i)">
            <span>{{ pergunta.titulo }}</span>
            <div class="sinal" aria-hidden="true">
              <i></i>
              <i></i>
            </div>
          </button>

          <div class="resposta" :id="`resposta-${i}`" role="region" :aria-labelledby="`pergunta-${i}`">
            <div class="interno">
              <p>{{ pergunta.texto }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <ElementosOnda direcao="descendo" cor-frente="var(--cor-azul)" cor-atras="var(--cor-azul-suave)" cor-linha="var(--cor-azul-suave)" />
  </section>
</template>

<script setup>
import { NEGOCIO, linkWhatsapp } from '~/helpers/negocio'

const MENSAGEM_DUVIDA = 'Olá! Tenho uma dúvida sobre a contabilidade do meu negócio digital.'

const PERGUNTAS = [
  {
    titulo: 'Trocar de contador dá trabalho para mim?',
    texto: 'Quase nenhum. Você assina uma procuração e nos apresenta ao contador atual. A partir daí somos nós que pedimos os arquivos, conferimos o que veio e resolvemos as pendências encontradas. O processo leva até 15 dias e a sua operação não para.'
  },
  {
    titulo: 'Vocês atendem quem ainda não abriu empresa?',
    texto: 'Sim, e a abertura sai sem custo de honorário para quem contrata um plano. Cuidamos do contrato social, do CNPJ, da inscrição municipal, do certificado digital e do enquadramento tributário. Você só paga as taxas obrigatórias dos órgãos.'
  },
  {
    titulo: 'Como funciona a conciliação de marketplace?',
    texto: 'Recebemos os relatórios de repasse de cada canal, cruzamos com o extrato da conta PJ e com as notas emitidas. Taxas, comissões, estornos e antecipações entram cada um na conta certa, então a apuração fecha com o que realmente caiu no caixa.'
  },
  {
    titulo: 'Quanto tempo demora para vocês responderem?',
    texto: 'O nosso compromisso é responder em até 1 dia útil, e na prática a maioria das mensagens é respondida no mesmo dia. Você fala com o contador responsável pela sua conta, não com um atendimento genérico que precisa consultar alguém.'
  },
  {
    titulo: 'Vocês emitem as notas fiscais por mim?',
    texto: 'Sim. Nos planos com emissão inclusa, você envia os dados e a gente emite. Se preferir emitir por conta própria ou por integração com a sua plataforma, configuramos o ambiente e revisamos os primeiros meses para garantir que a tributação está certa.'
  },
  {
    titulo: 'Meu faturamento é baixo. Ainda vale a pena?',
    texto: 'Vale, principalmente no começo. É justamente na fase inicial que uma escolha errada de regime ou de anexo custa caro pelos anos seguintes. O plano Início existe para esse momento e acompanha o negócio até o faturamento crescer.'
  },
  {
    titulo: 'Existe fidelidade ou multa para sair?',
    texto: 'Não. O contrato é mensal e sem fidelidade. Se você decidir sair, entregamos toda a documentação contábil e fiscal organizada para o próximo escritório, sem cobrar taxa de saída e sem segurar arquivo.'
  }
]

const abertaEm = ref(0)

function alternar(indice) {
  abertaEm.value = abertaEm.value === indice ? null : indice
}

// o JSON-LD sai do mesmo array que renderiza o acordeao, entao os dois nunca divergem
useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        '@id': `${NEGOCIO.dominio}/#faq`,
        mainEntity: PERGUNTAS.map((pergunta) => ({
          '@type': 'Question',
          name: pergunta.titulo,
          acceptedAnswer: { '@type': 'Answer', text: pergunta.texto }
        }))
      })
    }
  ]
})
</script>

<style lang="sass" scoped>
section.perguntas
  position: relative
  display: flex
  align-items: center
  justify-content: center
  width: 100%
  padding: 80px 40px 190px 40px
  background-color: var(--cor-branco)

  .conteudo
    display: grid
    grid-template-columns: 1fr 1.6fr
    align-items: start
    width: 100%
    max-width: var(--largura)
    gap: 70px

// a coluna da esquerda e curta e a lista e longa: grudar acompanha a rolagem
.coluna
  position: sticky
  top: 130px
  display: flex
  flex-direction: column
  align-items: flex-start

.cabecalho
  display: flex
  flex-direction: column
  align-items: flex-start

  .etiqueta
    padding: 9px 18px 9px 18px
    border: 1px solid var(--cor-cinza-claro)
    border-radius: 100px
    font-family: var(--bold)
    font-size: var(--f0)
    color: var(--cor-azul)
    text-transform: uppercase
    letter-spacing: 1.4px

  h2
    margin: 24px 0 0 0
    font-family: var(--light)
    font-size: var(--f9)
    color: var(--cor-azul-escuro)
    line-height: 1.25

    span
      display: block
      font-family: var(--bold)
      color: var(--cor-azul)

.lista
  display: flex
  flex-direction: column
  width: 100%
  gap: 14px

.item
  width: 100%
  border: 1px solid var(--cor-cinza-claro)
  border-radius: 26px
  background-color: var(--cor-branco)
  transition: border-color 0.3s, box-shadow 0.3s

  button
    display: flex
    align-items: center
    justify-content: space-between
    width: 100%
    padding: 26px 28px 26px 28px
    gap: 20px
    background-color: transparent
    text-align: left

    span
      font-family: var(--bold)
      font-size: var(--f3)
      color: var(--cor-azul-escuro)
      line-height: 1.45

  .resposta
    display: grid
    grid-template-rows: 0fr
    visibility: hidden
    transition: grid-template-rows 0.35s cubic-bezier(0.22, 1, 0.36, 1), visibility 0.35s

    .interno
      overflow: hidden

    p
      padding: 0 28px 26px 28px
      font-family: var(--light)
      font-size: var(--f2)
      color: var(--cor-cinza)
      line-height: 1.75

.sinal
  position: relative
  display: flex
  align-items: center
  justify-content: center
  width: 34px
  min-width: 34px
  height: 34px
  border-radius: 100px
  background-color: var(--cor-azul-claro)
  transition: background-color 0.3s

  i
    position: absolute
    width: 13px
    height: 2px
    border-radius: 2px
    background-color: var(--cor-azul)
    transition: transform 0.3s, background-color 0.3s

  // a segunda barra em pe vira o sinal de mais; deitar de novo fecha pro menos
  i:last-child
    transform: rotate(90deg)

.item.aberto
  border-color: var(--cor-azul-suave)
  box-shadow: var(--sombra-card)

  .resposta
    grid-template-rows: 1fr
    visibility: visible

  .sinal
    background-color: var(--cor-azul)

    i
      background-color: var(--cor-branco)

    i:last-child
      transform: rotate(0deg)

.fecho
  display: flex
  flex-direction: column
  align-items: flex-start
  margin: 34px 0 0 0
  gap: 4px

  p
    font-family: var(--light)
    font-size: var(--f2)
    color: var(--cor-cinza)

  a
    font-family: var(--bold)
    font-size: var(--f2)
    color: var(--cor-azul)
    text-decoration: underline
    transition: color 0.3s

    &:hover
      color: var(--cor-azul-escuro)

@media (prefers-reduced-motion: reduce)
  .item .resposta
    transition: none

@media screen and (max-width: 1000px)
  section.perguntas
    padding: 80px 20px 120px 20px

    .conteudo
      grid-template-columns: 1fr
      gap: 36px

  // no mobile a coluna vira so o topo da secao, entao grudar nao faz sentido
  .coluna
    position: static

  .lista
    gap: 12px

  .item
    border-radius: 20px

    button
      padding: 22px 20px 22px 20px
      gap: 14px

    .resposta
      padding: 0 20px 22px 20px

  .fecho
    margin: 26px 0 0 0
</style>
