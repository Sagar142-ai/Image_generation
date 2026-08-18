import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { PromptInput } from './components/PromptInput';
import { StyleSelector } from './components/StyleSelector';
import { NegativePromptInput } from './components/NegativePromptInput';
import { AdvancedSettings } from './components/AdvancedSettings';
import { ImageDisplay } from './components/ImageDisplay';
import { PromptAnalyzerPanel } from './components/PromptAnalyzerPanel';
import { HistoryGallery } from './components/HistoryGallery';
import { TemplatesDatasetView } from './components/TemplatesDatasetView';
import { ArchitectureView } from './components/ArchitectureView';
import { VivaPrepView } from './components/VivaPrepView';
import { ActiveTab, GenerationResult, PromptAnalysis, PromptTemplate } from './types';
import { Sparkles, AlertCircle, Wand2, Play } from 'lucide-react';

export default function App() {
  // Navigation
  const [activeTab, setActiveTab] = useState<ActiveTab>('generator');

  // Generator inputs
  const [prompt, setPrompt] = useState<string>(
    'A futuristic cybernetic tiger with glowing neon blue stripes walking through a rain-slicked Tokyo alleyway at night'
  );
  const [style, setStyle] = useState<string>('cyberpunk');
  const [negativePrompt, setNegativePrompt] = useState<string>(
    'blurry, low quality, distorted, deformed, bad anatomy, extra fingers, duplicate objects, text, watermark'
  );
  const [enableEnhancement, setEnableEnhancement] = useState<boolean>(true);

  // Advanced settings
  const [width, setWidth] = useState<number>(768);
  const [height, setHeight] = useState<number>(512);
  const [steps, setSteps] = useState<number>(30);
  const [guidanceScale, setGuidanceScale] = useState<number>(7.5);
  const [seed, setSeed] = useState<number>(8492041);
  const [isRandomSeed, setIsRandomSeed] = useState<boolean>(true);
  const [model, setModel] = useState<string>('Stable Diffusion XL (SDXL)');
  const [sampler, setSampler] = useState<string>('DPM++ 2M Karras');

  // Outputs & States
  const [currentResult, setCurrentResult] = useState<GenerationResult | null>(null);
  const [history, setHistory] = useState<GenerationResult[]>([]);
  const [promptAnalysis, setPromptAnalysis] = useState<PromptAnalysis | null>(null);

  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [isEnhancing, setIsEnhancing] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isBackendHealthy, setIsBackendHealthy] = useState<boolean>(true);

  // Fetch initial history & health
  useEffect(() => {
    fetchHealth();
    fetchHistory();
  }, []);

  const fetchHealth = async () => {
    try {
      const res = await fetch('/api/health');
      if (res.ok) {
        setIsBackendHealthy(true);
      }
    } catch (e) {
      console.warn('Backend health check note:', e);
    }
  };

  const fetchHistory = async () => {
    try {
      const res = await fetch('/api/history');
      const data = await res.json();
      if (data.success && Array.isArray(data.history)) {
        setHistory(data.history);
        if (data.history.length > 0 && !currentResult) {
          setCurrentResult(data.history[0]);
        }
      }
    } catch (err) {
      console.warn('Failed to load history:', err);
    }
  };

  // 1. Generate Image Handler
  const handleGenerate = async (overrideSeed?: number) => {
    if (!prompt.trim()) {
      setErrorMessage('Please enter a descriptive prompt before generating.');
      return;
    }

    setErrorMessage(null);
    setIsGenerating(true);

    const actualSeed = overrideSeed !== undefined ? overrideSeed : isRandomSeed ? Math.floor(Math.random() * 10000000) : seed;
    setSeed(actualSeed);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          style,
          negative_prompt: negativePrompt,
          width,
          height,
          steps,
          guidance_scale: guidanceScale,
          seed: actualSeed,
          model,
          sampler,
          enable_enhancement: enableEnhancement,
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to generate image');
      }

      setCurrentResult(data.result);
      if (data.result.analysis) {
        setPromptAnalysis(data.result.analysis);
      }
      // Refresh history list
      setHistory((prev) => [data.result, ...prev.filter((h) => h.id !== data.result.id)]);
    } catch (err: any) {
      console.error('Generation error:', err);
      setErrorMessage(err.message || 'Image generation failed. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  // 2. Prompt Analyzer Handler
  const handleAnalyzePrompt = async () => {
    if (!prompt.trim()) return;
    setIsAnalyzing(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/analyze-prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, style }),
      });
      const data = await res.json();
      if (data.success && data.analysis) {
        setPromptAnalysis(data.analysis);
        setActiveTab('analyzer');
      }
    } catch (err: any) {
      console.error('Analyzer error:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // 3. AI Expand Prompt Handler
  const handleEnhancePrompt = async () => {
    if (!prompt.trim()) return;
    setIsEnhancing(true);

    try {
      const res = await fetch('/api/enhance-prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, style }),
      });
      const data = await res.json();
      if (data.success && data.enhanced) {
        setPrompt(data.enhanced);
      }
    } catch (err) {
      console.error('Enhancer error:', err);
    } finally {
      setIsEnhancing(false);
    }
  };

  // 4. Regenerate Handler
  const handleRegenerate = (useSameSeed: boolean) => {
    if (useSameSeed && currentResult) {
      handleGenerate(currentResult.seed);
    } else {
      const newSeed = Math.floor(Math.random() * 10000000);
      setSeed(newSeed);
      handleGenerate(newSeed);
    }
  };

  // 5. Load item from History or Templates into Generator Studio
  const handleLoadItemIntoStudio = (item: GenerationResult) => {
    setPrompt(item.original_prompt);
    setStyle(item.style);
    setNegativePrompt(item.negative_prompt);
    setWidth(item.width);
    setHeight(item.height);
    setSteps(item.steps);
    setGuidanceScale(item.guidance_scale);
    setSeed(item.seed);
    setIsRandomSeed(false);
    setModel(item.model);
    setSampler(item.sampler);
    setCurrentResult(item);
    setActiveTab('generator');
  };

  const handleApplyTemplate = (template: PromptTemplate) => {
    setPrompt(template.sample_output_prompt);
    if (template.recommended_style) {
      setStyle(template.recommended_style);
    }
    if (template.recommended_aspect_ratio === '768x512') {
      setWidth(768);
      setHeight(512);
    } else if (template.recommended_aspect_ratio === '512x768') {
      setWidth(512);
      setHeight(768);
    } else {
      setWidth(512);
      setHeight(512);
    }
    setActiveTab('generator');
  };

  const handleDeleteHistoryItem = async (id: string) => {
    try {
      await fetch(`/api/history/${id}`, { method: 'DELETE' });
      setHistory((prev) => prev.filter((h) => h.id !== id));
      if (currentResult?.id === id) {
        setCurrentResult(history.find((h) => h.id !== id) || null);
      }
    } catch (e) {
      console.error('Delete error:', e);
    }
  };

  const handleClearAllHistory = async () => {
    if (!window.confirm('Are you sure you want to clear all generation history?')) return;
    try {
      await fetch('/api/history', { method: 'DELETE' });
      setHistory([]);
      setCurrentResult(null);
    } catch (e) {
      console.error('Clear history error:', e);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        historyCount={history.length}
        isBackendHealthy={isBackendHealthy}
      />

      {/* Main App Container */}
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 py-6 sm:px-6">
        {/* Error notification banner */}
        {errorMessage && (
          <div className="mb-6 flex items-center justify-between rounded-xl border border-red-500/40 bg-red-500/10 p-4 text-xs sm:text-sm text-red-200 shadow-lg">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-red-400 shrink-0" />
              <span>{errorMessage}</span>
            </div>
            <button
              type="button"
              onClick={() => setErrorMessage(null)}
              className="text-xs font-semibold underline hover:text-white"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* TAB 1: Main Image Generation Studio */}
        {activeTab === 'generator' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Configuration Panel (5 cols) */}
            <div className="lg:col-span-6 xl:col-span-5 space-y-5">
              {/* 1. Prompt Input */}
              <PromptInput
                prompt={prompt}
                setPrompt={setPrompt}
                enableEnhancement={enableEnhancement}
                setEnableEnhancement={setEnableEnhancement}
                onAnalyzePrompt={handleAnalyzePrompt}
                onEnhancePrompt={handleEnhancePrompt}
                isEnhancing={isEnhancing}
                isAnalyzing={isAnalyzing}
              />

              {/* 2. Visual Art Style Presets */}
              <StyleSelector selectedStyle={style} onSelectStyle={setStyle} />

              {/* 3. Negative Prompt */}
              <NegativePromptInput
                negativePrompt={negativePrompt}
                setNegativePrompt={setNegativePrompt}
              />

              {/* 4. Advanced Stable Diffusion Parameters */}
              <AdvancedSettings
                width={width}
                height={height}
                setWidth={setWidth}
                setHeight={setHeight}
                steps={steps}
                setSteps={setSteps}
                guidanceScale={guidanceScale}
                setGuidanceScale={setGuidanceScale}
                seed={seed}
                setSeed={setSeed}
                isRandomSeed={isRandomSeed}
                setIsRandomSeed={setIsRandomSeed}
                model={model}
                setModel={setModel}
                sampler={sampler}
                setSampler={setSampler}
              />

              {/* Primary Generate Button */}
              <button
                type="button"
                id="main-generate-image-btn"
                onClick={() => handleGenerate()}
                disabled={isGenerating || !prompt.trim()}
                className="w-full relative flex items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-4 text-sm font-bold text-white shadow-xl shadow-indigo-600/30 hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group active:scale-[0.99]"
              >
                <Play className={`h-4 w-4 fill-white ${isGenerating ? 'animate-spin' : 'group-hover:translate-x-0.5 transition'}`} />
                <span>{isGenerating ? 'Synthesizing Diffusion Latents...' : 'Generate Image'}</span>
              </button>
            </div>

            {/* Right Canvas & Result Viewport (7 cols) */}
            <div className="lg:col-span-6 xl:col-span-7 h-full">
              <ImageDisplay
                currentResult={currentResult}
                isGenerating={isGenerating}
                onRegenerate={handleRegenerate}
                onSendToAnalyzer={(p) => {
                  setPrompt(p);
                  handleAnalyzePrompt();
                }}
              />
            </div>
          </div>
        )}

        {/* TAB 2: Prompt Analyzer */}
        {activeTab === 'analyzer' && (
          <PromptAnalyzerPanel
            prompt={prompt}
            setPrompt={setPrompt}
            analysis={promptAnalysis}
            isAnalyzing={isAnalyzing}
            onAnalyze={handleAnalyzePrompt}
            onApplyEnhancement={handleEnhancePrompt}
            onLoadInStudio={() => setActiveTab('generator')}
          />
        )}

        {/* TAB 3: History & Gallery */}
        {activeTab === 'history' && (
          <HistoryGallery
            history={history}
            onSelectGeneration={setCurrentResult}
            onDeleteGeneration={handleDeleteHistoryItem}
            onClearAllHistory={handleClearAllHistory}
            onLoadIntoGenerator={handleLoadItemIntoStudio}
          />
        )}

        {/* TAB 4: Templates & Dataset */}
        {activeTab === 'templates' && (
          <TemplatesDatasetView onApplyTemplate={handleApplyTemplate} />
        )}

        {/* TAB 5: Architecture & Math */}
        {activeTab === 'architecture' && <ArchitectureView />}

        {/* TAB 6: College Viva Defense Prep */}
        {activeTab === 'viva' && <VivaPrepView />}
      </main>

      {/* Footer */}
      <footer className="mt-12 border-t border-slate-800/80 bg-slate-950/80 py-6 text-center text-xs text-slate-500">
        <div className="mx-auto max-w-7xl px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            <strong>DreamCanvas AI</strong> • Stable Diffusion Latent Image Generation & Prompt Engineering Platform
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>B.Tech CSE Generative AI Minor Project</span>
            <span>•</span>
            <button
              type="button"
              onClick={() => setActiveTab('viva')}
              className="text-indigo-400 hover:underline font-medium"
            >
              Viva Defense Study Guide
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
