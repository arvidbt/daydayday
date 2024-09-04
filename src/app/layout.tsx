import "@/styles/globals.css";

import { type Metadata } from "next";
import { fontSans } from "@/styles/fonts";
import { TRPCReactProvider } from "@/trpc/react";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import { Navbar } from "@/components/navbar";

export const metadata: Metadata = {
  title: "daydayday",
  description: "",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="font-sans">
      <body
        className={cn(
          "h-screen w-screen font-sans antialiased",
          fontSans.variable,
        )}
      >
        <TRPCReactProvider>
          <Navbar />
          {children}
          <Toaster />
        </TRPCReactProvider>
      </body>
    </html>
  );
}
