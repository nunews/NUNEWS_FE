'use server';

import { createServerSupabase } from '@/utils/supabase/server';

export async function getAuthUser() {
  const supabase = await createServerSupabase();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return { user: null, isLoggedIn: false };
  }

  return { user, isLoggedIn: true, error };
}
