import RoleProtectedLayout from '@/components/RoleProtectedLayout';

export default function SponsorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RoleProtectedLayout allowedRoles={['sponsor']}>
      {children}
    </RoleProtectedLayout>
  );
}
