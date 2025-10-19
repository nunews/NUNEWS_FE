"use client";
import Image from "next/image";
import profileImg from "../../assets/images/profile1.png";
import postImg from "../../assets/images/postImg.png";
import { AiFillLike, AiOutlineLike, AiOutlineMore } from "react-icons/ai";
import { IoEyeOutline } from "react-icons/io5";
import Input from "../ui/Input";
import { PiPaperPlaneTiltLight, PiPencilLine } from "react-icons/pi";
import { useState } from "react";
import Dropdown from "../ui/Dropdown";
import { RiDeleteBinLine } from "react-icons/ri";
import { IconButton } from "../ui/IconButton";
import { useParams, useRouter } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  fetchComment,
  fetchPostById,
  fetchWriter,
  postComment,
} from "@/app/api/community";
import { CategoryInv } from "@/lib/interest";
import { getCurrentUser } from "@/app/api/auth";
import Comment from "./Comment";

export default function CommunityPostDetail() {
  // const comments = [
  //   {
  //     profileImg: profileImg2,
  //     nickName: "공허의 코끼리",
  //     time: "방금전",
  //     comment: "님아 동족은 좀... 그렇지 않냐코 ㅠ 너무하다코 ㅠ",
  //   },
  //   {
  //     profileImg: profileImg,
  //     nickName: "역병의 산토끼",
  //     time: "방금전",
  //     comment: "님아 동족은 좀... 그렇지 않냐코 ㅠ 너무하다코 ㅠ",
  //   },
  //   {
  //     profileImg: profileImg2,
  //     nickName: "공허의 코끼리",
  //     time: "방금전",
  //     comment: "님아 동족은 좀... 그렇지 않냐코 ㅠ 너무하다코 ㅠ",
  //   },
  // ]
  const [comment, setComment] = useState("");
  const router = useRouter();
  const params = useParams();
  const postId = params.postId;

  const { data: postDetailData, isLoading } = useQuery<Post>({
    queryKey: ["postDetail"],
    queryFn: async () => {
      const post = await fetchPostById(postId as string);
      if (!post) {
        console.error("게시글 정보가 없습니다");
        return;
      }
      return post;
    },
    enabled: !!postId,
  });

  const writerId = postDetailData?.user_id;
  // console.log("writerId", writerId);

  //사용자 정보 불러오기
  const { data: authData } = useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const user = await getCurrentUser();
      if (!user) throw new Error("사용자 정보가 없습니다");
      return user;
    },
  });

  //게시글 작성자 정보 불러오기
  const { data: writerData } = useQuery({
    queryKey: ["writerDetail", writerId],
    queryFn: () => fetchWriter(writerId as string),
    enabled: !!writerId,
  });

  //댓글 불러오기
  const { data: commentData } = useQuery({
    queryKey: ["comment", postDetailData?.post_id],
    queryFn: () => fetchComment(postDetailData!.post_id),
    enabled: !!postDetailData?.post_id,
  });

  //댓글 추가하기
  const { mutate: addComment } = useMutation({
    mutationFn: () =>
      postComment(comment, authData!.id, postDetailData!.post_id),
    onSuccess: () => {
      alert("댓글 업로드 성공!");
    },
    onError: (error) => {
      console.error(error);
      alert("댓글 업로드 실패!");
    },
  });

  //댓글 작성자 불러오기
  // const { data: commentWriterData } = useQuery({
  //     queryKey: ["writerDetail", writerId],
  //     queryFn: () => fetchWriter(writerId as string),
  //     enabled: !!writerId,
  //   });
  //const [open, setOpen] = useState(Array(commentData?.length).fill(false));
  const [like, setLike] = useState(false);
  // const toggleOpen = (i: number) => {
  //   setOpen((prev) => prev.map((v, idx) => (idx === i ? !open[i] : v)));
  // };
  if (isLoading || !postDetailData) {
    return <div>로딩중..</div>;
  }
  return (
    <>
      <div className="pt-[62px] min-h-screen w-full px-5 pb-[90px] relative">
        {/* 프로필+카테고리 */}
        <div className="mt-4 w-full flex items-center justify-between">
          <div className="flex items-center w-auto h-9">
            <Image src={profileImg} alt="profileImg" width={36} height={36} />
            <span className="ml-[10px] text-[var(--color-black)] text-base font-semibold">
              {writerData?.nickname}
            </span>
          </div>
          <p className="text-[var(--color-gray-100)] text-sm">
            #{CategoryInv[postDetailData.category_id]}
          </p>
        </div>
        <div className="relative w-full aspect-[16/10] mt-6">
          <Image
            src={postDetailData.content_image ?? postImg}
            alt="postImg"
            fill
            className=" rounded-[12px] object-cover"
          />
        </div>
        <p className="mt-6 text-var(--color-black) text-[22px] font-bold">
          {postDetailData.title}
        </p>
        <p className="mt-2 h-auto">{postDetailData.contents}</p>

        <div className="mt-6 flex items-center text-[#b7b7b7]">
          {!like && (
            <AiOutlineLike
              onClick={() => setLike(true)}
              className="w-5 h-5 cursor-pointer hover:text-[var(--color-black)] duration-300"
            />
          )}
          {like && (
            <AiFillLike
              onClick={() => setLike(false)}
              className="w-5 h-5 cursor-pointer text-[var(--color-black)]"
            />
          )}
          <p className="ml-[3px] text-base">32</p>

          <IoEyeOutline className="ml-[11px] w-5 h-5" />
          <p className="ml-[3px] text-base">124</p>
        </div>

        {/* 댓글 입력*/}
        <div className="mt-6">
          <Input
            rightSlot={
              <PiPaperPlaneTiltLight
                onClick={() => addComment()}
                className="w-4 h-4 text-[var(--color-gray-100)] cursor-pointer"
              />
            }
            placeholder="댓글을 입력해주세요"
            className="rounded-[50px] w-[320px] h-[50px] text-[var(--color-gray-50)] text-base"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>

        {/* 댓글 */}
        {commentData?.map((comment, i) => (
          <div key={i} className="relative">
            <Comment
              commentId={comment.comment_id}
              userId={comment.user_id}
              comment={comment.content}
              created_at={comment.created_at}
            />
            {/* <div className="mt-6 w-full h-auto flex justify-between">
              <div className="flex items-start">
                <Image
                  src={comment.profileImg}
                  alt="profileImg"
                  width={36}
                  height={36}
                  className="shrink-0 rounded-full"
                />
                <div className="flex flex-col ml-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[var(--color-gray-100)] text-base font-semibold">
                      {comment.nickName}
                    </span>
                    <span className="text-[var(--color-gray-60)] text-[13px]">
                      {comment.time}
                    </span>
                  </div>

                  <p className="mt-1 text-[var(--color-gray-100)] text-base">
                    {comment.comment}
                  </p>
                </div>
              </div>
              <IconButton
                icon={AiOutlineMore}
                size={24}
                color="#2f2f2f"
                onClick={() => toggleOpen(i)}
                className="w-8 h-8 hover:bg-[var(--color-gray-10)]"
              />
            </div>
            <div className="absolute top-9 right-0">
              <Dropdown
                isOpen={open[i]}
                onClose={() => toggleOpen(i)}
                title="내 댓글"
                items={[
                  {
                    icon: <PiPencilLine />,
                    label: "수정하기",
                    onClick: () => toggleOpen(i),
                  },
                  {
                    icon: <RiDeleteBinLine />,
                    label: "삭제하기",
                    onClick: () => toggleOpen(i),
                    danger: true,
                  },
                ]}
              />
            </div> */}
          </div>
        ))}
      </div>
    </>
  );
}
