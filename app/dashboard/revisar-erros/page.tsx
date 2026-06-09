import { SidebarToggleButton } from "../../_components/sidebar-toggle-button";

type ReviewMetric = {
  value: string;
  label: string;
  accent: string;
  icon: "error" | "tag" | "time" | "progress";
};

type MissedQuestion = {
  topic: string;
  question: string;
  date: string;
  color: string;
  icon: "diamond" | "wheel" | "cross" | "leaf" | "scale";
};

const reviewMetrics: ReviewMetric[] = [
  { value: "24", label: "Erros para revisar", accent: "#dc6b56", icon: "error" },
  { value: "5", label: "Temas para revisar", accent: "#df9349", icon: "tag" },
  { value: "1h 40min", label: "Tempo Estimado", accent: "#5bcfd1", icon: "time" },
  { value: "42%", label: "Progresso da Revisao", accent: "#59c66f", icon: "progress" },
];

const missedQuestions: MissedQuestion[] = [
  { topic: "Sinalizacao de Transito", question: "Questao 12", date: "Errada em 24/04/2026", color: "#f2c230", icon: "diamond" },
  { topic: "Direcao Defensiva", question: "Questao 12", date: "Errada em 24/04/2026", color: "#dd6d6a", icon: "wheel" },
  { topic: "Primeiros Socorros", question: "Questao 12", date: "Errada em 24/04/2026", color: "#df3d3d", icon: "cross" },
  { topic: "Meio Ambiente", question: "Questao 12", date: "Errada em 24/04/2026", color: "#8ec959", icon: "leaf" },
  { topic: "Legislacao de Transito", question: "Questao 12", date: "Errada em 24/04/2026", color: "#54687e", icon: "scale" },
];

const alternatives = [
  { letter: "A", text: "Gravissima." },
  { letter: "B", text: "Grave." },
  { letter: "C", text: "Media.", correct: true },
  { letter: "D", text: "Leve.", wrong: true },
];

function ArrowLeftIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function ArrowRightIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="m9 6 6 6-6 6" />
    </svg>
  );
}

function BellIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M6.5 9a5.5 5.5 0 0 1 11 0c0 5.5 2 6.5 2 6.5h-15S6.5 14.5 6.5 9" />
      <path d="M10 19a2 2 0 0 0 4 0" />
    </svg>
  );
}

function FilterIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M4 5h16" />
      <path d="M7 12h10" />
      <path d="M10 19h4" />
    </svg>
  );
}

function CheckIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m5 12 4.5 4.5L19 7" />
    </svg>
  );
}

function BookmarkIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M7 4.5h10a1 1 0 0 1 1 1V20l-6-4-6 4V5.5a1 1 0 0 1 1-1Z" />
    </svg>
  );
}

function TutorIcon() {
  return (
    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#bad0f7] bg-[#edf4ff] text-primary">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <rect x="5" y="7" width="14" height="10" rx="3" />
        <path d="M12 4v3" />
        <path d="M9 12h.01" />
        <path d="M15 12h.01" />
        <path d="M8.5 17v2l2-2" />
        <path d="M15.5 17v2l-2-2" />
      </svg>
    </div>
  );
}

function MetricIcon({ icon, accent }: { icon: ReviewMetric["icon"]; accent: string }) {
  if (icon === "error") {
    return (
      <div className="flex h-11 w-11 items-center justify-center rounded-full text-white" style={{ backgroundColor: accent }}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
          <path d="m7 7 10 10" />
          <path d="m17 7-10 10" />
        </svg>
      </div>
    );
  }

  if (icon === "tag") {
    return (
      <div className="flex h-11 w-11 items-center justify-center rounded-full text-white" style={{ backgroundColor: accent }}>
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
          <path d="M3.5 11.5V5.8a2.3 2.3 0 0 1 2.3-2.3h5.7a2.3 2.3 0 0 1 1.63.67l7.7 7.7a2.3 2.3 0 0 1 0 3.25l-5.73 5.73a2.3 2.3 0 0 1-3.25 0l-7.7-7.7a2.3 2.3 0 0 1-.67-1.63Z" />
        </svg>
      </div>
    );
  }

  if (icon === "time") {
    return (
      <div className="flex h-11 w-11 items-center justify-center rounded-full text-white" style={{ backgroundColor: accent }}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
          <circle cx="12" cy="12" r="8" />
          <path d="M12 8v4l3 2" />
        </svg>
      </div>
    );
  }

  return (
    <div className="flex h-11 w-11 items-center justify-center rounded-full text-white" style={{ backgroundColor: accent }}>
      <CheckIcon />
    </div>
  );
}

function TopicIcon({ icon, color }: { icon: MissedQuestion["icon"]; color: string }) {
  if (icon === "diamond") {
    return (
      <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 bg-white" style={{ borderColor: color, color }}>
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7">
          <path d="m12 2 8 8-8 12L4 10Z" />
          <path d="M12 5 7 10h10Z" fill="#111827" />
        </svg>
      </div>
    );
  }

  if (icon === "wheel") {
    return (
      <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 bg-white" style={{ borderColor: color, color }}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-7 w-7">
          <circle cx="12" cy="12" r="8" />
          <circle cx="12" cy="12" r="2.4" />
          <path d="M12 4v5" />
          <path d="m7 7 3.5 3.5" />
          <path d="M4 12h5" />
          <path d="m7 17 3.5-3.5" />
        </svg>
      </div>
    );
  }

  if (icon === "cross") {
    return (
      <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 bg-white" style={{ borderColor: color, color }}>
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7">
          <path d="M10 4h4v6h6v4h-6v6h-4v-6H4v-4h6Z" />
        </svg>
      </div>
    );
  }

  if (icon === "leaf") {
    return (
      <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 bg-white" style={{ borderColor: color, color }}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-7 w-7">
          <path d="M20 4c-8 1-13 6-14 14 6 1 13-3 14-14Z" />
          <path d="M7 17c4-3 7-7 9-11" />
        </svg>
      </div>
    );
  }

  return (
    <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 bg-white" style={{ borderColor: color, color }}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-7 w-7">
        <path d="M7 5h10" />
        <path d="M8 5v10a4 4 0 0 0 8 0V5" />
        <path d="M12 9v6" />
        <path d="M9.5 11.5h5" />
      </svg>
    </div>
  );
}

function MissedQuestionCard({ item, active = false }: { item: MissedQuestion; active?: boolean }) {
  return (
    <button
      className={`flex w-full items-center gap-3 rounded-[16px] border px-3 py-2 text-left transition-colors ${
        active ? "border-[#d8e2f3] bg-[#f8fbff]" : "border-[#e9edf5] bg-white hover:bg-slate-50"
      }`}
    >
      <TopicIcon icon={item.icon} color={item.color} />
      <div className="min-w-0">
        <p className="truncate text-base font-extrabold text-[#232737]">{item.topic}</p>
        <p className="text-sm font-semibold text-[#2f436e]">{item.question}</p>
        <p className="text-xs text-[#718099]">{item.date}</p>
      </div>
    </button>
  );
}

export default function RevisarErrosPage() {
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
              Reforce seu aprendizado revisando as questoes que voce errou.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 self-start xl:self-auto">
          <button className="flex items-center gap-2 rounded-xl border border-border bg-white px-4 py-3 text-sm font-semibold text-[#4f5b71] shadow-sm">
            <FilterIcon />
            Filtrar por tema
          </button>
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

      <div className="grid gap-0 rounded-[22px] border border-[#cfd9ea] bg-white shadow-[0_12px_24px_rgba(19,32,58,0.08)] xl:grid-cols-4">
        {reviewMetrics.map((metric, index) => (
          <div
            key={metric.label}
            className={`flex min-h-[112px] items-center gap-4 px-5 py-5 ${index !== reviewMetrics.length - 1 ? "border-b border-[#e8edf6] xl:border-b-0 xl:border-r" : ""}`}
          >
            <MetricIcon icon={metric.icon} accent={metric.accent} />
            <div className="min-w-0">
              <p className="text-[2rem] font-extrabold leading-tight text-[#191e2c]">
                {metric.value}
              </p>
              <p className="text-sm font-semibold leading-5 text-[#2c3448]">
                {metric.label}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 grid gap-0 overflow-hidden rounded-[22px] border border-[#cfd9ea] bg-white shadow-[0_12px_24px_rgba(19,32,58,0.08)] 2xl:grid-cols-[320px_minmax(0,1fr)]">
        <aside className="border-b border-[#e8edf6] p-4 2xl:border-b-0 2xl:border-r">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-lg font-extrabold text-[#202637]">Suas questoes erradas (24)</h2>
            <button className="rounded-full border border-[#d7dce5] bg-[#f8f9fb] px-3 py-1 text-xs font-semibold text-[#556074] transition-all duration-200 hover:bg-[#eef2f8] hover:border-[#b8c2d3] hover:shadow-sm hover:scale-105 cursor-pointer">
              Mais Recentes ▼
            </button>
          </div>

          <div className="space-y-3">
            {missedQuestions.map((item, index) => (
              <MissedQuestionCard key={item.topic} item={item} active={index === 0} />
            ))}
          </div>

          <button className="mx-auto mt-5 flex items-center gap-2 rounded-full border border-[#d8deea] bg-white px-4 py-2 text-sm font-semibold text-[#515d72] shadow-sm transition-all duration-200 hover:bg-[#f8fbff] hover:border-[#9fb8e6] hover:text-[#2f5fbf] hover:shadow-md hover:scale-105 cursor-pointer">
            Carregar mais
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#eef2f8] text-xs">+</span>
          </button>
        </aside>

        <article className="p-4 sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="rounded-md bg-[#d7ecff] px-3 py-1 text-xs font-bold text-[#3173a7]">
                Questao 12 de 24
              </span>
              <p className="mt-2 text-sm font-bold text-[#28608b]">Legislacao de Transito</p>
            </div>
            <span className="rounded-full bg-[#ff7d7d] px-3 py-1 text-xs font-bold text-white">
              Errada
            </span>
          </div>

          <div className="mt-4">
            <p className="text-xl font-bold leading-8 text-[#1f2435]">
              O condutor que dirige ameacando os pedestres que estejam atravessando a via publica com o veiculo cometera infracao:
            </p>
          </div>

          <div className="mt-5 space-y-3">
            {alternatives.map((option) => (
              <div
                key={option.letter}
                className={`flex items-center gap-3 rounded-[16px] border px-4 py-3 ${
                  option.correct
                    ? "border-[#d5ecd6] bg-[#eff9ef]"
                    : option.wrong
                      ? "border-[#f0dede] bg-[#f8ebeb]"
                      : "border-[#e8edf5] bg-white"
                }`}
              >
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-full border text-sm font-extrabold ${
                    option.correct
                      ? "border-[#95ce97] bg-white text-[#3f8f46]"
                      : option.wrong
                        ? "border-[#da9b9b] bg-white text-[#8a4c4c]"
                        : "border-[#d4dae5] bg-[#f8fafc] text-[#1d2436]"
                  }`}
                >
                  {option.letter}
                </span>
                <span className="text-base font-semibold text-[#202637]">{option.text}</span>
              </div>
            ))}
          </div>

          <div className="mt-5 grid gap-4 xl:grid-cols-2">
            <div className="rounded-[16px] border border-[#d3ead5] bg-[#e9f7e9] px-3 py-3">
              <p className="text-xs font-bold uppercase tracking-[0.06em] text-[#388443]">Resposta correta</p>
              <div className="mt-2 flex items-start gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#95ce97] bg-white text-sm font-extrabold text-[#3f8f46]">
                  C
                </span>
                <div>
                  <p className="font-extrabold text-[#21592b]">Media.</p>
                  <p className="mt-1 text-sm leading-6 text-[#2f6d37]">
                    Art. 170 do CTB - Dirigir ameacando os pedestres que estejam atravessando a via publica.
                  </p>
                </div>
              </div>
            </div>

<div className="rounded-[16px] border border-[#efd8d8] bg-[#f9ecec] px-3 py-3">
              <p className="text-xs font-bold uppercase tracking-[0.06em] text-[#b44f5b]">Sua resposta</p>
              <div className="mt-2 flex items-start gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#da9b9b] bg-white text-sm font-extrabold text-[#8a4c4c]">
                  D
                </span>
                <div>
                  <p className="font-extrabold text-[#7a3941]">Leve.</p>
                  <p className="mt-1 text-sm leading-6 text-[#92545e]">
                    Revise o conteudo sobre infracoes de transito e suas classificacoes.
                  </p>
                </div>
              </div>
            </div>
          </div>

<div className="mt-4 flex items-start gap-3 rounded-[18px] border border-[#cad6f6] bg-[#eef3ff] px-3 py-3">
  <TutorIcon />

  <div className="min-w-0 flex-1">
    <p className="text-sm font-extrabold text-[#3457b9]">
      Explicacao do Tutor Inteligente
    </p>

    <p className="mt-1 text-sm leading-5 text-[#34405a]">
      Essa infracao e classificada como media porque coloca em risco a
      seguranca dos pedestres, mas nao chega a causar dano direto.
      Lembre-se: atitudes que ameacam a seguranca no transito sempre sao
      infracoes!
    </p>
  </div>

  <button
    type="button"
    className="shrink-0 self-start rounded-lg border border-[#b6c7f0] bg-white px-3 py-1.5 text-sm font-semibold text-[#4964bb] transition-all duration-200 hover:bg-[#4964bb] hover:text-white hover:border-[#4964bb] hover:shadow-md cursor-pointer"
  >
    Entendi!
  </button>
</div>

          <div className="mt-5 flex flex-col gap-3 border-t border-[#e8edf6] pt-4 md:flex-row md:items-center md:justify-between">
            <button className="flex items-center gap-2 rounded-xl border border-border bg-white px-4 py-3 text-sm font-semibold text-[#4d7ae2] shadow-sm transition-all duration-200 hover:bg-[#eef4ff] hover:border-[#4d7ae2] hover:shadow-md hover:-translate-y-0.5 cursor-pointer">
              <ArrowLeftIcon className="h-4 w-4" />
              Anterior
            </button>
            <label className="flex items-center gap-3 text-sm font-semibold text-[#2b3347] transition-all duration-200 hover:text-[#4d7ae2] hover:scale-105 cursor-pointer">
              <BookmarkIcon className="h-5 w-5 transition-colors duration-200 group-hover:text-[#4d7ae2]" />
              Marcar para revisar depois
            </label>
            <button className="flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_18px_rgba(42,103,215,0.28)] transition-all duration-300 hover:scale-105 hover:bg-blue-700 hover:shadow-xl cursor-pointer">
              Proxima questao
            </button>
          </div>
        </article>
      </div>
    </section>
  );
}
