import supabase from "@/lib/supabase";
import { fetchOpenAi } from "@/lib/prompt/openai";

// 메모리 캐시로 동시 요청 중복 방지
const summaryCache = new Map<string, Promise<string>>();

/**
 * news_summary 테이블 기반 요약 생성/조회 함수
 * 1. supabase 확인
 * 2. supabase 기존 요약 확인
 * 3. 없으면 새 요약 생성
 * 4. supabase에 저장 후 반환
 */
export const createSummary = async (
  newsId: string,
  newsContent: string
): Promise<string> => {
  // 입력값 검증
  if (!newsId || !newsContent) {
    throw new Error("newsId와 newsContent가 필요합니다.");
  }

  // 1. 처리중인 요청이 있는지 확인
  if (summaryCache.has(newsId)) {
    return await summaryCache.get(newsId)!;
  }

  // 2. 요약 생성 저장
  const summaryPromise = generateSummary(newsId, newsContent);
  summaryCache.set(newsId, summaryPromise);

  try {
    const result = await summaryPromise;
    return result;
  } finally {
    // 5초 후 캐시에서 제거
    setTimeout(() => {
      summaryCache.delete(newsId);
    }, 5000);
  }
};

// 실제 요약 생성 로직
const generateSummary = async (
  newsId: string,
  newsContent: string
): Promise<string> => {
  try {
    // 기존 요약 확인
    const { data: existingSummary, error: fetchError } = await supabase
      .from("news_summary")
      .select("summary_text")
      .eq("news_id", newsId)
      .maybeSingle();

    if (fetchError && fetchError.code !== "PGRST116") {
      console.error("조회 실패:", fetchError);
      throw new Error("기존 요약 조회 중 오류가 발생했습니다.");
    }

    // 기존 요약이 있으면 반환
    if (existingSummary?.summary_text?.trim()) {
      return existingSummary.summary_text;
    }

    // 없으면 새 요약 생성
    console.log("새 요약 생성 시작");
    const newSummary = await fetchOpenAi(newsContent);

    if (!newSummary?.trim()) {
      throw new Error("요약 생성에 실패했습니다.");
    }

    console.log("새 요약 생성 완료:", newSummary);

    // supabase에 저장
    await saveSummaryToSupabase(newsId, newSummary);

    return newSummary;
  } catch (error) {
    console.error("요약 처리 실패:", error);

    if (error instanceof Error) {
      throw error;
    }
    throw new Error("요약을 생성할 수 없습니다.");
  }
};

/**
 * news_summary 테이블에 요약 저장
 */
const saveSummaryToSupabase = async (
  newsId: string,
  summaryText: string
): Promise<void> => {
  try {
    const { error: upsertError } = await supabase
      .from("news_summary")
      .upsert(
        { news_id: newsId, summary_text: summaryText },
        { onConflict: "news_id" }
      );

    if (upsertError && upsertError.code !== "23505") {
      console.error("요약 저장 실패:", upsertError);
    } else {
      console.log("요약 저장 완료:", newsId);
    }
  } catch (error) {
    console.error("저장중 오류:", error);
    // 저장 실패해도 생성된 요약은 사용 가능
  }
};

/**
 * 기존 요약 조회
 */
export const getExistingSummaryFromModal = async (
  newsId: string
): Promise<string | null> => {
  try {
    const { data, error } = await supabase
      .from("news_summary")
      .select("summary_text")
      .eq("news_id", newsId)
      .maybeSingle();

    if (error && error.code !== "PGRST116") {
      console.error("기존 요약 조회 실패", error);
      return null;
    }

    return data?.summary_text || null;
  } catch (error) {
    console.error("기존 요약 조회 오류", error);
    return null;
  }
};
