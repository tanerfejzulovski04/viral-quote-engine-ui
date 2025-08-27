import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Viral Quote Engine",
  description: "Template gallery and quote generator",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}