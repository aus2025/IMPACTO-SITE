import AdminLayout from './layout';
import Dashboard from './dashboard/page';

// Set all admin pages to be generated only when requested
export const dynamic = 'force-dynamic';

// This tells Next.js not to prerender this route during build
export function generateStaticParams() {
  return [];
}

export default function AdminPage() {
  return <Dashboard />;
} 