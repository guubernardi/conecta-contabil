<template>
  <section class="diferenciais">
    <div class="conteudo">
      <div class="apresentacao revela-esq" v-revelar>
        <div class="etiqueta">Seja Conecta</div>
        <h2>
          Um time completo
          <span>para cuidar da sua empresa</span>
        </h2>
        <p>Você não contrata um contador solto. Contrata um escritório que só atende negócio digital e já viu a sua operação antes.</p>

        <div class="numeros">
          <div class="numero" v-for="item in NUMEROS" :key="item.valor">
            <strong>{{ item.valor }}</strong>
            <p>{{ item.curto }}</p>
          </div>
        </div>
      </div>

      <div class="linha">
        <div class="passo revela-dir" v-for="(passo, i) in PASSOS" :key="passo.titulo" v-revelar="i * 90">
          <div class="icone icone-revela" v-revelar="i * 90 + 240">
            <SvgIcone :nome="passo.icone" :tamanho="22" />
          </div>
          <div class="dados">
            <h3>{{ passo.titulo }}</h3>
            <p>{{ passo.texto }}</p>
          </div>
        </div>
      </div>
    </div>

    <ElementosOnda direcao="descendo" cor-frente="var(--cor-branco)" cor-atras="var(--cor-azul-medio)" cor-linha="var(--cor-azul-medio)" />
  </section>
</template>

<script setup>
import { NUMEROS } from '~/helpers/negocio'

// o conteudo aqui e o mesmo em todas as especialidades: descreve como a Conecta
// trabalha, nao o nicho. por isso nao entra no helper de especialidades
const PASSOS = [
  { icone: 'headset', titulo: 'Atendimento humanizado', texto: 'Você fala com o contador responsável pela sua conta, não com um atendimento que precisa consultar alguém.' },
  { icone: 'notas-fiscais', titulo: 'Emissão de notas inclusa', texto: 'Nos planos com emissão, você manda os dados e a gente emite. Sem depender de você aprender o sistema da prefeitura.' },
  { icone: 'relogio', titulo: 'Resposta em 1 dia útil', texto: 'Esse é o compromisso, e na prática a maioria das mensagens é respondida no mesmo dia.' },
  { icone: 'seta-trocar-horizontal', titulo: 'Migração sem custo', texto: 'A gente pede a documentação ao contador antigo, revisa o que veio e corrige as pendências antes de assumir.' }
]
</script>

<style lang="sass" scoped>
section.diferenciais
  position: relative
  display: flex
  align-items: center
  justify-content: center
  width: 100%
  padding: 110px 40px 190px 40px
  background-color: var(--cor-azul-escuro)

  .conteudo
    display: grid
    grid-template-columns: 1fr 1.1fr
    align-items: center
    width: 100%
    max-width: var(--largura)
    gap: 80px

.apresentacao
  display: flex
  flex-direction: column
  align-items: flex-start
  max-width: 600px

  .etiqueta
    font-family: var(--bold)
    font-size: var(--f0)
    color: var(--cor-azul-suave)
    text-transform: uppercase
    letter-spacing: 3px

  h2
    margin: 20px 0 0 0
    font-family: var(--light)
    font-size: var(--f9)
    color: var(--cor-branco)
    line-height: 1.22

    span
      display: block
      font-family: var(--bold)
      color: var(--cor-azul-suave)

  p
    margin: 20px 0 0 0
    font-family: var(--light)
    font-size: var(--f2)
    color: var(--cor-azul-claro)
    line-height: 1.75

.numeros
  display: grid
  grid-template-columns: repeat(2, 1fr)
  width: 100%
  margin: 40px 0 0 0
  gap: 20px

  .numero
    padding: 20px 22px 20px 22px
    border: 1px solid rgba(255, 255, 255, 0.14)
    border-radius: 18px
    background-color: rgba(255, 255, 255, 0.05)

    strong
      font-family: var(--bold)
      font-size: var(--f6)
      color: var(--cor-branco)

    p
      margin: 4px 0 0 0
      font-family: var(--light)
      font-size: var(--f1)
      color: var(--cor-azul-suave)

// o fio vertical liga os passos. e um pseudo-elemento do container, e nao uma
// borda em cada item, senao ele apareceria tambem depois do ultimo
.linha
  position: relative
  display: flex
  flex-direction: column
  gap: 34px

  &::before
    content: ''
    position: absolute
    top: 28px
    bottom: 28px
    left: 27px
    width: 1px
    background-color: rgba(255, 255, 255, 0.16)

.passo
  position: relative
  display: flex
  align-items: flex-start
  gap: 20px

  .icone
    display: flex
    align-items: center
    justify-content: center
    width: 56px
    min-width: 56px
    height: 56px
    border-radius: 100px
    background-color: var(--cor-azul)
    color: var(--cor-branco)

  h3
    margin: 6px 0 0 0
    font-family: var(--bold)
    font-size: var(--f4)
    color: var(--cor-branco)

  p
    margin: 8px 0 0 0
    font-family: var(--light)
    font-size: var(--f2)
    color: var(--cor-azul-suave)
    line-height: 1.65

@media screen and (max-width: 1000px)
  section.diferenciais
    padding: 70px 20px 120px 20px

    .conteudo
      grid-template-columns: 1fr
      gap: 44px

  .apresentacao
    max-width: 100%

  .numeros
    margin: 30px 0 0 0
    gap: 12px

    .numero
      padding: 16px 18px 16px 18px

  .linha
    gap: 26px

    &::before
      left: 23px

  .passo
    gap: 15px

    .icone
      width: 46px
      min-width: 46px
      height: 46px
</style>
