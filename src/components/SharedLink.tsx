"use client";

import { useOptimistic, useTransition } from "react";
import Link from "next/link";
import { User, VoteDirection } from "@prisma/client";
import { vote } from "@/lib/actions/vote";
import Icon from "./Icon";

import { formatDistanceToNow } from 'date-fns';
import { markAsFavorite, removeFavorite } from "@/lib/actions/links";

type OptimisticState = {
  points: number;
  voteDirection: VoteDirection | null;
};

type FavoriteOptimisticState = {
  favorite: boolean;
};

interface Props {
  id: string;
  postedDate: string;
  numberOfComments: number;
  points: number;
  submittedBy: Partial<User>;
  title: string;
  url: string;
  userId?: number | null;
  voteDirection?: VoteDirection | null;
  isFavorite?: boolean;
}

const SharedLink = ({
  id,
  postedDate,
  numberOfComments,
  points,
  submittedBy,
  title,
  url,
  userId = null,
  voteDirection = null,
  isFavorite = false
}: Props) => {
  const timeAgo = formatDistanceToNow(new Date(postedDate), { addSuffix: true });

  const [favoriteOptimisticState, setFavoriteOptimisticState] = useOptimistic(
    { favorite: isFavorite },
    (state: FavoriteOptimisticState, action: { favorite: boolean }) => ({
      favorite: action.favorite
    })
  );

  const [optimisticState, updateOptimisticState] = useOptimistic(
    { points, voteDirection },
    (state: OptimisticState, action: { direction: VoteDirection | null; pointsDelta: number }) => ({
      points: state.points + action.pointsDelta,
      voteDirection: action.direction,
    })
  );

  const [isPending, startTransition] = useTransition();

  const handleVote = async (direction: VoteDirection) => {
    const newDirection = direction === optimisticState.voteDirection ? null : direction;

    // Calculate points delta
    let pointsDelta = 0;
    if (newDirection === VoteDirection.UP) {
      pointsDelta = optimisticState.voteDirection === VoteDirection.DOWN ? 2 : 1;
    } else if (newDirection === VoteDirection.DOWN) {
      pointsDelta = optimisticState.voteDirection === VoteDirection.UP ? -2 : -1;
    } else {
      // Removing vote
      pointsDelta = optimisticState.voteDirection === VoteDirection.UP ? -1 : 1;
    }

    startTransition(() => {
      updateOptimisticState({
        direction: newDirection,
        pointsDelta
      });
    });

    try {
      await vote({
        linkId: id,
        userId,
        direction,
        prev: optimisticState.voteDirection
      });
    } catch (error) {
      // Revert optimistic update on error
      startTransition(() => {
        updateOptimisticState({
          direction: optimisticState.voteDirection,
          pointsDelta: -pointsDelta
        });
      });
      console.error('Error voting:', error);
    }
  };

  const handleFavorite = async (newFavorite: boolean) => {
    if (isPending) return; // Prevent double-clicks

    const prevFavorite = favoriteOptimisticState.favorite;

    try {
      startTransition(() => {
        setFavoriteOptimisticState({ favorite: newFavorite });
      });

      if (!userId) {
        throw new Error('User ID is required');
      }

      if (newFavorite) {
        await markAsFavorite({ userId, linkId: id });
      } else {
        await removeFavorite({ userId, linkId: id });
      }
    } catch (error) {
      startTransition(() => {
        setFavoriteOptimisticState({ favorite: prevFavorite });
      });
      console.error('Error marking as favorite:', error);
    }
  };

  return (
    <div className="shared-link flex gap-x-5 pl-4 pr-8 pt-8 pb-6">
      {/* vote */}
      <div className="flex flex-col">
        { userId && (
          <>
            <button className={`up ${optimisticState.voteDirection === 'UP' ? 'filled' : ''}`} onClick={() => handleVote(VoteDirection.UP)}
            >
              <Icon id="up" />
            </button>
            <button className={`down ${optimisticState.voteDirection === 'DOWN' ? 'filled' : ''}`} onClick={() => handleVote(VoteDirection.DOWN)}
            >
              <Icon id="up" className="rotate-180" />
            </button>
          </>
        )}
      </div>

      {/* content */}
      <div className="w-full">
        <h2 className="uppercase font-condensed text-6xl leading-[0.8]">
          <Link
            href={`/${id}`}
            className="text-cinder dark:text-icterine visited:text-telemagenta"
          >
            {title}
          </Link>
        </h2>
        <div className="font-sans text-medium text-sm dark:text-icterine">
          <strong>{optimisticState.points} point{optimisticState.points > 1 ? 's' : ''}</strong> • submitted by{" "}
          <Link
            href={`/profile/${submittedBy.nickname}`}
            className="font-bold underline hover:no-underline"
          >
            {submittedBy.firstName} {submittedBy.lastName}
          </Link>{" "}
          • {timeAgo} •{" "}
          <Link
            href={`/${id}`}
            className="font-bold underline hover:no-underline"
            target="_blank"
            rel="noreferrer"
          >
            {numberOfComments} comments
          </Link>{" "}
          {userId && (
            <>•{" "}
              {favoriteOptimisticState.favorite ? (
                <button
                  className="font-bold relative top-[5px] inline-flex items-center gap-1 underline hover:no-underline"
                  onClick={() => handleFavorite(false)}
                >
                  <Icon id="heart--filled" size={20} />
                  Favorited
                </button>
              ) : (
                <button
                  className="font-bold relative top-[5px] inline-flex items-center gap-1 underline hover:no-underline"
                  onClick={() => handleFavorite(true)}
                >
                  <Icon id="heart--empty" size={20} />
                  Mark As Favorite
                </button>
              )}
            </>
          )}
        </div>
      </div>

      {/* arrow */}
      <a href={url} className="text-cinder dark:text-icterine" target="_blank" rel="noreferrer">
        <Icon id="arrow" className="w-14 relative top-2" />
      </a>
    </div>
  );
};

export { SharedLink }
