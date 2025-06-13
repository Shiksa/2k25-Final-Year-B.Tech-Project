const express = require('express');
const { OpenAI } = require('openai');
const router = express.Router();
require('dotenv').config();


const openai = new OpenAI({
  // apiKey: process.env.OPENAI_API_KEY,
  apiKey: process.env.GROQ_API_KEY,
  baseURL: 'https://api.groq.com/openai/v1',
});

router.post('/chat', async (req, res) => {
  const { message } = req.body;

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Invalid message format' });
  }

  try {
    const response = await openai.chat.completions.create({
      // model: 'gpt-3.5-turbo',
      model: 'llama3-70b-8192', // ✅ Groq-supported model
      messages: [
        {
          role: 'system',
          content: `You are MedBuddy, a helpful AI health assistant. You are not a real doctor and your responses should never be taken as medical advice. Always recommend that users consult a licensed doctor for any serious or persistent symptoms.

You can then suggest:
- Home remedies (like warm salt water gargling, turmeric milk, hydration, avoiding spicy food, take rest, etc.)
- Basic do’s and don’ts (avoid fried food, avoid cold drinks, eat light meals, etc.)
- Very basic OTC medicines *only when clearly safe*, such as:
  - Paracetamol for fever above 100.4°F
  - Rantac or Eno for mild acidity

Avoid giving advice on prescription medicines, antibiotics, or any treatment that could be harmful if misused. Always be cautious and clear that medical consultation is best for accuracy.`
        },
        {
          role: 'user',
          content: message,
        },
      ],
      temperature: 0.7,
    });

    const reply = response.choices?.[0]?.message?.content || "Sorry, I couldn't generate a reply.";
    res.json({ reply });

  } catch (err) {
    console.error('OpenAI error:', err.message);
    res.status(500).json({ error: 'Failed to generate a response from MedBuddy.' });
  }
});

module.exports = router;
