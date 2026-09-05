<template>
  <div id="tela">
    <IndexSectionHero />
    <IndexSectionSituacoes />
    <IndexSectionEspecialidades />
    <IndexSectionComoFunciona />
    <ElementosFaixa />
    <IndexSectionPlanos />
    <IndexSectionComecar />
    <IndexSectionAtendimento />
    <IndexSectionPerguntas />
    <IndexSectionContato />
  </div>
</template>

<script setup>
import { NEGOCIO, enderecoCompleto } from '~/helpers/negocio'

definePageMeta({
  layout: 'web'
})

const TITULO = 'Conecta Contábil | Contabilidade para negócios digitais'

useHead({
  title: TITULO,
  meta: [
    { name: 'description', content: NEGOCIO.descricao },
    { property: 'og:title', content: TITULO },
    { property: 'og:description', content: NEGOCIO.descricao },
    { property: 'og:url', content: NEGOCIO.dominio }
  ],
  link: [{ rel: 'canonical', href: NEGOCIO.dominio }],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'AccountingService',
        '@id': `${NEGOCIO.dominio}/#negocio`,
        name: NEGOCIO.nome,
        legalName: NEGOCIO.razaoSocial,
        description: NEGOCIO.descricao,
        url: NEGOCIO.dominio,
        telephone: NEGOCIO.telefoneLink.replace('tel:', ''),
        email: NEGOCIO.email,
        image: `${NEGOCIO.dominio}/favicons/share.png`,
        priceRange: '$$',
        areaServed: { '@type': 'Country', name: 'Brasil' },
        address: {
          '@type': 'PostalAddress',
          streetAddress: `${NEGOCIO.endereco.logradouro}, ${NEGOCIO.endereco.complemento}`,
          addressLocality: NEGOCIO.endereco.cidade,
          addressRegion: NEGOCIO.endereco.estado,
          postalCode: NEGOCIO.endereco.cep,
          addressCountry: 'BR'
        },
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            opens: '08:30',
            closes: '18:00'
          }
        ],
        sameAs: [NEGOCIO.instagram, NEGOCIO.linkedin],
        knowsAbout: ['Contabilidade para e-commerce', 'Tributação de infoprodutos', 'Simples Nacional', 'Departamento pessoal', 'Planejamento tributário'],
        // o endereco completo tambem entra em texto pra ficar legivel em resposta de IA
        slogan: `Contabilidade especializada em negócios digitais em ${NEGOCIO.endereco.cidade}. ${enderecoCompleto()}`
      })
    }
  ]
})
</script>
