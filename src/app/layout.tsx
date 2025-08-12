import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from "@/components/ui/toaster"
import { Inter, Sora, Space_Mono, VT323 } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const sora = Sora({ subsets: ['latin'], weight: '600', variable: '--font-sora' });
const spaceMono = Space_Mono({ subsets: ['latin'], weight: '400', variable: '--font-space-mono' });
const vt323 = VT323({ subsets: ['latin'], weight: '400', variable: '--font-vt323' });


export const metadata: Metadata = {
  title: 'HackMate',
  description: 'Find your next hackathon team.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          inter.variable,
          sora.variable,
          spaceMono.variable,
          vt323.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}