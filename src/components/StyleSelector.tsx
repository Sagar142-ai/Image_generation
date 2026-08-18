import React from 'react';
import { Camera, Film, Palette, Brush, Box, Wand2, Cpu, Droplets, Image, Layers, User, Mountain, Sparkles } from 'lucide-react';
import { STYLE_PRESETS } from '../data/presets';
import { StylePreset } from '../types';

interface StyleSelectorProps {
  selectedStyle: string;
  onSelectStyle: (styleId: string) => void;
}

const iconMap: Record<string, React.ElementType> = {
  Sparkles,
  Camera,
  Film,
  Palette,
  Brush,
  Box,
  Wand2,
  Cpu,
  Droplets,
  Image,
  Layers,
  User,
  Mountain,
};

export const StyleSelector: React.FC<StyleSelectorProps> = ({
  selectedStyle,
  onSelectStyle,
}) => {
  const currentPreset = STYLE_PRESETS.find((s) => s.id === selectedStyle) || STYLE_PRESETS[0];

  return (
    <div className="space-y-3 rounded-2xl border border-slate-800 bg-slate-900/80 p-4 sm:p-5 shadow-xl shadow-slate-950/40 backdrop-blur-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Palette className="h-4 w-4 text-indigo-400" />
          <h3 className="text-sm font-semibold text-slate-200">Visual Art Style</h3>
        </div>
        <span className="text-xs text-slate-400">
          Selected: <strong className="text-indigo-300 font-medium">{currentPreset.name}</strong>
        </span>
      </div>

      {/* Style Chips Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
        {STYLE_PRESETS.map((style: StylePreset) => {
          const Icon = iconMap[style.icon_name] || Sparkles;
          const isSelected = selectedStyle === style.id;

          return (
            <button
              key={style.id}
              id={`style-preset-btn-${style.id}`}
              type="button"
              onClick={() => onSelectStyle(style.id)}
              className={`group relative flex items-center gap-2.5 rounded-xl border p-2.5 text-left transition-all duration-200 ${
                isSelected
                  ? 'border-indigo-500 bg-indigo-950/50 shadow-md shadow-indigo-500/20 ring-1 ring-indigo-500/50 text-white'
                  : 'border-slate-800 bg-slate-950/60 hover:border-slate-700 hover:bg-slate-800/60 text-slate-300'
              }`}
            >
              <div
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${
                  isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400 group-hover:text-slate-200'
                }`}
              >
                <Icon className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-xs font-semibold">{style.name}</div>
                <div className="truncate text-[10px] text-slate-400">{style.category}</div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Style Description & Suffix Preview */}
      {currentPreset.prompt_suffix && (
        <div className="rounded-xl border border-slate-800/80 bg-slate-950/80 p-3 text-xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="font-medium text-slate-300">Style Engine Modifiers:</span>
            <span className="text-[10px] text-indigo-400 font-mono">Appended to Diffusion Prompt</span>
          </div>
          <p className="font-mono text-[11px] text-slate-400 leading-relaxed line-clamp-2">
            + {currentPreset.prompt_suffix}
          </p>
        </div>
      )}
    </div>
  );
};
