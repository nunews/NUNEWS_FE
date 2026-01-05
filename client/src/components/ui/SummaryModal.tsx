"use client";

import { IoClose } from "react-icons/io5";
import { IconButton } from "./IconButton";
import { useNewsSummary } from "@/hooks/useNewsSummary";
import { useTyping } from "@/hooks/useTyping";
import { useEffect } from "react";
interface SummaryProps {
  isOpen: boolean;
  onClose: () => void;
  newsContent: string;
  newsId: string;
}

export default function SummaryModal({
  isOpen,
  onClose,
  newsContent,
  newsId,
}: SummaryProps) {
  const { typedRef, runTyped } = useTyping();

  const { isLoading, isError, showTyping, generateSummary, reset } =
    useNewsSummary({ newsId, newsContent, isOpen });

  useEffect(() => {
    if (isOpen) {
      generateSummary((text) => {
        setTimeout(() => runTyped(text), 50);
      });
    } else {
      reset();
    }
  }, [isOpen, newsId, newsContent]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="z-50 w-full mx-auto px-2.5">
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
    </div>
  );
}
