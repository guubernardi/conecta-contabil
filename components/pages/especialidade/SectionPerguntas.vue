<template>
  <section class="perguntas-especialidade">
    <div class="conteudo">
      <div class="cabecalho revela" v-revelar>
        <div class="etiqueta">Suporte Conecta</div>
        <h2>
          Dúvidas frequentes
          <span>de quem trabalha com {{ area.menu.toLowerCase() }}</span>
        </h2>
      </div>

      <div class="lista">
        <div class="item revela" :class="{ aberto: abertaEm === i }" v-for="(pergunta, i) in area.perguntas" :key="pergunta.titulo" v-revelar="i * 70">
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

      <div class="acoes revela" v-revelar>
        <ElementosBotao texto="Abrir minha empresa" :link="linkWhatsapp(MENSAGEM_ABERTURA)" externo icone="predio-comercial" estilo="principal" />
        <ElementosBotao texto="Trocar de contador" :link="linkWhatsapp(MENSAGEM_TROCA)" externo icone="seta-trocar-horizontal" estilo="secundario" />
      </div>

      <div class="outras revela" v-revelar>
        <h3>Outras especialidades</h3>
        <div class="grade">
          <NuxtLink v-for="outra in outras" :key="outra.slug" :to="`/especialidades/${outra.slug}`">
            <SvgIcone :nome="outra.icone" :tamanho="20" />
            <span>{{ outra.titulo }}</span>
          </NuxtLink>
        </div>
      </div>
    </div>

    <ElementosOnda direcao="descendo" cor-frente="var(--cor-azul)" cor-atras="var(--cor-azul-suave)" cor-linha="var(--cor-azul-suave)" />
  </section>
</template>

<script setup>
import { NEGOCIO, linkWhatsapp, MENSAGEM_ABERTURA, MENSAGEM_TROCA } from '~/helpers/negocio'
import { ESPECIALIDADES } from '~/helpers/especialidades'

const props = defineProps({
  area: { type: Object, required: true }
})

const outras = computed(() => ESPECIALIDADES.filter((item) => item.slug !== props.area.slug))

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
        '@id': `${NEGOCIO.dominio}/especialidades/${props.area.slug}#faq`,
        mainEntity: props.area.perguntas.map((pergunta) => ({
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
section.perguntas-especialidade
  position: relative
  display: flex
  align-items: center
  justify-content: center
  width: 100%
  padding: 100px 40px 190px 40px
  background-color: var(--cor-branco)

  .conteudo
    display: flex
    flex-direction: column
    align-items: center
    width: 100%
    max-width: var(--largura)

.cabecalho
  display: flex
  flex-direction: column
  align-items: center
  text-align: center

  .etiqueta
    font-family: var(--bold)
    font-size: var(--f0)
    color: var(--cor-cinza)
    text-transform: uppercase
    letter-spacing: 3px

  h2
    margin: 20px 0 0 0
    font-family: var(--light)
    font-size: var(--f9)
    color: var(--cor-azul-escuro)
    line-height: 1.22

    span
      display: block
      font-family: var(--bold)
      color: var(--cor-azul)

.lista
  display: flex
  flex-direction: column
  width: 100%
  max-width: 940px
  margin: 46px 0 0 0
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

  // grid de 0fr pra 1fr e o unico jeito em CSS puro de animar ate altura auto.
  // visibility tira o texto fechado da arvore de acessibilidade e da tabulacao
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

.acoes
  display: flex
  align-items: center
  margin: 44px 0 0 0
  gap: 16px

.outras
  width: 100%
  max-width: 1180px
  margin: 60px 0 0 0
  padding: 44px 0 0 0
  border-top: 1px solid var(--cor-cinza-claro)

  h3
    font-family: var(--bold)
    font-size: var(--f4)
    color: var(--cor-azul-escuro)
    text-align: center

  .grade
    display: grid
    grid-template-columns: repeat(3, 1fr)
    margin: 24px 0 0 0
    gap: 12px

    a
      display: flex
      align-items: center
      padding: 16px 18px 16px 16px
      gap: 11px
      border: 1px solid var(--cor-cinza-claro)
      border-radius: 16px
      color: var(--cor-azul)
      transition: border-color 0.3s, background-color 0.3s

      span
        font-family: var(--bold)
        font-size: var(--f1)
        color: var(--cor-azul-escuro)

      &:hover
        border-color: var(--cor-azul-suave)
        background-color: var(--cor-fundo)

@media (prefers-reduced-motion: reduce)
  .item .resposta
    transition: none

@media screen and (max-width: 1000px)
  section.perguntas-especialidade
    padding: 70px 20px 120px 20px

  .cabecalho h2
    max-width: 100%

  .lista
    margin: 34px 0 0 0
    gap: 12px

  .item
    border-radius: 20px

    button
      padding: 22px 20px 22px 20px
      gap: 14px

    .resposta p
      padding: 0 20px 22px 20px

  .acoes
    flex-direction: column
    align-items: stretch
    width: 100%
    margin: 34px 0 0 0
    gap: 12px

  .outras
    margin: 44px 0 0 0
    padding: 34px 0 0 0

    .grade
      grid-template-columns: 1fr
</style>
