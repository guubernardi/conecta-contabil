// Fonte unica das especialidades. E consumida em tres lugares: o carrossel da
// home, o dropdown do menu e a pagina /especialidades/[slug]. Se ela morasse
// dentro de um componente, os tres iam divergir na primeira edicao.
//
// `menu` e o rotulo curto do dropdown; `titulo` e o nome completo do card e da
// pagina. Acrescentar um item aqui ja cria a rota e a entrada no menu.
const ESPECIALIDADES = [
  {
    slug: 'ecommerce',
    servicos: [
      { icone: 'carrinho-compras', titulo: 'Conciliação por canal', texto: 'Relatório de repasse de cada marketplace cruzado com o extrato da conta PJ e com as notas emitidas.' },
      { icone: 'notas-fiscais', titulo: 'Emissão e escrituração', texto: 'Nota de venda, de devolução e de remessa, com o CFOP certo para cada operação e cada estado.' },
      { icone: 'balanca', titulo: 'ST, DIFAL e origem', texto: 'Substituição tributária e diferencial de alíquota apurados por UF, com a origem da mercadoria documentada.' },
      { icone: 'relatorio', titulo: 'DRE por canal', texto: 'Quanto cada marketplace deu de lucro depois de taxa, frete e devolução. Não só quanto faturou.' }
    ],
    perguntas: [
      { titulo: 'Vendo em três marketplaces. Precisa de um CNPJ para cada?', texto: 'Não. Um CNPJ atende todos os canais. O que muda é a organização interna: cada canal precisa ser conciliado separado, para você saber a margem real de cada um e para a apuração bater com o repasse.' },
      { titulo: 'A plataforma já emite a nota. Ainda preciso emitir?', texto: 'Depende do canal e do tipo de operação. Em alguns marketplaces a nota da venda continua sendo sua responsabilidade mesmo com o repasse intermediado. A gente mapeia isso canal a canal no início do contrato.' },
      { titulo: 'Como fica o estoque na contabilidade?', texto: 'Entra pelo CMV, o custo da mercadoria vendida. Sem ele o lucro aparece inflado e você paga imposto sobre um resultado que não existiu.' }
    ],
    icone: 'carrinho-compras',
    menu: 'E-commerce',
    titulo: 'E-commerce e marketplaces',
    texto: 'Loja própria e marketplaces no mesmo CNPJ, com a apuração batendo com o repasse.',
    pontos: ['Conciliação de repasses e taxas', 'Substituição tributária e DIFAL', 'Controle de estoque e CMV'],
    chamada: 'Contabilidade para quem vende em loja própria e em marketplace',
    paragrafos: [
      'Vender na Shopee, no Mercado Livre e na sua própria loja significa três formas diferentes de receber, três relatórios de repasse e três regras de emissão de nota. A maior parte dos escritórios trata tudo como uma receita só, e a apuração deixa de bater com o que caiu na conta.',
      'Aqui cada canal entra separado. Taxas, comissões, estornos e antecipações são conciliados contra o extrato da conta PJ, e o resultado do mês mostra quanto cada canal realmente deu de lucro, não só quanto faturou.'
    ]
  },
  {
    slug: 'infoprodutos',
    servicos: [
      { icone: 'lupa', titulo: 'Enquadramento no anexo certo', texto: 'Revisão do CNAE e do anexo do Simples, que é onde o infoprodutor mais paga imposto a mais sem perceber.' },
      { icone: 'moeda-game', titulo: 'Comissões de afiliados', texto: 'Tratamento da comissão paga e recebida, com a retenção correta e sem virar despesa sem documento.' },
      { icone: 'nuvem', titulo: 'Recebimento por gateway', texto: 'Conciliação do que a plataforma reteve, do prazo de repasse e do que efetivamente caiu na conta.' },
      { icone: 'grafico-crescimento', titulo: 'Planejamento de lançamento', texto: 'O pico de faturamento do mês entra planejado, com a projeção de imposto feita antes e não depois.' }
    ],
    perguntas: [
      { titulo: 'Qual anexo do Simples se aplica a infoproduto?', texto: 'Depende de como o produto é entregue e do que está no contrato social. A diferença entre anexos chega a vários pontos percentuais, então vale revisar antes de faturar alto, não depois.' },
      { titulo: 'Preciso emitir nota para cada venda do curso?', texto: 'Sim, e o modelo depende do município. Nos planos com emissão inclusa a gente emite; se você prefere emitir pela plataforma, configuramos o ambiente e revisamos os primeiros meses.' },
      { titulo: 'Como declaro o que pago aos meus afiliados?', texto: 'Como despesa, desde que documentada. Afiliado pessoa física e pessoa jurídica têm tratamentos diferentes de retenção, e é comum errar justamente aí.' }
    ],
    icone: 'play',
    menu: 'Infoprodutos',
    titulo: 'Infoprodutos e cursos online',
    texto: 'Lançamento, perpétuo e área de membros, com o enquadramento que evita imposto a mais.',
    pontos: ['Anexo correto no Simples', 'Comissões de afiliados', 'Recebimento por gateway'],
    chamada: 'Contabilidade para quem vive de lançamento e de curso online',
    paragrafos: [
      'Infoproduto é uma das atividades em que a escolha do anexo do Simples muda mais o imposto pago. Enquadramento errado custa caro todo mês, e o erro só aparece quando alguém compara a alíquota efetiva com a que deveria ser.',
      'Cuidamos do enquadramento, da tributação das comissões de afiliados e do recebimento por gateway, incluindo o intervalo entre a venda e o repasse. Se você faz lançamento, o pico de faturamento do mês entra planejado, não como surpresa.'
    ]
  },
  {
    slug: 'saas',
    servicos: [
      { icone: 'assinaturas', titulo: 'Receita diferida', texto: 'A assinatura anual paga à vista é reconhecida ao longo dos doze meses, e não toda na entrada.' },
      { icone: 'localizacao', titulo: 'ISS por município', texto: 'Apuração conforme o município do prestador e do tomador, que em serviço digital raramente coincidem.' },
      { icone: 'grafico-crescimento', titulo: 'MRR e churn no relatório', texto: 'As métricas que você acompanha entram no fechamento contábil, e não numa planilha paralela.' },
      { icone: 'cadeado', titulo: 'Contratos e inadimplência', texto: 'Tratamento de cancelamento, reembolso e cobrança não recebida, sem inflar receita que não vai entrar.' }
    ],
    perguntas: [
      { titulo: 'Por que não posso reconhecer a anuidade toda no mês da venda?', texto: 'Porque o serviço ainda não foi prestado. Reconhecer tudo na entrada infla o resultado daquele mês, distorce a base de imposto e faz o mês seguinte parecer uma queda que não existiu.' },
      { titulo: 'O ISS é do meu município ou do cliente?', texto: 'Depende do tipo de serviço. Em boa parte dos casos de software é do prestador, mas há exceções por natureza do serviço, e é onde mora o risco de recolher para o município errado.' },
      { titulo: 'Vocês acompanham MRR e churn?', texto: 'Sim, no relatório mensal. Métrica de produto e resultado contábil precisam conversar; separados, um sempre contradiz o outro na hora de decidir preço.' }
    ],
    icone: 'assinaturas',
    menu: 'SaaS e assinaturas',
    titulo: 'SaaS e assinaturas',
    texto: 'Receita recorrente precisa ser reconhecida no período certo, sem travar o seu financeiro.',
    pontos: ['Receita diferida e churn', 'ISS por município', 'Métricas de MRR no relatório'],
    chamada: 'Contabilidade para produtos de receita recorrente',
    paragrafos: [
      'Numa assinatura anual paga à vista, o dinheiro entra em um mês e o serviço é prestado ao longo de doze. Reconhecer tudo na entrada infla o resultado do mês e distorce a base de imposto. É o erro mais comum em contabilidade de SaaS.',
      'Trabalhamos com receita diferida, para que o resultado acompanhe a entrega, e trazemos MRR e churn para dentro do relatório mensal. O ISS é apurado conforme o município do prestador e do tomador, que em serviço digital raramente são o mesmo.'
    ]
  },
  {
    slug: 'agencias',
    servicos: [
      { icone: 'equipe', titulo: 'Departamento pessoal', texto: 'Admissão, folha, férias e rescisão de quem é CLT, com as obrigações acessórias em dia.' },
      { icone: 'documento-fiscal', titulo: 'Retenções sobre prestadores', texto: 'ISS e INSS retidos nas notas de PJ e freela, que é o passivo mais comum em agência fiscalizada.' },
      { icone: 'moeda-game', titulo: 'Pró-labore e lucros', texto: 'A separação entre os dois define quanto sai de imposto na retirada dos sócios todo mês.' },
      { icone: 'relatorio', titulo: 'Resultado por projeto', texto: 'Quanto cada cliente ou campanha deixou depois do custo de equipe e de mídia.' }
    ],
    perguntas: [
      { titulo: 'Tenho time misto de CLT, PJ e freela. Isso é problema?', texto: 'Não em si, mas cada arranjo tem obrigação diferente. O risco aparece quando um PJ trabalha com exclusividade e horário fixo, o que pode ser reclassificado como vínculo em uma fiscalização.' },
      { titulo: 'Preciso reter imposto na nota do meu freelancer?', texto: 'Em geral sim, e o percentual varia conforme o serviço e o município. Retenção não feita vira débito da agência, não do prestador.' },
      { titulo: 'Qual a diferença entre pró-labore e distribuição de lucros?', texto: 'Pró-labore é remuneração pelo trabalho do sócio e tem encargo; distribuição de lucros é resultado da empresa e, atendidos os requisitos, é isenta. O equilíbrio entre os dois muda bastante o imposto do ano.' }
    ],
    icone: 'equipe',
    menu: 'Agências',
    titulo: 'Agências e serviços digitais',
    texto: 'Time misto de CLT, PJ e freela, com folha e retenções em ordem na fiscalização.',
    pontos: ['Departamento pessoal completo', 'Retenções de ISS e INSS', 'Pró-labore e lucros'],
    chamada: 'Contabilidade para agências e prestadores de serviço digital',
    paragrafos: [
      'Agência quase sempre tem time misto: alguns CLT, vários PJ e freelas por projeto. Cada arranjo tem uma obrigação diferente, e é aí que mora o risco de passivo trabalhista e de retenção não recolhida.',
      'Cuidamos do departamento pessoal por inteiro, das retenções de ISS e INSS sobre notas de prestadores, e da separação entre pró-labore e distribuição de lucros — que é o que define quanto sai de imposto na retirada dos sócios.'
    ]
  },
  {
    slug: 'criadores',
    servicos: [
      { icone: 'video', titulo: 'Publicidade e patrocínio', texto: 'Contrato, nota e tributação do conteúdo pago, incluindo permuta, que também é receita.' },
      { icone: 'nuvem', titulo: 'Monetização de plataforma', texto: 'Receita paga do exterior, com o câmbio registrado na data certa e a documentação da origem.' },
      { icone: 'pessoas', titulo: 'Separação entre PF e PJ', texto: 'A fronteira entre você e a empresa, que é onde mais aparece problema quando o faturamento cresce.' },
      { icone: 'escudo-check', titulo: 'Regularização retroativa', texto: 'Para quem começou faturando como pessoa física e quer migrar sem deixar pendência para trás.' }
    ],
    perguntas: [
      { titulo: 'Recebo do exterior. Como isso é tributado?', texto: 'A receita entra convertida pela taxa da data do fechamento do câmbio, e o comprovante de origem precisa ficar arquivado. É o ponto que mais gera questionamento em criador que monetiza plataforma.' },
      { titulo: 'Permuta conta como receita?', texto: 'Sim. Receber produto ou serviço em troca de conteúdo é receita e precisa ser registrada pelo valor de mercado, mesmo sem dinheiro envolvido.' },
      { titulo: 'Vale mais a pena continuar como pessoa física?', texto: 'Até certo faturamento, às vezes sim. Passando dele, a diferença de alíquota costuma pagar o CNPJ com folga. A conta é individual e a gente faz antes de você decidir.' }
    ],
    icone: 'video',
    menu: 'Criadores de conteúdo',
    titulo: 'Criadores de conteúdo',
    texto: 'Publicidade, monetização e recebimento do exterior entram cada um com uma regra.',
    pontos: ['Receita em moeda estrangeira', 'Permuta e publieditorial', 'Separação entre PF e PJ'],
    chamada: 'Contabilidade para criador que virou empresa',
    paragrafos: [
      'A receita de um criador vem de fontes com tratamentos distintos: publicidade contratada, monetização de plataforma paga do exterior, permuta e conteúdo patrocinado. Somar tudo numa nota só é o caminho mais rápido para pagar imposto errado.',
      'Organizamos cada fonte, incluindo o câmbio do que vem de fora, e cuidamos da fronteira entre pessoa física e jurídica — a confusão entre as duas é o que mais gera problema quando o criador começa a faturar de verdade.'
    ]
  },
  {
    slug: 'dropshipping',
    servicos: [
      { icone: 'caminhao-entrega', titulo: 'Importação e nacionalização', texto: 'Tributos da entrada apurados e registrados, com o custo real do produto chegando ao seu resultado.' },
      { icone: 'moeda-game', titulo: 'Câmbio da compra', texto: 'Cada pagamento ao fornecedor de fora registrado pela taxa da operação, com comprovante arquivado.' },
      { icone: 'documento-fiscal', titulo: 'Documentação de origem', texto: 'A cadeia de cada produto documentada antes de alguém perguntar, e não durante uma fiscalização.' },
      { icone: 'carrinho-compras', titulo: 'Venda e conciliação', texto: 'Nota de saída, repasse do canal e devolução conciliados com o que entrou na conta.' }
    ],
    perguntas: [
      { titulo: 'Preciso de nota do fornecedor de fora?', texto: 'Precisa da documentação da importação. Sem ela a mercadoria entra sem custo comprovado, o lucro aparece maior do que foi e o imposto sobe junto.' },
      { titulo: 'Quem paga o imposto de importação, eu ou o cliente?', texto: 'Depende do modelo. Se a remessa vai direto ao consumidor, a responsabilidade e o risco mudam bastante em relação ao modelo com estoque próprio. É a primeira coisa que a gente mapeia.' },
      { titulo: 'Dropshipping é legal no Brasil?', texto: 'É, desde que a operação seja declarada e os tributos de entrada recolhidos. O problema nunca é o modelo, é operar sem registrar.' }
    ],
    icone: 'caminhao-entrega',
    menu: 'Dropshipping',
    titulo: 'Dropshipping e importação',
    texto: 'Da nota de entrada ao imposto na nacionalização, com documentação pronta para a Receita.',
    pontos: ['Importação e câmbio', 'Tributação na entrada', 'Documentação de origem'],
    chamada: 'Contabilidade para quem importa e revende',
    paragrafos: [
      'Dropshipping e importação juntam duas coisas que a Receita olha de perto: mercadoria que entra no país e dinheiro que sai. Sem a documentação de origem organizada, uma fiscalização vira problema mesmo quando a operação é regular.',
      'Cuidamos da tributação na entrada, do câmbio da compra e do registro de cada operação, de forma que a origem de cada produto e de cada pagamento esteja documentada antes de alguém perguntar.'
    ]
  }
]

function acharEspecialidade(slug) {
  return ESPECIALIDADES.find((area) => area.slug === slug) || null
}

export { ESPECIALIDADES, acharEspecialidade }
