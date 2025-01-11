import { createClient } from '@/lib/supabase/server';
import { getLink } from '@/lib/actions/links';
import { getCurrentUser } from '../actions';
import { Comment as CommentType } from "@prisma/client";

import { SharedLink } from "@/components/SharedLink";
import { Comment } from "@/components/Comment";
import { format } from "date-fns";

interface Props {
  params: { id: string };
}

export default async function IndividualLink({ params }: Props) {
  const supabase = await createClient();
  const { id: linkId } = await params;

  const user = await getCurrentUser();
  const userId = user?.id || null;

  const { data, error } = await getLink({ linkId, userId });

  return (
    <main className="bg-icterine dark:bg-cinder min-w-screen min-h-screen">
      <SharedLink
        isFavorite={data.FavoriteLinkUser.length > 0}
        id={data.id}
        numberOfComments={data.Comment.length}
        points={data.upvotes[0]?.count - data.downvotes[0]?.count}
        postedDate={format(new Date(), 'MMM d, yyyy')}
        submittedBy={{
          firstName: data.User.firstName,
          lastName: data.User.lastName,
          nickname: data.User.nickname,
        }}
        title={data.title}
        url={data.link}
        userId={userId}
        voteDirection={data.LinkUserVote?.[0]?.direction || null}
      />
      <div className="pt-11 page-grid">
        <div className="col-span-9">
          <form action="" className="pb-16">
            <textarea></textarea>
            <button>Add Comment</button>
          </form>

          {data.Comment &&data.Comment.map((comment: CommentType) => (
            <Comment
              key={comment.id}
              commentedBy={{
                firstName: "Amy",
                lastName: "Dutton",
                username: "selfteachme",
              }}
          >
            <Comment
              commentedBy={{
                firstName: "Amy",
                lastName: "Dutton",
                username: "selfteachme",
              }}
            />
            </Comment>
          ))}
        </div>
      </div>
    </main>
  );
}
