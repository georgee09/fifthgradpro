import { CustomersDashboard } from '@/components/dashboard/customers-dashboard';

export const metadata = {
  title: 'Customers - Nova E-Commerce',
  description: 'Manage customers, track activities, and identify top performers.',
};

export default function CustomersPage() {
  return <CustomersDashboard />;
}
