import { BellIcon } from "lucide-react";
import { SidebarToggleButton } from "../../_components/sidebar-toggle-button";

const statCards = [
  {
    title: "Questoes",
    subtitle: "244 realizadas",
    accent: "border-success",
    label: "75%",
    ring: "conic-gradient(var(--color-success) 0deg 270deg, #d9dee8 270deg 360deg)",
    text: "text-success",
  },
  {
    title: "Simulados",
    subtitle: "12 realizados",
    accent: "border-info",
    iconBg: "bg-info",
    icon: "user",
  },
  {
    title: "Temas",
    subtitle: "244 realizadas",
    accent: "border-danger",
    label: "60%",
    ring: "conic-gradient(var(--color-danger) 0deg 216deg, #d9dee8 216deg 360deg)",
    text: "text-danger",
  },
  {
    title: "Tutor",
    subtitle: "1000 perguntas",
    accent: "border-warning",
    iconBg: "bg-warning",
    icon: "bot",
  },
] as const;

const topics = [
  { name: "Legislacao de Transito", value: 75, color: "bg-success", dot: "bg-accent-soft text-accent" },
  { name: "Sinalizacao de Transito", value: 65, color: "bg-warning", dot: "bg-warning-soft text-warning" },
  { name: "Direcao Defensiva", value: 80, color: "bg-success", dot: "bg-success-soft text-success" },
  { name: "Primeiros Socorros", value: 10, color: "bg-danger", dot: "bg-danger-soft text-danger" },
  { name: "Meio Ambiente", value: 50, color: "bg-warning", dot: "bg-info-soft text-info" },
] as const;

const chartData = [
  [65, 28, 22, 42],
  [78, 33, 30, 50],
  [58, 26, 18, 34],
  [88, 40, 24, 61],
  [74, 22, 36, 48],
  [52, 31, 20, 44],
  [69, 35, 27, 72],
  [95, 48, 32, 84],
  [72, 41, 25, 66],
  [84, 36, 29, 60],
  [76, 30, 18, 54],
  [60, 24, 16, 39],
] as const;

function UserCardIcon() {
  return (
    <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-info text-white">
      <div className="absolute h-10 w-10 rounded-xl border-2 border-white/90" />
      <div className="absolute top-[23px] h-3.5 w-3.5 rounded-full bg-white" />
      <div className="absolute bottom-[23px] h-4.5 w-8 rounded-full bg-white" />
    </div>
  );
}

function BotCardIcon() {
  return (
    <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-warning text-white">
      <div className="absolute top-[18px] h-2 w-2 rounded-full bg-white" />
      <div className="absolute top-[24px] h-10 w-10 rounded-2xl border-2 border-white" />
      <div className="absolute left-[26px] top-[34px] h-2 w-2 rounded-full bg-white" />
      <div className="absolute right-[26px] top-[34px] h-2 w-2 rounded-full bg-white" />
      <div className="absolute top-[41px] h-1 w-6 rounded-full bg-white" />
      <div className="absolute bottom-[18px] h-2 w-8 rounded-full bg-white/90" />
    </div>
  );
}

function CircularStat({
  label,
  subtitle,
  ring,
  text,
}: {
  label: string;
  subtitle: string;
  ring: string;
  text: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center">
      <div
        className="grid h-24 w-24 place-items-center rounded-full"
        style={{ background: ring }}
      >
        <div className="grid h-17 w-17 place-items-center rounded-full bg-white text-center shadow-inner">
          <span className="text-2xl font-bold" style={{ color: "#1c2434" }}>{label}</span>
        </div>
      </div>
      <p className="mt-3 text-xs font-semibold text-success">{subtitle}</p>
    </div>
  );
}

export default function DesempenhoPage() {
  return (
    <>
      <header className="flex flex-col gap-5 border-b border-border px-5 py-5 sm:px-7 lg:flex-row lg:items-start lg:justify-between lg:px-8">
        <div className="flex items-start gap-3">
          <SidebarToggleButton />
          <div>
            <p className="text-sm font-medium text-text-muted">Desempenho</p>
            <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-blue-deep">
              Desempenho
            </h1>
            <p className="mt-2 text-xl font-bold text-blue-deep">
              Abaixo voce podera acompanhar as estatisticas de seu usuario
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-full bg-success-soft px-3 py-1 text-xs font-semibold text-success">
                +3 Questoes
              </span>
              <span className="rounded-full bg-success-soft px-3 py-1 text-xs font-semibold text-success">
                +5 Pontos
              </span>
              <span className="rounded-full bg-danger-soft px-3 py-1 text-xs font-semibold text-danger">
                +1 Simulado
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 self-start xl:self-auto">
          <button className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white text-text-muted shadow-sm">
            <BellIcon />
          </button>
          <div className="flex items-center gap-3 rounded-full bg-white px-3 py-2 shadow-[0_10px_24px_rgba(19,32,58,0.08)]">
            <div className="text-right">
              <p className="text-sm font-semibold text-[#222222]">Josue Medino</p>
              <p className="text-xs text-text-muted">Nivel Basico</p>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-linear-to-br from-slate-800 to-slate-500 text-sm font-black text-white">
              JM
            </div>
          </div>
        </div>
      </header>

      <section className="flex-1 overflow-auto p-5 sm:p-7 lg:p-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {statCards.map((card) => (
            <article
              key={card.title}
              className={`rounded-[20px] border ${card.accent} bg-white p-4 shadow-sm`}
            >
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-sm font-bold text-[#1c2434]">{card.title}</h2>
                <span className="h-3 w-3 rounded-full border border-border bg-surface-muted" />
              </div>

              <div className="flex min-h-[145px] flex-col items-center justify-center">
                {"label" in card ? (
                  <CircularStat
                    label={card.label}
                    subtitle={card.subtitle}
                    ring={card.ring}
                    text={card.text}
                  />
                ) : card.icon === "user" ? (
                  <>
                    <UserCardIcon />
                    <p className="mt-3 text-xs font-semibold text-info">{card.subtitle}</p>
                  </>
                ) : (
                  <>
                    <BotCardIcon />
                    <p className="mt-3 text-xs font-semibold text-warning">{card.subtitle}</p>
                  </>
                )}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-4 grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
          <article className="rounded-[20px] border border-success bg-white p-4 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-success">Perguntas por Tema</h2>
              <span className="h-3 w-3 rounded-full border border-success/30 bg-success-soft" />
            </div>

            <div className="rounded-[16px] bg-white px-3 pb-5 pt-2">
              <div className="flex h-[170px] items-end gap-2 border-b border-l border-border px-3 pb-3">
                {chartData.map((group, index) => (
                  <div key={index} className="flex flex-1 items-end gap-1">
                    <div className="w-full rounded-t-sm bg-success" style={{ height: `${group[0]}%` }} />
                    <div className="w-full rounded-t-sm bg-warning" style={{ height: `${group[1]}%` }} />
                    <div className="w-full rounded-t-sm bg-info" style={{ height: `${group[2]}%` }} />
                    <div className="w-full rounded-t-sm bg-danger" style={{ height: `${group[3]}%` }} />
                  </div>
                ))}
              </div>

              <div className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[10px] font-medium text-text-muted">
                <span className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-info" />
                  Legislacao de Transito
                </span>
                <span className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-success" />
                  Meio Ambiente
                </span>
                <span className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-warning" />
                  Sinalizacao de Transito
                </span>
                <span className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-danger" />
                  Direcao Defensiva e Primeiros Socorros
                </span>
              </div>
            </div>
          </article>

          <article className="rounded-[20px] border border-warning bg-white p-4 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-warning">Acertos por Tema</h2>
              <span className="h-3 w-3 rounded-full border border-warning/30 bg-warning-soft" />
            </div>

            <div className="space-y-4 pt-1">
              {topics.map((topic) => (
                <div key={topic.name} className="grid grid-cols-[1fr_auto] items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className={`grid h-5 w-5 place-items-center rounded-full text-[9px] font-bold ${topic.dot}`}>
                      •
                    </span>
                    <span className="text-sm font-medium text-gray-700">{topic.name}</span>
                  </div>

                  <div className="flex items-center gap-3 w-full">
                    <div className="h-1.5 w-full max-w-40 rounded-full bg-surface-muted">
                      <div
                        className={`h-1.5 rounded-full ${topic.color}`}
                        style={{ width: `${topic.value}%` }}
                      />
                    </div>
                    <span className="w-8 text-right text-xs font-semibold text-text-muted">
                      {topic.value}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </article>
        </div>

        <article className="mt-5 flex flex-col gap-4 rounded-[20px] border border-primary bg-white px-4 py-3 shadow-sm lg:flex-row lg:items-center lg:justify-between">
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
      </section>
    </>
  );
}
