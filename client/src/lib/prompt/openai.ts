import { OPENAI_CONFIG } from "../config";

const OPENAI_PROMPTS = {
  NEWS_SUMMARY: `
  다음 뉴스를 친구에게 설명하듯이 3줄로 요약할거야
  
  **구조:**
  3줄 요약은 1. 2. 3. 번호를 붙여서 반환하고,
  육하원칙을 기반으로 기승전결을 풀어서 정리해줘.
  
  **스타일:**
  - 20-30대 친구와 대화하듯 캐주얼하게
  - 각 줄마다 관련 이모지 포함
  - 한 줄당 최대 50자를 넘지 않도록
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
