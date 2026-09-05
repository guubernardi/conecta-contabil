<template>
  <nav :class="{ solido: rolou, aberto: menuAberto }">
    <div class="conteudo">
      <a class="marca" :href="ancora('inicio')" :aria-label="`${NEGOCIO.nome}, ir para o início da página`" @click="fecharMenu">
        <NuxtImg src="/imagens/logo-conecta-contabil.png" alt="" width="294" height="49" draggable="false" preload />
      </a>

      <div id="menu-principal" class="links" :class="{ aberto: menuAberto }">
        <div class="interno">
          <template v-for="link in LINKS" :key="link.id">
            <div v-if="link.itens" class="grupo" :class="{ aberto: submenuAberto === link.id }" @mouseenter="aoEntrar(link.id)" @mouseleave="aoSair">
              <button class="gatilho" aria-haspopup="true" :aria-controls="`painel-${link.id}`" :aria-expanded="submenuAberto === link.id" @click="alternarSubmenu(link.id)">
                <span>{{ link.nome }}</span>
                <!-- chevron de traco, e nao a seta cheia da lib: naquele peso ela
                     lia como icone de download em vez de indicador de menu -->
                <svg class="seta" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
                  <path d="M1 1.75 6 6.25 11 1.75" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </button>

              <div class="painel" :id="`painel-${link.id}`" :style="{ '--colunas': link.itens.length > 3 ? 2 : 1 }">
                <template v-for="item in link.itens" :key="item.nome">
                  <a v-if="item.href" :href="item.href" :target="item.externo ? '_blank' : null" :rel="item.externo ? 'noopener' : null" @click="fecharMenu">
                    <SvgIcone :nome="item.icone" :tamanho="18" />
                    <span>{{ item.nome }}</span>
                  </a>

                  <NuxtLink v-else :to="item.para" @click="fecharMenu">
                    <SvgIcone :nome="item.icone" :tamanho="18" />
                    <span>{{ item.nome }}</span>
                  </NuxtLink>
                </template>
              </div>
            </div>

            <a v-else :href="ancora(link.id)" @click="fecharMenu">{{ link.nome }}</a>
          </template>
        </div>

        <a class="acao" :href="linkWhatsapp(MENSAGEM_ABERTURA)" target="_blank" rel="noopener" @click="fecharMenu">
          <SvgIcone nome="predio-comercial" :tamanho="18" />
          <span>Abrir minha empresa</span>
        </a>

        <!-- so aparece no menu deslizante: ancora o contato na base e ocupa o
             vao que sobrava embaixo de quatro itens numa tela inteira -->
        <div class="rodape-menu">
          <a :href="linkWhatsapp()" target="_blank" rel="noopener" @click="fecharMenu">
            <SvgIcone nome="whatsapp" :tamanho="17" />
            <span>{{ NEGOCIO.telefone }}</span>
          </a>

          <a :href="`mailto:${NEGOCIO.email}`" @click="fecharMenu">
            <SvgIcone nome="envelope-1" :tamanho="17" />
            <span>{{ NEGOCIO.email }}</span>
          </a>

          <p>{{ NEGOCIO.horario }}</p>
        </div>
      </div>

      <button class="menu" :class="{ ativo: menuAberto }" aria-controls="menu-principal" :aria-expanded="menuAberto" :aria-label="menuAberto ? 'Fechar menu' : 'Abrir menu'" @click="alternarMenu">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  </nav>
</template>

<script setup>
import { NEGOCIO, linkWhatsapp, MENSAGEM_ABERTURA } from '~/helpers/negocio'
import { ESPECIALIDADES } from '~/helpers/especialidades'

// um item com `itens` vira dropdown; sem `itens`, e ancora da home.
// nos filhos, `para` e rota interna e `href` e destino externo
const LINKS = [
  {
    id: 'especialidades',
    nome: 'Especialidades',
    itens: ESPECIALIDADES.map((area) => ({ nome: area.menu, icone: area.icone, para: `/especialidades/${area.slug}` }))
  },
  { id: 'planos', nome: 'Planos' },
  { id: 'atendimento', nome: 'Atendimento' },
  {
    id: 'contato',
    nome: 'Contato',
    itens: [
      { nome: 'Falar no WhatsApp', icone: 'whatsapp', href: linkWhatsapp(), externo: true },
      { nome: 'Trabalhe conosco', icone: 'equipe', para: '/vagas' }
    ]
  }
]

// guarda o id do grupo aberto, e nao um booleano: com mais de um dropdown,
// um booleano abriria os dois ao mesmo tempo
const submenuAberto = ref(null)

function alternarSubmenu(id) {
  submenuAberto.value = submenuAberto.value === id ? null : id
}

// ponteiro fino abre no hover; no toque so o clique vale, senao o painel
// abriria e fecharia sozinho no primeiro toque
const temHover = () => window.matchMedia('(hover: hover)').matches

function aoEntrar(id) {
  if (temHover()) submenuAberto.value = id
}

function aoSair() {
  if (temHover()) submenuAberto.value = null
}

const rota = useRoute()

// fora da home a ancora precisa do caminho, senao nao sai do lugar
const ancora = (id) => (rota.path === '/' ? `#${id}` : `/#${id}`)

const rolou = ref(false)
const menuAberto = ref(false)

function aoRolar() {
  rolou.value = window.scrollY > 20
}

function alternarMenu() {
  menuAberto.value = !menuAberto.value
  document.body.classList.toggle('bloquear', menuAberto.value)
}

function fecharMenu() {
  menuAberto.value = false
  submenuAberto.value = null
  document.body.classList.remove('bloquear')
}

onMounted(() => {
  aoRolar()
  window.addEventListener('scroll', aoRolar, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', aoRolar)
  document.body.classList.remove('bloquear')
})
</script>

<style scoped lang="sass">
nav
  position: fixed
  top: 0
  left: 0
  z-index: 20
  display: flex
  align-items: center
  justify-content: center
  width: 100%
  height: 92px
  // o respiro mora na nav, nao no .conteudo: assim o max-width centraliza depois
  // do padding, igual as sections, e a marca alinha com a coluna do hero
  padding: 0 40px 0 40px
  transition: height 0.3s, background-color 0.3s, box-shadow 0.3s

  // as colunas laterais iguais deixam o bloco do meio no centro da tela,
  // independente da largura da marca e do botao
  .conteudo
    display: grid
    grid-template-columns: 1fr auto 1fr
    align-items: center
    width: 100%
    max-width: var(--largura)
    gap: 30px

nav.solido
  height: 76px
  background-color: var(--cor-branco)
  box-shadow: var(--sombra)

.marca
  display: flex
  align-items: center
  justify-self: start

  img
    display: block
    width: auto
    height: 34px

// no desktop o wrapper some do fluxo e os dois filhos viram colunas do grid
.links
  display: contents

  .interno
    display: flex
    align-items: center
    justify-content: center
    gap: 36px

    > a
      font-family: var(--light)
      font-size: var(--f2)
      color: var(--cor-cinza)
      white-space: nowrap
      transition: color 0.3s

      &:hover
        color: var(--cor-azul)

  .acao
    position: relative
    display: flex
    align-items: center
    justify-self: end
    height: 48px
    padding: 0 24px 0 22px
    gap: 9px
    border-radius: 14px
    overflow: hidden
    background: var(--gradiente-azul)
    font-family: var(--bold)
    font-size: var(--f2)
    color: var(--cor-branco)
    white-space: nowrap
    transition: all 0.4s

    // icone e texto precisam ficar acima da camada de hover
    > *
      position: relative
      z-index: 1

    // gradiente nao interpola em CSS, entao o hover e uma segunda camada
    // sobreposta que entra por opacity. so assim o fade acontece
    &::before
      content: ''
      position: absolute
      inset: 0
      background: var(--gradiente-azul-hover)
      opacity: 0
      transition: opacity 0.4s

    &:hover
      color: var(--cor-branco)

    &:hover::before
      opacity: 1

// o painel e ancorado no grupo, e o grupo tem a altura da nav inteira: assim o
// ponteiro atravessa do gatilho ate o painel sem passar por um vao sem hover
.grupo
  position: relative
  display: flex
  align-items: center
  align-self: stretch

  .gatilho
    display: flex
    align-items: center
    gap: 7px
    background-color: transparent
    font-family: var(--light)
    font-size: var(--f2)
    color: var(--cor-cinza)
    white-space: nowrap
    transition: color 0.3s

    .seta
      width: 11px
      min-width: 11px
      height: auto
      transition: transform 0.3s

  .painel
    position: absolute
    top: 100%
    left: 50%
    display: grid
    // as colunas vem do template: um grupo de dois itens nao pode herdar a
    // largura de um de seis
    grid-template-columns: repeat(var(--colunas, 1), 1fr)
    width: max-content
    max-width: 470px
    padding: 14px
    gap: 8px
    border: 1px solid var(--cor-cinza-claro)
    border-radius: 22px
    background-color: var(--cor-branco)
    box-shadow: 0 20px 50px rgba(13, 35, 64, 0.14)
    opacity: 0
    visibility: hidden
    transform: translate(-50%, 8px)
    transition: opacity 0.25s, visibility 0.25s, transform 0.25s

    a
      display: flex
      align-items: center
      padding: 12px 14px 12px 12px
      gap: 10px
      border-radius: 14px
      background-color: var(--cor-fundo)
      font-family: var(--light)
      font-size: var(--f1)
      color: var(--cor-azul-escuro)
      white-space: nowrap
      transition: background-color 0.25s, color 0.25s

      .edusites-icone
        color: var(--cor-azul)

      &:hover
        background-color: var(--cor-azul-claro)
        color: var(--cor-azul)

.grupo.aberto
  .gatilho
    color: var(--cor-azul)

    .seta
      transform: rotate(180deg)

  .painel
    opacity: 1
    visibility: visible
    transform: translate(-50%, 0)

// no desktop o .links e display: contents e este bloco viraria coluna do grid
.rodape-menu
  display: none

.menu
  display: none
  flex-direction: column
  align-items: flex-end
  justify-content: center
  width: 30px
  height: 30px
  gap: 6px
  background-color: transparent

  span
    width: 100%
    height: 2px
    border-radius: 2px
    background-color: var(--cor-azul-escuro)
    transition: transform 0.3s, opacity 0.3s, width 0.3s

  span:nth-child(2)
    width: 70%

.menu.ativo
  span:nth-child(1)
    transform: translateY(8px) rotate(45deg)

  span:nth-child(2)
    opacity: 0

  span:nth-child(3)
    width: 100%
    transform: translateY(-8px) rotate(-45deg)

@media screen and (max-width: 1000px)
  nav
    height: 72px
    padding: 0 20px 0 20px

    .conteudo
      display: flex
      justify-content: space-between

  nav.solido
    height: 68px

  nav.aberto
    background-color: var(--cor-branco)

  .menu
    display: flex

  // no mobile o wrapper volta a existir e vira o painel que desliza
  .links
    position: fixed
    top: 68px
    left: 0
    display: flex
    flex-direction: column
    align-items: flex-start
    justify-content: flex-start
    width: 100%
    height: calc(100dvh - 68px)
    padding: 34px 20px 40px 20px
    background-color: var(--cor-branco)
    opacity: 0
    visibility: hidden
    transform: translateX(100%)
    transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.25s, visibility 0.25s

    .interno
      flex-direction: column
      align-items: flex-start
      width: 100%
      gap: 26px

      > a
        font-size: var(--f4)

  // no painel deslizante nao existe espaco pra um menu flutuante: o dropdown
  // vira um acordeao em fluxo, empurrando os itens de baixo
  .grupo
    flex-direction: column
    align-items: flex-start
    align-self: auto
    width: 100%

    .gatilho
      font-size: var(--f4)

    .painel
      position: static
      display: grid
      grid-template-columns: 1fr
      width: 100%
      max-width: none
      max-height: 0
      padding: 0
      gap: 8px
      border: 0
      border-radius: 0
      background-color: transparent
      box-shadow: none
      overflow: hidden
      transform: none
      transition: max-height 0.35s, opacity 0.25s, visibility 0.25s, margin 0.35s

  .grupo.aberto .painel
    max-height: 460px
    margin: 18px 0 0 0
    transform: none

  // no nivel do media query, e nao dentro do painel: o .acao e irmao do
  // .interno dentro do .links, nao filho do dropdown
  .acao
    justify-content: center
    width: 100%
    height: 54px
    margin: 34px 0 0 0

  // margin-top auto empurra pra base do painel: o vao deixa de ser sobra e
  // vira separacao entre a navegacao e o contato
  .rodape-menu
    display: flex
    flex-direction: column
    align-items: flex-start
    width: 100%
    margin: auto 0 0 0
    padding: 26px 0 0 0
    gap: 14px
    border-top: 1px solid var(--cor-cinza-claro)

    a
      display: flex
      align-items: center
      gap: 10px
      color: var(--cor-azul)

      span
        font-family: var(--bold)
        font-size: var(--f2)
        color: var(--cor-azul-escuro)

    p
      font-family: var(--light)
      font-size: var(--f1)
      color: var(--cor-cinza)

  .links.aberto
    opacity: 1
    visibility: visible
    transform: translateX(0)
</style>
