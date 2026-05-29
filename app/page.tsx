import { PerformanceChartCard } from "./_components/performance-chart-card";
import { SidebarToggleButton } from "./_components/sidebar-toggle-button";

type SummaryCard = {
  title: string;
  accent: string;
  value: string;
  subtitle: string;
  details: string[];
  icon: string;
};

type TopicProgress = {
  topic: string;
  progress: number;
  color: string;
};
//
type QuickAction = {
  title: string;
  description: string;
  cta: string;
  accent: string;
  icon: string;
};

const summaryCards: SummaryCard[] = [
  {
    title: "Desempenho",
    accent: "var(--success)",
    value: "75%",
    subtitle: "Bom trabalho!",
    details: ["Voce esta evoluindo", "+12% desde a ultima semana"],
    icon: "gauge",
  },
  {
    title: "Simulados Realizados",
    accent: "var(--primary)",
    value: "12",
    subtitle: "simulados",
    details: ["Ultimo:", "18/05/2026"],
    icon: "sheet",
  },
  {
    title: "Questoes Respondidas",
    accent: "var(--warning)",
    value: "240",
    subtitle: "questoes",
    details: ["Acertos: 140", "Erros: 100"],
    icon: "question",
  },
];

const performanceBars = [72, 34, 28, 60, 42, 66, 35, 54, 31, 48, 74, 81, 69, 25, 77, 73, 58];

const topics: TopicProgress[] = [
  { topic: "Legislacao de Transito", progress: 75, color: "#b388ff" },
  { topic: "Sinalizacao de Transito", progress: 65, color: "#f4c542" },
  { topic: "Direcao Defensiva", progress: 80, color: "#88c977" },
  { topic: "Primeiros Socorros", progress: 10, color: "#ff6b8b" },
  { topic: "Meio Ambiente", progress: 50, color: "#58c67a" },
];

const quickActions: QuickAction[] = [
  {
    title: "Iniciar Simulado",
    description: "Simule a prova oficial e teste seus conhecimentos.",
    cta: "Iniciar",
    accent: "#7f92ee",
    icon: "sheet",
  },
  {
    title: "Pratica por Tema",
    description: "Estude assuntos especificos e teste seus pontos fortes.",
    cta: "Estudar",
    accent: "#8dca8a",
    icon: "book",
  },
  {
    title: "Revisar Erros",
    description: "Revise as questoes que voce errou e avance com clareza.",
    cta: "Revisar",
    accent: "#dc7a88",
    icon: "alert",
  },
  {
    title: "Tutor Inteligente",
    description: "Tire duvidas e receba explicacoes com IA CNH.",
    cta: "Conversar",
    accent: "#b785f4",
    icon: "bot",
  },
];

function Icon({
  type,
  className,
}: {
  type: "gauge" | "sheet" | "question" | "book" | "alert" | "bot" | "idea";
  className?: string;
}) {
  const base = "h-6 w-6";

  switch (type) {
    case "gauge":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className ?? base}>
          <path d="M5 15a7 7 0 1 1 14 0" />
          <path d="m12 12 3-3" />
          <path d="M7 15h.01" />
          <path d="M17 15h.01" />
        </svg>
      );
    case "sheet":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className ?? base}>
          <rect x="5" y="3.5" width="14" height="17" rx="2.5" />
          <path d="M9 8h6" />
          <path d="M9 12h6" />
          <path d="M9 16h4" />
        </svg>
      );
    case "question":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className ?? base}>
          <path d="M9.2 9a2.8 2.8 0 1 1 4.8 2c-.7.7-1.5 1.1-1.9 2.1" />
          <path d="M12 17h.01" />
          <circle cx="12" cy="12" r="9" />
        </svg>
      );
    case "book":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className ?? base}>
          <path d="M4.5 5.5H11a3 3 0 0 1 3 3V20a3 3 0 0 0-3-3H4.5Z" />
          <path d="M19.5 5.5H13a3 3 0 0 0-3 3V20a3 3 0 0 1 3-3h6.5Z" />
        </svg>
      );
    case "alert":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className ?? base}>
          <path d="M12 4.2 20 18a1 1 0 0 1-.86 1.5H4.86A1 1 0 0 1 4 18Z" />
          <path d="M12 9v4.2" />
          <circle cx="12" cy="16.5" r=".6" fill="currentColor" stroke="none" />
        </svg>
      );
    case "bot":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className ?? base}>
          <rect x="5" y="7" width="14" height="10" rx="3" />
          <path d="M12 4v3" />
          <path d="M9 12h.01" />
          <path d="M15 12h.01" />
          <path d="M8.5 17v2l2-2" />
          <path d="M15.5 17v2l-2-2" />
        </svg>
      );
    case "idea":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className ?? base}>
          <path d="M9 18h6" />
          <path d="M10 21h4" />
          <path d="M8.2 14.5A5.8 5.8 0 1 1 15.8 14.5c-.8.8-1.3 1.7-1.6 2.5h-4.4c-.3-.8-.8-1.7-1.6-2.5Z" />
        </svg>
      );
  }
}

function MetricCard({ card }: { card: SummaryCard }) {
  const isGauge = card.icon === "gauge";
  const isQuestionsCard = card.icon === "question";

  return (
    <article className="overflow-hidden rounded-[24px] border border-[#dfe5ef] bg-surface shadow-[0_12px_24px_rgba(19,32,58,0.08)]">
      <div className="flex items-center justify-between px-5 pb-2 pt-4">
        <h2 className="text-[1.05rem] font-extrabold text-[#161c28]">{card.title}</h2>
        <span className="text-[2rem] leading-none font-light" style={{ color: card.accent }}>
          {">"}
        </span>
      </div>
      <div className="h-[2px] w-full" style={{ backgroundColor: card.accent }} />

      <div className="flex min-h-[178px] items-center gap-5 px-6 py-5">
        <div
          className="flex h-23 w-23 shrink-0 items-center justify-center rounded-full"
          style={
            isGauge
              ? {
                  background: `conic-gradient(${card.accent} 0 270deg, #e5e7eb 270deg 360deg)`,
                }
              : { backgroundColor: `${card.accent}20` }
          }
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-foreground">
            {isGauge ? (
              <span className="text-[1.15rem] font-extrabold text-[#161c28]">75%</span>
            ) : (
              <Icon type={card.icon as "sheet" | "question"} className="h-8 w-8" />
            )}
          </div>
        </div>

        <div className="flex min-w-0 flex-1 items-center justify-between gap-4">
          <div className="min-w-0 flex-1">
            {!isGauge ? (
              <>
                <p className="text-[3rem] font-extrabold leading-none text-[#111722]">{card.value}</p>
                <p className="mt-1 text-[1.1rem] leading-none text-[#565d69]">{card.subtitle}</p>
              </>
            ) : null}
            {isGauge ? (
              <>
                <p className="text-[1.05rem] font-extrabold" style={{ color: card.accent }}>
                  {card.subtitle}
                </p>
                <p className="text-[0.95rem] leading-5 text-[#565d69]">{card.details[0]}</p>
                <p className="mt-2 text-[1.05rem] font-extrabold leading-none" style={{ color: card.accent }}>
                  {card.details[1].split(" ")[0]}
                  <span className="ml-1 text-[0.95rem] font-semibold text-[#565d69]">
                    {card.details[1].replace(`${card.details[1].split(" ")[0]} `, "")}
                  </span>
                </p>
              </>
            ) : null}
          </div>

          {!isGauge ? (
            <div className="border-l border-[#bfc5cf] pl-4">
              {isQuestionsCard ? (
                <div className="space-y-1 text-[0.95rem] font-bold leading-5">
                  <p className="text-[#38b935]">{card.details[0]}</p>
                  <p className="text-[#c23e47]">{card.details[1]}</p>
                </div>
              ) : (
                <div className="text-[0.95rem] leading-5 text-[#565d69]">
                  <p>{card.details[0]}</p>
                  <p className="font-semibold text-[#3a4353]">{card.details[1]}</p>
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </article>
  );
}

function TopicsCard() {
  return (
    <article className="flex h-full min-h-[270px] flex-col rounded-[24px] border border-border bg-surface shadow-[0_12px_24px_rgba(19,32,58,0.08)]">
      <div className="border-b border-border px-5 py-3">
        <h2 className="text-sm font-semibold text-foreground">Estude por Tema</h2>
      </div>

      <div className="flex flex-1 flex-col justify-center space-y-4 px-5 py-5">
        {topics.map((topic) => (
          <div key={topic.topic} className="grid grid-cols-[1fr_auto] items-center gap-4">
            <div className="flex items-center gap-3">
              <span
                className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full"
                style={{ backgroundColor: `${topic.color}30`, color: topic.color }}
              >
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: topic.color }} />
              </span>
              <span className="text-sm text-foreground">{topic.topic}</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="h-1.5 w-32 rounded-full bg-slate-200">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${topic.progress}%`, backgroundColor: "#243f9f" }}
                />
              </div>
              <span className="w-9 text-right text-xs font-semibold" style={{ color: topic.color }}>
                {topic.progress}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}

function QuickActionCard({ action }: { action: QuickAction }) {
  return (
    <article className="flex h-full flex-col rounded-[22px] border border-border bg-surface p-5 text-center shadow-[0_12px_24px_rgba(19,32,58,0.08)]">
      <div
        className="mx-auto flex h-14 w-14 items-center justify-center rounded-full text-white"
        style={{ backgroundColor: action.accent }}
      >
        <Icon type={action.icon as "sheet" | "book" | "alert" | "bot"} className="h-7 w-7" />
      </div>
      <h3 className="mt-4 text-lg font-extrabold text-foreground">{action.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-5 text-text-muted">{action.description}</p>
      <button
        className="mt-4 rounded-full px-4 py-2 text-sm font-semibold text-white shadow-[0_8px_18px_rgba(19,32,58,0.16)]"
        style={{ backgroundColor: action.accent }}
      >
        {action.cta}
      </button>
    </article>
  );
}

function TipCard() {
  return (
    <article className="relative overflow-hidden rounded-[22px] border border-[#f3d87f] bg-linear-to-br from-[#fff0a8] via-[#ffe992] to-[#f8dc73] p-5 shadow-[0_12px_24px_rgba(19,32,58,0.08)]">
      <div className="relative z-10 max-w-[220px]">
        <div className="flex items-center gap-3 text-[#745c00]">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/50">
            <Icon type="idea" className="h-5 w-5" />
          </span>
          <div>
            <p className="text-sm font-semibold">Dica de hoje!</p>
            <p className="text-xs text-[#8a6d09]">Revisao inteligente</p>
          </div>
        </div>

        <p className="mt-4 text-sm leading-6 text-[#5d4a0a]">
          Revise as questoes de sinalizacao e foque nos erros mais recentes da semana.
        </p>
      </div>

      <div className="absolute -bottom-10 -right-6 h-36 w-36 rounded-full border-[16px] border-[#d2a925]/20" />
      <div className="absolute bottom-4 right-4 rotate-[-18deg] rounded-2xl border-4 border-[#d2a925]/45 px-5 py-2 text-lg font-black tracking-[0.22em] text-[#b68600]/70">
        STOP
      </div>
    </article>
  );
}

export default function HomePage() {
  return (
    <section className="flex min-h-screen flex-1 flex-col bg-[#f7f8fc] px-4 py-5 sm:px-6 lg:px-9 lg:py-7">
      <header className="flex flex-col gap-5 pb-6 md:flex-row md:items-start md:justify-between">
        <div className="flex items-start gap-3">
          <SidebarToggleButton />
          <div>
          <p className="text-sm font-semibold text-accent">tela inicial</p>
          <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-blue-deep sm:text-5xl">
            Ola, Josue!
          </h1>
          </div>
        </div>

        <div className="flex items-center gap-3 self-start rounded-full bg-white px-3 py-2 shadow-[0_10px_24px_rgba(19,32,58,0.08)]">
          <div className="text-right">
            <p className="text-sm font-semibold text-foreground">Josue Medino</p>
            <p className="text-xs text-text-muted">Nivel basico</p>
          </div>
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-linear-to-br from-slate-800 to-slate-500 text-sm font-black text-white">
            JM
          </div>
        </div>
      </header>

      <div className="grid gap-5 xl:grid-cols-3">
        {summaryCards.map((card) => (
          <MetricCard key={card.title} card={card} />
        ))}
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.08fr_1fr]">
        <PerformanceChartCard values={performanceBars} />
        <TopicsCard />
      </div>

      <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
        {quickActions.map((action) => (
          <QuickActionCard key={action.title} action={action} />
        ))}
        <TipCard />
      </div>
    </section>
  );
}
