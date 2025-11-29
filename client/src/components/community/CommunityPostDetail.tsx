"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchPostById } from "@/app/api/community";

import CommunityPostDetailSkel from "./Skeleton/CommunityPostDetailSkel";
import CommunityPostDetailContent from "./CommunityPostDetailContent";
import CommunityPostDetailStat from "./CommunityPostDetailStat";
import CommunityPostDetailComments from "./CommunityPostDetailComments";

export default function CommunityPostDetail() {
  const { postId } = useParams<{ postId?: string }>();
  // console.log("postDetail로 넘어오긴함, postId", postId);
  const { data: postDetailData, isLoading: isPostDetailLoading } =
    useQuery<Post>({
      queryKey: ["postDetail1", postId],
      queryFn: async () => {
        const post = await fetchPostById(postId as string);
        if (!post) {
          console.error("게시글 정보가 없습니다");
          return;
        }
        console.log(post.like_count);
        return post;
      },
      enabled: !!postId,
      staleTime: 0,
    });
  // console.log("postDetailData", postDetailData);
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
              like_count={postDetailData!.like_count}
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
