
import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';

export default function OrganizerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-white">
      <Header variant="dashboard" />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
