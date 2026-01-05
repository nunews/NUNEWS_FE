/**
 * TabMenuItem
 * @param id - 각 탭을 식별하는 고유 id
 * @param label - 탭에 표시될 텍스트
 * @param count - (opt)탭 라벨 옆에 표시될 숫자
 */
export interface TabMenuItem {
  id: string;
  label: string;
  count?: number;
}

/**
 * TabMenuProps
 * @param tabs - 렌더링할 탭의 배열
 * @param activeTab - 현재 활성화된 탭의 id
 * @param onTabClick - 탭 클릭 시 호출될 콜백 함수
 */
export interface TabMenuProps {
  tabs: TabMenuItem[];
  activeTab: string;
  onTabClick: (id: string) => void;
}
