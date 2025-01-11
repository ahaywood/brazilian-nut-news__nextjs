"use server";
import { createClient } from "@/lib/supabase/server";
import { VoteDirection } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const vote = async ({
  linkId,
  userId,
  direction,
  prev
}: {
  linkId: string,
  userId: number | null,
  direction: VoteDirection,
  prev: VoteDirection | null
}) => {
  const supabase = await createClient();

  try {
    // If clicking same direction, remove vote
    if (prev === direction) {
      await supabase
        .from('LinkUserVote')
        .delete()
        .eq('linkId', linkId)
        .eq('userId', userId);
    } else {
      // If changing vote direction or new vote
      if (prev) {
        // Update existing vote
        await supabase
          .from('LinkUserVote')
          .update({ direction })
          .eq('linkId', linkId)
          .eq('userId', userId);
      } else {
        // Insert new vote
        await supabase
          .from('LinkUserVote')
          .insert({ linkId, userId, direction });
      }
    }

    // Revalidate the page to show updated data
    revalidatePath('/');
    revalidatePath('/latest');
    revalidatePath(`/${linkId}`);

  } catch (error) {
    console.error('Error voting:', error);
    throw error;
  }
}

export const removeVote = async (linkId: string, userId: number) => {
  const supabase = await createClient();
  return await supabase.from('LinkUserVote').delete().eq('linkId', linkId).eq('userId', userId);
}