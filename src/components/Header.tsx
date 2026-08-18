import React from 'react';
import { Sparkles, History, Brain, BookOpen, Layers, GraduationCap, CheckCircle2, AlertCircle } from 'lucide-react';
import { ActiveTab } from '../types';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  historyCount: number;
  isBackendHealthy: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  historyCount,
  isBackendHealthy,
}) => {
  const tabs = [
    { id: 'generator' as ActiveTab, label: 'Image Studio', icon: Sparkles },
    { id: 'analyzer' as ActiveTab, label: 'Prompt Analyzer', icon: Brain },
    { id: 'history' as ActiveTab, label: 'History & Gallery', icon: History, count: historyCount },
    { id: 'templates' as ActiveTab, label: 'Prompt Dataset', icon: BookOpen },
    { id: 'architecture' as ActiveTab, label: 'Diffusion Pipeline', icon: Layers },
    { id: 'viva' as ActiveTab, label: 'Academic Defense', icon: GraduationCap },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Brand & Identity */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 shadow-lg shadow-indigo-500/20 ring-1 ring-white/20">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold tracking-tight text-white sm:text-xl">
                DreamCanvas <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-pink-400">AI</span>
              </h1>
              <span className="rounded-md border border-indigo-500/30 bg-indigo-500/10 px-1.5 py-0.5 text-[10px] font-medium tracking-wide text-indigo-300">
                SDXL / LDM
              </span>
            </div>
            <p className="hidden text-xs text-slate-400 sm:block">
              Stable Diffusion Text-to-Image Generation & Prompt Engineering Platform
            </p>
          </div>
        </div>

        {/* Status Badge */}
        <div className="hidden lg:flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/90 px-3 py-1 text-xs">
          {isBackendHealthy ? (
            <>
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
              </span>
              <span className="text-slate-300">Diffusion Backend Active</span>
            </>
          ) : (
            <>
              <AlertCircle className="h-3.5 w-3.5 text-amber-400" />
              <span className="text-amber-300">Connecting Server...</span>
            </>
          )}
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="border-t border-slate-800/60 bg-slate-900/60 px-4 sm:px-6">
        <div className="mx-auto flex max-w-7xl space-x-1 overflow-x-auto py-2 scrollbar-none">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`tab-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 whitespace-nowrap rounded-lg px-3 py-1.5 text-xs sm:text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 ring-1 ring-indigo-400/40'
                    : 'text-slate-400 hover:bg-slate-800/80 hover:text-slate-200'
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
                {tab.count !== undefined && tab.count > 0 && (
                  <span
                    className={`ml-1 rounded-full px-1.5 py-0.2 text-[10px] font-semibold ${
                      isActive ? 'bg-indigo-800 text-white' : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
