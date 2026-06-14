'use client';

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Sidebar } from '@/components/ui/sidebar';

const revenueData = [
  { name: 'Mon', revenue: 4200, orders: 34 },
  { name: 'Tue', revenue: 5300, orders: 48 },
  { name: 'Wed', revenue: 6100, orders: 55 },
  { name: 'Thu', revenue: 7400, orders: 67 },
  { name: 'Fri', revenue: 8200, orders: 72 },
  { name: 'Sat', revenue: 9500, orders: 81 },
  { name: 'Sun', revenue: 10800, orders: 95 },
];

const categoryData = [
  { name: 'Apparel', sales: 290 },
  { name: 'Home', sales: 160 },
  { name: 'Beauty', sales: 210 },
  { name: 'Electronics', sales: 330 },
  { name: 'Sports', sales: 190 },
];

const metrics = [
  { label: 'Revenue', value: '$54.3k', description: 'Weekly sales total' },
  { label: 'Orders', value: '428', description: 'Orders processed' },
  { label: 'Conversion', value: '4.6%', description: 'Store conversion rate' },
];

export function AnalyticsDashboard() {
  return (
    <div className="min-h-screen bg-slate-950 text-foreground px-6 py-10">
      <div className="mx-auto grid w-full max-w-7xl gap-8 xl:grid-cols-[320px_1fr]">
        <Sidebar className="hidden xl:block" />
        <main className="flex flex-col gap-8">
          <section className="space-y-3">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Nova E-Commerce</p>
            <h1 className="text-4xl font-semibold text-white">Ecommerce dashboard</h1>
            <p className="max-w-3xl text-slate-300">
              Monitor revenue, orders, and product performance across the storefront with data-driven charts.
            </p>
          </section>

          <section className="grid gap-4 md:grid-cols-3">
            {metrics.map((metric) => (
              <Card key={metric.label}>
                <CardHeader className="space-y-2">
                  <CardTitle>{metric.value}</CardTitle>
                  <CardDescription>{metric.label}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-400">{metric.description}</p>
                </CardContent>
              </Card>
            ))}
          </section>

          <section className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Weekly revenue</CardTitle>
                <CardDescription>Revenue and order volume for the current week.</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={revenueData} margin={{ top: 20, right: 16, left: 0, bottom: 8 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="name" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="revenue" stroke="#38bdf8" strokeWidth={3} />
                    <Line type="monotone" dataKey="orders" stroke="#a78bfa" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="h-full">
              <CardHeader>
                <CardTitle>Category sales</CardTitle>
                <CardDescription>Compare sales by product category.</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={categoryData} margin={{ top: 16, right: 12, left: -12, bottom: 8 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="name" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="sales" fill="#f97316" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </section>

          <section className="grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
            <Card>
              <CardHeader>
                <CardTitle>Revenue trend</CardTitle>
                <CardDescription>Projected store momentum over the next 7 days.</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueData} margin={{ top: 16, right: 16, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.35} />
                        <stop offset="95%" stopColor="#38bdf8" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <Tooltip />
                    <Area type="monotone" dataKey="revenue" stroke="#38bdf8" fillOpacity={1} fill="url(#colorRevenue)" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Next action</CardTitle>
                <CardDescription>Manage promotions and highlight top-performing categories.</CardDescription>
              </CardHeader>
              <CardContent className="flex h-80 flex-col justify-between gap-4">
                <div className="space-y-4">
                  <p className="text-slate-300">
                    Your merchandising team can use the dashboard to optimize campaigns and track conversion across categories.
                  </p>
                  <ul className="space-y-3 text-sm text-slate-400">
                    <li>• Promote Apparel bundles during peak weekend demand.</li>
                    <li>• Focus Electronics ads on mid-week traffic.</li>
                    <li>• Review checkout flow for higher conversion.</li>
                  </ul>
                </div>
                <Button className="self-start">View analytics</Button>
              </CardContent>
            </Card>
          </section>
        </main>
      </div>
    </div>
  );
}
