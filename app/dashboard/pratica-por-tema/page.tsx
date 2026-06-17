"use client";

import { BookOpen, Bot, CheckCircle2, LoaderCircle, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "../../_components/auth-provider";
import { SidebarToggleButton } from "../../_components/sidebar-toggle-button";
import { UserPill } from "../../_components/user-pill";
import { api, type Questao, type RespostaQuestao } from "@/lib/api";

const accentColors = ["#d9b021", "#a93445", "#38b935", "#7f1fff", "#213f9f", "#6e6e70"];

function PracticeChoice({
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

export default function PraticaPorTemaPage() {
  const { token } = useAuth();
  const [areas, setAreas] = useState<string[]>([]);
  const [tema, setTema] = useState("");
  const [questoes, setQuestoes] = useState<Questao[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [respostas, setRespostas] = useState<Record<number, RespostaQuestao>>({});
  const [isLoadingAreas, setIsLoadingAreas] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isAnswering, setIsAnswering] = useState(false);
  const [error, setError] = useState("");

  const currentQuestion = questoes[currentIndex];
  const currentResponse = currentQuestion ? respostas[currentQuestion.id] : undefined;

  useEffect(() => {
    let mounted = true;

    api
      .areas()
      .then((data) => {
        if (mounted) {
          setAreas(data.areas);
        }
      })
      .catch((err) => {
        if (mounted) {
          setError(err instanceof Error ? err.message : "Nao foi possivel carregar os temas.");
        }
      })
      .finally(() => {
        if (mounted) {
          setIsLoadingAreas(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  async function startPractice(area: string) {
    if (!token) {
      return;
    }

    setIsGenerating(true);
    setError("");
    setTema(area);
    setQuestoes([]);
    setRespostas({});
    setCurrentIndex(0);

    try {
      const data = await api.criarPratica(token, { tema: area, quantidade: 5 });
      setTema(data.tema);
      setQuestoes(data.questoes);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Nao foi possivel gerar a pratica.");
    } finally {
      setIsGenerating(false);
    }
  }

  async function answerQuestion(questaoId: number, alternativa: string) {
    if (!token || respostas[questaoId]) {
      return;
    }

    setIsAnswering(true);
    setError("");

    try {
      const data = await api.responderQuestao(token, questaoId, alternativa);
      setRespostas((current) => ({ ...current, [questaoId]: data.resposta }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Nao foi possivel registrar a resposta.");
    } finally {
      setIsAnswering(false);
    }
  }

  if (!currentQuestion) {
    return (
      <section className="flex min-h-screen flex-1 flex-col bg-[#f7f8fc] px-4 py-5 sm:px-6 lg:px-8 lg:py-7">
        <header className="flex flex-col gap-4 pb-6 xl:flex-row xl:items-start xl:justify-between">
          <div className="flex items-start gap-3">
            <SidebarToggleButton />
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-blue-deep sm:text-[48px]">
                Praticar por Tema
              </h1>
              <p className="mt-1 text-sm text-[#5f6d84]">
                Escolha um tema para gerar questoes pela API.
              </p>
            </div>
          </div>

          <UserPill />
        </header>

        {error ? (
          <p className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {error}
          </p>
        ) : null}

        {isLoadingAreas ? (
          <div className="flex flex-1 items-center justify-center">
            <LoaderCircle className="h-6 w-6 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid gap-9 md:grid-cols-2 2xl:grid-cols-3">
            {areas.map((area, index) => {
              const accent = accentColors[index % accentColors.length];

              return (
                <article
                  key={area}
                  className="overflow-hidden rounded-[20px] border border-[#252525] bg-white shadow-[0_12px_24px_rgba(19,32,58,0.08)]"
                >
                  <div className="flex h-44 items-center justify-center bg-[#4b87c6] text-white">
                    <BookOpen className="h-20 w-20" />
                  </div>
                  <div className="space-y-4 px-5 py-4">
                    <div className="text-center">
                      <h2 className="text-[1.35rem] font-extrabold text-[#1d1d1d]">
                        {area}
                      </h2>
                    </div>
                    <p className="text-center text-sm leading-6 text-[#6d7481]">
                      Gere 5 questoes focadas neste tema e receba a correcao
                      imediatamente.
                    </p>
                    <button
                      type="button"
                      onClick={() => void startPractice(area)}
                      disabled={isGenerating}
                      className="flex w-full items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-bold text-white shadow-[0_10px_18px_rgba(19,32,58,0.14)] disabled:cursor-not-allowed disabled:opacity-60"
                      style={{ backgroundColor: accent }}
                    >
                      {isGenerating && tema === area ? (
                        <LoaderCircle className="h-4 w-4 animate-spin" />
                      ) : null}
                      {isGenerating && tema === area ? "Gerando..." : "Praticar agora"}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        <article className="mt-8 flex flex-col gap-4 rounded-[20px] border-2 border-[#4f8ed5] bg-white px-4 py-4 shadow-[0_12px_24px_rgba(19,32,58,0.08)] md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#cfe0f6] bg-[#eff5fd] text-primary">
              <Bot className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xl font-extrabold text-blue-deep">Dica do Tutor Inteligente</p>
              <p className="mt-1 text-sm text-[#647389]">
                Use esta tela para praticar um tema especifico e enviar suas duvidas
                para o tutor depois.
              </p>
            </div>
          </div>
        </article>
      </section>
    );
  }

  return (
    <section className="flex min-h-screen flex-1 flex-col bg-[#f7f8fc] px-4 py-5 sm:px-6 lg:px-8 lg:py-7">
      <header className="flex flex-col gap-4 pb-6 xl:flex-row xl:items-start xl:justify-between">
        <div className="flex items-start gap-3">
          <SidebarToggleButton />
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-blue-deep sm:text-[48px]">
              {tema}
            </h1>
            <p className="mt-1 text-sm text-[#5f6d84]">
              Questao {currentIndex + 1} de {questoes.length}
            </p>
          </div>
        </div>
        <UserPill />
      </header>

      {error ? (
        <p className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {error}
        </p>
      ) : null}

      <article className="rounded-[24px] border border-border bg-white p-5 shadow-[0_12px_24px_rgba(19,32,58,0.08)]">
        <div className="flex flex-col gap-6 xl:grid xl:grid-cols-[0.9fr_1fr]">
          <div>
            <span className="rounded-md bg-[#b9d1eb] px-3 py-2 text-xs font-semibold text-[#294663]">
              {currentQuestion.area}
            </span>
            <p className="mt-5 text-xl font-semibold leading-8 text-foreground">
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
              <PracticeChoice
                key={choice.letra}
                letter={choice.letra}
                text={choice.texto}
                response={currentResponse}
                disabled={isAnswering}
                onAnswer={() => void answerQuestion(currentQuestion.id, choice.letra)}
              />
            ))}
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 border-t border-[#edf1f6] pt-4 md:flex-row md:items-center md:justify-between">
          <button
            type="button"
            onClick={() => {
              setQuestoes([]);
              setTema("");
              setRespostas({});
              setCurrentIndex(0);
            }}
            className="rounded-xl border border-border bg-white px-4 py-3 text-sm font-semibold text-[#74829a] shadow-sm"
          >
            Voltar aos temas
          </button>
          <div className="flex gap-3">
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
              Proxima
            </button>
          </div>
        </div>
      </article>
    </section>
  );
}
