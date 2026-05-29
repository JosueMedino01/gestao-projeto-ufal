import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SidebarLayout } from "./_components/sidebar-layout";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tutor CNH",
  description: "Plataforma de estudo para a prova teorica da CNH",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="h-full overflow-hidden bg-background font-sans text-foreground">
        <main className="h-screen overflow-hidden">
          <SidebarLayout>{children}</SidebarLayout>
        </main>
      </body>
    </html>
  );
}
