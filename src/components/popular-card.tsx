import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface PopularCardProps {
  item: {
    name: string;
    icon?: LucideIcon;
  };
  color: 'green' | 'blue' | 'red';
}

export default function PopularCard({ item, color }: PopularCardProps) {
  const colorClasses = {
    green: 'bg-green-500/10 text-green-400 border-green-500/20',
    blue: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    red: 'bg-red-500/10 text-red-400 border-red-500/20',
  };

  return (
    <div
      className={cn(
        'flex items-center space-x-3 rounded-lg border p-3',
        colorClasses[color]
      )}
    >
      {item.icon && <item.icon className="h-6 w-6" />}
      <p className="font-semibold">{item.name}</p>
    </div>
  );
}
