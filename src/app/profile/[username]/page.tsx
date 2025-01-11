import { createClient } from "@/lib/supabase/server";
import { format } from 'date-fns';

import { getCurrentUser } from '@/app/actions';

import { getUsersSharedLinks } from "@/lib/actions/links";
import { SharedLink } from "@/components/SharedLink";


interface Props {
  params: { username: string };
}

export default async function UsernameProfile({ params }: Props) {
  const { username } = await params;

  // get the current user
  const user = await getCurrentUser();
  const userId = user?.id || null;

  // get the ID of the current user's profile
  const supabase = await createClient();
  const submittedBy = await supabase.from('User').select('*').eq('nickname', username).single();

  const {data, error} = await getUsersSharedLinks({ userId, submittedById: submittedBy.data.id });

  return (
    <>
        {data && data.map((link) => (
        <SharedLink
          key={link.id}
          id={link.id}
          userId={userId}
          voteDirection={link.LinkUserVote?.[0]?.direction || null}
          postedDate={format(link.createdAt, 'MMM d, yyyy')}
          numberOfComments={link.Comment[0]?.count}
          points={link.upvotes[0]?.count - link.downvotes[0]?.count}
          submittedBy={{
            firstName: link?.User.firstName || '',
            lastName: link?.User.lastName || '',
            nickname: link?.User.nickname || '',
          }}
          title={link.title}
          url={link.link}
        />
        ))}
    </>
  );
}
