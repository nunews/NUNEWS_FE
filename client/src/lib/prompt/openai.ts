import { API_CONFIG } from "../config";

export const OPENAI_PROMPTS = {
  NEWS_SUMMARY: `
  다음 뉴스 내용의 키워드를 찾아내서 친구한테 말해주는 것처럼 자연스럽고 친근하게 요약해줘.
  - 3줄로 나눠서 알려줘.
  - 각 줄은 1. 2. 3.으로 시작해.
  - 각 문장을 짧고 간결하게 만들어줘.
  - 말투는 친구처럼 캐주얼하게. 20~30대가 좋아할 만한 친근한 느낌.
  - 내용에 어울리는 이모지를 넣어서
  - 기승전결이 들어가도록
  ** 단, 기사에 없는 내용은 절대 쓰지 마. **`,
};

export const fetchOpenAi = async (description: string) => {
  const openaiKey = API_CONFIG.OPENAI_API_KEY;

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
        model: "gpt-4o",
        messages: [
          {
            role: "user",
            content: `${OPENAI_PROMPTS.NEWS_SUMMARY}

            뉴스 내용:
            "${description}"`,
          },
        ],
        max_tokens: 200,
        temperature: 0.7,
      }),
    });

    if (!res.ok) {
      throw new Error(`OpenAI API Error: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    return data.choices[0]?.message?.content || null;
  } catch (err) {
    console.error("요약 중 오류:", err);
    return null;
  }
};
