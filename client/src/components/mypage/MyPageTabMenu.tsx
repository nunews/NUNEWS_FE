'use client';

import { useCallback, useState } from 'react';
import ScrappedNewsContent from './ScrappedNewsContent';
import { MyPostsContent } from './MyPostsContent';
import TabMenu from '../ui/TabMenu';

const MyPageTabMenu = () => {
  const [activeTab, setActiveTab] = useState('scrapped');
  const [scrappedCount, setScrappedCount] = useState<number | null>(null);
  const [myPostsCount, setMyPostsCount] = useState<number | null>(null);

  const handleScrapCountChange = useCallback((count: number) => {
    setScrappedCount(count);
  }, []);

  const handlePostCountChange = useCallback((count: number) => {
    setMyPostsCount(count);
  }, []);

  const tabs = [
    {
      id: 'scrapped',
      label: '스크랩한 뉴스',
      count: scrappedCount ?? undefined, // null일 때는 표시 안 함
      content: (
        <ScrappedNewsContent onScrapCountChange={handleScrapCountChange} />
      ),
    },
    {
      id: 'myPosts',
      label: '내가 작성한 글',
      count: myPostsCount ?? undefined,
      content: <MyPostsContent onPostCountChange={handlePostCountChange} />,
    },
  ];

  const tabMenuItems = tabs.map(({ id, label, count }) => ({
    id,
    label,
    count,
  }));

  return (
    <div className='w-full'>
      <TabMenu
        tabs={tabMenuItems}
        activeTab={activeTab}
        onTabClick={setActiveTab}
      />

      {/* 탭 전환 시 언마운트 방지 */}
      <div className='mt-4'>
        {tabs.map((tab) => (
          <div
            key={tab.id}
            style={{ display: tab.id === activeTab ? 'block' : 'none' }}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyPageTabMenu;
