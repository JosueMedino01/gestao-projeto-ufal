import { PerformanceChartCard } from "../../_components/performance-chart-card";
import { SidebarToggleButton } from "../../_components/sidebar-toggle-button";
import { SummaryStatCard, type SummaryStatCardData } from "../../_components/summary-stat-card";
import { TopicProgressCard, type TopicProgressItem } from "../../_components/topic-progress-card";

const statCards: SummaryStatCardData[] = [
  {
    title: "Questoes",
    accent: "#22c55e",
    value: "75%",
    subtitle: "Corretas",
    details: ["244 realizadas", ""],
    icon: "gauge",
    tooltipMessage: "Total de questoes respondidas e taxa atual de acertos.",
  },
  {
    title: "Simulados",
    accent: "#0b57a4",
    value: "12",
    subtitle: "realizados",
    details: ["", ""],
    icon: "sheet",
    tooltipMessage: "Quantidade de simulados finalizados pelo usuario.",
  },
  {
    title: "Temas",
    accent: "#991b1b",
    value: "60%",
    subtitle: "Pontos Fracos",
    details: ["244 realizadas", ""],
    icon: "pie",
    tooltipMessage: "Desempenho medio consolidado entre os temas estudados.",
  },
  {
    title: "Tutor",
    accent: "#eab308",
    value: "1000",
    subtitle: "perguntas",
    details: ["", ""],
    icon: "bot",
    tooltipMessage: "Interacoes e perguntas enviadas ao tutor inteligente.",
  },
] as const;

const performanceBars = [72, 34, 28, 60, 42, 66, 35, 54, 31, 48, 74, 81, 69, 25, 77, 73, 58];

const topics: TopicProgressItem[] = [
  { topic: "Legislacao de Transito", progress: 75, color: "#22c55e", icon: "⚖️" },
  { topic: "Sinalizacao de Transito", progress: 65, color: "#eab308", icon: "⚠️" },
  { topic: "Direcao Defensiva", progress: 80, color: "#22c55e", icon: "🛡️" },
  { topic: "Primeiros Socorros", progress: 10, color: "#991b1b", icon: "🚑" },
  { topic: "Meio Ambiente", progress: 50, color: "#eab308", icon: "🌱" },
];

export default function DesempenhoPage() {
  return (
    <section className="flex h-full min-h-0 flex-1 flex-col bg-[#f8faff] px-6 py-6 lg:px-10 lg:py-8">
      <header className="flex flex-col gap-4 border-b border-gray-200 pb-6 md:flex-row md:items-start md:justify-between">
        <div className="flex items-start gap-3">
          <SidebarToggleButton />
          <div>
            <h1 className="text-3xl font-black tracking-tight text-[#0b57a4] sm:text-4xl">Desempenho</h1>
            <p className="mt-1 text-sm font-bold text-gray-400">
              Abaixo voce podera acompanhar as estatisticas de seu usuario
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-full bg-success-soft px-3 py-1 text-xs font-semibold text-success">+3 Questoes</span>
              <span className="rounded-full bg-success-soft px-3 py-1 text-xs font-semibold text-success">+5 Pontos</span>
              <span className="rounded-full bg-danger-soft px-3 py-1 text-xs font-semibold text-danger">+1 Simulado</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 self-start rounded-xl border border-gray-100 bg-white px-4 py-2 shadow-[0_4px_12px_rgba(0,0,0,0.02)]">
          <div className="text-right">
            <p className="text-sm font-black text-gray-800">Josue Medino</p>
            <p className="text-xs font-bold text-gray-400">Nivel basico</p>
          </div>
          <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border-2 border-gray-100 bg-gray-200 text-xs font-black text-gray-500 shadow-inner">
            JM
          </div>
        </div>
      </header>

      <div className="flex min-h-0 flex-1 justify-center overflow-auto pt-6 xl:items-center">
        <div className="flex w-full max-w-[2000px] flex-1 flex-col gap-5 xl:max-h-[1100px]">
          <div className="flex flex-1 flex-col xl:justify-center">
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4 xl:max-h-[600px]">
              {statCards.map((card) => (
                <SummaryStatCard key={card.title} card={card} />
              ))}
            </div>

            <div className="mt-6 grid flex-1 items-stretch gap-6 xl:grid-cols-4 xl:max-h-[600px]">
              <article className="flex h-full flex-col rounded-[24px] border border-gray-200 bg-white p-5 shadow-[0_8px_20px_rgba(0,0,0,0.03)] xl:col-span-2">
                <div className="mb-4 flex items-center justify-between border-b border-gray-100 pb-3">
                  <h2 className="text-base font-black text-[#22c55e]">Perguntas por Tema</h2>
                  <span className="flex h-5 w-5 items-center justify-center rounded-full border border-gray-300 text-xs font-bold text-gray-400">i</span>
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

          <article className="mt-auto flex flex-col gap-4 rounded-[20px] border border-primary bg-surface px-4 py-3 shadow-sm lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-surface-muted text-xl">
                <span>💬</span>
              </div>
              <div>
                <p className="font-semibold text-blue-deep">Sugestao do Tutor Inteligente</p>
                <p className="text-sm text-text-muted">
                  Gostaria de registrar seu desempenho em uma planilha dedicada? Clique para exportar!
                </p>
              </div>
            </div>

            <button className="rounded-full bg-info px-5 py-2 text-sm font-semibold text-white transition hover:bg-blue-deep">
              Exportar para PDF
            </button>
          </article>
        </div>
      </div>
    </section>
  );
}
