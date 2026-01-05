interface AudienceData {
  gender: {
    male: number;
    female: number;
  } | null;

  age: {
    teen: number;
    twenties: number;
    thirties: number;
    fortiesPlus: number;
  } | null;
}

interface AudienceStatsResult extends AudienceData {
  hasData: boolean;
}

interface AudienceChartData {
  genderData: {
    category: string;
    male: number;
    female: number;
  }[];

  hasMale: boolean;
  hasFemale: boolean;
  isSingleGender: boolean;

  ageData: {
    category: string;
    teen: number;
    twenties: number;
    thirties: number;
    fortiesPlus: number;
  }[];

  isSingleAge: boolean;
  singleAgeKey:
    | "category"
    | "teen"
    | "twenties"
    | "thirties"
    | "fortiesPlus"
    | null;
}
