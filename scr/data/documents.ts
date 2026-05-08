export type DocCategory = "Identificação" | "Habilitação" | "Trabalho" | "Viagem";

export interface CitizenDoc {
  id: string;
  name: string;
  shortName: string;
  category: DocCategory;
  issuer: string;
  icon: string; // lucide name
  required: string[];
  cost: string;
  deadline: string;
  whereToIssue: string;
  officialUrl: string;
  description: string;
}

export const documents: CitizenDoc[] = [
  {
    id: "rg",
    name: "Carteira de Identidade (RG / CIN)",
    shortName: "RG",
    category: "Identificação",
    issuer: "Instituto de Identificação / SSP",
    icon: "IdCard",
    required: [
      "Certidão de nascimento ou casamento (original)",
      "Comprovante de residência recente",
      "CPF",
      "Foto 3x4 (em alguns estados)",
    ],
    cost: "Gratuito na 1ª via. 2ª via varia por estado.",
    deadline: "5 a 30 dias úteis",
    whereToIssue: "Postos de identificação da SSP do seu estado ou unidades do Poupatempo.",
    officialUrl: "https://www.gov.br/pt-br/servicos/obter-a-carteira-de-identidade",
    description:
      "Documento oficial de identificação civil. A nova CIN (Carteira de Identidade Nacional) usa o CPF como número único.",
  },
  {
    id: "cpf",
    name: "Cadastro de Pessoa Física (CPF)",
    shortName: "CPF",
    category: "Identificação",
    issuer: "Receita Federal",
    icon: "Hash",
    required: [
      "Documento de identificação (RG ou certidão)",
      "Título de eleitor (se possuir)",
      "Comprovante de residência",
    ],
    cost: "Gratuito",
    deadline: "Imediato (online) ou até 8 dias úteis",
    whereToIssue:
      "Pelo site da Receita Federal, app CPF, agências dos Correios, Banco do Brasil ou Caixa.",
    officialUrl: "https://www.gov.br/receitafederal/pt-br/servicos/cpf",
    description:
      "Cadastro essencial para identificação fiscal e acesso a serviços bancários, públicos e digitais.",
  },
  {
    id: "cnh",
    name: "Carteira Nacional de Habilitação (CNH)",
    shortName: "CNH",
    category: "Habilitação",
    issuer: "Detran",
    icon: "Car",
    required: [
      "RG e CPF",
      "Comprovante de residência",
      "Exame médico e psicológico (1ª habilitação)",
      "Certificado de conclusão de curso de formação",
    ],
    cost: "R$ 250 a R$ 450 (varia por estado)",
    deadline: "30 a 90 dias para 1ª habilitação",
    whereToIssue: "Unidades do Detran do seu estado, com agendamento online.",
    officialUrl: "https://www.gov.br/pt-br/servicos/obter-a-carteira-nacional-de-habilitacao",
    description:
      "Documento que autoriza a condução de veículos. Possui categorias de A a E conforme o tipo de veículo.",
  },
  {
    id: "titulo",
    name: "Título de Eleitor",
    shortName: "Título de Eleitor",
    category: "Identificação",
    issuer: "Justiça Eleitoral (TSE)",
    icon: "Vote",
    required: [
      "Documento oficial com foto",
      "Comprovante de residência",
      "Comprovante de quitação do serviço militar (homens 18-45)",
    ],
    cost: "Gratuito",
    deadline: "Imediato no autoatendimento; até 30 dias presencial",
    whereToIssue: "Cartórios eleitorais ou pelo site/app e-Título do TSE.",
    officialUrl: "https://www.tse.jus.br/eleitor/titulo-de-eleitor",
    description:
      "Documento que comprova o cadastro eleitoral. Obrigatório para maiores de 18 anos.",
  },
  {
    id: "ctps",
    name: "Carteira de Trabalho Digital",
    shortName: "Carteira de Trabalho",
    category: "Trabalho",
    issuer: "Ministério do Trabalho",
    icon: "Briefcase",
    required: ["CPF", "Conta no portal Gov.br"],
    cost: "Gratuito",
    deadline: "Imediato (digital)",
    whereToIssue: "App Carteira de Trabalho Digital ou portal Gov.br.",
    officialUrl: "https://www.gov.br/trabalho-e-emprego/pt-br/servicos/trabalhador/ctps",
    description:
      "Versão 100% digital da CTPS. Registra automaticamente vínculos empregatícios via CPF.",
  },
  {
    id: "passaporte",
    name: "Passaporte",
    shortName: "Passaporte",
    category: "Viagem",
    issuer: "Polícia Federal",
    icon: "Plane",
    required: [
      "RG ou CIN",
      "CPF",
      "Título de eleitor com quitação",
      "Comprovante de pagamento da GRU",
      "Comprovante militar (se aplicável)",
    ],
    cost: "R$ 257,25 (GRU)",
    deadline: "6 a 10 dias úteis após coleta",
    whereToIssue: "Postos da Polícia Federal, com agendamento prévio online.",
    officialUrl: "https://www.gov.br/pf/pt-br/assuntos/passaporte",
    description:
      "Documento de viagem internacional emitido pela Polícia Federal, com validade de 10 anos.",
  },
];

export const categories: DocCategory[] = [
  "Identificação",
  "Habilitação",
  "Trabalho",
  "Viagem",
];
