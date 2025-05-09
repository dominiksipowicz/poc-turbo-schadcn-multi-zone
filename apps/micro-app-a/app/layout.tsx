import "@workspace/ui/globals.css";
import { Providers } from "@/components/providers";
import Navbar from "@workspace/ui/components/navbar";
import { PinnedCallStatus } from "@workspace/ui/components/pinned-call-status";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <Providers>
          <Navbar />
          <main className="container mx-auto p-4 mt-20">{children}</main>
          <PinnedCallStatus />
        </Providers>
      </body>
    </html>
  );
}
