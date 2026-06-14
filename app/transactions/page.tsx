import { TransactionsDashboard } from '@/components/dashboard/transactions-dashboard';

export const metadata = {
  title: 'Transactions - Nova E-Commerce',
  description: 'Review transaction activity, payment stats, and available payment methods.',
};

export default function TransactionsPage() {
  return <TransactionsDashboard />;
}
