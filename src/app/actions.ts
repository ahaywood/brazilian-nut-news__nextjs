"use server";

import { createClient } from "@/lib/supabase/server";
import { User } from "@prisma/client";

export const getCurrentUser = async (): Promise<User | null> => {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  return await getUser(user.id);
}

export const getUser = async (userId: string): Promise<User | null> => {
  const supabase = await createClient();
  const { data, error } = await supabase.from('User').select('*').eq('userId', userId).single();
  if (error) console.error(error);
  return data;
}