<template>
  <div class="onda" :class="posicao" :style="estilo">
    <svg viewBox="0 0 1440 120" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
      <path class="atras" :d="caminhos.atras" />
      <path class="frente" :d="caminhos.frente" />
      <path v-if="corLinha" class="linha" :d="caminhos.linha" vector-effect="non-scaling-stroke" />
    </svg>
  </div>
</template>

<script setup>
const props = defineProps({
  direcao: { type: String, default: 'descendo' },
  posicao: { type: String, default: 'fundo' },
  corFrente: { type: String, default: 'var(--cor-branco)' },
  corAtras: { type: String, default: 'transparent' },
  corLinha: { type: String, default: '' },
  larguraLinha: { type: Number, default: 2 },
  altura: { type: Number, default: 110 },
  alturaMobile: { type: Number, default: 62 }
})

// tangentes inclinadas nas duas pontas, senão a curva achata e vira listra na borda da tela.
// nos encontros os pontos de controle são colineares, senão vinca no meio
// um arco so, de cubica unica: sem ponto de encontro no meio, nao existe risco de
// vinco. no descendo a curva e um U invertido, com o apice no centro e caindo pras
// duas pontas. a flecha e de ~57 num viewBox de 120, entao a curvatura aparece.
// as tangentes das duas pontas ficam bem inclinadas, senao o arco achata e vira
// listra reta na borda da tela.
// a linha e so a aresta de cima da frente, sem os lados nem o fechamento, entao
// ela acompanha exatamente a curva que separa as duas secoes
const CAMINHOS = {
  descendo: {
    atras: 'M0 120V74C420 0 1020 0 1440 66V120Z',
    frente: 'M0 150V92C420 18 1020 18 1440 84V150Z',
    linha: 'M0 92C420 18 1020 18 1440 84'
  },
  subindo: {
    atras: 'M0 120V10C420 84 1020 84 1440 18V120Z',
    frente: 'M0 150V28C420 102 1020 102 1440 36V150Z',
    linha: 'M0 28C420 102 1020 102 1440 36'
  }
}

const caminhos = computed(() => CAMINHOS[props.direcao] || CAMINHOS.descendo)

const estilo = computed(() => ({
  '--onda-frente': props.corFrente,
  '--onda-atras': props.corAtras,
  '--onda-linha': props.corLinha,
  '--onda-linha-largura': `${props.larguraLinha}px`,
  '--onda-altura': `${props.altura}px`,
  '--onda-altura-mobile': `${props.alturaMobile}px`
}))
</script>

<style lang="sass" scoped>
.onda
  position: absolute
  bottom: -1px
  left: 0
  z-index: 2
  width: 100%
  line-height: 0
  pointer-events: none

  svg
    display: block
    width: 100%
    height: var(--onda-altura)
    // so a frente sangra pra fora da caixa. a crista para em 120, onde a
    // frente ja e opaca, senao as duas arestas antialiasadas se somam num fio claro
    overflow: visible

  path.atras
    fill: var(--onda-atras)

  path.frente
    fill: var(--onda-frente)

  // non-scaling-stroke no template: o preserveAspectRatio="none" estica o svg
  // na horizontal e, sem isso, a espessura do fio varia com a largura da tela
  path.linha
    fill: none
    stroke: var(--onda-linha)
    stroke-width: var(--onda-linha-largura)
    stroke-linecap: round

// no topo a onda espelha: a cor da frente passa a preencher o que fica acima da curva
.onda.topo
  top: -1px
  bottom: auto

  svg
    transform: scaleY(-1)

@media screen and (max-width: 1000px)
  .onda svg
    height: var(--onda-altura-mobile)
</style>
