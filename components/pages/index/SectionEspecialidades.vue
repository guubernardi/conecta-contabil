<template>
  <section class="especialidades" id="especialidades">
    <div class="conteudo">
      <div class="cabecalho revela" v-revelar>
        <div class="etiqueta">Para negócios digitais</div>
        <h2>
          Especializados em
          <span>todas as áreas do digital</span>
        </h2>
        <p>Do e-commerce ao infoproduto, cada operação digital tem uma regra fiscal diferente. A gente já conhece a sua, então não precisa aprender no seu CNPJ.</p>
      </div>

      <div class="carrossel">
        <button class="seta" :disabled="noInicio" aria-label="Ver especialidades anteriores" @click="mover(-1)">
          <SvgIcone nome="seta-direita" :tamanho="20" />
        </button>

        <div class="trilho" ref="trilho" @scroll.passive="medir">
          <article class="card revela" v-for="(area, i) in AREAS" :key="area.titulo" v-revelar="i * 70">
            <div class="icone icone-revela" v-revelar="i * 70 + 240">
              <SvgIcone :nome="area.icone" :tamanho="24" />
            </div>

            <h3>{{ area.titulo }}</h3>
            <p>{{ area.texto }}</p>

            <ul>
              <li v-for="ponto in area.pontos" :key="ponto">
                <SvgIcone nome="check-circulo" :tamanho="15" />
                <span>{{ ponto }}</span>
              </li>
            </ul>

            <NuxtLink class="saiba" :to="`/especialidades/${area.slug}`">
              <span>Ver a página</span>
              <SvgIcone nome="seta-direita" :tamanho="16" />
            </NuxtLink>
          </article>
        </div>

        <button class="seta proxima" :disabled="noFim" aria-label="Ver próximas especialidades" @click="mover(1)">
          <SvgIcone nome="seta-direita" :tamanho="20" />
        </button>
      </div>
    </div>

    <ElementosOnda direcao="descendo" cor-frente="var(--cor-fundo)" cor-atras="var(--cor-azul-suave)" cor-linha="var(--cor-azul-suave)" />
  </section>
</template>

<script setup>
import { ESPECIALIDADES as AREAS } from '~/helpers/especialidades'


const trilho = ref(null)
const noInicio = ref(true)
const noFim = ref(false)

// o passo e a largura real de um card mais o gap lido do CSS, entao ele
// acompanha o breakpoint sem numero repetido aqui
function passoDoTrilho(el) {
  const card = el.querySelector('.card')
  if (!card) return el.clientWidth
  const gap = parseFloat(getComputedStyle(el).columnGap) || 0
  return card.offsetWidth + gap
}

function mover(direcao) {
  const el = trilho.value
  if (!el) return

  const passo = passoDoTrilho(el)
  // avanca uma tela cheia de cards, nao um card so: com quatro visiveis,
  // andar de um em um dava a impressao de que nada tinha saido do lugar
  const porTela = Math.max(1, Math.floor(el.clientWidth / passo))
  const suave = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'

  el.scrollBy({ left: direcao * passo * porTela, behavior: suave })
}

// o evento de scroll dispara a cada quadro. sem esse portao, cada um deles
// escrevia dois refs e acordava o Vue, o que picotava a propria rolagem
let agendado = false

function medir() {
  if (agendado) return
  agendado = true

  requestAnimationFrame(() => {
    agendado = false
    const el = trilho.value
    if (!el) return
    noInicio.value = el.scrollLeft <= 4
    noFim.value = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4
  })
}

onMounted(() => {
  medir()
  window.addEventListener('resize', medir, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', medir)
})
</script>

<style lang="sass" scoped>
section.especialidades
  position: relative
  display: flex
  align-items: center
  justify-content: center
  width: 100%
  padding: 130px 40px 190px 40px
  background-color: var(--cor-azul)

  .conteudo
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
    color: var(--cor-azul-suave)
    text-transform: uppercase
    letter-spacing: 3px

  h2
    max-width: 820px
    margin: 20px 0 0 0
    font-family: var(--light)
    font-size: var(--f9)
    color: var(--cor-branco)
    line-height: 1.22

    span
      display: block
      font-family: var(--bold)

  p
    max-width: 640px
    margin: 20px 0 0 0
    font-family: var(--light)
    font-size: var(--f2)
    color: var(--cor-azul-claro)
    line-height: 1.7

.carrossel
  position: relative
  margin: 60px 0 0 0

.trilho
  display: flex
  align-items: stretch
  // proximity, nao mandatory: o mandatory reancora a cada evento de rolagem e
  // atropela a animacao das setas, o que dava a sensacao de travamento.
  // e nada de scroll-behavior: smooth aqui, senao ele anima tambem o arrasto
  // e a roda do mouse, que devem responder na hora. o smooth fica so no scrollBy
  scroll-snap-type: x proximity
  overflow-x: auto
  // obrigatorio: quando so um eixo vira auto, o CSS promove o outro pra auto
  // junto. sem isso o translateY do v-revelar cria altura sobrando e o trilho
  // ganha uma barra de rolagem vertical propria
  overflow-y: hidden
  // impede que a rolagem lateral escape pro navegador e dispare o gesto de voltar
  overscroll-behavior-x: contain
  gap: 26px

.card
  display: flex
  flex-direction: column
  align-items: flex-start
  // largura fixa: e ela que o passo das setas usa pra saber quanto rolar
  min-width: 340px
  max-width: 340px
  padding: 28px 26px 24px 26px
  border: 1px solid rgba(255, 255, 255, 0.16)
  border-radius: 26px
  background-color: rgba(255, 255, 255, 0.07)
  scroll-snap-align: start
  // so cor: o translateY do hover forcava o card a subir de camada bem no
  // momento em que o trilho rolava, e era mais uma repintura no caminho
  transition: background-color 0.35s, border-color 0.35s

  &:hover
    border-color: rgba(255, 255, 255, 0.34)
    background-color: rgba(255, 255, 255, 0.14)

  .icone
    display: flex
    align-items: center
    justify-content: center
    width: 48px
    height: 48px
    border-radius: 100px
    background-color: rgba(255, 255, 255, 0.14)
    color: var(--cor-branco)

  h3
    margin: 18px 0 0 0
    font-family: var(--bold)
    font-size: var(--f4)
    color: var(--cor-branco)
    line-height: 1.35

  p
    margin: 12px 0 0 0
    font-family: var(--light)
    font-size: var(--f2)
    color: var(--cor-azul-claro)
    line-height: 1.65

  ul
    display: flex
    flex-direction: column
    width: 100%
    margin: 18px 0 0 0
    padding: 16px 0 0 0
    gap: 8px
    border-top: 1px solid rgba(255, 255, 255, 0.16)
    list-style: none

    li
      display: flex
      align-items: center
      gap: 9px
      color: var(--cor-azul-suave)

      span
        font-family: var(--light)
        font-size: var(--f1)
        color: var(--cor-branco)

  .saiba
    display: flex
    align-items: center
    width: 100%
    // auto no topo cola o link na base, entao os cards fecham alinhados
    // mesmo com textos de alturas diferentes
    margin: auto 0 0 0
    padding: 16px 0 0 0
    gap: 9px
    border-top: 1px solid rgba(255, 255, 255, 0.16)
    font-family: var(--bold)
    font-size: var(--f1)
    color: var(--cor-branco)
    transition: color 0.3s

    &:hover
      color: var(--cor-azul-suave)

.seta
  position: absolute
  top: 50%
  left: -22px
  z-index: 4
  display: flex
  align-items: center
  justify-content: center
  width: 48px
  height: 48px
  border-radius: 100px
  background-color: var(--cor-branco)
  color: var(--cor-azul)
  transform: translateY(-50%) rotate(180deg)
  transition: opacity 0.3s, background-color 0.3s

  &:hover
    background-color: var(--cor-azul-claro)

  &:disabled
    opacity: 0
    pointer-events: none

.seta.proxima
  left: auto
  right: -22px
  transform: translateY(-50%)

@media screen and (max-width: 1000px)
  section.especialidades
    padding: 80px 20px 120px 20px

  .cabecalho
    h2,
    p
      max-width: 100%

    .etiqueta
      letter-spacing: 2px

  .carrossel
    margin: 40px 0 0 0

  .trilho
    // o padding lateral devolve o respiro que a secao perde, e o negativo
    // deixa o card sangrar ate a borda da tela enquanto rola
    margin: 0 -20px 0 -20px
    padding: 0 20px 0 20px
    gap: 16px

  .card
    min-width: 78vw
    max-width: 78vw
    padding: 28px 24px 24px 24px

  // no toque a rolagem e por arrasto: as setas so ocupariam espaco
  .seta
    display: none
</style>
