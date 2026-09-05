<template>
  <div id="tela">
    <Nav />

    <main>
      <section class="erro">
        <div class="conteudo">
          <div class="codigo">{{ codigo }}</div>
          <h1>{{ titulo }}</h1>
          <p>{{ texto }}</p>

          <div class="acoes">
            <ElementosBotao texto="Voltar para o início" link="/" estilo="principal" icone="seta-direita" />
            <ElementosBotao texto="Falar no WhatsApp" :link="linkWhatsapp()" externo icone="whatsapp" estilo="secundario" />
          </div>
        </div>

        <ElementosOnda direcao="descendo" cor-frente="var(--cor-azul-escuro)" cor-atras="var(--cor-azul-medio)" cor-linha="var(--cor-azul-medio)" />
      </section>
    </main>

    <Footer />
  </div>
</template>

<script setup>
import { linkWhatsapp } from '~/helpers/negocio'

const props = defineProps({
  error: { type: Object, default: () => ({}) }
})

const codigo = computed(() => props.error?.statusCode || 500)
const ehQuatroCentosEQuatro = computed(() => codigo.value === 404)

const titulo = computed(() => (ehQuatroCentosEQuatro.value ? 'Essa página saiu do ar' : 'Alguma coisa quebrou aqui'))

const texto = computed(() => (ehQuatroCentosEQuatro.value ? 'O endereço que você abriu não existe mais ou foi digitado errado. Volte para a home ou chame a gente no WhatsApp que resolvemos por lá.' : 'Tivemos um problema para carregar esta página. Tente de novo em instantes. Se continuar assim, nos avise pelo WhatsApp.'))

useHead({
  title: `${codigo.value} | Conecta Contábil`,
  meta: [{ name: 'robots', content: 'noindex, follow' }]
})
</script>

<style lang="sass" scoped>
main
  display: flex
  flex-direction: column
  align-items: flex-start
  justify-content: flex-start
  width: 100%

section.erro
  position: relative
  display: flex
  align-items: center
  justify-content: center
  width: 100%
  min-height: 78vh
  padding: 170px 40px 210px 40px
  background-color: var(--cor-fundo)

  .conteudo
    display: flex
    flex-direction: column
    align-items: center
    width: 100%
    max-width: 640px
    text-align: center

  .codigo
    font-family: var(--bold)
    font-size: var(--f11)
    color: var(--cor-azul-suave)
    line-height: 1

  h1
    margin: 18px 0 0 0
    font-family: var(--bold)
    font-size: var(--f9)
    color: var(--cor-azul-escuro)
    line-height: 1.25

  p
    margin: 20px 0 0 0
    font-family: var(--light)
    font-size: var(--f2)
    color: var(--cor-cinza)
    line-height: 1.7

  .acoes
    display: flex
    align-items: center
    margin: 36px 0 0 0
    gap: 16px

@media screen and (max-width: 1000px)
  section.erro
    padding: 120px 20px 140px 20px

    .acoes
      flex-direction: column
      align-items: stretch
      width: 100%
      gap: 12px
</style>
