import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function DashboardPage() {
  return (
    <div className="container mx-auto py-10">
      <Card className="border-slate-800 bg-slate-900/50">
        <CardHeader>
          <CardTitle className="font-sora text-2xl">Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Welcome to your dashboard. More features coming soon!</p>
        </CardContent>
      </Card>
    </div>
  );
}
