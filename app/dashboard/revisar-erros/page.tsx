"use client";

import { AlertTriangle, Check, Filter, LoaderCircle, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../../_components/auth-provider";
import { SidebarToggleButton } from "../../_components/sidebar-toggle-button";
import { UserPill } from "../../_components/user-pill";
import { api, type RespostaQuestao } from "@/lib/api";

function formatDate(value?: string | null) {
  if (!value) {
    return "Data nao registrada";
  }

  return new Intl.DateTimeFormat("pt-BR").format(new Date(value));
}

function MetricCard({
  value,
  label,
  accent,
}: {
  value: string;
  label: string;
  accent: string;
}) {
  return (
    <div className="flex min-h-[112px] items-center gap-4 border-b border-[#e8edf6] px-5 py-5 xl:border-b-0 xl:border-r last:border-r-0">
      <div className="flex h-11 w-11 items-center justify-center rounded-full text-white" style={{ backgroundColor: accent }}>
        <AlertTriangle className="h-5 w-5" />
      </div>
      <div className="min-w-0">
        <p className="text-[2rem] font-extrabold leading-tight text-[#191e2c]">{value}</p>
        <p className="text-sm font-semibold leading-5 text-[#2c3448]">{label}</p>
      </div>
    </div>
  );
}

function MissedQuestionCard({
  item,
  active,
  onClick,
}: {
  item: RespostaQuestao;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center gap-3 rounded-[16px] border px-3 py-3 text-left transition-colors ${
        active ? "border-[#d8e2f3] bg-[#f8fbff]" : "border-[#e9edf5] bg-white hover:bg-slate-50"
      }`}
    >
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-[#dd6d6a] bg-white text-[#dd6d6a]">
        <X className="h-5 w-5" />
      </div>
      <div className="min-w-0">
        <p className="truncate text-sm font-extrabold text-[#232737]">
          {item.area ?? "Tema nao informado"}
        </p>
        <p className="text-sm font-semibold text-[#2f436e]">Questao #{item.questao_id}</p>
        <p className="text-xs text-[#718099]">Errada em {formatDate(item.respondida_em)}</p>
      </div>
    </button>
  );
}

export default function RevisarErrosPage() {
  const { token } = useAuth();
  const [items, setItems] = useState<RespostaQuestao[]>([]);
  const [total, setTotal] = useState(0);
  const [temas, setTemas] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) {
      return;
    }

    let mounted = true;

    api
      .revisarErros(token)
      .then((data) => {
        if (mounted) {
          setItems(data.questoes);
          setTotal(data.total);
          setTemas(data.temas_para_revisar);
          setError("");
        }
      })
      .catch((err) => {
        if (mounted) {
          setError(err instanceof Error ? err.message : "Nao foi possivel carregar os erros.");
        }
      })
      .finally(() => {
        if (mounted) {
          setIsLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, [token]);

  const selected = items[selectedIndex];
  const estimatedMinutes = Math.max(total * 4, 0);
  const correctAlternative = useMemo(
    () => selected?.alternativas.find((item) => item.letra === selected.resposta_correta),
    [selected],
  );
  const markedAlternative = useMemo(
    () => selected?.alternativas.find((item) => item.letra === selected.alternativa_marcada),
    [selected],
  );

  return (
    <section className="flex min-h-screen flex-1 flex-col bg-[#f7f8fc] px-4 py-5 sm:px-6 lg:px-8 lg:py-7">
      <header className="flex flex-col gap-4 pb-4 xl:flex-row xl:items-start xl:justify-between">
        <div className="flex items-start gap-3">
          <SidebarToggleButton />
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-blue-deep sm:text-5xl">
              Revisar Erros
            </h1>
            <p className="mt-1 text-sm text-[#5f6d84]">
              Reforce seu aprendizado revisando respostas incorretas salvas no banco.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 self-start xl:self-auto">
          <button
            type="button"
            className="flex items-center gap-2 rounded-xl border border-border bg-white px-4 py-3 text-sm font-semibold text-[#4f5b71] shadow-sm"
          >
            <Filter className="h-4 w-4" />
            Mais recentes
          </button>
          <UserPill />
        </div>
      </header>

      {error ? (
        <p className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {error}
        </p>
      ) : null}

      {isLoading ? (
        <div className="flex flex-1 items-center justify-center">
          <LoaderCircle className="h-7 w-7 animate-spin text-primary" />
        </div>
      ) : items.length === 0 ? (
        <article className="mt-8 rounded-[22px] border border-[#cfd9ea] bg-white p-8 text-center shadow-[0_12px_24px_rgba(19,32,58,0.08)]">
          <Check className="mx-auto h-10 w-10 text-success" />
          <h2 className="mt-4 text-2xl font-extrabold text-[#202637]">
            Nenhum erro para revisar
          </h2>
          <p className="mt-2 text-sm text-[#647389]">
            Quando voce errar uma questao em simulados ou praticas, ela aparecera aqui.
          </p>
        </article>
      ) : (
        <>
          <div className="grid gap-0 rounded-[22px] border border-[#cfd9ea] bg-white shadow-[0_12px_24px_rgba(19,32,58,0.08)] xl:grid-cols-4">
            <MetricCard value={`${total}`} label="Erros para revisar" accent="#dc6b56" />
            <MetricCard value={`${temas}`} label="Temas para revisar" accent="#df9349" />
            <MetricCard value={`${estimatedMinutes}min`} label="Tempo estimado" accent="#5bcfd1" />
            <MetricCard value={`${selectedIndex + 1}/${items.length}`} label="Progresso da revisao" accent="#59c66f" />
          </div>

          <div className="mt-4 grid gap-0 overflow-hidden rounded-[22px] border border-[#cfd9ea] bg-white shadow-[0_12px_24px_rgba(19,32,58,0.08)] 2xl:grid-cols-[320px_minmax(0,1fr)]">
            <aside className="border-b border-[#e8edf6] p-4 2xl:border-b-0 2xl:border-r">
              <div className="mb-4">
                <h2 className="text-lg font-extrabold text-[#202637]">
                  Suas questoes erradas ({items.length})
                </h2>
              </div>

              <div className="space-y-3">
                {items.map((item, index) => (
                  <MissedQuestionCard
                    key={item.id}
                    item={item}
                    active={index === selectedIndex}
                    onClick={() => setSelectedIndex(index)}
                  />
                ))}
              </div>
            </aside>

            <article className="p-4 sm:p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <span className="rounded-md bg-[#d7ecff] px-3 py-1 text-xs font-bold text-[#3173a7]">
                    Questao {selectedIndex + 1} de {items.length}
                  </span>
                  <p className="mt-2 text-sm font-bold text-[#28608b]">
                    {selected.area ?? "Tema nao informado"}
                  </p>
                </div>
                <span className="rounded-full bg-[#ff7d7d] px-3 py-1 text-xs font-bold text-white">
                  Errada
                </span>
              </div>

              <p className="mt-4 text-xl font-bold leading-8 text-[#1f2435]">
                {selected.pergunta ?? "Questao sem enunciado registrado."}
              </p>

              {selected.imagem_url ? (
                <img
                  src={selected.imagem_url}
                  alt="Imagem da questao"
                  className="mx-auto mt-5 max-h-64 rounded-xl object-contain"
                />
              ) : null}

              <div className="mt-5 space-y-3">
                {selected.alternativas.map((option) => {
                  const correct = option.letra === selected.resposta_correta;
                  const wrong = option.letra === selected.alternativa_marcada && !selected.acertou;

                  return (
                    <div
                      key={option.letra}
                      className={`flex items-center gap-3 rounded-[16px] border px-4 py-3 ${
                        correct
                          ? "border-[#d5ecd6] bg-[#eff9ef]"
                          : wrong
                            ? "border-[#f0dede] bg-[#f8ebeb]"
                            : "border-[#e8edf5] bg-white"
                      }`}
                    >
                      <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#d4dae5] bg-white text-sm font-extrabold text-[#1d2436]">
                        {option.letra}
                      </span>
                      <span className="text-base font-semibold text-[#202637]">{option.texto}</span>
                    </div>
                  );
                })}
              </div>

              <div className="mt-5 grid gap-4 xl:grid-cols-2">
                <div className="rounded-[16px] border border-[#d3ead5] bg-[#e9f7e9] px-3 py-3">
                  <p className="text-xs font-bold uppercase tracking-[0.06em] text-[#388443]">
                    Resposta correta
                  </p>
                  <p className="mt-2 font-extrabold text-[#21592b]">
                    {selected.resposta_correta} - {correctAlternative?.texto ?? "Nao registrada"}
                  </p>
                </div>

                <div className="rounded-[16px] border border-[#efd8d8] bg-[#f9ecec] px-3 py-3">
                  <p className="text-xs font-bold uppercase tracking-[0.06em] text-[#b44f5b]">
                    Sua resposta
                  </p>
                  <p className="mt-2 font-extrabold text-[#7a3941]">
                    {selected.alternativa_marcada} - {markedAlternative?.texto ?? "Nao registrada"}
                  </p>
                </div>
              </div>

              {selected.explicacao ? (
                <div className="mt-4 rounded-[18px] border border-[#cad6f6] bg-[#eef3ff] px-3 py-3">
                  <p className="text-sm font-extrabold text-[#3457b9]">
                    Explicacao do Tutor Inteligente
                  </p>
                  <p className="mt-1 text-sm leading-5 text-[#34405a]">{selected.explicacao}</p>
                </div>
              ) : null}

              <div className="mt-5 flex flex-col gap-3 border-t border-[#e8edf6] pt-4 md:flex-row md:items-center md:justify-between">
                <button
                  type="button"
                  onClick={() => setSelectedIndex((index) => Math.max(0, index - 1))}
                  disabled={selectedIndex === 0}
                  className="rounded-xl border border-border bg-white px-4 py-3 text-sm font-semibold text-[#4d7ae2] shadow-sm disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Anterior
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedIndex((index) => Math.min(items.length - 1, index + 1))}
                  disabled={selectedIndex === items.length - 1}
                  className="rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_18px_rgba(42,103,215,0.28)] transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Proxima questao
                </button>
              </div>
            </article>
          </div>
        </>
      )}
    </section>
  );
}
