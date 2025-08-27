import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Viral Quote Engine",
  description: "AI-powered quote rewriting tool",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
