import type { Metadata } from "next";
import '@/styles/_globals.scss';

export const metadata: Metadata = {
  title: "Postal Code Finder",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
