import React, { useEffect, useState } from 'react';
import { Shield, Sparkles } from 'lucide-react';

export const LoadingSkeleton: React.FC = () => {
  const steps = [
    'Scanning message text & screenshot elements...',
    'Checking for upfront fee & security deposit demands...',
    'Inspecting suspicious links & domain authenticities...',
    'Evaluating impersonation of Indian companies or banks...',
    'Synthesizing risk score & localized safety checklist...',
  ];

  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStepIndex((prev) => (prev + 1) % steps.length);
    }, 1800);
    return () => clearInterval(interval);
  }, [steps.length]);

  return (
    <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 shadow-2xl backdrop-blur-xl relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute -top-24 -left-24 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none animate-pulse" />

      {/* Header status */}
      <div className="flex flex-col items-center text-center mb-8 relative z-10">
        <div className="relative mb-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-teal-500/20 via-indigo-500/20 to-emerald-500/20 border border-teal-500/30 flex items-center justify-center text-teal-400">
            <Shield className="w-8 h-8 animate-pulse text-teal-300" />
          </div>
          <div className="absolute -inset-1 rounded-2xl border border-teal-500/20 animate-ping opacity-30" />
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 text-teal-300 text-xs font-semibold mb-2">
          <Sparkles className="w-3.5 h-3.5 animate-spin text-teal-400" />
          <span>Gemini AI is analyzing this message</span>
        </div>

        <p className="text-sm font-medium text-slate-200 transition-all duration-300">
          {steps[currentStepIndex]}
        </p>
      </div>

      {/* Skeleton placeholders */}
      <div className="space-y-6 animate-pulse relative z-10">
        {/* Top bar skeleton */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
          <div className="h-9 w-40 bg-slate-800 rounded-lg" />
          <div className="h-6 w-32 bg-slate-800 rounded-lg" />
        </div>

        {/* Gauge & Score Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-1 p-5 rounded-xl bg-slate-950/60 border border-slate-800/80 flex flex-col items-center justify-center">
            <div className="w-28 h-28 rounded-full border-4 border-slate-800 border-t-teal-500/60 animate-spin mb-3" />
            <div className="h-4 w-20 bg-slate-800 rounded" />
          </div>

          <div className="md:col-span-2 p-5 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-3">
            <div className="h-4 w-32 bg-slate-800 rounded" />
            <div className="h-3 w-full bg-slate-800/80 rounded" />
            <div className="h-3 w-5/6 bg-slate-800/80 rounded" />
            <div className="h-3 w-4/6 bg-slate-800/80 rounded" />
          </div>
        </div>

        {/* Red flags skeleton */}
        <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-3">
          <div className="h-4 w-36 bg-slate-800 rounded" />
          <div className="space-y-2">
            <div className="h-3 w-full bg-slate-800/60 rounded" />
            <div className="h-3 w-11/12 bg-slate-800/60 rounded" />
            <div className="h-3 w-4/5 bg-slate-800/60 rounded" />
          </div>
        </div>

        {/* Next steps skeleton */}
        <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-3">
          <div className="h-4 w-40 bg-slate-800 rounded" />
          <div className="space-y-2">
            <div className="h-3 w-10/12 bg-slate-800/60 rounded" />
            <div className="h-3 w-3/4 bg-slate-800/60 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
};
