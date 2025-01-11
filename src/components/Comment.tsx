import Link from "next/link";
import Icon from "./Icon";

import type { JSX } from "react";

interface Props {
  children?: JSX.Element | null;
  commentedBy: {
    firstName: string|null;
    lastName: string|null;
    username: string|null;
  };
}

const Comment = ({ children, commentedBy }: Props) => {
  return (
    <div className="shared-link flex gap-x-5 pl-4 pr-8 pt-8 pb-6 mb-10">
      {/* vote */}
      <div className="flex flex-col w-6">
        <button className="up filled">
          <Icon id="up" size={16} />
        </button>
        <button className="down">
          <Icon id="up" className="rotate-180" size={16} />
        </button>
      </div>

      <div>
        {/* comment meta data */}
        <div className="font-sans text-medium text-sm dark:text-icterine mb-2">
          <Link
            href={`/profile/${commentedBy.username}`}
            className="font-bold underline hover:no-underline"
          >
            {commentedBy.firstName} {commentedBy.lastName}
          </Link>{" "}
          • 0 minutes ago
        </div>

        {/* comment content */}
        <div className="comment text-cinder dark:text-icterine">
          <div>{children}</div>
          <button>Reply</button>
        </div>
      </div>
    </div>
  );
};

export { Comment };
