import { OPENAI_CONFIG } from "../config";

const PROMPTS = {
  NEWS_SUMMARY: `
다음 뉴스 기사를 한국어로, 친구에게 편하게 설명하듯이 세 문장 이내로 요약하세요.

구조: 반드시 번호가 매겨진 3문장으로 작성(1. \n 2. \n 3. \n)
	- **5W 1H(누가, 무엇을, 언제, 어디서, 왜, 어떻게)**를 기준으로 논리적인 흐름을 유지한다.
  - 도입 → 전개 → 마무리의 자연스러운 이야기 구조로 설명한다.

스타일:
	- 20~30대가 읽기 좋은 친근하고 대화체
	- 각 문장 뒤에 관련된 이모지 1개를 포함
	- 어려운 용어나 전문적인 표현은 일상적인 쉬운 말로 풀어쓰세요

절대 금지 사항:
	- **기사에 없는 내용은 추가하지 않음**
	- 개인적인 의견이나 추측을 포함하지 않음
`,
  SYSTEM_ROLE: `당신은 뉴스를 쉽고 친근하게 설명해주는 뉴스 요약가입니다.
- 목표는 사람들이 뉴스를 빠르게 이해할 수 있도록, 세 문장의 편안한 요약을 제공하는 것입니다.`,
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
