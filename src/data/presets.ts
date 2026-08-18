import { StylePreset, PromptTemplate, VivaQuestion } from '../types';

export const STYLE_PRESETS: StylePreset[] = [
  {
    id: 'none',
    name: 'Raw / None',
    category: 'General',
    prompt_suffix: '',
    negative_prompt_suffix: '',
    icon_name: 'Sparkles',
    description: 'No predefined styling applied. Uses pure prompt instructions.',
    example_prompt: 'A vintage steam locomotive in a snowy pine forest'
  },
  {
    id: 'realistic',
    name: 'Realistic Photo',
    category: 'Photography',
    prompt_suffix: 'photorealistic, 8k resolution, shot on 35mm lens, f/1.8, natural soft lighting, hyper-detailed textures, award-winning photography, raw photo',
    negative_prompt_suffix: 'illustration, 3d render, cartoon, airbrushed, oversaturated, plastic skin',
    icon_name: 'Camera',
    description: 'Crisp photorealism with authentic camera lens depth and lifelike skin/materials.',
    example_prompt: 'A wise old sailor standing by the harbor at dawn, weathered face, salt and pepper beard'
  },
  {
    id: 'cinematic',
    name: 'Cinematic',
    category: 'Film',
    prompt_suffix: 'cinematic movie still, 35mm film grain, anamorphic lens flare, dramatic volumetric lighting, color graded, Panavision, masterpiece, depth of field',
    negative_prompt_suffix: 'flat lighting, low contrast, amateur photo, amateur snapshot, oversaturated cartoon',
    icon_name: 'Film',
    description: 'Hollywood blockbuster look with wide dynamic range, dramatic lighting, and film color grading.',
    example_prompt: 'A detective in a trench coat walking down a neon-lit rain-slicked alleyway in 1980s Tokyo'
  },
  {
    id: 'anime',
    name: 'Anime & Manga',
    category: 'Artistic',
    prompt_suffix: 'high quality anime aesthetic, Makoto Shinkai style, vibrant colors, detailed cel shading, clean line art, studio anime visual, 4k wallpaper',
    negative_prompt_suffix: 'photorealistic, 3d render, muddy colors, bad anatomy, deformed eyes, sketches',
    icon_name: 'Palette',
    description: 'Japanese animation aesthetic with expressive lighting, lush backgrounds, and crisp cel art.',
    example_prompt: 'A high school student looking up at a starry night sky with twin moons, cherry blossoms'
  },
  {
    id: 'digital_art',
    name: 'Digital Art',
    category: 'Artistic',
    prompt_suffix: 'digital concept art, trending on ArtStation, dynamic composition, intricate brushstrokes, octane render details, masterpiece by Greg Rutkowski',
    negative_prompt_suffix: 'low resolution, blurry, watermark, cropped, poorly drawn, noisy artifacts',
    icon_name: 'Brush',
    description: 'Concept art illustration with rich painterly textures, bold lighting, and epic composition.',
    example_prompt: 'An ancient obsidian temple perched upon floating sky islands surrounded by waterfalls'
  },
  {
    id: '3d_render',
    name: '3D Octane Render',
    category: '3D Graphics',
    prompt_suffix: 'hyper-realistic 3D render, Octane Render, Unreal Engine 5, ray-tracing, subsurface scattering, ambient occlusion, physically based rendering (PBR)',
    negative_prompt_suffix: '2D flat, sketch, low poly, noisy, jpeg artifacts, dull textures, pixelated',
    icon_name: 'Box',
    description: 'Polished 3D CG aesthetics with realistic raytraced shadows, reflections, and subsurface glow.',
    example_prompt: 'An adorable mechanical baby dragon made of polished copper and glowing amber crystals'
  },
  {
    id: 'fantasy',
    name: 'High Fantasy',
    category: 'Fantasy',
    prompt_suffix: 'epic fantasy world, magical ethereal glow, mystical atmosphere, ancient runes, volumetric fog, dramatic lighting, legendary concept art, high fantasy painting',
    negative_prompt_suffix: 'modern technology, cars, urban, neon, mundane, low quality, pixelated',
    icon_name: 'Wand2',
    description: 'Enchanted worlds with glowing arcane energies, ancient castles, and mythic grandeur.',
    example_prompt: 'A celestial sorceress casting a spiral galaxy spell inside an ancient elven sanctuary'
  },
  {
    id: 'cyberpunk',
    name: 'Cyberpunk',
    category: 'Sci-Fi',
    prompt_suffix: 'cyberpunk aesthetic, vibrant neon cyan and magenta lights, rainy reflective streets, holographic advertisements, futuristic tech, high contrast, gritty sci-fi',
    negative_prompt_suffix: 'pastoral, historical, medieval, natural daylight, desaturated, low resolution',
    icon_name: 'Cpu',
    description: 'High-tech, low-life aesthetic with glowing neon signs, rainy reflections, and cybernetics.',
    example_prompt: 'A cybernetic courier on a glowing electric motorcycle speeding through a mega-city highway'
  },
  {
    id: 'watercolor',
    name: 'Watercolor Painting',
    category: 'Traditional Art',
    prompt_suffix: 'fine art watercolor painting, delicate wash of translucent pigments, paper texture, soft blending, artistic paint splatters, expressive brushwork, museum quality',
    negative_prompt_suffix: 'photograph, 3d render, vector, digital hard lines, oversaturated glossy',
    icon_name: 'Droplets',
    description: 'Fluid watercolor pigments with natural paper texture, soft gradients, and artistic bleeding.',
    example_prompt: 'A tranquil countryside cottage surrounded by blooming lavender fields under a morning mist'
  },
  {
    id: 'oil_painting',
    name: 'Classic Oil Painting',
    category: 'Traditional Art',
    prompt_suffix: 'masterpiece oil on canvas, visible impasto textures, rich oil glazes, chiaroscuro lighting, Rembrandt lighting style, timeless classic fine art',
    negative_prompt_suffix: 'digital render, modern photo, plastic, flat colors, cartoon, anime',
    icon_name: 'Image',
    description: 'Rich impasto brushwork, warm chiaroscuro lighting, and timeless museum classicism.',
    example_prompt: 'A solitary lighthouse defying a stormy ocean tempest at sunset, heavy textured oil strokes'
  },
  {
    id: 'minimalist',
    name: 'Minimalist',
    category: 'Modern',
    prompt_suffix: 'minimalist graphic design, clean lines, negative space, elegant composition, muted sophisticated palette, modern aesthetic, high visual impact',
    negative_prompt_suffix: 'cluttered, chaotic, busy background, noisy textures, excess details, overcomplicated',
    icon_name: 'Layers',
    description: 'Striking simplicity with generous negative space, purposeful forms, and curated color palettes.',
    example_prompt: 'A single red bonsai tree silhouetted against a serene pale gray circle background'
  },
  {
    id: 'portrait',
    name: 'Studio Portrait',
    category: 'Photography',
    prompt_suffix: 'professional studio portrait, 85mm portrait lens, Rembrant softbox lighting, catchlight in eyes, shallow depth of field, detailed skin pore texture, 8k portraiture',
    negative_prompt_suffix: 'distorted face, deformed eyes, extra eyes, asymmetrical face, bad teeth, blurry',
    icon_name: 'User',
    description: 'Dedicated portraiture with flattering studio softboxes, shallow bokeh, and expressive eyes.',
    example_prompt: 'A thoughtful elderly botanist holding an exotic glowing orchid, detailed facial contours'
  },
  {
    id: 'landscape',
    name: 'Epic Landscape',
    category: 'Photography',
    prompt_suffix: 'breathtaking landscape photography, wide-angle 16mm lens, golden hour lighting, atmospheric mountain mist, rule of thirds, ultra-wide view, National Geographic quality',
    negative_prompt_suffix: 'people, indoor, portrait, close-up, cluttered, overexposed, low detail',
    icon_name: 'Mountain',
    description: 'Expansive vistas, majestic mountain peaks, golden hour illumination, and deep scale.',
    example_prompt: 'Glacial fjords in Norway with emerald water reflecting dramatic snow-capped peaks at sunrise'
  }
];

export const PROMPT_TEMPLATES: PromptTemplate[] = [
  {
    id: 'portrait_studio',
    category: 'Portrait',
    title: 'Executive Studio Portrait',
    template: 'A professional portrait of [subject], studio lighting, detailed facial features, sharp focus, 85mm lens, shallow depth of field, cinematic photography',
    sample_subject: 'a confident aerospace engineer with kind eyes wearing modern tech casual attire',
    sample_output_prompt: 'A professional portrait of a confident aerospace engineer with kind eyes wearing modern tech casual attire, studio lighting, detailed facial features, sharp focus, 85mm lens, shallow depth of field, cinematic photography',
    recommended_style: 'portrait',
    recommended_aspect_ratio: '512x768'
  },
  {
    id: 'landscape_breathtaking',
    category: 'Landscape',
    title: 'Majestic Alpine Vista',
    template: 'A breathtaking landscape of [location], dramatic sky, natural lighting, atmospheric depth, golden hour reflections, highly detailed, National Geographic style',
    sample_subject: 'an ancient stone monastery perched atop misty Himalayan cliffs overlooking a crystal river',
    sample_output_prompt: 'A breathtaking landscape of an ancient stone monastery perched atop misty Himalayan cliffs overlooking a crystal river, dramatic sky, natural lighting, atmospheric depth, golden hour reflections, highly detailed, National Geographic style',
    recommended_style: 'landscape',
    recommended_aspect_ratio: '768x512'
  },
  {
    id: 'product_commercial',
    category: 'Product',
    title: 'Luxury Commercial Product',
    template: 'A premium product photograph of [product], studio lighting, clean minimalist podium background, realistic soft shadows, commercial advertising photography, 8k',
    sample_subject: 'a sleek matte-black wireless headphones with rose gold metallic accents on an obsidian stone block',
    sample_output_prompt: 'A premium product photograph of a sleek matte-black wireless headphones with rose gold metallic accents on an obsidian stone block, studio lighting, clean minimalist podium background, realistic soft shadows, commercial advertising photography, 8k',
    recommended_style: 'realistic',
    recommended_aspect_ratio: '512x512'
  },
  {
    id: 'fantasy_mythic',
    category: 'Fantasy',
    title: 'Mystical Fantasy Realm',
    template: 'A magical fantasy scene featuring [subject], mystical atmosphere, dramatic volumetric lighting, bioluminescent flora, highly detailed environment, artstation',
    sample_subject: 'an ancient guardian wolf with crystalline antlers wandering through an enchanted moonlit forest',
    sample_output_prompt: 'A magical fantasy scene featuring an ancient guardian wolf with crystalline antlers wandering through an enchanted moonlit forest, mystical atmosphere, dramatic volumetric lighting, bioluminescent flora, highly detailed environment, artstation',
    recommended_style: 'fantasy',
    recommended_aspect_ratio: '768x512'
  },
  {
    id: 'cyberpunk_city',
    category: 'Cyberpunk',
    title: 'Neon Cyberpunk Metropolis',
    template: 'A futuristic cyberpunk scene featuring [subject], neon lights, rainy streets with neon reflections, cinematic atmosphere, high detail, Unreal Engine 5 render',
    sample_subject: 'a street food ramen noodle stall operated by a friendly robot chef under floating holographic signs',
    sample_output_prompt: 'A futuristic cyberpunk scene featuring a street food ramen noodle stall operated by a friendly robot chef under floating holographic signs, neon lights, rainy streets with neon reflections, cinematic atmosphere, high detail, Unreal Engine 5 render',
    recommended_style: 'cyberpunk',
    recommended_aspect_ratio: '768x512'
  },
  {
    id: 'anime_shinkai',
    category: 'Anime',
    title: 'Ethereal Anime Sky',
    template: 'A stunning anime concept art of [subject], Makoto Shinkai aesthetic, dramatic cumulus clouds, vibrant pastel twilight, sparkling light particles, 4k wallpaper',
    sample_subject: 'two young travelers standing on a grassy hill overlooking a futuristic floating city at sunset',
    sample_output_prompt: 'A stunning anime concept art of two young travelers standing on a grassy hill overlooking a futuristic floating city at sunset, Makoto Shinkai aesthetic, dramatic cumulus clouds, vibrant pastel twilight, sparkling light particles, 4k wallpaper',
    recommended_style: 'anime',
    recommended_aspect_ratio: '768x512'
  },
  {
    id: 'architectural_modern',
    category: 'Architecture',
    title: 'Biophilic Architecture',
    template: 'Architectural photography of [subject], warm natural sunlight, lush integrated gardens, clean geometric glass and cedar wood lines, architectural digest feature',
    sample_subject: 'a cantilevered modern luxury villa built into a coastal cliffside with an infinity pool overlooking the ocean',
    sample_output_prompt: 'Architectural photography of a cantilevered modern luxury villa built into a coastal cliffside with an infinity pool overlooking the ocean, warm natural sunlight, lush integrated gardens, clean geometric glass and cedar wood lines, architectural digest feature',
    recommended_style: 'realistic',
    recommended_aspect_ratio: '768x512'
  },
  {
    id: 'robot_3d',
    category: '3D Render',
    title: 'Cute 3D Character',
    template: 'A charming 3D clay-render style character of [subject], soft studio rim light, vibrant playful colors, isometric view, octane render, Pixar style charm',
    sample_subject: 'a tiny robotic astronaut watering a miniature sunflower on an asteroid',
    sample_output_prompt: 'A charming 3D clay-render style character of a tiny robotic astronaut watering a miniature sunflower on an asteroid, soft studio rim light, vibrant playful colors, isometric view, octane render, Pixar style charm',
    recommended_style: '3d_render',
    recommended_aspect_ratio: '512x512'
  }
];

export const NEGATIVE_PROMPT_PRESETS = [
  {
    label: 'Standard Cleanup (Recommended)',
    prompt: 'blurry, low quality, distorted, deformed, bad anatomy, extra fingers, duplicate objects, text, watermark, cropped, bad hands, artifacts'
  },
  {
    label: 'Anatomy & Face Perfection',
    prompt: 'deformed face, asymmetrical eyes, mutated fingers, extra limbs, fused limbs, malformed hands, bad proportions, cloned face, unnatural pose'
  },
  {
    label: 'Photography Quality Boost',
    prompt: 'oversaturated, plastic skin, CGI, 3D render, cartoon, illustration, drawing, grain, noise, low-resolution, out of focus, motion blur'
  },
  {
    label: 'Remove Text & Watermarks',
    prompt: 'watermark, signature, artist name, username, copyright logo, text, captions, subtitles, branding, letters, numbers, border, frame'
  }
];

export const VIVA_QUESTIONS: VivaQuestion[] = [
  {
    id: 'viva-1',
    category: 'Fundamentals',
    question: 'What is Generative AI and how does it differ from Discriminative AI?',
    short_answer: 'Generative AI creates new content (images, text, audio) by learning underlying data distributions $P(X)$, whereas Discriminative AI classifies or predicts boundaries $P(Y|X)$.',
    deep_explanation: 'Generative AI models learn the joint probability distribution of the input data. Once trained, they can sample from this distribution to generate novel, realistic instances that resemble the training set. Discriminative AI (like classifiers) models the conditional boundary between classes to determine if an existing image is a cat or a dog.',
    key_takeaway: 'Generative = creates new data samples $P(X)$; Discriminative = categorizes existing data $P(Y|X)$.'
  },
  {
    id: 'viva-2',
    category: 'Diffusion Pipeline',
    question: 'What is a Diffusion Model and what are the two main phases (Forward and Reverse)?',
    short_answer: 'A Diffusion Model is a generative model based on non-equilibrium thermodynamics that systematically adds Gaussian noise to data (Forward process) and trains a neural network to systematically denoise it back to a clean image (Reverse process).',
    deep_explanation: 'In the Forward Markov Diffusion Process ($q$), Gaussian noise $\\mathcal{N}(0, \\sigma^2 \\mathbf{I})$ is incrementally injected into an image across $T$ timesteps until it becomes pure random noise. In the Reverse Denoising Process ($p_\\theta$), a U-Net neural network learns to predict the exact noise vector $\\epsilon_\\theta(x_t, t)$ added at each step, allowing the model to iteratively peel back noise to recover or generate a clean sample.',
    key_takeaway: 'Forward = Add noise ($x_0 \\to x_T$); Reverse = Learn to remove noise ($x_T \\to x_0$) via U-Net.'
  },
  {
    id: 'viva-3',
    category: 'Diffusion Pipeline',
    question: 'What is Stable Diffusion (Latent Diffusion Model - LDM) and why is it faster than Pixel Diffusion?',
    short_answer: 'Stable Diffusion performs the iterative denoising process in a compressed, lower-dimensional Latent Space using a Variational Autoencoder (VAE), reducing computational cost by ~64x compared to pixel-space diffusion.',
    deep_explanation: 'Pixel-level diffusion models (like original DDPM) operate on raw high-resolution grids (e.g., $512 \\times 512 \\times 3 = 786,432$ values), making U-Net inference slow and memory-intensive. Stable Diffusion uses a pre-trained VAE Encoder to compress images into a latent representation $z$ of shape $64 \\times 64 \\times 4$ (factor $f=8$). The U-Net denoises in this compact latent space, and the VAE Decoder transforms the final latent back into high-resolution RGB pixels.',
    key_takeaway: 'LDM compresses images $8\\times$ in each spatial dimension into latent space, slashing VRAM and computation.'
  },
  {
    id: 'viva-4',
    category: 'Parameters & Math',
    question: 'What is Classifier-Free Guidance (Guidance Scale / CFG) and how does it work mathematically?',
    short_answer: 'CFG controls how strictly the model adheres to the text prompt versus its creative prior. It interpolates between conditional and unconditional noise predictions.',
    deep_explanation: 'During training, the model is trained conditionally (with text prompt $c$) and unconditionally (with empty text $\\emptyset$). At inference, the modified noise estimate is: $\\tilde{\\epsilon}_\\theta(z_t, c) = \\epsilon_\\theta(z_t, \\emptyset) + s \\cdot (\\epsilon_\\theta(z_t, c) - \\epsilon_\\theta(z_t, \\emptyset))$, where $s$ is the Guidance Scale. A scale of 7–9 produces balanced prompt adherence and natural textures. Too high ($>15$) causes oversaturation and artifacts.',
    key_takeaway: 'Formula: $\\tilde{\\epsilon} = \\epsilon_{uncond} + s \\cdot (\\epsilon_{cond} - \\epsilon_{uncond})$. Higher scale = stricter prompt alignment.'
  },
  {
    id: 'viva-5',
    category: 'Parameters & Math',
    question: 'What is a Seed in Stable Diffusion and why is it critical for reproducibility?',
    short_answer: 'The seed initializes the pseudo-random number generator that creates the initial Gaussian noise latent grid ($z_T$). Fixing the seed with identical parameters reproduces the exact same image.',
    deep_explanation: 'Because diffusion models start from pure Gaussian noise, setting a specific integer seed ensures that the starting noise tensor $z_T \\sim \\mathcal{N}(0, \\mathbf{I})$ is identical across runs. This is essential for scientific experimentation, visual parameter tuning, and deterministic output verification.',
    key_takeaway: 'Seed determines initial random noise tensor; same seed + same parameters = identical output.'
  },
  {
    id: 'viva-6',
    category: 'Parameters & Math',
    question: 'What do Inference Steps represent and what happens if they are too low or too high?',
    short_answer: 'Inference steps are the number of iterative denoising steps the solver takes from $T$ to $0$. 20–35 steps is generally optimal; too low results in blurry noise, too high yields diminishing returns and slow latency.',
    deep_explanation: 'Modern ODE/SDE samplers (Euler, DPM++ 2M, DDIM) solve the reverse diffusion differential equation in discretized steps. With 5-10 steps, the image may appear fuzzy with unfinished geometry. Between 25-35 steps, fine textures converge. Above 50 steps, quality gains plateau while linearly increasing inference latency.',
    key_takeaway: 'Steps = discretization resolution of reverse trajectory. Sweet spot is 25-35 steps.'
  },
  {
    id: 'viva-7',
    category: 'Prompt Engineering',
    question: 'How do Negative Prompts work under the hood in Stable Diffusion?',
    short_answer: 'Negative prompts replace the empty unconditional vector $\\emptyset$ in Classifier-Free Guidance with embeddings of unwanted features, steering the diffusion trajectory AWAY from those concepts.',
    deep_explanation: 'In standard CFG, the model calculates the difference between conditional prompt $c_{pos}$ and empty conditioning $\\emptyset$. When a negative prompt $c_{neg}$ is provided, the formula becomes: $\\tilde{\\epsilon} = \\epsilon(z_t, c_{neg}) + s \\cdot (\\epsilon(z_t, c_{pos}) - \\epsilon(z_t, c_{neg}))$. The vector math actively subtracts the latent direction pointing toward blurriness, extra limbs, or low quality.',
    key_takeaway: 'Negative prompts act as negative vectors in latent guidance, pushing generation away from unwanted concepts.'
  },
  {
    id: 'viva-8',
    category: 'Prompt Engineering',
    question: 'What are the essential building blocks of an effective Generative AI prompt?',
    short_answer: 'A high-impact prompt contains 6 core components: Subject, Environment/Context, Style/Medium, Lighting, Camera/Composition, and Quality Modifiers.',
    deep_explanation: '1. Subject (What is being depicted), 2. Setting/Environment (Where it takes place), 3. Style & Art Medium (Photorealistic, Anime, Oil Painting, 3D Octane), 4. Lighting (Volumetric, Golden Hour, Cinematic rim light), 5. Camera & Angle (35mm lens, wide angle, macro, shallow depth of field), 6. Quality anchors (8k resolution, award-winning, sharp focus).',
    key_takeaway: 'Structure: [Subject] in [Environment], [Style], [Lighting], [Composition/Lens], [Quality Descriptors].'
  },
  {
    id: 'viva-9',
    category: 'Architecture & Security',
    question: 'Why is the AI API key kept strictly on the backend and never passed to the frontend?',
    short_answer: 'Client-side code (JavaScript/React) runs in the user’s browser and is completely inspectable. Storing secrets client-side leads to key theft, quota exhaustion, financial loss, and unauthorized API abuse.',
    deep_explanation: 'Any variable included in client bundles or network requests is visible in browser DevTools. By creating a proxy backend (Express/FastAPI), API credentials remain securely sealed in server environment variables (.env). The backend also enforces input validation, rate limiting, and content sanitization.',
    key_takeaway: 'Defense-in-depth: Frontends are untrusted clients; backends securely manage API authentication and billing.'
  },
  {
    id: 'viva-10',
    category: 'Diffusion Pipeline',
    question: 'What is the role of CLIP (Contrastive Language-Image Pre-training) in Stable Diffusion?',
    short_answer: 'CLIP’s Text Encoder tokenizes and converts natural-language text prompts into 768-dimensional embedding vectors that guide the U-Net via Cross-Attention layers.',
    deep_explanation: 'CLIP is trained on 400M+ image-text pairs to align visual and textual concepts in a shared mathematical embedding space. Stable Diffusion uses CLIP (or OpenCLIP / T5 in SDXL) to transform user words into token embeddings. The U-Net’s Cross-Attention mechanisms calculate attention scores between image latent patches and text tokens at every denoising step.',
    key_takeaway: 'CLIP translates words into dense mathematical vectors that cross-attend with image latents.'
  },
  {
    id: 'viva-11',
    category: 'Architecture & Security',
    question: 'Why is SQLite / local metadata storage suitable for this application?',
    short_answer: 'SQLite is an embedded, zero-configuration, serverless SQL database engine that provides ACID compliance, fast single-file persistence, and zero operational overhead for project prototypes.',
    deep_explanation: 'Unlike heavy client-server relational databases (PostgreSQL/MySQL) that require separate running daemon processes and network configuration, SQLite operates within the host process memory/filesystem. It enables structured querying of generation history, prompt analytics, and parameter correlation with instant retrieval times.',
    key_takeaway: 'SQLite gives full relational SQL power in a lightweight, self-contained, embedded format.'
  },
  {
    id: 'viva-12',
    category: 'Limitations & Ethics',
    question: 'What are the main technical limitations and ethical challenges of Diffusion Models?',
    short_answer: 'Key limitations include text/spelling rendering difficulty, limb/hand geometric hallucinations, and high compute requirements. Ethical concerns include deepfakes, copyright attribution, and training data biases.',
    deep_explanation: 'Diffusion models struggle with counting (e.g., drawing exactly 5 fingers) and typographic spelling because CLIP embeds concepts semantically rather than phonetically or geometrically. Ethically, models may reflect cultural and demographic biases present in web-scraped datasets (like LAION-5B), and can potentially be misused to generate non-consensual imagery or misleading synthetic media.',
    key_takeaway: 'Limitations: Hand/text rendering, compute cost. Ethics: Deepfakes, dataset bias, copyright, safety filtering.'
  }
];

export const DIFFUSION_PIPELINE_STEPS = [
  {
    step: 1,
    title: 'Text Tokenization & CLIP Encoding',
    description: 'The user text prompt is split into sub-word tokens and transformed into 768-dimensional contextual vectors by the frozen CLIP Text Encoder.',
    math: 'E = \\text{CLIP}_{\\text{text}}(\\text{Prompt}) \\in \\mathbb{R}^{77 \\times 768}',
    output: 'Text Embedding Tensor'
  },
  {
    step: 2,
    title: 'Latent Noise Tensor Initialization',
    description: 'A 4-channel latent tensor is initialized with standard normal Gaussian noise $\\mathcal{N}(0, \\mathbf{I})$ based on the selected random seed.',
    math: 'z_T \\sim \\mathcal{N}(0, \\mathbf{I}) \\in \\mathbb{R}^{4 \\times \\frac{H}{8} \\times \\frac{W}{8}}',
    output: 'Initial Gaussian Noise Latent ($z_T$)'
  },
  {
    step: 3,
    title: 'Iterative U-Net Denoising Loop',
    description: 'Over $N$ steps, the Time-Conditional U-Net uses Cross-Attention to predict the noise $\\epsilon_\\theta(z_t, t, E)$ guided by CFG and subtracts it.',
    math: 'z_{t-1} = \\text{Sampler}(z_t, \\tilde{\\epsilon}_\\theta(z_t, t, E, E_{\\text{neg}}))',
    output: 'Denoised Clean Latent ($z_0$)'
  },
  {
    step: 4,
    title: 'VAE Latent Space Decoding',
    description: 'The final denoised latent vector $z_0$ is decoded by the Variational Autoencoder Decoder back into 3-channel RGB pixel space ($H \\times W \\times 3$).',
    math: 'I_{\\text{RGB}} = \\text{VAE}_{\\text{Decoder}}(z_0) \\in \\mathbb{R}^{H \\times W \\times 3}',
    output: 'Final High-Resolution Image'
  }
];

export const VIVA_PITCH_SCRIPTS = {
  thirtySeconds: `DreamCanvas AI is a full-stack Generative AI platform demonstrating the complete text-to-image pipeline using Stable Diffusion principles. It takes natural language prompts, applies intelligent prompt engineering and visual style synthesis, allows fine-grained diffusion parameter tuning (steps, CFG scale, seed, dimensions), and generates high-resolution imagery with full metadata tracking and a prompt analyzer.`,
  oneMinute: `Good morning, professors. My minor project is DreamCanvas AI, an end-to-end Generative AI text-to-image application.

Traditional image generation demos are black boxes with just one text box. In contrast, DreamCanvas AI demonstrates the entire scientific diffusion pipeline:
1. First, our Prompt Preprocessing & Analyzer module breaks down prompts into subject, environment, lighting, and composition, suggesting missing visual cues.
2. Second, our Style Engine blends domain-specific tokens for photorealism, anime, cyberpunk, and digital art.
3. Third, the user controls core mathematical diffusion parameters—Classifier-Free Guidance (CFG scale), iterative denoising steps, random seeds for deterministic reproducibility, and negative prompts to steer trajectories away from artifacts.
4. Finally, all generations are saved with complete technical metadata in our database. The architecture uses a decoupled React frontend and secure server-side API proxy to protect credentials.`,
  threeMinutes: `Respected evaluators, I am presenting 'DreamCanvas AI - Stable Diffusion Image Generation Platform'.

Problem Statement:
Most introductory AI demos lack transparency into how diffusion models operate, leaving students and developers confused about prompt mechanics, latent space, and hyperparameter tuning.

Key Architecture Components:
1. Prompt Engineering Subsystem: Implements automated token enrichment, negative prompt guidance, and a rule-based/AI prompt analyzer that scores prompt descriptive completeness.
2. Stable Diffusion Parameterization: Exposes the core hyperparameter controls:
   - Inference Steps (10–50): Governing the discretization granularity of the reverse SDE/ODE solver.
   - Guidance Scale / CFG (1.0–20.0): Scaling the vector offset between conditional and unconditional predictions.
   - Seed Management: Ensuring deterministic reproducibility by fixing Gaussian initial noise.
   - Latent Resolution: Managing aspect ratios across standard diffusion tile grids.
3. Backend Proxy & Storage: Built with Express/FastAPI architecture where API secrets remain strictly server-side, preventing token leakage while storing full generation metadata in SQLite.
4. Frontend Dashboard: A modern, responsive dashboard with real-time diffusion progress visualization, image lightbox, history management, and an interactive academic viva guide.`,
  fiveMinutes: `Respected panel of examiners, welcome to the demonstration and defense of 'DreamCanvas AI'.

1. Theoretical Foundation:
Stable Diffusion is a Latent Diffusion Model (LDM). Unlike pixel-space diffusion models that suffer from extreme computational complexity, LDM operates in a 64x compressed latent space enabled by a pre-trained Variational Autoencoder (VAE). The text conditioning is projected into semantic space via CLIP embeddings and integrated into the U-Net through Cross-Attention layers.

2. Application Workflow:
- Phase A (Input & Analysis): The user enters a prompt. The built-in Prompt Analyzer parses tokens into semantic dimensions: Subject, Environment, Style, Lighting, and Composition.
- Phase B (Style Augmentation): Selecting a style preset injects domain-specific positive modifiers (e.g. '35mm lens, f/1.8, natural soft lighting') and appends negative prompt filters to prevent common generation flaws.
- Phase C (Parameter Configuration): The user sets CFG scale, inference steps, and seed. We explain the mathematical significance of CFG $\\tilde{\\epsilon} = \\epsilon_{uncond} + s(\\epsilon_{cond} - \\epsilon_{uncond})$.
- Phase D (Execution & Decoding): The server calls the diffusion engine. The latent is iteratively denoised and decoded by the VAE into an RGB image.
- Phase E (Storage & Post-Processing): The image is delivered to the client, logged with time benchmarks, and stored in the history gallery.

3. Project Significance:
This project demonstrates software engineering best practices: secret isolation, modular frontend-backend separation, responsive UI design, and deep technical comprehension of Generative AI principles.`
};
