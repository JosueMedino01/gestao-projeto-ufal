"use client";

import {
  Bell,
  ChevronRight,
  Mail,
  Phone,
  MapPin,
  Calendar,
  User,
  Clock3,
  BookOpen,
  Settings,
  ShieldCheck,
  Camera,
} from "lucide-react";

export default function PerfilPage() {
  return (
    <div className="min-h-screen bg-[#F5F6FA] p-8">
      {/* Conteúdo */}
      <main className="flex-1 p-10">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-[#0C5DA8] text-5xl font-bold">
              Meu Perfil
            </h1>

            <p className="text-gray-700 mt-2">
              Gerencie suas informações e preferências da sua conta.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              aria-label="Notifications"
              className="w-14 h-14 bg-white rounded-2xl shadow flex items-center justify-center"
            >
              <Bell />
            </button>

            <img
              src="/avatar.jpg"
              alt="Avatar"
              className="w-16 h-16 rounded-full object-cover"
            />
          </div>
        </div>

        {/* Card principal */}
        <div className="bg-white rounded-3xl shadow p-10 mb-8">
          <div className="grid grid-cols-2 gap-10">
            {/* Perfil */}
            <div className="flex gap-8">
              <div className="relative">
                <img
                  src="/avatar.jpg"
                  alt=""
                  className="w-40 h-40 rounded-full object-cover"
                />

                <button
                  type="button"
                  className="absolute bottom-2 right-2 bg-white shadow rounded-full p-2"
                  aria-label="Editar foto de perfil"
                  title="Editar foto de perfil"
                >
                  <Camera size={18} />
                </button>
              </div>

              <div>
                <div className="flex items-center gap-4">
                  <h2 className="text-[#0C5DA8] text-5xl font-medium">
                    Josué Medino
                  </h2>

                  <span className="px-4 py-2 bg-blue-100 text-[#152E88] rounded-lg">
                    Aluno
                  </span>
                </div>

                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-3">
                    <Mail size={18} />
                    <span>josue.medino@gmail.com</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone size={18} />
                    <span>(00)00000-0000</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <MapPin size={18} />
                    <span>Maceió - AL</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Nível */}
            <div className="border-l pl-10 flex items-center gap-8">
              <ShieldCheck
                size={90}
                className="text-green-700"
              />

              <div className="flex-1">
                <p>Nível Atual</p>

                <h3 className="text-5xl font-semibold text-green-700">
                  Básico
                </h3>

                <p className="mt-2">
                  Continue estudando!
                </p>

                <div className="flex items-center gap-4 mt-5">
                  <div className="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden">
                    <div className="w-[21%] h-full bg-green-700 rounded-full" />
                  </div>

                  <span className="text-sm">
                    210 / 1.000 XP
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Cards inferiores */}
        <div className="grid grid-cols-2 gap-8">
          {/* Informações */}
          <div className="bg-white rounded-3xl shadow p-8">
            <h2 className="text-[#152E88] text-2xl font-semibold mb-8">
              Informações pessoais
            </h2>

            <div className="space-y-5">
              <InfoRow
                icon={<User size={18} />}
                label="Nome Completo"
                value="Josue Medino Jacinto"
              />

              <InfoRow
                icon={<Calendar size={18} />}
                label="Data de Nascimento"
                value="13/09/2001"
              />

              <InfoRow
                icon={<Mail size={18} />}
                label="E-mail"
                value="josue.medino@gmail.com"
              />

              <InfoRow
                icon={<Phone size={18} />}
                label="Telefone"
                value="(00)00000-0000"
              />

              <InfoRow
                icon={<MapPin size={18} />}
                label="Cidade"
                value="Maceió - AL"
              />
            </div>

            <button className="w-full mt-8 bg-[#152E88] text-white rounded-2xl py-4 font-medium">
              Editar informações
            </button>
          </div>

          {/* Preferências */}
          <div className="bg-white rounded-3xl shadow p-8">
            <h2 className="text-[#152E88] text-2xl font-semibold mb-8">
              Preferências de estudo
            </h2>

            <div className="space-y-5">
              <InfoRow
                icon={<Clock3 size={18} />}
                label="Tempo diário de estudo"
                value="1 a 2 horas por dia"
              />

              <InfoRow
                icon={<Clock3 size={18} />}
                label="Período de estudo"
                value="Noite"
              />

              <InfoRow
                icon={<BookOpen size={18} />}
                label="Área de interesse"
                value="Todas as categorias"
              />

              <InfoRow
                icon={<Bell size={18} />}
                label="Notificações"
                value="Ativadas"
                valueClass="text-green-600 font-semibold"
              />
            </div>

            <button className="w-full mt-8 bg-[#152E88] text-white rounded-2xl py-4 font-medium">
              Editar preferências
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

type InfoRowProps = {
  icon: React.ReactNode;
  label: string;
  value: string;
  valueClass?: string;
};

function InfoRow({
  icon,
  label,
  value,
  valueClass,
}: InfoRowProps) {
  return (
    <div className="flex items-center border-b pb-3">
      <div className="mr-3">{icon}</div>

      <div className="flex-1">{label}</div>

      <div className={valueClass}>{value}</div>

      <ChevronRight
        size={18}
        className="ml-4 text-gray-400"
      />
    </div>
  );
}