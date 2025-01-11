import prisma from '@/lib/prisma'
import { Comment as CommentType } from '@prisma/client';

import { Profile } from '../Profile'
import { Footer } from '@/components/Footer'
import { Comment } from '@/components/Comment'
import { notFound } from 'next/navigation';

interface Props {
  params: { username: string };
}

export default async function UserComments({ params }: Props) {
  const { username } = await params;

  const data = await prisma.user.findUnique({
    where: {
      nickname: username
    },
    include: {
      comments: true
    }
  })

  if (!data) {
    return notFound();
  }

  return (
    <div className="py-10">
      {data?.comments && data.comments.map((comment: CommentType) => (
        <Comment key={comment.id} commentedBy={{
          firstName: data.firstName,
          lastName: data.lastName,
          username: data.nickname
        }}>
          <>{comment.body}</>
        </Comment>
      ))}
    </div>
  )
}
