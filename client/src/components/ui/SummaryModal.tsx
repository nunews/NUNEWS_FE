"use client";

import { useState, useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";
import { IconButton } from "./IconButton";
import { useTyping } from "@/hooks/useTyping";
import { createSummary } from "@/lib/api/summarySupabase";

export default function SummaryModal({
  isOpen,
  onClose,
  newsContent,
  newsId,
}: SummaryModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [showTyping, setShowTyping] = useState(false);
  const { typedRef, runTyped } = useTyping();

  // 중복 실행 방지
  const isGeneratingRef = useRef(false);
  const lastNewsIdRef = useRef<string | null>(null);

  const generateSummary = async () => {
    if (
      !newsId ||
      !newsContent ||
      isGeneratingRef.current ||
      lastNewsIdRef.current === newsId
    ) {
      return;
    }

    isGeneratingRef.current = true;
    lastNewsIdRef.current = newsId;

    console.log("요약 생성 시작:", newsId);
    setLoading(true);
    setError("");
    setShowTyping(false);

    try {
      const summaryResult = await createSummary(newsId, newsContent);

      // 먼저 로딩 종료
      setLoading(false);

      // 이후 타이핑 시작
      setTimeout(() => {
        if (isOpen && summaryResult) {
          console.log("⌨타이핑 애니메이션 시작");
          setShowTyping(true);

          // DOM 업데이트 후 타이핑 실행
          setTimeout(() => {
            runTyped(summaryResult);
            console.log("타이핑 애니메이션 완료");
          }, 50);
        }
      }, 200);
    } catch (err) {
      console.error("요약 생성 실패:", err);
      const errorMessage =
        err instanceof Error
          ? err.message
          : "요약 생성 중 오류가 발생했습니다.";
      setError(errorMessage);
      setLoading(false);
      setShowTyping(false);
    } finally {
      isGeneratingRef.current = false;
    }
  };

  useEffect(() => {
    if (isOpen && newsContent && newsId) {
      generateSummary();
    }
    if (!isOpen) {
      setLoading(false);
      setError("");
      setShowTyping(false);
      // 모달 닫힐 때 ref 초기화
      isGeneratingRef.current = false;
      lastNewsIdRef.current = null;
    }
  }, [isOpen, newsId, newsContent]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="z-50 w-full max-w-sm mx-auto px-2.5">
      <div className="bg-[var(--color-black)]/90 backdrop-blur-md rounded-2xl min-h-[250px] py-6 px-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-medium text-[var(--color-primary-40)]">
            AI 세줄요약
          </h2>
          <IconButton
            icon={IoClose}
            onClick={onClose}
            color="var(--color-white)"
            size={24}
          />
        </div>

        {/* 요약 내용 */}
        <div className="pb-2">
          {loading && (
            <div className="flex items-center justify-center py-8">
              <div className="flex flex-col items-center space-y-3">
                <div className="animate-spin rounded-full h-6 w-6 border-2 border-[#F0FFBC] border-t-transparent"></div>
                <p className="text-sm text-gray-400">AI가 요약 중입니다...</p>
                <p className="text-xs text-gray-500">잠시만 기다려주세요</p>
              </div>
            </div>
          )}

          {error && (
            <div className="text-center py-6">
              <p className="text-red-400 text-sm mb-4">{error}</p>
            </div>
          )}

          {showTyping && !loading && !error && (
            <div className="text-white text-base leading-relaxed whitespace-pre-line">
              <div ref={typedRef}></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
