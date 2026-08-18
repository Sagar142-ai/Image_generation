import React, { useState } from 'react';
import { History, Search, Trash2, Download, RefreshCw, ExternalLink, Sparkles, X, Clock, Hash, Gauge, Copy, Check } from 'lucide-react';
import { GenerationResult } from '../types';

interface HistoryGalleryProps {
  history: GenerationResult[];
  onSelectGeneration: (item: GenerationResult) => void;
  onDeleteGeneration: (id: string) => void;
  onClearAllHistory: () => void;
  onLoadIntoGenerator: (item: GenerationResult) => void;
}

export const HistoryGallery: React.FC<HistoryGalleryProps> = ({
  history,
  onSelectGeneration,
  onDeleteGeneration,
  onClearAllHistory,
  onLoadIntoGenerator,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStyleFilter, setSelectedStyleFilter] = useState('all');
  const [activeModalItem, setActiveModalItem] = useState<GenerationResult | null>(null);
  const [copiedPromptId, setCopiedPromptId] = useState<string | null>(null);

  const filteredHistory = history.filter((item) => {
    const matchesSearch =
      item.original_prompt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.enhanced_prompt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      String(item.seed).includes(searchQuery);
    const matchesStyle = selectedStyleFilter === 'all' || item.style === selectedStyleFilter;
    return matchesSearch && matchesStyle;
  });

  const availableStyles = Array.from(new Set(history.map((h) => h.style)));

  const handleCopyPrompt = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPromptId(id);
    setTimeout(() => setCopiedPromptId(null), 2000);
  };

  const handleDownload = (imageUrl: string, seed: number) => {
    const a = document.createElement('a');
    a.href = imageUrl;
    a.download = `dreamcanvas-${seed}-${Date.now()}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="space-y-6">
      {/* Top Controls Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-xl backdrop-blur-md">
        <div>
          <div className="flex items-center gap-2">
            <History className="h-5 w-5 text-indigo-400" />
            <h2 className="text-lg font-bold text-white">Generation History & Metadata Archive</h2>
          </div>
          <p className="text-xs text-slate-400">
            Stored generations logged with complete diffusion hyperparameters and image assets.
          </p>
        </div>

        {history.length > 0 && (
          <button
            type="button"
            id="clear-all-history-btn"
            onClick={onClearAllHistory}
            className="flex items-center gap-1.5 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-xs font-medium text-red-300 hover:bg-red-500/20 hover:text-white transition"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span>Clear History</span>
          </button>
        )}
      </div>

      {/* Search & Style Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
          <input
            type="text"
            id="history-search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by prompt keywords or seed..."
            className="w-full rounded-xl border border-slate-800 bg-slate-950/90 pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
          />
        </div>

        {/* Style Filter pills */}
        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => setSelectedStyleFilter('all')}
            className={`rounded-lg px-2.5 py-1 text-xs font-medium transition ${
              selectedStyleFilter === 'all'
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200'
            }`}
          >
            All ({history.length})
          </button>
          {availableStyles.map((style) => (
            <button
              key={style}
              type="button"
              onClick={() => setSelectedStyleFilter(style)}
              className={`rounded-lg px-2.5 py-1 text-xs font-medium capitalize transition ${
                selectedStyleFilter === style
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200'
              }`}
            >
              {style}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Grid */}
      {filteredHistory.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-800/80 bg-slate-900/40 p-12 text-center">
          <History className="h-10 w-10 text-slate-600 mb-3" />
          <h3 className="text-sm font-semibold text-slate-300">No generation records found</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm">
            {searchQuery
              ? 'Try changing your search query or style filter.'
              : 'Generate an image in the Image Studio to build your gallery archive.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredHistory.map((item) => (
            <div
              key={item.id}
              className="group relative flex flex-col rounded-2xl border border-slate-800 bg-slate-900/80 overflow-hidden shadow-lg hover:border-slate-700 transition duration-200"
            >
              {/* Thumbnail with overlay */}
              <div
                onClick={() => setActiveModalItem(item)}
                className="relative aspect-square w-full cursor-pointer bg-slate-950 overflow-hidden"
              >
                <img
                  src={item.image_url}
                  alt={item.original_prompt}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                />

                {/* Style badge */}
                <div className="absolute top-2 left-2 rounded-md bg-slate-950/80 backdrop-blur-md px-2 py-0.5 text-[10px] font-semibold text-indigo-300 border border-slate-700">
                  {item.style}
                </div>

                {/* Resolution & Steps badge */}
                <div className="absolute bottom-2 right-2 rounded-md bg-slate-950/80 backdrop-blur-md px-1.5 py-0.5 text-[10px] font-mono text-slate-300 border border-slate-800">
                  {item.width}×{item.height}
                </div>
              </div>

              {/* Card Body */}
              <div className="flex flex-1 flex-col p-3.5 space-y-2">
                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed font-sans">
                  {item.original_prompt}
                </p>

                {/* Meta details */}
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 pt-1 border-t border-slate-800/80">
                  <span>Seed: {item.seed}</span>
                  <span>{(item.generation_time_ms / 1000).toFixed(1)}s</span>
                </div>

                {/* Quick actions button group */}
                <div className="flex items-center justify-between gap-1 pt-1">
                  <button
                    type="button"
                    onClick={() => onLoadIntoGenerator(item)}
                    className="flex items-center gap-1 rounded-lg border border-indigo-500/30 bg-indigo-500/10 px-2 py-1 text-[11px] font-semibold text-indigo-300 hover:bg-indigo-500/20 transition"
                  >
                    <RefreshCw className="h-3 w-3" />
                    <span>Load Studio</span>
                  </button>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => handleDownload(item.image_url, item.seed)}
                      className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-emerald-400 transition"
                      title="Download PNG"
                    >
                      <Download className="h-3.5 w-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={() => onDeleteGeneration(item.id)}
                      className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-red-400 transition"
                      title="Delete Record"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Full Detail Modal */}
      {activeModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md">
          <div className="relative max-h-[90vh] max-w-4xl w-full rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl overflow-hidden flex flex-col md:flex-row">
            {/* Left Image Viewport */}
            <div className="relative md:w-1/2 bg-slate-950 flex items-center justify-center p-4">
              <img
                src={activeModalItem.image_url}
                alt={activeModalItem.original_prompt}
                referrerPolicy="no-referrer"
                className="max-h-[60vh] w-auto max-w-full rounded-xl object-contain shadow-2xl"
              />
            </div>

            {/* Right Meta Inspector */}
            <div className="md:w-1/2 p-6 flex flex-col justify-between overflow-y-auto max-h-[60vh] md:max-h-none space-y-4">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="rounded-md bg-indigo-900/60 border border-indigo-500/30 px-2 py-0.5 text-xs font-semibold text-indigo-300">
                    {activeModalItem.style.toUpperCase()}
                  </span>
                  <button
                    type="button"
                    onClick={() => setActiveModalItem(null)}
                    className="rounded-lg p-1 text-slate-400 hover:bg-slate-800 hover:text-white"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <h3 className="text-sm font-semibold text-slate-200 mb-1">Original Prompt</h3>
                <p className="text-xs text-slate-300 bg-slate-950 p-2.5 rounded-lg border border-slate-800 font-sans">
                  {activeModalItem.original_prompt}
                </p>

                <h3 className="text-sm font-semibold text-slate-200 mt-3 mb-1">Synthesized Prompt</h3>
                <p className="text-xs text-slate-400 bg-slate-950 p-2.5 rounded-lg border border-slate-800 font-mono text-[11px]">
                  {activeModalItem.enhanced_prompt}
                </p>

                {activeModalItem.negative_prompt && (
                  <>
                    <h3 className="text-sm font-semibold text-slate-200 mt-3 mb-1">Negative Prompt</h3>
                    <p className="text-xs text-rose-300/80 bg-slate-950 p-2 rounded-lg border border-slate-800 text-[11px]">
                      {activeModalItem.negative_prompt}
                    </p>
                  </>
                )}

                {/* Hyperparameters grid */}
                <div className="grid grid-cols-3 gap-2 text-center text-xs mt-4">
                  <div className="p-2 bg-slate-950 rounded-lg border border-slate-800">
                    <div className="text-[10px] text-slate-500">DIMENSIONS</div>
                    <div className="font-mono font-semibold text-slate-200">{activeModalItem.width}×{activeModalItem.height}</div>
                  </div>
                  <div className="p-2 bg-slate-950 rounded-lg border border-slate-800">
                    <div className="text-[10px] text-slate-500">STEPS / CFG</div>
                    <div className="font-mono font-semibold text-slate-200">{activeModalItem.steps} / {activeModalItem.guidance_scale}</div>
                  </div>
                  <div className="p-2 bg-slate-950 rounded-lg border border-slate-800">
                    <div className="text-[10px] text-slate-500">SEED</div>
                    <div className="font-mono font-semibold text-emerald-300 truncate">{activeModalItem.seed}</div>
                  </div>
                </div>
              </div>

              {/* Bottom action buttons */}
              <div className="flex items-center justify-between gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => {
                    onLoadIntoGenerator(activeModalItem);
                    setActiveModalItem(null);
                  }}
                  className="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-2 text-xs font-semibold text-white hover:bg-indigo-500 transition"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  <span>Load in Studio</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleDownload(activeModalItem.image_url, activeModalItem.seed)}
                  className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-700 transition"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Download Image</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
