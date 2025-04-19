import type { Metadata } from "next";
import "./globals.css";
import Middleware from "../../middleware";
import toast, { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: "CarbonlyTech",
  description: "Carbon with tech",
};

const notify = () => toast('Here is your toast.');

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="">
        <Middleware />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
