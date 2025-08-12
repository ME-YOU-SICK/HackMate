import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-white">
      <Header variant="dashboard" />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
