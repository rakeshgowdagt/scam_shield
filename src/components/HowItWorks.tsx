import React from 'react';
import { ClipboardPaste, Cpu, ShieldCheck } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Paste Text or Upload Screenshot',
      description:
        'Copy the suspicious WhatsApp message, Telegram job offer, SMS alert, or upload an unedited screenshot (up to 4 MB).',
      icon: <ClipboardPaste className="w-5 h-5 text-teal-400" />,
    },
    {
      step: '02',
      title: 'AI Scans for Fraud Patterns',
      description:
        'Gemini 2.5 Flash analyzes registration fee demands, fake domain redirects, spoofed recruiters, urgent KYC threats, and suspicious language.',
      icon: <Cpu className="w-5 h-5 text-indigo-400" />,
    },
    {
      step: '03',
      title: 'Get Verdict & Action Plan',
      description:
        'View the instant risk score (0-100), red flags, and an actionable step-by-step checklist tailored in English, Kannada, or Hindi.',
      icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
    },
  ];

  return (
    <section className="mt-12 mb-10">
      <div className="text-center max-w-xl mx-auto mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          How Scam Shield Works
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1.5">
          Three simple steps to verify whether a message is authentic before taking action
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        {steps.map((item) => (
          <div
            key={item.step}
            className="p-5 sm:p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700/80 transition-all relative group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-teal-400 group-hover:scale-105 transition-transform">
                {item.icon}
              </div>
              <span className="text-2xl font-black text-slate-800 tracking-wider">
                {item.step}
              </span>
            </div>

            <h3 className="text-sm sm:text-base font-semibold text-slate-100 mb-2">
              {item.title}
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
