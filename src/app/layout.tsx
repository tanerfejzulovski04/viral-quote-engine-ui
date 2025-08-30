import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Viral Quote Engine",
  description: "Create and manage viral quotes with AI assistance",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
