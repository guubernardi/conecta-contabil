<template>
  <div id="tela">
    <section class="vagas">
      <div class="conteudo">
        <div class="cabecalho">
          <div class="etiqueta">Trabalhe conosco</div>
          <h1>
            Um time que só atende
            <span>negócio digital</span>
          </h1>
          <p>Somos um escritório pequeno e especializado. Isso significa contato direto com o cliente desde o primeiro mês, e nenhum dia igual ao outro.</p>
        </div>

        <div class="corpo">
          <div class="texto">
            <h2>Como funciona a seleção</h2>
            <div class="etapas">
              <div class="etapa" v-for="(etapa, i) in ETAPAS" :key="etapa.titulo">
                <div class="numero">{{ String(i + 1).padStart(2, '0') }}</div>
                <div class="dados">
                  <h3>{{ etapa.titulo }}</h3>
                  <p>{{ etapa.texto }}</p>
                </div>
              </div>
            </div>

            <h2>O que procuramos</h2>
            <ul class="perfil">
              <li v-for="item in PERFIL" :key="item">
                <SvgIcone nome="check-circulo" :tamanho="16" />
                <span>{{ item }}</span>
              </li>
            </ul>
          </div>

          <aside class="lateral">
            <div class="icone">
              <SvgIcone nome="equipe" :tamanho="28" />
            </div>

            <h2>Banco de talentos</h2>
            <p>{{ AVISO_VAGAS }}</p>

            <ElementosBotao texto="Enviar meu currículo" :link="linkWhatsapp(MENSAGEM_VAGA)" externo icone="whatsapp" estilo="principal" />

            <a class="email" :href="`mailto:${NEGOCIO.email}?subject=${encodeURIComponent('Currículo - Banco de talentos')}`">
              <SvgIcone nome="envelope-1" :tamanho="16" />
              <span>{{ NEGOCIO.email }}</span>
            </a>
          </aside>
        </div>
      </div>

    <ElementosOnda direcao="descendo" cor-frente="var(--cor-azul-escuro)" cor-atras="var(--cor-azul-medio)" cor-linha="var(--cor-azul-medio)" />
    </section>
  </div>
</template>

<script setup>
import { NEGOCIO, linkWhatsapp } from '~/helpers/negocio'

definePageMeta({
  layout: 'web'
})

const MENSAGEM_VAGA = 'Olá! Vi a página de vagas e quero enviar meu currículo para o banco de talentos.'

// PROVISORIO: não invento vaga aberta. O texto assume banco de talentos, que é
// verdadeiro em qualquer cenário. Quando houver posição aberta, trocar por ela.
const AVISO_VAGAS = 'Não temos uma posição aberta no momento, mas guardamos currículos e chamamos quando abre. Conte o que você faz e o que gostaria de fazer aqui.'

const ETAPAS = [
  { titulo: 'Conversa inicial', texto: 'Trinta minutos para entender sua experiência e explicar como o escritório trabalha.' },
  { titulo: 'Caso prático', texto: 'Um problema real de cliente, do tipo que aparece aqui toda semana. Sem prova cronometrada.' },
  { titulo: 'Conversa com o time', texto: 'Você fala com quem seria seu colega de rotina, não só com quem contrata.' },
  { titulo: 'Proposta', texto: 'Retorno em até uma semana depois da última conversa, com resposta mesmo se for não.' }
]

const PERFIL = ['Formação ou cursando Ciências Contábeis', 'Vontade de entender a operação do cliente, e não só o lançamento', 'Escrita clara: metade do trabalho aqui é explicar imposto para quem não é contador', 'Experiência com Simples Nacional e departamento pessoal conta pontos']

const TITULO = 'Trabalhe conosco | Conecta Contábil'
const DESCRICAO = 'Vagas e banco de talentos da Conecta Contábil, escritório especializado em contabilidade para negócios digitais.'

useHead({
  title: TITULO,
  meta: [
    { name: 'description', content: DESCRICAO },
    { property: 'og:title', content: TITULO },
    { property: 'og:description', content: DESCRICAO },
    { property: 'og:url', content: `${NEGOCIO.dominio}/vagas` }
  ],
  link: [{ rel: 'canonical', href: `${NEGOCIO.dominio}/vagas` }]
})
</script>

<style lang="sass" scoped>
section.vagas
  position: relative
  display: flex
  align-items: flex-start
  justify-content: center
  width: 100%
  padding: 150px 40px 200px 40px
  background-color: var(--cor-branco)

  .conteudo
    width: 100%
    max-width: var(--largura)

.cabecalho
  display: flex
  flex-direction: column
  align-items: flex-start
  padding: 0 0 40px 0
  border-bottom: 1px solid var(--cor-cinza-claro)

  .etiqueta
    font-family: var(--bold)
    font-size: var(--f0)
    color: var(--cor-azul)
    text-transform: uppercase
    letter-spacing: 3px

  h1
    max-width: 820px
    margin: 18px 0 0 0
    font-family: var(--light)
    font-size: var(--f10)
    color: var(--cor-azul-escuro)
    line-height: 1.18

    span
      display: block
      font-family: var(--bold)
      color: var(--cor-azul)

  p
    max-width: 620px
    margin: 20px 0 0 0
    font-family: var(--light)
    font-size: var(--f3)
    color: var(--cor-cinza)
    line-height: 1.75

.corpo
  display: grid
  grid-template-columns: minmax(0, 1fr) minmax(300px, 400px)
  align-items: start
  margin: 50px 0 0 0
  gap: 80px

.texto
  // teto de leitura: sem ele a linha passaria de 1000px no container de 1600
  max-width: 760px

  h2
    font-family: var(--bold)
    font-size: var(--f5)
    color: var(--cor-azul-escuro)

  h2 + *
    margin: 24px 0 0 0

  h2:not(:first-child)
    margin: 50px 0 0 0

.etapas
  display: flex
  flex-direction: column
  gap: 22px

  .etapa
    display: flex
    align-items: flex-start
    gap: 18px

    .numero
      font-family: var(--bold)
      font-size: var(--f5)
      color: var(--cor-azul-suave)
      line-height: 1.2

    h3
      font-family: var(--bold)
      font-size: var(--f3)
      color: var(--cor-azul-escuro)

    p
      margin: 6px 0 0 0
      font-family: var(--light)
      font-size: var(--f2)
      color: var(--cor-cinza)
      line-height: 1.65

.perfil
  display: flex
  flex-direction: column
  gap: 12px
  list-style: none

  li
    display: flex
    align-items: flex-start
    gap: 10px
    color: var(--cor-azul)

    span
      font-family: var(--light)
      font-size: var(--f2)
      color: var(--cor-azul-escuro)
      line-height: 1.6

.lateral
  display: flex
  flex-direction: column
  align-items: flex-start
  padding: 32px 30px 32px 30px
  border: 1px solid var(--cor-cinza-claro)
  border-radius: 26px
  background-color: var(--cor-fundo)

  .icone
    display: flex
    align-items: center
    justify-content: center
    width: 60px
    height: 60px
    border-radius: 18px
    background-color: var(--cor-azul-claro)
    color: var(--cor-azul)

  h2
    margin: 22px 0 0 0
    font-family: var(--bold)
    font-size: var(--f4)
    color: var(--cor-azul-escuro)

  p
    margin: 12px 0 26px 0
    font-family: var(--light)
    font-size: var(--f2)
    color: var(--cor-cinza)
    line-height: 1.7

  .botao
    width: 100%

  .email
    display: flex
    align-items: center
    margin: 18px 0 0 0
    gap: 9px
    color: var(--cor-azul)
    transition: color 0.3s

    span
      font-family: var(--light)
      font-size: var(--f1)

    &:hover
      color: var(--cor-azul-escuro)

@media screen and (max-width: 1000px)
  section.vagas
    padding: 108px 20px 130px 20px

  .cabecalho
    padding: 0 0 30px 0

    p
      max-width: 100%

  .corpo
    grid-template-columns: 1fr
    margin: 34px 0 0 0
    gap: 34px

  .lateral
    padding: 26px 22px 26px 22px
</style>
