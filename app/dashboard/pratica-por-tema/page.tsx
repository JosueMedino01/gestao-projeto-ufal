import { BellIcon } from "lucide-react";
import { SidebarToggleButton } from "../../_components/sidebar-toggle-button";

type ThemeCard = {
  title: string;
  questions: number;
  progress: number;
  accent: string;
  illustration: "legislation" | "sign" | "shield" | "medical" | "environment" | "mechanic";
};

const themeCards: ThemeCard[] = [
  {
    title: "Legislacao",
    questions: 120,
    progress: 70,
    accent: "#d9b021",
    illustration: "legislation",
  },
  {
    title: "Sinalizacao de Transito",
    questions: 120,
    progress: 70,
    accent: "#a93445",
    illustration: "sign",
  },
  {
    title: "Direcao Defensiva",
    questions: 120,
    progress: 70,
    accent: "#38b935",
    illustration: "shield",
  },
  {
    title: "Primeiros Socorros",
    questions: 120,
    progress: 70,
    accent: "#7f1fff",
    illustration: "medical",
  },
  {
    title: "Meio Ambiente",
    questions: 120,
    progress: 70,
    accent: "#213f9f",
    illustration: "environment",
  },
  {
    title: "Nocoes de Mecanica",
    questions: 120,
    progress: 70,
    accent: "#6e6e70",
    illustration: "mechanic",
  },
];

function BotIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="5" y="7" width="14" height="10" rx="3" />
      <path d="M12 4v3" />
      <path d="M9 12h.01" />
      <path d="M15 12h.01" />
      <path d="M8.5 17v2l2-2" />
      <path d="M15.5 17v2l-2-2" />
    </svg>
  );
}

function ThemeIllustration({ type }: { type: ThemeCard["illustration"] }) {
  switch (type) {
    case "legislation":
      return (
        <svg viewBox="0 0 220 120" className="h-full w-full">
          <rect x="0" y="0" width="220" height="120" rx="18" fill="#4b87c6" />
          <rect x="111" y="24" width="33" height="42" rx="4" fill="#6aa1d8" />
          <rect x="116" y="30" width="18" height="3" rx="1.5" fill="#ffd54a" />
          <rect x="116" y="37" width="22" height="3" rx="1.5" fill="#ffd54a" />
          <rect x="116" y="44" width="18" height="3" rx="1.5" fill="#ffffff" />
          <rect x="116" y="51" width="22" height="3" rx="1.5" fill="#ffd54a" />
          <circle cx="92" cy="54" r="9" fill="#0f223d" />
          <path d="M87 95h28l-6-28H92Z" fill="#ffcc34" />
          <path d="M97 60h15l7 12H99Z" fill="#0f223d" />
          <path d="M85 68h10l5 7H88Z" fill="#0f223d" />
          <path d="M106 72h20v6h-20Z" fill="#0f223d" />
        </svg>
      );
    case "sign":
      return (
        <svg viewBox="0 0 220 120" className="h-full w-full">
          <rect x="0" y="0" width="220" height="120" rx="18" fill="#4b87c6" />
          <rect x="106" y="28" width="8" height="55" rx="4" fill="#8e2738" />
          <circle cx="110" cy="24" r="20" fill="#c34d5d" opacity="0.35" />
          <circle cx="110" cy="24" r="14" fill="#a93445" />
          <path d="M63 97c9-11 15-18 18-22l10 22Z" fill="#914c62" />
          <path d="M77 97c7-8 10-14 12-18l8 18Z" fill="#693d53" />
          <path d="M144 97h22l-8-30Z" fill="#35284f" />
          <circle cx="157" cy="54" r="4" fill="#ffcab6" />
          <rect x="154" y="58" width="7" height="18" rx="3.5" fill="#f0f4ff" />
          <path d="M157 66 146 77" stroke="#f0f4ff" strokeWidth="4" strokeLinecap="round" />
          <path d="M160 66 170 74" stroke="#ff5f6d" strokeWidth="4" strokeLinecap="round" />
        </svg>
      );
    case "shield":
      return (
        <svg viewBox="0 0 220 120" className="h-full w-full">
          <rect x="0" y="0" width="220" height="120" rx="18" fill="#4b87c6" />
          <path d="M111 20c12 4 23 8 32 11v22c0 27-21 42-32 47-11-5-32-20-32-47V31c9-3 20-7 32-11Z" fill="#41b637" stroke="#2a7f22" strokeWidth="3" />
          <path d="m97 54 10 10 19-24" stroke="#fff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="103" y="93" width="16" height="8" rx="4" fill="#8ed8ff" />
        </svg>
      );
    case "medical":
      return (
        <svg viewBox="0 0 220 120" className="h-full w-full">
          <rect x="0" y="0" width="220" height="120" rx="18" fill="#4b87c6" />
          <circle cx="86" cy="42" r="8" fill="#ffcfbe" />
          <circle cx="126" cy="44" r="8" fill="#ffcfbe" />
          <rect x="77" y="50" width="18" height="36" rx="7" fill="#ffffff" />
          <rect x="117" y="52" width="18" height="34" rx="7" fill="#ffffff" />
          <rect x="81" y="33" width="10" height="6" rx="3" fill="#1f3658" />
          <path d="M73 92h27" stroke="#1f3658" strokeWidth="4" strokeLinecap="round" />
          <path d="M113 92h27" stroke="#1f3658" strokeWidth="4" strokeLinecap="round" />
          <path d="M87 57v16" stroke="#d9b021" strokeWidth="4" strokeLinecap="round" />
          <path d="M79 65h16" stroke="#d9b021" strokeWidth="4" strokeLinecap="round" />
        </svg>
      );
    case "environment":
      return (
        <svg viewBox="0 0 220 120" className="h-full w-full">
          <rect x="0" y="0" width="220" height="120" rx="18" fill="#4b87c6" />
          <path d="M72 86c0-16 13-29 29-29 6 0 11 2 16 5 5-9 14-15 25-15 16 0 29 13 29 29 0 2 0 4-.5 6H72Z" fill="#1f3e9b" />
          <path d="M76 86c3-14 18-24 35-24 16 0 31 10 34 24Z" fill="#2e5dcc" />
          <path d="M108 84c-10-12-15-26-15-40 11 3 20 13 23 25" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
          <path d="M119 83c6-19 18-33 35-42-2 17-12 32-28 41" stroke="#ff7fa6" strokeWidth="4" strokeLinecap="round" />
          <path d="M96 51c-10 2-18 10-21 20 12-1 21-8 25-17" stroke="#ffd54a" strokeWidth="4" strokeLinecap="round" />
        </svg>
      );
    case "mechanic":
      return (
        <svg viewBox="0 0 220 120" className="h-full w-full">
          <rect x="0" y="0" width="220" height="120" rx="18" fill="#4b87c6" />
          <rect x="88" y="24" width="52" height="30" rx="8" fill="#e8edf7" />
          <rect x="82" y="44" width="64" height="18" rx="8" fill="#ffffff" />
          <circle cx="96" cy="64" r="8" fill="#3f4b5f" />
          <circle cx="132" cy="64" r="8" fill="#3f4b5f" />
          <path d="M73 97V34" stroke="#e6f0ff" strokeWidth="3" />
          <path d="M150 97V34" stroke="#e6f0ff" strokeWidth="3" />
          <circle cx="152" cy="73" r="6" fill="#ffcfbe" />
          <rect x="148" y="79" width="9" height="18" rx="4.5" fill="#f1cb3c" />
          <path d="M151 83 138 72" stroke="#0f223d" strokeWidth="4" strokeLinecap="round" />
        </svg>
      );
  }
}

function ThemeCardItem({ card }: { card: ThemeCard }) {
  return (
    <article className="overflow-hidden rounded-[20px] border border-[#252525] bg-white shadow-[0_12px_24px_rgba(19,32,58,0.08)]">
      <div className="h-44 bg-[#4b87c6]">
        <ThemeIllustration type={card.illustration} />
      </div>
      <div className="space-y-4 px-5 py-4">
        <div className="text-center">
          <h2 className="text-[1.35rem] font-extrabold text-[#1d1d1d]">{card.title}</h2>
        </div>

        <div className="space-y-1">
          <div className="h-1.5 rounded-full bg-[#e6e8ec]">
            <div
              className="h-full rounded-full"
              style={{ width: `${card.progress}%`, backgroundColor: card.accent }}
            />
          </div>
          <div className="flex items-center justify-between text-[10px] text-[#6d7481]">
            <span>{card.questions} Questoes</span>
            <span>{card.progress}%</span>
          </div>
          <div className="text-right text-[10px] text-[#6d7481]">Bom desempenho</div>
        </div>

        <button
          className="w-full rounded-full px-4 py-2 text-sm font-bold text-white shadow-[0_10px_18px_rgba(19,32,58,0.14)]"
          style={{ backgroundColor: card.accent }}
        >
          Praticar agora
        </button>
      </div>
    </article>
  );
}

export default function PraticaPorTemaPage() {
  return (
    <section className="flex min-h-screen flex-1 flex-col bg-[#f7f8fc] px-4 py-5 sm:px-6 lg:px-8 lg:py-7">
      <header className="flex flex-col gap-4 pb-6 xl:flex-row xl:items-start xl:justify-between">
        <div className="flex items-start gap-3">
          <SidebarToggleButton />
          <div>
<h1 className="text-3xl font-extrabold tracking-tight text-blue-deep sm:text-[48px]">
              Praticar por Tema
            </h1>
            <p className="mt-1 text-sm text-[#5f6d84]">
              Escolha um tema para aprofundar!
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

      <div className="grid gap-9 md:grid-cols-2 2xl:grid-cols-3">
        {themeCards.map((card) => (
          <ThemeCardItem key={card.title} card={card} />
        ))}
      </div>

      <article className="mt-8 flex flex-col gap-4 rounded-[20px] border-2 border-[#4f8ed5] bg-white px-4 py-4 shadow-[0_12px_24px_rgba(19,32,58,0.08)] md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#cfe0f6] bg-[#eff5fd] text-primary">
            <BotIcon className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xl font-extrabold text-blue-deep">Dica do Tutor Inteligente</p>
            <p className="mt-1 text-sm text-[#647389]">
              Comece pelos temas que voce tem mais dificuldade. A pratica constante e o caminho para aprovacao!
            </p>
          </div>
        </div>

        <button className="rounded-full bg-primary px-6 py-3 text-sm font-bold text-white shadow-[0_12px_20px_rgba(42,103,215,0.25)]">
          Iniciar Conversa
        </button>
      </article>
    </section>
  );
}
