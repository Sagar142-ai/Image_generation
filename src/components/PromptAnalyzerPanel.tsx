import React, { useState } from 'react';
import { Brain, CheckCircle2, AlertTriangle, Sparkles, Plus, ArrowRight, Lightbulb, RefreshCw } from 'lucide-react';
import { PromptAnalysis } from '../types';

interface PromptAnalyzerPanelProps {
  prompt: string;
  setPrompt: (value: string) => void;
  analysis: PromptAnalysis | null;
  isAnalyzing: boolean;
  onAnalyze: () => void;
  onApplyEnhancement: () => void;
  onLoadInStudio: () => void;
}

export const PromptAnalyzerPanel: React.FC<PromptAnalyzerPanelProps> = ({
  prompt,
  setPrompt,
  analysis,
  isAnalyzing,
  onAnalyze,
  onApplyEnhancement,
  onLoadInStudio,
}) => {
  const [customInput, setCustomInput] = useState(prompt);

  const handleRunAnalysis = () => {
    setPrompt(customInput);
    onAnalyze();
  };

  const handleAddMissingTag = (missingItem: string) => {
    let addition = '';
    if (missingItem.toLowerCase().includes('environment')) {
      addition = 'in a lush misty pine forest with sunbeams';
    } else if (missingItem.toLowerCase().includes('lighting')) {
      addition = 'dramatic volumetric rim lighting, golden hour glow';
    } else if (missingItem.toLowerCase().includes('camera') || missingItem.toLowerCase().includes('composition')) {
      addition = 'shot on 35mm lens, f/1.8, shallow depth of field, centered';
    } else if (missingItem.toLowerCase().includes('quality')) {
      addition = '8k resolution, highly detailed textures, masterpiece';
    } else {
      addition = 'atmospheric depth, award-winning visual composition';
    }

    const updated = prompt.trim() ? `${prompt.trim()}, ${addition}` : addition;
    setPrompt(updated);
    setCustomInput(updated);
  };

  // Score color and rating
  const score = analysis?.strength_score || 0;
  let scoreBadge = { label: 'Needs Detail', color: 'text-amber-400 border-amber-500/30 bg-amber-500/10' };
  if (score >= 85) {
    scoreBadge = { label: 'Masterclass Prompt', color: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10' };
  } else if (score >= 60) {
    scoreBadge = { label: 'Strong Prompt', color: 'text-indigo-400 border-indigo-500/30 bg-indigo-500/10' };
  } else if (score >= 40) {
    scoreBadge = { label: 'Moderate Prompt', color: 'text-yellow-400 border-yellow-500/30 bg-yellow-500/10' };
  }

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl shadow-slate-950/40 backdrop-blur-md">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-pink-500/10 border border-pink-500/30">
              <Brain className="h-6 w-6 text-pink-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Prompt Engineering Analyzer</h2>
              <p className="text-xs text-slate-400">
                Deconstruct natural language prompts across 6 core Generative AI semantic dimensions.
              </p>
            </div>
          </div>

          <button
            type="button"
            id="back-to-generator-studio-btn"
            onClick={onLoadInStudio}
            className="flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-medium text-white shadow-md shadow-indigo-600/30 hover:bg-indigo-500 transition"
          >
            <span>Open in Studio</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        {/* Input Bar inside analyzer */}
        <div className="mt-5 space-y-3">
          <textarea
            id="analyzer-prompt-input"
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            placeholder="Type or paste any text prompt to dissect its semantic visual dimensions..."
            rows={3}
            className="w-full resize-none rounded-xl border border-slate-700 bg-slate-950 p-3.5 text-sm text-slate-100 placeholder-slate-500 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/20 font-sans"
          />

          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="text-xs text-slate-500">
              Prompt token density directly influences CLIP attention maps in Stable Diffusion.
            </div>

            <button
              type="button"
              id="run-analyzer-deep-scan-btn"
              onClick={handleRunAnalysis}
              disabled={!customInput.trim() || isAnalyzing}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-pink-600/30 hover:from-pink-500 hover:to-purple-500 transition disabled:opacity-50"
            >
              <RefreshCw className={`h-4 w-4 ${isAnalyzing ? 'animate-spin' : ''}`} />
              <span>{isAnalyzing ? 'Inspecting Tokens...' : 'Analyze Prompt'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Analysis Results Breakdown */}
      {analysis && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Column 1: Score & Suggestions Card */}
          <div className="space-y-4 lg:col-span-1">
            {/* Strength Gauge Card */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-xl">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                Prompt Strength Score
              </h3>

              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-extrabold text-white font-mono">{analysis.strength_score}</span>
                <span className="text-sm font-medium text-slate-500">/ 100</span>
                <span className={`ml-auto rounded-full border px-2.5 py-0.5 text-xs font-semibold ${scoreBadge.color}`}>
                  {scoreBadge.label}
                </span>
              </div>

              {/* Progress bar */}
              <div className="mt-3 h-2 w-full rounded-full bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 via-indigo-500 to-emerald-500 transition-all duration-500"
                  style={{ width: `${analysis.strength_score}%` }}
                />
              </div>

              <p className="mt-3 text-xs text-slate-400 leading-relaxed">
                {analysis.suggestions}
              </p>
            </div>

            {/* Missing Details checklist */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-xl">
              <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-300 mb-3">
                <AlertTriangle className="h-4 w-4 text-amber-400" />
                <span>Recommended Additions</span>
              </h3>

              {analysis.missing_details.length > 0 ? (
                <div className="space-y-2">
                  {analysis.missing_details.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between rounded-xl border border-slate-800/80 bg-slate-950/70 p-2.5 text-xs text-slate-300"
                    >
                      <span className="truncate pr-2">{item}</span>
                      <button
                        type="button"
                        onClick={() => handleAddMissingTag(item)}
                        className="flex items-center gap-1 rounded-lg border border-indigo-500/30 bg-indigo-500/10 px-2 py-1 text-[10px] font-semibold text-indigo-300 hover:bg-indigo-500/20 hover:text-white transition shrink-0"
                      >
                        <Plus className="h-3 w-3" />
                        <span>Add</span>
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 p-3 rounded-xl">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>No missing dimensions! Prompt has rich coverage.</span>
                </div>
              )}
            </div>
          </div>

          {/* Column 2 & 3: Semantic Breakdown Cards */}
          <div className="lg:col-span-2 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Subject */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
                <div className="text-[11px] font-semibold uppercase text-indigo-400 mb-1">
                  1. Subject (Focal Point)
                </div>
                <div className="text-sm font-medium text-slate-200">{analysis.subject || 'Not detected'}</div>
              </div>

              {/* Environment */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
                <div className="text-[11px] font-semibold uppercase text-purple-400 mb-1">
                  2. Setting & Environment
                </div>
                <div className={`text-sm font-medium ${analysis.environment === 'Not specified' ? 'text-amber-400' : 'text-slate-200'}`}>
                  {analysis.environment}
                </div>
              </div>

              {/* Lighting */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
                <div className="text-[11px] font-semibold uppercase text-amber-400 mb-1">
                  3. Lighting & Atmosphere
                </div>
                <div className={`text-sm font-medium ${analysis.lighting === 'Not specified' ? 'text-amber-400' : 'text-slate-200'}`}>
                  {analysis.lighting}
                </div>
              </div>

              {/* Composition / Camera */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
                <div className="text-[11px] font-semibold uppercase text-pink-400 mb-1">
                  4. Camera & Lens Framing
                </div>
                <div className={`text-sm font-medium ${analysis.composition === 'Not specified' ? 'text-amber-400' : 'text-slate-200'}`}>
                  {analysis.composition}
                </div>
              </div>
            </div>

            {/* Quality Terms Detected */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
              <div className="text-[11px] font-semibold uppercase text-emerald-400 mb-2">
                5. Quality & Fidelity Descriptors
              </div>
              <div className="flex flex-wrap gap-1.5">
                {analysis.quality_descriptors && analysis.quality_descriptors.length > 0 ? (
                  analysis.quality_descriptors.map((q, idx) => (
                    <span
                      key={idx}
                      className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-xs font-mono text-emerald-300"
                    >
                      ✓ {q}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-slate-500">
                    No explicit quality booster tokens detected (e.g. 8k, sharp focus, octane render).
                  </span>
                )}
              </div>
            </div>

            {/* Educational Prompt Engineering Card */}
            <div className="rounded-2xl border border-indigo-500/30 bg-indigo-950/30 p-4 text-xs text-slate-300 space-y-2">
              <div className="flex items-center gap-2 text-indigo-300 font-semibold">
                <Lightbulb className="h-4 w-4" />
                <span>Prompt Engineering Formula for Stable Diffusion</span>
              </div>
              <p className="font-mono text-[11px] text-slate-400 bg-slate-950/80 p-2.5 rounded-lg border border-slate-800">
                [Subject & Details] + [Environment/Setting] + [Art Medium/Style] + [Lighting & Colors] + [Camera Lens/Perspective] + [Quality Boosters]
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
