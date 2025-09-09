import { MyPostItem } from "./MyPostItem";

const myPostsData = [
  {
    id: 1,
    title: "야끼니꾸 갈사람",
    content:
      "코스닥 시장 육성방안, 기업지배구조 모범규준, 기간산업안정자금 등 경제정책 입안 경험이 풍부해 가계·소상공인 활력...",
    category: "사회",
    timeAgo: "2시간전",
    likes: 32,
    views: 124,
    image: "/images/handsomeLee.png",
  },
  {
    id: 2,
    title: "오늘 저녁은 치킨이닭",
    content:
      "전 세계적으로 인기를 끌고 있는 K-드라마의 성공 비결과 앞으로의 전망에 대해 전문가와 이야기 나눠봅니다. 새로운 한류의 바람이...",
    category: "문화",
    timeAgo: "5시간전",
    likes: 102,
    views: 543,
    image: "/images/handsomeLee.png",
  },
];

export const MyPostsContent = () => {
  return (
    <div className="flex flex-col space-y-4 px-5">
      {myPostsData.map((post) => (
        <MyPostItem
          key={post.id}
          id={post.id}
          title={post.title}
          content={post.content}
          category={post.category}
          timeAgo={post.timeAgo}
          likes={post.likes}
          views={post.views}
          image={post.image}
        />
      ))}
    </div>
  );
};
