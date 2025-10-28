import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { cookies } from "next/headers";
import TanstackProvider from "./provider/TanstackProvider";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "NUNEW",
  description: "누구나 간단히 읽는 쉬운 뉴스, 누뉴",
};
const pretendard = localFont({
  src: "../../public/fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "100 900",
  variable: "--font-pretendard",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const theme = cookieStore.get("theme")?.value ?? "system";
  return (
    <html lang="ko" suppressHydrationWarning data-theme={theme}>
      <body className={`${pretendard.variable} w-full`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={true} // 시스템 설정 허용으로 변경
          disableTransitionOnChange
        >
          <div className="max-w-screen-lg mx-auto">
            <TanstackProvider>{children}</TanstackProvider>
          </div>
          <Toaster position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  );
}
