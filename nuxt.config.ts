import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  devtools: { enabled: false },
  ssr: true,
  debug: false,
  css: ['~/assets/css/index.sass'],
  components: {
    dirs: ['~/components/global', '~/components/pages']
  },
  experimental: {
    payloadExtraction: false,
    inlineSSRStyles: false,
    viewTransition: true
  },
  modules: ['@pinia/nuxt', '@nuxt/image'],
  // o IPX depende do sharp, que nao compila no Windows e derruba toda imagem em dev.
  // as artes de public/ ja vao no tamanho final, entao servimos direto. pra ligar a
  // otimizacao no servidor Linux: trocar por provider 'ipx' e instalar o sharp la.
  image: {
    provider: 'none',
    quality: 80,
    format: ['webp', 'avif', 'png', 'jpg'],
    densities: [1, 2]
  },
  nitro: {
    compressPublicAssets: true,
    minify: true,
    storage: {
      memory: {
        driver: 'memory'
      }
    }
  },
  // pacotes de icone com top-level await quebram no alvo padrao do Vite (es2020),
  // onde TLA nao existe. es2022 e a versao que o especifica.
  vite: {
    build: {
      target: 'es2022'
    },
    esbuild: {
      target: 'es2022'
    },
    optimizeDeps: {
      esbuildOptions: {
        target: 'es2022'
      }
    }
  },
  build: {
    // sem transpilar, o Vite pre-bundla o pacote e nao transforma o import.meta.glob
    // dele: o cliente perde o tree-shaking e baixa o monolito de 1197 icones (763 KB)
    transpile: ['@edusites/icons'],
    optimization: {
      splitChunks: {
        layouts: true,
        pages: true,
        commons: true
      }
    }
  },
  compatibilityDate: '2025-04-03'
})
