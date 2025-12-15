import createClient from "@/utils/supabase/client";

export type GenderStats = {
  male: number;
  female: number;
};

export type AgeStats = {
  teen: number;
  twenties: number;
  thirties: number;
  fortiesPlus: number;
};

export async function getNewsAudienceStats(newsId: string) {
  const supabase = createClient();

  try {
    const { data, error } = await supabase
      .from("News_View_Log")
      .select(
        `
          user_id,
          User ( gender, age_range )
        `
      )
      .eq("news_id", newsId);

    if (error) throw error;
    if (!data || data.length === 0)
      return { gender: null, age: null, hasData: false };

    const genderCount: GenderStats = { male: 0, female: 0 };
    const ageCount: AgeStats = {
      teen: 0,
      twenties: 0,
      thirties: 0,
      fortiesPlus: 0,
    };

    data.forEach((row: any) => {
      const gender = row.User?.gender;
      const ageRange = row.User?.age_range;

      // 성별 카운트
      if (gender === "male") genderCount.male += 1;
      if (gender === "female") genderCount.female += 1;

      // 연령대 카운트
      switch (ageRange) {
        case "10s":
          ageCount.teen += 1;
          break;
        case "20s":
          ageCount.twenties += 1;
          break;
        case "30s":
          ageCount.thirties += 1;
          break;
        case "40s":
        case "50s":
        case "60s":
        case "70s":
          ageCount.fortiesPlus += 1;
          break;
        default:
          break;
      }
    });

    //console.log("[AudienceStats] counted:", { genderCount, ageCount });

    return {
      gender: genderCount,
      age: ageCount,
      hasData: true,
    };
  } catch (e) {
    console.error("조회자 통계 처리 중 오류:", e);
    return { gender: null, age: null, hasData: false };
  }
}
