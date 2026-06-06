import { SidebarToggleButton } from "../_components/sidebar-toggle-button";

type Choice = {
  letter: string;
  text: string;
  selected?: boolean;
};

type QuestionChip = {
  number: number;
  status: "answered" | "unanswered" | "current" | "marked";
};

const choices: Choice[] = [
  { letter: "A", text: "De a preferencia." },
  { letter: "B", text: "Parada obrigatoria.", selected: true },
  { letter: "C", text: "Proibido estacionar." },
  { letter: "D", text: "Sentido proibido." },
  { letter: "E", text: "Velocidade maxima permitida." },
];

const questionMap: QuestionChip[] = Array.from({ length: 30 }, (_, index) => {
  const number = index + 1;

  if ([1, 2, 4, 5, 6, 8].includes(number)) {
    return { number, status: "answered" };
  }

  if (number === 7) {
    return { number, status: "current" };
  }

  if (number === 3 || number === 10) {
    return { number, status: "marked" };
  }

  return { number, status: "unanswered" };
});

function ArrowLeftIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m15 18-6-6 6-6" />
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

function ExpandIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M15 4h5v5" />
      <path d="m14 10 6-6" />
      <path d="M9 20H4v-5" />
      <path d="m10 14-6 6" />
    </svg>
  );
}

function PauseIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <rect x="6" y="5" width="4" height="14" rx="1" />
      <rect x="14" y="5" width="4" height="14" rx="1" />
    </svg>
  );
}

function ClockIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

function StopSign() {
  return (
    <div className="relative mx-auto mt-6 h-52 w-52">
      <div
        className="absolute inset-0 border-[4px] border-white bg-[#ff1e14] shadow-[0_12px_30px_rgba(255,30,20,0.22)]"
        style={{
          clipPath:
            "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
        }}
      />
      <div
        className="absolute inset-[8px] border-[4px] border-white"
        style={{
          clipPath:
            "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center text-[3.3rem] font-black tracking-[0.12em] text-white">
        PARE
      </div>
    </div>
  );
}

function ChoiceCard({ choice }: { choice: Choice }) {
  return (
    <button
      className={`flex w-full items-center gap-4 rounded-[20px] border px-4 py-4 text-left transition-colors ${
        choice.selected
          ? "border-[#cfe0f6] bg-[#dfeaf8]"
          : "border-border bg-white hover:bg-slate-50"
      }`}
    >
      <span
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-sm font-extrabold ${
          choice.selected
            ? "border-[#c4d8f0] bg-white text-primary"
            : "border-border bg-slate-50 text-foreground"
        }`}
      >
        {choice.letter}
      </span>
      <span className={`text-base ${choice.selected ? "font-semibold text-primary" : "text-foreground"}`}>
        {choice.text}
      </span>
    </button>
  );
}

function QuestionStatus({ item }: { item: QuestionChip }) {
  const styles = {
    answered: "bg-[#daf0d6] text-[#436345]",
    unanswered: "bg-[#efefef] text-[#4e4e4e]",
    current: "bg-[#243f9f] text-white",
    marked: "bg-[#ffe49c] text-[#775c06]",
  }[item.status];

  return (
    <button className={`flex h-8 w-8 items-center justify-center rounded-md text-xs font-bold ${styles}`}>
      {item.number}
    </button>
  );
}

export default function SimuladosPage() {
  return (
    <section className="flex min-h-screen flex-1 flex-col bg-[#f7f8fc] px-4 py-5 sm:px-6 lg:px-8 lg:py-7">
      <header className="flex flex-col gap-4 border-b border-[#e9edf5] pb-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex flex-wrap items-center gap-3">
          <SidebarToggleButton />
          <h1 className="text-2xl font-extrabold tracking-tight text-blue-deep sm:text-4xl">
            Simulado: Prova Teorica CNH
          </h1>
          <span className="rounded-full bg-[#eef2f7] px-4 py-2 text-xs font-semibold text-[#49586a]">
            Simulado Oficial do DETRAN
          </span>
          <button className="rounded-full border border-border bg-white px-4 py-2 text-xs font-semibold text-[#9c624e] shadow-sm">
            Abandonar simulado
          </button>
        </div>

        <div className="flex items-center gap-3 self-start xl:self-auto">
          <button className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white text-text-muted shadow-sm">
            <BellIcon />
          </button>
          <div className="flex items-center gap-3 rounded-full bg-white px-3 py-2 shadow-[0_10px_24px_rgba(19,32,58,0.08)]">
            <div className="text-right">
              <p className="text-sm font-semibold text-foreground">Josue Medino</p>
              <p className="text-xs text-text-muted">Nivel Basico</p>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-linear-to-br from-slate-800 to-slate-500 text-sm font-black text-white">
              JM
            </div>
          </div>
        </div>
      </header>

      <div className="mt-5">
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm text-[#5f6d84]">Questao 8 de 30</p>
        </div>
        <div className="mt-2 h-3 overflow-hidden rounded-full bg-white shadow-[inset_0_1px_2px_rgba(19,32,58,0.06)]">
          <div className="h-full w-[26.666%] rounded-full bg-linear-to-r from-[#2780c7] to-primary" />
        </div>
      </div>

      <div className="mt-5 grid flex-1 gap-5 2xl:grid-cols-[minmax(0,1fr)_260px]">
        <article className="flex h-full flex-col rounded-[24px] border border-border bg-white p-4 shadow-[0_12px_24px_rgba(19,32,58,0.08)] sm:p-5">
          <div className="flex flex-col gap-4 border-b border-[#edf1f6] pb-4 md:flex-row md:items-center md:justify-between">
            <span className="w-fit rounded-md bg-[#b9d1eb] px-3 py-2 text-xs font-semibold text-[#294663]">
              Legislacao de Transito
            </span>
            <button className="flex items-center gap-2 self-start rounded-full border border-border bg-white px-4 py-2 text-xs font-semibold text-[#5f6d84] shadow-sm">
              <BellIcon className="h-4 w-4" />
              Ouvir questao
            </button>
          </div>

          <div className="grid flex-1 gap-8 pt-5 xl:grid-cols-[0.9fr_1fr]">
            <div>
              <p className="text-xl text-foreground">Esta placa de regulamentacao indica:</p>
              <StopSign />
              <button className="mx-auto mt-6 flex items-center gap-2 rounded-full border border-border bg-white px-3 py-2 text-xs font-medium text-text-muted shadow-sm">
                <ExpandIcon />
                Ampliar imagem
              </button>
            </div>

            <div className="space-y-3">
              {choices.map((choice) => (
                <ChoiceCard key={choice.letter} choice={choice} />
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 border-t border-[#edf1f6] pt-4 md:flex-row md:items-center md:justify-between">
            <button className="flex items-center gap-2 rounded-xl border border-border bg-white px-4 py-3 text-sm font-semibold text-[#74829a] shadow-sm">
              <ArrowLeftIcon className="h-4 w-4" />
              Anterior
            </button>
            <label className="flex items-center gap-3 text-sm text-[#5f6d84]">
              <input type="checkbox" className="h-4 w-4 rounded border-border text-primary" />
              Marcar para revisar depois
            </label>
            <button className="flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_18px_rgba(42,103,215,0.28)] transition-all duration-300 hover:scale-105 hover:bg-blue-700 hover:shadow-xl cursor-pointer">
              Proxima questao
            </button>
          </div>
        </article>

        <aside className="flex h-full flex-col gap-4">
          <article className="rounded-[20px] border border-border bg-white p-4 shadow-[0_12px_24px_rgba(19,32,58,0.08)]">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-text-muted">
              Tempo restante
            </p>
            <div className="mt-3 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-primary">
                <ClockIcon />
                <span className="text-4xl font-extrabold leading-none">29:32</span>
              </div>
              <button className="flex items-center gap-2 rounded-xl border border-border bg-white px-3 py-2 text-xs font-semibold text-[#5f6d84] shadow-sm">
                <PauseIcon />
                Pausar
              </button>
            </div>
          </article>

          <article className="flex flex-1 flex-col rounded-[20px] border border-border bg-white p-4 shadow-[0_12px_24px_rgba(19,32,58,0.08)]">
            <h2 className="text-sm font-bold text-foreground">Navegacao</h2>
            <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-[#52627a]">
              <span className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-[#6bc26b]" />
                Respondida
              </span>
              <span className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-[#243f9f]" />
                Atual
              </span>
              <span className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-[#efefef]" />
                Nao respondido
              </span>
              <span className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-[#ffe49c]" />
                Marcado
              </span>
            </div>

            <div className="mt-4 grid flex-1 content-start grid-cols-5 gap-2">
              {questionMap.map((item) => (
                <QuestionStatus key={item.number} item={item} />
              ))}
            </div>
          </article>

          <article className="rounded-[20px] border border-[#f0db95] bg-linear-to-br from-[#fff2af] to-[#ffe38c] p-4 shadow-[0_12px_24px_rgba(19,32,58,0.08)]">
            <p className="text-sm font-bold text-[#785b04]">Lembre-se!</p>
            <p className="mt-2 text-sm leading-6 text-[#70570e]">
              Voce pode revisar as questoes marcadas antes de finalizar o simulado.
            </p>
          </article>
        </aside>
      </div>
    </section>
  );
}
