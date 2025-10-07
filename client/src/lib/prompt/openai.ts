import { OPENAI_CONFIG } from "../config";

const OPENAI_PROMPTS = {
  NEWS_SUMMARY: `
  다음 뉴스를 친구에게 설명해주듯 3줄로 요약해줘.
  
  **구조:**
  1. [핵심사실] 무슨 일이 일어났는지
  2. [배경/과정] 왜, 어떻게 일어났는지  
  3. [결과/의미] 앞으로 어떻게 될지/무엇을 의미하는지
  
  **스타일:**
  - 20-30대 친구와 대화하듯 캐주얼하게
  - 각 줄마다 관련 이모지 1-2개 포함
  - 한 줄당 최대 50자로 간결하게
  - 어려운 용어는 쉽게 풀어서 설명
  
  **절대 금지:**
  - 기사에 없는 내용
  - 개인적 추측이나 의견
`,
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
            role: "user",
            content: `${OPENAI_PROMPTS.NEWS_SUMMARY}

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
