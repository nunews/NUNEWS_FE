"use client";
import { useEffect, useState } from "react";
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
import { useTheme } from "next-themes";

export default function CreatePost() {
  const [select, setSelect] = useState("정치/경제");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [contentImg, setContentImg] = useState<string | null>(null);
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
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
      {mounted && (
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
              className="mt-2 w-full h-[50px] rounded-[12px] text-[var(--color-gray-50)] dark:hover:border-[var(--color-gray-80)] transition-all duration-300 ease-in-out text-sm"
              placeholder="제목을 입력해 주세요"
              value={title}
              onChange={(e) => {
                const value = e.target.value;
                if (value.length > 100) {
                  alert("제목은 최대 100자까지 입력할 수 있습니다.");
                  return;
                }
                setTitle(value);
              }}
            />

            <p className="mt-5 text-[var(--color-gray-80)] text-[13px]">
              대표 이미지
            </p>

            <PostImage setContentImg={setContentImg} contentImg={contentImg} />

            <p className="mt-5 text-[var(--color-gray-80)] text-[13px]">
              내용 작성
            </p>
            <Textarea
              className="mt-2 w-full min-h-[137px] rounded-[12px] text-[var(--color-gray-50)] dark:border-[var(--color-gray-100)] dark:hover:border-[var(--color-gray-80)] dark:active:border-[var(--color-gray-80)] transition-all duration-300 ease-in-out text-sm"
              value={content}
              onChange={(e) => {
                const value = e.target.value;
                if (value.length > 500) {
                  alert("내용은 최대 500자까지 입력할 수 있습니다.");
                  return;
                }
                setContent(value);
              }}
            />
          </div>

          <div className="max-w-screen-lg mx-auto fixed bottom-0 left-0 right-0 px-5 w-full h-[90px] flex items-center justify-center gap-[10px] bg-[var(--color-white)] dark:bg-[var(--color-black)]">
            <TextButton
              state={theme === "dark" ? "active" : "default"}
              className="rounded-full h-[50px] dark:bg-[var(--color-gray-100)] dark:hover:bg-[var(--color-gray-90)]"
              onClick={() => router.back()}
            >
              취소
            </TextButton>
            <TextButton
              state={theme === "dark" ? "default" : "active"}
              className="rounded-full h-[50px] dark:hover:bg-[var(--color-gray-20)]"
              onClick={() => mutate()}
              disabled={isPending}
            >
              업로드
            </TextButton>
          </div>
        </>
      )}
    </>
  );
}
