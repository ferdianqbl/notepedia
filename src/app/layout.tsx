import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/lib/providers/next-theme";
import AppStateProvider from "@/lib/providers/state-provider";
import { Toaster } from "@/components/ui/toaster";
import SupabaseUserProvider from "@/lib/providers/supabase-user-provider";

// import db from "@/lib/supabase/db";
const dmSans = DM_Sans({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Notepedia",
  description: "Make notes, share them, and collaborate with others.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // console.log(db);
  return (
    <html lang="en">
      <body className={dmSans.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <AppStateProvider>
            <SupabaseUserProvider>{children}</SupabaseUserProvider>
            <Toaster />
          </AppStateProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
