import Link from "next/link";

import { Logout } from "@/components/Logout";

const Nav = async ({ nickname = null }: { nickname: string | null | undefined }) => {
  return (
    <nav className="top-bar sticky-bar w-full fixed top-0 left-0 right-0 bg-cinder shadow-md flex justify-between px-6 py-3 items-center z-50">
      {/* left side */}
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/latest">Latest</Link>
        </li>
        {nickname && (
          <li>
            <Link href="/submit">
                Submit a Link
            </Link>
          </li>
        )}
      </ul>

      {/* right side */}
      <ul>
        {nickname ? (
          <>
            <li>
              <Logout />
            </li>

            <li>
              <Link href={`/profile/${nickname}`} className="button">
                My Profile
              </Link>
            </li>
          </>
        ) : (
          <>
          <li>
              <Link href="/signup">
                Sign Up
              </Link>
            </li>
            <li>
              <Link href="/login" className="button">
                Login
              </Link>
            </li>
            </>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
