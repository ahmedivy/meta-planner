import "@/app/globals.css";
import { Nunito_Sans } from "next/font/google";

import { cn } from "@/lib/utils";
import Footer from "@/components/footer";
import { Toaster } from "@/components/ui/toaster";
import PortalHeader from "@/components/portal-header";
import AuthProvider from "@/components/providers/auth-provider";
import ThemeProvider from "@/components/providers/theme-provider";
import UserProvider from "@/components/providers/user-provider";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Sidebar from "@/components/sidebar";
import { Separator } from "@/components/ui/separator";
import ColorsClassesTw from "@/components/dynamic-cn";

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

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={cn(`min-h-screen`, font.className)}>
        <main className="flex min-h-screen flex-col items-center justify-between">
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <AuthProvider>
              <UserProvider session={session}>
                <PortalHeader />
                <Separator />
                <div className="w-full h-full flex flex-row flex-grow container mt-3">
                  <Sidebar />
                  {children}
                </div>
                <Footer />
                <ColorsClassesTw />
              </UserProvider>
            </AuthProvider>
          </ThemeProvider>
        </main>
        <Toaster />
      </body>
    </html>
  );
}
