import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${pretendard.variable} w-full`}>
        {/* <Header
          logo={true}
          nuPick={true}
          interest={["경제", "사회", "문화"]}
          dark={false}
        />
        <div className="pt-[98px] bg-black/70">{children}</div>
        <Footer isNuPick={true} /> */}
        {children}
      </body>
    </html>
  );
}
