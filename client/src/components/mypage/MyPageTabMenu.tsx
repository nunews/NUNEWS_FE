import { useState } from "react";
import ScrappedNewsContent from "./ScrappedNewsContent";
import { MyPostsContent } from "./MyPostsContent";

const MyPageTabMenu = () => {
  const [activeTab, setActiveTab] = useState("scrapped");
  const tabs = [
    {
      id: "scrapped",
      label: "스크랩한 뉴스",
      count: 12,
      content: <ScrappedNewsContent />,
    },
    {
      id: "myPosts",
      label: "내가 작성한 글",
      count: 43,
      content: <MyPostsContent />,
    },
  ];

  const baseTabStyle =
    "flex-1 py-4 text-center font-semibold transition-colors duration-300";

  const inactiveTabStyle =
    "border-b-1 border-[var(--color-gray-30)] text-[var(--color-gray-60)]";
  const activeTabStyle =
    "border-b-2 border-[var(--color-gray-100)] text-[var(--color-gray-100)]";

  const activeTabData = tabs.find((tab) => tab.id === activeTab);
  return (
    <div className="w-full">
      <nav className="flex border-b border-[var(--color-gray-30)]">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`${baseTabStyle} ${
                isActive ? activeTabStyle : inactiveTabStyle
              }`}
            >
              {tab.label} {tab.count}
            </button>
          );
        })}
      </nav>
      {<div>{activeTabData && activeTabData.content}</div>}
    </div>
  );
};

export default MyPageTabMenu;
