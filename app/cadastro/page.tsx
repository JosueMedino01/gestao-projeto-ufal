"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function CadastroPage() {
  
  const [dataNascimento, setDataNascimento] = useState("");
  return (
    <main className="min-h-screen flex bg-white">
      {/* Lado esquerdo */}
      <section className="hidden lg:flex w-[40%] bg-[#152E88] text-white flex-col justify-center px-24">
        <Image
        src="/tutor-cnh-logo.png"
        alt="Tutor CNH"
        width={311}
        height={236}
        className="mb-10 w-[180px] h-auto"/>

        <h1 className="text-5xl italic font-light leading-tight">
          Crie sua conta e comece hoje mesmo a{" "}
          <span className="font-semibold text-[#0C5DA8]">
            estudar com o Tutor CNH!
          </span>
        </h1>

        <p className="mt-8 text-xl font-light">
          Simulados atualizados, prática por temas e tutor inteligente
          com IA para te preparar para a prova teórica da CNH.
        </p>

        <div className="space-y-8 mt-14">
          <div>
            <h3 className="text-xl font-medium">
              Simulados Realistas
            </h3>
            <p>
              Questões atualizadas no padrão DETRAN.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-medium">
              Estude por Temas
            </h3>
            <p>
              Foque nos assuntos que mais caem na prova.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-medium">
              Tutor Inteligente com IA
            </h3>
            <p>
              Tire dúvidas e receba explicações personalizadas.
            </p>
          </div>
        </div>
      </section>

      {/* Formulário */}
      <section className="flex-1 flex justify-center items-center p-10">
        <div className="w-full max-w-5xl bg-[#F5F5F5] rounded-xl shadow-md p-12">
          <h2 className="text-center text-5xl font-medium text-[#222222]">
            Crie sua conta
          </h2>

          <p className="mt-4 text-center text-[#6A7487]">
            Preencha os dados abaixo para começar
          </p>

          <form className="mt-10 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Nome */}
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
                  placeholder="Digite seu nome completo"
                  aria-label="Nome completo"
                  className="h-16 w-full rounded-2xl border border-[#DCE2EE] bg-white px-5 text-[#222222] placeholder:text-[#9AA3B2] focus:border-[#2A67D7] focus:outline-none"
                />
              </div>

              {/* Data */}
              <div>
                <label
                  htmlFor="dataNascimento"
                  className="mb-2 block text-lg font-medium text-[#222222]"
                >
                  Data de nascimento
                </label>

                
                <input
                  type="date"
                  value={dataNascimento}
                  onChange={(e) => setDataNascimento(e.target.value)}
                  className="w-full h-16 rounded-2xl border border-[#DCE2EE] bg-white px-5 text-[#222222] focus:border-[#2A67D7] focus:outline-none"/>
              </div>
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-lg font-medium text-[#222222]"
              >
                E-mail
              </label>

              <input
                id="email"
                name="email"
                type="email"
                placeholder="Digite seu e-mail"
                aria-label="E-mail"
                autoComplete="email"
                className="w-full h-16 rounded-2xl border border-[#DCE2EE] bg-white px-5 text-[#222222] focus:border-[#2A67D7] focus:outline-none"
              />
            </div>

            {/* Senha */}
            <div>
              <label
                htmlFor="senha"
                className="mb-2 block text-lg font-medium text-[#222222]"
              >
                Senha
              </label>

              <input
                id="senha"
                name="senha"
                type="password"
                placeholder="Crie sua senha"
                aria-label="Senha"
                autoComplete="new-password"
                className="w-full h-16 rounded-2xl border border-[#DCE2EE] bg-white px-5 text-[#222222] focus:border-[#2A67D7] focus:outline-none"
              />
            </div>

            {/* Confirmar senha */}
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
                placeholder="Confirme sua senha"
                aria-label="Confirmar senha"
                autoComplete="new-password"
                className="w-full h-16 rounded-2xl border border-[#DCE2EE] bg-white px-5 text-[#222222] focus:border-[#2A67D7] focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full h-16 bg-[#152E88] text-white rounded-2xl text-xl font-medium hover:bg-[#10246b] transition-colors"
            >
              Criar minha conta
            </button>
          </form>

          <p className="mt-8 text-center text-[#6A7487]">
            Já tem uma conta?{" "}
            <Link
              href="/login"
              className="font-semibold text-[#152E88] hover:underline"
            >
              Fazer login
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
