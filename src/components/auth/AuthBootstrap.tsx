"use client";

import { useEffect } from "react";
import createClient from "@/utils/supabase/client";
import { useAuthStore } from "@/stores/authStore";

// 최초 유저 정보 저장하는 로직
export default function AuthBootstrap() {
  const supabase = createClient();
  const { isInitialized, setUser, clearUser } = useAuthStore();

  useEffect(() => {
    if (isInitialized) return;

    // 인증 유저
    const init = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data.user) {
        clearUser();
        return;
      }

      const userId = data.user.id;
      // 관심사 + 프로필
      const [{ data: profile }, { data: interests }] = await Promise.all([
        supabase
          .from("User")
          .select("nickname, profile_image, age_range, gender")
          .eq("user_id", userId)
          .single(),

        supabase
          .from("User_Interests")
          .select("category_id")
          .eq("user_id", userId),
      ]);

      setUser({
        userId,
        email: data.user.email,
        nickname: profile?.nickname,
        profile_image: profile?.profile_image,
        age_range: profile?.age_range,
        gender: profile?.gender,
        interest: interests?.map((i) => i.category_id) ?? [],
      });
    };

    init();
  }, [isInitialized, supabase, clearUser, setUser]);

  return null;
}
