export type TopicProgressItem = {
  topic: string;
  progress: number;
  color: string;
  icon: string;
};

export function TopicProgressCard({
  title = "Acertos por Tema",
  titleColor = "#eab308",
  topics,
}: {
  title?: string;
  titleColor?: string;
  topics: TopicProgressItem[];
}) {
  return (
    <article className="flex-1/2 flex h-full min-h-[270px] flex-col rounded-[24px] border border-gray-200 bg-white shadow-[0_8px_20px_rgba(0,0,0,0.03)]">
      <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
        <h2 className="text-base font-black" style={{ color: titleColor }}>
          {title}
        </h2>
        <span className="flex h-5 w-5 items-center justify-center rounded-full border border-gray-300 text-xs font-bold text-gray-400">
          i
        </span>
      </div>

      <div className="flex flex-1 flex-col justify-center space-y-4 px-5 py-5">
        {topics.map((topic) => (
          <div key={topic.topic} className="flex flex-col space-y-1">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="text-sm">{topic.icon}</span>
                <span className="font-bold text-gray-600">{topic.topic}</span>
              </div>
              <span className="font-black" style={{ color: topic.color }}>
                {topic.progress}%
              </span>
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
