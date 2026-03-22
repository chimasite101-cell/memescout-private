const express = require('express');
const cors = require('cors');
const Anthropic = require('@anthropic-ai/sdk');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Score endpoint
app.post('/score', async (req, res) => {
  const { token } = req.body;
  if(!token) return res.status(400).json({ error: 'No token data' });

  try {
    const response = await client.messages.create({
      model: 'claude-opus-4-6',
      max_tokens: 150,
      messages: [{
        role: 'user',
        content: `Meme coin analysis. Respond ONLY in this format:
SCORE: [0-100]
VERDICT: [BUY/WATCH/AVOID]
REASON: [one sentence, max 20 words]

Token: ${token.name} | Chain: ${token.chain} | MCap: $${token.mcap} | Vol24h: $${token.volume} | Change24h: ${token.change24h}% | Change1h: ${token.change1h}% | Liquidity: $${token.liquidity} | Age: ${token.age} | Txns24h: ${token.txns}`
      }]
    });

    const txt = response.content[0].text;
    const sm = txt.match(/SCORE:\s*(\d+)/);
    const vm = txt.match(/VERDICT:\s*(\w+)/);
    const rm = txt.match(/REASON:\s*(.+)/);

    res.json({
      score: sm ? parseInt(sm[1]) : 50,
      verdict: vm ? vm[1] : 'WATCH',
      analysis: rm ? rm[1].trim() : 'Analysis unavailable.'
    });
  } catch(err) {
    console.error(err);
    res.status(500).json({ error: 'Scoring failed' });
  }
});

// Health check
app.get('/health', (req, res) => res.json({ status: 'online', system: 'MEME SCOUT' }));

// Serve frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`MEME SCOUT terminal online — port ${PORT}`);
});
