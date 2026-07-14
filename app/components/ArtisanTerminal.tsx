"use client";

import React, { useState, useEffect, useRef } from "react";

interface LogLine {
  text: string;
  type: "input" | "info" | "success" | "warning" | "comment" | "ascii";
}

const PRESETS = {
  migrate: [
    { text: "php artisan migrate --force", type: "input" },
    { text: "Migrating: 2026_07_10_000001_create_users_table", type: "comment" },
    { text: "Migrated:  2026_07_10_000001_create_users_table (14.21ms)", type: "success" },
    { text: "Migrating: 2026_07_12_084310_create_jobs_and_queues_table", type: "comment" },
    { text: "Migrated:  2026_07_12_084310_create_jobs_and_queues_table (31.05ms)", type: "success" },
    { text: "Migrating: 2026_07_14_122340_create_veteran_claims_table", type: "comment" },
    { text: "Migrated:  2026_07_14_122340_create_veteran_claims_table (42.88ms)", type: "success" },
    { text: "Database migration completed successfully.", type: "info" },
  ],
  optimize: [
    { text: "php artisan optimize", type: "input" },
    { text: "Configuring cache... [DONE]", type: "comment" },
    { text: "Configuration cached successfully!", type: "success" },
    { text: "Caching routes... [DONE]", type: "comment" },
    { text: "Routes cached successfully!", type: "success" },
    { text: "Caching events... [DONE]", type: "comment" },
    { text: "Events cached successfully!", type: "success" },
    { text: "-------------------------------------", type: "comment" },
    { text: "🚀 Production optimizations active. Laravel is ready.", type: "info" },
  ],
  queue: [
    { text: "php artisan queue:work --queue=high,default", type: "input" },
    { text: "[2026-07-14 20:06:12] Processing: App\\Jobs\\SendEmailNotification", type: "comment" },
    { text: "[2026-07-14 20:06:13] Processed:  App\\Jobs\\SendEmailNotification (1.2s)", type: "success" },
    { text: "[2026-07-14 20:06:14] Processing: App\\Jobs\\OptimizeUploadedImage", type: "comment" },
    { text: "[2026-07-14 20:06:18] Processed:  App\\Jobs\\OptimizeUploadedImage (4.1s)", type: "success" },
    { text: "[2026-07-14 20:06:19] Processing: App\\Jobs\\SyncVeteranClaimData", type: "comment" },
    { text: "[2026-07-14 20:06:20] Processed:  App\\Jobs\\SyncVeteranClaimData (0.8s)", type: "success" },
    { text: "INFO  Waiting for next job...", type: "info" },
  ],
  octane: [
    { text: "php artisan octane:start --server=swoole --port=8000", type: "input" },
    { text: "INFO  Server running on http://127.0.0.1:8000", type: "info" },
    { text: "INFO  Octane Server Started (using Swoole v5.1.0)", type: "success" },
    { text: "INFO  Worker count: 8 | Task workers: 4", type: "comment" },
    { text: "INFO  Watch dynamic hot-reload enabled...", type: "warning" },
  ],
};

export default function ArtisanTerminal() {
  const [logs, setLogs] = useState<LogLine[]>([
    {
      text: `
 _      __   ___  _____  __  __
| |    /  \\ | _ \\| __| \\/ / / _\\
| |__ | /\\ ||   /| _|  \\  /  \\ \\
|____||_||_||_|_\\|___|  /_/  \\__/
`,
      type: "ascii",
    },
    { text: "Welcome to Nayem's Laravel Server CLI environment.", type: "info" },
    { text: "Click any button below to execute an Artisan command.", type: "comment" },
  ]);
  const [isRunning, setIsRunning] = useState(false);
  const terminalContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalContainerRef.current) {
      terminalContainerRef.current.scrollTop = terminalContainerRef.current.scrollHeight;
    }
  }, [logs]);

  const runCommand = async (cmdKey: keyof typeof PRESETS) => {
    if (isRunning) return;
    setIsRunning(true);
    const cmdLines = PRESETS[cmdKey];

    // Clear and set input line
    setLogs([{ text: `nayem@laravel-server:~$ ${cmdLines[0].text}`, type: "input" }]);

    for (let i = 1; i < cmdLines.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 300 + Math.random() * 500));
      setLogs((prev) => [...prev, cmdLines[i] as LogLine]);
    }
    setIsRunning(false);
  };

  const getLineStyle = (type: LogLine["type"]) => {
    switch (type) {
      case "input":
        return "text-white font-semibold";
      case "info":
        return "text-cyan-400";
      case "success":
        return "text-emerald-400";
      case "warning":
        return "text-amber-400";
      case "comment":
        return "text-zinc-500";
      case "ascii":
        return "text-red-500 font-mono leading-tight text-xs whitespace-pre select-none";
      default:
        return "text-zinc-300";
    }
  };

  return (
    <div className="w-full glass-panel border border-zinc-800 rounded-xl overflow-hidden shadow-2xl">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#0d0d0d] border-b border-zinc-900">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
        </div>
        <div className="text-xs text-zinc-500 font-mono select-none">nayem@laravel-production-node-1</div>
        <div className="w-12"></div>
      </div>

      {/* Terminal Screen */}
      <div
        ref={terminalContainerRef}
        className="crt-screen p-5 h-[340px] overflow-y-auto font-mono text-sm bg-black/95 scrollbar-thin"
      >
        <div className="crt-screen-content space-y-2">
          {logs.map((log, idx) => (
            <div key={idx} className={getLineStyle(log.type)}>
              {log.type === "input" && <span className="text-red-500 mr-2">➜</span>}
              {log.text}
            </div>
          ))}
          {isRunning && (
            <div className="flex items-center text-zinc-500">
              <span className="text-red-500 mr-2">➜</span>
              <span className="w-2 h-4 bg-red-500 animate-typing-cursor inline-block"></span>
            </div>
          )}
        </div>
      </div>

      {/* Control Buttons Panel */}
      <div className="p-4 bg-[#0d0d0d] border-t border-zinc-900 flex flex-wrap gap-2 justify-center sm:justify-start">
        <button
          onClick={() => runCommand("migrate")}
          disabled={isRunning}
          className="px-3 py-1.5 text-xs font-mono rounded bg-red-950/40 text-red-400 border border-red-900/60 hover:bg-red-500 hover:text-white transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          php artisan migrate
        </button>
        <button
          onClick={() => runCommand("optimize")}
          disabled={isRunning}
          className="px-3 py-1.5 text-xs font-mono rounded bg-red-950/40 text-red-400 border border-red-900/60 hover:bg-red-500 hover:text-white transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          php artisan optimize
        </button>
        <button
          onClick={() => runCommand("queue")}
          disabled={isRunning}
          className="px-3 py-1.5 text-xs font-mono rounded bg-red-950/40 text-red-400 border border-red-900/60 hover:bg-red-500 hover:text-white transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          php artisan queue:work
        </button>
        <button
          onClick={() => runCommand("octane")}
          disabled={isRunning}
          className="px-3 py-1.5 text-xs font-mono rounded bg-red-950/40 text-red-400 border border-red-900/60 hover:bg-red-500 hover:text-white transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          php artisan octane:start
        </button>
      </div>
    </div>
  );
}
