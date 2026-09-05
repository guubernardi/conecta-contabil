<template>
  <!-- decorativa e repetida duas vezes: o leitor de tela leria a lista dobrada -->
  <div class="faixa" aria-hidden="true">
    <div class="trilho" :style="{ '--duracao': `${duracao}s` }">
      <div class="grupo" v-for="copia in 2" :key="copia">
        <div class="item" v-for="item in itens" :key="item">
          <span>{{ item }}</span>
          <i class="losango"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  itens: {
    type: Array,
    default: () => ['Contabilidade para negócios digitais', 'E-commerce e marketplaces', 'Infoprodutos e SaaS', 'Resposta em 1 dia útil', 'Migração sem custo', 'Sem fidelidade contratual']
  },
  duracao: { type: Number, default: 44 }
})
</script>

<style lang="sass" scoped>
.faixa
  display: flex
  width: 100%
  padding: 17px 0 17px 0
  background-color: var(--cor-azul-escuro)
  overflow: hidden

  // parar quando o ponteiro entra deixa a faixa legivel em vez de so decorativa
  &:hover .trilho
    animation-play-state: paused

// o translateX(-50%) do keyframe so fecha o laco porque existem exatamente
// duas copias da lista: meia largura do trilho cai no inicio da segunda,
// que e identica a primeira. com uma copia so, a faixa daria um salto
.trilho
  display: flex
  width: max-content
  animation: correndo var(--duracao) linear infinite

.grupo
  display: flex
  align-items: center

.item
  display: flex
  align-items: center
  gap: 30px
  padding: 0 30px 0 0

  span
    font-family: var(--bold)
    font-size: var(--f1)
    color: var(--cor-branco)
    text-transform: uppercase
    letter-spacing: 2px
    white-space: nowrap

  .losango
    width: 7px
    min-width: 7px
    height: 7px
    border-radius: 1px
    background-color: var(--cor-azul-medio)
    transform: rotate(45deg)

@media (prefers-reduced-motion: reduce)
  .trilho
    animation: none

@media screen and (max-width: 1000px)
  .faixa
    padding: 14px 0 14px 0

  .item
    gap: 20px
    padding: 0 20px 0 0

    span
      letter-spacing: 1.4px
</style>
