"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "../_components/auth-provider";

export default function CadastroPage() {
  const { cadastro } = useAuth();
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (senha !== confirmarSenha) {
      setError("As senhas precisam ser iguais.");
      return;
    }

    setIsSubmitting(true);
    try {
      await cadastro({
        nomeCompleto,
        dataNascimento,
        email,
        senha,
        confirmarSenha,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Nao foi possivel criar a conta.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="flex min-h-screen bg-white">
      <section className="hidden w-[40%] flex-col justify-center bg-[#152E88] px-24 text-white lg:flex">
        <Image
          src="/tutor-cnh-logo.png"
          alt="Tutor CNH"
          width={311}
          height={236}
          className="mb-10 h-auto w-[180px]"
        />

        <h1 className="text-5xl font-light italic leading-tight">
          Crie sua conta e comece hoje mesmo a{" "}
          <span className="font-semibold text-[#73B8F4]">estudar com o Tutor CNH!</span>
        </h1>

        <p className="mt-8 text-xl font-light">
          Simulados atualizados, pratica por temas e tutor inteligente com IA para te
          preparar para a prova teorica da CNH.
        </p>

        <div className="mt-14 space-y-8">
          <div>
            <h3 className="text-xl font-medium">Simulados Realistas</h3>
            <p>Questoes atualizadas no padrao DETRAN.</p>
          </div>
          <div>
            <h3 className="text-xl font-medium">Estude por Temas</h3>
            <p>Foque nos assuntos que mais caem na prova.</p>
          </div>
          <div>
            <h3 className="text-xl font-medium">Tutor Inteligente com IA</h3>
            <p>Tire duvidas e receba explicacoes personalizadas.</p>
          </div>
        </div>
      </section>

      <section className="flex flex-1 items-center justify-center p-8 sm:p-10">
        <div className="w-full max-w-5xl rounded-xl bg-[#F5F5F5] p-8 shadow-md sm:p-12">
          <h2 className="text-center text-4xl font-medium text-[#222222] sm:text-5xl">
            Crie sua conta
          </h2>
          <p className="mt-4 text-center text-[#6A7487]">
            Preencha os dados abaixo para comecar
          </p>

          <form className="mt-10 space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="nomeCompleto"
                  className="mb-2 block text-lg font-medium text-[#222222]"
                >
                  Nome completo
                </label>
                <input
                  id="nomeCompleto"
                  name="nomeCompleto"
                  type="text"
                  value={nomeCompleto}
                  onChange={(event) => setNomeCompleto(event.target.value)}
                  placeholder="Digite seu nome completo"
                  autoComplete="name"
                  required
                  className="h-16 w-full rounded-2xl border border-[#DCE2EE] bg-white px-5 text-[#222222] placeholder:text-[#9AA3B2] focus:border-[#2A67D7] focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="dataNascimento"
                  className="mb-2 block text-lg font-medium text-[#222222]"
                >
                  Data de nascimento
                </label>
                <input
                  id="dataNascimento"
                  type="date"
                  value={dataNascimento}
                  onChange={(event) => setDataNascimento(event.target.value)}
                  required
                  className="h-16 w-full rounded-2xl border border-[#DCE2EE] bg-white px-5 text-[#222222] focus:border-[#2A67D7] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="mb-2 block text-lg font-medium text-[#222222]">
                E-mail
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Digite seu e-mail"
                autoComplete="email"
                required
                className="h-16 w-full rounded-2xl border border-[#DCE2EE] bg-white px-5 text-[#222222] focus:border-[#2A67D7] focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="senha" className="mb-2 block text-lg font-medium text-[#222222]">
                Senha
              </label>
              <input
                id="senha"
                name="senha"
                type="password"
                value={senha}
                onChange={(event) => setSenha(event.target.value)}
                placeholder="Crie sua senha"
                autoComplete="new-password"
                minLength={6}
                required
                className="h-16 w-full rounded-2xl border border-[#DCE2EE] bg-white px-5 text-[#222222] focus:border-[#2A67D7] focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="confirmarSenha"
                className="mb-2 block text-lg font-medium text-[#222222]"
              >
                Confirmar senha
              </label>
              <input
                id="confirmarSenha"
                name="confirmarSenha"
                type="password"
                value={confirmarSenha}
                onChange={(event) => setConfirmarSenha(event.target.value)}
                placeholder="Confirme sua senha"
                autoComplete="new-password"
                minLength={6}
                required
                className="h-16 w-full rounded-2xl border border-[#DCE2EE] bg-white px-5 text-[#222222] focus:border-[#2A67D7] focus:outline-none"
              />
            </div>

            {error ? (
              <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                {error}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={isSubmitting}
              className="h-16 w-full rounded-2xl bg-[#152E88] text-xl font-medium text-white transition-colors hover:bg-[#10246b] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Criando conta..." : "Criar minha conta"}
            </button>
          </form>

          <p className="mt-8 text-center text-[#6A7487]">
            Ja tem uma conta?{" "}
            <Link href="/login" className="font-semibold text-[#152E88] hover:underline">
              Fazer login
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
