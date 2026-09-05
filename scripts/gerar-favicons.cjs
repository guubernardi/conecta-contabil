// Gera a bateria de favicons a partir de public/imagens/marca-conecta.png.
// A marca e azul sobre transparente; aqui ela vira branca sobre um quadrado
// arredondado azul da marca. Num favicon de 16px, forma cheia le muito melhor
// que um desenho fino que some no tema escuro do navegador.
const zlib = require('zlib')
const fs = require('fs')
const path = require('path')

const TABELA = (() => {
  const t = new Uint32Array(256)
  for (let n = 0; n < 256; n++) {
    let c = n
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
    t[n] = c >>> 0
  }
  return t
})()

const crc32 = (b) => {
  let c = 0xffffffff
  for (let i = 0; i < b.length; i++) c = TABELA[(c ^ b[i]) & 0xff] ^ (c >>> 8)
  return (c ^ 0xffffffff) >>> 0
}

const bloco = (tipo, dados) => {
  const len = Buffer.alloc(4)
  len.writeUInt32BE(dados.length)
  const t = Buffer.from(tipo, 'ascii')
  const crc = Buffer.alloc(4)
  crc.writeUInt32BE(crc32(Buffer.concat([t, dados])))
  return Buffer.concat([len, t, dados, crc])
}

const paeth = (a, b, c) => {
  const p = a + b - c
  const pa = Math.abs(p - a)
  const pb = Math.abs(p - b)
  const pc = Math.abs(p - c)
  return pa <= pb && pa <= pc ? a : pb <= pc ? b : c
}

function lerPng(caminho) {
  const buf = fs.readFileSync(caminho)
  let pos = 8
  let largura = 0
  let altura = 0
  const idats = []
  while (pos < buf.length) {
    const len = buf.readUInt32BE(pos)
    const tipo = buf.slice(pos + 4, pos + 8).toString('ascii')
    const dados = buf.slice(pos + 8, pos + 8 + len)
    if (tipo === 'IHDR') {
      largura = dados.readUInt32BE(0)
      altura = dados.readUInt32BE(4)
      if (dados[8] !== 8 || dados[9] !== 6) throw new Error('esperado RGBA 8 bits')
    }
    if (tipo === 'IDAT') idats.push(dados)
    if (tipo === 'IEND') break
    pos += 12 + len
  }
  const bruto = zlib.inflateSync(Buffer.concat(idats))
  const bpp = 4
  const stride = largura * bpp
  const px = Buffer.alloc(altura * stride)
  for (let y = 0; y < altura; y++) {
    const f = bruto[y * (stride + 1)]
    const linha = bruto.slice(y * (stride + 1) + 1, y * (stride + 1) + 1 + stride)
    for (let x = 0; x < stride; x++) {
      const a = x >= bpp ? px[y * stride + x - bpp] : 0
      const b = y > 0 ? px[(y - 1) * stride + x] : 0
      const c = x >= bpp && y > 0 ? px[(y - 1) * stride + x - bpp] : 0
      let v = linha[x]
      if (f === 1) v += a
      else if (f === 2) v += b
      else if (f === 3) v += (a + b) >> 1
      else if (f === 4) v += paeth(a, b, c)
      px[y * stride + x] = v & 0xff
    }
  }
  return { largura, altura, px }
}

const marca = lerPng('public/imagens/marca-conecta.png')

// alfa da marca por amostragem bilinear, em coordenadas 0..1
function alfaMarca(u, v) {
  if (u < 0 || u > 1 || v < 0 || v > 1) return 0
  const fx = u * (marca.largura - 1)
  const fy = v * (marca.altura - 1)
  const x0 = Math.floor(fx)
  const y0 = Math.floor(fy)
  const x1 = Math.min(x0 + 1, marca.largura - 1)
  const y1 = Math.min(y0 + 1, marca.altura - 1)
  const tx = fx - x0
  const ty = fy - y0
  const em = (x, y) => marca.px[(y * marca.largura + x) * 4 + 3] / 255
  return em(x0, y0) * (1 - tx) * (1 - ty) + em(x1, y0) * tx * (1 - ty) + em(x0, y1) * (1 - tx) * ty + em(x1, y1) * tx * ty
}

const AZUL = [0x12, 0x56, 0xc4]

// cobertura do quadrado arredondado, com suavizacao por supersample nas bordas
function coberturaTile(x, y, lado, raio) {
  const dentro = (px, py) => {
    const cx = Math.min(Math.max(px, raio), lado - raio)
    const cy = Math.min(Math.max(py, raio), lado - raio)
    const dx = px - cx
    const dy = py - cy
    return dx * dx + dy * dy <= raio * raio
  }
  let soma = 0
  for (let sy = 0; sy < 3; sy++) {
    for (let sx = 0; sx < 3; sx++) {
      if (dentro(x + (sx + 0.5) / 3, y + (sy + 0.5) / 3)) soma++
    }
  }
  return soma / 9
}

function gerar(lado) {
  const raio = Math.max(1, lado * 0.2)
  const escala = 0.66 // quanto do lado a marca ocupa
  const desenho = lado * escala
  const off = (lado - desenho) / 2

  const bruto = Buffer.alloc(lado * (1 + lado * 4))
  for (let y = 0; y < lado; y++) {
    const base = y * (1 + lado * 4)
    bruto[base] = 0
    for (let x = 0; x < lado; x++) {
      const tile = coberturaTile(x, y, lado, raio)
      const a = alfaMarca((x + 0.5 - off) / desenho, (y + 0.5 - off) / desenho)

      // marca branca por cima do azul, tudo recortado pelo tile
      const r = Math.round(AZUL[0] * (1 - a) + 255 * a)
      const g = Math.round(AZUL[1] * (1 - a) + 255 * a)
      const b = Math.round(AZUL[2] * (1 - a) + 255 * a)

      const p = base + 1 + x * 4
      bruto[p] = r
      bruto[p + 1] = g
      bruto[p + 2] = b
      bruto[p + 3] = Math.round(tile * 255)
    }
  }

  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(lado, 0)
  ihdr.writeUInt32BE(lado, 4)
  ihdr[8] = 8
  ihdr[9] = 6
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    bloco('IHDR', ihdr),
    bloco('IDAT', zlib.deflateSync(bruto, { level: 9 })),
    bloco('IEND', Buffer.alloc(0))
  ])
}

const ARQUIVOS = {
  'favicon-16x16.png': 16,
  'favicon-32x32.png': 32,
  'favicon-194x194.png': 194,
  'apple-touch-icon.png': 180,
  'android-chrome-36x36.png': 36,
  'android-chrome-48x48.png': 48,
  'android-chrome-72x72.png': 72,
  'android-chrome-96x96.png': 96,
  'android-chrome-144x144.png': 144,
  'android-chrome-192x192.png': 192,
  'android-chrome-256x256.png': 256,
  'android-chrome-384x384.png': 384,
  'android-chrome-512x512.png': 512,
  'mstile-70x70.png': 70,
  'mstile-144x144.png': 144,
  'mstile-150x150.png': 150,
  'mstile-310x310.png': 310
}

const destino = 'public/favicons'
const cache = new Map()

for (const [nome, lado] of Object.entries(ARQUIVOS)) {
  if (!cache.has(lado)) cache.set(lado, gerar(lado))
  fs.writeFileSync(path.join(destino, nome), cache.get(lado))
}

// mstile-310x150 e o unico retangular: tile centralizado em fundo transparente
function gerarLargo(largura, altura) {
  const lado = altura
  const quadrado = gerar(lado)
  // reaproveita decodificando o proprio PNG que acabamos de montar
  const tmp = path.join(destino, '.tmp-tile.png')
  fs.writeFileSync(tmp, quadrado)
  const tile = lerPng(tmp)
  fs.unlinkSync(tmp)

  const offX = Math.round((largura - lado) / 2)
  const bruto = Buffer.alloc(altura * (1 + largura * 4))
  for (let y = 0; y < altura; y++) {
    const base = y * (1 + largura * 4)
    bruto[base] = 0
    for (let x = 0; x < largura; x++) {
      const sx = x - offX
      const p = base + 1 + x * 4
      if (sx >= 0 && sx < lado) {
        const q = (y * lado + sx) * 4
        bruto[p] = tile.px[q]
        bruto[p + 1] = tile.px[q + 1]
        bruto[p + 2] = tile.px[q + 2]
        bruto[p + 3] = tile.px[q + 3]
      }
    }
  }
  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(largura, 0)
  ihdr.writeUInt32BE(altura, 4)
  ihdr[8] = 8
  ihdr[9] = 6
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    bloco('IHDR', ihdr),
    bloco('IDAT', zlib.deflateSync(bruto, { level: 9 })),
    bloco('IEND', Buffer.alloc(0))
  ])
}

fs.writeFileSync(path.join(destino, 'mstile-310x150.png'), gerarLargo(310, 150))

// favicon.ico: container com PNGs embutidos, que todo navegador atual aceita
const NO_ICO = [16, 32, 48]
const imagens = NO_ICO.map((lado) => ({ lado, dados: cache.get(lado) || gerar(lado) }))

const cabecalho = Buffer.alloc(6)
cabecalho.writeUInt16LE(0, 0)
cabecalho.writeUInt16LE(1, 2)
cabecalho.writeUInt16LE(imagens.length, 4)

let deslocamento = 6 + imagens.length * 16
const entradas = imagens.map(({ lado, dados }) => {
  const e = Buffer.alloc(16)
  e[0] = lado >= 256 ? 0 : lado
  e[1] = lado >= 256 ? 0 : lado
  e[2] = 0
  e[3] = 0
  e.writeUInt16LE(1, 4)
  e.writeUInt16LE(32, 6)
  e.writeUInt32LE(dados.length, 8)
  e.writeUInt32LE(deslocamento, 12)
  deslocamento += dados.length
  return e
})

fs.writeFileSync(
  path.join(destino, 'favicon.ico'),
  Buffer.concat([cabecalho, ...entradas, ...imagens.map((i) => i.dados)])
)

console.log('gerados', Object.keys(ARQUIVOS).length + 2, 'arquivos')
for (const [nome] of Object.entries(ARQUIVOS)) {
  console.log(' ', nome, fs.statSync(path.join(destino, nome)).size, 'bytes')
}
console.log('  mstile-310x150.png', fs.statSync(path.join(destino, 'mstile-310x150.png')).size, 'bytes')
console.log('  favicon.ico', fs.statSync(path.join(destino, 'favicon.ico')).size, 'bytes')
