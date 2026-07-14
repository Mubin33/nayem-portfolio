"use client";

import React, { useState } from "react";

interface OptimizationOption {
  id: string;
  name: string;
  description: string;
  impactTime: number; // ms reduction
  impactMemory: number; // MB reduction
  impactQueries: number; // query count reduction
}

const OPTIMIZATIONS: OptimizationOption[] = [
  {
    id: "config_cache",
    name: "Route & Config Caching",
    description: "Compiles Laravel configurations, route paths, and namespaces into a single PHP file.",
    impactTime: 45,
    impactMemory: 0.8,
    impactQueries: 5,
  },
  {
    id: "redis",
    name: "Redis Cache & Session",
    description: "Replaces file-based session/cache drivers with high-throughput in-memory Redis database.",
    impactTime: 62,
    impactMemory: 0.4,
    impactQueries: 12,
  },
  {
    id: "opcache",
    name: "OPcache Script Preloading",
    description: "Caches precompiled PHP script bytecode directly in system memory to skip runtime compiling.",
    impactTime: 55,
    impactMemory: 1.1,
    impactQueries: 0,
  },
  {
    id: "octane",
    name: "Laravel Octane (Swoole Worker)",
    description: "Keeps application booted in memory across requests. Eliminates boot time overhead entirely.",
    impactTime: 76,
    impactMemory: -0.5, // Octane worker uses a bit more RAM
    impactQueries: 22,
  },
];

export default function PerformanceOptimizer() {
  const [activeOpts, setActiveOpts] = useState<string[]>([]);

  const handleToggle = (id: string) => {
    setActiveOpts((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Base metrics (unoptimized Laravel)
  const baseTime = 250; // ms
  const baseMemory = 4.2; // MB
  const baseQueries = 45; // count

  // Calculate optimized values
  let currentTime = baseTime;
  let currentMemory = baseMemory;
  let currentQueries = baseQueries;

  activeOpts.forEach((optId) => {
    const opt = OPTIMIZATIONS.find((o) => o.id === optId);
    if (opt) {
      currentTime = Math.max(12, currentTime - opt.impactTime);
      currentMemory = Math.max(1.8, parseFloat((currentMemory - opt.impactMemory).toFixed(1)));
      currentQueries = Math.max(0, currentQueries - opt.impactQueries);
    }
  });

  // Calculate speed grade
  let grade = "D-";
  let gradeColor = "text-red-500 border-red-500/30 bg-red-950/20";
  if (currentTime < 30) {
    grade = "A+";
    gradeColor = "text-emerald-400 border-emerald-500/30 bg-emerald-950/20 shadow-[0_0_20px_rgba(52,211,153,0.2)]";
  } else if (currentTime < 70) {
    grade = "A";
    gradeColor = "text-green-400 border-green-500/30 bg-green-950/20";
  } else if (currentTime < 120) {
    grade = "B";
    gradeColor = "text-teal-400 border-teal-500/30 bg-teal-950/20";
  } else if (currentTime < 180) {
    grade = "C";
    gradeColor = "text-yellow-500 border-yellow-500/30 bg-yellow-950/20";
  }

  // Percentage optimization speedup
  const speedupFactor = (baseTime / currentTime).toFixed(1);

  // Speedometer Gauge Calculations (Circle circumference: 2 * PI * r = 2 * 3.14159 * 40 = 251.2)
  // We use 3/4 of the circle for the gauge arc: 251.2 * 0.75 = 188.4 active range, 62.8 empty gap.
  const pct = Math.min(1, Math.max(0, (baseTime - currentTime) / (baseTime - 12)));
  const dashOffset = 251.2 - pct * 188.4;
  
  let strokeColor = "text-red-500";
  if (currentTime < 30) strokeColor = "text-emerald-400";
  else if (currentTime < 70) strokeColor = "text-green-400";
  else if (currentTime < 120) strokeColor = "text-teal-400";
  else if (currentTime < 180) strokeColor = "text-yellow-500";

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#090909] border border-zinc-800 rounded-xl p-6 shadow-2xl relative overflow-hidden">
      {/* Overlay background red glowing spotlight */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-red-900/10 rounded-full blur-3xl -z-10"></div>

      {/* Column 1: Options & Toggles */}
      <div>
        <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></span>
          Performance Optimization Controls
        </h3>
        <p className="text-xs text-zinc-400 mb-6">
          Toggle optimization configurations below to see their real-time impact on the Laravel request lifecycle performance.
        </p>

        <div className="space-y-3.5">
          {OPTIMIZATIONS.map((opt) => {
            const isChecked = activeOpts.includes(opt.id);
            return (
              <div
                key={opt.id}
                onClick={() => handleToggle(opt.id)}
                className={`p-3.5 rounded-lg border transition-all duration-300 cursor-pointer select-none ${
                  isChecked
                    ? "bg-red-950/20 border-red-500/40 shadow-sm"
                    : "bg-zinc-900/40 border-zinc-800 hover:border-zinc-700"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${
                        isChecked ? "bg-red-500 border-red-500" : "border-zinc-700 bg-black"
                      }`}
                    >
                      {isChecked && (
                        <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <span className={`text-sm font-semibold transition-colors ${isChecked ? "text-red-400" : "text-zinc-300"}`}>
                      {opt.name}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-zinc-500 mt-1.5 ml-8 leading-relaxed">
                  {opt.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Column 2: Dashboard Visualization */}
      <div className="flex flex-col justify-between border-t md:border-t-0 md:border-l border-zinc-800 pt-6 md:pt-0 md:pl-6">
        <div>
          <h3 className="text-lg font-bold text-white mb-4">Production Response Metrics</h3>

          {/* Large Indicator */}
          <div className="flex items-center justify-between bg-black/60 rounded-xl p-5 border border-zinc-900 mb-6 gap-4">
            <div>
              <div className="text-zinc-500 text-[10px] font-mono tracking-wider">APP LATENCY</div>
              <div className="text-4xl font-extrabold text-white tracking-tight mt-1 flex items-baseline">
                {currentTime}
                <span className="text-red-500 text-lg ml-0.5 font-normal">ms</span>
              </div>
              <p className="text-[10px] text-zinc-400 mt-1 font-mono leading-relaxed">
                {activeOpts.length > 0 ? `🔥 ${speedupFactor}x Faster Response` : "⚠️ High boot overhead"}
              </p>
            </div>
            
            {/* Speedometer SVG Gauge Dial */}
            <div className="relative flex items-center justify-center w-20 h-20 select-none">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                {/* Background Ring */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  stroke="#18181b"
                  strokeWidth="8"
                  strokeDasharray="251.2"
                  strokeDashoffset="62.8"
                  className="origin-center rotate-45"
                />
                {/* Foreground Active Ring */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  stroke="currentColor"
                  strokeWidth="8"
                  strokeDasharray="251.2"
                  strokeDashoffset={dashOffset}
                  className={`origin-center rotate-45 gauge-ring ${strokeColor}`}
                />
              </svg>
              {/* Text inside dial */}
              <div className={`absolute w-10 h-10 rounded-full border flex flex-col items-center justify-center font-bold text-base transition-all duration-500 ${gradeColor}`}>
                {grade}
              </div>
            </div>
          </div>

          {/* Stats details */}
          <div className="space-y-4 font-mono">
            {/* Database Queries */}
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-zinc-400">DATABASE QUERY LOAD</span>
                <span className="text-zinc-200">{currentQueries} Queries/Req</span>
              </div>
              <div className="h-1.5 bg-zinc-900 rounded-full overflow-hidden">
                <div
                  className="h-full bg-red-500 transition-all duration-500"
                  style={{ width: `${(currentQueries / baseQueries) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Memory Usage */}
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-zinc-400">MEMORY ALLOCATION</span>
                <span className="text-zinc-200">{currentMemory} MB</span>
              </div>
              <div className="h-1.5 bg-zinc-900 rounded-full overflow-hidden">
                <div
                  className="h-full bg-red-600 transition-all duration-500"
                  style={{ width: `${(currentMemory / baseMemory) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Developer comment section */}
        <div className="mt-6 bg-[#121212]/80 border border-zinc-900 rounded-lg p-3 text-xs leading-relaxed text-zinc-400">
          <span className="text-red-500 font-bold block mb-1">🛠️ Optimization Insights:</span>
          {activeOpts.length === 0 && "Current state compiles routing files, environment files, database credentials, and service providers on every HTTP request. Slow and CPU heavy."}
          {activeOpts.length > 0 && activeOpts.length < 3 && "Speed is improving. Precompiling configs & moving sessions into Redis allows Laravel to skip filesytem IO."}
          {activeOpts.length >= 3 && activeOpts.length < 4 && "Excellent latency reduction. Bytecode preload and fast memory caching bypasses compilation cycles entirely."}
          {activeOpts.length === 4 && "⚡ Enterprise level speed! Laravel Octane boots the framework once, holds state across worker threads, executing code at native speed!"}
        </div>
      </div>
    </div>
  );
}
