import RoleProtectedLayout from '@/components/RoleProtectedLayout';

export default function ParticipantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RoleProtectedLayout allowedRoles={['participant']}>
      {children}
    </RoleProtectedLayout>
  );
}
