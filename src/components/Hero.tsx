import React from 'react';
import { ShieldCheck, Sparkles, AlertCircle, FileCheck2 } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="text-center pt-8 pb-4 sm:pt-12 sm:pb-6 max-w-3xl mx-auto px-4">
      {/* Top Tag */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-medium mb-4 shadow-sm shadow-teal-500/5">
        <Sparkles className="w-3.5 h-3.5 text-teal-400" />
        <span>Powered by Gemini AI • Tailored for Indian Campuses</span>
      </div>

      {/* Main Headline */}
      <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight">
        Got a suspicious message?{' '}
        <span className="bg-gradient-to-r from-teal-400 via-emerald-300 to-indigo-400 bg-clip-text text-transparent">
          Check it in seconds.
        </span>
      </h1>

      {/* Subtitle */}
      <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto mb-6">
        Protecting college students from fake internship offers, paid job traps, scholarship phishing links, and WhatsApp recruiter scams.
      </p>

      {/* Trust stats / highlights */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-w-xl mx-auto text-left">
        <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="text-xs text-slate-300">Detects upfront fee traps</span>
        </div>
        <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
          <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
          <span className="text-xs text-slate-300">Phishing link scanner</span>
        </div>
        <div className="col-span-2 sm:col-span-1 flex items-center gap-2 p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
          <FileCheck2 className="w-4 h-4 text-indigo-400 shrink-0" />
          <span className="text-xs text-slate-300">Text & Screenshot support</span>
        </div>
      </div>
    </section>
  );
};
