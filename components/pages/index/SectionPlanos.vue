<template>
  <section class="planos" id="planos">
    <div class="conteudo">
      <div class="cabecalho revela" v-revelar>
        <div class="etiqueta">Preço transparente</div>
        <h2>
          Planos que escalam
          <span>com o seu faturamento</span>
        </h2>
        <p>Sem taxa de adesão, sem fidelidade e sem custo escondido. Você troca de plano quando o faturamento mudar, não quando o contrato permitir.</p>
      </div>

      <div class="cartoes">
        <article class="card revela" :class="{ destaque: plano.destaque }" v-for="(plano, i) in PLANOS" :key="plano.nome" v-revelar="i * 90">
          <div class="topo">
            <h3>{{ plano.nome }}</h3>
            <div class="selo" v-if="plano.destaque">Recomendado</div>
          </div>

          <p class="perfil">{{ plano.perfil }}</p>

          <div class="preco">
            <span class="de">a partir de</span>
            <div class="valor">
              <span>R$</span>
              <strong>{{ plano.preco }}</strong>
              <span>/mês</span>
            </div>
          </div>

          <ul>
            <li v-for="item in plano.inclui" :key="item">
              <SvgIcone nome="check-circulo" :tamanho="16" />
              <span>{{ item }}</span>
            </li>
          </ul>

          <ElementosBotao :texto="plano.destaque ? 'Escolher Crescimento' : 'Falar sobre esse plano'" :link="linkWhatsapp(`Olá! Quero saber mais sobre o plano ${plano.nome}.`)" externo :icone="plano.destaque ? 'predio-comercial' : ''" :estilo="plano.destaque ? 'principal' : 'secundario'" />
        </article>
      </div>

      <p class="nota revela" v-revelar>{{ NOTA_PRECO }}</p>
    </div>

    <ElementosOnda direcao="descendo" cor-frente="var(--cor-fundo)" cor-atras="var(--cor-azul-suave)" cor-linha="var(--cor-azul-medio)" />
  </section>
</template>

<script setup>
import { linkWhatsapp } from '~/helpers/negocio'

// PROVISORIO: valores e faixas de faturamento sao exemplos. Trocar pela tabela
// real da Conecta Contabil antes de publicar, senao vira preco anunciado errado.
const PLANOS = [
  {
    nome: 'Início',
    perfil: 'Para quem está abrindo o CNPJ ou fatura até R$ 30 mil por mês.',
    preco: '249',
    destaque: false,
    inclui: ['Abertura de empresa sem custo de honorário', 'Contabilidade e impostos do Simples', 'Emissão de até 20 notas por mês', 'Suporte por WhatsApp em 1 dia útil', 'Pró-labore de 1 sócio']
  },
  {
    nome: 'Crescimento',
    perfil: 'Para lojas e serviços digitais faturando de R$ 30 mil a R$ 150 mil por mês.',
    preco: '449',
    destaque: true,
    inclui: ['Tudo do plano Início', 'Conciliação de marketplaces e gateways', 'Departamento pessoal até 5 funcionários', 'DRE mensal por canal de venda', 'Revisão de enquadramento a cada 6 meses', 'Pró-labore de até 3 sócios']
  },
  {
    nome: 'Escala',
    perfil: 'Para operações acima de R$ 150 mil por mês ou com mais de um CNPJ.',
    preco: '890',
    destaque: false,
    inclui: ['Tudo do plano Crescimento', 'Planejamento tributário anual', 'Múltiplos CNPJ e filiais', 'Reunião mensal com o contador responsável', 'BPO financeiro opcional']
  }
]

const NOTA_PRECO = 'Valores de referência. O preço final depende do volume de notas, do número de funcionários e da quantidade de canais de venda.'
</script>

<style lang="sass" scoped>
section.planos
  position: relative
  display: flex
  align-items: center
  justify-content: center
  width: 100%
  padding: 120px 40px 190px 40px
  background-color: var(--cor-branco)

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
    padding: 8px 16px 8px 16px
    border-radius: 100px
    background-color: var(--cor-azul-claro)
    font-family: var(--bold)
    font-size: var(--f0)
    color: var(--cor-azul)

  h2
    max-width: 800px
    margin: 22px 0 0 0
    font-family: var(--light)
    font-size: var(--f9)
    color: var(--cor-azul-escuro)
    line-height: 1.22

    span
      display: block
      font-family: var(--bold)
      color: var(--cor-azul)

  p
    max-width: 620px
    margin: 18px 0 0 0
    font-family: var(--light)
    font-size: var(--f2)
    color: var(--cor-cinza)
    line-height: 1.7

// center, e nao start: assim o card do meio cresce pros dois lados e sobra
// pra fora dos vizinhos em cima e embaixo, como na referencia
.cartoes
  display: grid
  grid-template-columns: repeat(3, 1fr)
  align-items: center
  width: 100%
  margin: 56px 0 0 0
  gap: 26px

.card
  display: flex
  flex-direction: column
  align-items: flex-start
  height: 100%
  padding: 36px 32px 36px 32px
  border: 1px solid var(--cor-cinza-claro)
  border-radius: 26px
  background-color: var(--cor-branco)

  .topo
    display: flex
    align-items: center
    flex-wrap: wrap
    gap: 10px

    h3
      font-family: var(--bold)
      font-size: var(--f6)
      color: var(--cor-azul-escuro)

    .selo
      padding: 5px 11px 5px 11px
      border-radius: 100px
      background-color: var(--cor-azul)
      font-family: var(--bold)
      font-size: var(--f0)
      color: var(--cor-branco)
      text-transform: uppercase
      letter-spacing: 1px

  .perfil
    min-height: 56px
    margin: 12px 0 0 0
    font-family: var(--light)
    font-size: var(--f1)
    color: var(--cor-cinza)
    line-height: 1.6

  .preco
    margin: 20px 0 0 0

    .de
      font-family: var(--light)
      font-size: var(--f0)
      color: var(--cor-cinza)

    .valor
      display: flex
      align-items: baseline
      margin: 4px 0 0 0
      gap: 5px

      span
        font-family: var(--light)
        font-size: var(--f2)
        color: var(--cor-cinza)

      strong
        font-family: var(--bold)
        font-size: var(--f10)
        color: var(--cor-azul)
        line-height: 1

  ul
    display: flex
    flex-direction: column
    width: 100%
    margin: 26px 0 32px 0
    gap: 12px
    list-style: none

    li
      display: flex
      align-items: flex-start
      gap: 10px
      color: var(--cor-azul)

      span
        font-family: var(--light)
        font-size: var(--f1)
        color: var(--cor-azul-escuro)
        line-height: 1.5

  // auto no topo empurra o botao pra base: os tres fecham alinhados mesmo
  // com quantidades diferentes de itens na lista
  .botao
    width: 100%
    margin: auto 0 0 0

// o destaque e so borda, fundo levissimo e mais respiro. preencher o card
// inteiro de azul, como estava antes, custava contraste na lista de itens
.card.destaque
  padding: 48px 32px 48px 32px
  border: 2px solid var(--cor-azul)
  box-shadow: 0 18px 50px rgba(18, 86, 196, 0.12)

.nota
  max-width: 640px
  margin: 36px 0 0 0
  font-family: var(--light)
  font-size: var(--f1)
  color: var(--cor-cinza)
  line-height: 1.6
  text-align: center

@media screen and (max-width: 1000px)
  section.planos
    padding: 80px 20px 120px 20px

  .cabecalho
    h2,
    p
      max-width: 100%

  .cartoes
    grid-template-columns: 1fr
    margin: 40px 0 0 0
    gap: 16px

  .card
    padding: 30px 24px 30px 24px

    .perfil
      min-height: auto

  // em coluna unica nao existe "meio" pra sobressair: so a borda diferencia
  .card.destaque
    padding: 30px 24px 30px 24px

  .nota
    max-width: 100%
    margin: 26px 0 0 0
</style>
