# 🚀 Deployment Guide: Deploying DreamCanvas AI on Render

This guide provides step-by-step instructions to deploy your **DreamCanvas AI** full-stack project to **Render** (as a Web Service) or GitHub.

---

## 📋 Prerequisites
1. A free account on [Render.com](https://render.com)
2. A free account on [GitHub](https://github.com)
3. A Google Gemini API Key from [Google AI Studio](https://aistudio.google.com/app/apikey)

---

## 🛠️ Method 1: Deploy via GitHub (Recommended)

### Step 1: Export or Push Code to GitHub
1. Export your project files from Google AI Studio (via **Settings > Export to ZIP** or GitHub Export).
2. Initialize and push your repository to GitHub:
```bash
git init
git add .
git commit -m "Initial commit: DreamCanvas AI Minor Project"
git branch -M main
git remote add origin https://github.com/<YOUR_USERNAME>/dreamcanvas-ai.git
git push -u origin main
```

### Step 2: Create a New Web Service on Render
1. Log in to your [Render Dashboard](https://dashboard.render.com/).
2. Click **New +** in the top navigation bar and select **Web Service**.
3. Connect your GitHub repository (`dreamcanvas-ai`).

### Step 3: Configure Service Settings
Fill in the following build and runtime configurations:

| Field | Value |
|---|---|
| **Name** | `dreamcanvas-ai` (or any unique name) |
| **Region** | Singapore / Oregon / Frankfurt (closest to your users) |
| **Branch** | `main` |
| **Root Directory** | `.` (leave blank for root) |
| **Runtime** | `Node` |
| **Build Command** | `npm install && npm run build` |
| **Start Command** | `npm start` |
| **Instance Type** | `Free` |

### Step 4: Configure Environment Variables
Under the **Environment Variables** section on Render, add:

1. `GEMINI_API_KEY` = `your_actual_gemini_api_key_here`
2. `NODE_ENV` = `production`

*(Note: Render automatically supplies `PORT`, and your backend dynamically binds to it.)*

### Step 5: Deploy
Click **Create Web Service**. Render will:
- Clone your repository
- Run `npm install` and `npm run build` (compiling the Vite frontend into `dist/` and bundling the TypeScript backend into `dist/server.cjs`)
- Start your server using `npm start`
- Provide you with a live URL (e.g., `https://dreamcanvas-ai.onrender.com`)

---

## 🛠️ Method 2: Automatic Blueprint Deployment (`render.yaml`)

Because this project includes a `render.yaml` blueprint file:
1. In Render, select **New + > Blueprint**.
2. Select your GitHub repository.
3. Render will automatically detect `render.yaml` and configure the build command, start command, and environment variables.
4. Input your `GEMINI_API_KEY` in the prompt, and click **Apply**.

---

## 🧪 Local Testing Before Deployment

To verify your production build locally before uploading:

```bash
# 1. Install dependencies
npm install

# 2. Build production assets
npm run build

# 3. Start production server
npm start
```
Visit `http://localhost:3000` to verify that all endpoints (`/api/health`, `/api/generate`, `/api/history`) function properly.

---

## 🔍 Troubleshooting on Render

- **Build failed with "Out of memory"**: The build configuration uses `esbuild` which is extremely lightweight and fast. The free tier (512MB RAM) easily handles this.
- **Image Generation returns error**: Ensure `GEMINI_API_KEY` is added in Render's **Environment** tab without leading or trailing whitespace.
- **Spin-down on Inactivity**: Render free instances enter sleep mode after 15 minutes of inactivity. The first request after sleep may take ~30-50 seconds to spin up.
