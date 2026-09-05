<template>
  <section class="comecar" id="comecar">
    <div class="conteudo">
      <div class="cabecalho revela" v-revelar>
        <div class="etiqueta">Abertura de CNPJ</div>
        <h2>
          Comece com a gente
          <span>de forma rápida e sem burocracia</span>
        </h2>
        <p>São dois caminhos, e nos dois a papelada é por nossa conta. Escolha o seu para ver como funciona.</p>
      </div>

      <div class="abas revela" role="tablist" aria-label="Como começar" v-revelar="80">
        <button v-for="fluxo in FLUXOS" :key="fluxo.id" :id="`aba-${fluxo.id}`" role="tab" :class="{ ativa: ativo === fluxo.id }" :aria-selected="ativo === fluxo.id" aria-controls="painel-comecar" :tabindex="ativo === fluxo.id ? 0 : -1" @click="ativo = fluxo.id" @keydown="navegar">
          {{ fluxo.rotulo }}
        </button>
      </div>

      <div class="quadro revela" v-revelar="140">
        <!-- painel unico, com id fixo: as duas abas apontam pra ele e o
             aria-labelledby e que acompanha qual esta selecionada -->
        <Transition name="aba" mode="out-in">
          <div :key="fluxoAtivo.id" id="painel-comecar" class="etapas" role="tabpanel" :aria-labelledby="`aba-${fluxoAtivo.id}`">
            <article class="etapa" v-for="(etapa, i) in fluxoAtivo.etapas" :key="etapa.titulo">
              <div class="ilustra" aria-hidden="true">
                <SvgIcone :nome="etapa.icone" :tamanho="34" />
                <span class="passo">{{ String(i + 1).padStart(2, '0') }}</span>
              </div>

              <h3>{{ etapa.titulo }}</h3>
              <p>{{ etapa.texto }}</p>
            </article>
          </div>
        </Transition>
      </div>

      <div class="acoes revela" v-revelar="180">
        <ElementosBotao :texto="fluxoAtivo.botao" :link="linkWhatsapp(fluxoAtivo.mensagem)" externo :icone="fluxoAtivo.icone" estilo="principal" />
      </div>
    </div>
  </section>
</template>

<script setup>
import { linkWhatsapp, MENSAGEM_ABERTURA, MENSAGEM_TROCA } from '~/helpers/negocio'

const FLUXOS = [
  {
    id: 'abrir',
    rotulo: 'Quero abrir uma empresa',
    botao: 'Abrir minha empresa',
    icone: 'predio-comercial',
    mensagem: MENSAGEM_ABERTURA,
    etapas: [
      { icone: 'lupa', titulo: 'Fale com nosso time', texto: 'Uma conversa para entender a sua atividade e escolher o CNAE e o regime certos já na largada.' },
      { icone: 'documento-fiscal', titulo: 'Envie os documentos', texto: 'Tudo online: documento pessoal, comprovante de endereço e a definição do capital social.' },
      { icone: 'predio-comercial', titulo: 'CNPJ ativo', texto: 'Sai em poucos dias, com inscrição municipal e certificado digital emitido por videoconferência.' }
    ]
  },
  {
    id: 'trocar',
    rotulo: 'Quero trocar de contador',
    botao: 'Trocar de contador',
    icone: 'seta-trocar-horizontal',
    mensagem: MENSAGEM_TROCA,
    etapas: [
      { icone: 'lupa', titulo: 'Diagnóstico gratuito', texto: 'Trinta minutos para ver o que está pendente hoje e o que dá para corrigir já no primeiro mês.' },
      { icone: 'seta-trocar-horizontal', titulo: 'Avise a contabilidade atual', texto: 'Você assina uma procuração e nos apresenta. Pedir os arquivos ao escritório antigo é por nossa conta.' },
      { icone: 'escudo-check', titulo: 'Migração concluída', texto: 'Revisamos o que veio, corrigimos as pendências e assumimos a rotina. Leva até 15 dias e você não para de vender.' }
    ]
  }
]

const ativo = ref(FLUXOS[0].id)
const fluxoAtivo = computed(() => FLUXOS.find((fluxo) => fluxo.id === ativo.value))

// seta muda de aba, como manda o padrao de tablist. sem isso, quem navega por
// teclado alcanca o botao mas nao consegue trocar o painel
function navegar(evento) {
  if (evento.key !== 'ArrowRight' && evento.key !== 'ArrowLeft') return
  evento.preventDefault()

  const indice = FLUXOS.findIndex((fluxo) => fluxo.id === ativo.value)
  const passo = evento.key === 'ArrowRight' ? 1 : -1
  const proximo = FLUXOS[(indice + passo + FLUXOS.length) % FLUXOS.length]

  ativo.value = proximo.id
  document.getElementById(`aba-${proximo.id}`)?.focus()
}
</script>

<style lang="sass" scoped>
section.comecar
  display: flex
  align-items: center
  justify-content: center
  width: 100%
  padding: 90px 40px 110px 40px
  background-color: var(--cor-fundo)

  .conteudo
    display: flex
    flex-direction: column
    align-items: center
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

  p
    max-width: 600px
    margin: 18px 0 0 0
    font-family: var(--light)
    font-size: var(--f2)
    color: var(--cor-cinza)
    line-height: 1.7

// as abas ficam sobre a borda do quadro, entao o z-index precisa vencer ele
.abas
  position: relative
  z-index: 2
  display: flex
  align-items: center
  margin: 40px 0 -26px 0
  padding: 6px
  gap: 4px
  border-radius: 100px
  background-color: var(--cor-cinza-claro)

  button
    padding: 13px 26px 13px 26px
    border-radius: 100px
    background-color: transparent
    font-family: var(--bold)
    font-size: var(--f1)
    color: var(--cor-cinza)
    white-space: nowrap
    transition: background-color 0.3s, color 0.3s

    &:hover
      color: var(--cor-azul-escuro)

  button.ativa
    background: var(--gradiente-azul)
    color: var(--cor-branco)

.quadro
  width: 100%
  padding: 60px 50px 50px 50px
  border: 1px solid var(--cor-cinza-claro)
  border-radius: 30px
  background-color: var(--cor-branco)

.etapas
  display: grid
  grid-template-columns: repeat(3, 1fr)
  gap: 40px

.etapa
  display: flex
  flex-direction: column
  align-items: flex-start

  .ilustra
    position: relative
    display: flex
    align-items: center
    justify-content: center
    width: 92px
    height: 92px
    border-radius: 30px
    background-color: var(--cor-azul-claro)
    color: var(--cor-azul)

    .passo
      position: absolute
      right: -8px
      bottom: -8px
      display: flex
      align-items: center
      justify-content: center
      width: 34px
      height: 34px
      border: 3px solid var(--cor-branco)
      border-radius: 100px
      background-color: var(--cor-azul)
      font-family: var(--bold)
      font-size: var(--f0)
      color: var(--cor-branco)

  h3
    margin: 26px 0 0 0
    font-family: var(--bold)
    font-size: var(--f4)
    color: var(--cor-azul-escuro)

  p
    max-width: 380px
    margin: 10px 0 0 0
    font-family: var(--light)
    font-size: var(--f2)
    color: var(--cor-cinza)
    line-height: 1.65

// saida mais curta que a entrada: o painel antigo some rapido e o novo tem
// tempo de assentar. o mode="out-in" garante que os dois nunca se sobrepoem
.aba-leave-active
  transition: opacity 0.18s ease, transform 0.18s ease

.aba-enter-active
  transition: opacity 0.28s ease, transform 0.28s cubic-bezier(0.22, 1, 0.36, 1)

.aba-enter-from
  opacity: 0
  transform: translateY(12px)

.aba-leave-to
  opacity: 0
  transform: translateY(-8px)

.acoes
  display: flex
  margin: 40px 0 0 0

@media (prefers-reduced-motion: reduce)
  .aba-enter-active,
  .aba-leave-active
    transition: none

@media screen and (max-width: 1000px)
  section.comecar
    padding: 60px 20px 80px 20px

  .cabecalho
    .etiqueta
      letter-spacing: 2px

    h2,
    p
      max-width: 100%

  // em coluna as duas abas nao cabem lado a lado sem quebrar o rotulo
  .abas
    flex-direction: column
    width: 100%
    margin: 30px 0 -30px 0
    border-radius: 22px

    button
      width: 100%

  .quadro
    padding: 50px 22px 30px 22px
    border-radius: 22px

  .etapas
    grid-template-columns: 1fr
    gap: 30px

  .etapa
    .ilustra
      width: 76px
      height: 76px
      border-radius: 24px

    p
      max-width: 100%

  .acoes
    width: 100%
</style>
