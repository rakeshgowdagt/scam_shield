import React from 'react';
import { COMMON_SCAMS } from '../data/samples';
import { CommonScamItem } from '../types';
import {
  Briefcase,
  GraduationCap,
  Users,
  CreditCard,
  AlertTriangle,
  ArrowRight,
  Shield,
} from 'lucide-react';

interface CommonScamsProps {
  onLoadScamSample: (sampleText: string) => void;
}

export const CommonScams: React.FC<CommonScamsProps> = ({ onLoadScamSample }) => {
  const getScamIcon = (id: string) => {
    switch (id) {
      case 'internship-fees':
        return <Briefcase className="w-5 h-5 text-rose-400" />;
      case 'scholarship-links':
        return <GraduationCap className="w-5 h-5 text-amber-400" />;
      case 'fake-recruiters':
        return <Users className="w-5 h-5 text-orange-400" />;
      case 'kyc-otp-threats':
      default:
        return <CreditCard className="w-5 h-5 text-purple-400" />;
    }
  };

  return (
    <section className="mt-12 mb-12">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-400 uppercase tracking-wider mb-1">
            <Shield className="w-3.5 h-3.5" />
            <span>Awareness Guide</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Common Student Scams in India
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Learn the top 4 traps targeting college undergraduates & freshers across WhatsApp & Telegram
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {COMMON_SCAMS.map((scam: CommonScamItem) => (
          <div
            key={scam.id}
            className="p-5 sm:p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-3 mb-3">
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                  {getScamIcon(scam.id)}
                </div>
                <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700/60">
                  {scam.badge}
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-100">{scam.title}</h3>
              <p className="text-xs text-teal-400/90 font-medium mt-0.5 mb-2.5">
                {scam.subtitle}
              </p>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                {scam.description}
              </p>

              {/* Warning signs bullets */}
              <div className="space-y-1.5 p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 mb-4">
                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <AlertTriangle className="w-3 h-3 text-amber-400" />
                  <span>Key Warning Signs:</span>
                </div>
                {scam.warningSigns.map((sign, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                    <span className="text-slate-500">•</span>
                    <span>{sign}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => onLoadScamSample(scam.sampleText)}
              className="mt-2 flex items-center justify-between w-full px-3.5 py-2 rounded-xl bg-slate-800/70 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/60 text-xs font-semibold transition-all cursor-pointer group"
            >
              <span>Test an example of this scam</span>
              <ArrowRight className="w-3.5 h-3.5 text-teal-400 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};
