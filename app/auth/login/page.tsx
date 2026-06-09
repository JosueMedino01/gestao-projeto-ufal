"use client";
import Image from "next/image";
import Link from "next/link";
import {
  Mail,
  Lock,
  Eye,
  BookOpen,
  Bot,
  ClipboardCheck,
  ArrowLeft
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  return (
    <main className="flex min-h-screen bg-white">
      {/* LADO ESQUERDO */}
      <section className="relative hidden w-[42%] flex-col overflow-hidden bg-[#152E88] lg:flex">
        <div className="absolute inset-0 bg-[#152E88]" />

        <div className="relative z-10 flex h-full flex-col px-20 py-10">
          {/* Logo */}
          <div className="mb-10">
          <Image
          src="/tutor-cnh-logo.png"
          alt="Tutor CNH"
          width={311}
          height={236}
          className="h-auto w-[180px] object-contain"
          priority/>
        </div>
       
          {/* Texto principal */}
          <div className="mt-10 max-w-md">
            <h2 className="text-5xl font-light italic leading-tight text-white">
              Estude de forma inteligente e seja{" "}
              <span className="font-bold text-[#0C5DA8]">
                aprovado!
              </span>
            </h2>

            <p className="mt-8 text-lg font-light leading-8 text-white">
              Simulados atualizados, prática por temas e tutor inteligente
              com IA para te preparar para a prova teórica da CNH.
            </p>
          </div>

          {/* Benefícios */}
          <div className="mt-auto mb-12 space-y-8">
            <div className="flex items-center gap-5">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#0C5DA8]">
                <ClipboardCheck size={34} color="white" />
              </div>

              <div>
                <h3 className="text-xl text-white">
                  Simulados Realistas
                </h3>

                <p className="text-white/80">
                  Questões atualizadas no padrão DETRAN.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-5">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#0C5DA8]">
                <BookOpen size={34} color="white" />
              </div>

              <div>
                <h3 className="text-xl text-white">
                  Estude por Temas
                </h3>

                <p className="text-white/80">
                  Foque nos assuntos que mais caem na prova.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-5">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#0C5DA8]">
                <Bot size={34} color="white" />
              </div>

              <div>
                <h3 className="text-xl text-white">
                  Tutor Inteligente com IA
                </h3>

                <p className="text-white/80">
                  Tire dúvidas e receba explicações personalizadas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LADO DIREITO */}
      <section className="flex flex-1 items-center justify-center bg-white px-8">
        <div className="w-full max-w-3xl rounded-xl bg-[#F5F5F5] p-14 shadow-lg">
          <div className="mb-12 text-center">
            
            <button
            onClick={() => router.back()}
            className="mb-8 flex h-12 w-12 items-center justify-center rounded-xl bg-white text-[#152E88] shadow transition hover:bg-[#F0F4FF]">
            <ArrowLeft size={22} />
          </button>
            <h2 className="text-5xl font-medium text-black">
              Bem-vindo de volta!
            </h2>

            <p className="mt-4 text-lg font-light text-gray-700">
              Faça login para continuar seus estudos.
            </p>
          </div>

          <form className="space-y-8">
            {/* Email */}
            <div>
              <label className="mb-3 block text-lg font-medium text-[#222222]">
                E-mail
              </label>

              <div className="flex h-[70px] items-center rounded-2xl border border-gray-300 bg-white px-5">
                <Mail className="text-gray-400" />

                <input
                type="email"
                placeholder="Digite seu e-mail"
                className="ml-4 w-full bg-transparent text-[#222222] placeholder:text-[#9CA3AF] outline-none"/>
              </div>
            </div>

            {/* Senha */}
            <div>
              <label className="mb-3 block text-lg font-medium text-[#222222]">
                Senha
              </label>

              <div className="flex h-[70px] items-center rounded-2xl border border-gray-300 bg-white px-5">
                <Lock className="text-gray-400" />

                <input
                  type="password"
                  placeholder="Digite sua senha"
                  className="ml-4 w-full bg-transparent text-[#222222] placeholder:text-[#9CA3AF] outline-none"/>

                <Eye className="text-gray-400" />
              </div>
            </div>

            {/* Botão */}
            <button type="button" onClick={() => router.push("/dashboard/inicio")}
              className="h-[70px] w-full rounded-2xl bg-[#152E88] text-xl font-semibold text-white transition hover:bg-[#0f236a]">
              Entrar
            </button>
          </form>

          <div className="mt-10 text-center text-lg">
            <span className="text-gray-500">
              Ainda não tem uma conta?
            </span>

            <Link
              href="/cadastro"
              className="ml-2 font-medium text-[#23248D]"
            >
              Cadastre-se
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
