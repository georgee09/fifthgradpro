import { cn } from '@/lib/utils';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const navLinks = [
  { href: '/', label: 'Dashboard' },
  { href: '/customers', label: 'Customers' },
  { href: '/products', label: 'Products' },
  { href: '/orders', label: 'Orders' },
  { href: '/transactions', label: 'Transactions' },
  { href: '#', label: 'Promotions' },
];

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  return (
    <aside
      className={cn(
        'w-full max-w-sm space-y-6 sticky top-6 self-start max-h-[calc(100vh-4rem)] overflow-y-auto theme-scrollbar',
        className,
      )}
    >
      <Card className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-950/95">
        <CardHeader className="pb-4">
          <CardTitle>Navigation</CardTitle>
          <CardDescription>Quick access to dashboard sections.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-1">
          <nav className="space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="block rounded-2xl px-4 py-3 text-sm font-medium text-slate-100 transition-colors duration-200 hover:bg-slate-800"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </CardContent>
      </Card>

      <Card className="rounded-3xl border border-slate-800 bg-slate-950/95">
        <CardHeader>
          <CardTitle>Store status</CardTitle>
          <CardDescription>Live inventory and campaign health.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-slate-300">
          <div className="rounded-2xl bg-slate-900/70 p-4">
            <p className="font-medium text-white">Inventory</p>
            <p className="text-slate-400">All top products in stock</p>
          </div>
          <div className="rounded-2xl bg-slate-900/70 p-4">
            <p className="font-medium text-white">Campaigns</p>
            <p className="text-slate-400">8 active promotions</p>
          </div>
        </CardContent>
      </Card>
    </aside>
  );
}
