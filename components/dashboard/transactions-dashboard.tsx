"use client";

import {
  ArrowUpRight,
  BadgeDollarSign,
  CreditCard,
  ShieldCheck,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Sidebar } from "@/components/ui/sidebar";

const transactions = [
  {
    id: "TXN-1042",
    customer: "Sarah Mitchell",
    amount: 284.6,
    method: "Visa •••• 4242",
    status: "Completed",
    date: "2026-06-10",
  },
  {
    id: "TXN-1043",
    customer: "James Chen",
    amount: 129.0,
    method: "PayPal",
    status: "Pending",
    date: "2026-06-10",
  },
  {
    id: "TXN-1044",
    customer: "Emma Rodriguez",
    amount: 398.25,
    method: "Mastercard •••• 9018",
    status: "Completed",
    date: "2026-06-09",
  },
  {
    id: "TXN-1045",
    customer: "Michael Thompson",
    amount: 89.99,
    method: "Apple Pay",
    status: "Refunded",
    date: "2026-06-09",
  },
];

const stats = [
  {
    label: "Total volume",
    value: "$128.4K",
    change: "+12.4% vs last month",
    icon: BadgeDollarSign,
  },
  {
    label: "Successful payments",
    value: "94.8%",
    change: "142 of 150 completed",
    icon: ShieldCheck,
  },
  {
    label: "Average order value",
    value: "$186.20",
    change: "Up from $167.50",
    icon: TrendingUp,
  },
];

const paymentMethods = [
  {
    name: "Visa ending in 4242",
    type: "Primary card",
    status: "Active",
    note: "Default for online checkout",
  },
  {
    name: "PayPal business",
    type: "Digital wallet",
    status: "Active",
    note: "Fast refunds and account verification",
  },
  {
    name: "Mastercard ending in 9018",
    type: "Backup card",
    status: "Pending verification",
    note: "Available for high-value orders",
  },
];

export function TransactionsDashboard() {
  const totalVolume = transactions.reduce((sum, transaction) => sum + transaction.amount, 0);
  const completedTransactions = transactions.filter((transaction) => transaction.status === "Completed").length;

  return (
    <div className="min-h-screen bg-slate-950 text-foreground px-6 py-10">
      <div className="mx-auto grid w-full max-w-7xl gap-8 xl:grid-cols-[320px_1fr]">
        <Sidebar className="hidden xl:block" />

        <main className="flex flex-col gap-8">
          <section className="space-y-3">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Nova E-Commerce</p>
            <h1 className="text-4xl font-semibold text-white">Transaction overview</h1>
            <p className="max-w-3xl text-slate-300">
              Review payment activity, compare transaction performance, and make sure your payment methods stay ready for checkout.
            </p>
          </section>

          <section className="grid gap-4 md:grid-cols-3">
            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <Card key={stat.label}>
                  <CardHeader className="space-y-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-2xl font-semibold text-white">{stat.value}</CardTitle>
                      <div className="rounded-2xl bg-slate-800 p-2 text-slate-100">
                        <Icon className="h-4 w-4" />
                      </div>
                    </div>
                    <CardDescription>{stat.label}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-400">{stat.change}</p>
                  </CardContent>
                </Card>
              );
            })}
          </section>

          <section className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
            <Card className="h-full">
              <CardHeader>
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <CardTitle>Recent transactions</CardTitle>
                    <CardDescription>Monitor payments, refunds, and pending settlements.</CardDescription>
                  </div>
                  <Button variant="outline" className="border-slate-700 bg-slate-900 text-slate-100 hover:bg-slate-800">
                    Export
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-slate-800 text-left text-sm">
                    <thead>
                      <tr className="text-slate-400">
                        <th className="px-3 py-3 font-medium">Transaction</th>
                        <th className="px-3 py-3 font-medium">Customer</th>
                        <th className="px-3 py-3 font-medium">Amount</th>
                        <th className="px-3 py-3 font-medium">Method</th>
                        <th className="px-3 py-3 font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {transactions.map((transaction) => (
                        <tr key={transaction.id} className="hover:bg-slate-800/40">
                          <td className="px-3 py-4">
                            <p className="font-medium text-white">{transaction.id}</p>
                            <p className="text-xs text-slate-400">{transaction.date}</p>
                          </td>
                          <td className="px-3 py-4 text-slate-200">{transaction.customer}</td>
                          <td className="px-3 py-4 text-slate-100">${transaction.amount.toFixed(2)}</td>
                          <td className="px-3 py-4 text-slate-300">{transaction.method}</td>
                          <td className="px-3 py-4">
                            <span
                              className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                                transaction.status === "Completed"
                                  ? "bg-emerald-500/10 text-emerald-300"
                                  : transaction.status === "Pending"
                                    ? "bg-amber-500/10 text-amber-200"
                                    : "bg-rose-500/10 text-rose-200"
                              }`}
                            >
                              {transaction.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment methods</CardTitle>
                <CardDescription>Add and review the payment options used for checkout.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {paymentMethods.map((method) => (
                  <article key={method.name} className="rounded-3xl border border-slate-800 bg-slate-900/80 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-white">{method.name}</p>
                        <p className="text-xs uppercase tracking-[0.24em] text-slate-400">{method.type}</p>
                      </div>
                      <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-300">{method.status}</span>
                    </div>
                    <p className="mt-3 text-sm text-slate-300">{method.note}</p>
                  </article>
                ))}

                <div className="rounded-3xl border border-dashed border-slate-700 bg-slate-900/70 p-4 text-sm text-slate-300">
                  <div className="flex items-start gap-3">
                    <div className="rounded-2xl bg-slate-800 p-2 text-slate-100">
                      <CreditCard className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-semibold text-white">Add payment methods</p>
                      <p>Keep checkout flexible with credit cards, wallets, and business accounts.</p>
                    </div>
                  </div>
                  <Button className="mt-4">Add a new method</Button>
                </div>
              </CardContent>
            </Card>
          </section>

          <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Transaction summary</CardTitle>
                <CardDescription>Commercial overview of the current payment cycle.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-slate-300">
                <div className="flex items-center justify-between rounded-2xl bg-slate-900/80 p-3">
                  <span>Total collected</span>
                  <strong className="text-white">${totalVolume.toFixed(2)}</strong>
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-slate-900/80 p-3">
                  <span>Completed transactions</span>
                  <strong className="text-white">{completedTransactions}</strong>
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-slate-900/80 p-3">
                  <span>Pending reviews</span>
                  <strong className="text-white">2</strong>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Settlement health</CardTitle>
                <CardDescription>How quickly funds are reaching your account.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-slate-300">
                <div className="rounded-2xl bg-slate-900/80 p-4">
                  <p className="text-slate-400">Next payout</p>
                  <p className="mt-1 text-2xl font-semibold text-white">$18,460.00</p>
                </div>
                <div className="flex items-center gap-2 text-emerald-300">
                  <ArrowUpRight className="h-4 w-4" />
                  <span>Settlement success rate is trending above target.</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Payment readiness</CardTitle>
                <CardDescription>Ensure your payment stack remains available.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-slate-300">
                <div className="flex items-center gap-3 rounded-2xl bg-slate-900/80 p-3">
                  <Wallet className="h-4 w-4 text-slate-100" />
                  <span>All primary payment options are active.</span>
                </div>
                <div className="flex items-center gap-3 rounded-2xl bg-slate-900/80 p-3">
                  <ShieldCheck className="h-4 w-4 text-emerald-300" />
                  <span>Fraud review thresholds are within range.</span>
                </div>
              </CardContent>
            </Card>
          </section>
        </main>
      </div>
    </div>
  );
}
