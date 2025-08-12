import { CodeXml } from 'lucide-react';
import Link from 'next/link';

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2" prefetch={false}>
      <div className="p-2 bg-primary text-primary-foreground rounded-lg">
        <CodeXml className="h-5 w-5" />
      </div>
      <span className="text-xl font-bold tracking-tight">HackMate</span>
    </Link>
  );
}
