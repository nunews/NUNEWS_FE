import createClient from "@/utils/supabase/client";

export const getCurrentUser = async () => {
  const supabase = createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error) {
    console.error("사용자 정보 불러오기 실패:", error?.message);
    return;
  }
  return user;
};
