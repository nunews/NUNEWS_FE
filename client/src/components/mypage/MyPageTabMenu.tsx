import { useState } from "react";
import ScrappedNewsContent from "./ScrappedNewsContent";
import { MyPostsContent } from "./MyPostsContent";
import TabMenu from "../ui/TabMenu";

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

  const tabMenuItems = tabs.map(({ id, label, count }) => ({
    id,
    label,
    count,
  }));

  const activeTabData = tabs.find((tab) => tab.id === activeTab);
  return (
    <div className="w-full">
      <TabMenu
        tabs={tabMenuItems}
        activeTab={activeTab}
        onTabClick={setActiveTab}
      />
      <div>{activeTabData && activeTabData.content}</div>
    </div>
  );
};

export default MyPageTabMenu;
