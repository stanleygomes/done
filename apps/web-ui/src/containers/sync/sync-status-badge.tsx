"use client";

import { useSync } from "@modules/sync/use-sync";
import { Popover, PopoverContent, PopoverTrigger } from "@paul/ui";
import { AlertCircle, Cloud, CloudOff, RefreshCw } from "lucide-react";
import { SyncStatusDetails } from ".";

export function SyncStatusBadge() {
  const { isSyncing, lastSyncAt, syncError } = useSync();

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
        <PopoverContent
          side="bottom"
          align="start"
          sideOffset={10}
          className="z-[110] w-56 p-3 bg-white dark:bg-[#111] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] border-2 border-black dark:border-white/20"
        >
          <SyncStatusDetails />
        </PopoverContent>
      </Popover>
    </div>
  );
}
