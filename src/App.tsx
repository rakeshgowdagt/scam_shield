import React, { useState, useRef } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { SampleChips } from './components/SampleChips';
import { ScannerForm } from './components/ScannerForm';
import { LoadingSkeleton } from './components/LoadingSkeleton';
import { ResultCard } from './components/ResultCard';
import { HowItWorks } from './components/HowItWorks';
import { CommonScams } from './components/CommonScams';
import { Footer } from './components/Footer';
import { AnalysisResult, Language, SampleItem } from './types';

export default function App() {
  const [text, setText] = useState<string>('');
  const [image, setImage] = useState<{
    mimeType: string;
    data: string;
    name: string;
    size: number;
  } | null>(null);
  const [language, setLanguage] = useState<Language>('English');
  const [selectedSampleId, setSelectedSampleId] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [lastAnalyzedSnapshot, setLastAnalyzedSnapshot] = useState<{
    text: string;
    hasImage: boolean;
  } | null>(null);

  const resultRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const handleSelectSample = (sample: SampleItem) => {
    setText(sample.text);
    setSelectedSampleId(sample.id);
    setErrorMessage(null);
    setResult(null);

    // Scroll slightly to form if needed
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  const handleLoadScamSample = (sampleText: string) => {
    setText(sampleText);
    setSelectedSampleId(null);
    setErrorMessage(null);
    setResult(null);

    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleReset = () => {
    setText('');
    setImage(null);
    setSelectedSampleId(null);
    setResult(null);
    setErrorMessage(null);
    setLastAnalyzedSnapshot(null);
  };

  const handleCheckMessage = async () => {
    if (!text.trim() && !image) {
      setErrorMessage('Please paste a message or upload a screenshot to check.');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);
    setResult(null);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: text.trim(),
          image: image
            ? {
                mimeType: image.mimeType,
                data: image.data,
              }
            : undefined,
          language,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to analyze message. Please try again.');
      }

      setResult(data);
      setLastAnalyzedSnapshot({
        text,
        hasImage: Boolean(image),
      });

      // Scroll smoothly to results
      setTimeout(() => {
        if (resultRef.current) {
          resultRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } catch (err: any) {
      console.error('Analysis failed:', err);
      setErrorMessage(
        err.message || 'An unexpected error occurred while communicating with Scam Shield AI.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-teal-500 selection:text-slate-950">
      {/* Top Header */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6">
        {/* Hero Section */}
        <Hero />

        {/* Scanner Container */}
        <div ref={formRef} className="mt-4 sm:mt-6 max-w-4xl mx-auto space-y-4">
          {/* Sample Message Chips */}
          <SampleChips
            onSelectSample={handleSelectSample}
            selectedSampleId={selectedSampleId}
          />

          {/* Form */}
          <ScannerForm
            text={text}
            onTextChange={(newText) => {
              setText(newText);
              setSelectedSampleId(null);
            }}
            image={image}
            onImageChange={(newImg) => {
              setImage(newImg);
              setErrorMessage(null);
            }}
            language={language}
            onLanguageChange={setLanguage}
            onSubmit={handleCheckMessage}
            onReset={handleReset}
            isLoading={isLoading}
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
          />
        </div>

        {/* Dynamic Result / Loading View */}
        <div ref={resultRef} className="mt-8 max-w-4xl mx-auto">
          {isLoading && <LoadingSkeleton />}

          {result && !isLoading && (
            <ResultCard
              result={result}
              analyzedText={lastAnalyzedSnapshot?.text}
              hasImage={lastAnalyzedSnapshot?.hasImage}
            />
          )}
        </div>

        {/* How It Works Section */}
        <div className="max-w-4xl mx-auto">
          <HowItWorks />
        </div>

        {/* Common Student Scams in India Section */}
        <div className="max-w-4xl mx-auto">
          <CommonScams onLoadScamSample={handleLoadScamSample} />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
