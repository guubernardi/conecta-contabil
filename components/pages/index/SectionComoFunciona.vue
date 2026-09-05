<template>
  <section class="como-funciona" id="como-funciona">
    <div class="conteudo">
      <div class="cabecalho revela" v-revelar>
        <div class="etiqueta">Sua contabilidade</div>
        <h2>
          Da primeira conversa
          <span>à rotina rodando sozinha</span>
        </h2>
        <p>A migração é por nossa conta e leva menos tempo do que você imagina. Você não precisa parar de vender para trocar de contabilidade.</p>
      </div>

      <div class="passos">
        <article class="passo revela" v-for="(etapa, i) in ETAPAS" :key="etapa.titulo" v-revelar="i * 90">
          <div class="icone icone-revela" v-revelar="i * 90 + 240">
            <SvgIcone :nome="etapa.icone" :tamanho="24" />
          </div>

          <div class="texto">
            <div class="rotulo">Etapa {{ String(i + 1).padStart(2, '0') }} · {{ etapa.prazo }}</div>
            <h3>{{ etapa.titulo }}</h3>
            <p>{{ etapa.texto }}</p>
          </div>
        </article>

        <div class="emblema" aria-hidden="true">
          <svg class="orbita" viewBox="0 0 400 400" fill="none">
            <circle cx="200" cy="200" r="192" stroke-dasharray="430 190" stroke-dashoffset="70" />
            <circle cx="200" cy="200" r="154" stroke-dasharray="300 250" stroke-dashoffset="-130" />
            <circle cx="200" cy="200" r="118" stroke-dasharray="500 95" />
          </svg>

          <div class="marca">
            <NuxtImg src="/imagens/marca-conecta.png" alt="" width="60" height="60" draggable="false" loading="lazy" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const ETAPAS = [
  { icone: 'lupa', titulo: 'Diagnóstico gratuito', texto: 'Uma conversa de 30 minutos para entender sua operação, seus canais de venda e o que está travando hoje.', prazo: 'Mesma semana' },
  { icone: 'seta-trocar-horizontal', titulo: 'Migração sem parada', texto: 'Pedimos a documentação ao contador antigo, revisamos o que veio e corrigimos pendências antes de assumir.', prazo: 'Até 15 dias' },
  { icone: 'engrenagem', titulo: 'Rotina no ar', texto: 'Guias, folha e obrigações passam a chegar organizadas, sempre com antecedência do vencimento.', prazo: 'A partir do 1º mês' },
  { icone: 'grafico-crescimento', titulo: 'Acompanhamento mensal', texto: 'Você recebe o resultado do mês comentado e uma reunião para decidir preço, retirada e investimento.', prazo: 'Todo mês' }
]
</script>

<style lang="sass" scoped>
section.como-funciona
  display: flex
  align-items: center
  justify-content: center
  width: 100%
  // topo curto de proposito: a onda da secao anterior e preenchida com a mesma
  // --cor-fundo daqui, entao aqueles 110px ja entram como respiro visual
  padding: 70px 40px 110px 40px
  background-color: var(--cor-fundo)

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
    color: var(--cor-cinza)
    text-transform: uppercase
    letter-spacing: 3px

  h2
    max-width: 820px
    margin: 20px 0 0 0
    font-family: var(--light)
    font-size: var(--f9)
    color: var(--cor-azul-escuro)
    line-height: 1.22

    span
      display: block
      font-family: var(--bold)
      color: var(--cor-azul)

  p
    max-width: 620px
    margin: 20px 0 0 0
    font-family: var(--light)
    font-size: var(--f2)
    color: var(--cor-cinza)
    line-height: 1.7

// duas colunas de cards com o emblema no miolo. a ordem no DOM segue a leitura
// (01 a 04) e quem monta o xadrez e o grid, nao a marcacao
.passos
  display: grid
  grid-template-columns: 1fr minmax(300px, 420px) 1fr
  align-items: center
  margin: 50px 0 0 0
  gap: 26px 40px

.passo
  display: flex
  align-items: flex-start
  gap: 18px
  padding: 26px 26px 26px 26px
  border-radius: 20px
  background-color: var(--cor-branco)
  box-shadow: var(--sombra-card)
  transition: box-shadow 0.35s

  &:hover
    box-shadow: 0 16px 40px rgba(13, 35, 64, 0.1)

  .icone
    display: flex
    align-items: center
    justify-content: center
    width: 54px
    min-width: 54px
    height: 54px
    border-radius: 16px
    background-color: var(--cor-azul-claro)
    color: var(--cor-azul)

  .rotulo
    font-family: var(--bold)
    font-size: var(--f0)
    color: var(--cor-azul)
    text-transform: uppercase
    letter-spacing: 1.2px

  h3
    margin: 8px 0 0 0
    font-family: var(--bold)
    font-size: var(--f4)
    color: var(--cor-azul-escuro)
    line-height: 1.35

  p
    margin: 8px 0 0 0
    font-family: var(--light)
    font-size: var(--f2)
    color: var(--cor-cinza)
    line-height: 1.6

// os impares vao pra coluna da esquerda com o icone virado pro miolo. o
// espelhamento para no icone: alinhar o texto a direita deixa a margem esquerda
// irregular e o olho perde onde cada linha comeca
.passo:nth-of-type(odd)
  grid-column: 1
  flex-direction: row-reverse

.passo:nth-of-type(even)
  grid-column: 3

.passo:nth-of-type(1),
.passo:nth-of-type(2)
  grid-row: 1

.passo:nth-of-type(3),
.passo:nth-of-type(4)
  grid-row: 2

.emblema
  position: relative
  grid-column: 2
  grid-row: 1 / span 2
  display: flex
  align-items: center
  justify-content: center
  aspect-ratio: 1

  .orbita
    position: absolute
    inset: 0
    width: 100%
    height: 100%

    circle
      stroke: var(--cor-azul-suave)
      stroke-width: 1.5
      stroke-linecap: round
      // fill-box faz a caixa de referencia ser o proprio circulo, entao "center"
      // ja e o centro dele. sem isso o giro sairia em torno do canto do viewBox
      transform-box: fill-box
      transform-origin: center
      animation: girando linear infinite

    // tempos diferentes e um anel no contrasenso: junto parece um sistema em
    // orbita, e nao uma imagem unica girando
    circle:nth-child(1)
      animation-duration: 48s

    circle:nth-child(2)
      animation-duration: 34s
      animation-direction: reverse

    circle:nth-child(3)
      animation-duration: 26s

  .marca
    display: flex
    align-items: center
    justify-content: center
    width: 34%
    aspect-ratio: 1
    border-radius: 100px
    background-color: var(--cor-branco)
    box-shadow: var(--sombra-card)

    // largura fixa, e nao %: a marca so existe com 52px uteis no arquivo de
    // origem, entao qualquer valor acima disso amplia e borra. trocar por uma
    // largura relativa quando chegar a versao vetorial
    img
      display: block
      width: 56px
      height: auto

// movimento continuo e exatamente o que incomoda quem pede menos animacao
@media (prefers-reduced-motion: reduce)
  .emblema .orbita circle
    animation: none

@media screen and (max-width: 1000px)
  section.como-funciona
    padding: 50px 20px 70px 20px

  .cabecalho
    .etiqueta
      letter-spacing: 2px

    h2,
    p
      max-width: 100%

  .passos
    grid-template-columns: 1fr
    margin: 40px 0 0 0
    gap: 14px

  // em coluna unica nao existe miolo pro icone apontar: todos viram pra esquerda
  .passo:nth-of-type(odd),
  .passo:nth-of-type(even)
    grid-column: 1
    flex-direction: row

  .passo:nth-of-type(1),
  .passo:nth-of-type(2),
  .passo:nth-of-type(3),
  .passo:nth-of-type(4)
    grid-row: auto

  .passo
    padding: 22px 20px 22px 20px
    gap: 14px

    .icone
      width: 46px
      min-width: 46px
      height: 46px

  // a composicao radial nao sobrevive a uma coluna so
  .emblema
    display: none
</style>
