import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/toast/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ReactQueryProvider } from "./providers";

const frunchySage = localFont({
  src: "../src/fonts/frunchy-sage.ttf",
  variable: "--font-frunchy-sage",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bay 'n Basil - Authentic Regional Cuisine",
  description:
    "Experience the authentic flavors of regional Indian cuisine with Bay 'n Basil",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={frunchySage.variable}>
        <ReactQueryProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            {children}
          </TooltipProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
