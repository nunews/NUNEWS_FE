import { useEffect } from "react";
import { loadNewsData } from "@/lib/actions/loadNewsData";

export const useAutoNewsFetch = () => {
  useEffect(() => {
    console.log("자동 뉴스 패칭");

    // 즉시 한 번 실행
    loadNewsData();

    // 1시간마다 패치 실행
    const interval = setInterval(async () => {
      console.log("1시간 경과 - 자동 뉴스 패칭 실행");
      try {
        await loadNewsData();
        console.log("자동 뉴스 패칭 완료");
      } catch (error) {
        console.error("자동 뉴스 패칭 실패:", error);
      }
    }, 60 * 60 * 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);
};
