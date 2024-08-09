import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./componenets/Header";
import Footer from "./componenets/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BilliMD",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header>
          <Header />
        </header>
        <main>
        {children}
        </main>
        <footer>
          <Footer />
        </footer>
        </body>
    </html>
  );
}
