import Image, { StaticImageData } from "next/image";
import { TextButton } from "../ui/TextButton";
import { Eye, ThumbsUp } from "lucide-react";
import { IoBookmarkSharp } from "react-icons/io5";

interface NewsData {
  id: number;
  category: string;
  title: string;
  description: string;
  image: string;
  categoryIcon: StaticImageData;
}
export default function NewsSection({
  className,
  data,
}: {
  className: string;
  data: NewsData;
}) {
  return (
    <>
      <section
        className={`relative w-full min-h-[100dvh] bg-[url('/images/handsomeLee.png')] bg-no-repeat bg-cover bg-center ${className}`}
      >
        <div className="absolute w-full inset-0 bg-black/70 backdrop-blur-[28px] z-0" />
        <div className="relative w-full z-10 px-5 flex flex-col">
          <div className="pt-[113px] max-h-screen">
            <div className="flex w-full min-w-80 h-90 [@media(max-height:700px)]:h-60  mx-auto justify-center overflow-hidden">
              <Image
                src={data.image}
                alt="dummy image"
                width={320}
                height={360}
                priority
                className="object-cover w-full min-w-80 rounded-2xl"
              />
            </div>
            <div className="flex mt-8 cursor-default [@media(max-height:700px)]:mt-4 w-full justify-between">
              <div className="mr-6">
                <div className="flex gap-0.5">
                  <Image
                    src={data.categoryIcon}
                    alt={data.category}
                    width={20}
                    height={20}
                    priority
                  />
                  <p className="text-[var(--color-white)]">{data.category}</p>
                </div>
                <div className="flex flex-col cursor-default gap-2 mt-2">
                  <h1 className="text-lg font-bold leading-[140%] text-[var(--color-white)]">
                    {data.title}
                  </h1>
                  <span className="text-[var(--color-gray-60)] text-sm mt-2 text-ellipsis line-clamp-3 [@media(max-height:700px)]:line-clamp-2">
                    {data.description}
                  </span>
                  <div className="flex gap-[7px] mt-20 [@media(max-height:700px)]:mt-5">
                    <TextButton className="w-[97px] h-9 px-4 bg-[var(--color-white)]/10 hover:bg-[var(--color-white)]/15">
                      <p className="text-sm whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-[#F0FFBC] to-[var(--color-primary-40)]">
                        AI 세줄요약
                      </p>
                    </TextButton>
                    <TextButton className="w-[81px] h-9 px-2 text-white bg-[var(--color-white)]/10 hover:bg-[var(--color-white)]/15">
                      <p className="text-sm whitespace-nowrap">원문보기</p>
                    </TextButton>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-between">
                <div className="cursor-pointer">
                  <IoBookmarkSharp className="text-[var(--color-white)] w-7 h-7" />
                </div>
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-1.5">
                    <ThumbsUp className="text-[var(--color-white)]" />
                    <p className="text-[var(--color-white)] text-[13px]  font-normal">
                      255
                    </p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <Eye className="text-[var(--color-white)]" />
                    <p className="text-[var(--color-white)] text-[13px] font-normal">
                      255
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
