"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  Bot,
  BookOpen,
  ClipboardCheck,
  Eye,
  EyeOff,
  Lock,
  Mail,
} from "lucide-react";
import { useAuth } from "../_components/auth-provider";

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await login({ email, senha });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Nao foi possivel entrar.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="flex min-h-screen bg-white">
      <section className="relative hidden w-[42%] flex-col overflow-hidden bg-[#152E88] lg:flex">
        <div className="relative z-10 flex h-full flex-col px-20 py-10">
          <div className="mb-10">
            <Image
              src="/tutor-cnh-logo.png"
              alt="Tutor CNH"
              width={311}
              height={236}
              className="h-auto w-[180px] object-contain"
              priority
            />
          </div>

          <div className="mt-10 max-w-md">
            <h2 className="text-5xl font-light italic leading-tight text-white">
              Estude de forma inteligente e seja{" "}
              <span className="font-bold text-[#73B8F4]">aprovado!</span>
            </h2>
            <p className="mt-8 text-lg font-light leading-8 text-white">
              Simulados atualizados, pratica por temas e tutor inteligente com IA
              para te preparar para a prova teorica da CNH.
            </p>
          </div>

          <div className="mt-auto mb-16 space-y-8">
            {[
              {
                icon: ClipboardCheck,
                title: "Simulados Realistas",
                text: "Questoes atualizadas no padrao DETRAN.",
              },
              {
                icon: BookOpen,
                title: "Estude por Temas",
                text: "Foque nos assuntos que mais caem na prova.",
              },
              {
                icon: Bot,
                title: "Tutor Inteligente com IA",
                text: "Tire duvidas e receba explicacoes personalizadas.",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="flex items-center gap-5">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#0C5DA8]">
                    <Icon size={34} color="white" />
                  </div>
                  <div>
                    <h3 className="text-xl text-white">{item.title}</h3>
                    <p className="text-white/80">{item.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="flex flex-1 items-center justify-center bg-white px-8">
        <div className="w-full max-w-3xl rounded-xl bg-[#F5F5F5] p-8 shadow-lg sm:p-14">
          <div className="mb-10 text-center">
            <h2 className="text-4xl font-medium text-black sm:text-5xl">
              Bem-vindo de volta!
            </h2>
            <p className="mt-4 text-lg font-light text-gray-700">
              Faca login para continuar seus estudos.
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="mb-3 block text-lg font-medium text-[#222222]">
                E-mail
              </label>
              <div className="flex h-[70px] items-center rounded-2xl border border-gray-300 bg-white px-5">
                <Mail className="text-gray-400" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Digite seu e-mail"
                  autoComplete="email"
                  required
                  className="ml-4 w-full bg-transparent text-[#222222] placeholder:text-[#9CA3AF] outline-none"
                />
              </div>
            </div>

            <div>
              <label htmlFor="senha" className="mb-3 block text-lg font-medium text-[#222222]">
                Senha
              </label>
              <div className="flex h-[70px] items-center rounded-2xl border border-gray-300 bg-white px-5">
                <Lock className="text-gray-400" />
                <input
                  id="senha"
                  type={showPassword ? "text" : "password"}
                  value={senha}
                  onChange={(event) => setSenha(event.target.value)}
                  placeholder="Digite sua senha"
                  autoComplete="current-password"
                  required
                  className="ml-4 w-full bg-transparent text-[#222222] outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  className="text-gray-400"
                  aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>

            {error ? (
              <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                {error}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={isSubmitting}
              className="h-[70px] w-full rounded-2xl bg-[#152E88] text-xl font-semibold text-white transition hover:bg-[#0f236a] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Entrando..." : "Entrar"}
            </button>
          </form>

          <div className="mt-10 text-center text-lg">
            <span className="text-gray-500">Ainda nao tem uma conta?</span>
            <Link href="/cadastro" className="ml-2 font-medium text-[#23248D]">
              Cadastre-se
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
