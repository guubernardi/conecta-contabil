<template>
  <section class="nossa-historia" id="nossa-historia">
    <div class="conteudo">
      <div class="texto revela-esq" v-revelar>
        <div class="etiqueta">Nossa história</div>
        <h2>
          Nascemos dentro de
          <span>um negócio digital</span>
        </h2>
        <p>A Conecta Contábil começou porque o nosso sócio fundador tinha uma loja online e não achava um contador que entendesse repasse de marketplace. Depois de explicar a mesma coisa pela terceira vez, decidiu montar o escritório que gostaria de ter contratado.</p>
        <p>Hoje somos um time de contadores que só atende negócios digitais. Isso muda a conversa: você não precisa ensinar como funciona a sua operação, e a gente não precisa adivinhar de onde veio cada centavo.</p>

        <div class="assinatura">
          <div class="icone">
            <SvgIcone nome="medalha" :tamanho="22" />
          </div>
          <div class="dados">
            <strong>Contador responsável fixo</strong>
            <p>Você fala sempre com a mesma pessoa</p>
          </div>
        </div>

        <div class="acoes">
          <ElementosBotao texto="Conversar com o time" :link="linkWhatsapp()" externo icone="whatsapp" estilo="principal" />
        </div>
      </div>

      <div class="numeros">
        <div class="card revela" v-for="(numero, i) in NUMEROS" :key="numero.rotulo" v-revelar="i * 90">
          <div class="icone icone-revela" v-revelar="i * 90 + 260">
            <SvgIcone :nome="numero.icone" :tamanho="22" />
          </div>
          <strong>{{ numero.valor }}</strong>
          <p>{{ numero.rotulo }}</p>
        </div>
      </div>
    </div>

    <ElementosOnda direcao="descendo" cor-frente="var(--cor-branco)" cor-atras="var(--cor-azul-suave)" cor-linha="var(--cor-azul-medio)" />
  </section>
</template>

<script setup>
import { NUMEROS, linkWhatsapp } from '~/helpers/negocio'
</script>

<style lang="sass" scoped>
section.nossa-historia
  position: relative
  display: flex
  align-items: center
  justify-content: center
  width: 100%
  padding: 130px 40px 190px 40px
  background-color: var(--cor-fundo)

  .conteudo
    display: grid
    grid-template-columns: 1fr 1fr
    align-items: center
    width: 100%
    max-width: var(--largura)
    gap: 60px

.texto
  display: flex
  flex-direction: column
  align-items: flex-start
  max-width: 620px

  .etiqueta
    padding: 9px 18px 9px 18px
    border: 1px solid var(--cor-azul-suave)
    border-radius: 100px
    background-color: var(--cor-branco)
    font-family: var(--bold)
    font-size: var(--f0)
    color: var(--cor-azul)
    text-transform: uppercase
    letter-spacing: 1.4px

  h2
    margin: 24px 0 0 0
    font-family: var(--light)
    font-size: var(--f9)
    color: var(--cor-azul-escuro)
    line-height: 1.25

    span
      display: block
      font-family: var(--bold)
      color: var(--cor-azul)

  p
    margin: 22px 0 0 0
    font-family: var(--light)
    font-size: var(--f2)
    color: var(--cor-cinza)
    line-height: 1.75

.assinatura
  display: flex
  align-items: center
  margin: 32px 0 0 0
  padding: 16px 22px 16px 16px
  gap: 14px
  border-radius: 100px
  background-color: var(--cor-branco)

  .icone
    display: flex
    align-items: center
    justify-content: center
    width: 44px
    min-width: 44px
    height: 44px
    border-radius: 100px
    background-color: var(--cor-azul-claro)
    color: var(--cor-azul)

  .dados strong
    font-family: var(--bold)
    font-size: var(--f2)
    color: var(--cor-azul-escuro)

  .dados p
    margin: 2px 0 0 0
    font-family: var(--light)
    font-size: var(--f1)
    color: var(--cor-cinza)

.acoes
  display: flex
  margin: 34px 0 0 0

.numeros
  display: grid
  grid-template-columns: repeat(2, 1fr)
  gap: 22px

.card
  display: flex
  flex-direction: column
  align-items: flex-start
  padding: 34px 30px 34px 30px
  border-radius: 26px
  background-color: var(--cor-branco)
  box-shadow: var(--sombra-card)

  .icone
    display: flex
    align-items: center
    justify-content: center
    width: 48px
    height: 48px
    border-radius: 15px
    background-color: var(--cor-azul-claro)
    color: var(--cor-azul)

  strong
    margin: 22px 0 0 0
    font-family: var(--bold)
    font-size: var(--f8)
    color: var(--cor-azul)
    line-height: 1

  p
    margin: 10px 0 0 0
    font-family: var(--light)
    font-size: var(--f2)
    color: var(--cor-cinza)
    line-height: 1.55

@media screen and (max-width: 1000px)
  section.nossa-historia
    padding: 80px 20px 120px 20px

    .conteudo
      grid-template-columns: 1fr
      gap: 40px

  .texto
    max-width: 100%

  .acoes
    width: 100%

  .numeros
    gap: 14px

  .card
    padding: 26px 22px 26px 22px
</style>
