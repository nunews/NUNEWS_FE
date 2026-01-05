import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { CustomTooltip } from "@/components/ui/CustomTooltip";
import { useNewsAudienceStats } from "@/hooks/useNewsAudienceStats";
import AudienceChartSkeleton from "./skeleton/AudienceChartSkeleton";
import { getAudienceChartData } from "@/utils/audienceChart";
import { useTheme } from "next-themes";

interface AudienceAnalyticsChartProps {
  newsId: string;
}

const AudienceAnalyticsChart = ({ newsId }: AudienceAnalyticsChartProps) => {
  const { data, isLoading, isError } = useNewsAudienceStats(newsId);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  if (isLoading) {
    return <AudienceChartSkeleton />;
  }

  //에러 차트 카드
  if (isError || !data || !data.hasData) {
    return (
      <div className="border border-[var(--color-gray-30)] dark:border-[var(--color-gray-100)] rounded-xl p-4">
        <h2 className="text-xl leading-[140%] font-semibold dark:text-[var(--color-white)] text-[var(--color-black)]">
          누가 이 기사를 봤을까? 🤔
        </h2>
        <p className="text-base mt-2 leading-[140%] dark:taxt-[var(--color-gray-20)] text-[var(--color-gray-90)] dark:text-[var(--color-gray-60)]">
          아직 이 기사에 대한
          <br />
          조회자 통계가 없어요. 😢
        </p>
      </div>
    );
  }

  const {
    genderData,
    hasMale,
    hasFemale,
    isSingleGender,
    ageData,
    isSingleAge,
    singleAgeKey,
  } = getAudienceChartData(data);

  return (
    <>
      <div className="border border-[var(--color-gray-30)] dark:border-[var(--color-gray-100)] rounded-xl p-4 ">
        <div className="mb-4">
          <h2 className="text-xl leading-[140%] font-semibold text-[var(--color-black)] dark:text-white">
            누가 이 기사를 봤을까? 🤔
          </h2>
          <p className="text-base mt-2 leading-[140%] dark:text-[var(--color-gray-60)] text-[var(--color-gray-100)]">
            이 기사를 본 사용자들의 <br /> 성별 및 연령대 분포입니다.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <div className="w-full">
              <ResponsiveContainer width="100%" height={40}>
                <BarChart
                  layout="vertical"
                  data={genderData}
                  stackOffset="expand"
                  margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                >
                  <XAxis type="number" hide />
                  <YAxis type="category" dataKey="category" hide />

                  <Tooltip
                    cursor={false}
                    content={<CustomTooltip />}
                    offset={20}
                  />

                  <Legend
                    verticalAlign="bottom"
                    align="right"
                    iconType="circle"
                    iconSize={8}
                    wrapperStyle={{
                      fontSize: "12px",
                      paddingRight: "10px",
                    }}
                    formatter={(value) => (
                      <span
                        style={{
                          fill: isDark ? "#efefef" : "#2f2f2f",
                          color: isDark ? "#efefef" : "#2f2f2f",
                        }}
                      >
                        {value}
                      </span>
                    )}
                  />
                  {/* 남성 */}
                  <Bar
                    dataKey="male"
                    name="남성"
                    fill="#4359FF"
                    stackId="a"
                    barSize={10}
                    radius={
                      isSingleGender && hasMale
                        ? [50, 50, 50, 50] // 남성만 있으면 양쪽 라운드
                        : [50, 0, 0, 50] // 기본: 왼쪽만 라운드
                    }
                  />
                  {/* 여성 */}
                  <Bar
                    dataKey="female"
                    name="여성"
                    fill="#F45C7F"
                    stackId="a"
                    barSize={10}
                    radius={
                      isSingleGender && hasFemale
                        ? [50, 50, 50, 50] // 여성만 있으면 양쪽 라운드
                        : [0, 50, 50, 0] // 기본: 오른쪽만 라운드
                    }
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* --- 연령대 분포 차트 --- */}
          <div>
            <div className="w-full">
              <ResponsiveContainer width="100%" height={60}>
                <BarChart
                  layout="vertical"
                  data={ageData}
                  stackOffset="expand"
                  margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                >
                  <XAxis type="number" hide />
                  <YAxis type="category" dataKey="category" hide />

                  <Tooltip cursor={false} content={<CustomTooltip />} />
                  <Legend
                    verticalAlign="bottom"
                    align="right"
                    iconType="circle"
                    iconSize={8}
                    wrapperStyle={{
                      fontSize: "13px",
                      paddingRight: "10px",
                    }}
                    formatter={(value) => (
                      <span
                        style={{
                          fill: isDark ? "#efefef" : "#2f2f2f",
                          color: isDark ? "#efefef" : "#2f2f2f",
                        }}
                      >
                        {value}
                      </span>
                    )}
                  />

                  {/* 10대 */}
                  <Bar
                    dataKey="teen"
                    name="10대"
                    fill="#FCC85B"
                    stackId="b"
                    barSize={10}
                    radius={
                      isSingleAge && singleAgeKey === "teen"
                        ? [50, 50, 50, 50] // 10대만 있는 경우
                        : [50, 0, 0, 50]
                    }
                  />

                  {/* 20대 */}
                  <Bar
                    dataKey="twenties"
                    name="20대"
                    fill="#1BD1A1"
                    stackId="b"
                    barSize={10}
                    radius={
                      isSingleAge && singleAgeKey === "twenties"
                        ? [50, 50, 50, 50]
                        : 0
                    }
                  />

                  {/* 30대 */}
                  <Bar
                    dataKey="thirties"
                    name="30대"
                    fill="#2E8FFF"
                    stackId="b"
                    barSize={10}
                    radius={
                      isSingleAge && singleAgeKey === "thirties"
                        ? [50, 50, 50, 50]
                        : 0
                    }
                  />

                  {/* 40대 이상 */}
                  <Bar
                    dataKey="fortiesPlus"
                    name="40대 이상"
                    fill="#6D45FF"
                    stackId="b"
                    barSize={10}
                    radius={
                      isSingleAge && singleAgeKey === "fortiesPlus"
                        ? [50, 50, 50, 50] // 40대 이상만 있는 경우
                        : [0, 50, 50, 0]
                    }
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AudienceAnalyticsChart;
