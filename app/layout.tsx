import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { MainNav } from "@/components/main-nav";
import { UserNav } from "@/components/user-nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BankDocs - Электронный документооборот",
  description:
    "Безопасная система управления документооборотом для банковской деятельности",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <div className="min-h-screen flex flex-col">
            <header className="border-b sticky top-0 z-30 bg-background">
              <div className="flex h-16 items-center px-4 sm:px-6 lg:px-8">
                <MainNav />
                <div className="ml-auto flex items-center space-x-4">
                  <UserNav />
                </div>
              </div>
            </header>
            <main className="flex-1">{children}</main>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
