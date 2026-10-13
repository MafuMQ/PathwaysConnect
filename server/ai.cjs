const fs = require('fs');
const path = require('path');

// Ensure GEMINI_API_KEY is loaded from .env if not in process.env
function loadEnv() {
  if (process.env.GEMINI_API_KEY) return;
  try {
    const envPath = path.resolve(__dirname, '../.env');
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, 'utf8');
      content.split('\n').forEach(line => {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith('#')) {
          const eqIdx = trimmed.indexOf('=');
          if (eqIdx !== -1) {
            const key = trimmed.slice(0, eqIdx).trim();
            let val = trimmed.slice(eqIdx + 1).trim();
            if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
              val = val.slice(1, -1);
            }
            if (!process.env[key]) {
              process.env[key] = val;
            }
          }
        }
      });
    }
  } catch (err) {
    console.warn('[AI Service] Failed to load .env file:', err.message);
  }
}

loadEnv();

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Prioritized cascade of Google Gemini models
const DEFAULT_MODELS = [
  'gemini-2.5-flash',
  'gemini-3.5-flash',
  'gemini-3.7-flash',
  'gemini-3.8-flash',
  'gemini-2.5-flash-lite',
  'gemini-1.5-flash',
  'gemini-flash-latest'
];

const VALID_STANDARD_SUBJECTS = [
  'English HL', 'English FAL', 
  'Afrikaans HL', 'Afrikaans FAL', 
  'isiZulu HL', 'isiZulu FAL', 
  'isiXhosa HL', 'isiXhosa FAL', 
  'Sepedi HL', 'Sepedi FAL', 
  'Sesotho HL', 'Sesotho FAL', 
  'Setswana HL', 'Setswana FAL', 
  'Mathematics', 'Mathematical Literacy', 'Technical Mathematics',
  'Life Sciences', 'Physical Sciences', 'Information Technology', 'Computer Applications Technology',
  'Accounting', 'Business Studies', 'Economics', 
  'Geography', 'History', 'Tourism', 'Consumer Studies', 
  'Life Orientation'
];

const SYSTEM_PROMPT = `You are an expert OCR & Academic Document Extraction AI specialized in South African education (CAPS curriculum, Department of Basic Education / DBE, and IEB).

Analyze the provided image/document of a South African NSC Statement of Results, Matric Certificate, or High School Report Card (Grade 10, 11, or 12).

Your task:
1. Identify the document type (e.g. "NSC Statement of Results", "National Senior Certificate", "Grade 11 Report Card", "Grade 12 Preliminary Report").
2. Detect the term or exam period (e.g. "Term 4 / Final", "Term 3", "November NSC Exam").
3. IMPORTANT: For reports with multiple term columns (Term 1, Term 2, Term 3, Term 4, Exam, SBA, Final), ALWAYS extract the marks for the LATEST TERM or the FINAL / YEAR MARK column.
4. Normalize and map each subject to the most appropriate standard South African subject from this list:
${JSON.stringify(VALID_STANDARD_SUBJECTS)}
Examples of normalization:
- "Mathematics" or "Maths" or "Wiskunde" or "Maths Core" -> "Mathematics"
- "Mathematical Literacy" or "Maths Lit" or "Wiskundige Geletterdheid" -> "Mathematical Literacy"
- "Physical Sciences" or "Physics" or "Fisiese Wetenskappe" -> "Physical Sciences"
- "Life Sciences" or "Biology" or "Lewenswetenskappe" -> "Life Sciences"
- "English 1st Add" or "English FAL" -> "English FAL"
- "English Home" or "English HL" -> "English HL"
- "Life Orientation" or "LO" -> "Life Orientation"
- "Computer Applications Technology" or "CAT" -> "Computer Applications Technology"
- "Information Technology" or "IT" -> "Information Technology"
5. For each subject, provide:
   - "name": normalized standard name from the list above.
   - "rawName": exact subject title from document.
   - "mark": percentage integer between 0 and 100. If only a 1-7 level is shown, estimate standard midpoint (Level 7: 85, Level 6: 75, Level 5: 65, Level 4: 55, Level 3: 45, Level 2: 35, Level 1: 25).
   - "level": integer 1 to 7.
6. Provide "latestTermNotice": A concise statement explaining which term/column was extracted (e.g. "Marks extracted from your latest Term 4 / Final Exam results.").
7. Provide "endorsement": Any noted statutory admission status (e.g. "Bachelor's Degree", "Diploma", "Higher Certificate", or null).
8. If the document is not an academic report or marks cannot be read, set "success": false and include "error": "Description of why it could not be read".

Return ONLY valid JSON conforming to this structure:
{
  "success": true,
  "documentType": "string",
  "termInfo": "string",
  "latestTermNotice": "string",
  "endorsement": "string or null",
  "subjects": [
    {
      "name": "string",
      "rawName": "string",
      "mark": number,
      "level": number
    }
  ],
  "notes": "string"
}`;

/**
 * Analyze an image or PDF using Google Gemini vision API with model cascade
 * @param {string} base64Data - Base64 encoded file string (without data URL prefix)
 * @param {string} mimeType - e.g. "image/jpeg", "image/png", "image/webp", "application/pdf"
 */
async function analyzeAcademicReport(base64Data, mimeType = 'image/jpeg') {
  loadEnv();
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not configured on the server. Please check your .env configuration.');
  }

  // Clean base64 data if it contains a data URI prefix
  const cleanBase64 = base64Data.includes(',') 
    ? base64Data.split(',')[1] 
    : base64Data;

  const contents = [
    {
      parts: [
        { text: SYSTEM_PROMPT },
        {
          inline_data: {
            mime_type: mimeType,
            data: cleanBase64
          }
        }
      ]
    }
  ];

  let lastError = null;
  const attemptsLog = [];

  for (const model of DEFAULT_MODELS) {
    const maxRetries = 2;
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents,
            generationConfig: {
              responseMimeType: 'application/json',
              temperature: 0.1
            }
          })
        });

        const data = await response.json();

        if (response.ok) {
          const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (!rawText) {
            throw new Error(`Model ${model} returned empty content.`);
          }

          let parsed;
          try {
            parsed = JSON.parse(rawText);
          } catch (jsonErr) {
            // Strip markdown code block ticks if model added them
            const sanitized = rawText.replace(/```json/gi, '').replace(/```/g, '').trim();
            parsed = JSON.parse(sanitized);
          }

          console.log(`[AI Report Scanner] Successfully extracted marks using model: ${model}`);
          return {
            ...parsed,
            _meta: {
              modelUsed: model,
              attempt
            }
          };
        }

        const status = response.status;
        const errMsg = data.error?.message || JSON.stringify(data);
        console.warn(`[AI Report Scanner] Model ${model} attempt ${attempt} status ${status}:`, errMsg);

        attemptsLog.push({ model, attempt, status, error: errMsg });
        lastError = { status, data, message: errMsg };

        // If rate limit (429), cascade immediately to next candidate
        if (status === 429) {
          console.warn(`[AI Report Scanner] Model ${model} is rate-limited (429). Cascading to next model...`);
          break;
        }

        // If 503 high demand, back off briefly
        if (status === 503 && attempt < maxRetries) {
          await sleep(1000 + Math.floor(Math.random() * 500));
          continue;
        }

        break;
      } catch (err) {
        console.warn(`[AI Report Scanner] Error for model ${model} attempt ${attempt}:`, err.message);
        attemptsLog.push({ model, attempt, status: 500, error: err.message });
        lastError = { status: 500, message: err.message };
        if (attempt < maxRetries) {
          await sleep(1000);
        }
      }
    }
  }

  throw new Error(
    lastError?.message || 
    'Unable to process report image across all Google Gemini models. Please ensure the image is clear and try again.'
  );
}

module.exports = {
  analyzeAcademicReport,
  VALID_STANDARD_SUBJECTS
};
