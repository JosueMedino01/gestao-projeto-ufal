export type SummaryStatCardData = {
  title: string;
  accent: string;
  value: string;
  subtitle: string;
  details?: string[];
  icon: "gauge" | "sheet" | "pie" | "bot";
  tooltipMessage?: string;
};

function CardVisual({
  type,
  color,
  percentValue = "0%",
  subtitleText = "",
}: {
  type: SummaryStatCardData["icon"];
  color?: string;
  percentValue?: string;
  subtitleText?: string;
}) {
  const numericPercent = parseInt(percentValue, 10) || 0;

  switch (type) {
    case "gauge":
    case "pie":
      return (
        <div className="relative flex h-24 w-24 items-center justify-center">
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
            <span className="mt-0.5 text-[7px] font-bold leading-none text-gray-400 uppercase">
              {subtitleText === "Pontos Fracos" ? (
                <>
                  Pontos
                  <br />
                  Fracos
                </>
              ) : (
                subtitleText
              )}
            </span>
          </div>
        </div>
      );
    case "sheet":
      return (
        <div
          className="flex h-20 w-20 items-center justify-center rounded-full text-white shadow-xs"
          style={{ backgroundColor: color ?? "#0b57a4" }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-10 w-10"
          >
            <rect x="5" y="3" width="14" height="18" rx="2" />
            <circle cx="12" cy="10" r="3" />
            <path d="M7 21v-2a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v2" />
          </svg>
        </div>
      );
    case "bot":
      return (
        <div
          className="flex h-20 w-20 items-center justify-center rounded-full text-white shadow-xs"
          style={{ backgroundColor: color ?? "#eab308" }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-10 w-10"
          >
            <rect x="5" y="8" width="14" height="11" rx="3" />
            <path d="M9 13h.01M15 13h.01M12 5v3M10 5h4" />
          </svg>
        </div>
      );
  }
}

export function SummaryStatCard({ card }: { card: SummaryStatCardData }) {
  const isCircleType = card.icon === "gauge" || card.icon === "pie";
  const primaryDetail = card.details?.[0] ?? "";
  const hasDetails = primaryDetail !== "";

  return (
    <article className="overflow-hidden rounded-[24px] border border-gray-200 bg-white shadow-[0_8px_20px_rgba(0,0,0,0.03)] transition-transform hover:scale-[1.01]">
      <div className="flex items-center justify-between border-b border-gray-50 px-5 pb-2 pt-4">
        <h2 className="text-base font-black" style={{ color: card.accent }}>
          {card.title}
        </h2>
        <span
          className="flex h-5 w-5 items-center justify-center rounded-full border border-gray-300 text-[10px] font-bold text-gray-400"
          title={card.tooltipMessage}
          aria-label={card.tooltipMessage}
        >
          i
        </span>
      </div>

      <div className="flex min-h-[140px] items-center gap-4 px-5 py-4">
        <div className="flex shrink-0 items-center justify-center">
          <CardVisual
            type={card.icon}
            color={card.accent}
            percentValue={card.value}
            subtitleText={card.subtitle}
          />
        </div>

        <div className="flex min-w-0 flex-1 items-center justify-between gap-2">
          <div className="min-w-0 flex-1">
            {!isCircleType && (
              <>
                <p className="text-3xl font-black leading-none text-gray-800">{card.value}</p>
                <p className="mt-1 text-xs font-bold tracking-wider text-gray-400 uppercase">
                  {card.subtitle}
                </p>
              </>
            )}
          </div>

          {hasDetails && (
            <div className="border-l border-gray-200 pl-3 text-right">
              <p className="text-sm font-black text-gray-700">{primaryDetail.split(" ")[0]}</p>
              <p className="whitespace-nowrap text-[11px] font-bold text-gray-400">
                {primaryDetail.replace(`${primaryDetail.split(" ")[0]} `, "")}
              </p>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
