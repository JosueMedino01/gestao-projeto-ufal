import { SidebarToggleButton } from "./sidebar-toggle-button";

type PagePlaceholderProps = {
  title: string;
};

export function PagePlaceholder({ title }: PagePlaceholderProps) {
  return (
    <section className="flex flex-1 flex-col p-5 sm:p-7 lg:p-8">
      <header className="flex items-start gap-3 pb-6">
        <SidebarToggleButton />
        <div>
          <p className="text-sm font-semibold text-text-muted">Tela</p>
          <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-blue-deep sm:text-5xl">
            {title}
          </h1>
        </div>
      </header>

      <div className="flex flex-1 items-center justify-center rounded-[28px] border border-dashed border-border bg-surface p-10 shadow-sm">
        <h1 className="text-center text-3xl font-extrabold tracking-tight text-blue-deep sm:text-5xl">
          {title}
        </h1>
      </div>
    </section>
  );
}
