export interface GenerationRequest {
  prompt: string;
  style?: string;
  negative_prompt?: string;
  width?: number;
  height?: number;
  steps?: number;
  guidance_scale?: number;
  seed?: number;
  model?: string;
  sampler?: string;
  enable_enhancement?: boolean;
}

export interface PromptAnalysis {
  subject: string;
  environment: string;
  style: string;
  lighting: string;
  composition: string;
  quality_descriptors: string[];
  missing_details: string[];
  strength_score: number; // 0 to 100
  suggestions: string;
}

export interface GenerationResult {
  id: string;
  original_prompt: string;
  enhanced_prompt: string;
  negative_prompt: string;
  style: string;
  width: number;
  height: number;
  steps: number;
  guidance_scale: number;
  seed: number;
  model: string;
  sampler: string;
  image_url: string;
  generation_time_ms: number;
  created_at: string;
  analysis?: PromptAnalysis;
}

export interface StylePreset {
  id: string;
  name: string;
  category: string;
  prompt_suffix: string;
  negative_prompt_suffix: string;
  icon_name: string;
  description: string;
  example_prompt: string;
}

export interface PromptTemplate {
  id: string;
  category: string;
  title: string;
  template: string;
  sample_subject: string;
  sample_output_prompt: string;
  recommended_style: string;
  recommended_aspect_ratio: string;
}

export interface VivaQuestion {
  id: string;
  category: 'Fundamentals' | 'Diffusion Pipeline' | 'Prompt Engineering' | 'Parameters & Math' | 'Architecture & Security' | 'Limitations & Ethics';
  question: string;
  short_answer: string;
  deep_explanation: string;
  key_takeaway: string;
}

export type ActiveTab = 'generator' | 'history' | 'analyzer' | 'templates' | 'architecture' | 'viva';
