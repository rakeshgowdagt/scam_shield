import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

// Allow payloads up to 10MB to support base64 screenshot uploads
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoint
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    hasApiKey: Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'your_key_here'),
  });
});

// Scam analysis endpoint
app.post('/api/analyze', async (req, res) => {
  try {
    const { text, image, language = 'English' } = req.body;

    if (!text && !image) {
      return res.status(400).json({
        error: 'Please provide either message text or a screenshot to analyze.',
      });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === 'your_key_here') {
      return res.status(500).json({
        error: 'GEMINI_API_KEY is not configured on the server. Please set your Gemini API key in the environment variables or Secrets panel.',
      });
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    const parts: any[] = [];

    if (image && image.data && image.mimeType) {
      // Validate supported mime types
      const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
      if (!allowedTypes.includes(image.mimeType.toLowerCase())) {
        return res.status(400).json({
          error: 'Unsupported image format. Please upload a PNG, JPEG, or WebP screenshot.',
        });
      }

      // Clean base64 string if it contains data URI prefix
      const cleanBase64 = image.data.replace(/^data:image\/[a-zA-Z]+;base64,/, '');

      parts.push({
        inlineData: {
          mimeType: image.mimeType,
          data: cleanBase64,
        },
      });
    }

    const userPrompt = [
      `User Selected Language: ${language}`,
      text
        ? `Message Text to Analyze:\n"""\n${text}\n"""`
        : `Note: The student uploaded a screenshot without text. Please transcribe and inspect all visible text, sender details, phone numbers, links, and design elements in the screenshot.`,
      `Provide your output in valid JSON matching the requested schema. Ensure red_flags, next_steps, and explanation are fully written in ${language}.`,
    ].join('\n\n');

    parts.push({
      text: userPrompt,
    });

    const systemInstruction =
      "You are Scam Shield, a scam-detection assistant for Indian college students. Analyze the message (and screenshot if provided) for scams such as fake internships, paid job offers, scholarship or KYC phishing, fake recruiters, and lottery fraud. Check for: upfront fees or 'registration/security deposit' payments, urgency or threats, suspicious or shortened links, free email domains (gmail, yahoo) posing as companies, requests for OTP/Aadhaar/PAN/bank details, unrealistic pay for little work, poor grammar, and unverifiable company claims. Write red_flags, next_steps, and explanation in the requested language. If unsure, choose 'suspicious' and say what the user should verify. Never claim absolute certainty. Include India-specific next steps where relevant (cybercrime.gov.in, helpline 1930).";

    const responseSchema = {
      type: Type.OBJECT,
      properties: {
        verdict: {
          type: Type.STRING,
          description: "Must be 'safe', 'suspicious', or 'scam'",
        },
        score: {
          type: Type.INTEGER,
          description: 'Risk score from 0 (completely safe) to 100 (high risk / scam)',
        },
        red_flags: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
          description: 'List of plain-language bullet points explaining red flags in the requested language',
        },
        next_steps: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
          description: 'Actionable checklist of what to do next in the requested language',
        },
        explanation: {
          type: Type.STRING,
          description: 'A short one-paragraph explanation in the requested language',
        },
      },
      required: ['verdict', 'score', 'red_flags', 'next_steps', 'explanation'],
    };

    // List of models to try in order of preference
    const candidateModels = [
      'gemini-2.5-flash',
      'gemini-3.8-flash',
      'gemini-flash-latest',
      'gemini-3.1-flash-lite',
    ];

    let response: any = null;
    let lastError: any = null;

    for (const modelName of candidateModels) {
      try {
        response = await ai.models.generateContent({
          model: modelName,
          contents: { parts },
          config: {
            systemInstruction,
            responseMimeType: 'application/json',
            responseSchema,
          },
        });

        if (response && response.text) {
          break; // successfully received output
        }
      } catch (err: any) {
        lastError = err;
        console.warn(`Model ${modelName} returned error, attempting next candidate:`, err?.message || err);
        // Small delay before trying next model
        await new Promise((resolve) => setTimeout(resolve, 600));
      }
    }

    if (!response || !response.text) {
      throw lastError || new Error('Received an empty response from all AI models.');
    }

    const textOutput = response.text;
    if (!textOutput) {
      throw new Error('Received an empty response from the AI model.');
    }

    let parsedData: any;
    try {
      parsedData = JSON.parse(textOutput);
    } catch {
      // In case of any leading/trailing markdown code fences
      const cleanJson = textOutput.replace(/```json/g, '').replace(/```/g, '').trim();
      parsedData = JSON.parse(cleanJson);
    }

    // Normalize verdict
    let verdict: 'safe' | 'suspicious' | 'scam' = 'suspicious';
    const rawVerdict = String(parsedData.verdict || '').toLowerCase();
    if (rawVerdict.includes('safe')) {
      verdict = 'safe';
    } else if (rawVerdict.includes('scam')) {
      verdict = 'scam';
    } else {
      verdict = 'suspicious';
    }

    // Normalize score 0-100
    let score = Number(parsedData.score);
    if (isNaN(score)) {
      score = verdict === 'scam' ? 85 : verdict === 'suspicious' ? 55 : 10;
    }
    score = Math.max(0, Math.min(100, Math.round(score)));

    // Ensure red_flags & next_steps are valid arrays
    const red_flags = Array.isArray(parsedData.red_flags)
      ? parsedData.red_flags.map((item: any) => String(item).trim()).filter(Boolean)
      : [];

    const next_steps = Array.isArray(parsedData.next_steps)
      ? parsedData.next_steps.map((item: any) => String(item).trim()).filter(Boolean)
      : [];

    const explanation = String(parsedData.explanation || '').trim();

    return res.json({
      verdict,
      score,
      red_flags,
      next_steps,
      explanation,
    });
  } catch (error: any) {
    console.error('Scam Shield API Error:', error);
    return res.status(500).json({
      error: error?.message || 'Failed to analyze the message. Please try again.',
    });
  }
});

// Vite dev server middleware or static serving
async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Scam Shield server listening on port ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
