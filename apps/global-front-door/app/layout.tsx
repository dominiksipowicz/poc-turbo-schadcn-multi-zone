import "@workspace/ui/globals.css";
import { Providers } from "@/components/providers";
import { PinnedCallStatus } from "@workspace/ui/components/pinned-call-status";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans antialiased `}>
        <Providers>
          {children}
          <PinnedCallStatus />
        </Providers>
      </body>
    </html>
  );
}
