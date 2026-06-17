"use client";

import { useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { api, type AuthResponse, type Usuario } from "@/lib/api";

type AuthContextValue = {
  token: string | null;
  usuario: Usuario | null;
  isReady: boolean;
  login: (payload: { email: string; senha: string }) => Promise<void>;
  cadastro: (payload: {
    nomeCompleto: string;
    dataNascimento: string;
    email: string;
    senha: string;
    confirmarSenha: string;
  }) => Promise<void>;
  atualizarUsuario: (usuario: Usuario) => void;
  logout: () => void;
};

const TOKEN_KEY = "tutor-cnh-token";
const USER_KEY = "tutor-cnh-user";

const AuthContext = createContext<AuthContextValue | null>(null);

function persistSession(session: AuthResponse) {
  localStorage.setItem(TOKEN_KEY, session.token);
  localStorage.setItem(USER_KEY, JSON.stringify(session.usuario));
}

function clearSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let mounted = true;

    queueMicrotask(() => {
      if (!mounted) {
        return;
      }

      const storedToken = localStorage.getItem(TOKEN_KEY);
      const storedUser = localStorage.getItem(USER_KEY);

      if (!storedToken) {
        setIsReady(true);
        return;
      }

      if (storedUser) {
        try {
          setUsuario(JSON.parse(storedUser) as Usuario);
        } catch {
          localStorage.removeItem(USER_KEY);
        }
      }

      setToken(storedToken);

      api
        .validarToken(storedToken)
        .then((data) => {
          if (!mounted) {
            return;
          }

          if (data.valido) {
            setUsuario(data.usuario);
            localStorage.setItem(USER_KEY, JSON.stringify(data.usuario));
          }
        })
        .catch(() => {
          if (!mounted) {
            return;
          }

          clearSession();
          setToken(null);
          setUsuario(null);
        })
        .finally(() => {
          if (mounted) {
            setIsReady(true);
          }
        });
    });

    return () => {
      mounted = false;
    };
  }, []);

  const login = useCallback(
    async (payload: { email: string; senha: string }) => {
      const session = await api.login(payload);
      persistSession(session);
      setToken(session.token);
      setUsuario(session.usuario);
      router.push("/dashboard");
    },
    [router],
  );

  const cadastro = useCallback(
    async (payload: {
      nomeCompleto: string;
      dataNascimento: string;
      email: string;
      senha: string;
      confirmarSenha: string;
    }) => {
      const session = await api.cadastro(payload);
      persistSession(session);
      setToken(session.token);
      setUsuario(session.usuario);
      router.push("/dashboard");
    },
    [router],
  );

  const atualizarUsuario = useCallback((nextUsuario: Usuario) => {
    setUsuario(nextUsuario);
    localStorage.setItem(USER_KEY, JSON.stringify(nextUsuario));
  }, []);

  const logout = useCallback(() => {
    clearSession();
    setToken(null);
    setUsuario(null);
    router.push("/login");
  }, [router]);

  return (
    <AuthContext.Provider
      value={{
        token,
        usuario,
        isReady,
        login,
        cadastro,
        atualizarUsuario,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
