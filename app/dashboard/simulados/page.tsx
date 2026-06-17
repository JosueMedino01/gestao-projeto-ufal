"use client";

import { Bell, CheckCircle2, Clock3, LoaderCircle, XCircle } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../../_components/auth-provider";
import { SidebarToggleButton } from "../../_components/sidebar-toggle-button";
import { UserPill } from "../../_components/user-pill";
import { api, type Questao, type RespostaQuestao, type Simulado } from "@/lib/api";

function QuestionStatus({
  number,
  status,
  onClick,
}: {
  number: number;
  status: "answered" | "current" | "unanswered";
  onClick: () => void;
}) {
  const styles = {
    answered: "bg-[#daf0d6] text-[#436345]",
    current: "bg-[#243f9f] text-white",
    unanswered: "bg-[#efefef] text-[#4e4e4e]",
  }[status];

  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex h-8 w-8 items-center justify-center rounded-md text-xs font-bold ${styles}`}
    >
      {number}
    </button>
  );
}

function ChoiceCard({
  letter,
  text,
  response,
  onAnswer,
  disabled,
}: {
  letter: string;
  text: string;
  response?: RespostaQuestao;
  onAnswer: () => void;
  disabled: boolean;
}) {
  const isCorrect = response?.resposta_correta === letter;
  const isSelected = response?.alternativa_marcada === letter;
  const isWrongSelection = isSelected && response && !response.acertou;

  const stateClass = isCorrect
    ? "border-[#b9dfba] bg-[#eff9ef] text-[#21592b]"
    : isWrongSelection
      ? "border-[#f0dede] bg-[#f8ebeb] text-[#7a3941]"
      : isSelected
        ? "border-[#cfe0f6] bg-[#dfeaf8] text-primary"
        : "border-border bg-white text-foreground hover:bg-slate-50";

  return (
    <button
      type="button"
      onClick={onAnswer}
      disabled={disabled || Boolean(response)}
      className={`flex w-full items-center gap-4 rounded-[20px] border px-4 py-4 text-left transition-colors disabled:cursor-default ${stateClass}`}
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-current bg-white text-sm font-extrabold">
        {letter}
      </span>
      <span className="text-base font-semibold">{text}</span>
      {isCorrect ? <CheckCircle2 className="ml-auto h-5 w-5 text-[#3f8f46]" /> : null}
      {isWrongSelection ? <XCircle className="ml-auto h-5 w-5 text-[#b44f5b]" /> : null}
    </button>
  );
}

export default function SimuladosPage() {
  const { token } = useAuth();
  const [simulado, setSimulado] = useState<Simulado | null>(null);
  const [questoes, setQuestoes] = useState<Questao[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [respostas, setRespostas] = useState<Record<number, RespostaQuestao>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isAnswering, setIsAnswering] = useState(false);
  const [isFinishing, setIsFinishing] = useState(false);
  const [error, setError] = useState("");

  const currentQuestion = questoes[currentIndex];
  const currentResponse = currentQuestion ? respostas[currentQuestion.id] : undefined;
  const answeredCount = Object.keys(respostas).length;
  const progress = questoes.length ? ((currentIndex + 1) / questoes.length) * 100 : 0;

  async function startSimulado() {
    if (!token) {
      return;
    }

    setIsLoading(true);
    setError("");
    setSimulado(null);
    setQuestoes([]);
    setRespostas({});
    setCurrentIndex(0);

    try {
      const data = await api.criarSimulado(token);
      setSimulado(data.simulado);
      setQuestoes(data.questoes);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Nao foi possivel iniciar o simulado.");
    } finally {
      setIsLoading(false);
    }
  }

  async function answerQuestion(questaoId: number, alternativa: string) {
    if (!token || !simulado || respostas[questaoId]) {
      return;
    }

    setIsAnswering(true);
    setError("");

    try {
      const data = await api.responderSimulado(token, simulado.id, {
        questao_id: questaoId,
        alternativa_marcada: alternativa,
      });
      setRespostas((current) => ({ ...current, [questaoId]: data.resposta }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Nao foi possivel registrar a resposta.");
    } finally {
      setIsAnswering(false);
    }
  }

  async function finishSimulado() {
    if (!token || !simulado) {
      return;
    }

    setIsFinishing(true);
    setError("");

    try {
      const data = await api.finalizarSimulado(token, simulado.id);
      setSimulado(data.simulado);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Nao foi possivel finalizar o simulado.");
    } finally {
      setIsFinishing(false);
    }
  }

  if (!simulado || !currentQuestion) {
    return (
      <section className="flex min-h-screen flex-1 flex-col bg-[#f7f8fc] px-4 py-5 sm:px-6 lg:px-8 lg:py-7">
        <header className="flex flex-col gap-4 border-b border-[#e9edf5] pb-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex items-center gap-3">
            <SidebarToggleButton />
            <h1 className="text-2xl font-extrabold tracking-tight text-blue-deep sm:text-4xl">
              Simulados
            </h1>
          </div>
          <UserPill />
        </header>

        <div className="flex flex-1 items-center justify-center py-16">
          <article className="w-full max-w-2xl rounded-[24px] border border-border bg-white p-8 text-center shadow-[0_12px_24px_rgba(19,32,58,0.08)]">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary-soft text-primary">
              <Bell className="h-7 w-7" />
            </span>
            <h2 className="mt-5 text-3xl font-extrabold text-[#1f2435]">
              Simulado oficial CNH
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-[#5f6d84]">
              O backend vai gerar 30 questoes com IA, salvar o simulado no banco e
              registrar suas respostas durante a prova.
            </p>

            {error ? (
              <p className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                {error}
              </p>
            ) : null}

            <button
              type="button"
              onClick={() => void startSimulado()}
              disabled={isLoading}
              className="mt-7 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-white shadow-[0_12px_18px_rgba(42,103,215,0.28)] transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : null}
              {isLoading ? "Gerando simulado..." : "Iniciar simulado"}
            </button>
          </article>
        </div>
      </section>
    );
  }

  const isFinished = simulado.status === "finalizado";

  return (
    <section className="flex min-h-screen flex-1 flex-col bg-[#f7f8fc] px-4 py-5 sm:px-6 lg:px-8 lg:py-7">
      <header className="flex flex-col gap-4 border-b border-[#e9edf5] pb-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex flex-wrap items-center gap-3">
          <SidebarToggleButton />
          <h1 className="text-2xl font-extrabold tracking-tight text-blue-deep sm:text-4xl">
            Simulado: Prova Teorica CNH
          </h1>
          <span className="rounded-full bg-[#eef2f7] px-4 py-2 text-xs font-semibold text-[#49586a]">
            {answeredCount}/{questoes.length} respondidas
          </span>
          <button
            type="button"
            onClick={() => void startSimulado()}
            className="rounded-full border border-border bg-white px-4 py-2 text-xs font-semibold text-[#9c624e] shadow-sm"
          >
            Novo simulado
          </button>
        </div>

        <UserPill />
      </header>

      <div className="mt-5">
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm text-[#5f6d84]">
            Questao {currentIndex + 1} de {questoes.length}
          </p>
          {isFinished ? (
            <p className="text-sm font-bold text-success">
              Resultado: {simulado.acertos}/{simulado.total_questoes} acertos
            </p>
          ) : null}
        </div>
        <div className="mt-2 h-3 overflow-hidden rounded-full bg-white shadow-[inset_0_1px_2px_rgba(19,32,58,0.06)]">
          <div
            className="h-full rounded-full bg-linear-to-r from-[#2780c7] to-primary"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {error ? (
        <p className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {error}
        </p>
      ) : null}

      <div className="mt-5 grid flex-1 gap-5 2xl:grid-cols-[minmax(0,1fr)_260px]">
        <article className="flex h-full flex-col rounded-[24px] border border-border bg-white p-4 shadow-[0_12px_24px_rgba(19,32,58,0.08)] sm:p-5">
          <div className="flex flex-col gap-4 border-b border-[#edf1f6] pb-4 md:flex-row md:items-center md:justify-between">
            <span className="w-fit rounded-md bg-[#b9d1eb] px-3 py-2 text-xs font-semibold text-[#294663]">
              {currentQuestion.area}
            </span>
            {currentResponse ? (
              <span
                className={`w-fit rounded-full px-3 py-2 text-xs font-bold ${
                  currentResponse.acertou
                    ? "bg-success-soft text-success"
                    : "bg-danger-soft text-danger"
                }`}
              >
                {currentResponse.acertou ? "Resposta correta" : "Resposta incorreta"}
              </span>
            ) : null}
          </div>

          <div className="grid flex-1 gap-8 pt-5 xl:grid-cols-[0.9fr_1fr]">
            <div>
              <p className="text-xl font-semibold leading-8 text-foreground">
                {currentQuestion.pergunta}
              </p>
              {currentQuestion.imagem_url ? (
                <img
                  src={currentQuestion.imagem_url}
                  alt={currentQuestion.placa ?? "Imagem da questao"}
                  className="mx-auto mt-6 max-h-64 rounded-xl object-contain"
                />
              ) : null}
              {currentResponse?.explicacao ? (
                <div className="mt-6 rounded-[16px] border border-[#cad6f6] bg-[#eef3ff] px-4 py-3 text-sm leading-6 text-[#34405a]">
                  <strong className="text-[#3457b9]">Explicacao: </strong>
                  {currentResponse.explicacao}
                </div>
              ) : null}
            </div>

            <div className="space-y-3">
              {currentQuestion.alternativas.map((choice) => (
                <ChoiceCard
                  key={choice.letra}
                  letter={choice.letra}
                  text={choice.texto}
                  response={currentResponse}
                  disabled={isAnswering || isFinished}
                  onAnswer={() => void answerQuestion(currentQuestion.id, choice.letra)}
                />
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 border-t border-[#edf1f6] pt-4 md:flex-row md:items-center md:justify-between">
            <button
              type="button"
              onClick={() => setCurrentIndex((index) => Math.max(0, index - 1))}
              disabled={currentIndex === 0}
              className="rounded-xl border border-border bg-white px-4 py-3 text-sm font-semibold text-[#74829a] shadow-sm disabled:cursor-not-allowed disabled:opacity-50"
            >
              Anterior
            </button>
            <button
              type="button"
              onClick={() => setCurrentIndex((index) => Math.min(questoes.length - 1, index + 1))}
              disabled={currentIndex === questoes.length - 1}
              className="rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_18px_rgba(42,103,215,0.28)] transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Proxima questao
            </button>
          </div>
        </article>

        <aside className="flex h-full flex-col gap-4">
          <article className="rounded-[20px] border border-border bg-white p-4 shadow-[0_12px_24px_rgba(19,32,58,0.08)]">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-text-muted">
              Status
            </p>
            <div className="mt-3 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-primary">
                <Clock3 className="h-5 w-5" />
                <span className="text-2xl font-extrabold leading-none">
                  {isFinished ? "Finalizado" : "Em andamento"}
                </span>
              </div>
            </div>
          </article>

          <article className="flex flex-1 flex-col rounded-[20px] border border-border bg-white p-4 shadow-[0_12px_24px_rgba(19,32,58,0.08)]">
            <h2 className="text-sm font-bold text-foreground">Navegacao</h2>
            <div className="mt-4 grid flex-1 content-start grid-cols-5 gap-2">
              {questoes.map((questao, index) => (
                <QuestionStatus
                  key={questao.id}
                  number={index + 1}
                  status={
                    index === currentIndex
                      ? "current"
                      : respostas[questao.id]
                        ? "answered"
                        : "unanswered"
                  }
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </div>
          </article>

          <button
            type="button"
            onClick={() => void finishSimulado()}
            disabled={isFinishing || isFinished || answeredCount === 0}
            className="rounded-[20px] bg-linear-to-br from-[#fff2af] to-[#ffe38c] p-4 text-left shadow-[0_12px_24px_rgba(19,32,58,0.08)] transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <p className="text-sm font-bold text-[#785b04]">
              {isFinishing ? "Finalizando..." : "Finalizar simulado"}
            </p>
            <p className="mt-2 text-sm leading-6 text-[#70570e]">
              O backend consolida os acertos das respostas registradas.
            </p>
          </button>
        </aside>
      </div>
    </section>
  );
}
