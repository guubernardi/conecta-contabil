<template>
  <section class="servicos-especialidade">
    <div class="conteudo">
      <div class="cabecalho revela" v-revelar>
        <div class="etiqueta">Sua contabilidade</div>
        <h2>
          Serviços que oferecemos
          <span>para {{ area.menu.toLowerCase() }}</span>
        </h2>
      </div>

      <div class="itens">
        <article class="item revela" v-for="(servico, i) in area.servicos" :key="servico.titulo" v-revelar="i * 90">
          <div class="icone icone-revela" v-revelar="i * 90 + 240">
            <SvgIcone :nome="servico.icone" :tamanho="24" />
          </div>

          <div class="dados">
            <h3>{{ servico.titulo }}</h3>
            <p>{{ servico.texto }}</p>
          </div>
        </article>

        <div class="emblema" aria-hidden="true">
          <svg class="orbita" viewBox="0 0 400 400" fill="none">
            <circle cx="200" cy="200" r="192" stroke-dasharray="430 190" stroke-dashoffset="70" />
            <circle cx="200" cy="200" r="154" stroke-dasharray="300 250" stroke-dashoffset="-130" />
            <circle cx="200" cy="200" r="118" stroke-dasharray="500 95" />
          </svg>

          <div class="marca">
            <SvgIcone :nome="area.icone" :tamanho="44" />
          </div>
        </div>
      </div>
    </div>

    <ElementosOnda direcao="descendo" cor-frente="var(--cor-azul-escuro)" cor-atras="var(--cor-azul-medio)" cor-linha="var(--cor-azul-medio)" />
  </section>
</template>

<script setup>
const props = defineProps({
  area: { type: Object, required: true }
})
</script>

<style lang="sass" scoped>
section.servicos-especialidade
  position: relative
  display: flex
  align-items: center
  justify-content: center
  width: 100%
  padding: 100px 40px 190px 40px
  background-color: var(--cor-branco)

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

// mesmo xadrez do "Como funciona" da home: a ordem no DOM segue a leitura e
// quem monta a composicao radial e o grid
.itens
  display: grid
  grid-template-columns: 1fr minmax(280px, 380px) 1fr
  align-items: center
  margin: 50px 0 0 0
  gap: 24px 40px

.item
  display: flex
  align-items: flex-start
  gap: 16px
  padding: 26px 26px 26px 26px
  border-radius: 20px
  background-color: var(--cor-fundo)

  .icone
    display: flex
    align-items: center
    justify-content: center
    width: 52px
    min-width: 52px
    height: 52px
    border-radius: 16px
    background-color: var(--cor-azul-claro)
    color: var(--cor-azul)

  h3
    font-family: var(--bold)
    font-size: var(--f3)
    color: var(--cor-azul-escuro)
    line-height: 1.35

  p
    margin: 8px 0 0 0
    font-family: var(--light)
    font-size: var(--f1)
    color: var(--cor-cinza)
    line-height: 1.6

// o icone dos impares vira pro miolo. o texto continua a esquerda: alinhar a
// direita deixa a margem irregular e atrapalha a leitura
.item:nth-of-type(odd)
  grid-column: 1
  flex-direction: row-reverse

.item:nth-of-type(even)
  grid-column: 3

.item:nth-of-type(1),
.item:nth-of-type(2)
  grid-row: 1

.item:nth-of-type(3),
.item:nth-of-type(4)
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
      // fill-box faz a caixa de referencia ser o proprio circulo: sem isso o
      // giro sairia em torno do canto do viewBox
      transform-box: fill-box
      transform-origin: center
      animation: girando linear infinite

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
    width: 40%
    aspect-ratio: 1
    border-radius: 100px
    background-color: var(--cor-branco)
    color: var(--cor-azul)
    box-shadow: var(--sombra-card)

@media (prefers-reduced-motion: reduce)
  .emblema .orbita circle
    animation: none

@media screen and (max-width: 1000px)
  section.servicos-especialidade
    padding: 70px 20px 120px 20px

  .cabecalho h2
    max-width: 100%

  .itens
    grid-template-columns: 1fr
    margin: 36px 0 0 0
    gap: 14px

  .item:nth-of-type(odd),
  .item:nth-of-type(even)
    grid-column: 1
    flex-direction: row

  .item:nth-of-type(1),
  .item:nth-of-type(2),
  .item:nth-of-type(3),
  .item:nth-of-type(4)
    grid-row: auto

  .item
    padding: 22px 20px 22px 20px
    gap: 13px

    .icone
      width: 46px
      min-width: 46px
      height: 46px

  // a composicao radial nao sobrevive a uma coluna so
  .emblema
    display: none
</style>
