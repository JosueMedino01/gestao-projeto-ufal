import Image from "next/image";
import Link from "next/link";

const testimonials = [
  {
    quote:
      "O Tutor CNH me ajudou a estudar nos horarios que eu realmente tinha disponiveis. Cheguei na prova bem mais confiante.",
    author: "Luana, Curitiba",
  },
  {
    quote:
      "Os simulados parecem a prova de verdade e a pratica por tema acelerou minha revisao nas materias em que eu travava.",
    author: "Mariana, Sao Paulo",
  },
  {
    quote:
      "O tutor inteligente explica sem enrolacao. Quando eu errava, conseguia entender o motivo e melhorar rapido.",
    author: "Felipe, Belo Horizonte",
  },
];

function HeroIllustration() {
  return (
    <div className="relative mx-auto hidden h-[340px] w-full max-w-[500px] lg:block">
      <Image
        src="/landing-hero-shape.png"
        alt=""
        width={529}
        height={396}
        className="absolute right-2 top-0 h-auto w-[22rem] sm:w-[26rem]"
      />
      <Image
        src="/landing-hero-photo.png"
        alt="Dois alunos estudando com tablet"
        width={612}
        height={408}
        className="absolute bottom-0 right-0 z-10 h-auto w-[21rem] rounded-[26px] object-cover sm:w-[25rem]"
        priority
      />
    </div>
  );
}

function ProductMockup() {
  return (
    <div className="relative mx-auto w-full max-w-[860px]">
      <Image
        src="/landing-section-two.png"
        alt="Tela de simulado do Tutor CNH"
        width={2048}
        height={1110}
        className="h-auto w-full rounded-[24px] shadow-[0_22px_38px_rgba(6,28,84,0.24)]"
      />
    </div>
  );
}

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#f5f7fd] text-[#18367f]">
      <section className="w-full">
        <div className="min-h-screen overflow-hidden bg-white">
          <header className="flex items-center justify-between gap-4 px-6 py-5 lg:px-10">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/tutor-cnh-icon.png"
                alt="Tutor CNH"
                width={48}
                height={48}
                className="h-10 w-10 object-contain"
                priority
              />
              <span className="text-sm font-semibold text-[#23439e]">Tutor CNH</span>
            </Link>

            <nav className="flex shrink-0 flex-nowrap items-center gap-3 text-sm text-[#3f5ba8]">
              <Link
                href="/login"
                className="whitespace-nowrap rounded-full border border-[#d9e2fb] px-4 py-2 font-semibold text-[#23439e] transition hover:bg-[#f5f8ff] sm:px-5"
              >
                Entrar
              </Link>
              <Link
                href="/cadastro"
                className="whitespace-nowrap rounded-full bg-[#23439e] px-4 py-2 font-semibold text-white transition hover:bg-[#18367f] sm:px-5"
              >
                Registrar-se
              </Link>
            </nav>
          </header>

          <section className="px-6 pb-12 pt-6 lg:px-10 lg:pb-16 lg:pt-10">
            <div className="grid items-center gap-10 lg:grid-cols-[1fr_480px]">
              <div className="mx-auto max-w-xl text-center lg:mx-0 lg:text-left">
                <h1 className="mx-auto text-4xl font-semibold leading-tight text-[#23439e] sm:text-5xl lg:mx-0 lg:max-w-[12ch]">
                  Estude com o Tutor CNH quando e onde quiser.
                </h1>
                <p className="mx-auto mt-5 max-w-lg text-base leading-7 text-[#5f72a8] sm:text-lg lg:mx-0">
                  Simulados realistas, revisao guiada e explicacoes claras para voce conquistar sua carteira com mais confianca.
                </p>
                <div className="mt-8 flex justify-center gap-4 lg:justify-start">
                  <Link
                    href="/cadastro"
                    className="rounded-full bg-[#23439e] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#18367f]"
                  >
                    Experimente gratuitamente
                  </Link>
                </div>
              </div>

              <HeroIllustration />
            </div>
          </section>

          <section
            id="proposta"
            className="bg-[#1561b3] px-6 py-12 text-white lg:px-10 lg:py-14"
          >
            <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
              <ProductMockup />

              <div className="mx-auto flex h-full max-w-md flex-col justify-center text-center">
                <h2 className="text-3xl font-semibold leading-tight">
                  Chega de perder tempo com simulados desatualizados
                </h2>
                <div className="mt-6 space-y-5 text-sm leading-6 text-[#dbe8ff]">
                  <div>
                    <p className="font-semibold text-white">IA de desempenho</p>
                    <p>
                      Questoes geradas e selecionadas com base no que ainda cai na prova.
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-white">Mudou a lei?</p>
                    <p>
                      O Tutor CNH se atualiza automaticamente para voce nao estudar conteudo defasado.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section
            id="feedbacks"
            className="bg-[#22398e] px-6 py-14 text-white lg:px-10 lg:py-16"
          >
            <div className="text-center">
              <h2 className="text-3xl font-semibold">O que nossos alunos dizem?</h2>
              <p className="mt-3 text-sm text-[#d9e2ff]">
                Veja feedbacks de pessoas reais apos treinarem conosco.
              </p>
            </div>

            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {testimonials.map((item) => (
                <article
                  key={item.author}
                  className="rounded-[22px] bg-white p-6 text-center text-[#20356f] shadow-[0_20px_30px_rgba(7,18,56,0.22)]"
                >
                  <p className="text-sm leading-6 text-[#53689d]">{item.quote}</p>
                  <p className="mt-5 text-sm font-semibold text-[#23439e]">
                    {item.author}
                  </p>
                </article>
              ))}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
