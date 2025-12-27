"use client";

import { useState, useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";
import { IconButton } from "./IconButton";
import { useTyping } from "@/hooks/useTyping";
import { createSummary } from "@/lib/api/summarySupabase";
import { createPortal } from "react-dom";

export default function SummaryModal({
  isOpen,
  onClose,
  newsContent,
  newsId,
}: SummaryModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState<string>("");
  const [showTyping, setShowTyping] = useState(false);
  const { typedRef, runTyped } = useTyping();
  const [mounted, setMounted] = useState(false);

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

    setIsLoading(true);
    setIsError("");
    setShowTyping(false);

    try {
      const summaryResult = await createSummary(newsId, newsContent);

      // 먼저 로딩 종료
      setIsLoading(false);

      // 이후 타이핑 시작
      setTimeout(() => {
        if (isOpen && summaryResult) {
          setShowTyping(true);

          // DOM 업데이트 후 타이핑 실행
          setTimeout(() => {
            runTyped(summaryResult);
          }, 50);
        }
      }, 200);
    } catch (err) {
      console.error("요약 생성 실패:", err);
      const errorMessage =
        err instanceof Error
          ? err.message
          : "요약 생성 중 오류가 발생했습니다.";
      setIsError(errorMessage);
      setIsLoading(false);
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
      setIsLoading(false);
      setIsError("");
      setShowTyping(false);
      // 모달 닫힐 때 ref 초기화
      isGeneratingRef.current = false;
      lastNewsIdRef.current = null;
    }
  }, [isOpen, newsId, newsContent]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!mounted) return null;
  return createPortal(
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
        <div className="pb-2 overflow-y-scroll scrollbar-hide">
          {isLoading && (
            <div className="flex items-center justify-center py-8">
              <div className="flex flex-col items-center space-y-3">
                <div className="animate-spin rounded-full h-6 w-6 border-2 border-[#F0FFBC] border-t-transparent"></div>
                <p className="text-sm text-gray-400">AI가 요약 중입니다...</p>
                <p className="text-xs text-gray-500">잠시만 기다려주세요</p>
              </div>
            </div>
          )}

          {isError && (
            <div className="text-center py-6">
              <p className="text-red-400 text-sm mb-4">요약에 실패했습니다.</p>
            </div>
          )}

          {showTyping && !isLoading && !isError && (
            <div className="text-white text-base leading-relaxed whitespace-pre-line">
              <div ref={typedRef}></div>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
