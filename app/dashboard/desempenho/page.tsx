"use client";

import { LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { PerformanceChartCard } from "../../_components/performance-chart-card";
import { SidebarToggleButton } from "../../_components/sidebar-toggle-button";
import { SummaryStatCard, type SummaryStatCardData } from "../../_components/summary-stat-card";
import { TopicProgressCard, type TopicProgressItem } from "../../_components/topic-progress-card";
import { UserPill } from "../../_components/user-pill";
import { useAuth } from "../../_components/auth-provider";
import { api, type Desempenho } from "@/lib/api";

function buildBars(data: Desempenho | null) {
  const values = data?.areas.map((area) => Math.round(area.percentual_acerto)) ?? [];
  if (values.length === 0) {
    return [0, 0, 0, 0, 0, 0];
  }
  return [...values, ...Array(Math.max(0, 8 - values.length)).fill(0)];
}

function buildTopics(data: Desempenho | null): TopicProgressItem[] {
  if (!data?.areas.length) {
    return [
      { topic: "Sem respostas registradas", progress: 0, color: "#8FB3DD", icon: "CNH" },
    ];
  }

  return data.areas.map((area) => ({
    topic: area.area,
    progress: Math.round(area.percentual_acerto),
    color:
      area.percentual_acerto >= 70
        ? "#22c55e"
        : area.percentual_acerto >= 45
          ? "#eab308"
          : "#991b1b",
    icon: "CNH",
  }));
}

function buildCards(data: Desempenho | null): SummaryStatCardData[] {
  const percentual = Math.round(data?.percentual_acerto ?? 0);
  const erros = data?.erros ?? 0;
  const feitas = data?.questoes_feitas ?? 0;

  return [
    {
      title: "Questoes",
      accent: "#22c55e",
      value: `${percentual}%`,
      subtitle: "Corretas",
      details: [`${feitas} realizadas`, ""],
      icon: "gauge",
      tooltipMessage: "Taxa geral de acertos nas questoes respondidas.",
    },
    {
      title: "Simulados",
      accent: "#0b57a4",
      value: `${data?.simulados_realizados ?? 0}`,
      subtitle: "realizados",
      icon: "sheet",
      tooltipMessage: "Quantidade de simulados finalizados.",
    },
    {
      title: "Erros",
      accent: "#991b1b",
      value: `${erros}`,
      subtitle: "para revisar",
      details: [`${feitas} respostas`, ""],
      icon: "pie",
      tooltipMessage: "Total de respostas incorretas registradas.",
    },
    {
      title: "Tutor",
      accent: "#eab308",
      value: `${data?.perguntas_ao_tutor ?? 0}`,
      subtitle: "perguntas",
      icon: "bot",
      tooltipMessage: "Perguntas enviadas ao tutor inteligente.",
    },
  ];
}

export default function DesempenhoPage() {
  const { token } = useAuth();
  const [data, setData] = useState<Desempenho | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) {
      return;
    }

    let mounted = true;

    api
      .desempenho(token)
      .then((response) => {
        if (mounted) {
          setData(response);
          setError("");
        }
      })
      .catch((err) => {
        if (mounted) {
          setError(err instanceof Error ? err.message : "Nao foi possivel carregar o desempenho.");
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

  const statCards = buildCards(data);
  const topics = buildTopics(data);
  const performanceBars = buildBars(data);

  return (
    <section className="flex h-full min-h-0 flex-1 flex-col bg-[#f8faff] px-6 py-6 lg:px-10 lg:py-8">
      <header className="flex flex-col gap-4 border-b border-gray-200 pb-6 md:flex-row md:items-start md:justify-between">
        <div className="flex items-start gap-3">
          <SidebarToggleButton />
          <div>
            <h1 className="text-3xl font-black tracking-tight text-[#0b57a4] sm:text-4xl">
              Desempenho
            </h1>
            <p className="mt-1 text-sm font-bold text-gray-400">
              Estatisticas registradas pelo backend conforme voce responde questoes.
            </p>
          </div>
        </div>
        <UserPill />
      </header>

      {error ? (
        <p className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {error}
        </p>
      ) : null}

      {isLoading ? (
        <div className="flex flex-1 items-center justify-center">
          <LoaderCircle className="h-7 w-7 animate-spin text-primary" />
        </div>
      ) : (
        <div className="flex min-h-0 flex-1 justify-center overflow-auto pt-6 xl:items-center">
          <div className="flex w-full max-w-[2000px] flex-1 flex-col gap-5 xl:max-h-[1100px]">
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
              {statCards.map((card) => (
                <SummaryStatCard key={card.title} card={card} />
              ))}
            </div>

            <div className="mt-6 grid flex-1 items-stretch gap-6 xl:grid-cols-4">
              <article className="flex h-full flex-col rounded-[24px] border border-gray-200 bg-white p-5 shadow-[0_8px_20px_rgba(0,0,0,0.03)] xl:col-span-2">
                <div className="mb-4 flex items-center justify-between border-b border-gray-100 pb-3">
                  <h2 className="text-base font-black text-[#22c55e]">Acertos por tema</h2>
                  <span className="flex h-5 w-5 items-center justify-center rounded-full border border-gray-300 text-xs font-bold text-gray-400">
                    i
                  </span>
                </div>
                <div className="flex flex-1 items-center">
                  <PerformanceChartCard className="w-full" values={performanceBars} />
                </div>
              </article>

              <div className="xl:col-span-2">
                <TopicProgressCard topics={topics} />
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
