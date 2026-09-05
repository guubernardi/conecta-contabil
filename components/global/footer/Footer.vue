<template>
  <footer>
    <div class="conteudo">
      <div class="topo">
        <div class="sobre">
          <a class="marca" :href="ancora('inicio')" :aria-label="`${NEGOCIO.nome}, ir para o início da página`">
            <NuxtImg src="/imagens/logo-conecta-contabil.png" alt="" width="294" height="49" draggable="false" loading="lazy" />
          </a>
          <p class="texto">{{ NEGOCIO.descricao }}</p>
        </div>

        <div class="coluna">
          <h3>Navegação</h3>
          <a v-for="link in LINKS" :key="link.id" :href="ancora(link.id)">{{ link.nome }}</a>
        </div>

        <div class="coluna">
          <h3>Documentos</h3>
          <NuxtLink to="/documentos/politicas">Política de privacidade</NuxtLink>
          <NuxtLink to="/documentos/termos">Termos de uso</NuxtLink>
        </div>

        <div class="coluna contatos">
          <h3>Contato</h3>
          <a :href="linkWhatsapp()" target="_blank" rel="noopener">
            <SvgIcone nome="whatsapp" :tamanho="18" />
            <span>{{ NEGOCIO.telefone }}</span>
          </a>
          <a :href="`mailto:${NEGOCIO.email}`">
            <SvgIcone nome="envelope-1" :tamanho="18" />
            <span>{{ NEGOCIO.email }}</span>
          </a>
          <div class="linha">
            <SvgIcone nome="localizacao" :tamanho="18" />
            <span>{{ enderecoCompleto() }}</span>
          </div>
          <div class="linha">
            <SvgIcone nome="relogio" :tamanho="18" />
            <span>{{ NEGOCIO.horario }}</span>
          </div>
        </div>
      </div>

      <div class="fecho">
        <p>© {{ ano }} {{ NEGOCIO.razaoSocial }} · Todos os direitos reservados.</p>

        <a class="autoria" href="https://www.gustavobernardi.com" target="_blank" rel="noopener" aria-label="Site desenvolvido por Gustavo Bernardi">
          <!-- fill e stroke em currentColor pra marca acompanhar o hover do link -->
          <svg viewBox="0 0 51 55" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
            <path d="M27 31H28L34 16.5V18.5L29 30.5L34 20.5L33.5 20L30 30.5L34 22.5V21.5L31.5 30.5H30.5L31.5 29.5V29L34 24V23.5L32.5 30.5L33.5 30L34 29.5V30.5V26.5L33 29.5L34 26L29.5 30.5H28.5" stroke="currentColor" />
            <path fill-rule="evenodd" clip-rule="evenodd" d="M19 53.5V25.5H26V32.5H39.5H40.5L42.5 30.5V28.5L41 26.5L40 26H37V19H44L49.5 24.5L50 25V33L46.5 36.5L49.5 39.5L50 40V47.5L49.5 48L49 48.5L43.5 54H43H19V53.5ZM43 42.5L40.5 40H40H26V47H40.5L43 44.5V42.5Z" fill="currentColor" />
            <path d="M35 12.5H27.5V11L24.5 8H11L8 11V27L11.5 30.5H16.5V38H8.5L0.5 30V8L8 0.5H27.5L34.5 7L35 7.5V12.5Z" fill="currentColor" />
            <path d="M27.5 31V23.5L25.5 23.4286L13.5 23V16H24H34H34.5V31H28M19 53.5V25.5H26V32.5H39.5H40.5L42.5 30.5V28.5L41 26.5L40 26H37V19H44L49.5 24.5L50 25V33L46.5 36.5L49.5 39.5L50 40V47.5L49.5 48L49 48.5L43.5 54H43H19V53.5ZM40.5 40L43 42.5V44.5L40.5 47H26V40H40H40.5ZM35 12.5H27.5V11L24.5 8H11L8 11V27L11.5 30.5H16.5V38H8.5L0.5 30V8L8 0.5H27.5L34.5 7L35 7.5V12.5Z" stroke="currentColor" />
            <rect x="13.5" y="16.5" width="18" height="7" fill="currentColor" />
            <path d="M28 27L28.5 23.5H29.5L29 25L28 27.5" stroke="currentColor" />
            <path d="M28 29L32 16.5H33H33.5L29.5 25.5L32.5 17L28 30" stroke="currentColor" />
            <rect x="32.5" y="16.5" width="1" height="1" fill="currentColor" />
          </svg>

          <div class="dados">
            <span>Desenvolvido por</span>
            <strong>Gustavo Bernardi</strong>
          </div>
        </a>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { NEGOCIO, linkWhatsapp, enderecoCompleto } from '~/helpers/negocio'

// os ids têm que bater com os das <section> da home, senão a âncora não leva a lugar nenhum
const LINKS = [
  { id: 'especialidades', nome: 'Especialidades' },
  { id: 'como-funciona', nome: 'Como funciona' },
  { id: 'planos', nome: 'Planos' },
  { id: 'atendimento', nome: 'Atendimento' },
  { id: 'perguntas', nome: 'Perguntas' },
  { id: 'contato', nome: 'Contato' }
]

const rota = useRoute()

// fora da home a ancora precisa do caminho, senao nao sai do lugar
const ancora = (id) => (rota.path === '/' ? `#${id}` : `/#${id}`)

const ano = new Date().getFullYear()
</script>

<style scoped lang="sass">
footer
  display: flex
  align-items: center
  justify-content: center
  width: 100%
  padding: 90px 40px 104px 40px
  background-color: var(--cor-azul-escuro)

  .conteudo
    display: flex
    flex-direction: column
    width: 100%
    max-width: var(--largura)

.topo
  display: grid
  grid-template-columns: 1.6fr 1fr 1fr 1.4fr
  gap: 50px
  padding: 0 0 50px 0

.sobre
  display: flex
  flex-direction: column
  align-items: flex-start

  .texto
    max-width: 340px
    margin: 22px 0 0 0
    font-family: var(--light)
    font-size: var(--f2)
    color: var(--cor-azul-suave)
    line-height: 1.6

.marca
  display: flex
  align-items: center

  img
    display: block
    width: auto
    height: 38px
    // o arquivo da marca e navy sobre transparente; no rodape escuro ela some.
    // trocar por um PNG negativo do cliente quando ele mandar
    filter: brightness(0) invert(1)

.coluna
  display: flex
  flex-direction: column
  align-items: flex-start
  gap: 14px

  h3
    margin: 0 0 6px 0
    font-family: var(--bold)
    font-size: var(--f1)
    color: var(--cor-branco)
    text-transform: uppercase
    letter-spacing: 1.4px

  a
    font-family: var(--light)
    font-size: var(--f2)
    color: var(--cor-azul-suave)
    transition: color 0.3s

    &:hover
      color: var(--cor-branco)

.coluna.contatos
  a,
  .linha
    display: flex
    align-items: flex-start
    gap: 10px

  span
    font-family: var(--light)
    font-size: var(--f2)
    color: var(--cor-azul-suave)
    line-height: 1.5

  .edusites-icone
    margin: 2px 0 0 0
    color: var(--cor-azul-suave)

.fecho
  display: flex
  align-items: center
  justify-content: space-between
  width: 100%
  padding: 26px 0 0 0
  gap: 16px
  border-top: 1px solid rgba(255, 255, 255, 0.12)

  p
    font-family: var(--light)
    font-size: var(--f1)
    color: var(--cor-azul-suave)
    line-height: 1.6

.autoria
  display: flex
  align-items: center
  gap: 11px
  color: var(--cor-azul-suave)
  transition: color 0.3s

  svg
    width: auto
    height: 26px

  .dados
    display: flex
    flex-direction: column
    line-height: 1.25

    span
      font-family: var(--light)
      font-size: var(--f0)

    strong
      font-family: var(--bold)
      font-size: var(--f1)

  &:hover
    color: var(--cor-branco)

@media screen and (max-width: 1000px)
  footer
    padding: 60px 20px 88px 20px

  .topo
    grid-template-columns: 1fr
    gap: 40px
    padding: 0 0 34px 0

  .sobre .texto
    max-width: 100%

  .fecho
    flex-direction: column
    align-items: flex-start
    gap: 8px
</style>
