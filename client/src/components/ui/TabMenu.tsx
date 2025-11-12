import { useEffect, useRef, useState } from "react";
import { TabMenuProps } from "@/types/tabMenu";
import { useTheme } from "next-themes";

const TabMenu = ({ tabs, activeTab, onTabClick }: TabMenuProps) => {
  const baseTabStyle =
    "flex-1 py-4 text-center font-semibold transition-colors duration-300 cursor-pointer";
  const { theme } = useTheme();
  const inactiveTabStyle = `text-[var(--color-gray-60)] ${
    theme === "dark" ? "text-[var(--color-gray-200)]" : ""
  }`;
  const activeTabStyle = `text-[var(--color-gray-100)] ${
    theme === "dark" ? "text-white" : ""
  }`;

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
    <nav
      className={`flex ${
        theme === "dark" ? "" : "border-b"
      } border-[var(--color-gray-30)] relative `}
    >
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
        className={`absolute bottom-[-1px] h-[2px] ${
          theme === "dark"
            ? "bg-[var(--color-gray-300)]"
            : "bg-[var(--color-gray-100)]"
        }  transition-all duration-300 ease-in-out`}
        style={indicatorStyle}
      />
    </nav>
  );
};

export default TabMenu;
