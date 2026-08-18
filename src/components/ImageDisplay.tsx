import React, { useState } from 'react';
import { Download, Copy, RefreshCw, Maximize2, Check, Sparkles, Clock, Hash, Layers, Gauge, Cpu, Eye, Share2, ZoomIn, ZoomOut, X } from 'lucide-react';
import { GenerationResult } from '../types';

interface ImageDisplayProps {
  currentResult: GenerationResult | null;
  isGenerating: boolean;
  onRegenerate: (useSameSeed: boolean) => void;
  onSendToAnalyzer: (prompt: string) => void;
}

export const ImageDisplay: React.FC<ImageDisplayProps> = ({
  currentResult,
  isGenerating,
  onRegenerate,
  onSendToAnalyzer,
}) => {
  const [copiedType, setCopiedType] = useState<'prompt' | 'enhanced' | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);

  const handleCopy = (text: string, type: 'prompt' | 'enhanced') => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  const handleDownloadImage = () => {
    if (!currentResult?.image_url) return;
    const a = document.createElement('a');
    a.href = currentResult.image_url;
    a.download = `dreamcanvas-${currentResult.seed}-${Date.now()}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="flex h-full flex-col rounded-2xl border border-slate-800 bg-slate-900/80 p-4 sm:p-6 shadow-xl shadow-slate-950/40 backdrop-blur-md">
      {/* Top Card Header */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-indigo-400" />
          <h2 className="text-sm font-semibold text-slate-200">Diffusion Output Canvas</h2>
        </div>

        {currentResult && (
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 text-[11px] font-medium text-emerald-300">
              <Clock className="h-3 w-3" />
              {(currentResult.generation_time_ms / 1000).toFixed(2)}s
            </span>
          </div>
        )}
      </div>

      {/* Main Canvas Viewport */}
      <div className="relative flex-1 min-h-[380px] sm:min-h-[460px] flex items-center justify-center rounded-xl border border-slate-800 bg-slate-950/90 overflow-hidden group">
        {/* State 1: Generating Animation */}
        {isGenerating && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 text-center bg-slate-950/90 backdrop-blur-sm">
            {/* Pulsing Diffusion Orb */}
            <div className="relative flex h-20 w-20 items-center justify-center mb-6">
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 opacity-70 blur-lg animate-pulse" />
              <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-slate-900 border border-indigo-500/40 shadow-inner">
                <RefreshCw className="h-7 w-7 text-indigo-400 animate-spin" />
              </div>
            </div>

            <h3 className="text-base font-bold text-white mb-2 tracking-wide">
              Synthesizing Latent Diffusion Image...
            </h3>

            {/* Stepped Diffusion Progress Indicator */}
            <div className="w-full max-w-sm space-y-2 mt-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>1. CLIP Text Embedding</span>
                <span className="text-emerald-400 font-mono">Completed</span>
              </div>
              <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-full animate-pulse" />
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>2. Iterative U-Net Denoising ($z_T \to z_0$)</span>
                <span className="text-indigo-400 font-mono">Denoising...</span>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>3. VAE Latent to RGB Pixel Decode</span>
                <span className="font-mono">Pending</span>
              </div>
            </div>

            <p className="text-xs text-slate-500 mt-6 max-w-xs">
              Applying Classifier-Free Guidance (CFG) across cross-attention layers.
            </p>
          </div>
        )}

        {/* State 2: Completed Image View */}
        {!isGenerating && currentResult ? (
          <div className="relative w-full h-full flex items-center justify-center p-2">
            <img
              src={currentResult.image_url}
              alt={currentResult.original_prompt}
              referrerPolicy="no-referrer"
              className="max-h-[480px] w-auto max-w-full rounded-lg object-contain shadow-2xl transition duration-300"
            />

            {/* Hover Floating Overlay Actions */}
            <div className="absolute top-4 right-4 flex items-center gap-1.5 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition duration-200 bg-slate-900/80 backdrop-blur-md p-1.5 rounded-xl border border-slate-700 shadow-xl">
              <button
                type="button"
                id="lightbox-expand-btn"
                onClick={() => setIsLightboxOpen(true)}
                className="rounded-lg p-2 text-slate-300 hover:bg-slate-800 hover:text-white transition"
                title="Fullscreen View"
              >
                <Maximize2 className="h-4 w-4" />
              </button>
              <button
                type="button"
                id="download-image-btn"
                onClick={handleDownloadImage}
                className="rounded-lg p-2 text-slate-300 hover:bg-slate-800 hover:text-emerald-400 transition"
                title="Download PNG Image"
              >
                <Download className="h-4 w-4" />
              </button>
            </div>
          </div>
        ) : null}

        {/* State 3: Empty Idle State */}
        {!isGenerating && !currentResult && (
          <div className="flex flex-col items-center justify-center p-8 text-center text-slate-500">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-slate-800 bg-slate-900/50 mb-4">
              <Sparkles className="h-8 w-8 text-slate-600" />
            </div>
            <h3 className="text-sm font-semibold text-slate-300 mb-1">
              Your generated image will appear here
            </h3>
            <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
              Enter a descriptive prompt, choose a visual art style, customize Stable Diffusion parameters, and click Generate.
            </p>
          </div>
        )}
      </div>

      {/* Generation Metadata & Actions Footer */}
      {currentResult && (
        <div className="mt-4 space-y-4">
          {/* Metadata Parameters Pill Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 text-center">
            <div className="rounded-lg border border-slate-800 bg-slate-950/70 p-2">
              <div className="text-[10px] text-slate-500 font-medium">RESOLUTION</div>
              <div className="text-xs font-mono font-semibold text-slate-200">
                {currentResult.width}×{currentResult.height}
              </div>
            </div>

            <div className="rounded-lg border border-slate-800 bg-slate-950/70 p-2">
              <div className="text-[10px] text-slate-500 font-medium">INFERENCE STEPS</div>
              <div className="text-xs font-mono font-semibold text-indigo-300">
                {currentResult.steps} steps
              </div>
            </div>

            <div className="rounded-lg border border-slate-800 bg-slate-950/70 p-2">
              <div className="text-[10px] text-slate-500 font-medium">GUIDANCE SCALE</div>
              <div className="text-xs font-mono font-semibold text-purple-300">
                CFG {currentResult.guidance_scale}
              </div>
            </div>

            <div className="rounded-lg border border-slate-800 bg-slate-950/70 p-2">
              <div className="text-[10px] text-slate-500 font-medium">SEED</div>
              <div className="text-xs font-mono font-semibold text-emerald-300 truncate">
                {currentResult.seed}
              </div>
            </div>

            <div className="rounded-lg border border-slate-800 bg-slate-950/70 p-2">
              <div className="text-[10px] text-slate-500 font-medium">STYLE</div>
              <div className="text-xs font-semibold text-slate-200 capitalize truncate">
                {currentResult.style}
              </div>
            </div>

            <div className="rounded-lg border border-slate-800 bg-slate-950/70 p-2">
              <div className="text-[10px] text-slate-500 font-medium">LATENCY</div>
              <div className="text-xs font-mono font-semibold text-amber-300">
                {(currentResult.generation_time_ms / 1000).toFixed(2)}s
              </div>
            </div>
          </div>

          {/* Prompt Comparison View */}
          <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3 text-xs space-y-2">
            <div>
              <div className="flex items-center justify-between text-slate-400 mb-1">
                <span className="font-semibold text-slate-300">Final Synthesized Prompt:</span>
                <button
                  type="button"
                  id="copy-enhanced-prompt-btn"
                  onClick={() => handleCopy(currentResult.enhanced_prompt, 'enhanced')}
                  className="flex items-center gap-1 text-[11px] text-indigo-400 hover:text-indigo-300"
                >
                  {copiedType === 'enhanced' ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                  <span>{copiedType === 'enhanced' ? 'Copied' : 'Copy Prompt'}</span>
                </button>
              </div>
              <p className="font-mono text-slate-300 leading-relaxed text-[11px] bg-slate-900/90 p-2 rounded-lg border border-slate-800/80">
                {currentResult.enhanced_prompt}
              </p>
            </div>
          </div>

          {/* Action Buttons Row */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
            <div className="flex items-center gap-2">
              {/* Regenerate with Same Seed */}
              <button
                type="button"
                id="regenerate-same-seed-btn"
                onClick={() => onRegenerate(true)}
                disabled={isGenerating}
                className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-200 transition hover:bg-slate-700 disabled:opacity-50"
                title="Regenerate with exact same seed and settings"
              >
                <RefreshCw className="h-3.5 w-3.5 text-indigo-400" />
                <span>Repeat Seed ({currentResult.seed})</span>
              </button>

              {/* Regenerate with New Seed */}
              <button
                type="button"
                id="regenerate-new-seed-btn"
                onClick={() => onRegenerate(false)}
                disabled={isGenerating}
                className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-200 transition hover:bg-slate-700 disabled:opacity-50"
                title="Generate variation with a new random seed"
              >
                <Sparkles className="h-3.5 w-3.5 text-purple-400" />
                <span>New Variation</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              {/* Send to Analyzer */}
              <button
                type="button"
                id="send-to-analyzer-btn"
                onClick={() => onSendToAnalyzer(currentResult.original_prompt)}
                className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800/90 px-3 py-1.5 text-xs font-medium text-pink-300 transition hover:bg-slate-700 hover:text-pink-200"
              >
                <Eye className="h-3.5 w-3.5" />
                <span>Inspect in Analyzer</span>
              </button>

              {/* Download PNG */}
              <button
                type="button"
                id="download-png-action-btn"
                onClick={handleDownloadImage}
                className="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3.5 py-1.5 text-xs font-medium text-white shadow-md shadow-indigo-600/30 transition hover:bg-indigo-500"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Download PNG</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Fullscreen Lightbox Modal */}
      {isLightboxOpen && currentResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md">
          <div className="relative max-h-[90vh] max-w-5xl w-full flex flex-col items-center">
            <div className="flex w-full items-center justify-between pb-3 text-slate-300">
              <span className="text-xs font-mono">{currentResult.enhanced_prompt.slice(0, 80)}...</span>
              <button
                type="button"
                onClick={() => setIsLightboxOpen(false)}
                className="rounded-lg bg-slate-800 p-2 text-slate-300 hover:bg-slate-700 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <img
              src={currentResult.image_url}
              alt={currentResult.original_prompt}
              referrerPolicy="no-referrer"
              className="max-h-[80vh] w-auto max-w-full rounded-xl object-contain shadow-2xl"
            />
          </div>
        </div>
      )}
    </div>
  );
};
