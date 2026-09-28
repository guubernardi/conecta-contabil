# Conecta Contábil

Landing page institucional da Conecta Contábil, escritório de contabilidade especializado em negócios digitais (e-commerce, infoprodutos e serviços online).

**Site no ar:** https://conecta-contabil.vercel.app

## Destaques

- Páginas de especialidade geradas a partir de um único array de dados (`helpers/especialidades.js`, rota `/especialidades/[slug]`) — cada especialidade alimenta o carrossel da home, o dropdown do menu e sua própria landing page, sem tocar em mais nada ao adicionar um item novo.
- SEO estruturado com JSON-LD: `AccountingService` (com endereço, horário de funcionamento e área de atuação) na home, e `Service`/`OfferCatalog` + `FAQPage` em cada página de especialidade, gerado a partir do mesmo array que renderiza as perguntas.
- Revelação de elementos no scroll via diretiva customizada (`plugins/revelar.js`, `IntersectionObserver` único para a página), com fallback em `<noscript>` para quando JavaScript está desabilitado.
- Componentes de seção reutilizáveis: divisor de onda em SVG (`Onda`), faixa de destaque (`Faixa`) e botão flutuante de WhatsApp.
- Geração de favicons automatizada por script Node próprio (`scripts/gerar-favicons.cjs`) a partir da marca do cliente.
- Design tokens em CSS vars, com escala tipográfica fluida (`clamp()`), paleta azul dedicada e fontes Figtree self-hosted.

## Stack

- [Nuxt 3](https://nuxt.com/) (Vue 3, SSR)
- [Pinia](https://pinia.vuejs.org/)
- SASS indentado (`sass-embedded`)
- [@nuxt/image](https://image.nuxt.com/)
- [@edusites/icons](https://www.npmjs.com/package/@edusites/icons)
- Axios, mitt (event bus)

## Estrutura

```
components/
  global/     # elementos de UI (botão, campo, onda, faixa, whatsapp), footer, nav
  pages/      # seções da home, página de especialidade, documentos, nossa história
helpers/      # negocio.js (dados do cliente), especialidades.js, formatacao.js
plugins/      # revelar.js (scroll reveal), ícones, emitter
pages/        # index, especialidades/[slug], vagas, documentos/politicas, documentos/termos
scripts/      # gerar-favicons.cjs
public/       # imagens, fontes, favicons, sitemap, robots
```

## Rodando localmente

```bash
pnpm install
pnpm dev      # ambiente de desenvolvimento
pnpm build    # build de produção
pnpm preview  # servir o build gerado
```

---

Desenvolvido por [Gustavo Bernardi](https://github.com/guubernardi)
