import { OPENAI_CONFIG } from "../config";

const PROMPTS = {
  NEWS_SUMMARY: `
Summarize the following news article in Korean, as if you're casually explaining it to a friend, within **three sentences**.

**Structure:**
- Write exactly 3 numbered sentences (1. \n 2. \n 3. \n)
- Follow a logical flow based on the 5Ws and 1H (who, what, when, where, why, how)
- Maintain a natural narrative structure (introduction → development → conclusion)

**Style:**
- Use a friendly, conversational tone that feels natural to people in their 20s or 30s
- Add one relevant emoji to each line
- Simplify complex or technical terms into easy everyday language

**Strictly Prohibited:**
- Adding any information not included in the article
- Including personal opinions or assumptions
`,
  SYSTEM_ROLE: `You are a friendly news summarizer who explains news articles in a casual, easy-to-understand way. Your goal is to help people quickly understand news by summarizing it in three friendly sentences.`,
};

// OpenAI API 호출
export const fetchOpenAi = async (description: string) => {
  const openaiKey = OPENAI_CONFIG.API_KEY;

  if (!openaiKey) {
    console.error("OpenAI API 키가 없습니다.");
    return null;
  }

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${openaiKey}`,
      },
      body: JSON.stringify({
        model: OPENAI_CONFIG.MODEL,
        messages: [
          {
            role: "system",
            content: PROMPTS.SYSTEM_ROLE,
          },
          {
            role: "user",
            content: `${PROMPTS.NEWS_SUMMARY}

            뉴스 내용:
            "${description}"`,
          },
        ],
        max_tokens: OPENAI_CONFIG.MAX_TOKENS,
        temperature: OPENAI_CONFIG.TEMPERATURE,
      }),
    });

    if (!res.ok) {
      throw new Error(`OpenAI API Error: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    return data.choices[0]?.message?.content;
  } catch (err) {
    console.error("요약 중 오류:", err);
    return null;
  }
};
