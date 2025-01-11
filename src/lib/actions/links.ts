"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from 'next/cache'

export const getLinks = async (userId: number | null) => {
  const supabase = await createClient();

  if (userId) {
    return await supabase
      .from('Link')
      .select('*, User(firstName, lastName, nickname), FavoriteLinkUser(id), LinkUserVote(id, direction), Comment(count),  upvotes:LinkUserVote(count), downvotes:LinkUserVote(count)')
      .eq('FavoriteLinkUser.userId', userId)
      .eq('upvotes.direction', 'UP')
      .eq('downvotes.direction', 'DOWN')
      .eq('LinkUserVote.userId', userId)
      .order('createdAt', { ascending: false })
      .limit(50)
  }

  // otherwise, the user is not logged in. Can't get their votes and favorites
  return await supabase
    .from('Link')
    .select('*, User(firstName, lastName, nickname), Comment(count),  upvotes:LinkUserVote(count), downvotes:LinkUserVote(count)')
    .eq('upvotes.direction', 'UP')
    .eq('downvotes.direction', 'DOWN')
    .order('createdAt', { ascending: false })
    .limit(50)
}

export const getLink = async ({ linkId, userId }: { linkId: string, userId: number | null }) => {
  const supabase = await createClient();

  if (userId) {
    return await supabase
      .from('Link')
      .select('*, User(firstName, lastName, nickname), FavoriteLinkUser(id), LinkUserVote(id, direction), Comment(*, User(firstName, lastName, nickname)),  upvotes:LinkUserVote(count), downvotes:LinkUserVote(count)')
      .eq('id', linkId)
      .eq('FavoriteLinkUser.userId', userId)
      .eq('upvotes.direction', 'UP')
      .eq('downvotes.direction', 'DOWN')
      .eq('LinkUserVote.userId', userId)
      .order('createdAt', { ascending: false })
      .single()
  }

  return await supabase
    .from('Link')
    .select('*, User(firstName, lastName, nickname), Comment(*),  upvotes:LinkUserVote(count), downvotes:LinkUserVote(count)')
    .eq('id', linkId)
    .eq('upvotes.direction', 'UP')
    .eq('downvotes.direction', 'DOWN')
    .order('createdAt', { ascending: false })
    .single()
}

export const getUsersSharedLinks = async ({ userId, submittedById }: { userId: number | null, submittedById: number }) => {
  const supabase = await createClient();

  if (userId) {
    return await supabase
      .from('Link')
      .select('*, User(firstName, lastName, nickname), FavoriteLinkUser(id), LinkUserVote(id, direction), Comment(count),  upvotes:LinkUserVote(count), downvotes:LinkUserVote(count)')
      .eq('submittedById', submittedById)
      .eq('FavoriteLinkUser.userId', userId)
      .eq('upvotes.direction', 'UP')
      .eq('downvotes.direction', 'DOWN')
      .eq('LinkUserVote.userId', userId)
      .order('createdAt', { ascending: false })
      .limit(50)
  }

  // otherwise, the user is not logged in. Can't get their votes and favorites
  return await supabase
    .from('Link')
    .select('*, User(firstName, lastName, nickname), Comment(count),  upvotes:LinkUserVote(count), downvotes:LinkUserVote(count)')
    .eq('submittedById', submittedById)
    .eq('upvotes.direction', 'UP')
    .eq('downvotes.direction', 'DOWN')
    .order('createdAt', { ascending: false })
    .limit(50)
}

export async function markAsFavorite({ userId, linkId }: { userId: number, linkId: string }) {
  try {
    const supabase = await createClient();
    await supabase.from('FavoriteLinkUser').insert({
      userId,
      linkId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });

    // Revalidate relevant paths
    revalidatePath(`/${linkId}`) // Revalidate link detail page
    revalidatePath('/') // Revalidate homepage if needed
    revalidatePath(`/profile/${userId}`) // Revalidate profile page
  } catch (error) {
    throw error
  }
}

export async function removeFavorite({ userId, linkId }: { userId: number, linkId: string }) {
  try {
    const supabase = await createClient();
    await supabase.from('FavoriteLinkUser').delete().eq('userId', userId).eq('linkId', linkId);

    // Revalidate relevant paths
    revalidatePath(`/${linkId}`)
    revalidatePath('/')
    revalidatePath(`/profile/${userId}`)
  } catch (error) {
    throw error
  }
}