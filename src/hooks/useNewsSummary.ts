"use client";

import { createSummary } from "@/lib/api/summarySupabase";
import { useState, useRef } from "react";

// 요약 훅
export function useNewsSummary({
  newsId,
  newsContent,
  isOpen,
}: {
  newsId?: string;
  newsContent?: string;
  isOpen: boolean;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState<string>("");
  const [showTyping, setShowTyping] = useState(false);

  const isGeneratingRef = useRef(false);
  const lastNewsIdRef = useRef<string | null>(null);

  const generateSummary = async (onResult: (text: string) => void) => {
    if (
      !newsId ||
      !newsContent ||
      isGeneratingRef.current ||
      lastNewsIdRef.current === newsId
    )
      return;

    isGeneratingRef.current = true;
    lastNewsIdRef.current = newsId;

    setIsLoading(true);
    setIsError("");
    setShowTyping(false);

    try {
      const result = await createSummary(newsId, newsContent);
      setIsLoading(false);

      if (isOpen && result) {
        setShowTyping(true);
        onResult(result);
      }
    } catch (err) {
      setIsError(err instanceof Error ? err.message : "요약 생성 중 오류 발생");
      setIsLoading(false);
    } finally {
      isGeneratingRef.current = false;
    }
  };

  return {
    isLoading,
    isError,
    showTyping,
    generateSummary,
    reset: () => {
      setIsLoading(false);
      setIsError("");
      setShowTyping(false);
      isGeneratingRef.current = false;
      lastNewsIdRef.current = null;
    },
  };
}
