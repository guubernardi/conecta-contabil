// Dados do cliente. Tudo aqui e PROVISORIO ate a Conecta Contabil confirmar:
// telefone, e-mail, endereco, CNPJ, CRC, redes e dominio precisam ser trocados antes de publicar.
const NEGOCIO = {
  nome: 'Conecta Contábil',
  razaoSocial: 'Conecta Contábil Serviços Contábeis Ltda.',
  descricao: 'Contabilidade especializada em negócios digitais. Do e-commerce aos serviços online, cuidamos da parte contábil para você focar em crescer.',
  dominio: 'https://conectacontabil.com.br',
  // NAO renderizado em lugar nenhum, mesmo motivo do crc: numero de registro
  // falso no ar e problema serio pra uma contabilidade
  cnpj: '',
  // NAO renderizado em lugar nenhum. numero de registro profissional falso no ar
  // e problema serio pra uma contabilidade: so voltar a exibir com o CRC real
  crc: '',
  email: 'contato@conectacontabil.com.br',
  telefone: '(11) 4000-0000',
  telefoneLink: 'tel:+551140000000',
  whatsapp: '5511900000000',
  endereco: {
    logradouro: 'Av. Paulista, 1000',
    complemento: 'Conjunto 101',
    bairro: 'Bela Vista',
    cidade: 'São Paulo',
    estado: 'SP',
    cep: '01310-100'
  },
  horario: 'Segunda a sexta, das 8h30 às 18h',
  instagram: 'https://instagram.com/conectacontabil',
  linkedin: 'https://linkedin.com/company/conectacontabil'
}

// PROVISORIO: numeros de vitrine, precisam ser confirmados pelo cliente.
// vivem aqui porque aparecem no hero e na secao Nossa Historia: se ficassem
// duplicados nos dois componentes, um dia iam divergir.
// `curto` e a versao do hero, onde a linha e apertada; `rotulo` e a da secao.
const NUMEROS = [
  { icone: 'clientes', valor: '+320', curto: 'Negócios atendidos', rotulo: 'negócios digitais na carteira' },
  { icone: 'calendario-check', valor: '12 anos', curto: 'De estrada', rotulo: 'cuidando de CNPJ brasileiro' },
  { icone: 'relogio', valor: '1 dia útil', curto: 'Prazo de resposta', rotulo: 'é o nosso prazo de resposta' },
  { icone: 'aperto-maos', valor: '96%', curto: 'Seguem com a gente', rotulo: 'dos clientes seguem com a gente' }
]

const MENSAGEM_ABERTURA = 'Olá! Quero abrir minha empresa com a Conecta Contábil.'
const MENSAGEM_TROCA = 'Olá! Quero trocar de contador e levar minha empresa para a Conecta Contábil.'
const MENSAGEM_PLANO = 'Olá! Quero entender qual plano faz mais sentido para o meu negócio.'

// o texto entra pre-preenchido no WhatsApp pra conversa nao comecar do zero
function linkWhatsapp(mensagem = MENSAGEM_ABERTURA) {
  return `https://wa.me/${NEGOCIO.whatsapp}?text=${encodeURIComponent(mensagem)}`
}

function enderecoCompleto() {
  const { logradouro, complemento, bairro, cidade, estado, cep } = NEGOCIO.endereco
  return `${logradouro}, ${complemento} - ${bairro}, ${cidade}/${estado}, ${cep}`
}

export { NEGOCIO, NUMEROS, MENSAGEM_ABERTURA, MENSAGEM_TROCA, MENSAGEM_PLANO, linkWhatsapp, enderecoCompleto }
