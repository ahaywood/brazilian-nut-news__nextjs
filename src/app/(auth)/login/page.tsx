import React from 'react'

import Link from 'next/link'
import { login } from './actions'

import { Footer } from '@/components/Footer'

export default function Login() {
  return (
    <>
      <div className="page-grid min-h-screen bg-cinder">
        <div className="col-span-12 col-start-1 row-start-1">
          <h1 className="max-w-screen overflow-hidden pt-6 text-[375px] leading-[295px] text-fountainBlue">
            <div className="text-white">Login</div>
            <div className="outline">LOGIN</div>
            <div className="outline">LOGIN</div>
          </h1>
        </div>
        <div className="col-span-4 col-start-8 row-start-1">
          {/* LOGIN FORM */}
          <form className="mt-[100px] bg-cinder p-4 text-white">
            <div className="field">
              <label className="text-icterine">
                Email
              </label>
              <input type="text" name="email" autoComplete="email" tabIndex={1} autoFocus />
            </div>

            <div className="field">
              <div className="flex items-end justify-between">
                <label className="text-icterine">
                  Password
                </label>
                <Link
                  href="/forgot"
                  className="mb-3 text-icterine underline hover:text-white hover:no-underline"
                >
                  Forgot?
                </Link>
              </div>
              <input type="password"
                name="password"
                autoComplete="current-password"
                tabIndex={2}
              />
            </div>

            <button
              formAction={login}
              className="w-full bg-icterine py-6 text-center text-[38px] font-bold leading-none text-cinder hover:bg-fountainBlue">
              Login
            </button>
          </form>
        </div>
      </div>

      <div className="border-t-2 border-t-icterine bg-icterine py-8 pl-leftGutter text-cinder">
        <Footer />
      </div>
    </>
  );
}
