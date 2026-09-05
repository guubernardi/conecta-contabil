<template>
  <section class="contato" id="contato">
    <div class="conteudo">
      <div class="chamada revela" v-revelar>
        <div class="etiqueta">Primeiro passo</div>
        <h2>
          Vamos olhar os números
          <span>do seu negócio juntos?</span>
        </h2>
        <p>Trinta minutos de conversa, sem compromisso e sem apresentação comercial. Você sai da call sabendo se está pagando imposto a mais e o que dá para ajustar já no próximo mês.</p>

        <div class="acoes">
          <ElementosBotao texto="Abrir minha empresa" :link="linkWhatsapp(MENSAGEM_ABERTURA)" externo icone="predio-comercial" estilo="claro" />
          <ElementosBotao texto="Trocar de contador" :link="linkWhatsapp(MENSAGEM_TROCA)" externo icone="seta-trocar-horizontal" estilo="contorno" />
        </div>
      </div>

      <div class="canais">
        <a class="canal revela" v-for="(canal, i) in canais" :key="canal.rotulo" :href="canal.link" :target="canal.externo ? '_blank' : null" :rel="canal.externo ? 'noopener' : null" v-revelar="i * 90">
          <div class="icone icone-revela" v-revelar="i * 90 + 260">
            <SvgIcone :nome="canal.icone" :tamanho="22" />
          </div>
          <div class="dados">
            <p>{{ canal.rotulo }}</p>
            <strong>{{ canal.valor }}</strong>
          </div>
          <SvgIcone class="seta" nome="seta-direita" :tamanho="18" />
        </a>

        <div class="canal estatico revela" v-revelar="270">
          <div class="icone icone-revela" v-revelar="530">
            <SvgIcone nome="localizacao" :tamanho="22" />
          </div>
          <div class="dados">
            <p>Escritório</p>
            <strong>{{ enderecoCompleto() }}</strong>
          </div>
        </div>
      </div>
    </div>

    <ElementosOnda direcao="descendo" cor-frente="var(--cor-azul-escuro)" cor-atras="var(--cor-azul-medio)" cor-linha="var(--cor-azul-medio)" />
  </section>
</template>

<script setup>
import { NEGOCIO, MENSAGEM_ABERTURA, MENSAGEM_TROCA, linkWhatsapp, enderecoCompleto } from '~/helpers/negocio'

const canais = [
  { icone: 'whatsapp', rotulo: 'WhatsApp', valor: NEGOCIO.telefone, link: linkWhatsapp(), externo: true },
  { icone: 'envelope-1', rotulo: 'E-mail', valor: NEGOCIO.email, link: `mailto:${NEGOCIO.email}`, externo: false },
  { icone: 'relogio', rotulo: 'Atendimento', valor: NEGOCIO.horario, link: linkWhatsapp(), externo: true }
]
</script>

<style lang="sass" scoped>
section.contato
  position: relative
  display: flex
  align-items: center
  justify-content: center
  width: 100%
  padding: 130px 40px 200px 40px
  background-color: var(--cor-azul)

  .conteudo
    display: grid
    grid-template-columns: 1.1fr 1fr
    align-items: center
    width: 100%
    max-width: var(--largura)
    gap: 70px

.chamada
  display: flex
  flex-direction: column
  align-items: flex-start
  max-width: 640px

  .etiqueta
    padding: 9px 18px 9px 18px
    border: 1px solid rgba(255, 255, 255, 0.28)
    border-radius: 100px
    font-family: var(--bold)
    font-size: var(--f0)
    color: var(--cor-branco)
    text-transform: uppercase
    letter-spacing: 1.4px

  h2
    margin: 24px 0 0 0
    font-family: var(--light)
    font-size: var(--f9)
    color: var(--cor-branco)
    line-height: 1.25

    span
      display: block
      font-family: var(--bold)
      color: var(--cor-azul-suave)

  p
    max-width: 540px
    margin: 22px 0 0 0
    font-family: var(--light)
    font-size: var(--f2)
    color: var(--cor-azul-claro)
    line-height: 1.75

  .acoes
    display: flex
    align-items: center
    margin: 38px 0 0 0
    gap: 16px

.canais
  display: flex
  flex-direction: column
  gap: 16px

.canal
  display: flex
  align-items: center
  padding: 22px 26px 22px 22px
  gap: 16px
  border: 1px solid rgba(255, 255, 255, 0.18)
  border-radius: 22px
  background-color: rgba(255, 255, 255, 0.07)
  transition: background-color 0.3s, border-color 0.3s

  .icone
    display: flex
    align-items: center
    justify-content: center
    width: 50px
    min-width: 50px
    height: 50px
    border-radius: 15px
    background-color: rgba(255, 255, 255, 0.14)
    color: var(--cor-branco)

  .dados
    flex: 1

    p
      font-family: var(--light)
      font-size: var(--f1)
      color: var(--cor-azul-suave)

    strong
      display: block
      margin: 4px 0 0 0
      font-family: var(--bold)
      font-size: var(--f2)
      color: var(--cor-branco)
      line-height: 1.45

  .seta
    color: var(--cor-azul-suave)

a.canal:hover
  border-color: rgba(255, 255, 255, 0.4)
  background-color: rgba(255, 255, 255, 0.12)

.canal.estatico
  cursor: default

@media screen and (max-width: 1000px)
  section.contato
    padding: 80px 20px 130px 20px

    .conteudo
      grid-template-columns: 1fr
      gap: 44px

  .chamada
    max-width: 100%

    p
      max-width: 100%

    .acoes
      flex-direction: column
      align-items: stretch
      width: 100%
      gap: 12px

  .canal
    padding: 18px 20px 18px 18px
    gap: 13px

    .icone
      width: 44px
      min-width: 44px
      height: 44px
</style>
