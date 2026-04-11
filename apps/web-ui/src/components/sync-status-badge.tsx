"use client";

import { useSync } from "@modules/sync/use-sync";
import { Cloud, CloudOff, RefreshCw, AlertCircle } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@paul/ui";
import { formatDistanceToNow } from "date-fns";

export function SyncStatusBadge() {
  const { isSyncing, lastSyncAt, syncError, performSync } = useSync();

  const getStatusColor = () => {
    if (isSyncing) return "bg-blue-500";
    if (syncError) return "bg-red-500";
    if (lastSyncAt) return "bg-green-500";
    return "bg-gray-500";
  };

  const getStatusIcon = () => {
    if (isSyncing)
      return <RefreshCw className="w-2.5 h-2.5 animate-spin text-white" />;
    if (syncError) return <AlertCircle className="w-2.5 h-2.5 text-white" />;
    if (lastSyncAt) return <Cloud className="w-2.5 h-2.5 text-white" />;
    return <CloudOff className="w-2.5 h-2.5 text-white" />;
  };

  return (
    <div className="absolute -bottom-1 -right-1 z-10">
      <Popover>
        <PopoverTrigger asChild>
          <button
            title="Sincronização"
            className={`flex items-center justify-center w-5 h-5 rounded-full border-2 border-white dark:border-black shadow-sm cursor-pointer transition-transform hover:scale-125 active:scale-95 ${getStatusColor()}`}
          >
            {getStatusIcon()}
          </button>
        </PopoverTrigger>
        <PopoverContent className="z-[110] w-56 p-3 bg-white dark:bg-[#111] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] border-2 border-black dark:border-white/20">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 font-black text-xs uppercase tracking-tighter">
              {isSyncing ? (
                <>
                  <RefreshCw className="w-3 h-3 animate-spin" />
                  <span>Sincronizando...</span>
                </>
              ) : syncError ? (
                <>
                  <AlertCircle className="w-3 h-3 text-red-500" />
                  <span className="text-red-500">Erro na Sincronização</span>
                </>
              ) : (
                <>
                  <Cloud className="w-3 h-3 text-green-500" />
                  <span className="text-green-500">Sincronizado</span>
                </>
              )}
            </div>

            <div className="text-[10px] font-bold text-foreground/60">
              {lastSyncAt ? (
                <>
                  Última sincronização:{" "}
                  {formatDistanceToNow(lastSyncAt, { addSuffix: true })}
                </>
              ) : (
                <>Nunca sincronizado</>
              )}
            </div>

            {syncError && (
              <div className="text-[10px] text-red-500/80 font-medium leading-tight">
                {syncError}
              </div>
            )}

            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                performSync();
              }}
              disabled={isSyncing}
              className="mt-1 w-full py-1 text-[10px] font-black uppercase bg-black text-white dark:bg-white dark:text-black rounded border border-black dark:border-white hover:bg-black/80 dark:hover:bg-white/80 transition-colors disabled:opacity-50"
            >
              {isSyncing ? "Sincronizando..." : "Sincronizar Agora"}
            </button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
