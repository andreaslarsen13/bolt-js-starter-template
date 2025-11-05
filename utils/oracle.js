import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Topics extracted from Ginny's language palette, thematic anchors, and newsletters
const TOPICS = [
  // Consciousness & Self-awareness
  'awake',
  'inner work',
  'presence',
  'frequency',
  'truth',
  'awareness',
  'stillness',
  'consciousness',
  'self-awareness',
  'inner compass',
  'trusting your gut',
  
  // Leadership & Agency
  'leadership',
  'power',
  'purpose',
  'practice',
  'boundaries',
  'responsibility',
  'courage',
  'discipline',
  'agency',
  'decisiveness',
  'speaking up',
  'holistic leadership',
  'crisis leadership',
  
  // Human Connection
  'love',
  'empathy',
  'trust',
  'compassion',
  'wholeness',
  'connection',
  'building trust',
  'reading the room',
  
  // Transformation & Growth
  'remembering',
  'refinement',
  'alignment',
  'evolution',
  'becoming',
  'transformation',
  'leveling up',
  'pushing limits',
  'taking risks',
  
  // Thematic Anchors - Know Yourself
  'self-honesty',
  'self-trust',
  'competencies',
  'inherited beliefs',
  'self-imposed limits',
  
  // Thematic Anchors - Speak Your Truth
  'authentic voice',
  'integrity',
  'difficult conversations',
  'professional disrespect',
  
  // Thematic Anchors - Inspire Love
  'leading with empathy',
  'protecting well-being',
  'safety first',
  
  // Thematic Anchors - Expand Consciousness
  'curiosity',
  'perspective',
  'humility',
  'global mindset',
  'discernment',
  'adaptability',
  'cross-disciplinary thinking',
  
  // Thematic Anchors - Activate Mastery
  'mastery',
  'accountability',
  'intention setting',
  'goals that scare you',
  
  // Concepts from newsletters
  'waking up',
  'fitting in',
  'honesty with feelings',
  'self-respect',
  'impact',
  'urgency vs. stillness',
  'meeting yourself',
  'performance vs. presence',
  'leading from alignment',
  'approval-seeking',
  'team leadership',
  'inner calm',
  'seeing the whole picture',
  'root causes',
  'surface-level solutions',
  'organizational distress',
  'how work flows',
  'recurring challenges',
  'structural problems',
  'uncertainty',
  'confidence',
  'resourcefulness',
  'network',
  'catastrophizing',
  'taking action',
  'decision paralysis',
  'selective adaptation',
  'information overload',
  'retaining wisdom',
  'deep engagement',
  'comfort zone',
  'self-doubt',
  'rationalizations',
  'resilience',
  'worthiness',
  'courage vs. talent',
  'broken promises',
  'dignity',
  'boundaries in action',
  'saying no',
  'resisting change',
  'personal agency',
  'freedom to respond',
  'self-care as leadership',
];

/**
 * Randomly selects an item from an array
 */
function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

export async function generateOracleCard() {
  // Randomly select a topic
  const topic = getRandomItem(TOPICS);
  
  // Generate the input prompt with just the topic
  const input = `generate about ${topic}`;
  
  console.log(`🎲 Randomly selected topic: "${topic}"`);
  console.log(`📝 AI input: "${input}"`);
  
  const res = await openai.responses.create({
    prompt: {
      id: process.env.OPENAI_PROMPT_ID,
      version: process.env.OPENAI_PROMPT_VERSION,
    },
    input: input,
  });
  return res.output_text.trim();
}

