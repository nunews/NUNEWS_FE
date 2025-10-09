'use client';

import { useEffect, useState, useCallback } from 'react';
import createClient from '@/utils/supabase/client';
import DefaultCard from '../ui/DefaultCard';
import CategoryFilter from './CategoryFilter';
import { timeAgo } from '@/utils/timeAgo';

type Category = {
  title: string;
  category_id: string;
};

type News = {
  news_id: string;
  title: string;
  content: string;
  source: string;
  published_at: string;
  url: string;
  view_count: number;
  like_count: number;
  image_url: string;
  Category?: Category;
};

type UserScrapItem = {
  created_at: string;
  News: News;
};

// Supabase에서 오는 원본 데이터 타입
type SupabaseUserScrapResponse = {
  created_at: string;
  News?: News[]; // join 결과는 배열
};

interface ScrappedNewsContentProps {
  onScrapCountChange?: (count: number) => void;
}

export default function ScrappedNewsContent({
  onScrapCountChange,
}: ScrappedNewsContentProps) {
  const [scrappedNews, setScrappedNews] = useState<UserScrapItem[]>([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [userId, setUserId] = useState<string | null>(null);

  const supabase = createClient();

  // 로그인 사용자 정보 가져오기
  const fetchUser = useCallback(async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) setUserId(user.id);
  }, [supabase]);

  const fetchScrappedNews = useCallback(async () => {
    if (!userId) return;

    // Supabase에서 모든 스크랩 뉴스 가져오기
    const { data, error } = await supabase
      .from('User_scrap')
      .select(
        `
      created_at,
      News:news_id (
        *,
        Category:category_id (title, category_id)
      )
    `
      )
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('❌ Error fetching scrapped news:', error);
      setScrappedNews([]);
      return;
    }

    // 배열 첫 요소 사용 후 React에서 카테고리 필터링
    const formattedData: UserScrapItem[] = (data || [])
      .map((item: SupabaseUserScrapResponse) => {
        const news = Array.isArray(item.News) ? item.News[0] : item.News;
        return news ? { created_at: item.created_at, News: news } : null;
      })
      .filter((item): item is UserScrapItem => item !== null)
      .filter((item) => {
        // activeCategory가 'all'이면 모두 통과, 아니면 카테고리 ID 매칭
        return (
          activeCategory === 'all' ||
          item.News.Category?.category_id === activeCategory
        );
      });

    setScrappedNews(formattedData);
  }, [userId, activeCategory, supabase]);

  // 스크랩 수 전달
  useEffect(() => {
    if (onScrapCountChange) onScrapCountChange(scrappedNews.length);
  }, [scrappedNews, onScrapCountChange]);

  // 유저 정보 가져오기
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  // 스크랩 뉴스 가져오기
  useEffect(() => {
    fetchScrappedNews();
  }, [fetchScrappedNews]);

  return (
    <div className='flex flex-col px-5 py-6 mb-18'>
      <div className='mr-[-20px]'>
        <CategoryFilter
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
      </div>

      <div className='space-y-4'>
        {scrappedNews.length > 0 ? (
          scrappedNews.map((item) => (
            <DefaultCard
              key={item.News.news_id}
              newsId={item.News.news_id}
              userId={userId}
              title={item.News.title}
              category={item.News.Category?.title || ''}
              timeAgo={timeAgo(item.News.published_at)}
              likes={item.News.like_count}
              views={item.News.view_count}
              image={item.News.image_url}
            />
          ))
        ) : (
          <p className='text-center text-gray-500 mt-4'>
            불러올 뉴스가 없습니다.
          </p>
        )}
      </div>
    </div>
  );
}
