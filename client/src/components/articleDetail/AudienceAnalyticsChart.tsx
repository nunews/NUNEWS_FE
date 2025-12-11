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

interface AudienceAnalyticsChartProps {
  newsId: string;
}

const AudienceAnalyticsChart = ({ newsId }: AudienceAnalyticsChartProps) => {
  const { data, isLoading, isError } = useNewsAudienceStats(newsId);

  if (isLoading) {
    //로딩 카드
    return (
      <div className="bg-card text-card-foreground rounded-xl p-4 animate-pulse">
        <div className="mb-4">
          <div className="h-5 w-40 rounded bg-[var(--color-gray-40)] dark:bg-[var(--color-gray-70)]" />
          <div className="mt-2 h-4 w-56 rounded bg-[var(--color-gray-40)] dark:bg-[var(--color-gray-70)]" />
        </div>
        <div className="space-y-3">
          <div className="h-6 w-full rounded bg-[var(--color-gray-40)] dark:bg-[var(--color-gray-70)]" />
          <div className="h-10 w-full rounded bg-[var(--color-gray-40)] dark:bg-[var(--color-gray-70)]" />
        </div>
      </div>
    );
  }

  //에러 차트 카드
  if (isError || !data || !data.hasData) {
    return (
      <div className="border border-[var(--color-gray-60)] dark:border-[var(--color-gray-90)] rounded-xl p-4">
        <h2 className="text-xl leading-[140%] font-semibold dark:text-white text-[var(--color-black)]">
          누가 이 기사를 봤을까? 🤔
        </h2>
        <p className="text-base mt-2 leading-[140%] dark:taxt-[var(--color-gray-20)] text-[var(--color-gray-90)]">
          아직 이 기사에 대한
          <br />
          조회자 통계가 없어요.
        </p>
      </div>
    );
  }

  const genderData = [
    {
      category: "성별",
      male: data.gender?.male ?? 0,
      female: data.gender?.female ?? 0,
    },
  ];

  const gender = genderData[0];
  const hasMale = gender.male > 0;
  const hasFemale = gender.female > 0;
  const isSingleGender = (hasMale && !hasFemale) || (!hasMale && hasFemale);

  const ageData = [
    {
      category: "연령",
      teen: data.age?.teen ?? 0,
      twenties: data.age?.twenties ?? 0,
      thirties: data.age?.thirties ?? 0,
      fortiesPlus: data.age?.fortiesPlus ?? 0,
    },
  ];

  const age = ageData[0];

  const ageKeys: (keyof typeof age)[] = [
    "teen",
    "twenties",
    "thirties",
    "fortiesPlus",
  ];

  const nonZeroAgeKeys = ageKeys.filter((key) => (age[key] as number) > 0);
  const isSingleAge = nonZeroAgeKeys.length === 1;
  const singleAgeKey = isSingleAge ? nonZeroAgeKeys[0] : null;

  return (
    <>
      <div className="S border border-[var(--color-gray-70)] rounded-xl p-4 ">
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
                    wrapperStyle={{ fontSize: "13px", paddingRight: "10px" }}
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
