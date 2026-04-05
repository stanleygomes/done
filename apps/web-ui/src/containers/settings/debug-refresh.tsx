"use client";

import { useAuth } from "../../modules/auth/use-auth";
import { useUser } from "../../modules/user/use-user";
import { useState } from "react";

export function DebugRefresh() {
  const { token, refreshToken } = useAuth();
  const { refreshProfile } = useUser();
  const [loading, setLoading] = useState(false);

  const handleInvalidate = () => {
    if (token && refreshToken) {
      // "Invalidar" o token acrescentando algo que o torne um JWT inválido para a assinatura
      // mas ainda parecendo um token para enviarmos no header.
      localStorage.setItem("app-token", JSON.stringify(token + "_invalid"));
      // Disparar evento de storage para que o hook useLocalStorage atualize o estado
      window.dispatchEvent(new Event("storage"));
      alert(
        "Token invalidado no localStorage. Próxima requisição deve disparar o Refresh Token.",
      );
    }
  };

  const handleTestRequest = async () => {
    setLoading(true);
    try {
      await refreshProfile();
      alert(
        "Requisição finalizada com sucesso (verifique o Network para ver se o refresh ocorreu).",
      );
    } catch (error) {
      console.error(error);
      alert("Erro na requisição. Verifique o console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-6 shadow-sm">
      <div className="flex flex-col gap-1">
        <h3 className="text-sm font-bold text-foreground">Depurar Tokens</h3>
        <p className="text-xs text-muted-foreground">
          Use estes botões para testar se o mecanismo de renovação automática do
          token (Refresh Token) está funcionando.
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          onClick={handleInvalidate}
          className="rounded-lg bg-red-500/10 px-4 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-500/20"
        >
          1. Invalidate Token
        </button>
        <button
          onClick={handleTestRequest}
          disabled={loading}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "Testando..." : "2. Test Authenticated Request"}
        </button>
      </div>

      <div className="text-[10px] font-mono text-muted-foreground break-all opacity-50">
        <p>Token: {token?.substring(0, 20)}...</p>
        <p>Refresh: {refreshToken?.substring(0, 20)}...</p>
      </div>
    </div>
  );
}
