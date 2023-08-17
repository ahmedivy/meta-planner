import "@/app/globals.css";
import { Nunito_Sans } from "next/font/google";

import { cn } from "@/lib/utils";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Toaster } from "@/components/ui/toaster";
import AuthProvider from "@/components/auth-provider";
import ThemeProvider from "@/components/theme-provider";

const font = Nunito_Sans({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: "Portal | Meta Planner",
  },
  description: "A forex website",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={cn(`min-h-screen`, font.className)}>
        <main className="flex min-h-screen flex-col items-center justify-between container">
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <AuthProvider>
              <Header />
              {children}
              <Footer />
            </AuthProvider>
          </ThemeProvider>
        </main>
        <Toaster />
      </body>
    </html>
  );
}
