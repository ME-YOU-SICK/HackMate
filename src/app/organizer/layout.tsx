import RoleProtectedLayout from '@/components/RoleProtectedLayout';

export default function OrganizerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RoleProtectedLayout allowedRoles={['organizer']}>
      {children}
    </RoleProtectedLayout>
  );
}
