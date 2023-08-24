import "@/app/globals.css";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { Nunito_Sans } from "next/font/google";

import { cn } from "@/lib/utils";
import Footer from "@/components/footer";
import { authOptions } from "@/lib/auth";
import Sidebar from "@/components/sidebar";
import { Toaster } from "@/components/ui/toaster";
import { Separator } from "@/components/ui/separator";
import ColorsClassesTw from "@/components/dynamic-cn";
import PortalHeader from "@/components/portal-header";
import AuthProvider from "@/components/providers/auth-provider";
import ThemeProvider from "@/components/providers/theme-provider";
import UserProvider from "@/components/providers/user-provider";

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
          <AuthProvider>
            <UserProvider session={session}>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
              >
                <PortalHeader />
                <Separator />
                <div className="w-full h-full flex flex-row flex-grow container mt-3">
                  <Sidebar />
                  {children}
                </div>
                <Footer />
                <ColorsClassesTw />
              </ThemeProvider>
            </UserProvider>
          </AuthProvider>
        </main>
        <Toaster />
      </body>
    </html>
  );
}
