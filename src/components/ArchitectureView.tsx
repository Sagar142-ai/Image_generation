import React from 'react';
import { Layers, Cpu, ArrowDown, ArrowRight, Zap, Code, ShieldCheck, Binary, Activity, Sparkles } from 'lucide-react';
import { DIFFUSION_PIPELINE_STEPS } from '../data/presets';

export const ArchitectureView: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Overview Banner */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl backdrop-blur-md">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 border border-indigo-500/30">
            <Layers className="h-5 w-5 text-indigo-400" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Latent Diffusion Model (LDM) Architecture</h2>
            <p className="text-xs text-slate-400">
              Theoretical mechanics, mathematical formulas, and cross-attention tensor transformations.
            </p>
          </div>
        </div>

        <p className="mt-3 text-xs text-slate-300 leading-relaxed">
          Stable Diffusion operates in a <strong>compressed latent space</strong> ($f=8$) rather than pixel space. This reduces spatial dimensions by 64×, enabling high-quality image synthesis in under a few seconds while preserving fine semantic detail.
        </p>
      </div>

      {/* Visual Interactive Pipeline Diagram */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl">
        <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider mb-6 flex items-center gap-2">
          <Activity className="h-4 w-4 text-indigo-400" />
          <span>End-to-End Stable Diffusion Inference Flow</span>
        </h3>

        {/* 4 Pipeline Stages in visual cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
          {/* Stage 1 */}
          <div className="rounded-2xl border border-indigo-500/40 bg-indigo-950/30 p-4 relative flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-indigo-300 mb-2">
                <span>STAGE 1</span>
                <span className="rounded bg-indigo-500/20 px-1.5 py-0.5 text-[10px]">CLIP</span>
              </div>
              <h4 className="text-sm font-semibold text-white mb-1">Text Tokenizer & Encoder</h4>
              <p className="text-xs text-slate-400 leading-relaxed mb-3">
                Converts prompt string into 77 token embeddings in 768-dimensional latent vector space.
              </p>
            </div>
            <div className="rounded-lg bg-slate-950 p-2 text-[11px] font-mono text-indigo-300 border border-indigo-900/50">
              E ∈ ℝ<sup>77×768</sup>
            </div>
          </div>

          {/* Stage 2 */}
          <div className="rounded-2xl border border-purple-500/40 bg-purple-950/30 p-4 relative flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-purple-300 mb-2">
                <span>STAGE 2</span>
                <span className="rounded bg-purple-500/20 px-1.5 py-0.5 text-[10px]">Latent Init</span>
              </div>
              <h4 className="text-sm font-semibold text-white mb-1">Gaussian Noise Tensor</h4>
              <p className="text-xs text-slate-400 leading-relaxed mb-3">
                Samples initial noise grid z<sub>T</sub> ~ N(0, I) guided by the random seed.
              </p>
            </div>
            <div className="rounded-lg bg-slate-950 p-2 text-[11px] font-mono text-purple-300 border border-purple-900/50">
              z<sub>T</sub> ∈ ℝ<sup>4×64×64</sup>
            </div>
          </div>

          {/* Stage 3 */}
          <div className="rounded-2xl border border-pink-500/40 bg-pink-950/30 p-4 relative flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-pink-300 mb-2">
                <span>STAGE 3</span>
                <span className="rounded bg-pink-500/20 px-1.5 py-0.5 text-[10px]">U-Net</span>
              </div>
              <h4 className="text-sm font-semibold text-white mb-1">Cross-Attention Denoising</h4>
              <p className="text-xs text-slate-400 leading-relaxed mb-3">
                U-Net predicts noise ε<sub>θ</sub>(z<sub>t</sub>, t, E) over N inference steps with CFG scaling.
              </p>
            </div>
            <div className="rounded-lg bg-slate-950 p-2 text-[11px] font-mono text-pink-300 border border-pink-900/50">
              z<sub>t-1</sub> = Sampler(z<sub>t</sub>, ε̃)
            </div>
          </div>

          {/* Stage 4 */}
          <div className="rounded-2xl border border-emerald-500/40 bg-emerald-950/30 p-4 relative flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-emerald-300 mb-2">
                <span>STAGE 4</span>
                <span className="rounded bg-emerald-500/20 px-1.5 py-0.5 text-[10px]">VAE</span>
              </div>
              <h4 className="text-sm font-semibold text-white mb-1">VAE Latent Decoder</h4>
              <p className="text-xs text-slate-400 leading-relaxed mb-3">
                Expands denoised latent z<sub>0</sub> back into high-resolution 3-channel RGB pixel space.
              </p>
            </div>
            <div className="rounded-lg bg-slate-950 p-2 text-[11px] font-mono text-emerald-300 border border-emerald-900/50">
              I<sub>RGB</sub> ∈ ℝ<sup>512×512×3</sup>
            </div>
          </div>
        </div>
      </div>

      {/* Core Mathematical Equations Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* CFG Equation Card */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-xl space-y-3">
          <h4 className="text-sm font-bold text-slate-200 flex items-center gap-2">
            <Zap className="h-4 w-4 text-purple-400" />
            <span>Classifier-Free Guidance (CFG) Math</span>
          </h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            CFG enables high prompt adherence without needing a separate classifier model. It extrapolates between unconditional prediction $\epsilon(z_t, \emptyset)$ and conditional prediction $\epsilon(z_t, c)$:
          </p>
          <div className="rounded-xl border border-purple-500/30 bg-slate-950 p-3 text-xs font-mono text-purple-300 text-center">
            ε̃<sub>θ</sub>(z<sub>t</sub>, c) = ε<sub>θ</sub>(z<sub>t</sub>, ∅) + s · [ ε<sub>θ</sub>(z<sub>t</sub>, c) - ε<sub>θ</sub>(z<sub>t</sub>, ∅) ]
          </div>
          <p className="text-[11px] text-slate-500">
            Where <strong>s</strong> is the Guidance Scale (typically 7.0–9.0).
          </p>
        </div>

        {/* Latent Compression Advantage */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-xl space-y-3">
          <h4 className="text-sm font-bold text-slate-200 flex items-center gap-2">
            <Binary className="h-4 w-4 text-emerald-400" />
            <span>Pixel Diffusion vs Latent Diffusion (LDM)</span>
          </h4>
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 text-slate-400">
              <span>Metric</span>
              <span className="font-semibold text-slate-300">Pixel vs Latent</span>
            </div>
            <div className="flex items-center justify-between text-slate-400">
              <span>Tensor Shape</span>
              <span className="font-mono text-slate-300">512×512×3 vs 64×64×4</span>
            </div>
            <div className="flex items-center justify-between text-slate-400">
              <span>Memory Footprint</span>
              <span className="font-mono text-emerald-400">64× Reduction in Latent</span>
            </div>
            <div className="flex items-center justify-between text-slate-400">
              <span>Inference Speed</span>
              <span className="font-mono text-emerald-400">Fast on standard hardware</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
