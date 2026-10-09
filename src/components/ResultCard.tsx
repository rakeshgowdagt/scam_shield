import React, { useState } from 'react';
import {
  ShieldCheck,
  AlertTriangle,
  ShieldAlert,
  Copy,
  Check,
  Share2,
  ExternalLink,
  PhoneCall,
  CheckCircle2,
  AlertCircle,
  FileText,
  ListChecks,
} from 'lucide-react';
import { AnalysisResult } from '../types';

interface ResultCardProps {
  result: AnalysisResult;
  analyzedText?: string;
  hasImage?: boolean;
}

export const ResultCard: React.FC<ResultCardProps> = ({
  result,
  analyzedText,
  hasImage,
}) => {
  const [copied, setCopied] = useState(false);
  const [checkedSteps, setCheckedSteps] = useState<Record<number, boolean>>({});

  const toggleStep = (idx: number) => {
    setCheckedSteps((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  // Verdict configuration
  const getVerdictConfig = () => {
    switch (result.verdict) {
      case 'safe':
        return {
          title: 'Looks Safe',
          badgeClass:
            'bg-emerald-500/15 text-emerald-300 border-emerald-500/40 shadow-emerald-500/10',
          accentColor: '#10b981',
          bgGradient: 'from-emerald-950/40 to-slate-900',
          icon: <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0" />,
          summary: 'No typical scam markers or upfront fee demands detected.',
        };
      case 'suspicious':
        return {
          title: 'Suspicious',
          badgeClass:
            'bg-amber-500/15 text-amber-300 border-amber-500/40 shadow-amber-500/10',
          accentColor: '#f59e0b',
          bgGradient: 'from-amber-950/40 to-slate-900',
          icon: <AlertTriangle className="w-6 h-6 text-amber-400 shrink-0" />,
          summary: 'Proceed with extreme caution. Unverified claims or red flags present.',
        };
      case 'scam':
      default:
        return {
          title: 'Scam',
          badgeClass:
            'bg-rose-500/15 text-rose-300 border-rose-500/40 shadow-rose-500/10',
          accentColor: '#f43f5e',
          bgGradient: 'from-rose-950/40 to-slate-900',
          icon: <ShieldAlert className="w-6 h-6 text-rose-400 shrink-0" />,
          summary: 'High probability of fraud. Do not send money or personal credentials.',
        };
    }
  };

  const verdictConfig = getVerdictConfig();

  // Score color & label
  const getScoreDetails = (score: number) => {
    if (score <= 30) {
      return {
        label: 'Low Scam Risk',
        color: 'text-emerald-400',
        strokeColor: '#10b981',
        barColor: 'bg-emerald-500',
      };
    }
    if (score <= 70) {
      return {
        label: 'Moderate Risk / Suspicious',
        color: 'text-amber-400',
        strokeColor: '#f59e0b',
        barColor: 'bg-amber-500',
      };
    }
    return {
      label: 'Critical Scam Threat',
      color: 'text-rose-400',
      strokeColor: '#f43f5e',
      barColor: 'bg-rose-500',
    };
  };

  const scoreDetails = getScoreDetails(result.score);

  // Gauge calculation
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (result.score / 100) * circumference;

  // Copy report handler
  const handleCopyReport = async () => {
    const reportText = `🛡️ SCAM SHIELD REPORT
===============================
Verdict: ${verdictConfig.title.toUpperCase()}
Risk Score: ${result.score}/100 (${scoreDetails.label})

📝 Summary & Explanation:
${result.explanation}

🚩 Red Flags Found:
${result.red_flags.map((flag, i) => `${i + 1}. ${flag}`).join('\n')}

✅ What To Do Next:
${result.next_steps.map((step, i) => `[ ] ${step}`).join('\n')}

-------------------------------
National Cyber Crime Helpline: 1930
Report online: https://cybercrime.gov.in
Checked using Scam Shield for Indian Students
`;

    try {
      await navigator.clipboard.writeText(reportText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleShareWhatsApp = () => {
    const shareText = `🛡️ *Scam Shield Warning*:\nI checked a suspicious message:\n*Verdict*: ${verdictConfig.title} (Risk: ${result.score}/100)\n\n*Explanation*: ${result.explanation}\n\n*Key Red Flags*:\n${result.red_flags.slice(0, 3).map((f) => `• ${f}`).join('\n')}\n\nStay safe! Report cyber fraud to helpline 1930.`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`, '_blank');
  };

  return (
    <div className="rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl backdrop-blur-xl overflow-hidden animate-fadeIn">
      {/* Top Banner with Verdict Badge */}
      <div
        className={`p-5 sm:p-6 bg-gradient-to-r ${verdictConfig.bgGradient} border-b border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4`}
      >
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800/80">
            {verdictConfig.icon}
          </div>
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                AI Verdict:
              </span>
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border shadow-sm ${verdictConfig.badgeClass}`}
              >
                {result.verdict === 'safe' && <CheckCircle2 className="w-3.5 h-3.5" />}
                {result.verdict === 'suspicious' && <AlertTriangle className="w-3.5 h-3.5" />}
                {result.verdict === 'scam' && <ShieldAlert className="w-3.5 h-3.5" />}
                {verdictConfig.title}
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1">{verdictConfig.summary}</p>
          </div>
        </div>

        {/* Copy & Share Buttons */}
        <div className="flex items-center gap-2 self-stretch sm:self-auto justify-end">
          <button
            type="button"
            onClick={handleShareWhatsApp}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 text-xs font-medium transition-colors cursor-pointer"
            title="Share on WhatsApp"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">WhatsApp</span>
          </button>

          <button
            type="button"
            onClick={handleCopyReport}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
              copied
                ? 'bg-teal-500 text-slate-950 border-teal-400 font-bold'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Copied Report!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-teal-400" />
                <span>Copy report</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="p-5 sm:p-7 space-y-6">
        {/* Risk Score Gauge & Bar */}
        <div className="p-4 sm:p-5 rounded-xl bg-slate-950/70 border border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Circular SVG Gauge */}
          <div className="flex items-center gap-4">
            <div className="relative w-24 h-24 shrink-0 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                {/* Background circle */}
                <circle
                  cx="50"
                  cy="50"
                  r={radius}
                  fill="transparent"
                  stroke="#1e293b"
                  strokeWidth="8"
                />
                {/* Progress arc */}
                <circle
                  cx="50"
                  cy="50"
                  r={radius}
                  fill="transparent"
                  stroke={scoreDetails.strokeColor}
                  strokeWidth="8"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className={`text-2xl font-black tracking-tight ${scoreDetails.color}`}>
                  {result.score}
                </span>
                <span className="text-[10px] text-slate-500 font-semibold uppercase -mt-1">
                  / 100
                </span>
              </div>
            </div>

            <div>
              <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                Risk Score
              </div>
              <div className={`text-base sm:text-lg font-bold ${scoreDetails.color}`}>
                {scoreDetails.label}
              </div>
              <p className="text-xs text-slate-400 mt-0.5 max-w-xs">
                {result.score <= 30
                  ? 'Appears standard. Always double check sender email domains.'
                  : result.score <= 70
                  ? 'Multiple suspicious elements detected. Do not click links.'
                  : 'Extremely dangerous scam scheme. Never send money or OTPs.'}
              </p>
            </div>
          </div>

          {/* Progress bar fallback/detail */}
          <div className="w-full md:w-56 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Threat Level</span>
              <span className={`font-semibold ${scoreDetails.color}`}>{result.score}%</span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-1000 ease-out ${scoreDetails.barColor}`}
                style={{ width: `${result.score}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>Safe (0)</span>
              <span>Suspicious (50)</span>
              <span>Scam (100)</span>
            </div>
          </div>
        </div>

        {/* Short One-Paragraph Explanation */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-300 uppercase tracking-wider">
            <FileText className="w-4 h-4 text-teal-400" />
            <span>Analysis Explanation</span>
          </div>
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-sm text-slate-200 leading-relaxed">
            {result.explanation}
          </div>
        </div>

        {/* Red Flags Found */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-300 uppercase tracking-wider">
            <AlertCircle className="w-4 h-4 text-rose-400" />
            <span>Red Flags Found ({result.red_flags.length})</span>
          </div>

          {result.red_flags.length > 0 ? (
            <div className="rounded-xl bg-slate-950/60 border border-slate-800 p-3 sm:p-4 divide-y divide-slate-800/60">
              {result.red_flags.map((flag, idx) => (
                <div key={idx} className="py-2.5 first:pt-0 last:pb-0 flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/30 text-xs flex items-center justify-center font-bold shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">{flag}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/30 text-xs text-emerald-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>No obvious scam red flags detected in this text.</span>
            </div>
          )}
        </div>

        {/* What to do next (Checklist) */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-300 uppercase tracking-wider">
              <ListChecks className="w-4 h-4 text-emerald-400" />
              <span>What To Do Next (Safety Checklist)</span>
            </div>
            <span className="text-[11px] text-slate-400">
              Check off as you complete
            </span>
          </div>

          <div className="rounded-xl bg-slate-950/60 border border-slate-800 p-3 sm:p-4 space-y-2.5">
            {result.next_steps.map((step, idx) => {
              const isChecked = Boolean(checkedSteps[idx]);
              return (
                <label
                  key={idx}
                  onClick={() => toggleStep(idx)}
                  className={`flex items-start gap-3 p-2.5 rounded-lg border transition-all cursor-pointer ${
                    isChecked
                      ? 'bg-emerald-950/20 border-emerald-800/40 text-slate-400'
                      : 'bg-slate-900/40 border-slate-800/60 hover:bg-slate-900/80 text-slate-200'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => {}}
                    className="w-4 h-4 rounded text-teal-500 focus:ring-teal-400 focus:ring-offset-slate-900 border-slate-700 bg-slate-800 shrink-0 mt-0.5 cursor-pointer"
                  />
                  <span
                    className={`text-xs sm:text-sm leading-relaxed ${
                      isChecked ? 'line-through text-slate-400' : 'text-slate-200'
                    }`}
                  >
                    {step}
                  </span>
                </label>
              );
            })}
          </div>
        </div>

        {/* India Cybercrime Emergency Helpline Callout */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-rose-950/30 via-slate-950 to-indigo-950/30 border border-rose-500/20 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-rose-500/20 text-rose-300 shrink-0">
              <PhoneCall className="w-4 h-4 text-rose-400" />
            </div>
            <div>
              <p className="text-xs font-semibold text-white">
                Fallen for a fraud or lost money? Act within 2 hours!
              </p>
              <p className="text-[11px] text-slate-400">
                Call India&apos;s National Cyber Crime Helpline{' '}
                <strong className="text-rose-300 font-bold">1930</strong> immediately to freeze recipient bank accounts.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href="tel:1930"
              className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center gap-1.5 transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Call 1930</span>
            </a>
            <a
              href="https://cybercrime.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium flex items-center gap-1 transition-colors"
            >
              <span>cybercrime.gov.in</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
