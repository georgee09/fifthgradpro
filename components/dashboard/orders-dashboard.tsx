"use client"

import { Sidebar } from "@/components/ui"
import { useState } from "react"

type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled"

type Order = {
  id: string
  customer: string
  total: number
  status: OrderStatus
  createdAt: string
}

const initialOrders: Order[] = [
  { id: "1001", customer: "Alice Johnson", total: 129.5, status: "pending", createdAt: "2026-06-01" },
  { id: "1002", customer: "Carlos M.", total: 49.99, status: "processing", createdAt: "2026-06-02" },
  { id: "1003", customer: "Zoe Lee", total: 230.0, status: "shipped", createdAt: "2026-06-03" },
  { id: "1004", customer: "Beta Co.", total: 12.0, status: "delivered", createdAt: "2026-05-30" },
]

export default function OrdersDasboard() {
  const [orders, setOrders] = useState<Order[]>(initialOrders)

  function updateStatus(id: string, status: OrderStatus) {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)))
  }

  const counts = orders.reduce(
    (acc, o) => {
      acc[o.status] = (acc[o.status] || 0) + 1
      return acc
    },
    {} as Record<OrderStatus, number>
  )

  return (
    <div className="min-h-screen bg-slate-950 text-foreground px-6 py-10">
      <div className="mx-auto grid w-full max-w-7xl gap-8 xl:grid-cols-[320px_1fr]">
        <Sidebar className="hidden xl:block" />
        <main className="space-y-8">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-sm shadow-slate-950/20">
            <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Orders</p>
                <h1 className="text-3xl text-slate-200 font-semibold">Order management</h1>
              </div>
              <p className="max-w-xl text-sm leading-6 text-slate-300">
                View and update order status across the full pipeline. Use these controls to keep fulfillment aligned with customer expectations.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-5">
              <div className="rounded-3xl border border-slate-800 bg-slate-950 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Total orders</p>
                <p className="mt-4 text-3xl text-slate-100 font-semibold">{orders.length}</p>
              </div>
              <div className="rounded-3xl border border-slate-800 bg-slate-950 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Pending</p>
                <p className="mt-4 text-3xl text-slate-100 font-semibold">{counts.pending || 0}</p>
              </div>
              <div className="rounded-3xl border border-slate-800 bg-slate-950 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Processing</p>
                <p className="mt-4 text-3xl text-slate-100 font-semibold">{counts.processing || 0}</p>
              </div>
              <div className="rounded-3xl border border-slate-800 bg-slate-950 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Shipped</p>
                <p className="mt-4 text-3xl text-slate-100 font-semibold">{counts.shipped || 0}</p>
              </div>
              <div className="rounded-3xl border border-slate-800 bg-slate-950 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Delivered</p>
                <p className="mt-4 text-3xl text-slate-100 font-semibold">{counts.delivered || 0}</p>
              </div>
            </div>
          </div>

          <section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-sm shadow-slate-950/20">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold">Order list</h2>
                <p className="text-sm text-slate-400">Track individual orders and update status in real time.</p>
              </div>
            </div>

            <div className="overflow-hidden rounded-3xl border border-slate-800">
              <table className="min-w-full border-separate border-spacing-0 text-left">
                <thead className="bg-slate-950">
                  <tr>
                    <th className="border-b border-slate-800 px-4 py-3 text-sm font-medium text-slate-400">Order</th>
                    <th className="border-b border-slate-800 px-4 py-3 text-sm font-medium text-slate-400">Customer</th>
                    <th className="border-b border-slate-800 px-4 py-3 text-sm font-medium text-slate-400">Total</th>
                    <th className="border-b border-slate-800 px-4 py-3 text-sm font-medium text-slate-400">Created</th>
                    <th className="border-b border-slate-800 px-4 py-3 text-sm font-medium text-slate-400">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="border-b border-slate-800 last:border-b-0">
                      <td className="px-4 py-4 text-sm text-slate-200">#{order.id}</td>
                      <td className="px-4 py-4 text-sm text-slate-200">{order.customer}</td>
                      <td className="px-4 py-4 text-sm text-slate-200">${order.total.toFixed(2)}</td>
                      <td className="px-4 py-4 text-sm text-slate-200">{order.createdAt}</td>
                      <td className="px-4 py-4 text-sm text-slate-200">
                        <select
                          className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-200 outline-none focus:border-slate-500"
                          value={order.status}
                          onChange={(e) => updateStatus(order.id, e.target.value as OrderStatus)}
                        >
                          <option value="pending">pending</option>
                          <option value="processing">processing</option>
                          <option value="shipped">shipped</option>
                          <option value="delivered">delivered</option>
                          <option value="cancelled">cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
