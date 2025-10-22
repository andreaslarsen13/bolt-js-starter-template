import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function generateOracleCard() {
  const prompt =
    'Generate a mystical oracle card message in one or two sentences. It should sound wise, poetic, and reflective.';
  const res = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{ role: 'user', content: prompt }],
  });
  return res.choices[0].message.content.trim();
}

