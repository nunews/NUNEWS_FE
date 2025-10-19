import supabase from "@/utils/supabase";

export const getCurrentUser = async () => {
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    console.error("사용자 정보 불러오기 실패:", error?.message);
    return;
  }
  return data.user;
};
