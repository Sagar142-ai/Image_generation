import React, { useState } from 'react';
import { Sliders, HelpCircle, Shuffle, ChevronDown, ChevronUp, Cpu, Gauge, Hash, Maximize2 } from 'lucide-react';

interface AdvancedSettingsProps {
  width: number;
  height: number;
  setWidth: (val: number) => void;
  setHeight: (val: number) => void;
  steps: number;
  setSteps: (val: number) => void;
  guidanceScale: number;
  setGuidanceScale: (val: number) => void;
  seed: number;
  setSeed: (val: number) => void;
  isRandomSeed: boolean;
  setIsRandomSeed: (val: boolean) => void;
  model: string;
  setModel: (val: string) => void;
  sampler: string;
  setSampler: (val: string) => void;
}

export const AdvancedSettings: React.FC<AdvancedSettingsProps> = ({
  width,
  height,
  setWidth,
  setHeight,
  steps,
  setSteps,
  guidanceScale,
  setGuidanceScale,
  seed,
  setSeed,
  isRandomSeed,
  setIsRandomSeed,
  model,
  setModel,
  sampler,
  setSampler,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const dimensionPresets = [
    { label: 'Square (1:1)', w: 512, h: 512, desc: '512×512' },
    { label: 'Landscape (3:2)', w: 768, h: 512, desc: '768×512' },
    { label: 'Portrait (2:3)', w: 512, h: 768, desc: '512×768' },
    { label: 'HD Square (1:1)', w: 1024, h: 1024, desc: '1024×1024' },
  ];

  const models = [
    { id: 'Stable Diffusion XL (SDXL)', name: 'Stable Diffusion XL 1.0 (Latest)' },
    { id: 'Stable Diffusion v2.1', name: 'Stable Diffusion v2.1 (768px)' },
    { id: 'Stable Diffusion v1.5', name: 'Stable Diffusion v1.5 (Classic)' },
    { id: 'Gemini Imagen 3', name: 'Gemini Imagen 3 / Multi-Modal' },
  ];

  const samplers = [
    { id: 'DPM++ 2M Karras', desc: 'Fast, high detail convergence in 20-30 steps' },
    { id: 'Euler a', desc: 'Ancestral Euler sampler, creative & diverse variations' },
    { id: 'DDIM', desc: 'Deterministic Denoising Diffusion Implicit Models' },
    { id: 'UniPC 2M', desc: 'Unified Predictor-Corrector high-order solver' },
  ];

  const handleSetDimensions = (w: number, h: number) => {
    setWidth(w);
    setHeight(h);
  };

  const handleGenerateNewSeed = () => {
    const newRandomSeed = Math.floor(Math.random() * 9999999);
    setSeed(newRandomSeed);
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/80 shadow-xl shadow-slate-950/40 backdrop-blur-md overflow-hidden">
      {/* Header Toggle */}
      <button
        type="button"
        id="advanced-settings-toggle-btn"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between p-4 sm:p-5 text-left transition hover:bg-slate-800/50"
      >
        <div className="flex items-center gap-2.5">
          <Sliders className="h-4 w-4 text-indigo-400" />
          <div>
            <h3 className="text-sm font-semibold text-slate-200">Advanced Diffusion Parameters</h3>
            <p className="text-xs text-slate-400">
              Inference Steps ({steps}), CFG Scale ({guidanceScale}), Resolution ({width}×{height}), Seed
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="rounded-md border border-slate-700 bg-slate-800 px-2 py-0.5 text-[11px] font-mono text-slate-300">
            {width}x{height} • {steps} steps
          </span>
          {isOpen ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
        </div>
      </button>

      {/* Expanded Accordion Body */}
      {isOpen && (
        <div className="border-t border-slate-800/80 p-4 sm:p-5 space-y-5 bg-slate-950/40">
          {/* 1. Dimension / Aspect Ratio Selection */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
                <Maximize2 className="h-3.5 w-3.5 text-indigo-400" />
                <span>Image Dimensions & Aspect Ratio</span>
              </label>
              <span className="text-xs font-mono text-indigo-300">
                {width} × {height} px
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {dimensionPresets.map((preset) => {
                const isSelected = width === preset.w && height === preset.h;
                return (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => handleSetDimensions(preset.w, preset.h)}
                    className={`rounded-xl border p-2.5 text-center transition ${
                      isSelected
                        ? 'border-indigo-500 bg-indigo-950/60 ring-1 ring-indigo-500 text-white font-medium shadow-md shadow-indigo-500/20'
                        : 'border-slate-800 bg-slate-900/90 text-slate-300 hover:border-slate-700 hover:bg-slate-800'
                    }`}
                  >
                    <div className="text-xs font-semibold">{preset.label}</div>
                    <div className="text-[11px] font-mono text-slate-400">{preset.desc}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Inference Steps & Guidance Scale Sliders */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Inference Steps */}
            <div className="rounded-xl border border-slate-800/90 bg-slate-900/60 p-3.5">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-1.5">
                  <Gauge className="h-3.5 w-3.5 text-indigo-400" />
                  <label htmlFor="steps-slider" className="text-xs font-semibold text-slate-200">
                    Inference Steps
                  </label>
                </div>
                <span className="rounded bg-indigo-900/60 px-2 py-0.5 font-mono text-xs font-bold text-indigo-300">
                  {steps}
                </span>
              </div>
              <input
                type="range"
                id="steps-slider"
                min={10}
                max={50}
                step={1}
                value={steps}
                onChange={(e) => setSteps(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
              <p className="mt-1.5 text-[11px] text-slate-400">
                Number of reverse diffusion denoising iterations. Higher steps (25-35) increase texture detail.
              </p>
            </div>

            {/* Guidance Scale (CFG) */}
            <div className="rounded-xl border border-slate-800/90 bg-slate-900/60 p-3.5">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-1.5">
                  <Gauge className="h-3.5 w-3.5 text-purple-400" />
                  <label htmlFor="guidance-scale-slider" className="text-xs font-semibold text-slate-200">
                    Guidance Scale (CFG)
                  </label>
                </div>
                <span className="rounded bg-purple-900/60 px-2 py-0.5 font-mono text-xs font-bold text-purple-300">
                  {guidanceScale.toFixed(1)}
                </span>
              </div>
              <input
                type="range"
                id="guidance-scale-slider"
                min={1.0}
                max={20.0}
                step={0.5}
                value={guidanceScale}
                onChange={(e) => setGuidanceScale(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
              />
              <p className="mt-1.5 text-[11px] text-slate-400">
                Classifier-Free Guidance weight. Controls how strictly the model follows your text prompt vs creativity.
              </p>
            </div>
          </div>

          {/* 3. Seed Control */}
          <div className="rounded-xl border border-slate-800/90 bg-slate-900/60 p-3.5">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-1.5">
                <Hash className="h-3.5 w-3.5 text-emerald-400" />
                <label className="text-xs font-semibold text-slate-200">Random Seed</label>
              </div>

              <div className="flex items-center gap-2">
                <label className="flex items-center gap-1.5 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isRandomSeed}
                    onChange={(e) => setIsRandomSeed(e.target.checked)}
                    className="h-3.5 w-3.5 rounded border-slate-700 bg-slate-800 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span>Randomize on each generate</span>
                </label>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="number"
                id="seed-input-field"
                disabled={isRandomSeed}
                value={seed}
                onChange={(e) => setSeed(Number(e.target.value))}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-1.5 text-xs font-mono text-slate-200 placeholder-slate-500 focus:border-indigo-500 focus:outline-none disabled:opacity-50"
              />
              <button
                type="button"
                id="regenerate-seed-btn"
                onClick={handleGenerateNewSeed}
                className="flex items-center gap-1 shrink-0 rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-200 hover:bg-slate-700 transition"
              >
                <Shuffle className="h-3.5 w-3.5 text-emerald-400" />
                <span>New Seed</span>
              </button>
            </div>
            <p className="mt-1.5 text-[11px] text-slate-400">
              The seed defines the initial Gaussian noise latent grid ($z_T$). Re-using the same seed with identical parameters guarantees deterministic replication.
            </p>
          </div>

          {/* 4. Model and Sampler Selectors */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="model-select" className="block text-xs font-semibold text-slate-300 mb-1">
                Diffusion Engine / Model
              </label>
              <select
                id="model-select"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 p-2 text-xs text-slate-200 focus:border-indigo-500 focus:outline-none"
              >
                {models.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="sampler-select" className="block text-xs font-semibold text-slate-300 mb-1">
                ODE/SDE Denoising Sampler
              </label>
              <select
                id="sampler-select"
                value={sampler}
                onChange={(e) => setSampler(e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 p-2 text-xs text-slate-200 focus:border-indigo-500 focus:outline-none"
              >
                {samplers.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.id} ({s.desc.slice(0, 30)}...)
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
