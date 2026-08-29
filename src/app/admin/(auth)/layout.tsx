// Layout for admin authentication pages (login)
// No sidebar, just the page content
export default function AdminAuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
