import Link from "next/link";
import Icon from "@/components/Icon";

interface Props {
  firstName: string|null;
  lastName: string|null;
  nickname: string|null;
  isMe: boolean|null;
  github?: string|null;
  facebook?: string|null;
  youtube?: string|null;
  linkedin?: string|null;
  twitter?: string|null;
}

const Profile = ({
  firstName,
  lastName,
  nickname,
  isMe,
  github = "",
  facebook = "",
  youtube = "",
  linkedin = "",
  twitter = "",
}: Props) => {
  return (
    <div className="border-b-2 border-b-icterine pb-2">
      <h1 className="max-w-screen overflow-hidden pt-6 text-[19em] leading-[.8] text-white">
        <span className="text-white outline">{firstName}</span>{' '}
        <span className="text-fountainBlue">{lastName}</span>
      </h1>

      <div className="flex flex-col items-start justify-between pr-5 md:flex-row md:items-center">
        <nav>
          <ul className="flex flex-col justify-start text-left font-condensed text-3xl uppercase text-fountainBlue md:flex-row md:gap-11 md:text-4xl lg:text-6xl">
            <li>
              <Link
                className="hover:text-white"
                // activeClassName="text-icterine"
                href={`/profile/${nickname}`}
              >
                Links Shared
              </Link>
            </li>
            <li>
              <Link
                className="hover:text-white"
                // activeClassName="text-icterine"
                href={`/profile/${nickname}/comments`}
              >
                Comments
              </Link>
            </li>
            <li>
              <Link
                className="hover:text-white"
                // activeClassName="text-icterine"
                href={`/profile/${nickname}/favorites`}
              >
                Favorites
              </Link>
            </li>
          </ul>
        </nav>

        {isMe ? (
          <Link
            className="font-condensed text-3xl uppercase text-stormDust hover:text-white md:text-4xl lg:text-6xl"
            // activeClassName="text-icterine"
            href={`/profile/${nickname}/edit`}
          >
            Edit My Profile
          </Link>
        ) : (
          <ul className="flex gap-8 text-stormDust">
            {github && (
              <li>
                <a
                  href={github}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-icterine"
                >
                  <Icon size={42} id="github" />
                </a>
              </li>
            )}
            {facebook && (
              <li>
                <a
                  href={facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-icterine"
                >
                  <Icon size={42} id="facebook" />
                </a>
              </li>
            )}
            {youtube && (
              <li>
                <a
                  href={youtube}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-icterine"
                >
                  <Icon size={42} id="youtube" />
                </a>
              </li>
            )}
            {linkedin && (
              <li>
                <a
                  href={linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-icterine"
                >
                  <Icon size={42} id="linkedin" />
                </a>
              </li>
            )}
            {twitter && (
              <li>
                <a
                  href={twitter}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-icterine"
                >
                  <Icon size={42} id="twitter" />
                </a>
              </li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export { Profile };
