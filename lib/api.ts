export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ?? "http://127.0.0.1:5000";

export type Usuario = {
  id: number;
  nome: string;
  nome_completo?: string;
  data_nascimento?: string | null;
  telefone?: string | null;
  cidade?: string | null;
  email: string;
  criado_em?: string | null;
};

export type AuthResponse = {
  usuario: Usuario;
  token: string;
  expira_em: string;
};

export type Alternativa = {
  letra: string;
  texto: string;
};

export type Questao = {
  id: number;
  simulado_id?: number | null;
  origem?: string;
  area: string;
  pergunta: string;
  alternativas: Alternativa[];
  resposta_correta?: string;
  explicacao?: string | null;
  placa?: string | null;
  imagem_url?: string | null;
};

export type Simulado = {
  id: number;
  usuario_id: number;
  status: string;
  total_questoes: number;
  acertos: number;
  iniciado_em?: string | null;
  finalizado_em?: string | null;
  questoes?: Questao[];
};

export type RespostaQuestao = {
  id: number;
  questao_id: number;
  simulado_id?: number | null;
  area?: string | null;
  pergunta?: string | null;
  alternativas: Alternativa[];
  alternativa_marcada: string;
  resposta_correta: string;
  acertou: boolean;
  explicacao?: string | null;
  imagem_url?: string | null;
  respondida_em?: string | null;
};

export type Desempenho = {
  questoes_feitas: number;
  acertos: number;
  erros: number;
  percentual_acerto: number;
  simulados_realizados: number;
  perguntas_ao_tutor: number;
  areas: Array<{
    area: string;
    questoes_feitas: number;
    acertos: number;
    percentual_acerto: number;
  }>;
};

export type ChatHistoryItem = {
  role: "user" | "model";
  content: string;
};

export class ApiError extends Error {
  status: number;
  data: unknown;

  constructor(message: string, status: number, data: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

function getErrorMessage(data: unknown, fallback: string) {
  if (data && typeof data === "object" && "erro" in data) {
    const message = (data as { erro?: unknown }).erro;
    if (typeof message === "string" && message.trim()) {
      return message;
    }
  }

  return fallback;
}

async function parseJson(response: Response) {
  const text = await response.text();
  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text) as unknown;
  } catch {
    return text;
  }
}

export async function apiRequest<T>(
  path: string,
  options: RequestInit = {},
  token?: string | null,
): Promise<T> {
  const headers = new Headers(options.headers);

  if (options.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
    cache: "no-store",
  });
  const data = await parseJson(response);

  if (!response.ok) {
    throw new ApiError(
      getErrorMessage(data, `Falha na requisicao (${response.status}).`),
      response.status,
      data,
    );
  }

  return data as T;
}

export const api = {
  login(payload: { email: string; senha: string }) {
    return apiRequest<AuthResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  cadastro(payload: {
    nomeCompleto: string;
    dataNascimento: string;
    email: string;
    senha: string;
    confirmarSenha: string;
  }) {
    return apiRequest<AuthResponse>("/auth/cadastro", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  validarToken(token: string) {
    return apiRequest<{ valido: boolean; usuario: Usuario }>("/auth/validar-token", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  perfil(token: string) {
    return apiRequest<{ usuario: Usuario }>("/perfil", {}, token);
  },

  atualizarPerfil(token: string, payload: Partial<Usuario>) {
    return apiRequest<{ usuario: Usuario }>(
      "/perfil",
      {
        method: "PATCH",
        body: JSON.stringify(payload),
      },
      token,
    );
  },

  areas() {
    return apiRequest<{ areas: string[] }>("/areas");
  },

  chat(
    payload: { mensagem: string; historico: ChatHistoryItem[]; contexto?: Record<string, unknown> },
    token?: string | null,
  ) {
    return apiRequest<{ resposta: string; sugestoes: string[] }>(
      "/chat",
      {
        method: "POST",
        body: JSON.stringify(payload),
      },
      token,
    );
  },

  criarSimulado(token: string) {
    return apiRequest<{ simulado: Simulado; questoes: Questao[] }>(
      "/simulados",
      { method: "POST", body: JSON.stringify({}) },
      token,
    );
  },

  responderSimulado(
    token: string,
    simuladoId: number,
    payload: { questao_id: number; alternativa_marcada: string },
  ) {
    return apiRequest<{ resposta: RespostaQuestao }>(
      `/simulados/${simuladoId}/respostas`,
      {
        method: "POST",
        body: JSON.stringify(payload),
      },
      token,
    );
  },

  finalizarSimulado(token: string, simuladoId: number) {
    return apiRequest<{ simulado: Simulado }>(
      `/simulados/${simuladoId}/finalizar`,
      { method: "POST", body: JSON.stringify({}) },
      token,
    );
  },

  criarPratica(token: string, payload: { tema: string; quantidade: number }) {
    return apiRequest<{ tema: string; questoes: Questao[] }>(
      "/praticas/tema",
      {
        method: "POST",
        body: JSON.stringify(payload),
      },
      token,
    );
  },

  responderQuestao(token: string, questaoId: number, alternativaMarcada: string) {
    return apiRequest<{ resposta: RespostaQuestao; questao: Questao }>(
      `/questoes/${questaoId}/responder`,
      {
        method: "POST",
        body: JSON.stringify({ alternativa_marcada: alternativaMarcada }),
      },
      token,
    );
  },

  desempenho(token: string) {
    return apiRequest<Desempenho>("/desempenho", {}, token);
  },

  revisarErros(token: string, limite = 50) {
    return apiRequest<{
      total: number;
      temas_para_revisar: number;
      questoes: RespostaQuestao[];
    }>(`/revisar-erros?limite=${limite}`, {}, token);
  },
};
