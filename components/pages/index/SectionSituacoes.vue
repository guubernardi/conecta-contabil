<template>
  <section class="situacoes" id="situacoes">
    <div class="conteudo">
      <div class="cabecalho revela" v-revelar>
        <div class="etiqueta">Soa familiar?</div>
        <h2>
          Você abriu um negócio digital,
          <span>não uma empresa de burocracia</span>
        </h2>
        <p>Essas são as reclamações que mais ouvimos de quem chega até a gente vindo de uma contabilidade tradicional.</p>
      </div>

      <div class="cartoes">
        <div class="card revela" v-for="(situacao, i) in SITUACOES" :key="situacao.titulo" v-revelar="i * 80">
          <div class="icone icone-revela" v-revelar="i * 80 + 240">
            <SvgIcone :nome="situacao.icone" :tamanho="20" />
          </div>
          <h3>{{ situacao.titulo }}</h3>
          <p>{{ situacao.texto }}</p>
        </div>
      </div>
    </div>

    <ElementosOnda direcao="descendo" cor-frente="var(--cor-azul)" cor-atras="var(--cor-azul-medio)" cor-linha="var(--cor-azul-suave)" />
  </section>
</template>

<script setup>
// um icone por dor: o mesmo simbolo repetido seis vezes nao ajudava a distinguir
// um card do outro nem a ler a secao passando o olho
const SITUACOES = [
  { icone: 'carrinho-compras', titulo: 'O contador não entende marketplace', texto: 'Ele pede a nota que a plataforma já emitiu e trava quando você fala em split de pagamento ou repasse.' },
  { icone: 'calendario-x', titulo: 'O imposto aparece no dia do vencimento', texto: 'Sem previsão nenhuma, o caixa do mês vira surpresa e o pagamento sai correndo, quase sempre com multa.' },
  { icone: 'duvida', titulo: 'Ninguém sabe dizer se deu lucro', texto: 'Extrato não é resultado. Sem DRE por canal, definir preço e decidir investimento vira chute.' },
  { icone: 'balanca', titulo: 'Gateway e marketplace nunca fecham', texto: 'Taxas, repasses, estornos e antecipações entram de jeitos diferentes e a conciliação não bate.' },
  { icone: 'mao-dinheiro', titulo: 'Você paga mais imposto do que precisa', texto: 'Sem revisão de enquadramento e de anexo, o Simples costuma custar bem mais caro do que deveria.' },
  { icone: 'ampulheta', titulo: 'A resposta demora dias para chegar', texto: 'Você manda mensagem na segunda, cobra na quarta e a resposta chega na sexta. Quando chega.' }
]
</script>

<style lang="sass" scoped>
section.situacoes
  position: relative
  display: flex
  align-items: center
  justify-content: center
  width: 100%
  padding: 130px 40px 190px 40px
  background-color: var(--cor-azul-escuro)

  .conteudo
    width: 100%
    max-width: var(--largura)

.cabecalho
  display: flex
  flex-direction: column
  align-items: center
  text-align: center

  .etiqueta
    padding: 9px 18px 9px 18px
    border: 1px solid rgba(255, 255, 255, 0.2)
    border-radius: 100px
    font-family: var(--bold)
    font-size: var(--f0)
    color: var(--cor-azul-suave)
    text-transform: uppercase
    letter-spacing: 1.4px

  h2
    max-width: 800px
    margin: 24px 0 0 0
    font-family: var(--light)
    font-size: var(--f9)
    color: var(--cor-branco)
    line-height: 1.25

    span
      font-family: var(--bold)
      color: var(--cor-azul-suave)

  p
    max-width: 620px
    margin: 20px 0 0 0
    font-family: var(--light)
    font-size: var(--f2)
    color: var(--cor-azul-suave)
    line-height: 1.7

.cartoes
  display: grid
  grid-template-columns: repeat(3, 1fr)
  margin: 60px 0 0 0
  gap: 24px

.card
  display: flex
  flex-direction: column
  align-items: flex-start
  padding: 32px 30px 32px 30px
  border: 1px solid rgba(255, 255, 255, 0.12)
  border-radius: 26px
  background-color: rgba(255, 255, 255, 0.04)

  .icone
    display: flex
    align-items: center
    justify-content: center
    width: 46px
    height: 46px
    border-radius: 14px
    background-color: rgba(188, 211, 244, 0.14)
    color: var(--cor-azul-suave)

  h3
    margin: 22px 0 0 0
    font-family: var(--bold)
    font-size: var(--f4)
    color: var(--cor-branco)
    line-height: 1.35

  p
    margin: 12px 0 0 0
    font-family: var(--light)
    font-size: var(--f2)
    color: var(--cor-azul-suave)
    line-height: 1.65

@media screen and (max-width: 1000px)
  section.situacoes
    padding: 80px 20px 120px 20px

  .cabecalho h2,
  .cabecalho p
    max-width: 100%

  .cartoes
    grid-template-columns: 1fr
    margin: 40px 0 0 0
    gap: 16px

  .card
    padding: 26px 24px 26px 24px
</style>
