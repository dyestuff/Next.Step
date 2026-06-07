'use client'

import { useState } from 'react'
import { useOrderStore, type Order } from '@/app/lib/store/orders'
import { ShoppingBag, ChevronDown, ChevronUp, X } from 'lucide-react'

export default function AdminOrdersPage() {
  const orders = useOrderStore(s => s.orders)
  const [expanded, setExpanded] = useState<string | null>(null)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  const sorted = [...orders].reverse()

  return (
    <div className="p-4 md:p-8 space-y-6">
      <div className="flex items-center gap-3">
        <ShoppingBag className="w-6 h-6 text-blue-400" />
        <h1 className="text-2xl md:text-3xl font-bold">Orders</h1>
        <span className="text-sm text-gray-400 bg-white/10 px-2.5 py-0.5 rounded-full">
          {orders.length}
        </span>
      </div>

      {sorted.length === 0 ? (
        <div className="text-center py-20">
          <ShoppingBag className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-500">No orders received yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {sorted.map(order => {
            const isExpanded = expanded === order.id
            return (
              <div
                key={order.id}
                className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => setExpanded(isExpanded ? null : order.id)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-600/10 rounded-xl flex items-center justify-center shrink-0">
                      <ShoppingBag className="w-4 h-4 text-blue-400" />
                    </div>
                    <div>
                      <p className="font-bold text-sm">{order.id}</p>
                      <p className="text-xs text-gray-400">
                        {order.shipping.firstName} {order.shipping.lastName}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-bold">${order.total.toFixed(2)}</span>
                    <span className="text-xs text-gray-500 hidden sm:block">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </span>
                    <span
                      onClick={e => { e.stopPropagation(); setSelectedOrder(order) }}
                      className="text-blue-400 text-xs hover:underline shrink-0 cursor-pointer"
                    >
                      Details
                    </span>
                    {isExpanded ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-4 pb-4 border-t border-white/5 pt-3 space-y-2">
                    {order.items.map((item, i) => (
                      <div key={i} className="flex items-center gap-3 text-sm">
                        <div className="w-8 h-8 bg-white/10 rounded-lg overflow-hidden shrink-0">
                          <img src={item.image} alt="" className="w-full h-full object-cover" />
                        </div>
                        <span className="flex-1 truncate">{item.name}</span>
                        <span className="text-gray-400">x{item.quantity}</span>
                        <span className="font-bold">${(parseFloat(item.price) * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}

      {/* Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setSelectedOrder(null)}>
          <div className="bg-gray-900 border border-white/10 rounded-2xl w-full max-w-lg max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="sticky top-0 bg-gray-900 border-b border-white/10 p-4 flex items-center justify-between">
              <h2 className="font-bold">Order {selectedOrder.id}</h2>
              <button onClick={() => setSelectedOrder(null)} className="p-1 hover:bg-white/10 rounded-lg text-gray-400 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 space-y-5">
              <Section title="Customer">
                <p>{selectedOrder.shipping.firstName} {selectedOrder.shipping.lastName}</p>
                <p className="text-gray-400">{selectedOrder.shipping.email}</p>
                <p className="text-gray-400">{selectedOrder.shipping.phone}</p>
              </Section>

              <Section title="Shipping">
                <p className="text-gray-400">{selectedOrder.shipping.country}, {selectedOrder.shipping.city}</p>
                <p className="text-gray-400">{selectedOrder.shipping.address}</p>
                <p className="text-gray-400">{selectedOrder.shipping.zip}</p>
                {selectedOrder.shipping.notes && (
                  <p className="text-gray-400 italic mt-1">"{selectedOrder.shipping.notes}"</p>
                )}
              </Section>

              <Section title="Items">
                {selectedOrder.items.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 py-1">
                    <div className="w-10 h-10 bg-white/10 rounded-lg overflow-hidden shrink-0">
                      <img src={item.image} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm truncate">{item.name}</p>
                      <p className="text-xs text-gray-400">Size {item.size} × {item.quantity}</p>
                    </div>
                    <span className="text-sm font-bold shrink-0">${(parseFloat(item.price) * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div className="border-t border-white/10 pt-2 flex justify-between font-bold">
                  <span>Total</span>
                  <span>${selectedOrder.total.toFixed(2)}</span>
                </div>
              </Section>

              <p className="text-xs text-gray-500">
                Placed on {new Date(selectedOrder.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-xs text-gray-400 uppercase tracking-wider mb-2">{title}</h3>
      <div className="text-sm space-y-0.5">{children}</div>
    </div>
  )
}
