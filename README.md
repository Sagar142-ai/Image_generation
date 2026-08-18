# 🎨 DreamCanvas AI — AI Image Generator Using Stable Diffusion Pipeline

[![React](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178c6.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8.svg)](https://tailwindcss.com/)
[![Express](https://img.shields.io/badge/Express-4.21-lightgrey.svg)](https://expressjs.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

> **College Minor Project**: B.Tech Computer Science and Engineering (CSE)  
> **Domain**: Generative Artificial Intelligence, Deep Learning, Latent Diffusion Models (LDM), Full-Stack Web Architecture.

---

## 📌 Project Overview & Problem Statement

Generating high-fidelity visual assets from natural language prompts requires sophisticated understanding of text-to-image diffusion mechanics. Ordinary users frequently encounter issues like vague prompts, missing spatial context, unwanted visual artifacts, and confusing mathematical hyperparameters (CFG scales, inference steps, seed reproducibility).

**DreamCanvas AI** is an end-to-end, production-style Generative AI platform that bridges natural language and latent diffusion models through:
1. **Automated Prompt Preprocessing & Intelligent Expansion**: Transforming concise text into rich, multi-dimensional prompts.
2. **Interactive Semantic Prompt Analyzer**: Evaluating prompt strength (0–100) across six key dimensions (Subject, Environment, Visual Style, Lighting, Camera Perspective, Quality Boosters).
3. **Latent Diffusion Synthesis Engine**: Allowing real-time control over inference steps, guidance scale (CFG), resolution, seeds, and negative prompt vectors.
4. **Metadata & History Archive**: Full audit logging of diffusion parameters for deterministic replication.
5. **Interactive Architecture & College Viva Center**: Theoretical explanations, mathematical formulas, and 35+ academic viva defense questions.

---

## 🏗️ System Architecture & Generative AI Pipeline

```
[ User Text Prompt ]
         │
         ▼
[ Prompt Preprocessing & Token Sanitization ]
         │
         ▼
[ AI Prompt Enhancement Service (Gemini Engine) ]
         │
         ▼
[ Classifier-Free Guidance (CFG) & Negative Vector Synthesis ]
         │
         ▼
[ Text Tokenization & CLIP 768-dim Embedding ]
         │
         ▼
[ Latent Space (64x Compression) + Gaussian Noise z_T ]
         │
         ▼
[ Iterative U-Net Denoising Loop (Time-conditioned Cross-Attention) ]
         │
         ▼
[ Variational Autoencoder (VAE) Pixel Decoder: z_0 ➔ RGB ]
         │
         ▼
[ Image Display Canvas & Metadata History Persistence ]
```

---

## ✨ Key Features

- 🖼️ **Multi-Style Visual Presets**: 12+ styles including Photorealistic, Cinematic, Anime, Cyberpunk, 3D Render, Fantasy, Oil Painting, Minimalist, and Watercolor.
- 🚫 **Negative Prompting Vector**: Suppresses anatomical distortions, blurry textures, duplicate artifacts, and watermarks.
- ⚙️ **Mathematical Parameter Controls**:
  - **Inference Steps (10–50)**: Adjusts reverse denoising iterations.
  - **Guidance Scale / CFG (1.0–20.0)**: Balances prompt fidelity vs generative creativity.
  - **Seed Reproducibility**: Deterministic seed locking or randomized variations.
  - **Dynamic Resolutions**: 512×512, 768×512 (Landscape), 512×768 (Portrait), 1024×1024 (HD).
- 🧠 **Prompt Engineering Analyzer**: Scans prompts for missing environmental, lighting, or compositional details with one-click injection.
- 🗄️ **History & Gallery**: Instant search, style filters, fullscreen lightbox zoom, and one-click PNG download.
- 📚 **Prompt Dataset & Templates**: Curated research prompts and blueprint archetypes.
- 🎓 **Academic Defense & Viva Prep**: Timed presentation scripts (30s, 1m, 3m, 5m) and an exhaustive 35+ question examiner Q&A bank.

---

## 💻 Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS v4, Motion, Lucide Icons, Vite
- **Backend**: Express.js (Node.js LTS), TypeScript (transpiled via `esbuild`), CORS & Security Middleware
- **AI Models & SDKs**: `@google/genai` (Server-Side Isolated), Latent Diffusion Pipelines
- **Data Persistence**: File-backed JSON audit store & client state caching
- **Cloud Deployment**: Render, Cloud Run, Vercel

---

## 🚀 Quick Start & Installation

### 1. Clone the repository
```bash
git clone https://github.com/<YOUR_USERNAME>/dreamcanvas-ai.git
cd dreamcanvas-ai
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Create a `.env` file in the root directory:
```env
GEMINI_API_KEY=your_actual_gemini_api_key_here
PORT=3000
NODE_ENV=development
```

### 4. Run Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:3000`.

### 5. Build for Production
```bash
npm run build
npm start
```

---

## 🌐 Deploying to Render

Refer to the complete guide in [`DEPLOYMENT.md`](./DEPLOYMENT.md) for 1-click blueprint deployment instructions on [Render.com](https://render.com).

---

## 👥 Authors & Academic Credits
- **Developer / Student**: B.Tech CSE Final Year Student
- **Course**: Generative AI Minor Project
- **Institution**: Department of Computer Science & Engineering
