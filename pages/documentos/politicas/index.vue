<template>
  <div id="tela">
    <DocumentosPoliticasSectionDocumento />
  </div>
</template>

<script setup>
import { NEGOCIO } from '~/helpers/negocio'

definePageMeta({
  layout: 'web'
})

const TITULO = 'Política de Privacidade | Conecta Contábil'
const DESCRICAO = 'Como a Conecta Contábil coleta, usa e protege os dados pessoais de visitantes do site e de clientes dos seus serviços contábeis.'

useHead({
  title: TITULO,
  meta: [
    { name: 'description', content: DESCRICAO },
    { name: 'robots', content: 'noindex, follow' },
    { property: 'og:title', content: TITULO },
    { property: 'og:description', content: DESCRICAO },
    { property: 'og:url', content: `${NEGOCIO.dominio}/documentos/politicas` }
  ],
  link: [{ rel: 'canonical', href: `${NEGOCIO.dominio}/documentos/politicas` }]
})
</script>
