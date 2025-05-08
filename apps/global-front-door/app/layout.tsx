import "@workspace/ui/globals.css";
import { Providers } from "@/components/providers";
import Navbar from "@workspace/ui/components/navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans antialiased `}>
        <Navbar />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
