import React from 'react';
import { Shield, PhoneCall, ExternalLink, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-16 border-t border-slate-800/80 bg-slate-950/80 py-10 px-4">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500 to-indigo-600 flex items-center justify-center text-white">
              <Shield className="w-4 h-4" />
            </div>
            <span className="text-sm font-bold text-slate-200">Scam Shield</span>
            <span className="text-xs text-slate-500">• Indian Student Security Initiative</span>
          </div>

          <div className="flex items-center gap-4 text-xs text-slate-400">
            <a
              href="tel:1930"
              className="flex items-center gap-1.5 hover:text-rose-400 transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5 text-rose-400" />
              <span>National Helpline: 1930</span>
            </a>
            <a
              href="https://cybercrime.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-teal-400 transition-colors"
            >
              <span>cybercrime.gov.in</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Required disclaimer from brief */}
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 text-center">
          <p className="text-xs text-slate-400 leading-relaxed">
            <strong className="text-slate-300 font-semibold">Important Disclaimer:</strong>{' '}
            Scam Shield gives guidance, not a guarantee. When in doubt, verify with the official source.
          </p>
          <p className="text-[11px] text-slate-500 mt-1">
            Never pay registration fees for job interviews or internships. Legitimate tech firms, government departments, and universities never ask for money or OTPs via WhatsApp.
          </p>
        </div>

        <div className="text-center text-[11px] text-slate-600 flex items-center justify-center gap-1">
          <span>Built for students across India with Gemini AI</span>
          <span>•</span>
          <span className="flex items-center gap-1">
            Stay safe online <Heart className="w-3 h-3 text-rose-500 inline fill-rose-500" />
          </span>
        </div>
      </div>
    </footer>
  );
};
