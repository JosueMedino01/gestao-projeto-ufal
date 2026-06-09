import { BellIcon } from "lucide-react";
import { SidebarToggleButton } from "../../_components/sidebar-toggle-button";

type Suggestion = {
  question: string;
};

type ContinueCard = {
  title: string;
  progress: number;
  accent: string;
  illustration: "sign" | "shield";
};

const suggestions: Suggestion[] = [
  { question: "Quais sao as infracoes gravissimas?" },
  { question: "Explique a diferenca entre multa e advertencia" },
  { question: "Como funciona a pontuacao da CNH?" },
  { question: "Quais exames sao necessarios para tirar a CNH?" },
];

const continueCards: ContinueCard[] = [
  {
    title: "Sinalizacao de Transito",
    progress: 70,
    accent: "#a93445",
    illustration: "sign",
  },
  {
    title: "Direcao Defensiva",
    progress: 70,
    accent: "#38b935",
    illustration: "shield",
  },
];

function ChevronRightIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function SendIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M4 5.5 20 12 4 18.5l2.8-6.1L15 12 6.8 11.6Z" />
    </svg>
  );
}

function SettingsIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="3.2" />
      <path d="M12 3.5v2.2" />
      <path d="M12 18.3v2.2" />
      <path d="m5.98 5.98 1.55 1.55" />
      <path d="m16.47 16.47 1.55 1.55" />
      <path d="M3.5 12h2.2" />
      <path d="M18.3 12h2.2" />
      <path d="m5.98 18.02 1.55-1.55" />
      <path d="m16.47 7.53 1.55-1.55" />
    </svg>
  );
}

function BotAvatar() {
  return (
    <div className="relative flex h-9 w-9 items-center justify-center rounded-full border border-[#d9dee8] bg-white shadow-sm">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-[#20263a]">
        <rect x="5" y="7" width="14" height="10" rx="3" />
        <path d="M12 4v3" />
        <path d="M9 12h.01" />
        <path d="M15 12h.01" />
        <path d="M8.5 17v2l2-2" />
        <path d="M15.5 17v2l-2-2" />
      </svg>
      <span className="absolute -right-1 -top-1 h-3.5 w-3.5 rounded-full bg-primary ring-2 ring-white" />
    </div>
  );
}

function SignIllustration() {
  return (
    <svg viewBox="0 0 88 52" className="h-12 w-20">
      <rect x="39" y="8" width="4" height="24" rx="2" fill="#8e2738" />
      <circle cx="41" cy="10" r="9" fill="#c34d5d" opacity="0.35" />
      <circle cx="41" cy="10" r="6.5" fill="#a93445" />
      <path d="M8 47c6-7 10-12 12-15l7 15Z" fill="#914c62" />
      <path d="M18 47c4-6 6-9 8-12l5 12Z" fill="#693d53" />
      <path d="M59 47h17l-6-20Z" fill="#35284f" />
      <circle cx="69" cy="19" r="3" fill="#ffcab6" />
      <rect x="67" y="22" width="5" height="12" rx="2.5" fill="#f0f4ff" />
      <path d="M69 28 61 35" stroke="#f0f4ff" strokeWidth="3" strokeLinecap="round" />
      <path d="M71 28 79 33" stroke="#ff5f6d" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function ShieldIllustration() {
  return (
    <svg viewBox="0 0 88 52" className="h-12 w-20">
      <path d="M44 7c9 3 17 6 23 8v15c0 20-15 31-23 35C36 61 21 50 21 30V15c6-2 14-5 23-8Z" fill="#41b637" stroke="#2a7f22" strokeWidth="2.5" />
      <path d="m34 31 7 7 13-17" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="40" y="43" width="8" height="4" rx="2" fill="#8ed8ff" />
    </svg>
  );
}

function SuggestionCard({ suggestion }: { suggestion: Suggestion }) {
  return (
    <button className="flex w-full items-center justify-between gap-4 rounded-[18px] bg-white px-4 py-4 text-left shadow-[0_8px_18px_rgba(19,32,58,0.05)] transition-colors hover:bg-slate-50">
      <span className="text-sm leading-6 text-[#555f73]">{suggestion.question}</span>
      <ChevronRightIcon className="h-5 w-5 shrink-0 text-[#1f2435]" />
    </button>
  );
}

function ContinueCardItem({ item }: { item: ContinueCard }) {
  return (
    <button className="flex w-full items-center gap-4 rounded-[18px] bg-white px-4 py-4 text-left shadow-[0_8px_18px_rgba(19,32,58,0.05)] transition-colors hover:bg-slate-50">
      <div className="flex h-14 w-20 items-center justify-center rounded-xl bg-[#f7f8fc]">
        {item.illustration === "sign" ? <SignIllustration /> : <ShieldIllustration />}
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-base font-semibold text-[#262c3d]">{item.title}</p>
        <div className="mt-2 h-1.5 rounded-full bg-[#eceff4]">
          <div className="h-full rounded-full" style={{ width: `${item.progress}%`, backgroundColor: item.accent }} />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-xs font-semibold" style={{ color: item.accent }}>
          {item.progress}%
        </span>
        <ChevronRightIcon className="h-5 w-5 text-[#1f2435]" />
      </div>
    </button>
  );
}

export default function TutorInteligentePage() {
  return (
    <section className="flex min-h-screen flex-1 flex-col bg-[#f7f8fc] px-4 py-5 sm:px-6 lg:px-8 lg:py-7">
      <header className="flex flex-col gap-4 pb-6 xl:flex-row xl:items-start xl:justify-between">
        <div className="flex items-start gap-3">
          <SidebarToggleButton />
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-blue-deep sm:text-5xl">
              Tutor inteligente
            </h1>
            <p className="mt-1 text-sm text-[#5f6d84]">
              Converse e tire todas as duvidas com nosso ChatBot!
            </p>
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

      <div className="grid gap-5 2xl:grid-cols-[1.08fr_0.92fr]">
        <article className="flex min-h-[620px] flex-col rounded-[24px] bg-[#f2f2f3] p-4 shadow-[0_12px_24px_rgba(19,32,58,0.08)] sm:p-5">
          <div className="mb-4 flex items-center text-[#4f5c74]">
            <SettingsIcon />
          </div>

          <div className="flex-1 rounded-[18px] bg-white px-4 py-5">
            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <BotAvatar />
                <div className="h-10 w-[74%] rounded-[16px] bg-[#a6abbb]" />
              </div>

              <div className="flex justify-end">
                <div className="h-12 w-[58%] rounded-[16px] bg-secondary" />
              </div>

              <div className="flex items-start gap-3">
                <BotAvatar />
                <div className="h-20 w-[69%] rounded-[16px] bg-[#a6abbb]" />
              </div>

              <div className="flex justify-end">
                <div className="h-7 w-[56%] rounded-full bg-secondary" />
              </div>

              <div className="flex items-start gap-3">
                <BotAvatar />
                <div className="h-10 w-[76%] rounded-[16px] bg-[#a6abbb]" />
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-3 rounded-[16px] bg-white px-4 py-3">
            <input
              type="text"
              value="Pergunte aqui..."
              readOnly
              className="flex-1 bg-transparent text-sm text-[#adb3bf] outline-none"
            />
            <button className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f1f2f5] text-[#171b2b]">
              <SendIcon />
            </button>
          </div>
        </article>

        <aside className="space-y-5">
          <article className="rounded-[24px] bg-[#f2f2f3] p-4 shadow-[0_12px_24px_rgba(19,32,58,0.08)]">
            <h2 className="text-2xl font-extrabold text-[#1f2435]">Sugestao para Voce</h2>
            <div className="mt-4 space-y-3">
              {suggestions.map((suggestion) => (
                <SuggestionCard key={suggestion.question} suggestion={suggestion} />
              ))}
            </div>
          </article>

          <article className="rounded-[24px] bg-[#f2f2f3] p-4 shadow-[0_12px_24px_rgba(19,32,58,0.08)]">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-2xl font-extrabold text-[#1f2435]">Continue estudando</h2>
              <button className="text-sm font-bold text-primary">Ver todos</button>
            </div>
            <div className="mt-4 space-y-3">
              {continueCards.map((item) => (
                <ContinueCardItem key={item.title} item={item} />
              ))}
            </div>
          </article>
        </aside>
      </div>
    </section>
  );
}
