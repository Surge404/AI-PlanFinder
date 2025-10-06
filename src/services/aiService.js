// AI Service for Benefits Discovery
// Uses Google Gemini 2.5 Flash API for text classification and action plan generation

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_API_URL = import.meta.env.VITE_GEMINI_API_URL;

// EXACT PROMPTS FOR AI (Copy these for production use)

export const CLASSIFICATION_PROMPT = (userInput) => `Return ONLY one of these category names — Dental, OPD, Vision, Mental Health — that best matches the user text. Output exactly the category name and nothing else. If the text is ambiguous or none match, output "UNRECOGNIZED".

User text: "${userInput}"`;

export const CLARIFICATION_PROMPT = (userInput) => `The user wrote: "${userInput}". Ask a single concise clarifying question that will help classify this into Dental, OPD, Vision, or Mental Health. Return ONLY the clarifying question sentence.`;

export const ACTION_PLAN_PROMPT = (benefit, userInput) => `Given:

selectedBenefit: {
  title: "${benefit.title}",
  coverage: ${benefit.coverage}%,
  description: "${benefit.description}"
}
user_input: "${userInput}"

Return a JSON object exactly in this shape (no extra text):
{
  "steps": [
    {
      "step": 1,
      "title": "Short title (max 6 words)",
      "description": "Action description (1-2 sentences).",
      "estimatedTime": "e.g. 1-2 days or 1 hour",
      "requiredDocs": ["list","of","docs"]
    },
    {
      "step": 2,
      "title": "...",
      "description": "...",
      "estimatedTime": "...",
      "requiredDocs": [...]
    },
    {
      "step": 3,
      "title": "...",
      "description": "...",
      "estimatedTime": "...",
      "requiredDocs": [...]
    }
  ],
  "notes": "One-sentence extra note if needed, otherwise empty string"
}`;

// Generic Gemini API call
async function callGeminiAPI(prompt) {
  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            role: 'user',
            parts: [{ text: prompt }],
          },
        ],
        generationConfig: {
          temperature: 0.3,
          topK: 1,
          topP: 1,
          maxOutputTokens: 2048,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();

    if (
      !data.candidates ||
      !data.candidates[0] ||
      !data.candidates[0].content ||
      !data.candidates[0].content.parts ||
      !data.candidates[0].content.parts[0].text
    ) {
      throw new Error('Invalid API response structure');
    }

    const text = data.candidates[0].content.parts[0].text.trim();
    return text;
  } catch (error) {
    console.error('Gemini API Error:', error);
    throw error;
  }
}

// Classify user input into benefit category
export async function classifyText(userInput) {
  const prompt = CLASSIFICATION_PROMPT(userInput);
  const result = await callGeminiAPI(prompt);

  const validCategories = ['Dental', 'OPD', 'Vision', 'Mental Health', 'UNRECOGNIZED'];
  const category = result.trim();

  if (validCategories.includes(category)) {
    return category;
  }

  return 'UNRECOGNIZED';
}

// Get clarifying question when classification is ambiguous
export async function getClarifyingQuestion(userInput) {
  const prompt = CLARIFICATION_PROMPT(userInput);
  const result = await callGeminiAPI(prompt);
  return result;
}

// Generate action plan for selected benefit
export async function generateActionPlan(benefit, userInput) {
  const prompt = ACTION_PLAN_PROMPT(benefit, userInput);
  const result = await callGeminiAPI(prompt);

  try {
    const jsonMatch = result.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      return parsed;
    }

    return JSON.parse(result);
  } catch (error) {
    console.error('Failed to parse action plan JSON:', error);
    throw new Error('Failed to generate valid action plan');
  }
}

// Configuration object for easy API key management
export const aiConfig = {
  apiKey: GEMINI_API_KEY,
  apiUrl: GEMINI_API_URL,
  model: 'gemini-2.5-flash',
};

export default {
  classifyText,
  getClarifyingQuestion,
  generateActionPlan,
  aiConfig,
};
