"use client";
import { useState } from "react";
import SelectComponent from "../ui/SelectComponent";
import Input from "../ui/Input";
import Textarea from "../ui/Textarea";
import { TextButton } from "../ui/TextButton";
import { useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchUser, postCreate } from "@/app/api/community";
import PostImage from "./PostImage";
import { getCurrentUser } from "@/app/api/auth";
import { Category } from "@/lib/interest";

export default function CreatePost() {
  const [select, setSelect] = useState("정치/경제");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [contentImg, setContentImg] = useState<string | null>(null);
  const router = useRouter();
  const queryClient = useQueryClient();
  //로그인 사용자 불러오기
  const { data: authData } = useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: () => {
      if (!authData?.id) throw new Error("로그인 정보가 없습니다.");
      console.log("카테고리:", select);
      return postCreate(
        authData.id,
        Category[select],
        title,
        content,
        contentImg
      );
    },
    onSuccess: () => {
      alert("업로드 성공!");
      queryClient.invalidateQueries({ queryKey: ["communityList"] });
      router.push("/community");
    },
    onError: (error) => {
      alert("업로드 실패:" + error.message);
    },
  });

  return (
    <>
      <div className="pt-[62px] min-h-screen w-full pb-[90px] px-5">
        <SelectComponent
          options={[
            { label: "정치", value: "정치" },
            { label: "경제", value: "경제" },
            { label: "연예", value: "연예" },
            { label: "스포츠", value: "스포츠" },
            { label: "사회", value: "사회" },
            { label: "문화", value: "문화" },
            { label: "해외", value: "해외" },
            { label: "기타", value: "기타" },
          ]}
          placeholder="카테고리를 선택해 주세요"
          onChange={(value) => setSelect(value)}
          label="카테고리 선택"
        />
        <p className="mt-5 text-[var(--color-gray-80)] text-[13px]">제목</p>
        <Input
          className="mt-2 w-full h-[50px] rounded-[12px] text-[var(--color-gray-50)] text-sm"
          placeholder="제목을 입력해 주세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <p className="mt-5 text-[var(--color-gray-80)] text-[13px]">
          대표 이미지
        </p>

        <PostImage setContentImg={setContentImg} contentImg={contentImg} />

        <p className="mt-5 text-[var(--color-gray-80)] text-[13px]">
          내용 작성
        </p>
        <Textarea
          className="mt-2 w-full min-h-[137px] rounded-[12px] text-[var(--color-gray-50)] text-sm"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      <div className="max-w-screen-lg mx-auto fixed bottom-0 left-0 right-0 px-5 w-full h-[90px] flex items-center justify-center gap-[10px] bg-[var(--color-white)]">
        <TextButton
          state="default"
          className="rounded-full h-[50px]"
          onClick={() => router.back()}
        >
          취소
        </TextButton>
        <TextButton
          state="active"
          className="rounded-full h-[50px]"
          onClick={() => mutate()}
          disabled={isPending}
        >
          업로드
        </TextButton>
      </div>
    </>
  );
}
