"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchPostById } from "@/app/api/community";

import CommunityPostDetailSkel from "./skeleton/CommunityPostDetailSkel";
import CommunityPostDetailContent from "./CommunityPostDetailContent";
import CommunityPostDetailStat from "./CommunityPostDetailStat";
import CommunityPostDetailComments from "./CommunityPostDetailComments";

export default function CommunityPostDetail() {
  const { postId } = useParams<{ postId?: string }>();
  const { data: postDetailData, isLoading: isPostDetailLoading } =
    useQuery<Post>({
      queryKey: ["postDetail1", postId],
      queryFn: async () => {
        const post = await fetchPostById(postId as string);
        if (!post) {
          console.error("게시글 정보가 없습니다");
          return;
        }
        return post;
      },
      enabled: !!postId,
      staleTime: 0,
    });
  const writerId = postDetailData?.user_id ?? null;
  return (
    <>
      <div className="pt-[62px] min-h-screen w-full px-5 pb-[90px] relative">
        {isPostDetailLoading && <CommunityPostDetailSkel />}
        {postDetailData && (
          <>
            <CommunityPostDetailContent
              writerId={writerId!}
              categoryId={postDetailData.category_id}
              title={postDetailData.title}
              content_image={postDetailData.content_image}
              contents={postDetailData.contents}
            />

            {/*  좋아요, 조회수 */}
            <CommunityPostDetailStat
              postId={postId!}
              view_count={postDetailData!.view_count}
            />

            {/* 댓글 */}
            <CommunityPostDetailComments postId={postId!} />
          </>
        )}
      </div>
    </>
  );
}
