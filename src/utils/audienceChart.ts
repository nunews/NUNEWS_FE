export function getAudienceChartData(
  data: AudienceStatsResult
): AudienceChartData {
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

  // 연령
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

  return {
    genderData,
    hasMale,
    hasFemale,
    isSingleGender,
    ageData,
    isSingleAge,
    singleAgeKey,
  };
}
