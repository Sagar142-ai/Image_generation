import React, { useState } from 'react';
import { Wand2, Brain, Dice5, Trash2, Check, Sparkles, ChevronDown, BookOpen } from 'lucide-react';
import { PROMPT_TEMPLATES } from '../data/presets';

interface PromptInputProps {
  prompt: string;
  setPrompt: (value: string) => void;
  enableEnhancement: boolean;
  setEnableEnhancement: (val: boolean) => void;
  onAnalyzePrompt: () => void;
  onEnhancePrompt: () => void;
  isEnhancing: boolean;
  isAnalyzing: boolean;
}

export const PromptInput: React.FC<PromptInputProps> = ({
  prompt,
  setPrompt,
  enableEnhancement,
  setEnableEnhancement,
  onAnalyzePrompt,
  onEnhancePrompt,
  isEnhancing,
  isAnalyzing,
}) => {
  const [showTemplatesDropdown, setShowTemplatesDropdown] = useState(false);
  const [copiedNotification, setCopiedNotification] = useState(false);

  const handleSurpriseMe = () => {
    const randomTemplate = PROMPT_TEMPLATES[Math.floor(Math.random() * PROMPT_TEMPLATES.length)];
    setPrompt(randomTemplate.sample_output_prompt);
  };

  const handleSelectTemplate = (samplePrompt: string) => {
    setPrompt(samplePrompt);
    setShowTemplatesDropdown(false);
  };

  const wordCount = prompt.trim() ? prompt.trim().split(/\s+/).length : 0;
  const charCount = prompt.length;

  return (
    <div className="space-y-3 rounded-2xl border border-slate-800 bg-slate-900/80 p-4 sm:p-5 shadow-xl shadow-slate-950/40 backdrop-blur-md">
      {/* Top action row */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <label htmlFor="main-prompt-input" className="flex items-center gap-2 text-sm font-semibold text-slate-200">
          <Sparkles className="h-4 w-4 text-indigo-400" />
          <span>Text Prompt</span>
          <span className="text-xs font-normal text-slate-400">(Natural Language Description)</span>
        </label>

        <div className="flex items-center gap-1.5">
          {/* Templates Dropdown Button */}
          <div className="relative">
            <button
              type="button"
              id="prompt-templates-trigger-btn"
              onClick={() => setShowTemplatesDropdown(!showTemplatesDropdown)}
              className="flex items-center gap-1 rounded-lg border border-slate-700 bg-slate-800/80 px-2.5 py-1 text-xs font-medium text-slate-300 transition hover:bg-slate-700 hover:text-white"
            >
              <BookOpen className="h-3.5 w-3.5 text-indigo-400" />
              <span>Presets</span>
              <ChevronDown className="h-3 w-3 text-slate-400" />
            </button>

            {showTemplatesDropdown && (
              <div className="absolute right-0 top-full z-50 mt-1.5 w-80 max-h-72 overflow-y-auto rounded-xl border border-slate-700 bg-slate-900 p-2 shadow-2xl">
                <div className="mb-2 px-2 py-1 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  Quick Load Prompt Templates
                </div>
                <div className="space-y-1">
                  {PROMPT_TEMPLATES.map((tmpl) => (
                    <button
                      key={tmpl.id}
                      type="button"
                      onClick={() => handleSelectTemplate(tmpl.sample_output_prompt)}
                      className="w-full rounded-lg p-2 text-left transition hover:bg-slate-800"
                    >
                      <div className="flex items-center justify-between text-xs font-medium text-indigo-300">
                        <span>{tmpl.title}</span>
                        <span className="rounded bg-slate-800 px-1.5 py-0.5 text-[10px] text-slate-400">
                          {tmpl.category}
                        </span>
                      </div>
                      <p className="mt-1 line-clamp-2 text-[11px] text-slate-400">
                        {tmpl.sample_output_prompt}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Surprise Me Button */}
          <button
            type="button"
            id="surprise-me-prompt-btn"
            onClick={handleSurpriseMe}
            className="flex items-center gap-1 rounded-lg border border-purple-500/30 bg-purple-500/10 px-2.5 py-1 text-xs font-medium text-purple-300 transition hover:bg-purple-500/20 hover:text-white"
            title="Load an inspiring prompt"
          >
            <Dice5 className="h-3.5 w-3.5" />
            <span>Randomize</span>
          </button>

          {/* Clear prompt */}
          {prompt.length > 0 && (
            <button
              type="button"
              id="clear-prompt-btn"
              onClick={() => setPrompt('')}
              className="rounded-lg p-1 text-slate-400 transition hover:bg-slate-800 hover:text-red-400"
              title="Clear input"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Textarea Input */}
      <div className="relative">
        <textarea
          id="main-prompt-input"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g. A futuristic cybernetic tiger with glowing neon blue stripes walking through a rain-slicked Tokyo alleyway at night, 8k resolution, cinematic lighting..."
          rows={4}
          className="w-full resize-none rounded-xl border border-slate-700/80 bg-slate-950/90 p-3.5 text-sm text-slate-100 placeholder-slate-500 transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 font-sans leading-relaxed"
        />

        {/* Word and character counter */}
        <div className="absolute bottom-2.5 right-3 flex items-center gap-2 text-[11px] text-slate-500">
          <span>{wordCount} words</span>
          <span>•</span>
          <span className={charCount > 1200 ? 'text-amber-400 font-semibold' : ''}>
            {charCount}/1500
          </span>
        </div>
      </div>

      {/* Intelligent Actions Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 pt-1">
        {/* Prompt Enhancer toggle */}
        <label className="flex cursor-pointer items-center gap-2 text-xs font-medium text-slate-300 select-none">
          <input
            type="checkbox"
            id="prompt-enhancement-checkbox"
            checked={enableEnhancement}
            onChange={(e) => setEnableEnhancement(e.target.checked)}
            className="h-4 w-4 rounded border-slate-700 bg-slate-800 text-indigo-600 focus:ring-indigo-500"
          />
          <span>Auto-Enhance Prompt with Diffusion Modifiers</span>
        </label>

        {/* AI Helper buttons */}
        <div className="flex items-center gap-2">
          {/* Analyze Prompt */}
          <button
            type="button"
            id="analyze-prompt-action-btn"
            onClick={onAnalyzePrompt}
            disabled={!prompt.trim() || isAnalyzing}
            className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-200 transition hover:border-slate-600 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Brain className={`h-3.5 w-3.5 text-pink-400 ${isAnalyzing ? 'animate-spin' : ''}`} />
            <span>{isAnalyzing ? 'Analyzing...' : 'Analyze Structure'}</span>
          </button>

          {/* Instant AI Expand */}
          <button
            type="button"
            id="enhance-prompt-action-btn"
            onClick={onEnhancePrompt}
            disabled={!prompt.trim() || isEnhancing}
            className="flex items-center gap-1.5 rounded-lg border border-indigo-500/40 bg-gradient-to-r from-indigo-600/30 to-purple-600/30 px-3 py-1.5 text-xs font-medium text-indigo-200 transition hover:from-indigo-600/50 hover:to-purple-600/50 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Wand2 className={`h-3.5 w-3.5 text-indigo-300 ${isEnhancing ? 'animate-spin' : ''}`} />
            <span>{isEnhancing ? 'Expanding...' : 'AI Expand Prompt'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
