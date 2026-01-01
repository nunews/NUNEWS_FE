import Image from "next/image";
import { AiOutlineLike } from "react-icons/ai";
import { IoEyeOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postView } from "@/app/api/community";

export const MyPostItem = ({
  id,
  title,
  content,
  category,
  timeAgo,
  likes,
  views,
  image,
}: MyPostItemProps) => {
  const router = useRouter();
  const { theme } = useTheme();
  const queryClient = useQueryClient();
  const { mutate: mutateView } = useMutation({
    mutationFn: (cnt: number) => postView(id, cnt),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["communityList"] });
    },
    onError: (err) => {
      console.error("조회수 업로드 실패:", err);
    },
  });

  const handleDetail = async () => {
    mutateView(views + 1);
    router.push(`/community/${id}`);
  };

  return (
    <div
      onClick={handleDetail}
      className="flex flex-col cursor-pointer gap-4 py-6 border-b-1 border-[var(--color-gray-20)] dark:border-[var(--color-gray-100)]"
    >
      <div className="relative w-full aspect-[16/10] overflow-hidden rounded-xl">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="flex flex-col gap-2">
        <p
          className={` ${
            theme === "dark" ? "text-gray-200" : "text-[#191919]"
          } text-lg font-bold`}
        >
          {title}
        </p>
        <p
          className={` ${
            theme === "dark" ? "text-gray-200" : "text-[#191919]"
          } text-sm line-clamp-2`}
        >
          {content}
        </p>
      </div>
      <div className="flex justify-between items-center text-[13px]">
        <div
          className={`flex ${
            theme === "dark" ? "text-gray-200" : "text-[var(--color-gray-70)]"
          } space-x-1`}
        >
          <p>{category}</p>
          <span>·</span>
          <p>{timeAgo}</p>
        </div>
        <div
          className={`flex items-center  ${
            theme === "dark" ? "text-gray-200" : "text-gray-500"
          } `}
        >
          <AiOutlineLike
            className={`w-4 h-4 ${
              theme === "dark" ? "text-gray-200" : "text-gray-500"
            } cursor-pointer`}
          />
          <p className="ml-[3px] ">{likes}</p>
          <IoEyeOutline
            className={`ml-[11px] w-4 h-4 ${
              theme === "dark" ? "text-gray-200" : "text-gray-500"
            } cursor-pointer`}
          />
          <p className="ml-[3px]">{views}</p>
        </div>
      </div>
    </div>
  );
};
