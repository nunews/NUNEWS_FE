"use client";

import { toast } from "sonner";
import { useToggleBookmarkMutation } from "./useNewsInteractionMutations";

export const useBookmarkToggle = ({
  newsId,
  userId,
  isBookmarked,
}: {
  newsId?: string;
  userId: string | null;
  isBookmarked: boolean;
}) => {
  const bookmarkMutation = useToggleBookmarkMutation();

  const toggle = () => {
    if (!newsId || !userId) {
      toast.error("로그인이 필요합니다.");
      return;
    }

    bookmarkMutation.mutate(
      {
        newsId,
        userId,
        isBookmarked,
      },
      {
        onSuccess: () => {
          toast.success(
            isBookmarked ? "스크랩을 취소했어요." : "스크랩에 추가됐어요."
          );
        },
        onError: (err) => {
          console.error("스크랩 실패", err);
          toast.error("스크랩 처리에 실패했습니다.");
        },
      }
    );
  };

  return { toggle };
};
