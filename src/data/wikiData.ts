export interface ChecklistItem {
  id: string;
  label: string;
}

export interface TrailDay {
  day: number;
  shortTitle: string;
  fullTitle: string;
  tag: string;
  readTime: string;
  type: string;
  description: string;
  tip: string;
  checklist: ChecklistItem[];
}

export interface CrmFlow {
  id: string;
  title: string;
  steps: string[];
}

export interface TroubleshootingItem {
  id: string;
  module: "Módulo Fiscal" | "Módulo Financeiro" | "Integrações";
  title: string;
  symptom: string;
  rootCause: string;
  solution: string[];
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const trailDays: TrailDay[] = [
  {
    day: 1,
    shortTitle: "Primeiros passos no CRM",
    fullTitle: "Dia 1: Como abrir um chamado de Nível 1 no CRM",
    tag: "Dia 1 · Trilha Suporte N1",
    readTime: "Leitura de 8 min",
    type: "Artigo teórico",
    description:
      "Um chamado bem aberto evita retrabalho e perguntas repetidas ao suporte. Siga o checklist abaixo na ordem e marque cada etapa ao concluir.",
    tip: "Dica: em caso de dúvida sobre a categoria do chamado, consulte o FAQ antes de escalar.",
    checklist: [
      { id: "d1-1", label: "Acessar o CRM e abrir Novo Chamado" },
      { id: "d1-2", label: "Identificar o cliente e confirmar os dados de contato" },
      { id: "d1-3", label: "Selecionar a categoria e a prioridade adequadas ao incidente" },
      { id: "d1-4", label: "Descrever o problema de forma objetiva anexando prints ou logs" },
    ],
  },
  {
    day: 2,
    shortTitle: "Triagem e prioridades",
    fullTitle: "Dia 2: Classificação de urgência e regras de fila",
    tag: "Dia 2 · Trilha Suporte N1",
    readTime: "Leitura de 6 min",
    type: "Artigo teórico",
    description:
      "O atendimento na TK2000 é imediato, mas saber priorizar incidentes críticos garante que nenhum cliente fique com a operação travada.",
    tip: "Dica: PDV parado ou falha na emissão fiscal em horário comercial têm prioridade máxima.",
    checklist: [
      { id: "d2-1", label: "Verificar se o problema paralisa as vendas do cliente" },
      { id: "d2-2", label: "Classificar o SLA conforme matriz de severidade do CRM" },
      { id: "d2-3", label: "Validar se o erro já consta na base de Troubleshooting" },
    ],
  },
  {
    day: 3,
    shortTitle: "Comunicação com o cliente",
    fullTitle: "Dia 3: Padrão de atendimento ágil e clareza técnica",
    tag: "Dia 3 · Trilha Suporte N1",
    readTime: "Leitura de 5 min",
    type: "Artigo teórico",
    description:
      "Nossa meta é não deixar o cliente esperando. Mantenha uma comunicação direta, cordial e registrada integralmente no ticket.",
    tip: "Dica: nunca realize intervenções remotas sem antes registrar o início do atendimento no chamado.",
    checklist: [
      { id: "d3-1", label: "Saudar o cliente e confirmar o protocolo de atendimento" },
      { id: "d3-2", label: "Explicar o procedimento que será realizado de forma simples" },
      { id: "d3-3", label: "Documentar o resumo da conversa no log do CRM" },
    ],
  },
  {
    day: 4,
    shortTitle: "Escalonamento para Nível 2",
    fullTitle: "Dia 4: Quando e como repassar chamados ao N2",
    tag: "Dia 4 · Trilha Suporte N1",
    readTime: "Leitura de 7 min",
    type: "Artigo teórico",
    description:
      "Escalonamentos sem diagnóstico prévio geram gargalos na operação. Aprenda quais evidências coletar antes de transferir o ticket.",
    tip: "Dica: siga sempre os 5 passos visuais do módulo 'Passo a Passo (Fluxos CRM)'.",
    checklist: [
      { id: "d4-1", label: "Reproduzir o erro em ambiente de teste ou via acesso remoto" },
      { id: "d4-2", label: "Preencher o diagnóstico completo na aba Histórico" },
      { id: "d4-3", label: "Alterar status para 'Aguardando N2' e notificar a fila técnica" },
    ],
  },
  {
    day: 5,
    shortTitle: "Cadastro de clientes",
    fullTitle: "Dia 5: Estrutura de dados, CNPJ/IE e permissões",
    tag: "Dia 5 · Trilha Suporte N1",
    readTime: "Leitura de 6 min",
    type: "Artigo teórico",
    description:
      "Erros de cadastro afetam diretamente o faturamento e a emissão de notas. Veja como validar os dados cadastrais dos varejistas.",
    tip: "Dica: confira o regime tributário e a Inscrição Estadual antes de liberar o módulo fiscal.",
    checklist: [
      { id: "d5-1", label: "Validar CNPJ, Razão Social e Inscrição Estadual no cadastro" },
      { id: "d5-2", label: "Verificar vínculo com o revendedor certificado da região" },
      { id: "d5-3", label: "Testar permissões de acesso do usuário administrador" },
    ],
  },
  {
    day: 6,
    shortTitle: "Módulo Financeiro",
    fullTitle: "Dia 6: Contas a pagar, receber e conciliação",
    tag: "Dia 6 · Trilha Suporte N1",
    readTime: "Leitura de 8 min",
    type: "Artigo teórico",
    description:
      "Compreenda o fluxo de caixa, baixa de títulos e geração de boletos dentro do ERP da TK2000.",
    tip: "Dica: divergências de saldo costumam ocorrer por lançamentos retroativos sem reprocessamento.",
    checklist: [
      { id: "d6-1", label: "Simular abertura e fechamento de caixa no sistema" },
      { id: "d6-2", label: "Conferir parâmetros de geração de boletos e remessa CNAB" },
      { id: "d6-3", label: "Executar rotina de conferência de relatórios financeiros" },
    ],
  },
  {
    day: 7,
    shortTitle: "Módulo Fiscal",
    fullTitle: "Dia 7: Parametrização tributária (CFOP, CST e CSOSN)",
    tag: "Dia 7 · Trilha Suporte N1",
    readTime: "Leitura de 8 min",
    type: "Artigo teórico",
    description:
      "Domine as configurações essenciais de tributação para micro e pequenos varejistas optantes pelo Simples Nacional e Regime Normal.",
    tip: "Dica: consulte o glossário nativo do sistema para verificar a descrição de cada campo fiscal.",
    checklist: [
      { id: "d7-1", label: "Revisar tabela de CFOPs de venda interna e interestadual" },
      { id: "d7-2", label: "Conferir cadastro de NCM e alíquotas padrão de ICMS/PIS/COFINS" },
      { id: "d7-3", label: "Validar certificado digital A1/A3 configurado no cliente" },
    ],
  },
  {
    day: 8,
    shortTitle: "Emissão de NF-e",
    fullTitle: "Dia 8: Autorização, contingência, cancelamento e CC-e",
    tag: "Dia 8 · Trilha Suporte N1",
    readTime: "Leitura de 8 min",
    type: "Artigo teórico",
    description:
      "Passo a passo para resolver rejeições da SEFAZ e orientar o cliente em situações de inutilização ou carta de correção.",
    tip: "Dica: rejeições comuns de schema XML estão mapeadas no módulo Erros Comuns.",
    checklist: [
      { id: "d8-1", label: "Emitir uma NF-e em ambiente de homologação" },
      { id: "d8-2", label: "Identificar código de rejeição da SEFAZ no log de retorno" },
      { id: "d8-3", label: "Testar fluxo de cancelamento dentro do prazo legal" },
    ],
  },
  {
    day: 9,
    shortTitle: "Backup e restauração",
    fullTitle: "Dia 9: Segurança de dados e rotinas de recuperação",
    tag: "Dia 9 · Trilha Suporte N1",
    readTime: "Leitura de 6 min",
    type: "Artigo teórico",
    description:
      "Garanta a integridade dos bancos de dados dos clientes através de rotinas automatizadas de backup local e em nuvem.",
    tip: "Dica: nunca execute scripts de reparo no banco sem antes gerar um dump de segurança.",
    checklist: [
      { id: "d9-1", label: "Verificar agendamento automático do serviço de backup" },
      { id: "d9-2", label: "Realizar teste de restauração de base em ambiente isolado" },
      { id: "d9-3", label: "Validar integridade das tabelas após restauração" },
    ],
  },
  {
    day: 10,
    shortTitle: "Integrações",
    fullTitle: "Dia 10: TEF, balanças, impressoras e APIs externas",
    tag: "Dia 10 · Trilha Suporte N1",
    readTime: "Leitura de 7 min",
    type: "Artigo teórico",
    description:
      "Configuração de periféricos de PDV e comunicação com gateways de pagamento e plataformas parceiras.",
    tip: "Dica: falhas de comunicação em impressoras não fiscais geralmente envolvem porta COM ou driver.",
    checklist: [
      { id: "d10-1", label: "Configurar comunicação com impressora térmica e gaveta" },
      { id: "d10-2", label: "Validar integração TEF e retorno de comprovantes" },
      { id: "d10-3", label: "Testar sincronização de pedidos via API" },
    ],
  },
  {
    day: 11,
    shortTitle: "Ordens de Serviço",
    fullTitle: "Dia 11: Gestão de assistências técnicas e garantias",
    tag: "Dia 11 · Operação Assistida",
    readTime: "Leitura de 6 min",
    type: "Artigo prático",
    description:
      "Fluxo completo para clientes do segmento de assistência técnica: abertura de OS, laudo técnico, peças e faturamento.",
    tip: "Dica: verifique se o status da OS permite baixa automática de estoque das peças utilizadas.",
    checklist: [
      { id: "d11-1", label: "Cadastrar uma Ordem de Serviço completa com peças e mão de obra" },
      { id: "d11-2", label: "Faturar a OS gerando NF-e e NFS-e conjugadas" },
    ],
  },
  {
    day: 12,
    shortTitle: "Relatórios Gerenciais",
    fullTitle: "Dia 12: Curva ABC, comissões e fechamento mensal",
    tag: "Dia 12 · Operação Assistida",
    readTime: "Leitura de 5 min",
    type: "Artigo prático",
    description:
      "Como orientar o cliente na extração de indicadores de vendas, giro de estoque e envio de arquivos contábeis (SPED/XML).",
    tip: "Dica: oriente o cliente a exportar o pacote de XMLs para a contabilidade até o 5º dia útil.",
    checklist: [
      { id: "d12-1", label: "Gerar pacote de arquivos XML e relatório de vendas mensais" },
      { id: "d12-2", label: "Conferir cálculo de comissões de vendedores" },
    ],
  },
  {
    day: 13,
    shortTitle: "Suporte a Revendedores",
    fullTitle: "Dia 13: Atendimento à rede de Gestão Colaborativa",
    tag: "Dia 13 · Operação Assistida",
    readTime: "Leitura de 6 min",
    type: "Artigo prático",
    description:
      "Particularidades do suporte prestado diretamente aos revendedores certificados espalhados pelo Brasil.",
    tip: "Dica: chamados de revendedores em implantação de novos clientes exigem resposta imediata.",
    checklist: [
      { id: "d13-1", label: "Identificar carteira do revendedor certificado no CRM" },
      { id: "d13-2", label: "Apoiar homologação de implantação remota" },
    ],
  },
  {
    day: 14,
    shortTitle: "Atendimento Supervisionado",
    fullTitle: "Dia 14: Prática na fila real com acompanhamento",
    tag: "Dia 14 · Operação Assistida",
    readTime: "Leitura de 5 min",
    type: "Artigo prático",
    description:
      "Assuma chamados reais da fila N1 aplicando os fluxos do CRM e consultando a Wiki de forma autônoma.",
    tip: "Dica: se identificar um erro inédito resolvido por você, anote para sugerir um novo card na Wiki.",
    checklist: [
      { id: "d14-1", label: "Concluir 5 atendimentos completos seguindo o checklist de qualidade" },
      { id: "d14-2", label: "Revisar registros de resolução junto ao tutor técnico" },
    ],
  },
  {
    day: 15,
    shortTitle: "Validação para Produção",
    fullTitle: "Dia 15: Fechamento do Onboarding e autonomia na operação",
    tag: "Dia 15 · Conclusão da Trilha",
    readTime: "Leitura de 5 min",
    type: "Avaliação final",
    description:
      "Parabéns por chegar ao 15º dia! Revise os pontos principais com a gerência de suporte para ingressar oficialmente na escala de produção.",
    tip: "Dica: a Wiki continua sendo sua ferramenta diária de consulta rápida durante o expediente.",
    checklist: [
      { id: "d15-1", label: "100% dos checklists anteriores revisados e validados" },
      { id: "d15-2", label: "Alinhamento final com a Gerência de Suporte (Natanael)" },
    ],
  },
];

export const crmFlows: CrmFlow[] = [
  {
    id: "flow-1",
    title: "Abrir chamado",
    steps: [
      "Menu Atendimento",
      "Novo Chamado",
      "Buscar cliente",
      "Categoria e prioridade",
      "Descrição e anexos",
      "Salvar",
    ],
  },
  {
    id: "flow-2",
    title: "Escalar para N2",
    steps: [
      "Abrir chamado",
      "Aba Histórico",
      "Registrar diagnóstico",
      "Status: Aguardando N2",
      "Notificar N2",
    ],
  },
  {
    id: "flow-3",
    title: "Encerrar chamado",
    steps: [
      "Validar com cliente",
      "Registrar solução",
      "Status: Resolvido",
      "Enviar pesquisa",
    ],
  },
];

export const troubleshootingItems: TroubleshootingItem[] = [
  {
    id: "ts-1",
    module: "Módulo Fiscal",
    title: "Rejeição 302: Irregularidade fiscal do destinatário na emissão de NF-e",
    symptom:
      "Ao tentar transmitir a NF-e para a SEFAZ, o sistema retorna a mensagem 'Rejeição 302: Uso Denegado - Irregularidade fiscal do destinatário'.",
    rootCause:
      "A Inscrição Estadual (IE) do cliente destinatário está suspensa, cancelada ou baixada no cadastro central da SEFAZ (SINTEGRA/CCC).",
    solution: [
      "Consulte o CNPJ/IE do destinatário no Cadastro Centralizado de Contribuinte (CCC).",
      "Caso o destinatário seja isento ou não contribuinte, altere o indicador da IE no cadastro do cliente para 'Não Contribuinte' (9).",
      "Se a nota já foi denegada na SEFAZ, registre o número como denegado no sistema e oriente o cliente a regularizar o cadastro antes de nova emissão.",
    ],
  },
  {
    id: "ts-2",
    module: "Módulo Fiscal",
    title: "Falha de leitura do Certificado Digital A1/A3 ao assinar XML",
    symptom:
      "Sistema exibe alerta 'Não foi possível localizar a chave privada do certificado digital' no momento de assinar a nota fiscal.",
    rootCause:
      "Certificado vencido, cadeia de certificação desatualizada no Windows ou serviço da leitora SmartCard travado (no caso de modelo A3).",
    solution: [
      "Verifique a data de validade do certificado nas configurações do módulo fiscal da TK2000.",
      "Em certificados A1 (.pfx), reimporte o arquivo informando a senha e marque a opção 'Tornar chave exportável'.",
      "Em certificados A3, reinicie o serviço 'SCardSvr' (Cartão Inteligente) do Windows e reconecte o token em uma porta USB traseira.",
    ],
  },
  {
    id: "ts-3",
    module: "Módulo Financeiro",
    title: "Divergência no saldo de fechamento de caixa após cancelamento de venda",
    symptom:
      "O relatório de fechamento de caixa apresenta saldo superior ao valor físico em gaveta após o estorno de uma venda em dinheiro.",
    rootCause:
      "O cancelamento da nota foi realizado no módulo fiscal, mas o movimento financeiro correspondente ao recebimento à vista não foi estornado no caixa aberto.",
    solution: [
      "Acesse o menu Financeiro > Movimentação de Caixa e localize o lançamento original pelo número do pedido.",
      "Verifique se o parâmetro 'Estornar financeiro automaticamente ao cancelar NF' está ativo nas configurações gerais.",
      "Gere o lançamento de estorno vinculado ao operador e reprocesse o saldo do turno.",
    ],
  },
  {
    id: "ts-4",
    module: "Integrações",
    title: "Impressora térmica não fiscal cortando cupom ou sem comunicação",
    symptom:
      "Ao finalizar a venda no PDV, a impressora não responde ou imprime caracteres desconfigurados.",
    rootCause:
      "Alteração na porta COM virtual após queda de energia ou configuração incorreta do protocolo ESC/POS no sistema.",
    solution: [
      "Abra o Gerenciador de Dispositivos do Windows e confirme qual porta COM/USB está atribuída à impressora.",
      "No painel de configuração de periféricos da TK2000, selecione o modelo exato (Bematech, Elgin, Epson) e a porta correspondente.",
      "Clique em 'Testar Comunicação' e salve o perfil da estação de trabalho.",
    ],
  },
];

export const faqItems: FaqItem[] = [
  {
    id: "faq-1",
    question: "Qual categoria usar quando o cliente não sabe explicar o problema?",
    answer:
      "Utilize inicialmente a categoria 'Triagem Geral / Diagnóstico N1'. Durante os primeiros minutos do atendimento, identifique o módulo afetado (Fiscal, Financeiro, Cadastro ou Integrações) e atualize a categoria do chamado antes de salvá-lo ou encerrá-lo.",
  },
  {
    id: "faq-2",
    question: "Posso atender sem chamado aberto?",
    answer:
      "Não. Na TK2000 todo atendimento, implementação, correção ou ajuste exige abertura de chamado no CRM para garantir rastreabilidade de prazos, histórico do cliente e alimentação da nossa base de dados.",
  },
  {
    id: "faq-3",
    question: "Onde encontro as gravações dos treinamentos?",
    answer:
      "As gravações das capacitações remotas realizadas via Google Meet ficam arquivadas no repositório interno vinculado ao CRM, organizadas por módulo do sistema e data de realização.",
  },
  {
    id: "faq-4",
    question: "Quanto tempo tenho até entrar em produção?",
    answer:
      "O ciclo padrão de onboarding prático acompanhado desta trilha é de 15 dias. Dependendo do seu desempenho e conclusão dos checklists diários, você já passa a atuar diretamente em produção ao final desse período.",
  },
];

