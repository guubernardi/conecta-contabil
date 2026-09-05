<template>
  <!-- o createError abaixo interrompe a rota, mas o SSR ainda passa uma vez por
       aqui: sem a guarda, os componentes recebem area nula -->
  <div id="tela" v-if="area">
    <EspecialidadeSectionHero :area="area" />
    <EspecialidadeSectionServicos :area="area" />
    <EspecialidadeSectionDiferenciais />
    <EspecialidadeSectionPerguntas :area="area" />
    <IndexSectionContato />
  </div>
</template>

<script setup>
import { NEGOCIO } from '~/helpers/negocio'
import { acharEspecialidade } from '~/helpers/especialidades'

definePageMeta({
  layout: 'web'
})

const rota = useRoute()
const area = acharEspecialidade(rota.params.slug)

// slug inexistente vira 404 de verdade, e nao uma pagina em branco respondendo
// 200 que o Google acabaria indexando
if (!area) {
  throw createError({ statusCode: 404, statusMessage: 'Especialidade não encontrada', fatal: true })
}

const TITULO = `Contabilidade para ${area.menu} | Conecta Contábil`
const ENDERECO = `${NEGOCIO.dominio}/especialidades/${area.slug}`

useHead({
  title: TITULO,
  meta: [
    { name: 'description', content: area.texto },
    { property: 'og:title', content: TITULO },
    { property: 'og:description', content: area.texto },
    { property: 'og:url', content: ENDERECO }
  ],
  link: [{ rel: 'canonical', href: ENDERECO }],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Service',
        '@id': `${ENDERECO}#servico`,
        name: `Contabilidade para ${area.titulo}`,
        description: area.texto,
        url: ENDERECO,
        serviceType: 'Serviços contábeis',
        areaServed: { '@type': 'Country', name: 'Brasil' },
        provider: { '@type': 'AccountingService', name: NEGOCIO.nome, url: NEGOCIO.dominio },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: `Serviços para ${area.titulo}`,
          itemListElement: area.servicos.map((servico) => ({
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: servico.titulo, description: servico.texto }
          }))
        }
      })
    }
  ]
})
</script>
