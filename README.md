# MEME SCOUT — Deploy Guide

## Files
- server.js         — Express backend, handles Claude API scoring
- package.json      — Dependencies
- railway.toml      — Railway config
- public/index.html — Terminal frontend
- .gitignore        — Excludes node_modules

## Deploy to Railway (5 minutes)

### Step 1 — GitHub
Upload all these files to a new GitHub repo

### Step 2 — Railway
1. Go to railway.app
2. Click New Project
3. Select Deploy from GitHub
4. Connect your repo

### Step 3 — Environment Variable
In Railway dashboard:
- Go to Variables tab
- Add: ANTHROPIC_API_KEY = your key from console.anthropic.com

### Step 4 — Live
Railway auto-deploys. You get a URL like:
https://meme-scout-production.up.railway.app

Open it on any device. Terminal is live.

## What It Does
- Fetches live meme coins from DexScreener (Solana + ETH)
- AI scores each token 0-100 using Claude
- Fires alerts for tokens scoring 65+
- Sends Telegram alerts with TP/SL targets
- Auto-rescans every 3 minutes

## Environment Variables Required
ANTHROPIC_API_KEY = sk-ant-...

## Telegram Setup (in the app)
1. Create a bot via @BotFather on Telegram
2. Get your chat ID via @userinfobot
3. Enter both in the Telegram Alerts panel bottom right
4. High score alerts fire to your Telegram automatically
