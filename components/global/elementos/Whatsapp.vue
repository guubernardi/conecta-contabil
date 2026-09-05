<template>
  <a class="whatsapp" :class="{ visivel }" :href="linkWhatsapp(MENSAGEM_FLUTUANTE)" target="_blank" rel="noopener" aria-label="Falar com a Conecta Contábil no WhatsApp">
    <SvgIcone nome="whatsapp" :tamanho="26" />
    <span class="rotulo">Falar no WhatsApp</span>
  </a>
</template>

<script setup>
import { linkWhatsapp } from '~/helpers/negocio'

const MENSAGEM_FLUTUANTE = 'Olá! Vim pelo site e quero falar sobre a contabilidade do meu negócio.'

const visivel = ref(false)

// so aparece depois que o hero sai da tela: dentro do hero ele competiria com
// o CTA principal, que ja esta na frente do visitante
function aoRolar() {
  visivel.value = window.scrollY > window.innerHeight * 0.7
}

onMounted(() => {
  aoRolar()
  window.addEventListener('scroll', aoRolar, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', aoRolar)
})
</script>

<style lang="sass" scoped>
.whatsapp
  position: fixed
  right: 28px
  bottom: 28px
  z-index: 30
  display: flex
  align-items: center
  justify-content: center
  width: 58px
  height: 58px
  border-radius: 100px
  background-color: var(--cor-whatsapp)
  color: var(--cor-branco)
  box-shadow: 0 10px 30px rgba(37, 211, 102, 0.36)
  opacity: 0
  visibility: hidden
  transform: translateY(16px)
  transition: opacity 0.3s, visibility 0.3s, transform 0.3s, width 0.4s, background-color 0.3s

  // a classe e obrigatoria: o <SvgIcone> tambem renderiza um <span>, entao um
  // seletor `span` solto escondia o icone junto com o rotulo
  .rotulo
    max-width: 0
    font-family: var(--bold)
    font-size: var(--f2)
    white-space: nowrap
    overflow: hidden
    opacity: 0
    // a largura anima junto com o texto, senao o rotulo aparece cortado
    transition: max-width 0.4s, margin 0.4s, opacity 0.3s

  &:hover
    width: 232px
    background-color: #1EBE5A
    color: var(--cor-branco)

    .rotulo
      max-width: 170px
      margin: 0 0 0 10px
      opacity: 1

.whatsapp.visivel
  opacity: 1
  visibility: visible
  transform: translateY(0)

@media (prefers-reduced-motion: reduce)
  .whatsapp,
  .whatsapp .rotulo
    transition: none

@media screen and (max-width: 1000px)
  .whatsapp
    right: 18px
    bottom: 18px
    width: 54px
    height: 54px

    // no toque nao existe hover: o rotulo nunca abriria
    .rotulo
      display: none

    &:hover
      width: 54px
</style>
