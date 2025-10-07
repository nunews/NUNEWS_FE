"use client";

import { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { IconButton } from "./IconButton";
import { fetchOpenAi } from "@/lib/prompt/openai";
import { useTyping } from "@/hooks/useTyping";

interface SummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  newsContent: string;
}

export default function SummaryModal({
  isOpen,
  onClose,
  newsContent,
}: SummaryModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [showTyping, setShowTyping] = useState(false);

  const { typedRef, runTyped } = useTyping();

  useEffect(() => {
    if (isOpen && newsContent) {
      generateSummary();
    }
    if (!isOpen) {
      setLoading(false);
      setError("");
      setShowTyping(false);
    }
  }, [isOpen, newsContent]);

  const generateSummary = async () => {
    console.log("AI 요약 시작");
    console.log("원본 내용:", newsContent);

    setLoading(true);
    setError("");
    setShowTyping(false);

    try {
      // 실제 OpenAI API 호출
      const summaryResult = await fetchOpenAi(newsContent);

      if (summaryResult) {
        console.log("AI 요약 생성 완료:", summaryResult);

        setLoading(false);
        setShowTyping(true);

        // 타이핑 애니메이션 시작
        setTimeout(async () => {
          if (isOpen) {
            console.log("타이핑 시작");
            setShowTyping(true);

            await runTyped(summaryResult);
            console.log("타이핑 완료");
          }
        }, 100);
      } else {
        throw new Error("요약 결과가 없습니다.");
      }
    } catch (err) {
      console.error("요약 생성 실패:", err);
      setError("요약 생성 중 오류가 발생했습니다. 다시 시도해주세요.");
      setLoading(false);
      setShowTyping(false);
    }
  };

  if (!isOpen) return null;

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

          {showTyping && !loading && (
            <div className="text-white text-base leading-relaxed whitespace-pre-line">
              <div ref={typedRef}></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
