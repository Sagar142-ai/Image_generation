import React, { useState } from 'react';
import { GraduationCap, BookOpen, Clock, Search, ChevronDown, ChevronUp, Sparkles, CheckCircle, ShieldAlert, Award, FileText } from 'lucide-react';
import { VIVA_QUESTIONS, VIVA_PITCH_SCRIPTS } from '../data/presets';
import { VivaQuestion } from '../types';

export const VivaPrepView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedQuestionId, setExpandedQuestionId] = useState<string | null>(VIVA_QUESTIONS[0].id);
  const [activePitchTab, setActivePitchTab] = useState<'30s' | '1m' | '3m' | '5m'>('1m');

  const categories = ['all', 'Fundamentals', 'Diffusion Pipeline', 'Parameters & Math', 'Prompt Engineering', 'Architecture & Security', 'Limitations & Ethics'];

  const filteredQuestions = VIVA_QUESTIONS.filter((q) => {
    const matchesCategory = selectedCategory === 'all' || q.category === selectedCategory;
    const matchesSearch =
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.short_answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.deep_explanation.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl backdrop-blur-md">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/30">
            <GraduationCap className="h-5 w-5 text-amber-400" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">College Minor Project Viva & Defense Center</h2>
            <p className="text-xs text-slate-400">
              Complete academic viva preparation guide, timed presentation scripts, and technical Q&A.
            </p>
          </div>
        </div>
      </div>

      {/* Timed Pitch & Presentation Scripts Section */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-amber-400" />
            <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wide">
              Project Presentation Scripts for Evaluators
            </h3>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setActivePitchTab('30s')}
              className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition ${
                activePitchTab === '30s'
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              30s Elevator Pitch
            </button>
            <button
              type="button"
              onClick={() => setActivePitchTab('1m')}
              className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition ${
                activePitchTab === '1m'
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              1-Minute Overview
            </button>
            <button
              type="button"
              onClick={() => setActivePitchTab('3m')}
              className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition ${
                activePitchTab === '3m'
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              3-Minute Technical
            </button>
            <button
              type="button"
              onClick={() => setActivePitchTab('5m')}
              className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition ${
                activePitchTab === '5m'
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              5-Minute Defense
            </button>
          </div>
        </div>

        {/* Active Script Text */}
        <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 text-xs sm:text-sm text-slate-300 font-sans leading-relaxed whitespace-pre-line">
          {activePitchTab === '30s' && VIVA_PITCH_SCRIPTS.thirtySeconds}
          {activePitchTab === '1m' && VIVA_PITCH_SCRIPTS.oneMinute}
          {activePitchTab === '3m' && VIVA_PITCH_SCRIPTS.threeMinutes}
          {activePitchTab === '5m' && VIVA_PITCH_SCRIPTS.fiveMinutes}
        </div>
      </div>

      {/* Comprehensive Viva Q&A Bank */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wide flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-indigo-400" />
            <span>Viva Examination Questions & Answers ({filteredQuestions.length})</span>
          </h3>

          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search concepts (CFG, VAE, CLIP, Seed)..."
              className="w-full rounded-xl border border-slate-800 bg-slate-900 pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-lg px-2.5 py-1 text-xs font-medium transition ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white font-semibold'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {cat === 'all' ? 'All Questions' : cat}
            </button>
          ))}
        </div>

        {/* Question Accordion List */}
        <div className="space-y-3">
          {filteredQuestions.map((q) => {
            const isExpanded = expandedQuestionId === q.id;

            return (
              <div
                key={q.id}
                className="rounded-2xl border border-slate-800 bg-slate-900/80 overflow-hidden shadow-lg transition hover:border-slate-700"
              >
                <button
                  type="button"
                  onClick={() => setExpandedQuestionId(isExpanded ? null : q.id)}
                  className="flex w-full items-center justify-between p-4 sm:p-5 text-left transition hover:bg-slate-800/40"
                >
                  <div className="flex items-center gap-3">
                    <span className="rounded-md border border-indigo-500/30 bg-indigo-500/10 px-2 py-0.5 text-[11px] font-semibold text-indigo-300 shrink-0">
                      {q.category}
                    </span>
                    <h4 className="text-xs sm:text-sm font-semibold text-slate-100">{q.question}</h4>
                  </div>
                  {isExpanded ? <ChevronUp className="h-4 w-4 text-slate-400 shrink-0 ml-2" /> : <ChevronDown className="h-4 w-4 text-slate-400 shrink-0 ml-2" />}
                </button>

                {isExpanded && (
                  <div className="border-t border-slate-800/80 p-4 sm:p-5 space-y-3.5 bg-slate-950/40 text-xs">
                    {/* Short Concise Answer */}
                    <div className="rounded-xl border border-emerald-500/20 bg-emerald-950/30 p-3 text-slate-200">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 mb-1">
                        Concise Viva Response (30 Seconds):
                      </div>
                      <p className="leading-relaxed font-sans">{q.short_answer}</p>
                    </div>

                    {/* Detailed Technical Explanation */}
                    <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-3 text-slate-300">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                        In-Depth Examiner Explanation:
                      </div>
                      <p className="leading-relaxed font-sans text-slate-300">{q.deep_explanation}</p>
                    </div>

                    {/* Key Takeaway Formula / Rule */}
                    <div className="flex items-center gap-2 text-[11px] font-mono text-indigo-300 bg-indigo-950/40 p-2.5 rounded-lg border border-indigo-900/50">
                      <Sparkles className="h-3.5 w-3.5 text-indigo-400 shrink-0" />
                      <span>Takeaway: {q.key_takeaway}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
