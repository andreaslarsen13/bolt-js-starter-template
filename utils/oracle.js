import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function generateOracleCard() {
  const res = await openai.responses.create({
    prompt: {
      id: process.env.OPENAI_PROMPT_ID,
      version: '1',
    },
  });
  return res.output_text.trim();
}

