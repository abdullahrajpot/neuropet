// Layout for client authentication pages (login, register)
// No sidebar, just the page content
export default function ClientAuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
