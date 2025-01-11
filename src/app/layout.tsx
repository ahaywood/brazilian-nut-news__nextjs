import { createClient } from "@/lib/supabase/server";
import type { Metadata } from "next";

import { Inter, Bebas_Neue, Krona_One } from "next/font/google";
import "./globals.css";

import Header from "@/components/Header";
import Nav from "@/components/Nav";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const kronaOne = Krona_One({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-krona",
  weight: "400",
});

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-bebas",
  weight: "400",
});

export const metadata: Metadata = {
  title: "Brazilian Nut News",
  description: "where the best news naturally rises to the top",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
  }) {

  const supabase = await createClient()
  // get the logged in user via Supabase Auth
  // this comes from the Auth table and not the user's table
  const { data, error } = await supabase.auth.getUser()
  const userId = data?.user?.id;

  let user = null;

  // take the userID and get the user from the User Table on the database
  if (userId) {
    const results = await supabase.from('User').select('*').eq('userId', userId).single();
    user = results.data;
  }


  return (
    <html
      lang="en"
      className={`${inter.variable} ${kronaOne.variable} ${bebasNeue.variable}`}
    >
      <body>
        <Header />
        <Nav nickname={ user?.nickname || null } />
        {children}
      </body>
    </html>
  );
}
