"use client";

import { useState, useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";
import { IconButton } from "./IconButton";
// import { fetchOpenAi } from "@/lib/prompt/openai";
import Typed from "typed.js";

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

  const typedElement = useRef<HTMLDivElement>(null);
  const typedInstance = useRef<Typed | null>(null);

  useEffect(() => {
    if (isOpen && newsContent) {
      generateSummary();
    }
  }, [isOpen, newsContent]);

  // 컴포넌트 언마운트 시 Typed 인스턴스 정리
  useEffect(() => {
    return () => {
      if (typedInstance.current) {
        typedInstance.current.destroy();
      }
    };
  }, []);

  const generateSummary = async () => {
    console.log("요약 시작!");
    setLoading(true);
    setError("");
    setShowTyping(false);

    try {
      // 2초 후 타이핑
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("로딩 완료, 타이핑 시작!");

      // 요약 예시
      const summaryData = `1. 마르타 구민지 선수가 강속구를 던지다가 사고가 발생했다고 해 ⚾
      2. 까마귀가 공에 맞고 굴절되어 심판이 다쳤다는데 😱  
      3. 얼마나 힘이 세길래! 빠른 회복을 기원합니다 🙏`;

      setLoading(false);
      setShowTyping(true);

      setTimeout(() => {
        if (typedElement.current) {
          console.log("타이핑 시작");
          typedInstance.current = new Typed(typedElement.current, {
            strings: [summaryData],
            typeSpeed: 20,
            showCursor: false,
            onComplete: () => {
              console.log("타이핑 완료!");
            },
          });
        } else {
          console.log("typedElement가 없음");
        }
      }, 100);

      // 실제 API 호출 시
      // const result = await fetchOpenAi(newsContent);
      // if (result) {
      //   setLoading(false);
      //   setShowTyping(true);
      //
      //   if (typedElement.current) {
      //     typedInstance.current = new Typed(typedElement.current, {
      //       strings: [result],
      //       typeSpeed: 30,
      //       showCursor: false,
      //
      //   }
      // } else {
      //   setError("요약을 생성할 수 없습니다. 다시 시도해주세요.");
      //   setLoading(false);
      // }
    } catch (err) {
      setError("요약 생성 중 오류가 발생했습니다.");
      console.error(err);
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="z-50 w-full max-w-sm mx-auto px-2.5">
      <div className="bg-[var(--color-black)]/90 backdrop-blur-md rounded-2xl min-h-[250px] py-6 px-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-medium text-[var(--color-primary-40)]">
            세줄요약
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
                <p className="text-sm text-gray-400">요약 중입니다...</p>
              </div>
            </div>
          )}

          {error && (
            <div className="text-center py-6">
              <p className="text-red-400 text-sm mb-4">{error}</p>
              <button
                onClick={generateSummary}
                className="px-4 py-2 bg-gradient-to-r from-[#F0FFBC] to-[var(--color-primary-40)] text-black rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
              >
                다시 시도
              </button>
            </div>
          )}

          {showTyping && !loading && (
            <div className="text-white text-base leading-relaxed whitespace-pre-line">
              <div ref={typedElement}></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
