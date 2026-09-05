<template>
  <a v-if="link" class="botao" :class="estilo" :href="link" :target="externo ? '_blank' : null" :rel="externo ? 'noopener' : null" :aria-label="rotulo || null">
    <SvgIcone v-if="icone" :nome="icone" :tamanho="20" />
    <span>{{ texto }}</span>
  </a>

  <button v-else class="botao" :class="estilo" :type="tipo" :disabled="carregando" :aria-label="rotulo || null">
    <SvgIcone v-if="icone" :nome="icone" :tamanho="20" />
    <span>{{ carregando ? 'Enviando...' : texto }}</span>
  </button>
</template>

<script setup>
const props = defineProps({
  texto: { type: String, required: true },
  link: { type: String, default: '' },
  externo: { type: Boolean, default: false },
  icone: { type: String, default: '' },
  estilo: { type: String, default: 'principal' },
  tipo: { type: String, default: 'button' },
  rotulo: { type: String, default: '' },
  carregando: { type: Boolean, default: false }
})
</script>

<style lang="sass" scoped>
.botao
  position: relative
  display: inline-flex
  align-items: center
  justify-content: center
  gap: 10px
  height: 56px
  padding: 0 30px 0 30px
  border-radius: 14px
  overflow: hidden
  font-family: var(--bold)
  font-size: var(--f2)
  line-height: 1
  white-space: nowrap
  transition: all 0.4s

  // icone e texto precisam ficar acima da camada de hover
  > *
    position: relative
    z-index: 1

  &:disabled
    opacity: 0.6
    cursor: not-allowed

.botao.principal
  background: var(--gradiente-azul)
  color: var(--cor-branco)

  // gradiente nao interpola em CSS, entao o hover e uma segunda camada
  // sobreposta que entra por opacity. so assim o fade acontece
  &::before
    content: ''
    position: absolute
    inset: 0
    background: var(--gradiente-azul-hover)
    opacity: 0
    transition: opacity 0.4s

  &:hover::before
    opacity: 1

.botao.secundario
  border: 2px solid var(--cor-azul-suave)
  background-color: var(--cor-branco)
  color: var(--cor-azul)

  &:hover
    border-color: var(--cor-azul)
    background-color: var(--cor-azul-claro)

.botao.claro
  background-color: var(--cor-branco)
  color: var(--cor-azul)

  &:hover
    background-color: var(--cor-azul-claro)

.botao.contorno
  border: 2px solid rgba(255, 255, 255, 0.35)
  color: var(--cor-branco)

  &:hover
    border-color: var(--cor-branco)
    background-color: rgba(255, 255, 255, 0.1)

@media screen and (max-width: 1000px)
  .botao
    width: 100%
    height: 52px
</style>
