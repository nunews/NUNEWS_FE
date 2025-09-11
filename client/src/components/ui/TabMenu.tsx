import { useEffect, useRef, useState } from "react";

/**
 * TabMenuItem
 * @param id - 각 탭을 식별하는 고유 id
 * @param label - 탭에 표시될 텍스트
 * @param count - (opt)탭 라벨 옆에 표시될 숫자
 */

/**
 * TabMenuProps
 * @param tabs - 렌더링할 탭의 배열
 * @param activeTab - 현재 활성화된 탭의  id
 * @param onTabClick =  탭 클릭 시 호출될 콜백 함수
 */

interface TabMenuItem {
  id: string;
  label: string;
  count?: number;
}

interface TabMenuProps {
  tabs: TabMenuItem[];
  activeTab: string;
  onTabClick: (id: string) => void;
}

const TabMenu = ({ tabs, activeTab, onTabClick }: TabMenuProps) => {
  const baseTabStyle =
    "flex-1 py-4 text-center font-semibold transition-colors duration-300";
  const inactiveTabStyle = " text-[var(--color-gray-60)]";
  const activeTabStyle = " text-[var(--color-gray-100)]";

  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const activeTabIndex = tabs.findIndex((tab) => tab.id === activeTab);
    const activeTabNode = tabRefs.current[activeTabIndex];

    if (activeTabNode) {
      setIndicatorStyle({
        left: activeTabNode.offsetLeft,
        width: activeTabNode.offsetWidth,
      });
    }
  }, [activeTab, tabs]);

  return (
    <nav className="flex border-b border-[var(--color-gray-30)] relative ">
      {tabs.map((tab, index) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            ref={(el) => {
              tabRefs.current[index] = el;
            }}
            onClick={() => onTabClick(tab.id)}
            className={`${baseTabStyle} ${
              isActive ? activeTabStyle : inactiveTabStyle
            }`}
          >
            {tab.label} {tab.count !== undefined && tab.count}
          </button>
        );
      })}
      <span
        className="absolute bottom-[-1px] h-[2px] bg-[var(--color-gray-100)] transition-all duration-300 ease-in-out"
        style={indicatorStyle}
      />
    </nav>
  );
};

export default TabMenu;
