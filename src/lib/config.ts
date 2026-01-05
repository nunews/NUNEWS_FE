export const API_CONFIG: ApiConfig = {
  BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api",
  OPENAI_API_KEY: process.env.NEXT_PUBLIC_OPENAI_API_KEY || "",
  NEWSDATA_API_KEY: process.env.NEXT_PUBLIC_NEWS_IO_KEY || "",
};

// OpenAI 설정
export const OPENAI_CONFIG = {
  API_KEY: API_CONFIG.OPENAI_API_KEY,
  BASE_URL: "https://api.openai.com/v1",
  MODEL: "gpt-4o",
  MAX_TOKENS: 200,
  TEMPERATURE: 0.7,
};
