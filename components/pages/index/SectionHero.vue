<template>
  <section class="hero" id="inicio">
    <svg class="tracos" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" fill="none" aria-hidden="true" focusable="false">
      <path v-for="(traco, i) in TRACOS" :key="i" :d="traco" vector-effect="non-scaling-stroke" />
    </svg>

    <div class="conteudo">
      <div class="texto">
        <div class="etiqueta">
          <SvgIcone nome="trofeu" :tamanho="14" />
          <p>{{ SELO_PREMIO }}</p>
        </div>

        <h1 class="titulo">A contabilidade por trás de negócios digitais que crescem.</h1>

        <p class="descricao">Do e-commerce aos serviços digitais, cuidamos da parte contábil para você focar no que realmente importa: fazer seu negócio crescer.</p>

        <div class="acoes">
          <ElementosBotao texto="Abrir minha empresa" :link="linkWhatsapp(MENSAGEM_ABERTURA)" externo icone="predio-comercial" estilo="principal" />

          <a class="troca" :href="linkWhatsapp(MENSAGEM_TROCA)" target="_blank" rel="noopener">
            <SvgIcone nome="seta-trocar-horizontal" :tamanho="18" />
            <span>Trocar de contador</span>
          </a>
        </div>

        <div class="numeros">
          <div class="numero" v-for="numero in NUMEROS" :key="numero.valor">
            <strong>{{ numero.valor }}</strong>
            <p>{{ numero.curto }}</p>
          </div>
        </div>
      </div>

      <div class="painel">
        <div class="moldura">
          <div class="foto">
            <NuxtImg src="/imagens/homem-hero.png" alt="Contador da Conecta Contábil acompanhando o faturamento de um cliente no notebook" width="1312" height="1199" draggable="false" preload />
          </div>

          <div class="cartao faturamento">
            <p class="rotulo">Faturamento</p>
            <div class="valor">
              <strong>{{ FATURAMENTO.valor }}</strong>
              <span class="alta">
                <SvgIcone nome="seta-tendencia-alta" :tamanho="12" />
                {{ FATURAMENTO.variacao }}
              </span>
            </div>
            <div class="grafico" aria-hidden="true">
              <div class="barra" v-for="barra in FATURAMENTO.barras" :key="barra.mes" :style="{ '--altura': barra.altura + '%' }"></div>
            </div>
          </div>

          <div class="cartao obrigacoes">
            <div class="item" v-for="item in ENTREGAS" :key="item.nome">
              <SvgIcone :nome="item.icone" :tamanho="16" />
              <p>{{ item.nome }}</p>
              <SvgIcone class="feito" nome="check-circulo" :tamanho="16" />
            </div>
          </div>

          <div class="cartao tempo">
            <strong>Mais tempo para o que realmente importa.</strong>
            <div class="apoio">
              <SvgIcone nome="escudo-check" :tamanho="16" />
              <p>Seu crescimento com mais segurança</p>
            </div>
          </div>

          <div class="plataformas" aria-hidden="true">
            <div class="chip" v-for="plataforma in PLATAFORMAS" :key="plataforma">
              <SvgIcone :nome="plataforma" :tamanho="22" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <ElementosOnda direcao="descendo" cor-frente="var(--cor-azul-escuro)" cor-atras="var(--cor-azul-medio)" cor-linha="var(--cor-azul-medio)" />
  </section>
</template>

<script setup>
import { NUMEROS, linkWhatsapp, MENSAGEM_ABERTURA, MENSAGEM_TROCA } from '~/helpers/negocio'

// PROVISORIO: premiacao veio da referencia de layout. So publicar depois que o
// cliente comprovar o premio, senao vira publicidade enganosa.
const SELO_PREMIO = 'Premiada a melhor contabilidade do ramo digital'

// numeros ilustrativos do painel, nao sao dados de cliente real
const FATURAMENTO = {
  valor: 'R$ 284.930,00',
  variacao: '+12%',
  barras: [{ mes: 'out', altura: 38 }, { mes: 'nov', altura: 52 }, { mes: 'dez', altura: 44 }, { mes: 'jan', altura: 66 }, { mes: 'fev', altura: 58 }, { mes: 'mar', altura: 82 }, { mes: 'abr', altura: 100 }]
}

const ENTREGAS = [
  { nome: 'Obrigações em dia', icone: 'documento-fiscal' },
  { nome: 'Emissão de notas', icone: 'notas-fiscais' },
  { nome: 'Relatórios financeiros', icone: 'relatorio' },
  { nome: 'Suporte especializado', icone: 'headset' }
]

// plataformas que a contabilidade integra. trocar pela lista real do cliente.
// quatro e o teto: a quinta pilula bate no cartao "mais tempo"
const PLATAFORMAS = ['shopee', 'mercadolivre', 'stripe', 'pix']

// curvas decorativas que atravessam o hero inteiro, em coordenadas do viewBox
// 1600x900. cada uma e uma cubica unica, entao nao existe emenda pra vincar, e as
// pontas comecam fora do viewBox pra sangrar nas bordas em vez de terminar na tela
const TRACOS = ['M-80 300C400 160 1000 150 1720 430', 'M-80 600C420 740 1080 700 1720 300', 'M120 900C520 700 1080 640 1720 800', 'M-60 460C380 420 800 220 1720 80']
</script>

<style lang="sass" scoped>
section.hero
  position: relative
  display: flex
  align-items: center
  justify-content: center
  width: 100%
  // min-height, nao height: em tela baixa o conteudo cresce em vez de vazar
  min-height: 100dvh
  padding: 170px 40px 200px 40px
  background-color: var(--cor-fundo)
  overflow: hidden

  .conteudo
    position: relative
    z-index: 1
    display: grid
    grid-template-columns: 1fr 1.15fr
    align-items: center
    width: 100%
    max-width: var(--largura)
    gap: 70px

// atravessam o hero inteiro por tras do conteudo. o slice cobre a secao sem
// distorcer as curvas, e o non-scaling-stroke do template segura a espessura
// do traco em 1.5px em qualquer largura de tela
.tracos
  position: absolute
  top: 0
  left: 0
  width: 100%
  height: 100%
  opacity: 0.75
  pointer-events: none
  // o texto vive na coluna da esquerda. a mascara apaga os tracos ali e so os
  // revela a partir do painel, entao nenhuma curva cruza letra. a zona de fade
  // e em %, entao ela acompanha o grid 1fr / 1.15fr em qualquer largura
  -webkit-mask-image: linear-gradient(to right, transparent 36%, #000 58%)
  mask-image: linear-gradient(to right, transparent 36%, #000 58%)

  path
    fill: none
    stroke: var(--cor-azul-suave)
    stroke-width: 1.5
    stroke-linecap: round

.texto
  display: flex
  flex-direction: column
  align-items: flex-start
  max-width: 620px

// o hero ja esta visivel no carregamento, entao anima por delay e nao por observer
.etiqueta,
.titulo,
.descricao,
.acoes,
.numeros
  opacity: 0
  animation: subindo 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards

.etiqueta
  display: flex
  align-items: center
  padding: 8px 16px 8px 14px
  gap: 8px
  border-radius: 100px
  background-color: var(--cor-azul-claro)
  color: var(--cor-azul)
  animation-delay: 0.05s

  p
    font-family: var(--bold)
    font-size: var(--f0)
    color: var(--cor-azul-escuro)
    letter-spacing: 0.4px

.titulo
  margin: 28px 0 0 0
  font-family: var(--bold)
  font-size: var(--f11)
  color: var(--cor-azul-escuro)
  line-height: 1.14
  letter-spacing: -1px
  animation-delay: 0.15s

.descricao
  max-width: 460px
  margin: 24px 0 0 0
  font-family: var(--light)
  font-size: var(--f2)
  color: var(--cor-cinza)
  line-height: 1.7
  animation-delay: 0.25s

.acoes
  display: flex
  align-items: center
  margin: 38px 0 0 0
  gap: 24px
  animation-delay: 0.35s

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

.numeros
  display: flex
  align-items: center
  margin: 46px 0 0 0
  gap: 30px
  animation-delay: 0.45s

  .numero
    display: flex
    flex-direction: column
    gap: 3px

    strong
      font-family: var(--bold)
      font-size: var(--f4)
      color: var(--cor-azul-escuro)
      white-space: nowrap

    p
      font-family: var(--light)
      font-size: var(--f0)
      color: var(--cor-cinza)
      white-space: nowrap

  // filete entre um numero e outro, sem elemento extra no template
  .numero + .numero
    padding: 0 0 0 30px
    border-left: 1px solid var(--cor-cinza-claro)

.painel
  display: flex
  align-items: center
  justify-content: center
  opacity: 0
  animation: subindo 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.4s forwards

.moldura
  position: relative
  // sem max-width: a moldura ocupa a coluna inteira do grid, entao a borda
  // direita dela encosta no mesmo limite de 1600px do nav e do titulo
  width: 100%
  // o recorte nao preenche mais a caixa, entao a altura precisa vir da proporcao
  aspect-ratio: 72 / 50
  // raio grande em dois cantos opostos e quase reto nos outros dois: quebra a
  // caixa certinha sem virar bolha. a variavel desce pro .foto recortar igual
  --raio-moldura: 40px 200px 40px 40px
  border-radius: var(--raio-moldura)
  background-color: var(--cor-azul-claro)

// clipe proprio pra foto: o overflow nao pode ir na moldura porque no mobile os
// cartoes sao posicionados pra fora dela de proposito
.foto
  position: absolute
  inset: 0
  display: flex
  align-items: flex-end
  // encostado a direita: os cartoes de faturamento e obrigacoes ocupam a metade
  // esquerda da moldura, e centralizado ele ficava embaixo dos dois
  justify-content: flex-end
  // sem overflow: hidden. a foto e mais alta que a moldura de proposito e a
  // sobra tem que aparecer por cima dela. a base ja e o corte do proprio PNG,
  // entao nada vaza por baixo
  overflow: visible

  img
    display: block
    // altura manda, nao largura: o recorte e quase quadrado e encostar a base
    // no rodape faz ele parecer sentado na moldura, nao flutuando
    width: auto
    // 112% da moldura: os 12% de sobra sao a cabeca e o ombro passando do topo
    height: 112%
    // o recuo abre a faixa da direita pras pilulas de plataforma nao caírem
    // em cima do ombro dele
    margin: 0 8% 0 0

.cartao
  position: absolute
  z-index: 2
  padding: 16px 18px 16px 18px
  border-radius: 18px
  background-color: var(--cor-branco)
  box-shadow: var(--sombra-flutuante)

.cartao.faturamento
  top: 6%
  left: 13%
  width: 210px

  .rotulo
    font-family: var(--light)
    font-size: var(--f0)
    color: var(--cor-cinza)

  .valor
    display: flex
    align-items: baseline
    margin: 4px 0 0 0
    gap: 8px

    strong
      font-family: var(--bold)
      font-size: var(--f2)
      color: var(--cor-azul-escuro)
      white-space: nowrap

    .alta
      display: flex
      align-items: center
      gap: 3px
      font-family: var(--bold)
      font-size: var(--f0)
      color: var(--cor-verde)

  .grafico
    display: flex
    align-items: flex-end
    height: 44px
    margin: 12px 0 0 0
    gap: 5px

    .barra
      width: 100%
      height: var(--altura)
      border-radius: 3px
      background-color: var(--cor-azul-suave)

    .barra:last-child
      background-color: var(--cor-azul)

.cartao.obrigacoes
  top: 38%
  left: 1%
  width: 214px

  .item
    display: flex
    align-items: center
    padding: 7px 0 7px 0
    gap: 9px
    color: var(--cor-azul)

    p
      flex: 1
      font-family: var(--light)
      font-size: var(--f0)
      color: var(--cor-azul-escuro)

    .feito
      color: var(--cor-verde)

.cartao.tempo
  right: 7%
  bottom: 12%
  width: 210px

  strong
    display: block
    font-family: var(--bold)
    font-size: var(--f1)
    color: var(--cor-azul-escuro)
    line-height: 1.4

  .apoio
    display: flex
    align-items: center
    margin: 12px 0 0 0
    padding: 10px 12px 10px 12px
    gap: 8px
    border-radius: 12px
    background-color: var(--cor-azul-claro)
    color: var(--cor-azul)

    p
      font-family: var(--light)
      font-size: var(--f0)
      color: var(--cor-azul-escuro)
      line-height: 1.35

.plataformas
  position: absolute
  top: 8%
  right: 2%
  z-index: 3
  display: flex
  flex-direction: column
  gap: 14px

  .chip
    display: flex
    align-items: center
    justify-content: center
    width: 46px
    height: 46px
    border-radius: 14px
    background-color: var(--cor-branco)
    color: var(--cor-azul)
    box-shadow: var(--sombra-flutuante)

  // o zigue-zague evita a coluna reta e deixa os chips soltos sobre a foto
  .chip:nth-child(even)
    transform: translateX(-30px)

@media screen and (max-width: 1000px)
  section.hero
    // no mobile as duas colunas empilham e ja passam da tela; a altura minima
    // so serve pra nao encolher quando a foto ainda nao carregou
    min-height: 100dvh
    padding: 116px 20px 130px 20px

    .conteudo
      grid-template-columns: 1fr
      gap: 46px

  // empilhado, o texto passa a ficar em cima em vez de a esquerda:
  // a mascara tem que virar vertical junto
  .tracos
    -webkit-mask-image: linear-gradient(to bottom, transparent 30%, #000 52%)
    mask-image: linear-gradient(to bottom, transparent 30%, #000 52%)

  .texto
    max-width: 100%

  .titulo,
  .descricao
    max-width: 100%

  .acoes
    flex-direction: column
    align-items: stretch
    width: 100%
    gap: 18px

    .troca
      justify-content: center

  // quatro colunas nao cabem em 350px. viram 2x2, e cada numero ganha caixa
  // propria: soltos com filete lateral eles liam como tabela mal formatada
  .numeros
    display: grid
    grid-template-columns: repeat(2, 1fr)
    // o .texto e flex com align-items: flex-start, entao o filho encolhe pro
    // tamanho do conteudo. sem esta largura os cards ficavam mais estreitos
    // que o botao logo acima
    width: 100%
    margin: 34px 0 0 0
    gap: 12px

    .numero
      padding: 16px 16px 16px 16px
      border: 1px solid var(--cor-cinza-claro)
      border-radius: 16px
      background-color: var(--cor-branco)

    // o filete separava colunas na linha unica do desktop; na grade ele sobra
    .numero + .numero
      padding: 16px 16px 16px 16px
      border-left: 1px solid var(--cor-cinza-claro)

  // 200px num painel de ~350px de largura viraria meia-lua: o raio encolhe junto.
  // e a proporcao vira quadrada: em 72/50 a moldura fica com ~240px de altura e
  // o cartao de entregas, que tem ~140px, comeria mais da metade dela
  .moldura
    --raio-moldura: 20px 90px 20px 20px
    aspect-ratio: 1

  // a foto sobe pra ocupar o vao azul do topo e afastar o rosto do cartao
  .foto img
    height: 90%
    margin: 0 3% 0 0

  .cartao
    padding: 14px 16px 14px 16px
    border-radius: 16px

  // em 350px, tres cartoes flutuantes viram sopa. fica so a lista de entregas,
  // que e o que diz alguma coisa, e dentro da moldura
  .cartao.faturamento,
  .cartao.tempo
    display: none

  // a coluna em zigue-zague do desktop nao cabe na lateral, mas sobra faixa
  // azul acima da cabeca: aqui as marcas viram uma fileira centrada nela
  .plataformas
    top: 4%
    right: auto
    left: 0
    flex-direction: row
    justify-content: center
    width: 100%
    gap: 10px

    .chip
      width: 38px
      height: 38px
      border-radius: 12px

    .chip:nth-child(even)
      transform: none

  .cartao.obrigacoes
    top: auto
    right: 5%
    bottom: 4%
    left: 5%
    width: auto

    // cada linha mais curta tira ~16px do cartao, que e o que devolve
    // folga entre o rosto e o topo dele
    .item
      padding: 5px 0 5px 0
</style>
