'use client';

import {
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

// Mock customer data
const customersData = [
  {
    id: 1,
    name: 'Sarah Mitchell',
    email: 'sarah.mitchell@example.com',
    totalOrders: 12,
    totalSpent: '$2,450',
    lastActivity: '2 hours ago',
    status: 'Active',
  },
  {
    id: 2,
    name: 'James Chen',
    email: 'james.chen@example.com',
    totalOrders: 8,
    totalSpent: '$1,890',
    lastActivity: '1 day ago',
    status: 'Active',
  },
  {
    id: 3,
    name: 'Emma Rodriguez',
    email: 'emma.rodriguez@example.com',
    totalOrders: 15,
    totalSpent: '$3,210',
    lastActivity: '30 minutes ago',
    status: 'Active',
  },
  {
    id: 4,
    name: 'Michael Thompson',
    email: 'michael.thompson@example.com',
    totalOrders: 6,
    totalSpent: '$1,240',
    lastActivity: '3 days ago',
    status: 'Inactive',
  },
  {
    id: 5,
    name: 'Jessica Lee',
    email: 'jessica.lee@example.com',
    totalOrders: 10,
    totalSpent: '$2,100',
    lastActivity: '4 hours ago',
    status: 'Active',
  },
];

// Mock activity tracking data
const activityData = [
  { date: 'Mon', purchases: 45, browsing: 120, support: 8 },
  { date: 'Tue', purchases: 52, browsing: 135, support: 12 },
  { date: 'Wed', purchases: 48, browsing: 110, support: 10 },
  { date: 'Thu', purchases: 61, browsing: 150, support: 15 },
  { date: 'Fri', purchases: 55, browsing: 125, support: 9 },
  { date: 'Sat', purchases: 67, browsing: 160, support: 11 },
  { date: 'Sun', purchases: 70, browsing: 175, support: 14 },
];

// Top active customers
const topActiveCustomers = [
  { rank: 1, name: 'Emma Rodriguez', activities: 247, engagementScore: 98 },
  { rank: 2, name: 'Sarah Mitchell', activities: 189, engagementScore: 92 },
  { rank: 3, name: 'Jessica Lee', activities: 156, engagementScore: 85 },
  { rank: 4, name: 'James Chen', activities: 134, engagementScore: 78 },
  { rank: 5, name: 'Michael Thompson', activities: 87, engagementScore: 62 },
];

// Metrics cards
const metrics = [
  {
    label: 'Total Customers',
    value: '1,284',
    description: 'Active and inactive customers',
  },
  {
    label: 'Avg Orders/Customer',
    value: '8.3',
    description: 'Average orders per customer',
  },
  {
    label: 'Avg Customer Value',
    value: '$1,892',
    description: 'Average lifetime value',
  },
];

export function CustomersDashboard() {
  return (
    <div className="min-h-screen bg-slate-950 text-foreground px-6 py-10">
      <div className="mx-auto grid w-full max-w-7xl gap-8 xl:grid-cols-[320px_1fr]">
        <Sidebar className="hidden xl:block" />
        <main className="flex flex-col gap-8">
          <section className="space-y-3">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Nova E-Commerce</p>
            <h1 className="text-4xl font-semibold text-white">Customers Management</h1>
            <p className="max-w-3xl text-slate-300">
              View all customers, track their activities and behaviors, and identify your most engaged users to drive targeted marketing campaigns.
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
                <CardTitle>Customer Activities</CardTitle>
                <CardDescription>
                  Track purchases, browsing, and support interactions weekly.
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[360px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={activityData} margin={{ top: 20, right: 16, left: 0, bottom: 8 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="date" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="purchases"
                      stroke="#22c55e"
                      strokeWidth={3}
                      name="Purchases"
                    />
                    <Line
                      type="monotone"
                      dataKey="browsing"
                      stroke="#3b82f6"
                      strokeWidth={3}
                      name="Browsing"
                    />
                    <Line
                      type="monotone"
                      dataKey="support"
                      stroke="#f97316"
                      strokeWidth={3}
                      name="Support"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="h-full">
              <CardHeader>
                <CardTitle>Top Active Customers</CardTitle>
                <CardDescription>Most engaged customers this month.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {topActiveCustomers.map((customer) => (
                    <div key={customer.rank} className="flex items-center justify-between rounded-lg bg-slate-800/50 p-3">
                      <div className="flex items-center gap-3 flex-1">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-xs font-semibold">
                          {customer.rank}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium text-white">{customer.name}</p>
                          <p className="text-xs text-slate-400">{customer.activities} activities</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-end gap-2">
                        <div className="text-right">
                          <p className="text-xs font-medium text-slate-300">
                            {customer.engagementScore}%
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>

          <section>
            <Card>
              <CardHeader>
                <CardTitle>All Customers</CardTitle>
                <CardDescription>Complete list of customers with their order history and activity status.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="w-full overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-700">
                        <th className="px-4 py-3 text-left font-semibold text-slate-300">Name</th>
                        <th className="px-4 py-3 text-left font-semibold text-slate-300">Email</th>
                        <th className="px-4 py-3 text-center font-semibold text-slate-300">Orders</th>
                        <th className="px-4 py-3 text-center font-semibold text-slate-300">Total Spent</th>
                        <th className="px-4 py-3 text-left font-semibold text-slate-300">Last Activity</th>
                        <th className="px-4 py-3 text-center font-semibold text-slate-300">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {customersData.map((customer) => (
                        <tr
                          key={customer.id}
                          className="border-b border-slate-800 hover:bg-slate-800/30 transition-colors"
                        >
                          <td className="px-4 py-3 font-medium text-white">{customer.name}</td>
                          <td className="px-4 py-3 text-slate-400">{customer.email}</td>
                          <td className="px-4 py-3 text-center text-slate-300">{customer.totalOrders}</td>
                          <td className="px-4 py-3 text-center text-slate-300">{customer.totalSpent}</td>
                          <td className="px-4 py-3 text-slate-400">{customer.lastActivity}</td>
                          <td className="px-4 py-3 text-center">
                            <span
                              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                customer.status === 'Active'
                                  ? 'bg-green-900/30 text-green-400'
                                  : 'bg-slate-700/30 text-slate-400'
                              }`}
                            >
                              {customer.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </section>

          <section className="grid gap-6 xl:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Engagement by Activity Type</CardTitle>
                <CardDescription>Distribution of customer interactions.</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { name: 'Purchases', value: 320 },
                      { name: 'Browsing', value: 850 },
                      { name: 'Support', value: 75 },
                      { name: 'Reviews', value: 180 },
                    ]}
                    margin={{ top: 16, right: 12, left: -12, bottom: 8 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="name" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip />
                    <Bar dataKey="value" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Customer Segments</CardTitle>
                <CardDescription>Segment customers for targeted marketing.</CardDescription>
              </CardHeader>
              <CardContent className="flex h-[300px] flex-col justify-between gap-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between rounded-lg bg-slate-800/50 p-3">
                    <div>
                      <p className="font-medium text-white">High-Value Customers</p>
                      <p className="text-sm text-slate-400">Spent $2,000+</p>
                    </div>
                    <p className="text-xl font-semibold text-green-400">142</p>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-slate-800/50 p-3">
                    <div>
                      <p className="font-medium text-white">Regular Customers</p>
                      <p className="text-sm text-slate-400">5+ orders</p>
                    </div>
                    <p className="text-xl font-semibold text-blue-400">378</p>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-slate-800/50 p-3">
                    <div>
                      <p className="font-medium text-white">At-Risk Customers</p>
                      <p className="text-sm text-slate-400">Inactive 30+ days</p>
                    </div>
                    <p className="text-xl font-semibold text-orange-400">247</p>
                  </div>
                </div>
                <Button className="self-start">View segmentation</Button>
              </CardContent>
            </Card>
          </section>
        </main>
      </div>
    </div>
  );
}
