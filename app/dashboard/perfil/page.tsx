"use client";

import Image from "next/image";
import { Calendar, LoaderCircle, Mail, MapPin, Phone, ShieldCheck, User } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "../../_components/auth-provider";
import { SidebarToggleButton } from "../../_components/sidebar-toggle-button";
import { UserPill } from "../../_components/user-pill";
import { api, type Usuario } from "@/lib/api";

function formatBirthDate(value?: string | null) {
  if (!value) {
    return "Nao informada";
  }

  return new Intl.DateTimeFormat("pt-BR", { timeZone: "UTC" }).format(new Date(value));
}

export default function PerfilPage() {
  const { token, usuario, atualizarUsuario } = useAuth();
  const [profile, setProfile] = useState<Usuario | null>(usuario);
  const [form, setForm] = useState({
    nome: usuario?.nome ?? "",
    email: usuario?.email ?? "",
    data_nascimento: usuario?.data_nascimento ?? "",
    telefone: usuario?.telefone ?? "",
    cidade: usuario?.cidade ?? "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!token) {
      return;
    }

    let mounted = true;

    api
      .perfil(token)
      .then((data) => {
        if (!mounted) {
          return;
        }

        setProfile(data.usuario);
        setForm({
          nome: data.usuario.nome ?? "",
          email: data.usuario.email ?? "",
          data_nascimento: data.usuario.data_nascimento ?? "",
          telefone: data.usuario.telefone ?? "",
          cidade: data.usuario.cidade ?? "",
        });
        atualizarUsuario(data.usuario);
      })
      .catch((err) => {
        if (mounted) {
          setError(err instanceof Error ? err.message : "Nao foi possivel carregar o perfil.");
        }
      })
      .finally(() => {
        if (mounted) {
          setIsLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, [atualizarUsuario, token]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!token) {
      return;
    }

    setIsSaving(true);
    setError("");
    setSuccess("");

    try {
      const data = await api.atualizarPerfil(token, form);
      setProfile(data.usuario);
      atualizarUsuario(data.usuario);
      setSuccess("Perfil atualizado com sucesso.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Nao foi possivel atualizar o perfil.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <section className="min-h-screen bg-[#F5F6FA] p-6 lg:p-8">
      <header className="mb-8 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="flex items-start gap-3">
          <SidebarToggleButton />
          <div>
            <h1 className="text-4xl font-bold text-[#0C5DA8] sm:text-5xl">Meu Perfil</h1>
            <p className="mt-2 text-gray-700">
              Gerencie as informacoes da sua conta salvas na API.
            </p>
          </div>
        </div>
        <UserPill />
      </header>

      {isLoading ? (
        <div className="flex min-h-[420px] items-center justify-center">
          <LoaderCircle className="h-7 w-7 animate-spin text-primary" />
        </div>
      ) : (
        <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_420px]">
          <div className="space-y-8">
            <div className="rounded-3xl bg-white p-8 shadow">
              <div className="flex flex-col gap-8 lg:flex-row lg:items-center">
                <Image
                  src="/tutor-cnh-icon.png"
                  alt="Avatar do usuario"
                  width={160}
                  height={160}
                  className="h-32 w-32 rounded-full object-cover"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-4">
                    <h2 className="text-3xl font-medium text-[#0C5DA8] sm:text-5xl">
                      {profile?.nome ?? "Aluno Tutor CNH"}
                    </h2>
                    <span className="rounded-lg bg-blue-100 px-4 py-2 text-[#152E88]">
                      Aluno
                    </span>
                  </div>

                  <div className="mt-6 grid gap-3 text-sm text-[#243044] sm:grid-cols-2">
                    <span className="flex items-center gap-3">
                      <Mail size={18} />
                      {profile?.email ?? "Nao informado"}
                    </span>
                    <span className="flex items-center gap-3">
                      <Phone size={18} />
                      {profile?.telefone || "Telefone nao informado"}
                    </span>
                    <span className="flex items-center gap-3">
                      <MapPin size={18} />
                      {profile?.cidade || "Cidade nao informada"}
                    </span>
                    <span className="flex items-center gap-3">
                      <Calendar size={18} />
                      {formatBirthDate(profile?.data_nascimento)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-5 rounded-2xl border border-[#dce4f4] bg-[#f8fbff] p-5">
                  <ShieldCheck size={64} className="text-green-700" />
                  <div>
                    <p className="text-sm text-gray-600">Nivel Atual</p>
                    <h3 className="text-3xl font-semibold text-green-700">Basico</h3>
                  </div>
                </div>
              </div>
            </div>

            <form className="rounded-3xl bg-white p-8 shadow" onSubmit={handleSubmit}>
              <h2 className="mb-6 text-2xl font-semibold text-[#152E88]">
                Informacoes pessoais
              </h2>

              <div className="grid gap-5 md:grid-cols-2">
                <label className="block">
                  <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#243044]">
                    <User size={16} />
                    Nome completo
                  </span>
                  <input
                    value={form.nome}
                    onChange={(event) => setForm((current) => ({ ...current, nome: event.target.value }))}
                    className="h-12 w-full rounded-xl border border-[#DCE2EE] bg-white px-4 text-[#222222] focus:border-[#2A67D7] focus:outline-none"
                    required
                  />
                </label>

                <label className="block">
                  <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#243044]">
                    <Mail size={16} />
                    E-mail
                  </span>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
                    className="h-12 w-full rounded-xl border border-[#DCE2EE] bg-white px-4 text-[#222222] focus:border-[#2A67D7] focus:outline-none"
                    required
                  />
                </label>

                <label className="block">
                  <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#243044]">
                    <Calendar size={16} />
                    Data de nascimento
                  </span>
                  <input
                    type="date"
                    value={form.data_nascimento ?? ""}
                    onChange={(event) =>
                      setForm((current) => ({ ...current, data_nascimento: event.target.value }))
                    }
                    className="h-12 w-full rounded-xl border border-[#DCE2EE] bg-white px-4 text-[#222222] focus:border-[#2A67D7] focus:outline-none"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#243044]">
                    <Phone size={16} />
                    Telefone
                  </span>
                  <input
                    value={form.telefone ?? ""}
                    onChange={(event) =>
                      setForm((current) => ({ ...current, telefone: event.target.value }))
                    }
                    className="h-12 w-full rounded-xl border border-[#DCE2EE] bg-white px-4 text-[#222222] focus:border-[#2A67D7] focus:outline-none"
                  />
                </label>

                <label className="block md:col-span-2">
                  <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#243044]">
                    <MapPin size={16} />
                    Cidade
                  </span>
                  <input
                    value={form.cidade ?? ""}
                    onChange={(event) =>
                      setForm((current) => ({ ...current, cidade: event.target.value }))
                    }
                    className="h-12 w-full rounded-xl border border-[#DCE2EE] bg-white px-4 text-[#222222] focus:border-[#2A67D7] focus:outline-none"
                  />
                </label>
              </div>

              {error ? (
                <p className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                  {error}
                </p>
              ) : null}

              {success ? (
                <p className="mt-5 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
                  {success}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={isSaving}
                className="mt-8 rounded-2xl bg-[#152E88] px-6 py-4 font-medium text-white disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSaving ? "Salvando..." : "Salvar informacoes"}
              </button>
            </form>
          </div>

          <aside className="rounded-3xl bg-white p-8 shadow">
            <h2 className="text-2xl font-semibold text-[#152E88]">Dados da conta</h2>
            <div className="mt-6 space-y-4 text-sm">
              <p className="flex justify-between gap-4 border-b pb-3">
                <span className="text-gray-500">ID</span>
                <strong>{profile?.id}</strong>
              </p>
              <p className="flex justify-between gap-4 border-b pb-3">
                <span className="text-gray-500">Criado em</span>
                <strong>{formatDateTime(profile?.criado_em)}</strong>
              </p>
              <p className="flex justify-between gap-4 border-b pb-3">
                <span className="text-gray-500">Status</span>
                <strong>Ativo</strong>
              </p>
            </div>
          </aside>
        </div>
      )}
    </section>
  );
}

function formatDateTime(value?: string | null) {
  if (!value) {
    return "Nao informado";
  }

  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(value));
}
