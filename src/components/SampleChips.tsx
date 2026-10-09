import React from 'react';
import { SAMPLE_MESSAGES } from '../data/samples';
import { SampleItem } from '../types';
import { Briefcase, GraduationCap, UserCheck, ShieldAlert, CheckCircle2, Sparkles } from 'lucide-react';

interface SampleChipsProps {
  onSelectSample: (sample: SampleItem) => void;
  selectedSampleId?: string | null;
}

export const SampleChips: React.FC<SampleChipsProps> = ({
  onSelectSample,
  selectedSampleId,
}) => {
  const getIcon = (type: SampleItem['type']) => {
    switch (type) {
      case 'scam':
        return <Briefcase className="w-3.5 h-3.5 text-rose-400" />;
      case 'phishing':
        return <GraduationCap className="w-3.5 h-3.5 text-amber-400" />;
      case 'recruiter':
        return <UserCheck className="w-3.5 h-3.5 text-orange-400" />;
      case 'kyc':
        return <ShieldAlert className="w-3.5 h-3.5 text-red-400" />;
      case 'genuine':
        return <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />;
    }
  };

  return (
    <div className="space-y-2 mb-4">
      <div className="flex items-center justify-between text-xs text-slate-400 px-1">
        <span className="flex items-center gap-1.5 font-medium text-slate-300">
          <Sparkles className="w-3.5 h-3.5 text-teal-400" />
          Try a sample message:
        </span>
        <span className="text-[11px] text-slate-500 hidden sm:inline">
          Click any chip to test detection
        </span>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-800">
        {SAMPLE_MESSAGES.map((sample, idx) => {
          const isSelected = selectedSampleId === sample.id;
          const isGenuine = sample.type === 'genuine';

          return (
            <button
              key={sample.id}
              type="button"
              onClick={() => onSelectSample(sample)}
              className={`shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer ${
                isSelected
                  ? 'bg-teal-500/20 text-teal-200 border-teal-500 shadow-sm shadow-teal-500/20'
                  : isGenuine
                  ? 'bg-emerald-950/40 text-emerald-300 border-emerald-800/60 hover:bg-emerald-900/40 hover:border-emerald-600'
                  : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-slate-700 hover:bg-slate-800/80'
              }`}
              title={sample.text}
            >
              {getIcon(sample.type)}
              <span className="font-semibold text-slate-200">{idx + 1}. {sample.category}</span>
              <span className="text-[11px] opacity-75 hidden md:inline">
                ({sample.shortDesc})
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
