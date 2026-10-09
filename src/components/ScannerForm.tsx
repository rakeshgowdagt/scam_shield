import React, { useRef, useState } from 'react';
import {
  Upload,
  X,
  FileImage,
  Globe2,
  ShieldCheck,
  RotateCcw,
  AlertTriangle,
  FileText,
} from 'lucide-react';
import { Language } from '../types';

interface ScannerFormProps {
  text: string;
  onTextChange: (newText: string) => void;
  image: { mimeType: string; data: string; name: string; size: number } | null;
  onImageChange: (
    image: { mimeType: string; data: string; name: string; size: number } | null
  ) => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onSubmit: () => void;
  onReset: () => void;
  isLoading: boolean;
  errorMessage: string | null;
  setErrorMessage: (msg: string | null) => void;
}

const MAX_FILE_SIZE_BYTES = 4 * 1024 * 1024; // 4 MB

export const ScannerForm: React.FC<ScannerFormProps> = ({
  text,
  onTextChange,
  image,
  onImageChange,
  language,
  onLanguageChange,
  onSubmit,
  onReset,
  isLoading,
  errorMessage,
  setErrorMessage,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileProcess = (file: File) => {
    setErrorMessage(null);

    // Validate size
    if (file.size > MAX_FILE_SIZE_BYTES) {
      setErrorMessage(
        `File is too large (${(file.size / (1024 * 1024)).toFixed(1)} MB). Screenshot uploads are limited to 4 MB.`
      );
      return;
    }

    // Validate type
    const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
    if (!validTypes.includes(file.type.toLowerCase())) {
      setErrorMessage(
        'Unsupported image format. Please upload a PNG, JPG, or WebP screenshot.'
      );
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        onImageChange({
          mimeType: file.type,
          data: result,
          name: file.name,
          size: file.size,
        });
      }
    };
    reader.onerror = () => {
      setErrorMessage('Failed to read image file. Please try again.');
    };
    reader.readAsDataURL(file);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileProcess(file);
    }
    // reset input so the same file can be picked again if removed
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileProcess(file);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() && !image) {
      setErrorMessage('Please paste a message or upload a screenshot to check.');
      return;
    }
    setErrorMessage(null);
    onSubmit();
  };

  return (
    <form
      onSubmit={handleSubmitForm}
      className="p-5 sm:p-7 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl backdrop-blur-xl relative"
    >
      {/* Top Header / Language Selection */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800/80 mb-5">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-teal-400" />
          <h2 className="text-base font-semibold text-white tracking-wide">
            Analyze Suspicious Message or Screenshot
          </h2>
        </div>

        {/* Language selector */}
        <div className="flex items-center gap-2">
          <Globe2 className="w-4 h-4 text-slate-400 shrink-0" />
          <span className="text-xs text-slate-400">Output Language:</span>
          <div className="inline-flex rounded-lg bg-slate-950 p-1 border border-slate-800">
            {(
              [
                { id: 'English', label: 'English' },
                { id: 'Kannada', label: 'ಕನ್ನಡ (Kannada)' },
                { id: 'Hindi', label: 'हिन्दी (Hindi)' },
              ] as const
            ).map((lang) => (
              <button
                key={lang.id}
                type="button"
                onClick={() => onLanguageChange(lang.id)}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all cursor-pointer ${
                  language === lang.id
                    ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Text Area */}
      <div className="space-y-2 mb-4">
        <label
          htmlFor="message-text"
          className="block text-xs font-medium text-slate-300"
        >
          Message Content (WhatsApp, Telegram, SMS, or Email):
        </label>
        <div className="relative">
          <textarea
            id="message-text"
            rows={4}
            value={text}
            onChange={(e) => {
              onTextChange(e.target.value);
              if (errorMessage) setErrorMessage(null);
            }}
            placeholder="Paste the suspicious message here... e.g., 'Congratulations! You are selected for Google internship. Pay Rs 2,500 fee...'"
            className="w-full rounded-xl bg-slate-950/90 border border-slate-800 p-3.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/40 focus:border-teal-500 transition-all resize-y min-h-[110px]"
          />
          {text.length > 0 && (
            <div className="absolute bottom-2.5 right-3 text-[11px] text-slate-500 pointer-events-none">
              {text.length} characters
            </div>
          )}
        </div>
      </div>

      {/* Screenshot Upload & Preview */}
      <div className="space-y-2 mb-6">
        <div className="flex items-center justify-between">
          <label className="block text-xs font-medium text-slate-300">
            Attach Screenshot (Optional, max 4 MB):
          </label>
          <span className="text-[11px] text-slate-500">
            Supports PNG, JPG, WebP
          </span>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/jpg,image/webp"
          onChange={handleFileInputChange}
          className="hidden"
          id="screenshot-file-upload"
        />

        {!image ? (
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-all ${
              isDragging
                ? 'border-teal-400 bg-teal-500/10'
                : 'border-slate-800 hover:border-slate-700 bg-slate-950/40 hover:bg-slate-950/70'
            }`}
          >
            <div className="flex flex-col items-center justify-center gap-1.5">
              <div className="p-2.5 rounded-full bg-slate-800/60 text-slate-400">
                <Upload className="w-4 h-4 text-teal-400" />
              </div>
              <p className="text-xs text-slate-300 font-medium">
                Drag & drop a screenshot here, or{' '}
                <span className="text-teal-400 underline underline-offset-2">
                  browse files
                </span>
              </p>
              <p className="text-[11px] text-slate-500">
                Upload WhatsApp chat, Telegram screenshot, or email header (max 4 MB)
              </p>
            </div>
          </div>
        ) : (
          <div className="rounded-xl bg-slate-950/80 border border-slate-800 p-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-slate-900 shrink-0 border border-slate-800">
                <img
                  src={image.data}
                  alt="Uploaded screenshot preview"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="truncate">
                <div className="flex items-center gap-1.5">
                  <FileImage className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                  <span className="text-xs font-semibold text-slate-200 truncate">
                    {image.name}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Size: {formatFileSize(image.size)} • Ready for analysis
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onImageChange(null)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors shrink-0 cursor-pointer"
              title="Remove screenshot"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Error Message */}
      {errorMessage && (
        <div className="mb-5 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2.5 animate-fadeIn">
          <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-semibold text-rose-200">Unable to Proceed</p>
            <p className="mt-0.5 leading-relaxed">{errorMessage}</p>
          </div>
        </div>
      )}

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
        <button
          type="button"
          onClick={onReset}
          disabled={isLoading || (!text && !image)}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 text-xs font-medium transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Clear / Reset</span>
        </button>

        <button
          type="submit"
          disabled={isLoading || (!text.trim() && !image)}
          className="w-full sm:w-auto min-w-[200px] flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-teal-500 via-emerald-500 to-indigo-600 hover:from-teal-400 hover:to-indigo-500 text-white font-semibold text-sm shadow-lg shadow-teal-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Checking with Gemini...</span>
            </>
          ) : (
            <>
              <ShieldCheck className="w-4 h-4" />
              <span>Check Message</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
};
