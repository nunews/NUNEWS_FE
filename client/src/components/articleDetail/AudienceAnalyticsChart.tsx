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
const genderData = [{ category: "성별", male: 58, female: 42 }];
const ageData = [
  { category: "연령", teen: 12, twenties: 35, thirties: 43, fortiesPlus: 10 },
];

const AudienceAnalyticsChart = () => {
  return (
    <>
      <div className="bg-card text-card-foreground rounded-xl p-4 ">
        <div className="mb-4">
          <h2 className="text-[22px] leading-[140%] font-semibold text-[var(--color-black)]">
            누가 이 기사를 봤을까? 🤔
          </h2>
          <p className="text-base mt-2 leading-[140%] text-[var(--color-gray-100)]">
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
                  <Bar
                    dataKey="male"
                    name="남성"
                    fill="#4359FF"
                    stackId="a"
                    barSize={10}
                    radius={[50, 0, 0, 50]}
                  />
                  <Bar
                    dataKey="female"
                    name="여성"
                    fill="#F45C7F"
                    stackId="a"
                    barSize={10}
                    radius={[0, 50, 50, 0]}
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
                  />
                  <Bar
                    dataKey="teen"
                    name="10대"
                    fill="#FCC85B"
                    stackId="b"
                    barSize={10}
                    radius={[50, 0, 0, 50]}
                  />
                  <Bar
                    dataKey="twenties"
                    name="20대"
                    fill="#1BD1A1"
                    stackId="b"
                    barSize={10}
                  />
                  <Bar
                    dataKey="thirties"
                    name="30대"
                    fill="#2E8FFF"
                    stackId="b"
                    barSize={10}
                  />
                  <Bar
                    dataKey="fortiesPlus"
                    name="40대 이상"
                    fill="#6D45FF"
                    stackId="b"
                    barSize={10}
                    radius={[0, 50, 50, 0]}
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
