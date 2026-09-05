// Um unico IntersectionObserver para a pagina inteira, em vez de um por elemento
let observador = null

// quem ja foi revelado. WeakSet porque a chave e o proprio elemento: quando ele
// sai do DOM, a entrada some junto e nao vaza memoria
const revelados = new WeakSet()

function obterObservador() {
  if (observador) return observador

  observador = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => {
        if (!entrada.isIntersecting) return
        revelados.add(entrada.target)
        entrada.target.classList.add('revelado')
        observador.unobserve(entrada.target)
      })
    },
    { threshold: 0.12, rootMargin: '0px 0px -70px 0px' }
  )

  return observador
}

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('revelar', {
    mounted(el, binding) {
      if (typeof IntersectionObserver === 'undefined') {
        el.classList.add('revelado')
        return
      }

      const atraso = Number(binding.value) || 0
      if (atraso) el.style.transitionDelay = `${atraso}ms`

      obterObservador().observe(el)
    },

    // o Vue reescreve o atributo class inteiro quando um :class reativo muda no
    // mesmo elemento, e leva junto a classe que o observer adicionou por fora.
    // era o que apagava itens ja revelados do FAQ ao abrir e fechar o acordeao
    updated(el) {
      if (revelados.has(el)) el.classList.add('revelado')
    },

    unmounted(el) {
      observador?.unobserve(el)
    }
  })
})
