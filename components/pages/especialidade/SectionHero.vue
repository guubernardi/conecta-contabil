<template>
  <section class="hero-especialidade">
    <div class="conteudo">
      <div class="texto">
        <NuxtLink class="voltar" to="/#especialidades">
          <svg class="seta" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
            <path d="M1 1.75 6 6.25 11 1.75" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <span>Todas as especialidades</span>
        </NuxtLink>

        <div class="etiqueta">Contabilidade para {{ area.menu }}</div>
        <h1>{{ area.chamada }}</h1>
        <p>{{ area.paragrafos[0] }}</p>

        <div class="acoes">
          <ElementosBotao texto="Conheça nossos planos" link="/#planos" icone="predio-comercial" estilo="principal" />

          <a class="troca" :href="linkWhatsapp(MENSAGEM_TROCA)" target="_blank" rel="noopener">
            <SvgIcone nome="seta-trocar-horizontal" :tamanho="18" />
            <span>Trocar de contador</span>
          </a>
        </div>
      </div>

      <div class="painel">
        <div class="moldura">
          <div class="marca" aria-hidden="true">
            <SvgIcone :nome="area.icone" :tamanho="56" />
          </div>

          <div class="pilulas">
            <div class="pilula" v-for="ponto in area.pontos" :key="ponto">
              <SvgIcone nome="check-circulo" :tamanho="16" />
              <span>{{ ponto }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <ElementosOnda direcao="descendo" cor-frente="var(--cor-branco)" cor-atras="var(--cor-azul-suave)" cor-linha="var(--cor-azul-medio)" />
  </section>
</template>

<script setup>
import { linkWhatsapp, MENSAGEM_TROCA } from '~/helpers/negocio'

const props = defineProps({
  area: { type: Object, required: true }
})
</script>

<style lang="sass" scoped>
section.hero-especialidade
  position: relative
  display: flex
  align-items: center
  justify-content: center
  width: 100%
  padding: 160px 40px 190px 40px
  background-color: var(--cor-fundo)

  .conteudo
    display: grid
    grid-template-columns: 1fr 0.9fr
    align-items: center
    width: 100%
    max-width: var(--largura)
    gap: 70px

.texto
  display: flex
  flex-direction: column
  align-items: flex-start
  max-width: 620px

  .voltar
    display: flex
    align-items: center
    gap: 8px
    font-family: var(--bold)
    font-size: var(--f1)
    color: var(--cor-cinza)
    transition: color 0.3s

    // o chevron aponta pra baixo: girar 90 graus evita um segundo desenho
    .seta
      width: 11px
      min-width: 11px
      transform: rotate(90deg)

    &:hover
      color: var(--cor-azul)

  .etiqueta
    margin: 30px 0 0 0
    font-family: var(--bold)
    font-size: var(--f0)
    color: var(--cor-azul)
    text-transform: uppercase
    letter-spacing: 3px

  h1
    margin: 18px 0 0 0
    font-family: var(--bold)
    font-size: var(--f10)
    color: var(--cor-azul-escuro)
    line-height: 1.16
    letter-spacing: -0.5px

  p
    max-width: 540px
    margin: 22px 0 0 0
    font-family: var(--light)
    font-size: var(--f2)
    color: var(--cor-cinza)
    line-height: 1.75

  .acoes
    display: flex
    align-items: center
    margin: 36px 0 0 0
    gap: 24px

    .troca
      display: flex
      align-items: center
      gap: 9px
      color: var(--cor-azul)
      transition: color 0.3s

      span
        font-family: var(--bold)
        font-size: var(--f2)

      &:hover
        color: var(--cor-azul-escuro)

.painel
  display: flex
  align-items: center
  justify-content: center

.moldura
  display: flex
  flex-direction: column
  align-items: center
  width: 100%
  padding: 46px 36px 40px 36px
  // mesmo formato de folha do painel da home, pra pagina nao parecer de outro site
  border-radius: 40px 200px 40px 40px
  background-color: var(--cor-azul-claro)

  .marca
    display: flex
    align-items: center
    justify-content: center
    width: 112px
    height: 112px
    border-radius: 100px
    background-color: var(--cor-branco)
    color: var(--cor-azul)
    box-shadow: var(--sombra-card)

  .pilulas
    display: flex
    flex-direction: column
    width: 100%
    margin: 34px 0 0 0
    gap: 12px

    .pilula
      display: flex
      align-items: center
      padding: 15px 18px 15px 16px
      gap: 11px
      border-radius: 100px
      background-color: var(--cor-branco)
      color: var(--cor-azul)

      span
        font-family: var(--bold)
        font-size: var(--f1)
        color: var(--cor-azul-escuro)

@media screen and (max-width: 1000px)
  section.hero-especialidade
    padding: 108px 20px 120px 20px

    .conteudo
      grid-template-columns: 1fr
      gap: 40px

  .texto
    max-width: 100%

    .acoes
      flex-direction: column
      align-items: stretch
      width: 100%
      gap: 16px

      .troca
        justify-content: center

  .moldura
    padding: 34px 24px 30px 24px
    border-radius: 24px 90px 24px 24px

    .marca
      width: 88px
      height: 88px
</style>
