export type Verdict = 'safe' | 'suspicious' | 'scam';

export type Language = 'English' | 'Kannada' | 'Hindi';

export interface AnalysisResult {
  verdict: Verdict;
  score: number;
  red_flags: string[];
  next_steps: string[];
  explanation: string;
}

export interface SampleItem {
  id: string;
  category: string;
  label: string;
  text: string;
  type: 'scam' | 'phishing' | 'recruiter' | 'kyc' | 'genuine';
  shortDesc: string;
}

export interface CommonScamItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  sampleText: string;
  warningSigns: string[];
  badge: string;
}
