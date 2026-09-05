<template>
  <section class="atendimento" id="atendimento">
    <div class="conteudo">
      <div class="mapa revela-esq" ref="mapa" v-revelar aria-hidden="true" @mousemove="aoMover" @mouseleave="estadoAtivo = ''">
        <!-- so o inline responde a hover. sem ele, a imagem cobre o caso normal -->
        <div class="desenho" v-if="marcacao" v-html="marcacao"></div>
        <img v-else src="/imagens/br.svg" alt="" width="1000" height="912" draggable="false" loading="lazy" />

        <div class="dica" v-if="estadoAtivo" :style="{ left: `${ponteiro.x}px`, top: `${ponteiro.y}px` }">{{ estadoAtivo }}</div>
      </div>

      <div class="texto revela-dir" v-revelar>
        <div class="etiqueta">Atendimento nacional</div>
        <h2>
          Não importa de qual estado você é,
          <span>atendemos todo o Brasil</span>
        </h2>
        <p>A contabilidade é digital de ponta a ponta. Você não precisa estar em São Paulo, nem imprimir, nem levar pasta em escritório nenhum.</p>

        <ul>
          <li v-for="ponto in PONTOS" :key="ponto.titulo">
            <div class="icone">
              <SvgIcone :nome="ponto.icone" :tamanho="18" />
            </div>
            <div class="dados">
              <strong>{{ ponto.titulo }}</strong>
              <p>{{ ponto.texto }}</p>
            </div>
          </li>
        </ul>

        <div class="acoes">
          <ElementosBotao texto="Conversar com o time" :link="linkWhatsapp()" externo icone="whatsapp" estilo="principal" />
        </div>
      </div>
    </div>

    <ElementosOnda direcao="descendo" cor-frente="var(--cor-branco)" cor-atras="var(--cor-azul-suave)" cor-linha="var(--cor-azul-medio)" />
  </section>
</template>

<script setup>
import { linkWhatsapp } from '~/helpers/negocio'

// respondem a objecao que vem logo depois do "atendemos todo o Brasil":
// tudo bem, mas na pratica como funciona se voces nao estao aqui?
const PONTOS = [
  { icone: 'nuvem', titulo: 'Tudo digital, de ponta a ponta', texto: 'Documento, assinatura e entrega sem papel e sem deslocamento.' },
  { icone: 'cadeado', titulo: 'Certificado digital à distância', texto: 'A emissão é feita por videoconferência, sem sair do lugar.' },
  { icone: 'documento-fiscal', titulo: 'Obrigações de qualquer município', texto: 'ISS e inscrição municipal seguem a regra da sua cidade, não da nossa.' },
  { icone: 'headset', titulo: 'Mesmo contador, todo mês', texto: 'Você fala com quem conhece a sua operação, por WhatsApp ou vídeo.' }
]

const mapa = ref(null)
const marcacao = ref('')
const estadoAtivo = ref('')
const ponteiro = reactive({ x: 0, y: 0 })

// id do estado -> nome. o proprio arquivo ja traz name="Rio Grande do Sul" em
// cada path, entao o indice sai dele em vez de eu manter 27 nomes na mao
const nomes = new Map()

function indexarNomes(texto) {
  for (const [, id, nome] of texto.matchAll(/id="(BR[A-Z]{2})"\s+name="([^"]*)"/g)) {
    nomes.set(id, nome)
  }
}

async function carregarMapa() {
  if (marcacao.value) return
  try {
    const resposta = await fetch('/imagens/br.svg')
    const texto = await resposta.text()
    indexarNomes(texto)
    marcacao.value = texto
  } catch {
    // fica com a <img>, que ja cobre o visual
  }
}

function aoMover(evento) {
  if (!marcacao.value || !mapa.value) return

  // os <circle> do arquivo repetem o mesmo id dos paths, entao ler o id cobre
  // os dois casos; o atributo name so existe nos paths
  estadoAtivo.value = nomes.get(evento.target.id) || ''

  const caixa = mapa.value.getBoundingClientRect()
  ponteiro.x = evento.clientX - caixa.left
  ponteiro.y = evento.clientY - caixa.top
}

onMounted(() => {
  // em tela de toque nao existe hover: o inline seria 259KB de path para uma
  // interacao que nunca acontece. ali a <img> continua, cacheada e comprimida
  if (!window.matchMedia('(hover: hover)').matches) return

  // e mesmo no desktop, so busca quando a secao esta chegando na tela
  const observador = new IntersectionObserver(
    (entradas) => {
      if (!entradas[0].isIntersecting) return
      observador.disconnect()
      carregarMapa()
    },
    { rootMargin: '400px' }
  )

  if (mapa.value) observador.observe(mapa.value)
  onBeforeUnmount(() => observador.disconnect())
})
</script>

<style lang="sass" scoped>
section.atendimento
  position: relative
  display: flex
  align-items: center
  justify-content: center
  width: 100%
  // topo curto: a onda de Planos ja e preenchida com esta mesma --cor-fundo e
  // conta como respiro. com 120px aqui, sobravam ~200px de vazio antes do
  // conteudo revelar, e a secao parecia quebrada na entrada
  padding: 70px 40px 190px 40px
  background-color: var(--cor-fundo)

  .conteudo
    display: grid
    grid-template-columns: 1fr 1fr
    align-items: center
    width: 100%
    max-width: var(--largura)
    gap: 80px

// o arquivo e um SVG do simplemaps com os 27 estados em paths separados. as
// cores foram gravadas nele na paleta do projeto, entao aqui basta dimensionar
.mapa
  position: relative
  display: flex
  align-items: center
  justify-content: center

  img,
  .desenho
    display: block
    width: 100%
    max-width: 620px

  img
    height: auto

  // o SVG entra por v-html, entao nao recebe o atributo de escopo do componente
  // e so o :deep() alcanca os paths
  :deep(svg)
    display: block
    width: 100%
    height: auto

  :deep(path)
    transition: fill 0.25s
    cursor: default

  :deep(path:hover)
    fill: var(--cor-azul)

.dica
  position: absolute
  z-index: 3
  padding: 7px 13px 7px 13px
  border-radius: 100px
  background-color: var(--cor-azul-escuro)
  font-family: var(--bold)
  font-size: var(--f0)
  color: var(--cor-branco)
  white-space: nowrap
  // sem isso a propria dica entra embaixo do cursor e derruba o hover do estado
  pointer-events: none
  transform: translate(-50%, -160%)

.texto
  display: flex
  flex-direction: column
  align-items: flex-start
  max-width: 620px

  .etiqueta
    padding: 8px 16px 8px 16px
    border-radius: 100px
    background-color: var(--cor-azul-claro)
    font-family: var(--bold)
    font-size: var(--f0)
    color: var(--cor-azul)
    text-transform: uppercase
    letter-spacing: 1.4px

  h2
    margin: 22px 0 0 0
    font-family: var(--light)
    font-size: var(--f9)
    color: var(--cor-azul-escuro)
    line-height: 1.22

    span
      display: block
      font-family: var(--bold)
      color: var(--cor-azul)

  > p
    margin: 20px 0 0 0
    font-family: var(--light)
    font-size: var(--f2)
    color: var(--cor-cinza)
    line-height: 1.7

  ul
    display: flex
    flex-direction: column
    width: 100%
    margin: 32px 0 0 0
    gap: 12px
    list-style: none

    li
      display: flex
      align-items: flex-start
      padding: 18px 20px 18px 18px
      gap: 14px
      border: 1px solid var(--cor-cinza-claro)
      border-radius: 18px
      background-color: var(--cor-branco)

    .icone
      display: flex
      align-items: center
      justify-content: center
      width: 40px
      min-width: 40px
      height: 40px
      border-radius: 12px
      background-color: var(--cor-azul-claro)
      color: var(--cor-azul)

    .dados strong
      font-family: var(--bold)
      font-size: var(--f2)
      color: var(--cor-azul-escuro)

    .dados p
      margin: 4px 0 0 0
      font-family: var(--light)
      font-size: var(--f1)
      color: var(--cor-cinza)
      line-height: 1.55

  .acoes
    display: flex
    margin: 32px 0 0 0

@media screen and (max-width: 1000px)
  section.atendimento
    padding: 50px 20px 120px 20px

    .conteudo
      grid-template-columns: 1fr
      gap: 44px

  // o mapa vem primeiro. quando ele ficava por ultimo, caía depois do CTA e do
  // ultimo card: em coluna unica isso o joga pra fora da tela e ele some na
  // pratica, mesmo estando no DOM
  .mapa
    order: 1

    img
      max-width: 340px

  .texto
    order: 2
    max-width: 100%

    .acoes
      width: 100%
</style>
