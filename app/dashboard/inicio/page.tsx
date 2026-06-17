"use client";

import Link from "next/link";
import { AlertTriangle, Bot, BookOpen, ClipboardCheck, LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { PerformanceChartCard } from "../../_components/performance-chart-card";
import { SidebarToggleButton } from "../../_components/sidebar-toggle-button";
import { SummaryStatCard, type SummaryStatCardData } from "../../_components/summary-stat-card";
import { TopicProgressCard, type TopicProgressItem } from "../../_components/topic-progress-card";
import { UserPill } from "../../_components/user-pill";
import { useAuth } from "../../_components/auth-provider";
import { api, type Desempenho } from "@/lib/api";

const quickActions = [
  {
    title: "Iniciar Simulado",
    description: "Simule a prova oficial e teste seus conhecimentos.",
    cta: "Iniciar",
    href: "/dashboard/simulados",
    accent: "#0b57a4",
    icon: ClipboardCheck,
  },
  {
    title: "Pratica por Tema",
    description: "Estude assuntos especificos e teste seus pontos fortes.",
    cta: "Estudar",
    href: "/dashboard/pratica-por-tema",
    accent: "#22c55e",
    icon: BookOpen,
  },
  {
    title: "Revisar Erros",
    description: "Revise as questoes que voce errou e avance com clareza.",
    cta: "Revisar",
    href: "/dashboard/revisar-erros",
    accent: "#991b1b",
    icon: AlertTriangle,
  },
  {
    title: "Tutor Inteligente",
    description: "Tire duvidas e receba explicacoes com IA CNH.",
    cta: "Conversar",
    href: "/dashboard/tutor-inteligente",
    accent: "#eab308",
    icon: Bot,
  },
];

function cardsFromData(data: Desempenho | null): SummaryStatCardData[] {
  return [
    {
      title: "Questoes",
      accent: "#22c55e",
      value: `${Math.round(data?.percentual_acerto ?? 0)}%`,
      subtitle: "Corretas",
      details: [`${data?.questoes_feitas ?? 0} realizadas`, ""],
      icon: "gauge",
    },
    {
      title: "Simulados",
      accent: "#0b57a4",
      value: `${data?.simulados_realizados ?? 0}`,
      subtitle: "realizados",
      icon: "sheet",
    },
    {
      title: "Erros",
      accent: "#991b1b",
      value: `${data?.erros ?? 0}`,
      subtitle: "para revisar",
      details: [`${data?.questoes_feitas ?? 0} respostas`, ""],
      icon: "pie",
    },
    {
      title: "Tutor",
      accent: "#eab308",
      value: `${data?.perguntas_ao_tutor ?? 0}`,
      subtitle: "perguntas",
      icon: "bot",
    },
  ];
}

function topicsFromData(data: Desempenho | null): TopicProgressItem[] {
  if (!data?.areas.length) {
    return [{ topic: "Sem respostas registradas", progress: 0, color: "#8FB3DD", icon: "CNH" }];
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

function barsFromData(data: Desempenho | null) {
  const values = data?.areas.map((area) => Math.round(area.percentual_acerto)) ?? [];
  return values.length ? [...values, ...Array(Math.max(0, 8 - values.length)).fill(0)] : [0, 0, 0, 0, 0, 0];
}

export default function HomePage() {
  const { token, usuario } = useAuth();
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
          setError(err instanceof Error ? err.message : "Nao foi possivel carregar o dashboard.");
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

  return (
    <section className="flex min-h-screen flex-1 flex-col bg-[#f8faff] px-6 py-6 lg:px-10 lg:py-8">
      <header className="flex flex-col gap-4 border-b border-gray-200 pb-6 md:flex-row md:items-start md:justify-between">
        <div className="flex items-start gap-3">
          <SidebarToggleButton />
          <div>
            <h1 className="text-3xl font-black tracking-tight text-[#0b57a4] sm:text-4xl">
              Ola, {usuario?.nome?.split(" ")[0] ?? "aluno"}!
            </h1>
            <p className="mt-1 text-sm font-bold text-gray-400">
              Seus dados abaixo sao carregados diretamente da API CNH.
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
        <>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {cardsFromData(data).map((card) => (
              <SummaryStatCard key={card.title} card={card} />
            ))}
          </div>

          <div className="mt-6 grid gap-6 xl:grid-cols-[1.2fr_1fr]">
            <article className="rounded-[24px] border border-gray-200 bg-white p-5 shadow-[0_8px_20px_rgba(0,0,0,0.03)]">
              <div className="mb-4 flex items-center justify-between border-b border-gray-100 pb-3">
                <h2 className="text-base font-black text-[#22c55e]">Acertos por tema</h2>
                <span className="flex h-5 w-5 items-center justify-center rounded-full border border-gray-300 text-xs font-bold text-gray-400">
                  i
                </span>
              </div>
              <PerformanceChartCard values={barsFromData(data)} />
            </article>
            <TopicProgressCard topics={topicsFromData(data)} />
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <article
                  key={action.title}
                  className="flex h-full flex-col rounded-[22px] border border-gray-200 bg-white p-5 text-center shadow-[0_8px_20px_rgba(0,0,0,0.02)]"
                >
                  <div
                    className="mx-auto flex h-12 w-12 items-center justify-center rounded-full text-white shadow-xs"
                    style={{ backgroundColor: action.accent }}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-base font-black text-gray-800">{action.title}</h3>
                  <p className="mt-1.5 flex-1 text-xs font-medium leading-relaxed text-gray-400">
                    {action.description}
                  </p>
                  <Link
                    href={action.href}
                    className="mt-4 rounded-xl px-4 py-2 text-xs font-black text-white shadow-sm transition-opacity hover:opacity-90"
                    style={{ backgroundColor: action.accent }}
                  >
                    {action.cta}
                  </Link>
                </article>
              );
            })}
          </div>
        </>
      )}
    </section>
  );
}
