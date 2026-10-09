import { SampleItem, CommonScamItem } from '../types';

export const SAMPLE_MESSAGES: SampleItem[] = [
  {
    id: 'fake-internship',
    category: 'Fake Internship',
    label: 'Fake Internship Offer',
    shortDesc: 'Google Rs 40k / Rs 2,500 fee',
    text: 'Congratulations! You are selected for a Google internship, Rs 40,000/month. Pay Rs 2,500 registration fee to confirm your seat today. Contact HR on WhatsApp.',
    type: 'scam',
  },
  {
    id: 'scholarship-phishing',
    category: 'Scholarship Phishing',
    label: 'Scholarship Phishing Link',
    shortDesc: 'Rs 25k pending bit.ly link',
    text: 'Your scholarship of Rs 25,000 is pending. Verify your bank details at bit.ly/scholar-claim within 24 hours or it will be cancelled.',
    type: 'phishing',
  },
  {
    id: 'fake-recruiter',
    category: 'Fake Recruiter',
    label: 'Fake Recruiter / Work From Home',
    shortDesc: 'Rs 5,000/day + Aadhaar & deposit',
    text: 'Hi, we are hiring part-time data entry. Earn Rs 5,000 daily from home. Just send your Aadhaar and a refundable deposit of Rs 1,000.',
    type: 'recruiter',
  },
  {
    id: 'kyc-scam',
    category: 'KYC Scam',
    label: 'Bank Account KYC Scam',
    shortDesc: 'Account blocked today SMS',
    text: 'Dear customer, your bank account will be blocked today. Update KYC immediately: http://sbi-kyc-update.xyz',
    type: 'kyc',
  },
  {
    id: 'genuine-college',
    category: 'Genuine Message',
    label: 'Genuine College Notice',
    shortDesc: 'Lab record submission notice',
    text: 'Reminder: The Cloud Computing lab record submission is on Friday at 10 AM in Lab 3. - Dept. Office',
    type: 'genuine',
  },
];

export const COMMON_SCAMS: CommonScamItem[] = [
  {
    id: 'internship-fees',
    title: 'Upfront Fee for Internship / Job',
    subtitle: 'Pay "refundable deposit" or "training fee" to secure seat',
    description:
      'Scammers impersonate top tech firms or MNCs. They offer lucrative stipends (Rs 30,000–50,000/mo) but demand Rs 1,500 to Rs 5,000 for "document verification", "laptop security deposit", or "ID badge creation".',
    sampleText:
      'Congratulations! You are selected for a Google internship, Rs 40,000/month. Pay Rs 2,500 registration fee to confirm your seat today. Contact HR on WhatsApp.',
    badge: 'High Frequency',
    warningSigns: [
      'Genuine companies never charge application or registration fees',
      'Interviews happen only via personal WhatsApp or Telegram chats',
      'Unofficial email addresses like google.hr.recruitment@gmail.com',
    ],
  },
  {
    id: 'scholarship-links',
    title: 'Scholarship / Grant Phishing Links',
    subtitle: 'Urgent claims via bit.ly, tinyurl, or suspicious .xyz domains',
    description:
      'Messages claim your government or corporate scholarship (e.g. NSP, PMSSS, or college merit fund) is on hold. They send shortened links that mimic bank login pages or prompt you to approve a reverse UPI request.',
    sampleText:
      'Your scholarship of Rs 25,000 is pending. Verify your bank details at bit.ly/scholar-claim within 24 hours or it will be cancelled.',
    badge: 'Data Theft',
    warningSigns: [
      'Creates fake urgency (e.g., "within 24 hours or cancelled")',
      'Shortened URLs concealing the true destination',
      'Asks for NetBanking password, debit card CVV, or UPI PIN',
    ],
  },
  {
    id: 'fake-recruiters',
    title: 'Fake Recruiters & Part-Time Task Scams',
    subtitle: '"Earn Rs 3,000–8,000/day by liking videos or typing"',
    description:
      'Unsolicited WhatsApp/Telegram pings offering part-time data entry or YouTube review jobs. Once lured, students are asked to send Aadhaar scans and pay "refundable security deposits" or join shady crypto recharge schemes.',
    sampleText:
      'Hi, we are hiring part-time data entry. Earn Rs 5,000 daily from home. Just send your Aadhaar and a refundable deposit of Rs 1,000.',
    badge: 'Identity Theft',
    warningSigns: [
      'Unrealistic salary for minimal unskilled work',
      'Asks for Aadhaar/PAN cards before any written contract',
      'Demands deposit money before unlocking payout balance',
    ],
  },
  {
    id: 'kyc-otp-threats',
    title: 'Bank KYC / SIM Deactivation Threats',
    subtitle: 'Fear tactics threatening immediate bank account freeze',
    description:
      'Aggressive SMS or WhatsApp messages claiming your SBI, HDFC, or Paytm account is blocked due to pending KYC. The malicious link prompts users to enter card numbers or download remote screen-sharing apps (AnyDesk, TeamViewer).',
    sampleText:
      'Dear customer, your bank account will be blocked today. Update KYC immediately: http://sbi-kyc-update.xyz',
    badge: 'Financial Fraud',
    warningSigns: [
      'Banks never ask for KYC updates via unofficial URLs',
      'Links hosted on strange domains like .xyz, .top, or .buzz',
      'Threatens immediate freezing or deactivation within hours',
    ],
  },
];
