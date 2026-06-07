import { PerformanceChartCard } from "../_components/performance-chart-card";
import { SidebarToggleButton } from "../_components/sidebar-toggle-button";

type SummaryCard = {
  title: string;
  accent: string;
  value: string;
  subtitle: string;
  details: string[];
  icon: "gauge" | "sheet" | "pie" | "bot";
};

type TopicProgress = {
  topic: string;
  progress: number;
  color: string;
  icon: string;
};

type QuickAction = {
  title: string;
  description: string;
  cta: string;
  accent: string;
  icon: "sheet" | "book" | "alert" | "bot";
};

const summaryCards: SummaryCard[] = [
  {
    title: "Questões",
    accent: "#22c55e", // Verde
    value: "75%",
    subtitle: "Corretas",
    details: ["244 realizadas", ""],
    icon: "gauge",
  },
  {
    title: "Simulados",
    accent: "#0b57a4", // Azul Escuro
    value: "12",
    subtitle: "realizados",
    details: ["", ""], // Removida a duplicidade aqui
    icon: "sheet",
  },
  {
    title: "Temas",
    accent: "#991b1b", // Vermelho/Vinho
    value: "60%",
    subtitle: "Pontos Fracos",
    details: ["244 realizadas", ""],
    icon: "pie",
  },
  {
    title: "Tutor",
    accent: "#eab308", // Amarelo Ouro
    value: "1000",
    subtitle: "perguntas",
    details: ["", ""], // Removida a duplicidade aqui
    icon: "bot",
  },
];

const performanceBars = [72, 34, 28, 60, 42, 66, 35, 54, 31, 48, 74, 81, 69, 25, 77, 73, 58];

const topics: TopicProgress[] = [
  { topic: "Legislação de Trânsito", progress: 75, color: "#22c55e", icon: "⚖️" },
  { topic: "Sinalização de Trânsito", progress: 65, color: "#eab308", icon: "⚠️" },
  { topic: "Direção Defensiva", progress: 80, color: "#22c55e", icon: "🛡️" },
  { topic: "Primeiros Socorros", progress: 10, color: "#991b1b", icon: "🚑" },
  { topic: "Meio Ambiente", progress: 50, color: "#eab308", icon: "🌱" },
];

const quickActions: QuickAction[] = [
  {
    title: "Iniciar Simulado",
    description: "Simule a prova oficial e teste seus conhecimentos.",
    cta: "Iniciar",
    accent: "#0b57a4",
    icon: "sheet",
  },
  {
    title: "Prática por Tema",
    description: "Estude assuntos específicos e teste seus pontos fortes.",
    cta: "Estudar",
    accent: "#22c55e",
    icon: "book",
  },
  {
    title: "Revisar Erros",
    description: "Revise as questões que você errou e avance com clareza.",
    cta: "Revisar",
    accent: "#991b1b",
    icon: "alert",
  },
  {
    title: "Tutor Inteligente",
    description: "Tire dúvidas e receba explicações com IA CNH.",
    cta: "Conversar",
    accent: "#eab308",
    icon: "bot",
  },
];

function UniversalIcon({
  type,
  className,
  color,
  percentValue = "0%",
  subtitleText = "",
  isCompact = false,
}: {
  type: "gauge" | "sheet" | "pie" | "bot" | "book" | "alert" | "idea";
  className?: string;
  color?: string;
  percentValue?: string;
  subtitleText?: string;
  isCompact?: boolean;
}) {
  const base = "h-6 w-6";
  const numericPercent = parseInt(percentValue) || 0;

  switch (type) {
    case "gauge":
    case "pie":
      return (
        <div className="relative flex items-center justify-center h-24 w-24">
          <svg height="100" width="100" className="rotate-[-90deg]">
            <circle stroke="#e5e7eb" fill="transparent" strokeWidth="10" r="38" cx="50" cy="50" />
            <circle
              stroke={color ?? "#22c55e"}
              fill="transparent"
              strokeWidth="10"
              strokeDasharray="238.76"
              strokeDashoffset={238.76 - (numericPercent / 100) * 238.76}
              strokeLinecap="round"
              r="38"
              cx="50"
              cy="50"
            />
          </svg>
          <div className="absolute flex flex-col items-center justify-center text-center">
            <span className="text-base font-black text-[#1c2434]">{percentValue}</span>
            <span className="text-[7px] font-bold text-gray-400 uppercase leading-none mt-0.5">
              {subtitleText === "Pontos Fracos" ? <>Pontos<br/>Fracos</> : subtitleText}
            </span>
          </div>
        </div>
      );
case "sheet":
      return isCompact ? (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
          <rect x="5" y="3" width="14" height="18" rx="2" />
          <path d="M9 7h6M9 11h6M9 15h4" />
        </svg>
      ) : (
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#0b57a4] text-white shadow-xs">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10">
            <rect x="5" y="3" width="14" height="18" rx="2" />
            <circle cx="12" cy="10" r="3" />
            <path d="M7 21v-2a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v2" />
          </svg>
        </div>
      );
    case "bot":
      return isCompact ? (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
          <rect x="3" y="11" width="18" height="10" rx="2" />
          <path d="M12 2v4M12 6H7M12 6h5M8 15h.01M16 15h.01" />
        </svg>
      ) : (
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#eab308] text-white shadow-xs">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10">
            <rect x="5" y="8" width="14" height="11" rx="3" />
            <path d="M9 13h.01M15 13h.01M12 5v3M10 5h4" />
          </svg>
        </div>
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
  const isCircleType = card.icon === "gauge" || card.icon === "pie";
  const hasDetails = card.details[0] !== "";

  return (
    <article className="overflow-hidden rounded-[24px] border border-gray-200 bg-white shadow-[0_8px_20px_rgba(0,0,0,0.03)] transition-transform hover:scale-[1.01]">
      <div className="flex items-center justify-between px-5 pb-2 pt-4 border-b border-gray-50">
        <h2 className="text-base font-black" style={{ color: card.accent }}>{card.title}</h2>
        <span className="flex h-5 w-5 items-center justify-center rounded-full border border-gray-300 text-[10px] font-bold text-gray-400">i</span>
      </div>

      <div className="flex min-h-[140px] items-center gap-4 px-5 py-4">
        {/* Lado Esquerdo: Círculo Gráfico ou Ícone de Destaque */}
        <div className="flex shrink-0 items-center justify-center">
          <UniversalIcon 
            type={card.icon} 
            color={card.accent} 
            percentValue={card.value} 
            subtitleText={card.subtitle} 
          />
        </div>

        {/* Lado Direito: Informações numéricas e Subtítulo */}
        <div className="flex min-w-0 flex-1 items-center justify-between gap-2">
          <div className="min-w-0 flex-1">
            {!isCircleType && (
              <>
                <p className="text-3xl font-black leading-none text-gray-800">{card.value}</p>
                <p className="mt-1 text-xs font-bold text-gray-400 uppercase tracking-wider">{card.subtitle}</p>
              </>
            )}
          </div>

          {/* Renderiza o bloco de detalhes lateral apenas se houver conteúdo válido */}
          {hasDetails && (
            <div className="border-l border-gray-200 pl-3 text-right">
              <p className="text-sm font-black text-gray-700">{card.details[0].split(" ")[0]}</p>
              <p className="text-[11px] font-bold text-gray-400 whitespace-nowrap">
                {card.details[0].replace(`${card.details[0].split(" ")[0]} `, "")}
              </p>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

function TopicsCard() {
  return (
    <article className="flex h-full min-h-[270px] flex-col rounded-[24px] border border-gray-200 bg-white shadow-[0_8px_20px_rgba(0,0,0,0.03)]">
      <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
        <h2 className="text-base font-black text-[#eab308]">Acertos por Tema</h2>
        <span className="flex h-5 w-5 items-center justify-center rounded-full border border-gray-300 text-xs font-bold text-gray-400">i</span>
      </div>

      <div className="flex flex-1 flex-col justify-center space-y-4 px-5 py-5">
        {topics.map((topic) => (
          <div key={topic.topic} className="flex flex-col space-y-1">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="text-sm">{topic.icon}</span>
                <span className="font-bold text-gray-600">{topic.topic}</span>
              </div>
              <span className="font-black" style={{ color: topic.color }}>{topic.progress}%</span>
            </div>
            <div className="h-2.5 w-full rounded-full bg-gray-100 p-[2px]">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: `${topic.progress}%`, backgroundColor: topic.color }}
              />
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}

function QuickActionCard({ action }: { action: QuickAction }) {
  return (
    <article className="flex h-full flex-col rounded-[22px] border border-gray-200 bg-white p-5 text-center shadow-[0_8px_20px_rgba(0,0,0,0.02)]">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full text-white shadow-xs" style={{ backgroundColor: action.accent }}>
        <UniversalIcon type={action.icon as "sheet" | "book" | "alert" | "bot"} isCompact={true} />
      </div>
      <h3 className="mt-4 text-base font-black text-gray-800">{action.title}</h3>
      <p className="mt-1.5 flex-1 text-xs font-medium leading-relaxed text-gray-400">{action.description}</p>
      <button
        className="mt-4 rounded-xl px-4 py-2 text-xs font-black text-white shadow-sm transition-opacity hover:opacity-90"
        style={{ backgroundColor: action.accent }}
      >
        {action.cta}
      </button>
    </article>
  );
}

function TipCard() {
  return (
    <article className="relative overflow-hidden rounded-[22px] border border-[#f3d87f] bg-gradient-to-br from-[#fff0a8] via-[#ffe992] to-[#f8dc73] p-5 shadow-[0_8px_20px_rgba(0,0,0,0.02)]">
      <div className="relative z-10 max-w-[220px]">
        <div className="flex items-center gap-3 text-[#745c00]">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/50 text-sm">
            💡
          </span>
          <div>
            <p className="text-xs font-black">Dica de hoje!</p>
            <p className="text-[10px] font-bold text-[#8a6d09]">Revisão inteligente</p>
          </div>
        </div>

        <p className="mt-4 text-xs font-bold leading-relaxed text-[#5d4a0a]">
          Revise as questões de sinalização e foque nos erros mais recentes da semana.
        </p>
      </div>

      <div className="absolute -bottom-10 -right-6 h-32 w-32 rounded-full border-[12px] border-[#d2a925]/20" />
      <div className="absolute bottom-4 right-4 rotate-[-18deg] rounded-xl border-2 border-[#d2a925]/45 px-3 py-1 text-xs font-black tracking-[0.22em] text-[#b68600]/70">
        STOP
      </div>
    </article>
  );
}

export default function HomePage() {
  return (
    <section className="flex min-h-screen flex-1 flex-col bg-[#f8faff] px-6 py-6 lg:px-10 lg:py-8">
      <header className="flex flex-col gap-4 border-b border-gray-200 pb-6 md:flex-row md:items-start md:justify-between">
        <div className="flex items-start gap-3">
          <SidebarToggleButton />
          <div>
            <h1 className="text-3xl font-black tracking-tight text-[#0b57a4] sm:text-4xl">
              Olá, Josué!
            </h1>
            <p className="mt-1 text-sm font-bold text-gray-400">
              Transforme seus erros em acertos e conquiste sua CNH com o nosso Tutor.
            </p>
            
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="rounded-full bg-[#ecfdf5] px-3 py-0.5 text-[11px] font-bold text-[#10b981] border border-[#a7f3d0]">+3 Questões</span>
              <span className="rounded-full bg-[#fef2f2] px-3 py-0.5 text-[11px] font-bold text-[#ef4444] border border-[#fca5a5]">-5 Pontos</span>
              <span className="rounded-full bg-[#fff1f2] px-3 py-0.5 text-[11px] font-bold text-[#f43f5e] border border-[#fecdd3]">+1 Simulado</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 self-start rounded-xl bg-white px-4 py-2 border border-gray-100 shadow-[0_4px_12px_rgba(0,0,0,0.02)]">
          <div className="text-right">
            <p className="text-sm font-black text-gray-800">Josué Medino</p>
            <p className="text-xs font-bold text-gray-400">Nível Básico</p>
          </div>
          <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-gray-100 bg-gray-200 shadow-inner flex items-center justify-center font-black text-gray-500 text-xs">
            JM
          </div>
        </div>
      </header>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map((card) => (
          <MetricCard key={card.title} card={card} />
        ))}
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.2fr_1fr]">
        <article className="rounded-[24px] border border-gray-200 bg-white p-5 shadow-[0_8px_20px_rgba(0,0,0,0.03)]">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-4">
            <h2 className="text-base font-black text-[#22c55e]">Perguntas por Tema</h2>
            <span className="flex h-5 w-5 items-center justify-center rounded-full border border-gray-300 text-xs font-bold text-gray-400">i</span>
          </div>
          <PerformanceChartCard values={performanceBars} />
        </article>
        <TopicsCard />
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-5">
        {quickActions.map((action) => (
          <QuickActionCard key={action.title} action={action} />
        ))}
        <TipCard />
      </div>
    </section>
  );
}
