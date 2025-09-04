import RoleProtectedLayout from '@/components/RoleProtectedLayout';

export default function RecruiterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RoleProtectedLayout allowedRoles={['recruiter']}>
      {children}
    </RoleProtectedLayout>
  );
}
