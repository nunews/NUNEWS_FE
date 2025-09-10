import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const genderData = [{ category: "성별", male: 58, female: 42 }];
const ageData = [
  { category: "연령", teen: 12, twenties: 35, thirties: 43, fortiesPlus: 10 },
];

const AudienceAnalyticsChart = () => {
  return (
    <>
      <div className="border bg-card text-card-foreground rounded-xl p-4 ">
        <div className="mb-4">
          <h3 className="text-lg font-semibold">누가 이 기사를 봤을까? 🤔</h3>
          <p className="text-sm text-muted-foreground">
            이 기사를 본 사용자들의 성별 및 연령대 분포입니다.
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
                    contentStyle={{
                      backgroundColor: "hsl(var(--background))",
                      borderColor: "hsl(var(--border))",
                      fontSize: "12px",
                    }}
                    itemStyle={{ padding: 0 }}
                    labelStyle={{ display: "none" }}
                  />
                  <Legend
                    verticalAlign="bottom"
                    align="right"
                    iconType="circle"
                    wrapperStyle={{
                      fontSize: "12px",
                      paddingTop: "10px",
                      paddingRight: "10px",
                    }}
                  />
                  <Bar
                    dataKey="male"
                    name="남성"
                    fill="#6B46C1"
                    stackId="a"
                    barSize={12}
                  />
                  <Bar
                    dataKey="female"
                    name="여성"
                    fill="#B794F4"
                    stackId="a"
                    barSize={12}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* --- 연령대 분포 차트 --- */}
          <div>
            <div className="w-full">
              <ResponsiveContainer width="100%" height={40}>
                <BarChart
                  layout="vertical"
                  data={ageData}
                  stackOffset="expand"
                  margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                >
                  <XAxis type="number" hide />
                  <YAxis type="category" dataKey="category" hide />

                  <Tooltip
                    cursor={false}
                    contentStyle={{
                      backgroundColor: "hsl(var(--background))",
                      borderColor: "hsl(var(--border))",
                      fontSize: "12px",
                    }}
                    itemStyle={{ padding: 0 }}
                    labelStyle={{ display: "none" }}
                  />
                  <Legend
                    verticalAlign="bottom"
                    align="right"
                    iconType="circle"
                    wrapperStyle={{
                      fontSize: "12px",
                      paddingTop: "10px",
                      paddingRight: "10px",
                    }}
                  />
                  <Bar
                    dataKey="teen"
                    name="10대"
                    fill="#5A67D8"
                    stackId="b"
                    barSize={12}
                  />
                  <Bar
                    dataKey="twenties"
                    name="20대"
                    fill="#81E6D9"
                    stackId="b"
                    barSize={12}
                  />
                  <Bar
                    dataKey="thirties"
                    name="30대"
                    fill="#F6E05E"
                    stackId="b"
                    barSize={12}
                  />
                  <Bar
                    dataKey="fortiesPlus"
                    name="40대 이상"
                    fill="#FBD38D"
                    stackId="b"
                    barSize={12}
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
