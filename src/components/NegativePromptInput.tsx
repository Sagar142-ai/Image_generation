import React from 'react';
import { Ban, Info, HelpCircle } from 'lucide-react';
import { NEGATIVE_PROMPT_PRESETS } from '../data/presets';

interface NegativePromptInputProps {
  negativePrompt: string;
  setNegativePrompt: (value: string) => void;
}

export const NegativePromptInput: React.FC<NegativePromptInputProps> = ({
  negativePrompt,
  setNegativePrompt,
}) => {
  const handleApplyPreset = (presetText: string) => {
    if (!negativePrompt.trim()) {
      setNegativePrompt(presetText);
    } else {
      // Append if not already included
      if (!negativePrompt.includes(presetText.slice(0, 15))) {
        setNegativePrompt(`${negativePrompt.trim()}, ${presetText}`);
      }
    }
  };

  return (
    <div className="space-y-3 rounded-2xl border border-slate-800 bg-slate-900/80 p-4 sm:p-5 shadow-xl shadow-slate-950/40 backdrop-blur-md">
      <div className="flex items-center justify-between">
        <label htmlFor="negative-prompt-textarea" className="flex items-center gap-2 text-sm font-semibold text-slate-200">
          <Ban className="h-4 w-4 text-rose-400" />
          <span>Negative Prompt</span>
          <span className="text-xs font-normal text-slate-400">(Concepts to avoid)</span>
        </label>

        <div className="group relative flex items-center text-slate-400 hover:text-slate-200 cursor-help">
          <HelpCircle className="h-4 w-4" />
          <div className="absolute right-0 top-full z-50 mt-1 hidden w-64 rounded-lg border border-slate-700 bg-slate-950 p-2.5 text-xs text-slate-300 shadow-xl group-hover:block">
            In Stable Diffusion, a negative prompt acts as a negative conditioning vector in Classifier-Free Guidance (CFG), steering the model's reverse denoising away from unwanted artifacts, blur, extra limbs, or signatures.
          </div>
        </div>
      </div>

      <textarea
        id="negative-prompt-textarea"
        value={negativePrompt}
        onChange={(e) => setNegativePrompt(e.target.value)}
        placeholder="blurry, low quality, distorted, deformed, bad anatomy, extra fingers, duplicate objects, text, watermark..."
        rows={2}
        className="w-full resize-none rounded-xl border border-slate-700/80 bg-slate-950/90 p-3 text-xs sm:text-sm text-slate-200 placeholder-slate-500 transition focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20 font-sans"
      />

      {/* Quick Negative Presets */}
      <div>
        <div className="mb-1.5 text-[11px] font-medium text-slate-400">Quick Filter Presets:</div>
        <div className="flex flex-wrap gap-1.5">
          {NEGATIVE_PROMPT_PRESETS.map((preset, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleApplyPreset(preset.prompt)}
              className="rounded-lg border border-slate-800 bg-slate-950/80 px-2.5 py-1 text-[11px] font-medium text-slate-300 transition hover:border-rose-500/40 hover:bg-rose-500/10 hover:text-rose-300"
            >
              + {preset.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
