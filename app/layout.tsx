import './globals.css';
import NavigationShell from './NavigationShell';

export const metadata = {
  title: 'Mostafa Mohamed Practice Plan | Learning OS',
  description: 'Enterprise Learning Operating System for BI, Data Analytics & AI Architecture',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#F8F9FA] text-[#201F1E] antialiased">
        <NavigationShell>{children}</NavigationShell>
      </body>
    </html>
  );
}
