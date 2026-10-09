# Scam Shield 🛡️
> An AI-powered scam detection tool designed for Indian college students to verify internship offers, paid job traps, scholarship phishing links, fake WhatsApp/Telegram recruiters, and banking KYC alerts.

---

## 🚩 The Problem

Every academic season in India, millions of college undergraduates, engineering students, and freshers receive unsolicited messages on WhatsApp, Telegram, SMS, and email. 

Cyber fraudsters exploit students' eagerness for internships and financial independence through schemes like:
- **Fake Internship Registration Fees:** Requiring Rs 1,500 – Rs 3,000 for "seat confirmation", "security deposit", or "laptop delivery".
- **Scholarship & Grant Phishing:** Sending shortened links (`bit.ly`, `.xyz`) claiming pending grants to steal NetBanking/UPI credentials.
- **Fake Part-Time Recruiters:** Promising "Rs 5,000/day for data entry or YouTube likes", then asking for Aadhaar scans and upfront deposits.
- **Urgent Bank KYC / SIM Block Threats:** Frightening students with immediate account freezes to extract OTPs or deploy screen-sharing software.

Students often don't know who to consult or how to evaluate these messages before losing their savings.

---

## 💡 The Solution: Scam Shield

**Scam Shield** is a lightweight, responsive web application where Indian college students can paste any suspicious message text or upload an unedited screenshot. 

Within seconds, the application analyzes the text, links, payment demands, and tone against recognized fraud patterns in India and delivers:
1. **Clear Verdict:** "Looks Safe" (Green), "Suspicious" (Amber), or "Scam" (Red).
2. **Animated Risk Score (0–100):** Visual gauge indicating fraud probability.
3. **Red Flags Breakdown:** Plain-language bullet points explaining exactly why the message is dubious (e.g. upfront fee, free email domain, shortened URL).
4. **Actionable Checklist:** Interactive steps the student should take immediately (e.g. block sender, do not pay, call helpline 1930).
5. **Multi-Language Guidance:** Supports **English**, **Kannada (ಕನ್ನಡ)**, and **Hindi (हिन्दी)**.
6. **One-Click Share & Copy:** Easily copy the full audit report or share directly to WhatsApp to warn batchmates.
7. **Emergency Helpline Access:** Direct dial to India's National Cyber Crime Helpline (`1930`) and portal (`cybercrime.gov.in`).

---

## 🤖 How Gemini AI is Used

Scam Shield leverages the Google GenAI SDK (`@google/genai`) running on the server side using the `gemini-2.5-flash` model:
- **Multimodal Analysis:** Analyzes both raw message text and uploaded screenshots (JPEG/PNG/WebP) in a single request.
- **Structured JSON Output:** Strict JSON schema enforcement ensuring deterministic response structures (`verdict`, `score`, `red_flags`, `next_steps`, `explanation`).
- **Domain-Specific System Instruction:** Primed specifically to recognize Indian student fraud patterns (Aadhaar/PAN harvesting, UPI reverse requests, fake tech giants, free Gmail recruiter handles).
- **Localized Multilingual Output:** Outputs all red flags, explanations, and safety checklists in the student's chosen language (English, Kannada, or Hindi).
- **Zero API Key Leakage:** The Gemini API is called strictly through the server-side Express proxy (`/api/analyze`), keeping user credentials secure.

---

## 🛠️ Tech Stack

- **Frontend:** React 19, TypeScript, Tailwind CSS v4, Lucide React icons
- **Backend:** Express, Node.js, `tsx`
- **AI Engine:** Google Gemini (`gemini-2.5-flash` via official `@google/genai` SDK)
- **Tooling:** Vite, ESBuild

---

## ✨ Features

- **5 One-Click Sample Presets:** Try common student scenarios immediately:
  1. Fake Google internship fee trap
  2. Scholarship phishing link
  3. Part-time data entry recruiter
  4. Urgent Bank KYC blocking SMS
  5. Genuine college lab record submission notice
- **Screenshot Drag & Drop:** Upload screenshots of WhatsApp or Telegram conversations up to 4 MB with thumbnail preview.
- **Interactive Safety Checklist:** Check off protective actions in real-time.
- **Report Export & Sharing:** Copy structured report or forward warning to WhatsApp groups.
- **Student Scam Guide:** Educational cards breaking down common student scams, warning signs, and prevention tips.
- **Responsible Guidance:** Clear disclaimers and immediate referral to India's National Cyber Crime helpline `1930`.

---

## ⚖️ Disclaimer

*Scam Shield provides automated guidance and risk assessment, not a legal or absolute guarantee. When in doubt, always verify directly with the official company or college department.*
