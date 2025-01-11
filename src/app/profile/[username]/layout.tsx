import React from 'react';
import { createClient } from "@/lib/supabase/server";
import { notFound } from 'next/navigation';

import { getCurrentUser } from '@/app/actions';

import { Profile } from "./Profile";
import { Footer } from '@/components/Footer';

interface LayoutProps {
  children: React.ReactNode;
  params: { username: string };
}

export default async function ProfileLayout({
  children,
  params,
}: LayoutProps) {
  const { username } = await params;

  // get the current user
  const user = await getCurrentUser();
  const userId = user?.id || null;

  // get the ID of the current user's profile
  const supabase = await createClient();
  const submittedBy = await supabase.from('User').select('*').eq('nickname', username).single();

  if (submittedBy.error) {
    return notFound();
  }

  return (
    <main className="bg-cinder w-screen min-h-screen">
      <Profile
        firstName={submittedBy.data.firstName || ''}
        lastName={submittedBy.data.lastName || ''}
        isMe={submittedBy.data.id === userId}
        nickname={username}
        github={submittedBy.data.github || ''}
        facebook={submittedBy.data.facebook || ''}
        youtube={submittedBy.data.youtube || ''}
        linkedin={submittedBy.data.linkedin || ''}
        twitter={submittedBy.data.twitter || ''}
      />
      {children}
      <div className="border-t-2 border-t-icterine py-8 pl-leftGutter text-icterine">
        <Footer />
      </div>
    </main>
  );
}