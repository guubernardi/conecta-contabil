# Conecta Contábil

Landing page institucional da Conecta Contábil, contabilidade especializada em
negócios digitais. Nuxt 3 com SSR, SASS indentado e ícones do `@edusites/icons`.

## Rodar

```
pnpm install
pnpm run dev      # desenvolvimento
pnpm run build    # build de produção
pnpm run preview  # servir o build
```

## Onde mexer

| O quê | Arquivo |
| --- | --- |
| Telefone, e-mail, CNPJ, endereço, domínio, redes | `helpers/negocio.js` |
| Paleta, escala tipográfica, larguras | `assets/css/variaveis.sass` |
| Seções da home, na ordem da página | `pages/index.vue` |
| Conteúdo de cada seção | `components/pages/index/Section*.vue` |
| Menu e rodapé | `components/global/nav/`, `components/global/footer/` |

Todo texto que se repete sai de um `const` no topo do `script setup` da própria
seção e entra por `v-for`. Não existe bloco copiado no template.

## Pendências antes de publicar

Estão marcadas no código com o comentário `PROVISORIO`. Buscar com:

```
grep -rn "PROVISORIO" components/ helpers/
```

1. `helpers/negocio.js` — telefone, WhatsApp, e-mail, CNPJ, CRC, endereço,
   domínio e redes sociais estão preenchidos com valores de exemplo.
2. Hero — o selo "Premiada a melhor contabilidade do ramo digital" só pode ir ao
   ar com o prêmio comprovado.
3. `SectionPlanos.vue` — os valores dos três planos são referência, não a tabela
   real.
4. `SectionNossaHistoria.vue` — os quatro números de vitrine precisam ser
   confirmados pelo cliente.
5. Foto do hero: `public/imagens/homem-hero.png`, recorte com fundo
   transparente. A moldura assume proporção 72/50 e a foto é alinhada pela base.
6. Documentos de `politicas` e `termos` — modelos redigidos para contabilidade,
   ainda sem revisão jurídica.
7. Logo no rodapé usa `filter: brightness(0) invert(1)` para ficar branca. Se o
   cliente mandar um PNG negativo (ou a marca em SVG), trocar.

## Arquivos de marca pendentes

1. **Marca em vetor.** A única fonte hoje é `public/imagens/logo-conecta-contabil.png`,
   com 294x49. Dentro dele a marca ocupa só 52px, então ela borra em qualquer
   uso ampliado (hoje: o emblema do Como funciona). Pedir o SVG ao cliente.
2. **Favicons** foram gerados a partir de `public/imagens/marca-conecta.png`
   (marca branca sobre quadrado azul arredondado). Como a fonte tem 52px úteis,
   os tamanhos grandes (256, 384, 512) ficam com a borda macia. Regerar a partir
   do SVG quando o cliente enviar, rodando o script de geração de novo.
3. **`safari-pinned-tab.svg` foi removido**, junto com o `mask-icon` no
   `app.vue`. Ele exige um SVG monocromático e a única fonte é bitmap; o Safari
   cai no favicon normal. Voltar quando houver a marca em vetor.

## Terceiros

- `public/imagens/br.svg` — mapa do Brasil da **simplemaps.com**, licença livre
  para uso comercial (termos em simplemaps.com/resources/svg-license).
  O aviso de copyright está preservado dentro do arquivo e não deve ser removido.
  As cores foram gravadas na raiz do SVG (`fill` e `stroke`) na paleta do projeto.

## Especialidades

A lista vive em `helpers/especialidades.js` e alimenta três lugares: o carrossel
da home, o dropdown do menu e a rota `/especialidades/[slug]`. Adicionar um item
ao array já cria a página e a entrada no menu, sem tocar em mais nada.

O texto de cada página (`chamada` e `paragrafos`) é um ponto de partida escrito
por mim. Vale revisar com o cliente antes de publicar, e provavelmente ampliar:
duas páginas de dois parágrafos competem mal por busca orgânica.

### Página de especialidade

`/especialidades/[slug]` é uma landing page completa, montada a partir do
`helpers/especialidades.js`. Cada especialidade traz `servicos` (4) e
`perguntas` (3) próprios; o bloco de diferenciais é o mesmo em todas, porque
descreve como a Conecta trabalha e não o nicho.

Traz dois JSON-LD: `Service` com `OfferCatalog` na página, e `FAQPage` no
acordeão, gerado do mesmo array que renderiza as perguntas.
