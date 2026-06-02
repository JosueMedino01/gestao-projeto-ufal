import React from "react";
import {
  ArrowLeft,
  Bell,
  Clock3,
  Calendar,
  Globe,
  Palette,
  User,
  Shield,
  Bookmark,
  Lightbulb,
  Volume2,
  TriangleAlert,
  RotateCcw,
  Download,
  Trash2,
  HelpCircle,
  ChevronRight,
} from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-[#F5F6FA] p-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button
          aria-label="Voltar"
          className="w-12 h-12 rounded-xl bg-white shadow flex items-center justify-center"
        >
          <ArrowLeft size={20} />
        </button>

        <div>
          <h1 className="text-4xl font-bold text-[#0C5DA8]">
            Configurações
          </h1>

          <p className="text-gray-600">
            Personalize sua experiência no Tutor CNH
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-8 border-b mb-8">
        <Tab icon={<Globe size={18} />} active>
          Geral
        </Tab>

        <Tab icon={<Bell size={18} />}>
          Notificações
        </Tab>

        <Tab icon={<Shield size={18} />}>
          Privacidade
        </Tab>

        <Tab icon={<User size={18} />}>
          Conta
        </Tab>

        <Tab icon={<Palette size={18} />}>
          Aparência
        </Tab>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Coluna esquerda */}
        <div className="col-span-8 space-y-8">
          <Card title="Configurações gerais">
            <SettingItem
              icon={<Globe />}
              title="Idioma da plataforma"
              description="Escolha o idioma que deseja utilizar."
            >
              <Select value="Português (Brasil)" />
            </SettingItem>

            <SettingItem
              icon={<Clock3 />}
              title="Fuso horário"
              description="Defina o fuso horário para exibição correta dos horários."
            >
              <Select value="(UTC-03:00) Brasília" />
            </SettingItem>

            <SettingItem
              icon={<Calendar />}
              title="Formato de data"
              description="Escolha como as datas serão exibidas."
            >
              <Select value="DD/MM/AAAA" />
            </SettingItem>

            <SettingItem
              icon={<Clock3 />}
              title="Unidade de medida de tempo"
              description="Escolha como o tempo será exibido."
            >
              <Select value="Horas e minutos" />
            </SettingItem>
          </Card>

          <Card title="Preferências de estudo">
            <SwitchItem
              icon={<Bookmark />}
              title="Lembrar onde parei"
              description="Retomar automaticamente o último conteúdo estudado."
            />

            <SwitchItem
              icon={<Lightbulb />}
              title="Mostrar dicas rápidas"
              description="Exibir dicas durante os estudos e simulados."
            />

            <SwitchItem
              icon={<Volume2 />}
              title="Sons da plataforma"
              description="Ativar efeitos sonoros em ações da plataforma."
            />

            <SwitchItem
              icon={<TriangleAlert />}
              title="Confirmação antes de sair"
              description="Exibir alerta ao tentar sair de uma questão ou simulado."
            />
          </Card>
        </div>

        {/* Coluna direita */}
        <div className="col-span-4 space-y-8">
          <Card title="Resumo das preferências">
            <SummaryItem
              label="Idioma"
              value="Português (Brasil)"
            />

            <SummaryItem
              label="Fuso horário"
              value="(UTC-03:00) Brasília"
            />

            <SummaryItem
              label="Notificações"
              value="Ativadas"
            />

            <SummaryItem
              label="Tema"
              value="Claro"
            />
          </Card>

          <Card title="Ações rápidas">
            <ActionItem
              icon={<RotateCcw size={18} />}
              text="Redefinir preferências"
            />

            <ActionItem
              icon={<Download size={18} />}
              text="Exportar dados"
            />

            <ActionItem
              icon={<Trash2 size={18} />}
              text="Excluir conta"
            />

            <ActionItem
              icon={<HelpCircle size={18} />}
              text="Central de ajuda"
            />
          </Card>
        </div>
      </div>
    </div>
  );
}

/* ==========================
   TYPES
========================== */

interface CardProps {
  title: string;
  children: React.ReactNode;
}

interface TabProps {
  icon: React.ReactNode;
  children: React.ReactNode;
  active?: boolean;
}

interface SettingItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  children: React.ReactNode;
}

interface SelectProps {
  value: string;
}

interface SwitchItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface SummaryItemProps {
  label: string;
  value: string;
}

interface ActionItemProps {
  icon: React.ReactNode;
  text: string;
}

/* ==========================
   COMPONENTS
========================== */

function Card({
  title,
  children,
}: CardProps) {
  return (
    <div className="bg-white rounded-3xl shadow-sm p-6">
      <h2 className="text-[#152E88] text-xl font-semibold mb-6">
        {title}
      </h2>

      {children}
    </div>
  );
}

function Tab({
  icon,
  children,
  active = false,
}: TabProps) {
  return (
    <button
      className={`flex items-center gap-2 pb-3 transition ${
        active
          ? "text-[#152E88] border-b-2 border-[#152E88]"
          : "text-gray-500"
      }`}
    >
      {icon}
      {children}
    </button>
  );
}

function SettingItem({
  icon,
  title,
  description,
  children,
}: SettingItemProps) {
  return (
    <div className="flex items-center justify-between py-4 border-b last:border-b-0">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-blue-100 text-[#152E88] flex items-center justify-center">
          {icon}
        </div>

        <div>
          <h3 className="font-semibold">
            {title}
          </h3>

          <p className="text-sm text-gray-500">
            {description}
          </p>
        </div>
      </div>

      {children}
    </div>
  );
}

function Select({
  value,
}: SelectProps) {
  return (
    <select
      aria-label={value}
      className="border rounded-xl px-4 py-3 shadow-sm min-w-[220px]"
      defaultValue={value}
    >
      <option>{value}</option>
    </select>
  );
}

function SwitchItem({
  icon,
  title,
  description,
}: SwitchItemProps) {
  return (
    <div className="flex items-center justify-between py-4 border-b last:border-b-0">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-blue-100 text-[#152E88] flex items-center justify-center">
          {icon}
        </div>

        <div>
          <h3 className="font-semibold">
            {title}
          </h3>

          <p className="text-sm text-gray-500">
            {description}
          </p>
        </div>
      </div>

      <input
        type="checkbox"
        defaultChecked
        aria-label={title}
        className="w-5 h-5"
      />
    </div>
  );
}

function SummaryItem({
  label,
  value,
}: SummaryItemProps) {
  return (
    <div className="mb-5">
      <p className="font-medium">
        {label}
      </p>

      <p className="text-gray-500">
        {value}
      </p>
    </div>
  );
}

function ActionItem({
  icon,
  text,
}: ActionItemProps) {
  return (
    <button className="flex items-center justify-between w-full py-4 border-b last:border-b-0 hover:text-[#152E88] transition">
      <div className="flex items-center gap-3">
        {icon}
        {text}
      </div>

      <ChevronRight size={18} />
    </button>
  );
}