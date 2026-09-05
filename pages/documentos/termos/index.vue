<template>
  <div id="tela">
    <DocumentosTermosSectionDocumento />
  </div>
</template>

<script setup>
import { NEGOCIO } from '~/helpers/negocio'

definePageMeta({
  layout: 'web'
})

const TITULO = 'Termos de Uso | Conecta Contábil'
const DESCRICAO = 'Condições de uso do site da Conecta Contábil, limites das informações publicadas e regras de contato com a equipe.'

useHead({
  title: TITULO,
  meta: [
    { name: 'description', content: DESCRICAO },
    { name: 'robots', content: 'noindex, follow' },
    { property: 'og:title', content: TITULO },
    { property: 'og:description', content: DESCRICAO },
    { property: 'og:url', content: `${NEGOCIO.dominio}/documentos/termos` }
  ],
  link: [{ rel: 'canonical', href: `${NEGOCIO.dominio}/documentos/termos` }]
})
</script>
