"use client";

import CommentSkel from "./CommentSkel";

export default function CommunityPostDetailSkel() {
  return (
    <>
      {/* 프로필+카테고리 */}
      <div className="mt-4 w-full flex items-center justify-between">
        <div className="flex items-center w-auto h-9">
          <div className="w-9 h-9 rounded-full flex-shrink-0 bg-[var(--color-gray-40)] dark:bg-[var(--color-gray-70)]" />
          <div className="ml-[10px] w-18 h-5 rounded-[6px] flex-shrink-0 bg-[var(--color-gray-40)] dark:bg-[var(--color-gray-70)]"></div>
        </div>
        <div className="w-11 h-5 rounded-[6px] flex-shrink-0 bg-[var(--color-gray-40)] dark:bg-[var(--color-gray-70)]"></div>
      </div>

      {/* 포스트 */}
      <div className="w-full aspect-[16/10] rounded-[12px] object-cover flex-shrink-0 bg-[var(--color-gray-40)] dark:bg-[var(--color-gray-70)] mt-6"></div>
      <div className="mt-6 rounded-[8px] w-60 h-9 flex-shrink-0 bg-[var(--color-gray-40)] dark:bg-[var(--color-gray-70)]"></div>
      <div className="mt-2 w-80 h-4 rounded-[5px] flex-shrink-0 bg-[var(--color-gray-40)] dark:bg-[var(--color-gray-70)]"></div>
      <div className="mt-2 w-80 h-4 rounded-[5px] flex-shrink-0 bg-[var(--color-gray-40)] dark:bg-[var(--color-gray-70)]"></div>

      {/* 좋아요,조회수 */}
      <div className="mt-6 flex items-center ">
        <div className="w-11 h-5 rounded-[6px] flex-shrink-0 bg-[var(--color-gray-40)] dark:bg-[var(--color-gray-70)]" />
        <div className="ml-[11px] w-11 h-5 rounded-[6px] flex-shrink-0 bg-[var(--color-gray-40)] dark:bg-[var(--color-gray-70)]" />
      </div>

      {/* 댓글 입력*/}
      <div className="mt-6 rounded-[10px] w-full h-[40px] flex-shrink-0 bg-[var(--color-gray-40)] dark:bg-[var(--color-gray-70)]"></div>

      {/* 댓글 */}
      <CommentSkel />
      <CommentSkel />
    </>
  );
}
