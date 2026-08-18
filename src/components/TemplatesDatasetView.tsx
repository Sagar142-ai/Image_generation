import React, { useState } from 'react';
import { BookOpen, Sparkles, Copy, Check, ArrowRight, Tag, Database, Info } from 'lucide-react';
import { PROMPT_TEMPLATES } from '../data/presets';
import { PromptTemplate } from '../types';

interface TemplatesDatasetViewProps {
  onApplyTemplate: (template: PromptTemplate) => void;
}

export const TemplatesDatasetView: React.FC<TemplatesDatasetViewProps> = ({
  onApplyTemplate,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = ['all', 'Portrait', 'Landscape', 'Product', 'Fantasy', 'Cyberpunk', 'Anime', 'Architecture', '3D Render'];

  const filteredTemplates = PROMPT_TEMPLATES.filter((t) =>
    selectedCategory === 'all' ? true : t.category.toLowerCase() === selectedCategory.toLowerCase()
  );

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl backdrop-blur-md">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 border border-purple-500/30">
            <BookOpen className="h-5 w-5 text-purple-400" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Stable Diffusion Prompts Dataset & Templates</h2>
            <p className="text-xs text-slate-400">
              Curated prompt archetypes derived from public text-to-image dataset research (Hugging Face / Kaggle).
            </p>
          </div>
        </div>

        {/* Academic Dataset Disclaimer */}
        <div className="mt-4 rounded-xl border border-indigo-500/20 bg-indigo-950/40 p-3.5 text-xs text-slate-300 flex items-start gap-2.5">
          <Info className="h-4 w-4 text-indigo-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <strong className="text-indigo-300 font-semibold">Academic Distinction Note:</strong>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              This dataset is used for <strong>prompt structure analysis, style taxonomy, and keyword engineering</strong>. It is distinct from the multi-billion image-text datasets (such as LAION-5B) utilized during the original foundational pre-training of the Stable Diffusion U-Net.
            </p>
          </div>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold capitalize transition ${
              selectedCategory === cat
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-500/20'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
            }`}
          >
            {cat === 'all' ? 'All Categories' : cat}
          </button>
        ))}
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTemplates.map((template) => (
          <div
            key={template.id}
            className="flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-lg hover:border-slate-700 transition"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="rounded-md border border-purple-500/30 bg-purple-500/10 px-2 py-0.5 text-[11px] font-semibold text-purple-300">
                  {template.category}
                </span>
                <span className="text-[11px] font-mono text-slate-500">
                  Ratio: {template.recommended_aspect_ratio}
                </span>
              </div>

              <h3 className="text-sm font-bold text-white">{template.title}</h3>

              {/* Template Blueprint Formula */}
              <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-3">
                <div className="text-[10px] uppercase font-semibold text-slate-500 mb-1">Blueprint Template</div>
                <p className="font-mono text-xs text-indigo-300 leading-relaxed">
                  {template.template}
                </p>
              </div>

              {/* Concrete Generated Example */}
              <div className="rounded-xl border border-slate-800/80 bg-slate-950/50 p-3">
                <div className="text-[10px] uppercase font-semibold text-slate-500 mb-1">Concrete Prompt Example</div>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  {template.sample_output_prompt}
                </p>
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex items-center justify-between pt-4 mt-3 border-t border-slate-800/80">
              <button
                type="button"
                onClick={() => handleCopy(template.sample_output_prompt, template.id)}
                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition"
              >
                {copiedId === template.id ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copiedId === template.id ? 'Copied to Clipboard' : 'Copy Prompt'}</span>
              </button>

              <button
                type="button"
                onClick={() => onApplyTemplate(template)}
                className="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white shadow-md shadow-indigo-600/30 hover:bg-indigo-500 transition"
              >
                <span>Use in Studio</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
