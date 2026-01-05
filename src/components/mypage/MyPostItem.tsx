import Image from "next/image";
import { AiOutlineLike } from "react-icons/ai";
import { IoEyeOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
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
        <p className="text-lg font-bold dark:text-[var(--color-white)] text-[var(--color-gray-100)]">
          {title}
        </p>
        <p className="dark:text-[var(--color-gray-40)] text-[var(--color-gray-100)] text-sm line-clamp-2">
          {content}
        </p>
      </div>
      <div className="flex justify-between items-center text-[13px]">
        <div className="flex dark:text-[var(--color-gray-70)] text-[var(--color-gray-70)] space-x-1">
          <p>{category}</p>
          <span>·</span>
          <p>{timeAgo}</p>
        </div>
        <div className="flex items-center text-[var(--color-gray-70)] ">
          <AiOutlineLike className="w-4 h-4 text-[var(--color-gray-70)]  cursor-pointer" />
          <p className="ml-[3px] ">{likes}</p>
          <IoEyeOutline className="ml-[11px] w-4 h-4 text-[var(--color-gray-70)] cursor-pointer" />
          <p className="ml-[3px]">{views}</p>
        </div>
      </div>
    </div>
  );
};
