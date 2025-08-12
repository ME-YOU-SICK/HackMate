import type { Metadata } from 'next';
import './globals.css';
import { Inter, Poppins, Sora } from 'next/font/google';
import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-poppins',
});
const sora = Sora({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-sora',
});

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
      <body className={cn('font-sans antialiased', inter.variable, poppins.variable, sora.variable)}>{children}</body>
    </html>
  );
}
