"use client";

import { Bot, LoaderCircle, Send, Settings } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../../_components/auth-provider";
import { SidebarToggleButton } from "../../_components/sidebar-toggle-button";
import { UserPill } from "../../_components/user-pill";
import { api, type ChatHistoryItem } from "@/lib/api";

const suggestions = [
  "Quais sao as infracoes gravissimas?",
  "Explique a diferenca entre multa e advertencia",
  "Como funciona a pontuacao da CNH?",
  "Quais exames sao necessarios para tirar a CNH?",
];

type Message = ChatHistoryItem;

function BotAvatar() {
  return (
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#d9dee8] bg-white text-[#20263a] shadow-sm">
      <Bot className="h-5 w-5" />
    </div>
  );
}

export default function TutorInteligentePage() {
  const { token } = useAuth();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "model",
      content:
        "Ola! Me envie uma duvida sobre legislacao, sinalizacao, direcao defensiva ou prova teorica da CNH.",
    },
  ]);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [isSending, setIsSending] = useState(false);

  async function sendMessage(messageText = input) {
    const trimmed = messageText.trim();
    if (!trimmed || isSending) {
      return;
    }

    const nextMessages = [...messages, { role: "user" as const, content: trimmed }];
    setMessages(nextMessages);
    setInput("");
    setError("");
    setIsSending(true);

    try {
      const data = await api.chat(
        {
          mensagem: trimmed,
          historico: messages,
        },
        token,
      );
      setMessages([...nextMessages, { role: "model", content: data.resposta }]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Nao foi possivel enviar sua pergunta.");
      setMessages(messages);
    } finally {
      setIsSending(false);
    }
  }

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
              Converse e tire duvidas com o tutor de CNH.
            </p>
          </div>
        </div>

        <UserPill />
      </header>

      <div className="grid gap-5 2xl:grid-cols-[1.08fr_0.92fr]">
        <article className="flex min-h-[620px] flex-col rounded-[24px] bg-[#f2f2f3] p-4 shadow-[0_12px_24px_rgba(19,32,58,0.08)] sm:p-5">
          <div className="mb-4 flex items-center text-[#4f5c74]">
            <Settings className="h-4 w-4" />
          </div>

          <div className="flex-1 overflow-y-auto rounded-[18px] bg-white px-4 py-5">
            <div className="space-y-5">
              {messages.map((message, index) =>
                message.role === "user" ? (
                  <div key={`${message.role}-${index}`} className="flex justify-end">
                    <div className="max-w-[82%] rounded-[16px] bg-secondary px-4 py-3 text-sm leading-6 text-white shadow-sm">
                      {message.content}
                    </div>
                  </div>
                ) : (
                  <div key={`${message.role}-${index}`} className="flex items-start gap-3">
                    <BotAvatar />
                    <div className="max-w-[82%] rounded-[16px] bg-[#eef2f7] px-4 py-3 text-sm leading-6 text-[#273247] shadow-sm">
                      {message.content}
                    </div>
                  </div>
                ),
              )}

              {isSending ? (
                <div className="flex items-start gap-3">
                  <BotAvatar />
                  <div className="flex items-center gap-2 rounded-[16px] bg-[#eef2f7] px-4 py-3 text-sm text-[#5f6d84]">
                    <LoaderCircle className="h-4 w-4 animate-spin" />
                    Respondendo...
                  </div>
                </div>
              ) : null}
            </div>
          </div>

          {error ? (
            <p className="mt-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
              {error}
            </p>
          ) : null}

          <form
            className="mt-4 flex items-center gap-3 rounded-[16px] bg-white px-4 py-3"
            onSubmit={(event) => {
              event.preventDefault();
              void sendMessage();
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Pergunte aqui..."
              className="flex-1 bg-transparent text-sm text-[#202637] outline-none placeholder:text-[#adb3bf]"
            />
            <button
              type="submit"
              disabled={isSending || !input.trim()}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f1f2f5] text-[#171b2b] transition hover:bg-[#e2e7ef] disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Enviar pergunta"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </article>

        <aside className="space-y-5">
          <article className="rounded-[24px] bg-[#f2f2f3] p-4 shadow-[0_12px_24px_rgba(19,32,58,0.08)]">
            <h2 className="text-2xl font-extrabold text-[#1f2435]">Sugestao para voce</h2>
            <div className="mt-4 space-y-3">
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => void sendMessage(suggestion)}
                  className="flex w-full items-center justify-between gap-4 rounded-[18px] bg-white px-4 py-4 text-left text-sm leading-6 text-[#555f73] shadow-[0_8px_18px_rgba(19,32,58,0.05)] transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
                  disabled={isSending}
                >
                  {suggestion}
                  <Send className="h-4 w-4 shrink-0 text-[#1f2435]" />
                </button>
              ))}
            </div>
          </article>

          <article className="rounded-[24px] border border-[#cad6f6] bg-[#eef3ff] p-5">
            <h2 className="text-xl font-extrabold text-[#3457b9]">Contexto conectado</h2>
            <p className="mt-2 text-sm leading-6 text-[#34405a]">
              As mensagens sao enviadas para o backend Flask e podem ser registradas no
              historico do usuario autenticado.
            </p>
          </article>
        </aside>
      </div>
    </section>
  );
}
